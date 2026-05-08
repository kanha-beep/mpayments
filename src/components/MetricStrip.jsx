export default function MetricStrip({ text, theme = "green" }) {
  const classes =
    theme === "blue"
      ? "mx-auto min-w-[310px] rounded-full bg-gradient-to-r from-[#17a5ff] to-[#3e74f6]"
      : "rounded-xl bg-[#21c769]";

  return (
    <div className={`px-5 py-3 text-center text-base font-extrabold text-white ${classes}`}>
      {text}
    </div>
  );
}
