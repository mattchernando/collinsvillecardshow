import { loadVendorDirectory } from '../../../server/lib.js';
import { csvCell } from './export.csv.js';

export async function onRequestGet({ env }) {
  const vendors = await loadVendorDirectory(env.DB);
  const lines = [
    ['Name', 'Business', 'Email', 'Phone', 'Sells', 'Shows', 'Total tables', 'Total paid', 'First show', 'Last show'],
    ...vendors.map((v) => [v.name, v.business, v.email, v.phone, v.sellsLabel, v.showCount, v.totalTables,
      (v.totalCents / 100).toFixed(2), v.firstShow, v.lastShow]),
  ].map((row) => row.map(csvCell).join(','));

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="all-vendors.csv"',
      'cache-control': 'no-store',
    },
  });
}
