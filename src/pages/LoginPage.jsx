import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../lib/api.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "monish@mpayprocessing.com",
    password: "password",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginRequest(form);
      navigate("/", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#dbeafe,#e2e8f0_55%,#cbd5e1)] px-4">
      <form
        className="w-full max-w-md rounded-[28px] bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
        onSubmit={handleSubmit}
      >
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">
            Merchant Access
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Use your merchant credentials to access payin, payout, and settlement reports.
          </p>
        </div>

        <div className="space-y-5">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Email</span>
            <input
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Password</span>
            <input
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
            {error}
          </div>
        ) : null}

        <button
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#615ef8] to-[#8f4af5] px-6 py-3 font-bold text-white shadow-[0_14px_28px_rgba(94,84,242,0.2)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
          type="submit"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
