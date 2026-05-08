export default function PageHeader({ title, subtitle }) {
  return (
    <section className="rounded-[20px] bg-gradient-to-r from-[#7f3ef3] to-[#356ff4] px-6 py-5 text-white shadow-[0_20px_44px_rgba(77,96,160,0.16)]">
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-2 text-white/80">{subtitle}</p> : null}
    </section>
  );
}
