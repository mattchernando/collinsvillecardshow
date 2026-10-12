import { shows, showLabel } from '../../../src/lib/shows.js';
import { json, findShow, sellsLabel, tablesTaken } from '../../../server/lib.js';

export async function loadPaid(db, date) {
  const { results } = await db
    .prepare(`SELECT * FROM registrations WHERE show_date = ? AND status = 'paid' ORDER BY paid_at`)
    .bind(date)
    .all();
  return results;
}

export async function onRequestGet({ request, env }) {
  const nowIso = new Date().toISOString();
  const taken = await tablesTaken(env.DB, nowIso);
  const { results: paidTotals } = await env.DB
    .prepare(`SELECT show_date, SUM(tables) AS tables, COUNT(*) AS vendors FROM registrations WHERE status = 'paid' GROUP BY show_date`)
    .all();
  const paid = Object.fromEntries(paidTotals.map((r) => [r.show_date, r]));

  const summary = shows.map((s) => ({
    date: s.date,
    label: showLabel(s.date),
    capacity: s.tables,
    sold: paid[s.date]?.tables || 0,
    vendors: paid[s.date]?.vendors || 0,
    held: (taken[s.date] || 0) - (paid[s.date]?.tables || 0),
  }));

  const date = new URL(request.url).searchParams.get('date');
  if (!date) return json({ shows: summary });
  if (!findShow(date)) return json({ error: 'Unknown show date.' }, 400);

  const rows = await loadPaid(env.DB, date);
  return json({
    shows: summary,
    vendors: rows.map((r) => ({
      id: r.id,
      name: r.name,
      business: r.business,
      email: r.email,
      phone: r.phone,
      tables: r.tables,
      sells: r.sells,
      sellsLabel: sellsLabel(r),
      amountCents: r.amount_cents,
      paidAt: r.paid_at,
      receiptNumber: r.receipt_number,
    })),
  });
}
