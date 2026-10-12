import { json, getRegistration, markPaid } from '../../server/lib.js';

const TOLERANCE_SECONDS = 300;

async function verifySignature(payload, header, secret) {
  const parts = header.split(',').map((p) => p.split('='));
  const t = parts.find(([k]) => k === 't')?.[1];
  const sigs = parts.filter(([k]) => k === 'v1').map(([, v]) => v);
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - Number(t)) > TOLERANCE_SECONDS) return false;

  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${payload}`));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return sigs.some((s) => s.length === expected.length && crypto.subtle.timingSafeEqual(new TextEncoder().encode(s), new TextEncoder().encode(expected)));
}

export async function onRequestPost({ request, env }) {
  const payload = await request.text();
  const header = request.headers.get('stripe-signature') || '';
  if (!env.STRIPE_WEBHOOK_SECRET || !(await verifySignature(payload, header, env.STRIPE_WEBHOOK_SECRET))) {
    return json({ error: 'Invalid signature' }, 400);
  }

  const event = JSON.parse(payload);
  const session = event.data?.object;
  const reg = await getRegistration(env.DB, session?.metadata?.registration_id);
  if (!reg) return json({ received: true });

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      if (session.payment_status === 'paid') await markPaid(env.DB, reg, session.payment_intent);
      break;
    case 'checkout.session.expired':
      await env.DB.prepare(`UPDATE registrations SET status = 'expired' WHERE id = ? AND status = 'pending'`).bind(reg.id).run();
      break;
  }
  return json({ received: true });
}
