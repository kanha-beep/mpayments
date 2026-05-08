import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { reconBreaks, reconciliationSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "reference", label: "Break Ref" },
  { key: "layer", label: "Mismatch Layer" },
  { key: "merchant", label: "Merchant" },
  { key: "amount", label: "Amount" },
  { key: "cause", label: "Cause" },
  { key: "age", label: "Age" },
  { key: "owner", label: "Owner" },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const classes =
        value === "Resolved"
          ? "bg-[#22be5f]"
          : value === "Investigating"
            ? "bg-[#f4a20a]"
            : "bg-[#f05243]";

      return (
        <span className={`inline-flex min-w-[98px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${classes}`}>
          {value}
        </span>
      );
    },
  },
];

function SummaryCard({ item }) {
  return (
    <article className="rounded-[22px] bg-white/90 p-5 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
      <div className="mt-3 text-3xl font-extrabold text-slate-800">{item.value}</div>
    </article>
  );
}

export default function ReconciliationHubPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Reconciliation Hub" subtitle="Processor, bank, callback, and settlement break management for payment operations" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reconciliationSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>

      <section className="rounded-[20px] bg-white/90 p-5 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <h2 className="text-xl font-extrabold text-slate-800">Matching Layers</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Gateway ledger vs processor response stream",
            "Processor confirmation vs bank finality",
            "Callback delivery vs merchant order update",
            "Settlement batches vs merchant balance release",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
              {item}
            </div>
          ))}
        </div>
      </section>

      <DataTableCard columns={columns} rows={reconBreaks} />
    </div>
  );
}
