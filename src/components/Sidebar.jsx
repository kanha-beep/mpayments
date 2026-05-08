import { NavLink, useNavigate } from "react-router-dom";
import { navigationItems } from "../data/dashboardData.js";
import { clearSession } from "../lib/api.js";

function linkClasses(isActive) {
  return [
    "group flex items-center gap-3 rounded-3xl px-3 py-3 text-sm font-semibold transition-all duration-200",
    isActive
      ? "bg-gradient-to-r from-[#4257f6]/30 to-[#23c4ee]/20 text-white shadow-[0_16px_32px_rgba(96,82,255,0.22)]"
      : "text-white/90 hover:bg-white/10 hover:text-white",
  ].join(" ");
}

function iconClasses(isActive) {
  return [
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold",
    isActive
      ? "border-transparent bg-gradient-to-br from-[#6976ff] to-[#37c7f4] text-white"
      : "border-white/10 bg-white/5 text-white/90",
  ].join(" ");
}

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-full bg-gradient-to-b from-[#283644] to-[#334557] shadow-[14px_0_34px_rgba(25,35,52,0.2)] lg:sticky lg:top-0 lg:h-screen lg:w-[220px] lg:min-w-[220px] lg:overflow-y-auto">
      <div className="flex items-center gap-3 bg-black/10 px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-b from-[#88bfff] to-[#586cf7] text-sm font-extrabold text-white">
          OS
        </div>
        <div className="text-white">
          <div className="text-[22px] font-extrabold leading-none">MpaymentsPay</div>
          <div className="mt-1 text-sm text-white/95">Business Partner</div>
        </div>
      </div>

      <nav className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-1">
        {navigationItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <div className={linkClasses(isActive)}>
                <span className={iconClasses(isActive)}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}

        <button
          className="flex items-center gap-3 rounded-3xl px-3 py-3 text-left text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white lg:mt-auto"
          type="button"
          onClick={() => {
            clearSession();
            navigate("/login");
          }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90">
            OUT
          </span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
