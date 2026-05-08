import { useEffect, useState } from "react";
import DataTableCard from "../components/DataTableCard.jsx";
import MetricStrip from "../components/MetricStrip.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { authFetch } from "../lib/api.js";

const columns = [
  { key: "index", label: "#" },
  { key: "mobile", label: "Mobile" },
  { key: "reference", label: "Reference" },
  { key: "timestamp", label: "Timestamp" },
  { key: "traceId", label: "Trace ID" },
  { key: "startBal", label: "Start Bal" },
  { key: "amount", label: "Amount" },
  { key: "charges", label: "Charges" },
  { key: "gst", label: "GST" },
  { key: "endBal", label: "End Bal" },
  { key: "bank", label: "Bank" },
  { key: "debit", label: "Debit" },
  { key: "remark", label: "Remark" },
  { key: "webhook", label: "Webhook" },
  { key: "state", label: "State" },
];

export default function SettlementReportPage() {
  const [data, setData] = useState({ summary: { amount: "INR 0.00", charges: "INR 0.00" }, rows: [] });

  useEffect(() => {
    authFetch("/api/settlement-report").then(setData).catch(console.error);
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader title="Settlement Analytics" subtitle="Bank & payout movement console" />
      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <div className="grid gap-5 lg:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>State</span>
            <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" defaultValue="All">
              <option>All</option>
              <option>Success</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>From</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly type="text" value="06-04-2026" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>To</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly type="text" value="06-04-2026" />
          </label>
        </div>
      </section>
      <MetricStrip text={`Amount: ${data.summary.amount} | Charges: ${data.summary.charges}`} theme="green" />
      <DataTableCard columns={columns} footerText={`Showing 1 to ${data.rows.length} of ${data.rows.length} entries`} rows={data.rows} />
    </div>
  );
}
