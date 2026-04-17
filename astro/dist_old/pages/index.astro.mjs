import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, b as addAttribute } from '../chunks/astro/server_B3rDivAf.mjs';
import 'piccolore';
import { s as shows, $ as $$BaseLayout } from '../chunks/BaseLayout_Bz5FcRdW.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "text-gray-400 p-2",
        onClick: () => setMenuOpen(!menuOpen),
        "aria-label": "Toggle menu",
        children: /* @__PURE__ */ jsxs("div", { className: "w-6 flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: `block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}` }),
          /* @__PURE__ */ jsx("span", { className: `block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}` }),
          /* @__PURE__ */ jsx("span", { className: `block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}` })
        ] })
      }
    ),
    menuOpen && /* @__PURE__ */ jsxs("div", { className: "absolute left-0 right-0 top-full bg-gray-900 border-t border-gray-800 px-4 py-4 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx("a", { href: "#about", className: "text-gray-300 font-semibold py-2", onClick: () => setMenuOpen(false), children: "About" }),
      /* @__PURE__ */ jsx("a", { href: "#categories", className: "text-gray-300 font-semibold py-2", onClick: () => setMenuOpen(false), children: "What's There" }),
      /* @__PURE__ */ jsx("a", { href: "#dates", className: "text-gray-300 font-semibold py-2", onClick: () => setMenuOpen(false), children: "Dates" }),
      /* @__PURE__ */ jsx("a", { href: "#vendors", className: "text-gray-300 font-semibold py-2", onClick: () => setMenuOpen(false), children: "Vendors" })
    ] })
  ] });
}

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 w-full z-50 bg-gray-950 bg-opacity-90 backdrop-blur-md border-b border-gray-800"> <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"> <div class="flex items-center gap-2"> <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-black text-gray-950 text-lg">
C
</div> <div> <div class="font-black text-lg leading-tight tracking-tight">COLLINSVILLE</div> <div class="text-xs font-bold text-amber-400 uppercase tracking-widest">Card Show</div> </div> </div> <!-- Desktop nav — fully static --> <div class="hidden md:flex items-center gap-8 text-sm font-semibold"> <a href="#about" class="text-gray-400 hover:text-white transition-colors">About</a> <a href="#categories" class="text-gray-400 hover:text-white transition-colors">What's There</a> <a href="#dates" class="text-gray-400 hover:text-white transition-colors">Dates</a> <a href="#vendors" class="text-gray-400 hover:text-white transition-colors">Vendors</a> <a href="#dates" class="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-black rounded-full hover:scale-105 transition-transform">
Next Show →
</a> </div> <!-- Mobile menu — React island, only hydrated on load for interactivity --> ${renderComponent($$result, "MobileMenu", MobileMenu, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/MobileMenu.jsx", "client:component-export": "default" })} </div> </nav>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/Nav.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="hero relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" data-astro-cid-bbe6dxrz> <!-- Animated background gradient --> <div class="absolute inset-0" style="background:
      radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);" data-astro-cid-bbe6dxrz></div> <!-- Grid pattern overlay — CSS-only parallax via background-attachment: fixed --> <div class="hero-grid absolute inset-0 opacity-5" data-astro-cid-bbe6dxrz></div> <div class="relative z-10 text-center px-4 max-w-5xl mx-auto" data-astro-cid-bbe6dxrz> <!-- Badge --> <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 bg-opacity-10 border border-amber-500 border-opacity-30 rounded-full mb-8" data-astro-cid-bbe6dxrz> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bbe6dxrz><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" data-astro-cid-bbe6dxrz></path></svg> <span class="text-sm font-bold text-amber-400" data-astro-cid-bbe6dxrz>FREE ADMISSION &amp; PARKING</span> </div> <h1 class="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-6" data-astro-cid-bbe6dxrz> <span class="block text-white" data-astro-cid-bbe6dxrz>COLLINSVILLE</span> <span class="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent" data-astro-cid-bbe6dxrz>
CARD SHOW
</span> </h1> <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed" data-astro-cid-bbe6dxrz>
Southern Illinois' premier trading card &amp; collectibles event.
<span class="text-white font-semibold" data-astro-cid-bbe6dxrz> 100 vendor tables</span> of cards, toys, games &amp; more.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16" data-astro-cid-bbe6dxrz> <a href="#dates" class="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-black text-lg rounded-2xl hover:scale-105 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2" data-astro-cid-bbe6dxrz>
See Upcoming Shows
<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bbe6dxrz><path d="M5 12h14" data-astro-cid-bbe6dxrz></path><path d="m12 5 7 7-7 7" data-astro-cid-bbe6dxrz></path></svg> </a> <a href="#vendors" class="px-8 py-4 bg-white bg-opacity-5 border border-white border-opacity-10 font-bold text-lg rounded-2xl hover:bg-opacity-10 transition-all flex items-center justify-center gap-2" data-astro-cid-bbe6dxrz> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bbe6dxrz><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" data-astro-cid-bbe6dxrz></path><circle cx="9" cy="7" r="4" data-astro-cid-bbe6dxrz></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87" data-astro-cid-bbe6dxrz></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-astro-cid-bbe6dxrz></path></svg>
Become a Vendor
</a> </div> <!-- Quick info bar --> <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-500" data-astro-cid-bbe6dxrz> <div class="flex items-center gap-2" data-astro-cid-bbe6dxrz> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bbe6dxrz><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" data-astro-cid-bbe6dxrz></path><circle cx="12" cy="10" r="3" data-astro-cid-bbe6dxrz></circle></svg> <span data-astro-cid-bbe6dxrz>Collinsville, IL</span> </div> <div class="flex items-center gap-2" data-astro-cid-bbe6dxrz> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bbe6dxrz><circle cx="12" cy="12" r="10" data-astro-cid-bbe6dxrz></circle><polyline points="12 6 12 12 16 14" data-astro-cid-bbe6dxrz></polyline></svg> <span data-astro-cid-bbe6dxrz>9 AM – 3 PM</span> </div> <div class="flex items-center gap-2" data-astro-cid-bbe6dxrz> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bbe6dxrz><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-bbe6dxrz></path></svg> <span data-astro-cid-bbe6dxrz>(618) 729-6999</span> </div> </div> </div> <!-- Scroll indicator --> <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" data-astro-cid-bbe6dxrz> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bbe6dxrz><path d="m6 9 6 6 6-6" data-astro-cid-bbe6dxrz></path></svg> </div> </section> `;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/Hero.astro", void 0);

