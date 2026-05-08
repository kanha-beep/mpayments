import { useEffect, useState } from "react";
import DataTableCard from "../components/DataTableCard.jsx";
import MetricStrip from "../components/MetricStrip.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { authFetch } from "../lib/api.js";

const columns = [
  { key: "index", label: "#" },
  { key: "mobile", label: "Mobile" },
  { key: "utr", label: "UTR" },
  { key: "dateTime", label: "Date Time" },
  { key: "requestId", label: "Request ID" },
  { key: "amount", label: "Amount" },
  { key: "charges", label: "Charges" },
  { key: "gst", label: "GST" },
  { key: "credit", label: "Credit" },
  { key: "callback", label: "Callback" },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span className="inline-flex min-w-[66px] items-center justify-center rounded-[10px] bg-[#f4a20a] px-3 py-2 text-xs font-extrabold text-white">
        {value}
      </span>
    ),
  },
];

export default function PayInStatusPage() {
  const [data, setData] = useState({ summary: { amount: "INR 0.00", charges: "INR 0.00" }, rows: [] });

  useEffect(() => {
    authFetch("/api/payin-status").then(setData).catch(console.error);
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader title="Collection Report" />
      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <div className="grid gap-5 lg:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Status</span>
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" defaultValue="All">
              <option>All</option>
              <option>Success</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>From</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="dd-mm-yyyy" readOnly type="text" value="" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>To</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="dd-mm-yyyy" readOnly type="text" value="" />
          </label>
        </div>
      </section>
      <MetricStrip text={`Amount: ${data.summary.amount} | Charges: ${data.summary.charges}`} theme="blue" />
      <DataTableCard columns={columns} rows={data.rows} />
    </div>
  );
}
