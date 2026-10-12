import { json, getRegistration, markPaid, mockMode, stripe, publicRegistration } from '../../server/lib.js';

export async function onRequestGet({ request, env }) {
  const id = new URL(request.url).searchParams.get('id');
  let reg = await getRegistration(env.DB, id);
  if (!reg) return json({ error: 'Receipt not found.' }, 404);

  // The webhook normally marks payment; if the vendor lands here first, ask Stripe directly.
  if (reg.status === 'pending' && reg.stripe_session_id && !mockMode(env, request)) {
    try {
      const session = await stripe(env, 'GET', `checkout/sessions/${reg.stripe_session_id}`);
      if (session.payment_status === 'paid') {
        await markPaid(env.DB, reg, session.payment_intent);
        reg = await getRegistration(env.DB, id);
      }
    } catch (err) {
      console.error('session lookup failed', err);
    }
  }

  return json(publicRegistration(reg));
}
