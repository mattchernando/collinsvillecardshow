import { PRICE_CENTS, MAX_TABLES, upcomingShows, showLabel, sellableTables } from '../../src/lib/shows.js';
import { json, tablesTaken } from '../../server/lib.js';

export async function onRequestGet({ env }) {
  const taken = await tablesTaken(env.DB, new Date().toISOString());
  return json({
    priceCents: PRICE_CENTS,
    maxTables: MAX_TABLES,
    shows: upcomingShows().map((s) => ({
      date: s.date,
      label: showLabel(s.date),
      capacity: s.tables,
      remaining: Math.max(0, sellableTables(s) - (taken[s.date] || 0)),
    })),
  });
}
