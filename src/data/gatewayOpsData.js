export const onboardingSummary = [
  { label: "Live merchants", value: "184" },
  { label: "Pending KYC", value: "19" },
  { label: "Rolling reserve holds", value: "11" },
  { label: "This week go-lives", value: "7" },
];

export const onboardingChecklist = [
  {
    merchant: "Northstar Commerce",
    mid: "MID-884231",
    owner: "Riya Sharma",
    kyc: "Approved",
    risk: "Underwriting cleared",
    bank: "Verified",
    webhook: "Ready",
    status: "Go live",
  },
  {
    merchant: "Orbit Tickets",
    mid: "MID-884227",
    owner: "Aman Verma",
    kyc: "Pending GST",
    risk: "Velocity review",
    bank: "Penny drop pending",
    webhook: "Sandbox only",
    status: "Action needed",
  },
  {
    merchant: "Medline Hub",
    mid: "MID-884221",
    owner: "Anita Das",
    kyc: "Approved",
    risk: "Reserve 7%",
    bank: "Verified",
    webhook: "Ready",
    status: "Queued",
  },
];

export const routingSummary = [
  { label: "Auth success", value: "91.8%" },
  { label: "Smart retries", value: "1,248" },
  { label: "Auto-failovers", value: "146" },
  { label: "Latency p95", value: "1.8s" },
];

export const routingRules = [
  {
    id: "RTR-01",
    flow: "UPI Collect",
    primary: "Acquirer A",
    secondary: "Acquirer C",
    traffic: "48%",
    sla: "99.94%",
    reason: "Primary bank strength",
    status: "Active",
  },
  {
    id: "RTR-02",
    flow: "Cards",
    primary: "Aggregator B",
    secondary: "Aggregator D",
    traffic: "27%",
    sla: "99.72%",
    reason: "Lower MDR on debit mix",
    status: "Active",
  },
  {
    id: "RTR-03",
    flow: "NetBanking",
    primary: "Acquirer C",
    secondary: "Acquirer A",
    traffic: "14%",
    sla: "98.91%",
    reason: "Fallback during bank downtime",
    status: "Watch",
  },
  {
    id: "RTR-04",
    flow: "Payouts",
    primary: "Banking Rail X",
    secondary: "Banking Rail Y",
    traffic: "11%",
    sla: "99.41%",
    reason: "Cutoff-aware routing",
    status: "Active",
  },
];

export const callbackSummary = [
  { label: "Callbacks today", value: "82,441" },
  { label: "Delivered < 30s", value: "97.2%" },
  { label: "Retries queued", value: "218" },
  { label: "Dead-lettered", value: "9" },
];

export const callbackEvents = [
  {
    eventId: "CB-991801",
    merchant: "Northstar Commerce",
    type: "payment.captured",
    endpoint: "/webhooks/payments",
    attempts: "1",
    latency: "480ms",
    lastCode: "200",
    status: "Delivered",
  },
  {
    eventId: "CB-991774",
    merchant: "Orbit Tickets",
    type: "payout.failed",
    endpoint: "/webhooks/payouts",
    attempts: "4",
    latency: "22s",
    lastCode: "500",
    status: "Retrying",
  },
  {
    eventId: "CB-991741",
    merchant: "Medline Hub",
    type: "payment.pending",
    endpoint: "/callbacks/order-status",
    attempts: "6",
    latency: "5m 12s",
    lastCode: "410",
    status: "Dead letter",
  },
];

export const riskSummary = [
  { label: "Transactions screened", value: "126k" },
  { label: "High-risk blocked", value: "384" },
  { label: "Manual reviews", value: "42" },
  { label: "Reserve exposure", value: "INR 8.4L" },
];

export const riskQueues = [
  {
    merchant: "Orbit Tickets",
    rule: "Payout velocity spike",
    exposure: "INR 2.1L",
    action: "Manual hold",
    owner: "Risk desk",
    status: "Investigating",
  },
  {
    merchant: "Northstar Commerce",
    rule: "Chargeback threshold",
    exposure: "INR 78k",
    action: "Reserve uplift",
    owner: "Compliance",
    status: "Applied",
  },
  {
    merchant: "FreshCart Mini",
    rule: "KYC mismatch",
    exposure: "INR 34k",
    action: "Inbound disabled",
    owner: "Ops",
    status: "Merchant response due",
  },
];

export const reconciliationSummary = [
  { label: "Matched volume", value: "INR 2.84Cr" },
  { label: "Exceptions", value: "63" },
  { label: "Open reversals", value: "17" },
  { label: "T+1 ready", value: "94%" },
];

