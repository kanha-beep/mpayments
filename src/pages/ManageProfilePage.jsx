import { useEffect, useState } from "react";
import { authFetch } from "../lib/api.js";

const initialProfile = {
  name: "",
  partnerType: "",
  email: "",
  mobile: "",
  company: "",
};

export default function ManageProfilePage() {
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    authFetch("/api/profile").then(setProfile).catch(console.error);
  }, []);

  async function handleUpdate() {
    await authFetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify(profile),
    });
  }

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">Manage Profile</h1>
      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Partner Name</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="text" value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Partner Type</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="text" value={profile.partnerType} onChange={(event) => setProfile((current) => ({ ...current, partnerType: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Email Address</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="text" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Mobile Number</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="text" value={profile.mobile} onChange={(event) => setProfile((current) => ({ ...current, mobile: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            <span>Company Name</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" type="text" value={profile.company} onChange={(event) => setProfile((current) => ({ ...current, company: event.target.value }))} />
          </label>
        </div>
        <button className="mt-5 rounded-xl bg-[#2b77ff] px-5 py-3 font-bold text-white" type="button" onClick={handleUpdate}>
          Update Profile
        </button>
      </section>
    </div>
  );
}
