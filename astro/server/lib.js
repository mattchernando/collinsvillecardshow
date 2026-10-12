// Server-only helpers for the Pages Functions in ../functions.
import { shows, upcomingShows, showLabel, SELLS } from '../src/lib/shows.js';

// Stripe requires a Checkout Session to live at least 30 minutes. We hold the
// tables a little longer than Stripe does so a payment can never land after
// the hold has been released.
export const STRIPE_EXPIRY_MINUTES = 31;
export const HOLD_MINUTES = STRIPE_EXPIRY_MINUTES + 5;

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export function isLocal(request) {
  const host = new URL(request.url).hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

// Fake checkout for local preview without Stripe keys. Never active on a real host.
export function mockMode(env, request) {
  return !env.STRIPE_SECRET_KEY && env.DEV_MOCK_STRIPE === '1' && isLocal(request);
}

export function findShow(date) {
  return shows.find((s) => s.date === date);
}

export function findUpcomingShow(date) {
  return upcomingShows().find((s) => s.date === date);
}

// SQL fragment: rows whose tables currently count against a show. Binds `now`.
export const HOLDS_TABLES = `(status = 'paid' OR (status = 'pending' AND expires_at > ?))`;

export async function tablesTaken(db, now) {
  const { results } = await db
    .prepare(`SELECT show_date, SUM(tables) AS taken FROM registrations WHERE ${HOLDS_TABLES} GROUP BY show_date`)
    .bind(now)
    .all();
  return Object.fromEntries(results.map((r) => [r.show_date, r.taken]));
}

export async function getRegistration(db, id) {
  if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/.test(id)) return null;
  return db.prepare('SELECT * FROM registrations WHERE id = ?').bind(id).first();
}

export function receiptNumber(reg) {
  return `CCS-${reg.show_date.replaceAll('-', '').slice(2)}-${reg.id.slice(0, 8).toUpperCase()}`;
}

export async function markPaid(db, reg, paymentIntent) {
  await db
    .prepare(
      `UPDATE registrations SET status = 'paid', paid_at = ?, stripe_payment_intent = ?, receipt_number = ?
       WHERE id = ? AND status != 'paid'`
    )
    .bind(new Date().toISOString(), paymentIntent ?? null, receiptNumber(reg), reg.id)
    .run();
}

export async function stripe(env, method, path, params) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: params ? new URLSearchParams(params) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `Stripe ${res.status}`);
  return data;
}

export function sellsLabel(reg) {
  return reg.sells === 'other' && reg.sells_other ? `Other: ${reg.sells_other}` : SELLS[reg.sells] ?? reg.sells;
}

export function publicRegistration(reg) {
  return {
    status: reg.status,
    receiptNumber: reg.receipt_number,
    name: reg.name,
    business: reg.business,
    email: reg.email,
    phone: reg.phone,
    sells: sellsLabel(reg),
    showDate: reg.show_date,
    showLabel: showLabel(reg.show_date),
    tables: reg.tables,
    amountCents: reg.amount_cents,
    paidAt: reg.paid_at,
  };
}

const b64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

// Verifies the JWT Cloudflare Access attaches to requests behind an Access policy.
export async function verifyAccessJwt(token, env) {
  const [h, p, sig] = token.split('.');
  const header = JSON.parse(new TextDecoder().decode(b64url(h)));
  const payload = JSON.parse(new TextDecoder().decode(b64url(p)));
  const team = `https://${env.ACCESS_TEAM_DOMAIN}`;

  const { keys } = await fetch(`${team}/cdn-cgi/access/certs`).then((r) => r.json());
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) throw new Error('unknown key');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64url(sig), new TextEncoder().encode(`${h}.${p}`));
  if (!ok) throw new Error('bad signature');

  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(env.ACCESS_AUD)) throw new Error('bad audience');
  if (payload.iss !== team) throw new Error('bad issuer');
  if (payload.exp * 1000 < Date.now()) throw new Error('expired');
  return payload;
}
