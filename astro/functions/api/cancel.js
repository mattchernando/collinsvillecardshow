import { json, getRegistration, mockMode, stripe } from '../../server/lib.js';

// Called when a vendor backs out of Stripe Checkout, so their held tables free up right away.
export async function onRequestPost({ request, env }) {
  let id;
  try {
    ({ id } = await request.json());
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  const reg = await getRegistration(env.DB, id);
  if (!reg || reg.status !== 'pending') return json({ ok: true });

  if (reg.stripe_session_id && !mockMode(env, request)) {
    try {
      await stripe(env, 'POST', `checkout/sessions/${reg.stripe_session_id}/expire`);
    } catch (err) {
      // Already paid or expired on Stripe's side — leave the row for the webhook to settle.
      console.error('expire failed', err);
      return json({ ok: true });
    }
  }
  await env.DB.prepare(`UPDATE registrations SET status = 'cancelled' WHERE id = ? AND status = 'pending'`).bind(id).run();
  return json({ ok: true });
}
