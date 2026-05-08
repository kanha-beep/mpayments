import { useEffect, useState } from "react";
import { API_BASE_URL, authFetch } from "../lib/api.js";

const initialDoc = {
  productName: "",
  token: "",
  merchantToken: "",
  payinCallbackUrl: "",
  payoutCallbackUrl: "",
  createLinkEndpoint: "",
  orderStatusEndpoint: "",
  payoutEndpoint: "",
  walletEndpoint: "",
  payinCallbackEndpoint: "",
  payoutCallbackEndpoint: "",
  routeType: "",
  isDemoSetup: false,
  configurationNote: "",
  providerBaseUrl: "",
  providerTestBaseUrl: "",
  panelLinks: [],
  payload: "",
  docs: {},
};

function pretty(value) {
  if (!value) return "";
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function buildPublicEndpoint(path, value) {
  if (value) return value;

  try {
    return new URL(path, API_BASE_URL).toString();
  } catch {
    return `${API_BASE_URL}${path}`;
  }
}

function Block({ title, value, rows = 8 }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
      <span>{title}</span>
      <textarea
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm outline-none"
        readOnly
        rows={rows}
        value={pretty(value)}
      />
    </label>
  );
}

function ForwardingApiCard({ title, endpoint, payload, response }) {
  return (
    <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-extrabold text-slate-700">{title}</h2>
        <div className="text-sm text-slate-500">Method: POST</div>
      </div>

      <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-slate-700">
        <span>API Endpoint</span>
        <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={endpoint} />
      </label>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Block title="Request Body" value={payload} />
        <Block title="Expected Response" value={response} />
      </div>
    </section>
  );
}

