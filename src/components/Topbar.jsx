export default function Topbar() {
  return (
    <header className="flex h-[60px] items-center gap-4 border-b border-slate-200/80 bg-white/95 px-4 sm:px-5">
      <button
        className="text-3xl leading-none text-slate-500"
        type="button"
        aria-label="Toggle menu"
      >
        =
      </button>
      <label className="flex w-full max-w-[290px] items-center gap-3 rounded-full bg-[#f4f5fb] px-4 py-2">
        <span className="text-lg text-slate-400">Q</span>
        <input
          className="w-full border-0 bg-transparent text-sm text-slate-500 outline-none"
          placeholder="Search here..."
          type="text"
        />
      </label>
      <div className="ml-auto h-[5px] w-[5px] rounded-full bg-[#ff3a32]" />
    </header>
  );
}
