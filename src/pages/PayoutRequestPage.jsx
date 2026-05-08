import { useEffect, useState } from "react";
import DataTableCard from "../components/DataTableCard.jsx";
import MetricStrip from "../components/MetricStrip.jsx";
import { payoutFormBanks } from "../data/dashboardData.js";
import { authFetch } from "../lib/api.js";

const columns = [
  { key: "index", label: "#" },
  { key: "mobile", label: "Mobile" },
  { key: "utr", label: "UTR" },
  { key: "dateTime", label: "Date Time" },
  { key: "transactionId", label: "Transaction ID" },
  { key: "currentBalance", label: "Current Balance" },
  { key: "amount", label: "Amount" },
  { key: "charges", label: "Charges" },
  { key: "gst", label: "GST" },
  { key: "finalBalance", label: "Final Balance" },
  { key: "bank", label: "Bank" },
  { key: "debit", label: "Debit" },
  { key: "remark", label: "Remark" },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span className="inline-flex min-w-[66px] items-center justify-center rounded-[10px] bg-[#f05243] px-3 py-2 text-xs font-extrabold text-white">
        {value}
      </span>
    ),
  },
];

const initialForm = {
  amount: "",
  customerName: "",
  mobile: "",
  accountNumber: "",
  bank: payoutFormBanks[0],
  holderName: "",
  ifscCode: "",
};

export default function PayoutRequestPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialForm);

  const loadRows = () => {
    authFetch("/api/payout-requests").then(setRows).catch(console.error);
  };

  useEffect(() => {
    loadRows();
  }, []);

  async function handleSubmit() {
    await authFetch("/api/payout-requests", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm(initialForm);
    loadRows();
  }

  return (
    <div className="space-y-5">
      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)] sm:p-5">
        <div className="grid gap-5">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Payment Method</span>
            <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" defaultValue="By NEFT / IMPS">
              <option>By NEFT / IMPS</option>
            </select>
          </label>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Amount</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="Enter Amount" type="text" value={form.amount} onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Customer Name</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="Enter Customer Name" type="text" value={form.customerName} onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value, holderName: current.holderName || event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Mobile Number</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="Enter Customer Mobile" type="text" value={form.mobile} onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 xl:col-span-2">
            <span>Account Number</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="Enter Account Number" type="text" value={form.accountNumber} onChange={(event) => setForm((current) => ({ ...current, accountNumber: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Bank Name</span>
            <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={form.bank} onChange={(event) => setForm((current) => ({ ...current, bank: event.target.value }))}>
              {payoutFormBanks.map((bank) => (
                <option key={bank}>{bank}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 xl:col-span-2">
            <span>Holder Name</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="Enter Account Holder Name" type="text" value={form.holderName} onChange={(event) => setForm((current) => ({ ...current, holderName: event.target.value }))} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>IFSC Code</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="Enter IFSC Code" type="text" value={form.ifscCode} onChange={(event) => setForm((current) => ({ ...current, ifscCode: event.target.value }))} />
          </label>
        </div>

        <button className="mt-5 rounded-xl bg-[#31c86b] px-5 py-3 font-bold text-white" type="button" onClick={handleSubmit}>
          Wallet Request
        </button>
      </section>

      <MetricStrip text="Payout Requests" />
      <DataTableCard columns={columns} rows={rows} />
    </div>
  );
}
