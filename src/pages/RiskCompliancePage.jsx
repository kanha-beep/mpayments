import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { riskQueues, riskSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "merchant", label: "Merchant" },
  { key: "rule", label: "Triggered Rule" },
  { key: "exposure", label: "Exposure" },
  { key: "action", label: "Control" },
  { key: "owner", label: "Owner" },
  {
    key: "status",
    label: "Queue Status",
    render: (value) => {
      const classes =
        value === "Applied"
          ? "bg-[#22be5f]"
          : value === "Investigating"
            ? "bg-[#f4a20a]"
            : "bg-[#f05243]";

      return (
        <span className={`inline-flex min-w-[120px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${classes}`}>
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

export default function RiskCompliancePage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Risk & Compliance" subtitle="Underwriting posture, reserve controls, live transaction screening, and operational holds" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {riskSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[20px] bg-white/90 p-5 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
          <h2 className="text-xl font-extrabold text-slate-800">Core Controls</h2>
          <div className="mt-5 space-y-3">
            {[
              "Merchant category restrictions and underwriting approvals before traffic opens.",
              "Rolling reserve and payout delay policies for higher-loss cohorts.",
              "Velocity, chargeback, and KYC mismatch rules tied directly to fund movement.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-gradient-to-br from-[#6d3cf4] to-[#325ff3] p-5 text-white shadow-[0_14px_36px_rgba(79,76,222,0.24)]">
          <h2 className="text-xl font-extrabold">Settlement Safety</h2>
          <div className="mt-4 space-y-3 text-sm text-white/90">
            <div>Risk actions feed into payout availability, reserve locks, and manual release decisions.</div>
            <div>Compliance issues are operational blockers, not just dashboard warnings.</div>
            <div>Merchant and transaction controls are kept visible to support and finance teams.</div>
          </div>
        </div>
      </section>

      <DataTableCard columns={columns} rows={riskQueues} />
    </div>
  );
}
