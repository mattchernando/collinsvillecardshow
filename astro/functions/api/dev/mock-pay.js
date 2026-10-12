import { json, getRegistration, markPaid, mockMode } from '../../../server/lib.js';

// Local preview only: stands in for a completed Stripe payment.
export async function onRequestPost({ request, env }) {
  if (!mockMode(env, request)) return json({ error: 'Not found' }, 404);
  const { id } = await request.json();
  const reg = await getRegistration(env.DB, id);
  if (!reg || reg.status !== 'pending') return json({ error: 'Registration is not awaiting payment.' }, 400);
  await markPaid(env.DB, reg, 'pi_mock');
  return json({ url: `/vendor-tables/receipt/?id=${id}` });
}
