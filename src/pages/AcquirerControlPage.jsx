import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { acquirerRows, acquirerSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "provider", label: "Acquirer / Partner" },
  { key: "capability", label: "Capability" },
  { key: "authRate", label: "Auth Rate" },
  { key: "latency", label: "Latency" },
  { key: "traffic", label: "Traffic Share" },
  { key: "settlement", label: "Settlement" },
  { key: "fallback", label: "Fallback" },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span className={`inline-flex min-w-[88px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${value === "Healthy" ? "bg-[#22be5f]" : "bg-[#f4a20a]"}`}>
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

export default function AcquirerControlPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Acquirer Control" subtitle="Partner rail visibility, routing posture, and fallback readiness across payment processors" />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {acquirerSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>
      <DataTableCard columns={columns} rows={acquirerRows} />
    </div>
  );
}
