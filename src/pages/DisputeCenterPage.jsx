import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { disputeRows, disputeSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "caseId", label: "Case ID" },
  { key: "merchant", label: "Merchant" },
  { key: "type", label: "Type" },
  { key: "amount", label: "Amount" },
  { key: "reason", label: "Reason" },
  { key: "deadline", label: "Deadline" },
  { key: "owner", label: "Owner" },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const classes = value === "Won" ? "bg-[#22be5f]" : value === "Responding" ? "bg-[#f4a20a]" : "bg-[#f05243]";
      return <span className={`inline-flex min-w-[118px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${classes}`}>{value}</span>;
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

export default function DisputeCenterPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Dispute Center" subtitle="Chargebacks, refund claims, and evidence tracking for post-transaction risk operations" />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {disputeSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>
      <DataTableCard columns={columns} rows={disputeRows} />
    </div>
  );
}
