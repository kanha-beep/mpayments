import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { authFetch } from "../lib/api.js";

function statusBadge(status) {
  const classes =
    status === "Success"
      ? "bg-[#22be5f]"
      : status === "Failed"
        ? "bg-[#f05243]"
        : "bg-[#f4a20a]";

  return (
    <span className={`inline-flex min-w-[66px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${classes}`}>
      {status}
    </span>
  );
}

export default function PayInLinkPage() {
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({ transactionId: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadHistory = () => {
    authFetch("/api/payment-links")
      .then(setHistory)
      .catch((loadError) => {
        console.error(loadError);
        setError(loadError.message || "Unable to load payment links");
      });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const created = await authFetch("/api/payment-links", {
        method: "POST",
        body: JSON.stringify({
          transactionId: form.transactionId,
          amount: form.amount,
        }),
      });
      setForm({ transactionId: "", amount: "" });
      setSuccess(`Payment link created for ${created.transactionId}`);
      loadHistory();
    } catch (submitError) {
      setError(submitError.message || "Payment link not generated");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Create Payment Link" />

      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)] sm:p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Txn ID / Reference No</span>
            <input
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
              type="text"
              value={form.transactionId}
              onChange={(event) => setForm((current) => ({ ...current, transactionId: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Amount</span>
            <input
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
              type="text"
              value={form.amount}
              onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
            />
          </label>
        </div>

        <button
          className="mt-6 rounded-2xl bg-gradient-to-r from-[#615ef8] to-[#8f4af5] px-6 py-3 font-bold text-white shadow-[0_14px_28px_rgba(94,84,242,0.2)]"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Payment Link"}
        </button>

        {error ? (
          <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">
            {success}
          </div>
        ) : null}

        <h2 className="mt-8 text-center text-2xl font-extrabold text-slate-700">
          Payment Links History
        </h2>

        <div className="mt-6 space-y-4 overflow-x-auto">
          <div className="grid min-w-[1100px] grid-cols-[1fr_.7fr_1fr_1fr_.9fr_2.2fr_1.3fr] gap-3 rounded-2xl bg-[#141d34] px-4 py-4 text-sm font-bold text-white">
            <span>Mobile</span>
            <span>Amount</span>
            <span>Transaction ID</span>
            <span>UTR</span>
            <span>Status</span>
            <span>Deep Link</span>
            <span>Date</span>
          </div>

          {history.map((row) => (
            <div
              key={row.id}
              className="grid min-w-[1100px] grid-cols-[1fr_.7fr_1fr_1fr_.9fr_2.2fr_1.3fr] items-center gap-3 rounded-2xl bg-white px-4 py-4 text-sm text-slate-500"
            >
              <span>{row.mobile}</span>
              <span>{row.amount}</span>
              <span>{row.transactionId}</span>
              <span>{row.utr || " "}</span>
              <span>{statusBadge(row.status)}</span>
              <span className="inline-flex min-h-[38px] items-center rounded-xl bg-gradient-to-r from-[#eef3fa] from-[0%] via-[#eef3fa] via-[86%] to-[#5d59e8] px-4 text-slate-600">
                {row.deepLink}
              </span>
              <span>{row.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
