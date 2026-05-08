import { useEffect, useState } from "react";
import StatCard from "../components/StatCard.jsx";
import { authFetch } from "../lib/api.js";

const metricCardClasses = {
  0: "bg-gradient-to-br from-[#67b2f4] to-[#edf6ff]",
  1: "bg-gradient-to-br from-[#31db7d] to-[#edfef6]",
  2: "bg-gradient-to-br from-[#ffd316] to-[#fffce8]",
  3: "bg-gradient-to-br from-[#ff6f6d] to-[#fff0f0]",
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState({ walletCards: [], metrics: [] });

  useEffect(() => {
    authFetch("/api/dashboard").then(setDashboard).catch(console.error);
  }, []);

  return (
    <div className="space-y-5">
      <section className="grid max-w-[580px] gap-4 md:grid-cols-3">
        {dashboard.walletCards.map((card, index) => (
          <StatCard
            key={card.id ?? index}
            accent="dark"
            icon={["PI", "PO", "PP"][index] ?? "ST"}
            label={card.label}
            value={card.value}
          />
        ))}
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600 outline-none"
          readOnly
          type="text"
          value="2025-01-01 - 2026-04-06"
        />
        <button
          className="rounded-xl bg-[#2b77ff] px-4 py-3 font-semibold text-white"
          type="button"
        >
          Filter
        </button>
      </section>

      <section className="grid gap-5 lg:grid-cols-4">
        {dashboard.metrics.map((metric, index) => (
          <article
            key={`${metric.label}-${index}`}
            className={`min-h-[136px] rounded-[22px] px-5 py-8 shadow-[0_14px_36px_rgba(60,75,100,0.12)] ${metricCardClasses[index % 4]}`}
          >
            <div className="text-[15px] font-medium text-white/90">{metric.label}</div>
            <div className="mt-4 text-4xl font-extrabold text-white">{metric.value}</div>
          </article>
        ))}
      </section>
    </div>
  );
}
