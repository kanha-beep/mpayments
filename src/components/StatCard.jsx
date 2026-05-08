export default function StatCard({ accent, icon, label, value }) {
  const cardTone =
    accent === "dark"
      ? "bg-gradient-to-br from-[#17333b] to-[#294553] text-white"
      : "bg-white text-slate-700";

  return (
    <article
      className={`rounded-[22px] px-5 py-6 shadow-[0_18px_34px_rgba(40,56,83,0.15)] ${cardTone}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#23a35d] text-sm font-bold text-white">
        {icon}
      </div>
      <div className="mt-4 text-[15px]">{label}</div>
      <div className="mt-1 text-base font-extrabold">{value}</div>
    </article>
  );
}