function AnimatedCounter({ end, label, duration = 2e3 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);
  return /* @__PURE__ */ jsxs("div", { ref, className: "text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-5xl font-black text-white", children: [
      count,
      "+"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-amber-300 uppercase tracking-widest mt-1", children: label })
  ] });
}

const $$StatsBar = createComponent(($$result, $$props, $$slots) => {
  const stats = [
    { end: 100, label: "Vendor Tables" },
    { end: 8, label: "Categories" },
    { end: 1e3, label: "Attendees" },
    { end: 6, label: "Shows / Year" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="relative py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600"> <div class="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8"> ${stats.map((stat) => renderTemplate`${renderComponent($$result, "AnimatedCounter", AnimatedCounter, { "client:visible": true, "end": stat.end, "label": stat.label, "client:component-hydration": "visible", "client:component-path": "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/AnimatedCounter.jsx", "client:component-export": "default" })}`)} </div> </section>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/StatsBar.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  const tags = ["Free Admission", "Free Parking", "Family Friendly", "All Ages"];
  const infoCards = [
    {
      title: "Location",
      desc: "The Crossings Church",
      sub: "2002 Mall Street, Collinsville, IL 62234",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
    },
    {
      title: "Hours",
      desc: "9:00 AM \u2013 3:00 PM",
      sub: "Vendor setup begins at 7:30 AM",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    },
    {
      title: "Contact",
      desc: "(618) 729-6999",
      sub: "Call or text for vendor inquiries",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
    },
    {
      title: "Admission",
      desc: "Completely FREE",
      sub: "Free parking available on-site",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="about" class="py-24 px-4"> <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"> <div> <div class="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">About the Show</div> <h2 class="text-4xl md:text-5xl font-black leading-tight mb-6">
The <span class="text-amber-400">Midwest's</span> Favorite Card Show
</h2> <p class="text-gray-400 text-lg leading-relaxed mb-6">
Held at The Crossings Church in Collinsville, IL, our show brings together collectors, dealers, and enthusiasts from across the region. Whether you're hunting for rare vintage cards, the latest Pokémon releases, or unique collectibles — you'll find it here.
</p> <p class="text-gray-400 text-lg leading-relaxed mb-8">
With close to 100 vendor tables and free admission, it's the perfect place for both seasoned collectors and newcomers to explore, trade, and discover.
</p> <div class="flex flex-wrap gap-3"> ${tags.map((tag) => renderTemplate`<span class="px-4 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-full text-sm font-semibold text-gray-300"> ${tag} </span>`)} </div> </div> <!-- Info card stack --> <div class="space-y-4"> ${infoCards.map((item) => renderTemplate`<div class="group p-5 bg-gray-900 border border-gray-800 rounded-2xl hover:border-amber-500 hover:border-opacity-50 transition-all cursor-default"> <div class="flex items-start gap-4"> <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-gray-950 flex-shrink-0"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(item.icon)}` })} </div> <div> <div class="text-xs font-bold text-amber-400 uppercase tracking-wider">${item.title}</div> <div class="text-lg font-bold text-white">${item.desc}</div> <div class="text-sm text-gray-500">${item.sub}</div> </div> </div> </div>`)} </div> </div> <!-- Google Maps Embed --> <div class="max-w-6xl mx-auto mt-12"> <iframe title="Map to Collinsville Card Show at The Crossings Church, 2002 Mall Street, Collinsville, IL 62234" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.5!2d-89.9986!3d38.6706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2002+Mall+St%2C+Collinsville%2C+IL+62234!5e0!3m2!1sen!2sus!4v1700000000000" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-2xl border border-gray-800"></iframe> </div> </section>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/About.astro", void 0);

const $$Categories = createComponent(($$result, $$props, $$slots) => {
  const categories = [
    { name: "Sports Cards", emoji: "\u26BE", color: "from-red-500 to-orange-500" },
    { name: "Pok\xE9mon", emoji: "\u26A1", color: "from-yellow-400 to-amber-500" },
    { name: "Magic: The Gathering", emoji: "\u{1F9D9}", color: "from-purple-500 to-indigo-600" },
    { name: "Funko Pop!", emoji: "\u{1F3AD}", color: "from-pink-500 to-rose-500" },
    { name: "LEGO", emoji: "\u{1F9F1}", color: "from-blue-500 to-cyan-500" },
    { name: "Video Games", emoji: "\u{1F3AE}", color: "from-green-500 to-emerald-500" },
    { name: "Vintage Toys", emoji: "\u{1F916}", color: "from-orange-500 to-red-500" },
    { name: "Action Figures", emoji: "\u{1F9B8}", color: "from-indigo-500 to-purple-600" }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="categories" class="py-24 px-4 bg-gray-900 bg-opacity-50"> <div class="max-w-6xl mx-auto"> <div class="text-center mb-16"> <div class="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">What You'll Find</div> <h2 class="text-4xl md:text-5xl font-black">
Something for <span class="text-amber-400">Every</span> Collector
</h2> </div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"> ${categories.map((cat) => renderTemplate`<div class="group relative p-6 rounded-2xl border bg-gray-900 border-gray-800 hover:border-gray-700 transition-all text-left overflow-hidden"> <div class="text-4xl mb-3">${cat.emoji}</div> <div class="font-bold text-sm text-gray-300">${cat.name}</div> <div${addAttribute(`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`, "class")}></div> </div>`)} </div> </div> </section>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/Categories.astro", void 0);

const $$UpcomingShows = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="dates" class="py-24 px-4"> <div class="max-w-4xl mx-auto"> <div class="text-center mb-16"> <div class="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">Mark Your Calendar</div> <h2 class="text-4xl md:text-5xl font-black">
Upcoming <span class="text-amber-400">Shows</span> </h2> </div> <div class="space-y-3"> ${shows.map((show, i) => renderTemplate`<div${addAttribute([
    "group flex items-center justify-between p-5 rounded-2xl border transition-all cursor-default",
    i === 0 ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30" : "bg-gray-900 border-gray-800 hover:border-gray-700"
  ], "class:list")}> <div class="flex items-center gap-4"> <div${addAttribute([
    "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg",
    i === 0 ? "bg-gradient-to-br from-amber-400 to-orange-500 text-gray-950" : "bg-gray-800 text-gray-400"
  ], "class:list")}> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> </div> <div> <div${addAttribute(["font-bold text-lg", i === 0 ? "text-amber-400" : "text-white"], "class:list")}> ${show.date} </div> <div class="text-sm text-gray-500">${show.day} · 9 AM – 3 PM · Free Admission</div> </div> </div> ${i === 0 && renderTemplate`<span class="hidden sm:inline-flex px-4 py-1.5 bg-amber-400 text-gray-950 font-black text-xs rounded-full uppercase tracking-wider">
Next Show
</span>`} </div>`)} </div> </div> </section>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/UpcomingShows.astro", void 0);

const $$VendorCTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="vendors" class="py-24 px-4"> <div class="max-w-4xl mx-auto"> <div class="relative p-10 md:p-16 rounded-3xl overflow-hidden"> <!-- Background --> <div class="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600"></div> <div class="absolute inset-0 opacity-10" style="background-image:
          radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, white 1px, transparent 1px);
          background-size: 30px 30px;"></div> <div class="relative z-10 text-center"> <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
Want a Table?
</h2> <p class="text-lg text-white text-opacity-80 max-w-lg mx-auto mb-8">
Reserve your vendor table for the next show. Spaces fill up fast — reach out today to secure your spot!
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="tel:6187296999" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-950 font-black text-lg rounded-2xl hover:scale-105 transition-transform shadow-xl"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
(618) 729-6999
</a> </div> </div> </div> </div> </section>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/VendorCTA.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="py-12 px-4 border-t border-gray-800"> <div class="max-w-6xl mx-auto"> <div class="flex flex-col md:flex-row items-center justify-between gap-6"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-black text-gray-950 text-lg">
C
</div> <div> <div class="font-black text-lg leading-tight">COLLINSVILLE CARD SHOW</div> <div class="text-xs text-gray-500">Collinsville, IL · Since 2024</div> </div> </div> <div class="flex items-center gap-6 text-sm text-gray-500"> <a href="https://www.facebook.com/people/Collinsville-Card-Show/61575725262148/" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors font-semibold">
Facebook
</a> <span>·</span> <a href="tel:6187296999" class="hover:text-amber-400 transition-colors font-semibold">
(618) 729-6999
</a> <span>·</span> <span>2002 Mall Street, Collinsville, IL 62234</span> </div> </div> <div class="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
&copy; ${year} Collinsville Card Show. All rights reserved.
</div> </div> </footer>`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/components/Footer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const title = "Collinsville Card Show | Trading Cards, Pok\xE9mon & Collectibles in Southern Illinois";
  const description = "Southern Illinois' premier trading card and collectibles show in Collinsville, IL. 100 vendor tables featuring sports cards, Pok\xE9mon, Magic, Funko, LEGO and more. Free admission, free parking. Near St. Louis and the Metro East.";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "image": "/og-image.png", "canonical": "https://collinsvillecardshow.com/" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, {})} ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "StatsBar", $$StatsBar, {})} ${renderComponent($$result2, "About", $$About, {})} ${renderComponent($$result2, "Categories", $$Categories, {})} ${renderComponent($$result2, "UpcomingShows", $$UpcomingShows, {})} ${renderComponent($$result2, "VendorCTA", $$VendorCTA, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/pages/index.astro", void 0);

const $$file = "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