function DocSection({ section }) {
  if (!section) return null;

  return (
    <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-extrabold text-slate-700">{section.title}</h2>
        {section.method ? <div className="text-sm text-slate-500">Method: {section.method}</div> : null}
        {section.contentType ? <div className="text-sm text-slate-500">Content Type: {section.contentType}</div> : null}
      </div>

      {section.endpoint ? (
        <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-slate-700">
          <span>API Endpoint</span>
          <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={section.endpoint} />
        </label>
      ) : null}

      {section.providerCallbackEndpoint ? (
        <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-slate-700">
          <span>Provider Callback Endpoint On This Server</span>
          <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={section.providerCallbackEndpoint} />
        </label>
      ) : null}

      {section.callbackUrl ? (
        <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-slate-700">
          <span>Merchant Callback URL</span>
          <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={section.callbackUrl} />
        </label>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {section.payload ? <Block title="JSON Payload" value={section.payload} /> : null}
        {section.successResponse ? <Block title="Success Response" value={section.successResponse} /> : null}
        {section.pendingResponse ? <Block title="Pending Response" value={section.pendingResponse} /> : null}
        {section.failedResponse ? <Block title="Failed Response" value={section.failedResponse} /> : null}
        {section.parameters ? <Block title="Callback Parameters" value={section.parameters} /> : null}
      </div>

      {section.sampleUrl ? <Block title="Sample Callback URL" value={section.sampleUrl} rows={5} /> : null}
      {section.curl ? <Block title="Sample cURL" value={section.curl} rows={8} /> : null}

      {section.notes?.length ? (
        <div className="mt-5">
          <div className="text-sm font-semibold text-slate-700">Important Notes</div>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            {section.notes.map((note) => (
              <div key={note}>{note}</div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default function ApiDocumentsPage() {
  const [doc, setDoc] = useState(initialDoc);
  const [regenerating, setRegenerating] = useState(false);

  const publicEndpoints = {
    createLink: buildPublicEndpoint("/API/create_link.php", doc.createLinkEndpoint),
    orderStatus: buildPublicEndpoint("/API/order_status.php", doc.orderStatusEndpoint),
    payoutRequest: buildPublicEndpoint("/API/payout-request.php", doc.payoutEndpoint),
    walletFetch: buildPublicEndpoint("/API/wallet-fetch.php", doc.walletEndpoint),
  };

  const requestExamples = {
    createLink: {
      token: doc.merchantToken || "YOUR_API_TOKEN",
      txnid: "ORD123456",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      mobile: "9876543210",
      amount: "500.00",
    },
    orderStatus: {
      token: doc.merchantToken || "YOUR_API_TOKEN",
      type: "payin",
      txnid: "ORD123456",
    },
    payoutRequest: {
      token: doc.merchantToken || "YOUR_API_TOKEN",
      amount: "500.00",
      name: "Rahul Kumar",
      mobile: "9876543210",
      bank: "HDFC Bank",
      account: "1234567890",
      ifsc: "HDFC0001234",
      holder: "Rahul Kumar",
      mode: "IMPS",
      txnid: "PY123456",
      redirect_url: "https://merchant.com/payout-callback",
    },
    walletFetch: {
      token: doc.merchantToken || "YOUR_API_TOKEN",
    },
  };

  const responseExamples = {
    createLink: {
      status: "success",
      paymentLink: "https://your-domain.com/pay/ORD123456",
      upiLink: "upi://pay?...",
    },
    orderStatus: {
      status: "success",
      txn_status: "success",
      amount: "500.00",
      utr: "UTR123456789",
    },
    payoutRequest: {
      status: "success",
      message: "Payout accepted",
    },
    walletFetch: {
      status: "success",
      wallet_balance: "125000.00",
      frozen_balance: "24000.00",
    },
  };

  useEffect(() => {
    authFetch("/api/api-documents").then(setDoc).catch(console.error);
  }, []);

  async function handleWebhookUpdate() {
    await authFetch("/api/api-documents/webhooks", {
      method: "PUT",
      body: JSON.stringify({
        payinCallbackUrl: doc.payinCallbackUrl,
        payoutCallbackUrl: doc.payoutCallbackUrl,
      }),
    });

    const refreshed = await authFetch("/api/api-documents");
    setDoc(refreshed);
  }

  async function handleRegenerateToken() {
    setRegenerating(true);
    try {
      await authFetch("/api/api-documents/regenerate-token", {
        method: "POST",
      });
      const refreshed = await authFetch("/api/api-documents");
      setDoc(refreshed);
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">API Dashboard</h1>
        <div className="mt-1 text-sm text-slate-400">Home</div>
      </div>

      <section className="rounded-[20px] bg-gradient-to-r from-[#7f3ef3] to-[#356ff4] px-6 py-5 text-white shadow-[0_20px_44px_rgba(77,96,160,0.16)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-extrabold">Your API Token</h2>
          <span className="inline-flex w-fit rounded-lg bg-white px-3 py-2 text-xs font-extrabold text-[#2f6cf3]">
            {doc.isDemoSetup ? "Demo Setup" : "Live Config"}
          </span>
        </div>
        <p className="mt-3 text-white/80">
          {doc.productName || "MpaymentsPay"} exposes client-facing partner APIs. These are backend routes, not physical `.php` files on disk.
        </p>
        <p className="mt-2 text-sm text-white/75">{doc.configurationNote}</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <input className="rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-white outline-none" readOnly value={doc.merchantToken} />
          <button className="rounded-xl bg-white px-4 py-3 font-bold text-[#3170f4]" type="button" onClick={handleRegenerateToken} disabled={regenerating}>
            {regenerating ? "Updating..." : "Generate Token"}
          </button>
        </div>
      </section>

      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-extrabold text-slate-700">Your Forwarding API</h2>
          <p className="text-sm text-slate-500">
            Third parties should call these MpaymentsPay endpoints. Your backend then forwards the request to BharatPay internally.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Create Link</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={publicEndpoints.createLink} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Order Status</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={publicEndpoints.orderStatus} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Payout Request</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={publicEndpoints.payoutRequest} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Wallet Fetch</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={publicEndpoints.walletFetch} />
          </label>
        </div>
      </section>

      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-extrabold text-slate-700">What You Share With Clients</h2>
          <p className="text-sm text-slate-500">
            Share only your token and the forwarding endpoints below. BharatPay stays hidden behind your backend.
          </p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Share This Token</span>
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" readOnly value={doc.merchantToken} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Do Not Share</span>
            <input className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" readOnly value="BharatPay provider URLs or MerchantID/AccessKey" />
          </label>
        </div>
      </section>

      {doc.panelLinks.length ? (
        <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
          <h2 className="mb-4 text-xl font-extrabold text-slate-700">Provider Panels</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {doc.panelLinks.map((link) => (
              <a
                key={link}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-sky-700"
                href={link}
                rel="noreferrer"
                target="_blank"
              >
                {link}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]">
        <h2 className="mb-4 text-xl font-extrabold text-slate-700">Webhook URLs</h2>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_220px] xl:items-end">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Payin Callback URL</span>
            <input
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none"
              type="text"
              value={doc.payinCallbackUrl}
              onChange={(event) => setDoc((current) => ({ ...current, payinCallbackUrl: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>Payout Callback URL</span>
            <input
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none"
              type="text"
              value={doc.payoutCallbackUrl}
              onChange={(event) => setDoc((current) => ({ ...current, payoutCallbackUrl: event.target.value }))}
            />
          </label>
          <button className="rounded-xl bg-[#31c86b] px-4 py-3 font-bold text-white" type="button" onClick={handleWebhookUpdate}>
            Update URLs
          </button>
        </div>
      </section>

      <ForwardingApiCard
        title="Create Link API"
        endpoint={publicEndpoints.createLink}
        payload={requestExamples.createLink}
        response={responseExamples.createLink}
      />
      <ForwardingApiCard
        title="Order Status API"
        endpoint={publicEndpoints.orderStatus}
        payload={requestExamples.orderStatus}
        response={responseExamples.orderStatus}
      />
      <ForwardingApiCard
        title="Payout Request API"
        endpoint={publicEndpoints.payoutRequest}
        payload={requestExamples.payoutRequest}
        response={responseExamples.payoutRequest}
      />
      <ForwardingApiCard
        title="Wallet Fetch API"
        endpoint={publicEndpoints.walletFetch}
        payload={requestExamples.walletFetch}
        response={responseExamples.walletFetch}
      />
      <DocSection section={doc.docs.payinCallback} />
      <DocSection section={doc.docs.payoutCallback} />
    </div>
  );
}
