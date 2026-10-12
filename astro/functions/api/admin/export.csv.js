import { findShow, sellsLabel } from '../../../server/lib.js';
import { loadPaid } from './registrations.js';

const cell = (v) => {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@]/.test(s)) s = `'${s}`; // keep spreadsheets from treating input as a formula
  return `"${s.replace(/"/g, '""')}"`;
};

export async function onRequestGet({ request, env }) {
  const date = new URL(request.url).searchParams.get('date');
  if (!findShow(date)) return new Response('Unknown show date', { status: 400 });

  const rows = await loadPaid(env.DB, date);
  const lines = [
    ['Name', 'Business', 'Email', 'Phone', 'Tables', 'Sells', 'Paid', 'Receipt #'],
    ...rows.map((r) => [r.name, r.business, r.email, r.phone, r.tables, sellsLabel(r), (r.amount_cents / 100).toFixed(2), r.receipt_number]),
  ].map((row) => row.map(cell).join(','));

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="vendors-${date}.csv"`,
      'cache-control': 'no-store',
    },
  });
}
