import { useState } from "react";
import { authFetch } from "../lib/api.js";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function handleUpdate() {
    if (form.newPassword !== form.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    await authFetch("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }),
    });
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">Change Password</h1>
      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <div className="grid max-w-[520px] gap-5">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Current Password</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="password" value={form.currentPassword} onChange={(event) => setForm((current) => ({ ...current, currentPassword: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>New Password</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="password" value={form.newPassword} onChange={(event) => setForm((current) => ({ ...current, newPassword: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Confirm Password</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="password" value={form.confirmPassword} onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))} />
          </label>
          <button className="w-fit rounded-2xl bg-gradient-to-r from-[#615ef8] to-[#8f4af5] px-6 py-3 font-bold text-white shadow-[0_14px_28px_rgba(94,84,242,0.2)]" type="button" onClick={handleUpdate}>
            Update Password
          </button>
        </div>
      </section>
    </div>
  );
}
