import { json, isLocal, verifyAccessJwt } from '../../../server/lib.js';

// Everything under /api/admin requires a valid Cloudflare Access login.
export async function onRequest(context) {
  const { request, env } = context;
  if (env.DEV_ADMIN_BYPASS === '1' && isLocal(request)) return context.next();

  // Access adds the header on requests it proxies; the CF_Authorization cookie
  // covers the rest (same approach as admin.cardmaps.app).
  const token = request.headers.get('cf-access-jwt-assertion') || readCookie(request, 'CF_Authorization');
  if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return json({ error: 'Unauthorized' }, 401);
  try {
    await verifyAccessJwt(token, env);
  } catch {
    return json({ error: 'Unauthorized' }, 401);
  }
  return context.next();
}

function readCookie(request, name) {
  for (const part of (request.headers.get('cookie') || '').split(';')) {
    const i = part.indexOf('=');
    if (i !== -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return '';
}
