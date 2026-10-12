import { isLocal } from '../server/lib.js';

// The vendor admin lives on its own hostname, which sits behind a Cloudflare
// Access application (Sign in with Google). Only "/", "/admin*" and "/api/*"
// reach Functions (see public/_routes.json); static assets are served directly.
export const ADMIN_HOST = 'admin.thecollinsvillecardshow.com';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (url.hostname === ADMIN_HOST) {
    if (url.pathname === '/') return env.ASSETS.fetch(new URL('/admin/', url));
    return context.next();
  }

  // On the public site, admin is never served — send people to the admin host,
  // and refuse admin API calls outright. Local preview keeps /admin/ for testing.
  if (!isLocal(request)) {
    if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
      return Response.redirect(`https://${ADMIN_HOST}/`, 301);
    }
    if (url.pathname.startsWith('/api/admin/')) return new Response('Not found', { status: 404 });
  }
  return context.next();
}
