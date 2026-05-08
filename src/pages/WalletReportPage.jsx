import { useEffect, useState } from "react";
import DataTableCard from "../components/DataTableCard.jsx";
import { authFetch } from "../lib/api.js";

const columns = [
  { key: "serial", label: "S.No" },
  { key: "customer", label: "Customer" },
  { key: "transactionType", label: "Transaction Type" },
  { key: "openingPayin", label: "Opening Wallet (Payin)" },
  { key: "openingPayout", label: "Opening Wallet (Payout)" },
  { key: "amountCredited", label: "Amount Credited" },
  { key: "amountDebited", label: "Amount Debited" },
  { key: "closingPayin", label: "Closing Wallet (Payin)" },
  { key: "closingPayout", label: "Closing Wallet (Payout)" },
];

export default function WalletReportPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    authFetch("/api/wallet-report").then(setRows).catch(console.error);
  }, []);

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#5046eb]">
        Wallet Transfer Reports
      </h1>
      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <div className="grid gap-5 lg:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Type</span>
            <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" defaultValue="All">
              <option>All</option>
              <option>Credit</option>
              <option>Debit</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>From Date</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="dd-mm-yyyy" type="text" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>To Date</span>
            <input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" placeholder="dd-mm-yyyy" type="text" />
          </label>
        </div>
        <div className="mt-6">
          <DataTableCard compact columns={columns} rows={rows} />
        </div>
      </section>
    </div>
  );
}