export const reconBreaks = [
  {
    reference: "REC-77210",
    layer: "Gateway vs bank",
    merchant: "Medline Hub",
    amount: "INR 18,450",
    cause: "Bank success, callback missing",
    age: "2h 14m",
    owner: "Settlement ops",
    status: "Open",
  },
  {
    reference: "REC-77204",
    layer: "Gateway vs processor",
    merchant: "Northstar Commerce",
    amount: "INR 7,900",
    cause: "Duplicate retry authorization",
    age: "48m",
    owner: "Routing team",
    status: "Investigating",
  },
  {
    reference: "REC-77195",
    layer: "Payout ledger",
    merchant: "Orbit Tickets",
    amount: "INR 1,12,000",
    cause: "Settlement cutoff rollover",
    age: "6h 03m",
    owner: "Finance ops",
    status: "Resolved",
  },
];

export const merchantDirectorySummary = [
  { label: "Active merchants", value: "184" },
  { label: "High-risk merchants", value: "12" },
  { label: "Pending activation", value: "19" },
  { label: "Suspended accounts", value: "4" },
];

export const merchantDirectoryRows = [
  {
    merchantId: "MID-884231",
    merchant: "Northstar Commerce",
    category: "E-commerce",
    volume: "INR 38.4L",
    reserve: "5%",
    callbacks: "Healthy",
    settlement: "T+1",
    status: "Active",
  },
  {
    merchantId: "MID-884227",
    merchant: "Orbit Tickets",
    category: "Travel",
    volume: "INR 14.8L",
    reserve: "10%",
    callbacks: "Retrying",
    settlement: "T+2",
    status: "Review",
  },
  {
    merchantId: "MID-884221",
    merchant: "Medline Hub",
    category: "Healthcare",
    volume: "INR 22.1L",
    reserve: "7%",
    callbacks: "Healthy",
    settlement: "T+1",
    status: "Active",
  },
];

export const acquirerSummary = [
  { label: "Connected acquirers", value: "6" },
  { label: "Healthy rails", value: "5" },
  { label: "Degraded partners", value: "1" },
  { label: "Smart routes live", value: "14" },
];

export const acquirerRows = [
  {
    provider: "Acquirer A",
    capability: "UPI / NetBanking",
    authRate: "92.4%",
    latency: "1.4s",
    traffic: "34%",
    settlement: "T+1",
    fallback: "Enabled",
    status: "Healthy",
  },
  {
    provider: "Aggregator B",
    capability: "Cards",
    authRate: "89.9%",
    latency: "1.9s",
    traffic: "27%",
    settlement: "T+2",
    fallback: "Enabled",
    status: "Healthy",
  },
  {
    provider: "Bank Rail Y",
    capability: "Payouts",
    authRate: "97.1%",
    latency: "3.1s",
    traffic: "11%",
    settlement: "T+0",
    fallback: "Manual",
    status: "Watch",
  },
];

export const disputeSummary = [
  { label: "Open disputes", value: "26" },
  { label: "Chargebacks", value: "9" },
  { label: "Won this month", value: "18" },
  { label: "At-risk amount", value: "INR 4.7L" },
];

export const disputeRows = [
  {
    caseId: "DSP-2201",
    merchant: "Northstar Commerce",
    type: "Chargeback",
    amount: "INR 18,400",
    reason: "Cardholder dispute",
    deadline: "2 days",
    owner: "Dispute desk",
    status: "Responding",
  },
  {
    caseId: "DSP-2198",
    merchant: "Orbit Tickets",
    type: "Refund claim",
    amount: "INR 41,000",
    reason: "Service not delivered",
    deadline: "5 days",
    owner: "Merchant ops",
    status: "Evidence pending",
  },
  {
    caseId: "DSP-2191",
    merchant: "Medline Hub",
    type: "Pre-arbitration",
    amount: "INR 9,200",
    reason: "Duplicate debit",
    deadline: "Closed",
    owner: "Risk desk",
    status: "Won",
  },
];

export const reserveSummary = [
  { label: "Merchants on reserve", value: "11" },
  { label: "Held reserves", value: "INR 8.4L" },
  { label: "Pending releases", value: "3" },
  { label: "Avg reserve rate", value: "7.2%" },
];

export const reserveRows = [
  {
    merchant: "Orbit Tickets",
    reserveType: "Rolling reserve",
    rate: "10%",
    heldAmount: "INR 2.1L",
    releaseCycle: "90 days",
    trigger: "High payout velocity",
    status: "Active",
  },
  {
    merchant: "FreshCart Mini",
    reserveType: "Fixed hold",
    rate: "6%",
    heldAmount: "INR 86,000",
    releaseCycle: "45 days",
    trigger: "KYC mismatch review",
    status: "Review",
  },
  {
    merchant: "Northstar Commerce",
    reserveType: "Rolling reserve",
    rate: "5%",
    heldAmount: "INR 1.4L",
    releaseCycle: "60 days",
    trigger: "Chargeback control",
    status: "Active",
  },
];
