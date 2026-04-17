/**
 * Shared SEO helpers — reusable across all pages for structured data generation.
 * Centralizes FAQ schema and breadcrumb generation so landing pages stay DRY.
 */

export const SITE_URL = 'https://collinsvillecardshow.com';
export const SITE_NAME = 'Collinsville Card Show';
export const PHONE = '(618) 729-6999';
export const PHONE_HREF = 'tel:6187296999';
export const ADDRESS = {
  street: '2002 Mall Street',
  city: 'Collinsville',
  state: 'IL',
  zip: '62234',
  full: '2002 Mall Street, Collinsville, IL 62234',
};

/** Homepage FAQ items — also used in FAQ.astro component */
export const homepageFAQ = [
  {
    question: "Is there an admission fee for the Collinsville Card Show?",
    answer: "No — admission is completely free! Parking is also free. Just show up and enjoy the show.",
  },
  {
    question: "Where is the Collinsville Card Show located?",
    answer: "We're held at The Crossings Church, 2002 Mall Street, Collinsville, IL 62234. That's just 10 minutes east of downtown St. Louis, right off I-55/I-70 in the Metro East area.",
  },
  {
    question: "What time does the card show open and close?",
    answer: "Doors open at 9:00 AM and the show runs until 3:00 PM. Vendor setup begins at 7:30 AM.",
  },
  {
    question: "What kinds of cards and collectibles are at the show?",
    answer: "You'll find a huge variety — sports cards (baseball, football, basketball, hockey), Pokémon cards, Magic: The Gathering, Yu-Gi-Oh!, Funko Pops, LEGO sets, vintage toys, action figures, video games, and much more.",
  },
  {
    question: "Is the card show family-friendly?",
    answer: "Absolutely! The Collinsville Card Show is a welcoming, all-ages event. Kids love browsing Pokémon cards and action figures, and it's a great way to spend the day as a family.",
  },
  {
    question: "How do I reserve a vendor table?",
    answer: "Call or text us at (618) 729-6999 to reserve your table. Tables fill up fast, so we recommend reaching out as early as possible.",
  },
  {
    question: "How often does the Collinsville Card Show happen?",
    answer: "We hold shows regularly throughout the year — typically once a month on Saturdays. Check our upcoming dates section for the next scheduled show.",
  },
  {
    question: "Is the card show near St. Louis?",
    answer: "Yes! Collinsville is located in the St. Louis Metro East, just 10 minutes from downtown St. Louis across the river. We're easily accessible from anywhere in the greater St. Louis area, Southern Illinois, and beyond.",
  },
];

/** Build a FAQPage JSON-LD object from an array of Q&A pairs */
export function buildFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** Build a BreadcrumbList JSON-LD object */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
