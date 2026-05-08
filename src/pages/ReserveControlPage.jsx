import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { reserveRows, reserveSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "merchant", label: "Merchant" },
  { key: "reserveType", label: "Reserve Type" },
  { key: "rate", label: "Rate" },
  { key: "heldAmount", label: "Held Amount" },
  { key: "releaseCycle", label: "Release Cycle" },
  { key: "trigger", label: "Trigger" },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span className={`inline-flex min-w-[88px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${value === "Active" ? "bg-[#22be5f]" : "bg-[#f4a20a]"}`}>
        {value}
      </span>
    ),
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

export default function ReserveControlPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Reserve Control" subtitle="Rolling reserves, held balances, and release posture for merchant risk containment" />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reserveSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>
      <DataTableCard columns={columns} rows={reserveRows} />
    </div>
  );
}
