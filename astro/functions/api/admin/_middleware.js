import { json, isLocal, verifyAccessJwt } from '../../../server/lib.js';

// Everything under /api/admin requires a valid Cloudflare Access login.
export async function onRequest(context) {
  const { request, env } = context;
  if (env.DEV_ADMIN_BYPASS === '1' && isLocal(request)) return context.next();

  const token = request.headers.get('cf-access-jwt-assertion');
  if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return json({ error: 'Unauthorized' }, 401);
  try {
    await verifyAccessJwt(token, env);
  } catch {
    return json({ error: 'Unauthorized' }, 401);
  }
  return context.next();
}
