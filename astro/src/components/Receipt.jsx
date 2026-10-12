import { useEffect, useState } from "react";

const money = (cents) => `$${(cents / 100).toFixed(2)}`;
const POLL_MS = 2000;
const MAX_POLLS = 15;

function Row({ label, children }) {
  return (
    <div className="flex justify-between gap-6 py-2.5 border-b border-gray-800 print:border-gray-300 last:border-0">
      <dt className="text-gray-500 print:text-gray-600">{label}</dt>
      <dd className="font-semibold text-right">{children}</dd>
    </div>
  );
}

export default function Receipt() {
  const [reg, setReg] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return setError("This receipt link is missing its ID.");
    let polls = 0;
    let timer;

    async function load() {
      try {
        const res = await fetch(`/api/receipt?id=${encodeURIComponent(id)}`);
        const json = await res.json();
        if (!res.ok) return setError(json.error || "Receipt not found.");
        setReg(json);
        // Payment confirmation can lag a few seconds behind the redirect from Stripe.
        if (json.status === "pending" && ++polls < MAX_POLLS) timer = setTimeout(load, POLL_MS);
      } catch {
        setError("We couldn't load your receipt. Please refresh the page.");
      }
    }
    load();
    return () => clearTimeout(timer);
  }, []);

  if (error) return <p className="text-center text-red-400 py-20">{error}</p>;
  if (!reg) return <p className="text-center text-gray-500 py-20">Loading your receipt…</p>;

  if (reg.status !== "paid") {
    const stillWaiting = reg.status === "pending";
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-black mb-3">{stillWaiting ? "Confirming your payment…" : "This registration wasn't completed"}</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          {stillWaiting
            ? "This usually takes a few seconds. If it doesn't update, refresh this page — your receipt link will keep working."
            : "No payment was taken and the tables were released."}
        </p>
        {!stillWaiting && (
          <a href="/vendor-tables/#register" className="inline-flex mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-700 text-white font-black">
            Start a new registration
          </a>
        )}
      </div>
    );
  }

  const paidOn = new Date(reg.paidAt).toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "long", timeStyle: "short" });

  return (
    <div>
      <div className="text-center mb-8 print:hidden">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-black">You're in!</h1>
        <p className="text-gray-400 mt-2">See you on {reg.showLabel}. A payment receipt is also on its way to {reg.email}.</p>
      </div>

      <article className="p-6 md:p-10 rounded-3xl bg-gray-900/60 border border-gray-800 print:bg-white print:text-black print:border-0 print:p-0">
        <header className="flex justify-between items-start gap-4 mb-8">
          <div>
            <div className="font-black text-xl">COLLINSVILLE CARD SHOW</div>
            <div className="text-sm text-gray-500 print:text-gray-600">2002 Mall Street, Collinsville, IL 62234</div>
            <div className="text-sm text-gray-500 print:text-gray-600">(618) 729-6999 · thecollinsvillecardshow.com</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-widest text-red-500 print:text-black">Receipt</div>
            <div className="font-mono font-bold">{reg.receiptNumber}</div>
            <div className="mt-1 inline-block px-2 py-0.5 rounded bg-green-500/15 text-green-400 print:text-black print:bg-transparent print:border print:border-black text-xs font-black uppercase">
              Paid
            </div>
          </div>
        </header>

        <dl className="text-sm mb-8">
          <Row label="Paid on">{paidOn}</Row>
          <Row label="Vendor">{reg.name}</Row>
          {reg.business && <Row label="Business">{reg.business}</Row>}
          <Row label="Email">{reg.email}</Row>
          <Row label="Phone">{reg.phone}</Row>
          <Row label="Sells">{reg.sells}</Row>
        </dl>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 print:text-gray-600 border-b border-gray-800 print:border-gray-400">
              <th className="py-2 font-semibold">Item</th>
              <th className="py-2 font-semibold text-right">Qty</th>
              <th className="py-2 font-semibold text-right">Price</th>
              <th className="py-2 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800 print:border-gray-300">
              <td className="py-3">
                Vendor table
                <div className="text-gray-500 print:text-gray-600">{reg.showLabel} · 9 AM – 3 PM</div>
              </td>
              <td className="py-3 text-right">{reg.tables}</td>
              <td className="py-3 text-right">{money(reg.amountCents / reg.tables)}</td>
              <td className="py-3 text-right">{money(reg.amountCents)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-4 text-right font-black">Total paid</td>
              <td className="pt-4 text-right font-black text-lg">{money(reg.amountCents)}</td>
            </tr>
          </tfoot>
        </table>
      </article>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-700 text-white font-black"
        >
          Print or save as PDF
        </button>
        <a href="/" className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 font-bold text-center">
          Back to home
        </a>
      </div>
      <p className="mt-6 text-center text-xs text-gray-600 print:hidden">Bookmark this page — you can come back to it any time for your receipt.</p>
    </div>
  );
}
