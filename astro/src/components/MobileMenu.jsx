import { useState } from "react";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="text-gray-400 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col gap-1.5">
          <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </button>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full bg-gray-900 border-t border-gray-800 px-4 py-4 flex flex-col gap-3">
          <a href="/#about" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/#categories" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>What's There</a>
          <a href="/#dates" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>Dates</a>
          <a href="/vendor-tables" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>Vendors</a>
          <a href="/pokemon-card-show-illinois" className="text-gray-300 font-semibold py-2" onClick={() => setMenuOpen(false)}>Pokémon</a>
        </div>
      )}
    </div>
  );
}
