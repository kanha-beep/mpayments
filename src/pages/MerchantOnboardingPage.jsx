import DataTableCard from "../components/DataTableCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { onboardingChecklist, onboardingSummary } from "../data/gatewayOpsData.js";

const columns = [
  { key: "merchant", label: "Merchant" },
  { key: "mid", label: "MID" },
  { key: "owner", label: "Owner" },
  { key: "kyc", label: "KYC" },
  { key: "risk", label: "Risk" },
  { key: "bank", label: "Bank Verification" },
  { key: "webhook", label: "Webhook Readiness" },
  {
    key: "status",
    label: "Activation",
    render: (value) => {
      const classes =
        value === "Go live"
          ? "bg-[#22be5f]"
          : value === "Action needed"
            ? "bg-[#f05243]"
            : "bg-[#f4a20a]";

      return (
        <span className={`inline-flex min-w-[104px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-extrabold text-white ${classes}`}>
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

export default function MerchantOnboardingPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Merchant Onboarding" subtitle="KYC, underwriting, webhook readiness, and live activation controls" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {onboardingSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-[20px] bg-white/90 p-5 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
          <h2 className="text-xl font-extrabold text-slate-800">Activation Workflow</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Business documents and GST validation",
              "Beneficiary account verification and penny drop",
              "Risk scoring, reserve policy, and MCC approval",
              "Webhook/callback URL certification before live traffic",
            ].map((step) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600">
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-gradient-to-br from-[#283644] to-[#334f6c] p-5 text-white shadow-[0_14px_36px_rgba(40,54,68,0.22)]">
          <h2 className="text-xl font-extrabold">Go-Live Gates</h2>
          <div className="mt-4 space-y-3 text-sm text-white/85">
            <div>No live MID until KYC, bank ownership, and callback endpoint checks are green.</div>
            <div>High-risk categories get reserve instructions and payout limits before settlement unlock.</div>
            <div>Sandbox credentials stay isolated from production keys and settlement wallets.</div>
          </div>
        </div>
      </section>

      <DataTableCard columns={columns} rows={onboardingChecklist} />
    </div>
  );
}
