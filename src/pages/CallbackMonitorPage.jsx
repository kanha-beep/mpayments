import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { callbackEvents, callbackSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "eventId", label: "Event ID" },
  { key: "merchant", label: "Merchant" },
  { key: "type", label: "Event Type" },
  { key: "endpoint", label: "Endpoint" },
  { key: "attempts", label: "Attempts" },
  { key: "latency", label: "Latency" },
  { key: "lastCode", label: "Last HTTP Code" },
  {
    key: "status",
    label: "Delivery State",
    render: (value) => {
      const classes =
        value === "Delivered"
          ? "bg-[#22be5f]"
          : value === "Retrying"
            ? "bg-[#f4a20a]"
            : "bg-[#f05243]";

      return (
        <span className={`inline-flex min-w-[92px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${classes}`}>
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

export default function CallbackMonitorPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Callback Monitor" subtitle="Webhook delivery, retry pressure, dead-letter visibility, and merchant endpoint health" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {callbackSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>

      <section className="rounded-[20px] bg-white/90 p-5 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <h2 className="text-xl font-extrabold text-slate-800">Retry Policy</h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
            Instant retry for transient `5xx`, timeout, and network-level failures.
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
            Exponential backoff protects merchant systems while preserving eventual delivery.
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
            Dead-letter queue keeps irreversible failures visible for operations recovery.
          </div>
        </div>
      </section>

      <DataTableCard columns={columns} rows={callbackEvents} />
    </div>
  );
}
