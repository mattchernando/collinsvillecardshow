// /shows.ics — iCalendar feed of upcoming Collinsville Card Show dates.
// Static endpoint: emitted at build time (output: 'static' in astro.config.mjs).
// Subscribed to via webcal:// on iOS/macOS Calendar, or imported on Android/Google Calendar.
import type { APIRoute } from 'astro';
import shows from '../data/shows.json';

const SITE_URL = 'https://collinsvillecardshow.com';
const VENUE_NAME = 'The Crossings Church';
const VENUE_ADDRESS = '2002 Mall Street, Collinsville, IL 62234';
const ORGANIZER_NAME = 'Collinsville Card Show';
const ORGANIZER_EMAIL = 'info@collinsvillecardshow.com';

// US DST: second Sunday of March → first Sunday of November
function isDST(year: number, month: number, day: number): boolean {
  if (month > 3 && month < 11) return true;
  if (month < 3 || month > 11) return false;
  if (month === 3) {
    const marchFirst = new Date(year, 2, 1).getDay();
    const secondSunday = marchFirst === 0 ? 8 : 14 - marchFirst + 1;
    return day >= secondSunday;
  }
  const novFirst = new Date(year, 10, 1).getDay();
  const firstSunday = novFirst === 0 ? 1 : 7 - novFirst + 1;
  return day < firstSunday;
}

// Central Time → UTC offset in hours. 5 during DST (CDT), 6 during standard (CST).
function centralToUtcOffsetHours(year: number, month: number, day: number): number {
  return isDST(year, month, day) ? 5 : 6;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

// Format a UTC Date as YYYYMMDDTHHMMSSZ (iCalendar UTC form, RFC 5545).
function formatUTC(date: Date): string {
  return (
    date.getUTCFullYear() +
    pad2(date.getUTCMonth() + 1) +
    pad2(date.getUTCDate()) +
    'T' +
    pad2(date.getUTCHours()) +
    pad2(date.getUTCMinutes()) +
    pad2(date.getUTCSeconds()) +
    'Z'
  );
}

// Convert "June 6, 2026" + a Central-time hour to a UTC Date.
function centralLocalToUTC(showDate: string, hour24: number): Date {
  const d = new Date(showDate);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const offset = centralToUtcOffsetHours(y, m, day);
  // 9 AM CDT = 14:00Z; 9 AM CST = 15:00Z.
  return new Date(Date.UTC(y, m - 1, day, hour24 + offset, 0, 0));
}

// RFC 5545 line folding — lines >75 octets must be wrapped with CRLF + space.
function fold(line: string): string {
  if (line.length <= 75) return line;
  const out: string[] = [];
  let remaining = line;
  out.push(remaining.slice(0, 75));
  remaining = remaining.slice(75);
  while (remaining.length > 74) {
    out.push(' ' + remaining.slice(0, 74));
    remaining = remaining.slice(74);
  }
  if (remaining.length) out.push(' ' + remaining);
  return out.join('\r\n');
}

// Escape commas, semicolons, backslashes, and newlines per RFC 5545 §3.3.11.
function esc(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function buildIcs(): string {
  const dtstamp = formatUTC(new Date());

  const events = shows.map((show) => {
    const start = centralLocalToUTC(show.date, 9);
    const end = centralLocalToUTC(show.date, 15);
    const monthName = new Date(show.date).toLocaleString('en-US', { month: 'long' });
    const year = new Date(show.date).getFullYear();

    // Stable UID: same show date always produces the same UID, so calendar
    // subscribers don't get duplicate events on refresh.
    const uidDate =
      start.getUTCFullYear() + pad2(start.getUTCMonth() + 1) + pad2(start.getUTCDate());
    const uid = `collinsville-card-show-${uidDate}@collinsvillecardshow.com`;

    const summary = `Collinsville Card Show — ${monthName} ${year}`;
    const description =
      `Trading cards & collectibles show in Collinsville, IL. ` +
      `Free admission, free parking. 100+ vendor tables featuring sports cards, ` +
      `Pokémon, One Piece TCG, Magic, Funko, LEGO and more. ` +
      `9 AM – 3 PM. ${SITE_URL}`;

    return [
      'BEGIN:VEVENT',
      fold(`UID:${uid}`),
      fold(`DTSTAMP:${dtstamp}`),
      fold(`DTSTART:${formatUTC(start)}`),
      fold(`DTEND:${formatUTC(end)}`),
      fold(`SUMMARY:${esc(summary)}`),
      fold(`DESCRIPTION:${esc(description)}`),
      fold(`LOCATION:${esc(`${VENUE_NAME}, ${VENUE_ADDRESS}`)}`),
      fold(`URL:${SITE_URL}`),
      fold(`ORGANIZER;CN=${esc(ORGANIZER_NAME)}:mailto:${ORGANIZER_EMAIL}`),
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Collinsville Card Show is tomorrow!',
      'TRIGGER:-P1D',
      'END:VALARM',
      'END:VEVENT',
    ].join('\r\n');
  });

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Collinsville Card Show//Show Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    fold('X-WR-CALNAME:Collinsville Card Show'),
    fold('NAME:Collinsville Card Show'),
    fold('X-WR-CALDESC:Upcoming Collinsville Card Show dates — sports cards, Pokémon & collectibles in Collinsville, IL.'),
    fold('DESCRIPTION:Upcoming Collinsville Card Show dates — sports cards, Pokémon & collectibles in Collinsville, IL.'),
    'X-WR-TIMEZONE:America/Chicago',
    'REFRESH-INTERVAL;VALUE=DURATION:P1D',
    'X-PUBLISHED-TTL:P1D',
    ...events,
    'END:VCALENDAR',
  ];

  // RFC 5545 requires CRLF line endings.
  return lines.join('\r\n') + '\r\n';
}

export const GET: APIRoute = () => {
  return new Response(buildIcs(), {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="collinsville-card-show.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
