import { useEffect, useState } from "react";

const SELL_OPTIONS = [
  { value: "tcg", label: "TCG", hint: "Pokémon, Magic, One Piece…" },
  { value: "sports", label: "Sports", hint: "Cards & memorabilia" },
  { value: "both", label: "Both", hint: "TCG and sports" },
  { value: "other", label: "Other", hint: "Funko, LEGO, games…" },
];

const VISIBLE_DATES = 4;

const money = (cents) => `$${(cents / 100).toFixed(cents % 100 ? 2 : 0)}`;

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500";

function formatPhone(value) {
  const d = value.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function Section({ step, title, children }) {
  return (
    <section className="p-6 md:p-8 rounded-3xl bg-gray-900/50 border border-gray-800">
      <h2 className="flex items-center gap-3 text-xl font-black mb-5">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white text-sm flex items-center justify-center">
          {step}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function VendorForm() {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ date: "", tables: 1, sells: "", sellsOther: "", name: "", business: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showAllDates, setShowAllDates] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  async function load() {
    try {
      const res = await fetch("/api/availability");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
      setForm((f) => {
        if (f.date) return f;
        const first = json.shows.find((s) => s.remaining > 0);
        return first ? { ...f, date: first.date } : f;
      });
    } catch {
      setLoadError("We couldn't load show availability. Please refresh the page.");
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cancelled = params.get("cancelled");
    const release = cancelled
      ? fetch("/api/cancel", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: cancelled }) })
          .catch(() => {})
          .then(() => {
            setNotice("Checkout was cancelled — you weren't charged. Your tables have been released.");
            window.history.replaceState(null, "", window.location.pathname + window.location.hash);
          })
      : Promise.resolve();
    release.then(load);
  }, []);

  const show = data?.shows.find((s) => s.date === form.date);
  const maxForShow = show ? Math.min(data.maxTables, show.remaining) : data?.maxTables ?? 4;

  useEffect(() => {
    if (show && form.tables > maxForShow) setForm((f) => ({ ...f, tables: Math.max(1, maxForShow) }));
  }, [form.date, maxForShow]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.date) return setError("Please choose a show date.");
    if (!form.sells) return setError("Please choose what you sell.");
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        if (res.status === 409) load();
        setSubmitting(false);
        return;
      }
      window.location.assign(json.url);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (loadError) return <p className="text-center text-red-400">{loadError}</p>;
  if (!data) return <p className="text-center text-gray-500 py-20">Loading show dates…</p>;
  if (!data.shows.length) return <p className="text-center text-gray-400 py-20">No upcoming shows are open for registration yet. Check back soon!</p>;

  const total = form.tables * data.priceCents;
  // Keep the selected date visible even if it's past the first few (e.g. earlier shows sold out).
  const allDates = showAllDates || data.shows.findIndex((s) => s.date === form.date) >= VISIBLE_DATES;

  return (
    <form onSubmit={submit} className="space-y-6">
      {notice && (
        <div className="p-4 rounded-2xl bg-red-600/10 border border-red-600/30 text-red-200 text-sm">{notice}</div>
      )}

      <Section step="1" title="Pick a show">
        <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Show date">
          {(allDates ? data.shows : data.shows.slice(0, VISIBLE_DATES)).map((s) => {
            const soldOut = s.remaining === 0;
            const selected = form.date === s.date;
            const pct = Math.round(((s.capacity - s.remaining) / s.capacity) * 100);
            return (
              <button
                type="button"
                key={s.date}
                role="radio"
                aria-checked={selected}
                aria-label={`${s.label}: ${soldOut ? "sold out" : `${s.remaining} of ${s.capacity} tables available`}`}
                disabled={soldOut}
                onClick={() => set("date")(s.date)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  selected
                    ? "border-red-500 bg-red-600/10"
                    : soldOut
                    ? "border-gray-800 bg-gray-900/40 opacity-50 cursor-not-allowed"
                    : "border-gray-800 bg-gray-900 hover:border-gray-600"
                }`}
              >
                <div className={`font-bold ${selected ? "text-red-500" : "text-white"}`}>{s.label}</div>
                <div className="mt-1 text-sm">
                  {soldOut ? (
                    <span className="font-bold text-red-400">Sold out</span>
                  ) : (
                    <span className={s.remaining <= 10 ? "font-bold text-yellow-400" : "text-gray-400"}>
                      <span className="font-black text-white">{s.remaining}</span> of {s.capacity} tables available
                    </span>
                  )}
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-700" style={{ width: `${pct}%` }} />
                </div>
              </button>
            );
          })}
        </div>
        {!allDates && data.shows.length > VISIBLE_DATES && (
          <button
            type="button"
            onClick={() => setShowAllDates(true)}
            className="mt-3 w-full py-3 rounded-2xl border border-dashed border-gray-700 text-sm font-bold text-gray-400 hover:text-white hover:border-gray-500"
          >
            Show {data.shows.length - VISIBLE_DATES} more dates
          </button>
        )}
      </Section>

      <Section step="2" title="How many tables?">
        <div className="grid grid-cols-4 gap-3" role="radiogroup" aria-label="Number of tables">
          {Array.from({ length: data.maxTables }, (_, i) => i + 1).map((n) => {
            const disabled = n > maxForShow;
            const selected = form.tables === n;
            return (
              <button
                type="button"
                key={n}
                role="radio"
                aria-checked={selected}
                disabled={disabled}
                onClick={() => set("tables")(n)}
                className={`py-4 rounded-2xl border font-black text-2xl transition-all ${
                  selected
                    ? "border-red-600 bg-red-600 text-white"
                    : disabled
                    ? "border-gray-800 text-gray-700 cursor-not-allowed"
                    : "border-gray-800 bg-gray-900 hover:border-gray-600"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-gray-500">
          {money(data.priceCents)} per table · up to {data.maxTables} per registration
        </p>
      </Section>

      <Section step="3" title="What do you sell?">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-label="What you sell">
          {SELL_OPTIONS.map((o) => {
            const selected = form.sells === o.value;
            return (
              <button
                type="button"
                key={o.value}
                role="radio"
                aria-checked={selected}
                aria-label={`${o.label} — ${o.hint}`}
                onClick={() => set("sells")(o.value)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selected ? "border-red-500 bg-red-600/10" : "border-gray-800 bg-gray-900 hover:border-gray-600"
                }`}
              >
                <div className={`font-black ${selected ? "text-red-500" : "text-white"}`}>{o.label}</div>
                <div className="text-xs text-gray-500 mt-1">{o.hint}</div>
              </button>
            );
          })}
        </div>
        {form.sells === "other" && (
          <input
            className={`${inputClass} mt-3`}
            placeholder="Tell us what you sell"
            value={form.sellsOther}
            onChange={set("sellsOther")}
            maxLength={200}
            required
          />
        )}
      </Section>

      <Section step="4" title="Your contact info">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-semibold text-gray-400 mb-1.5">Your name *</span>
            <input className={inputClass} value={form.name} onChange={set("name")} autoComplete="name" maxLength={100} required />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-gray-400 mb-1.5">Business name <span className="text-gray-600">(optional)</span></span>
            <input className={inputClass} value={form.business} onChange={set("business")} autoComplete="organization" maxLength={120} />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-gray-400 mb-1.5">Email *</span>
            <input className={inputClass} type="email" value={form.email} onChange={set("email")} autoComplete="email" maxLength={200} required />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-gray-400 mb-1.5">Phone *</span>
            <input
              className={inputClass}
              type="tel"
              inputMode="tel"
              placeholder="(618) 555-0123"
              value={form.phone}
              onChange={(e) => set("phone")(formatPhone(e.target.value))}
              autoComplete="tel"
              required
            />
          </label>
        </div>
      </Section>

      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-red-600/10 to-red-700/10 border border-red-600/30">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div className="text-sm text-gray-400">
              {form.tables} table{form.tables > 1 ? "s" : ""} × {money(data.priceCents)}
              {show && <> · {show.label}</>}
            </div>
            <div className="text-sm text-gray-500">Receipt emailed after payment</div>
          </div>
          <div className="text-4xl font-black text-red-500">{money(total)}</div>
        </div>
        {error && (
          <p role="alert" className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting || !show || show.remaining === 0}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-700 text-white font-black text-lg hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          {submitting ? "Holding your tables…" : `Continue to secure payment · ${money(total)}`}
        </button>
        <p className="mt-3 text-xs text-center text-gray-500">
          Payments are processed by Stripe. Your tables are held for 30 minutes while you check out.
        </p>
      </div>
    </form>
  );
}
