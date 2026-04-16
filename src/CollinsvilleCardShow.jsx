import { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Users, ChevronDown, Star, Zap, Calendar, ArrowRight } from "lucide-react";

const UPCOMING_SHOWS = [
  { date: "May 3, 2026", day: "Saturday" },
  { date: "June 7, 2026", day: "Saturday" },
  { date: "July 11, 2026", day: "Saturday" },
  { date: "August 1, 2026", day: "Saturday" },
  { date: "September 12, 2026", day: "Saturday" },
];

const CATEGORIES = [
  { name: "Sports Cards", emoji: "⚾", color: "from-red-500 to-orange-500" },
  { name: "Pokémon", emoji: "⚡", color: "from-yellow-400 to-amber-500" },
  { name: "Magic: The Gathering", emoji: "🧙", color: "from-purple-500 to-indigo-600" },
  { name: "Funko Pop!", emoji: "🎭", color: "from-pink-500 to-rose-500" },
  { name: "LEGO", emoji: "🧱", color: "from-blue-500 to-cyan-500" },
  { name: "Video Games", emoji: "🎮", color: "from-green-500 to-emerald-500" },
  { name: "Vintage Toys", emoji: "🤖", color: "from-orange-500 to-red-500" },
  { name: "Action Figures", emoji: "🦸", color: "from-indigo-500 to-purple-600" },
];

