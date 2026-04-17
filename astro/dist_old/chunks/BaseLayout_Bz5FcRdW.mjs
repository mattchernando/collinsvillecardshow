import { d as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML, b as addAttribute, r as renderComponent, e as renderHead, f as renderSlot } from './astro/server_B3rDivAf.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

const shows = [
	{
		date: "May 3, 2026",
		day: "Saturday"
	},
	{
		date: "June 7, 2026",
		day: "Saturday"
	},
	{
		date: "July 11, 2026",
		day: "Saturday"
	},
	{
		date: "August 1, 2026",
		day: "Saturday"
	},
	{
		date: "September 12, 2026",
		day: "Saturday"
	}
];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro$1 = createAstro("https://collinsvillecardshow.com");
const $$StructuredData = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StructuredData;
  const { canonical, image } = Astro2.props;
  const siteUrl = "https://collinsvillecardshow.com";
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Collinsville Card Show",
    description: "Southern Illinois' premier trading card and collectibles show featuring sports cards, Pok\xE9mon, Magic, Funko, LEGO and more.",
    url: siteUrl,
    telephone: "+1-618-729-6999",
    priceRange: "Free",
    image,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2002 Mall Street",
      addressLocality: "Collinsville",
      addressRegion: "IL",
      postalCode: "62234",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.6706,
      longitude: -89.9845
    },
    sameAs: [
      "https://www.facebook.com/people/Collinsville-Card-Show/61575725262148/"
    ]
  };
  function isDST(year, month, day) {
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
  function centralOffset(year, month, day) {
    return isDST(year, month, day) ? "-05:00" : "-06:00";
  }
  function parseShowDate(dateStr) {
    return new Date(dateStr);
  }
  const events = shows.map((show) => {
    const d = parseShowDate(show.date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const dayNum = d.getDate();
    const monthPad = String(month).padStart(2, "0");
    const dayPad = String(dayNum).padStart(2, "0");
    const offset = centralOffset(year, month, dayNum);
    const startISO = `${year}-${monthPad}-${dayPad}T09:00:00${offset}`;
    const endISO = `${year}-${monthPad}-${dayPad}T15:00:00${offset}`;
    const monthName = d.toLocaleString("en-US", { month: "long" });
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Collinsville Card Show \u2014 ${monthName} ${year}`,
      startDate: startISO,
      endDate: endISO,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image,
      description: `Trading card and collectibles show in Collinsville, IL on ${show.date}. Free admission and free parking. 100+ vendor tables featuring sports cards, Pok\xE9mon, Magic, Funko, LEGO and more.`,
      location: {
        "@type": "Place",
        name: "Collinsville Card Show Venue",
        address: {
          "@type": "PostalAddress",
          streetAddress: "2002 Mall Street",
          addressLocality: "Collinsville",
          addressRegion: "IL",
          postalCode: "62234",
          addressCountry: "US"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 38.6706,
          longitude: -89.9845
        }
      },
      organizer: {
        "@type": "Organization",
        name: "Collinsville Card Show",
        url: siteUrl
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: canonical
      }
    };
  });
  return renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', "<\/script> ", ""])), unescapeHTML(JSON.stringify(localBusiness)), events.map((event) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(event)))));
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/StructuredData.astro", void 0);

const $$Astro = createAstro("https://collinsvillecardshow.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    image = "/og-image.png",
    canonical = Astro2.url.href
  } = Astro2.props;
  const siteUrl = "https://collinsvillecardshow.com";
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullCanonical = canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}`;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Primary Meta --><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(fullCanonical, "href")}><meta name="theme-color" content="#f59e0b"><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:site_name" content="Collinsville Card Show"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(fullImageUrl, "content")}><meta property="og:url"${addAttribute(fullCanonical, "content")}><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(fullImageUrl, "content")}><!-- Favicon / Icons --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet"><!-- Structured Data -->${renderComponent($$result, "StructuredData", $$StructuredData, { "canonical": fullCanonical, "image": fullImageUrl })}${renderHead()}</head> <body class="min-h-screen bg-gray-950 text-white overflow-x-hidden" style="font-family: 'Inter', system-ui, sans-serif;"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, shows as s };
