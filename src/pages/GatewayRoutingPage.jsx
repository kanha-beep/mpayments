import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { routingRules, routingSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "id", label: "Rule ID" },
  { key: "flow", label: "Flow" },
  { key: "primary", label: "Primary Rail" },
  { key: "secondary", label: "Fallback Rail" },
  { key: "traffic", label: "Traffic Share" },
  { key: "sla", label: "Uptime / SLA" },
  { key: "reason", label: "Routing Logic" },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`inline-flex min-w-[76px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${
          value === "Watch" ? "bg-[#f4a20a]" : "bg-[#22be5f]"
        }`}
      >
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

export default function GatewayRoutingPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Gateway Routing" subtitle="Acquirer orchestration, failover policy, and traffic steering across payment rails" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {routingSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[20px] bg-white/90 p-5 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
          <h2 className="text-xl font-extrabold text-slate-800">Traffic Steering Logic</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Prefer low-latency acquirer when auth success stays above threshold.",
              "Shift to backup rail when bank downtime, 5xx spikes, or callback lag appears.",
              "Use merchant category and amount bands to control processor economics.",
              "Separate payout routing from pay-in routing to preserve settlement windows.",
            ].map((rule) => (
              <div key={rule} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
                {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-gradient-to-br from-[#1f7df0] to-[#54b6ff] p-5 text-white shadow-[0_14px_36px_rgba(38,117,237,0.24)]">
          <h2 className="text-xl font-extrabold">What Makes This Real</h2>
          <div className="mt-4 space-y-3 text-sm text-white/90">
            <div>Routing is tied to actual processor relationships, not just a frontend status badge.</div>
            <div>Retries are controlled by rail health, downstream codes, and merchant callback readiness.</div>
            <div>Settlement and reconciliation teams can trace which partner handled each leg.</div>
          </div>
        </div>
      </section>

      <DataTableCard columns={columns} rows={routingRules} />
    </div>
  );
}