function AnimatedCounter({ end, label, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    const el = document.getElementById(`counter-${label}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [label]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <div id={`counter-${label}`} className="text-center">
      <div className="text-5xl font-black text-white">{count}+</div>
      <div className="text-sm font-semibold text-amber-300 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

function FloatingCard({ children, delay = 0 }) {
  return (
    <div
      className="animate-bounce"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "3s",
      }}
    >
      {children}
    </div>
  );
}

export default function CollinsvilleCardShow() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950 bg-opacity-90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-black text-gray-950 text-lg">
              C
            </div>
            <div>
              <div className="font-black text-lg leading-tight tracking-tight">COLLINSVILLE</div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">Card Show</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#categories" className="text-gray-400 hover:text-white transition-colors">What's There</a>
            <a href="#dates" className="text-gray-400 hover:text-white transition-colors">Dates</a>
            <a href="#vendors" className="text-gray-400 hover:text-white transition-colors">Vendors</a>
            <a
              href="#dates"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-black rounded-full hover:scale-105 transition-transform"
            >
              Next Show →
            </a>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden text-gray-400 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 flex flex-col gap-3">
            <a href="#about" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#categories" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>What's There</a>
            <a href="#dates" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>Dates</a>
            <a href="#vendors" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>Vendors</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 bg-opacity-10 border border-amber-500 border-opacity-30 rounded-full mb-8">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">FREE ADMISSION &amp; PARKING</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-6">
            <span className="block text-white">COLLINSVILLE</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              CARD SHOW
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Southern Illinois' premier trading card &amp; collectibles event.
            <span className="text-white font-semibold"> 100 vendor tables</span> of cards, toys, games &amp; more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#dates"
              className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-black text-lg rounded-2xl hover:scale-105 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              See Upcoming Shows
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#vendors"
              className="px-8 py-4 bg-white bg-opacity-5 border border-white border-opacity-10 font-bold text-lg rounded-2xl hover:bg-opacity-10 transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Become a Vendor
            </a>
          </div>

          {/* Quick info bar */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Collinsville, IL</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>9 AM – 3 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>(618) 729-6999</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={100} label="Vendor Tables" />
          <AnimatedCounter end={8} label="Categories" />
          <AnimatedCounter end={1000} label="Attendees" />
          <AnimatedCounter end={6} label="Shows / Year" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">About the Show</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              The <span className="text-amber-400">Midwest's</span> Favorite Card Show
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Held at The Crossings Church in Collinsville, IL, our show brings together collectors, dealers, and enthusiasts from across the region. Whether you're hunting for rare vintage cards, the latest Pokémon releases, or unique collectibles — you'll find it here.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              With close to 100 vendor tables and free admission, it's the perfect place for both seasoned collectors and newcomers to explore, trade, and discover.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Free Admission", "Free Parking", "Family Friendly", "All Ages"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-full text-sm font-semibold text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info card stack */}
          <div className="space-y-4">
            {[
              { icon: <MapPin className="w-6 h-6" />, title: "Location", desc: "The Crossings Church", sub: "2002 Mall Street, Collinsville, IL 62234" },
              { icon: <Clock className="w-6 h-6" />, title: "Hours", desc: "9:00 AM – 3:00 PM", sub: "Vendor setup begins at 7:30 AM" },
              { icon: <Phone className="w-6 h-6" />, title: "Contact", desc: "(618) 729-6999", sub: "Call or text for vendor inquiries" },
              { icon: <Star className="w-6 h-6" />, title: "Admission", desc: "Completely FREE", sub: "Free parking available on-site" },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group p-5 bg-gray-900 border border-gray-800 rounded-2xl hover:border-amber-500 hover:border-opacity-50 transition-all cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-gray-950 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">{item.title}</div>
                    <div className="text-lg font-bold text-white">{item.desc}</div>
                    <div className="text-sm text-gray-500">{item.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-24 px-4 bg-gray-900 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">What You'll Find</div>
            <h2 className="text-4xl md:text-5xl font-black">
              Something for <span className="text-amber-400">Every</span> Collector
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.name}
                className={`group relative p-6 rounded-2xl border transition-all text-left overflow-hidden ${
                  activeCategory === i
                    ? "bg-gradient-to-br border-transparent scale-105 shadow-2xl " + cat.color
                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <div className={`font-bold text-sm ${activeCategory === i ? "text-white" : "text-gray-300"}`}>
                  {cat.name}
                </div>
                {activeCategory !== i && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING DATES ── */}
      <section id="dates" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">Mark Your Calendar</div>
            <h2 className="text-4xl md:text-5xl font-black">
              Upcoming <span className="text-amber-400">Shows</span>
            </h2>
          </div>

          <div className="space-y-3">
            {UPCOMING_SHOWS.map((show, i) => (
              <div
                key={show.date}
                className={`group flex items-center justify-between p-5 rounded-2xl border transition-all cursor-default ${
                  i === 0
                    ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30"
                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                    i === 0
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-gray-950"
                      : "bg-gray-800 text-gray-400"
                  }`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-bold text-lg ${i === 0 ? "text-amber-400" : "text-white"}`}>
                      {show.date}
                    </div>
                    <div className="text-sm text-gray-500">{show.day} · 9 AM – 3 PM · Free Admission</div>
                  </div>
                </div>
                {i === 0 && (
                  <span className="hidden sm:inline-flex px-4 py-1.5 bg-amber-400 text-gray-950 font-black text-xs rounded-full uppercase tracking-wider">
                    Next Show
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENDOR CTA ── */}
      <section id="vendors" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-10 md:p-16 rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                  radial-gradient(circle at 80% 20%, white 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Want a Table?
              </h2>
              <p className="text-lg text-white text-opacity-80 max-w-lg mx-auto mb-8">
                Reserve your vendor table for the next show. Spaces fill up fast — reach out today to secure your spot!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6187296999"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-950 font-black text-lg rounded-2xl hover:scale-105 transition-transform shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  (618) 729-6999
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-black text-gray-950 text-lg">
                C
              </div>
              <div>
                <div className="font-black text-lg leading-tight">COLLINSVILLE CARD SHOW</div>
                <div className="text-xs text-gray-500">Collinsville, IL · Since 2024</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="https://www.facebook.com/people/Collinsville-Card-Show/61575725262148/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors font-semibold">
                Facebook
              </a>
              <span>·</span>
              <a href="tel:6187296999" className="hover:text-amber-400 transition-colors font-semibold">
                (618) 729-6999
              </a>
              <span>·</span>
              <span>2002 Mall Street, Collinsville, IL 62234</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Collinsville Card Show. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
