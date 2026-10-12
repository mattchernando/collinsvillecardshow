// Shared by the Astro pages (build time) and the Pages Functions API (request time).
// shows.json keeps human-readable dates ("November 7, 2026") for the SEO pages;
// here they're normalized to YYYY-MM-DD for registration logic.
import rawShows from '../data/shows.json';

export const PRICE_CENTS = 3500;
export const MAX_TABLES = 4;

export const SELLS = {
  tcg: 'TCG',
  sports: 'Sports',
  both: 'TCG & Sports',
  other: 'Other',
};

const pad = (n) => String(n).padStart(2, '0');

// Parsed with local-time getters, so the day is right whatever the runtime's timezone.
function toIsoDate(display) {
  const d = new Date(display);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const shows = rawShows.map((s) => ({ date: toIsoDate(s.date), tables: s.tables }));

export function showLabel(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function todayCentral() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

// A show stays open for registration through the day of the show.
export function upcomingShows() {
  const today = todayCentral();
  return shows.filter((s) => s.date >= today);
}
