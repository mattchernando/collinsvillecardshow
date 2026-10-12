import { useEffect, useMemo, useState } from "react";
import { todayCentral } from "../lib/shows.js";

const SELL_GROUPS = [
  { key: "tcg", label: "TCG", color: "bg-sky-400" },
  { key: "sports", label: "Sports", color: "bg-emerald-400" },
  { key: "both", label: "Both", color: "bg-amber-400" },
  { key: "other", label: "Other", color: "bg-fuchsia-400" },
];
const groupOrder = Object.fromEntries(SELL_GROUPS.map((g, i) => [g.key, i]));
const money = (cents) => `$${(cents / 100).toFixed(2)}`;

function Stat({ label, value, sub }) {
  return (
    <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
      <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</div>
      <div className="text-3xl font-black mt-1">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [shows, setShows] = useState(null);
  const [date, setDate] = useState("");
  const [vendors, setVendors] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  async function load(d) {
    setError("");
    try {
      const res = await fetch(`/api/admin/registrations${d ? `?date=${d}` : ""}`);
      if (res.status === 401) return setError("You need to sign in to view this page.");
      const json = await res.json();
      if (!res.ok) return setError(json.error || "Couldn't load registrations.");
      setShows(json.shows);
      if (d) setVendors(json.vendors);
      return json;
    } catch {
      setError("Couldn't load registrations.");
    }
  }

  useEffect(() => {
    load().then((json) => {
      if (!json) return;
      const today = todayCentral();
      const next = json.shows.find((s) => s.date >= today) || json.shows[json.shows.length - 1];
      if (next) setDate(next.date);
    });
  }, []);

  useEffect(() => {
    if (!date) return;
    setVendors(null);
    load(date);
  }, [date]);

  const show = shows?.find((s) => s.date === date);

  const rows = useMemo(() => {
    if (!vendors) return [];
    const q = query.trim().toLowerCase();
    return vendors
      .filter((v) => !q || [v.name, v.business, v.email, v.phone, v.sellsLabel].some((x) => x?.toLowerCase().includes(q)))
      .sort((a, b) => groupOrder[a.sells] - groupOrder[b.sells] || a.name.localeCompare(b.name));
  }, [vendors, query]);

  const tablesBySells = useMemo(() => {
    const t = Object.fromEntries(SELL_GROUPS.map((g) => [g.key, 0]));
    vendors?.forEach((v) => (t[v.sells] += v.tables));
    return t;
  }, [vendors]);

  if (error) return <p className="text-center text-red-400 py-20">{error}</p>;
  if (!shows) return <p className="text-center text-gray-500 py-20">Loading…</p>;

  const revenue = vendors?.reduce((s, v) => s + v.amountCents, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Vendor Registrations</h1>
          <p className="text-gray-500 text-sm mt-1">Paid vendors only. Grouped by what they sell for table layout.</p>
        </div>
        <div className="flex gap-3">
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 font-semibold focus:outline-none focus:border-red-500"
            aria-label="Show date"
          >
            {shows.map((s) => (
              <option key={s.date} value={s.date}>
                {s.label} — {s.sold}/{s.capacity}
              </option>
            ))}
          </select>
          <a
            href={`/api/admin/export.csv?date=${date}`}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-black whitespace-nowrap"
          >
            Download CSV
          </a>
        </div>
      </div>

      {show && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Tables sold" value={`${show.sold} / ${show.capacity}`} sub={show.held ? `${show.held} held in checkout right now` : null} />
          <Stat label="Tables left" value={show.capacity - show.sold - show.held} />
          <Stat label="Vendors" value={show.vendors} />
          <Stat label="Collected" value={money(revenue)} sub="Before Stripe fees" />
        </div>
      )}

      {show && show.sold > 0 && (
        <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Tables by category</div>
          <div className="flex h-3 rounded-full overflow-hidden bg-gray-800">
            {SELL_GROUPS.map((g) => (
              <div key={g.key} className={g.color} style={{ width: `${(tablesBySells[g.key] / show.sold) * 100}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
            {SELL_GROUPS.map((g) => (
              <span key={g.key} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${g.color}`} />
                {g.label} <span className="font-black">{tablesBySells[g.key]}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone…"
            className="w-full md:w-80 px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-sm focus:outline-none focus:border-red-500"
          />
        </div>
        {!vendors ? (
          <p className="p-8 text-center text-gray-500">Loading…</p>
        ) : !rows.length ? (
          <p className="p-8 text-center text-gray-500">{vendors.length ? "No matches." : "No paid vendors for this show yet."}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-gray-500 bg-gray-950/50">
                <tr>
                  <th className="px-4 py-3">Sells</th>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 text-right">Tables</th>
                  <th className="px-4 py-3">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((v) => {
                  const g = SELL_GROUPS.find((x) => x.key === v.sells);
                  return (
                    <tr key={v.id} className="border-t border-gray-800 hover:bg-gray-800/40">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${g?.color}`} />
                          {v.sellsLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold">{v.name}</div>
                        {v.business && <div className="text-gray-500 text-xs">{v.business}</div>}
                      </td>
                      <td className="px-4 py-3"><a className="hover:text-red-500" href={`mailto:${v.email}`}>{v.email}</a></td>
                      <td className="px-4 py-3 whitespace-nowrap"><a className="hover:text-red-500" href={`tel:${v.phone.replace(/\D/g, "")}`}>{v.phone}</a></td>
                      <td className="px-4 py-3 text-right font-black">{v.tables}</td>
                      <td className="px-4 py-3">
                        <a className="whitespace-nowrap font-mono text-xs text-red-500 hover:underline" href={`/vendor-tables/receipt/?id=${v.id}`} target="_blank" rel="noopener">
                          {v.receiptNumber}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
