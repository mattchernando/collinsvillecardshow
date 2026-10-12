import { PRICE_CENTS, MAX_TABLES, SELLS, showLabel, sellableTables } from '../../src/lib/shows.js';
import { json, mockMode, findUpcomingShow, stripe, tablesTaken, HOLDS_TABLES, HOLD_MINUTES, STRIPE_EXPIRY_MINUTES } from '../../server/lib.js';

function validate(body) {
  const str = (k, max) => (typeof body[k] === 'string' ? body[k].trim().slice(0, max) : '');
  const name = str('name', 100);
  const business = str('business', 120);
  const email = str('email', 200).toLowerCase();
  const digits = str('phone', 30).replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  const sells = str('sells', 10);
  const sellsOther = str('sellsOther', 200);
  const date = str('date', 10);
  const tables = Number(body.tables);

  if (!name) return { error: 'Please enter your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please enter a valid email address.' };
  if (digits.length !== 10) return { error: 'Please enter a 10-digit phone number.' };
  if (!SELLS[sells]) return { error: 'Please choose what you sell.' };
  if (sells === 'other' && !sellsOther) return { error: 'Please tell us what you sell.' };
  if (!Number.isInteger(tables) || tables < 1 || tables > MAX_TABLES) {
    return { error: `Choose between 1 and ${MAX_TABLES} tables.` };
  }

  return {
    name,
    business: business || null,
    email,
    phone: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
    sells,
    sellsOther: sells === 'other' ? sellsOther : null,
    tables,
    date,
  };
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const v = validate(body);
  if (v.error) return json(v, 400);

  const show = findUpcomingShow(v.date);
  if (!show) return json({ error: 'That show date is no longer open for registration.' }, 400);

  const id = crypto.randomUUID();
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresIso = new Date(now.getTime() + HOLD_MINUTES * 60_000).toISOString();

  // Insert only if enough tables remain — a single statement, so two vendors
  // can't both grab the last table.
  const insert = await env.DB.prepare(
    `INSERT INTO registrations
       (id, show_date, name, business, email, phone, sells, sells_other, tables, amount_cents, status, created_at, expires_at)
     SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, 'pending', ?11, ?12
     WHERE ?13 - (SELECT COALESCE(SUM(tables), 0) FROM registrations
                  WHERE show_date = ?2 AND ${HOLDS_TABLES.replace('?', '?11')}) >= ?9`
  )
    .bind(id, show.date, v.name, v.business, v.email, v.phone, v.sells, v.sellsOther, v.tables,
      v.tables * PRICE_CENTS, nowIso, expiresIso, sellableTables(show))
    .run();

  if (!insert.meta.changes) {
    const remaining = Math.max(0, sellableTables(show) - ((await tablesTaken(env.DB, nowIso))[show.date] || 0));
    return json({
      error: remaining
        ? `Only ${remaining} table${remaining === 1 ? '' : 's'} left for this show.`
        : 'Sorry — this show is sold out.',
      remaining,
    }, 409);
  }

  try {
    if (mockMode(env, request)) return json({ url: `/vendor-tables/mock-checkout/?id=${id}` });
    if (!env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set');

    const origin = new URL(request.url).origin;
    const label = showLabel(show.date);
    const session = await stripe(env, 'POST', 'checkout/sessions', {
      mode: 'payment',
      customer_email: v.email,
      client_reference_id: id,
      'metadata[registration_id]': id,
      'line_items[0][quantity]': v.tables,
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': PRICE_CENTS,
      'line_items[0][price_data][product_data][name]': 'Vendor Table',
      'line_items[0][price_data][product_data][description]': `Collinsville Card Show — ${label}`,
      'payment_intent_data[description]': `Vendor tables (${v.tables}) — ${label}`,
      'payment_intent_data[receipt_email]': v.email,
      'payment_intent_data[metadata][registration_id]': id,
      expires_at: Math.floor(now.getTime() / 1000) + STRIPE_EXPIRY_MINUTES * 60,
      success_url: `${origin}/vendor-tables/receipt/?id=${id}`,
      cancel_url: `${origin}/vendor-tables/?cancelled=${id}#register`,
    });

    await env.DB.prepare('UPDATE registrations SET stripe_session_id = ? WHERE id = ?').bind(session.id, id).run();
    return json({ url: session.url });
  } catch (err) {
    console.error('checkout failed', err);
    await env.DB.prepare(`UPDATE registrations SET status = 'cancelled' WHERE id = ?`).bind(id).run();
    return json({ error: "We couldn't start checkout. Please try again in a minute." }, 502);
  }
}
