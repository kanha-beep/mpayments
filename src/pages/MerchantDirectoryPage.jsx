import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { merchantDirectoryRows, merchantDirectorySummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "merchantId", label: "Merchant ID" },
  { key: "merchant", label: "Merchant" },
  { key: "category", label: "Category" },
  { key: "volume", label: "Volume" },
  { key: "reserve", label: "Reserve" },
  { key: "callbacks", label: "Callback Health" },
  { key: "settlement", label: "Settlement Cycle" },
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

export default function MerchantDirectoryPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Merchant Directory" subtitle="Portfolio-wide merchant visibility for activation, reserves, callbacks, and settlement posture" />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {merchantDirectorySummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>
      <DataTableCard columns={columns} rows={merchantDirectoryRows} />
    </div>
  );
}
