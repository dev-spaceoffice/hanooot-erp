export type HanoootModuleId = "overview" | "importing" | "settings" | "messages" | "drive" | "hr" | "legal"
export type HanoootTone = "blue" | "green" | "amber" | "purple" | "red" | "neutral"

export type HanoootCard = {
  title: string
  meta: string
  value?: string
  tone?: HanoootTone
}

export type HanoootColumn = {
  title: string
  count?: string
  cards: HanoootCard[]
}

export type HanoootTable = {
  title: string
  columns: string[]
  rows: string[][]
}

export type HanoootModule = {
  id: HanoootModuleId
  label: string
  short: string
  icon: string
  eyebrow: string
  title: string
  subtitle: string
  primaryAction: string
  stats: HanoootCard[]
  columns: HanoootColumn[]
  table: HanoootTable
  sideTitle: string
  sideItems: HanoootCard[]
  actions: string[]
}

export const hanoootModules: HanoootModule[] = [
  {
    id: "overview",
    label: "Overview",
    short: "Home",
    icon: "⌂",
    eyebrow: "PLATFORM ACTIVITY",
    title: "Overview",
    subtitle: "Executive dashboard from the attached Hanooot bundle: revenue, open work, shipments, branch pulse, activity, alerts, report-a-bug and department shortcuts.",
    primaryAction: "Open activity",
    stats: [
      { title: "Revenue MTD", value: "USD 146K", meta: "last 30 days", tone: "green" },
      { title: "Open work", value: "27", meta: "6 need owner review", tone: "amber" },
      { title: "Shipments", value: "14", meta: "3 need documents", tone: "blue" },
      { title: "Branch staff", value: "22", meta: "Amman · Aqaba · Dubai", tone: "neutral" },
    ],
    columns: [
      { title: "Platform activity", cards: [{ title: "Order AQB-4471 cleared customs", meta: "Importing · 14 min ago", value: "Mark read", tone: "green" }, { title: "Mansour Group retainer signed", meta: "Legal · 2 h ago", value: "Open →", tone: "blue" }] },
      { title: "Alerts", cards: [{ title: "Leave request awaiting approval", meta: "HR · 5 h ago", value: "High", tone: "amber" }, { title: "New enquiry: Salameh & Sons", meta: "Legal · Yesterday", value: "New", tone: "red" }] },
      { title: "Departments", cards: [{ title: "Importing Service", meta: "Leads · pipeline · sourcing · orders", value: "Open →", tone: "blue" }, { title: "Drive", meta: "Files · upload · deletion", value: "Open →", tone: "neutral" }] },
    ],
    table: { title: "Branches", columns: ["Branch", "City", "Staff", "Departments"], rows: [["Amman — Head office", "Amman, Jordan", "14", "Legal · HR · Importing"], ["Aqaba — Port office", "Aqaba, Jordan", "5", "Importing"], ["Dubai — Trade desk", "Dubai, UAE", "3", "Importing · Legal"]] },
    sideTitle: "Recent activity",
    sideItems: [{ title: "Bill of lading linked", meta: "Drive · AQB-4471", tone: "green" }, { title: "Report a bug", meta: "Target picker · severity · expected result", tone: "red" }],
    actions: ["Activity", "Alerts", "REPORT A BUG", "SIGNED IN AS"],
  },
  {
    id: "importing",
    label: "Importing",
    short: "Import",
    icon: "⇄",
    eyebrow: "TRADE OPERATIONS • FACEBOOK SYNC ACTIVE • LAST RUN 12 MIN AGO",
    title: "Importing",
    subtitle: "Leads, campaigns, call attempts, pipeline, sourcing, orders, products, contacts, shipment flow, quote PDF and mocked Zoho/WhatsApp/Facebook surfaces from the reference bundle.",
    primaryAction: "+ New lead",
    stats: [{ title: "Deals won / week", value: "8", meta: "last 8 weeks", tone: "green" }, { title: "Funnel", value: "61%", meta: "lead in → delivered", tone: "blue" }, { title: "Orders", value: "18", meta: "purchase to delivery", tone: "amber" }, { title: "Quote value", value: "USD 63K", meta: "priced drafts", tone: "neutral" }],
    columns: [{ title: "Leads", count: "Source · Campaign", cards: [{ title: "Facebook DM — bulk spices", meta: "Call attempts · assignee filter · quick filter", value: "Call 1", tone: "blue" }, { title: "Website enquiry", meta: "New lead modal · CRM first contact", value: "New", tone: "neutral" }] }, { title: "Pipeline", count: "Kanban", cards: [{ title: "Qadri Auto Parts", meta: "New deal modal · Advance → Lost", value: "USD 21,700", tone: "green" }, { title: "Drop-to-won creates order", meta: "Order lands in purchase-to-delivery board", value: "Auto", tone: "amber" }] }, { title: "Sourcing", count: "CN search", cards: [{ title: "CN-7629 bearings", meta: "Supplier link · supplier photos · customer photos", value: "RMB 18,400", tone: "amber" }, { title: "QR workflow", meta: "Comments/thread · RMB/USD price fields", value: "USD 2,540", tone: "blue" }] }],
    table: { title: "Orders", columns: ["CN", "DN", "Invoice", "Customer", "Stage"], rows: [["CN-7629", "DN-218", "INV-2026-118", "Qadri Auto Parts", "Customs"], ["CN-88021", "DN-241", "Draft quote", "Obeidat Trading", "Supplier photos"], ["CN-99210", "DN-309", "Quote PDF", "Mansour Group", "Shipment"]] },
    sideTitle: "Outbound actions",
    sideItems: [{ title: "Generate quote PDF", meta: "priced indicators + quote items", tone: "green" }, { title: "Facebook audience CSV", meta: "contacts export", tone: "blue" }, { title: "WhatsApp bulk action", meta: "queued; no live integration", tone: "amber" }],
    actions: ["Leads", "Pipeline", "Sourcing", "Orders", "Products", "Contacts", "Settings"],
  },
  {
    id: "settings",
    label: "Settings",
    short: "Settings",
    icon: "⚙",
    eyebrow: "PLATFORM WIDE • READ ONLY",
    title: "Settings",
    subtitle: "Organisation, branches, active departments, users, roles, permissions, authority matrix, base currency, tax, exchange rates and notification rules.",
    primaryAction: "+ Add user",
    stats: [{ title: "Users", value: "13", meta: "real reference accounts", tone: "green" }, { title: "Branches", value: "3", meta: "Amman, Aqaba, Dubai", tone: "blue" }, { title: "Base currency", value: "USD", meta: "manual rates", tone: "neutral" }, { title: "Sales tax", value: "15%", meta: "locked for non-super admins", tone: "amber" }],
    columns: [{ title: "Organisation", cards: [{ title: "Hanooot", meta: "Active departments and branch cards", value: "Platform", tone: "green" }] }, { title: "Users & roles", cards: [{ title: "Mustafa Waiz", meta: "Managing Director · Super admin", value: "Manage", tone: "blue" }, { title: "Mohammed Alwaidh", meta: "Logistics & Sourcing Manager", value: "Head", tone: "amber" }] }, { title: "Authority", cards: [{ title: "Department matrix", meta: "none · view · edit · manage", value: "LOCKED", tone: "red" }, { title: "Super admins bypass matrix", meta: "every department/subdepartment open", value: "READ ONLY", tone: "neutral" }] }],
    table: { title: "People directory", columns: ["Name", "Organisation", "Phone", "Type", "Used By"], rows: [["Faisal Obeidat", "Obeidat Trading", "+962 7 9012 4455", "Client", "Legal · Importing"], ["Shenzhen Yuhua", "Yuhua Industrial", "+86 755 8812 3300", "Supplier", "Importing"], ["Jihan Ali", "Hanooot", "+964 770 100 1010", "Employee", "HR"]] },
    sideTitle: "Finance settings",
    sideItems: [{ title: "Exchange rates", meta: "set by hand — no live feed", tone: "blue" }, { title: "Notification rules", meta: "mentions, orders, matters", tone: "green" }],
    actions: ["Organisation", "Users", "Roles", "Permissions", "Authority matrix", "Finance"],
  },
  {
    id: "messages",
    label: "Messages",
    short: "Messages",
    icon: "✉",
    eyebrow: "GROUPS • PEOPLE • THREADS • ACTIVITY",
    title: "Messages",
    subtitle: "New group, people search, thread and reply views, mentions, activity handoff and linked record/history panels.",
    primaryAction: "New group",
    stats: [{ title: "Unread", value: "5", meta: "tagged comments", tone: "amber" }, { title: "Groups", value: "6", meta: "Importing · Legal · HR", tone: "blue" }, { title: "Threads", value: "19", meta: "record-linked", tone: "green" }, { title: "People", value: "13", meta: "directory search", tone: "neutral" }],
    columns: [{ title: "Conversations", cards: [{ title: "Supplier photos review", meta: "Sourcing SRC-18 · 9 min ago", value: "Reply", tone: "blue" }, { title: "Legal contract clause", meta: "Matter LEG-44 · 1 hr ago", value: "@Mariam", tone: "amber" }] }, { title: "People", cards: [{ title: "Abeer", meta: "Importing manager", value: "Send", tone: "green" }, { title: "No users match", meta: "empty search state", value: "Empty", tone: "neutral" }] }, { title: "Activity", cards: [{ title: "Every comment where tagged", meta: "Open → record card", value: "Mention", tone: "red" }] }],
    table: { title: "Record history", columns: ["Record", "Assigned", "Conversation", "History"], rows: [["Sourcing SRC-18", "Abeer", "Supplier photos are ready", "Created · commented · moved"], ["LEG-44", "Mariam", "Clause review", "Draft · reply · owner review"], ["Payroll", "HR", "Payslip note", "Run created · approved"]] },
    sideTitle: "Linked record panel",
    sideItems: [{ title: "Reply", meta: "composer and thread drawer", tone: "blue" }, { title: "Open →", meta: "jump to record", tone: "green" }],
    actions: ["New group", "People search", "Send", "Thread", "Reply", "Mentions"],
  },
  {
    id: "drive",
    label: "Drive",
    short: "Drive",
    icon: "▣",
    eyebrow: "STORAGE • UPLOAD • LINKED DOCUMENTS",
    title: "Drive",
    subtitle: "Upload modal, storage table, linked files, legal/HR/importing document areas and file deletion permissions.",
    primaryAction: "Upload",
    stats: [{ title: "Used", value: "8.4 MB", meta: "largest media zip", tone: "blue" }, { title: "Files", value: "13", meta: "reference seed docs", tone: "green" }, { title: "Folders", value: "8", meta: "contracts, shipping, payroll", tone: "neutral" }, { title: "Deletion", value: "Role gated", meta: "remove files others uploaded", tone: "amber" }],
    columns: [{ title: "Upload to", cards: [{ title: "Shipping docs", meta: "Bill of lading — AQB-4471.pdf", value: "Upload", tone: "blue" }] }, { title: "Linked To", cards: [{ title: "Qadri Auto Parts", meta: "Packing list · supplier quote · product photos", value: "Importing", tone: "amber" }] }, { title: "Owners", cards: [{ title: "Mohammed Alwaidh", meta: "Drive files with owner/size metadata", value: "Manage", tone: "green" }] }],
    table: { title: "Storage table", columns: ["Name", "Linked To", "Owner", "Size"], rows: [["Retainer — Mansour Group.pdf", "Mansour Group", "Abdullah Abbas", "412 KB"], ["Bill of lading — AQB-4471.pdf", "Qadri Auto Parts", "Mohammed Alwaidh", "1.1 MB"], ["Payslips — August 2026.pdf", "Payroll", "Abdullah Abbas", "318 KB"]] },
    sideTitle: "Document areas",
    sideItems: [{ title: "Legal documents", meta: "contracts · retainers", tone: "blue" }, { title: "HR documents", meta: "personnel · payroll", tone: "green" }, { title: "Importing documents", meta: "shipping · invoices · supplier files", tone: "amber" }],
    actions: ["Upload", "Add file", "Linked documents", "Files"],
  },
  {
    id: "hr",
    label: "HR",
    short: "HR",
    icon: "◌",
    eyebrow: "HUMAN RESOURCES",
    title: "People",
    subtitle: "People/headcount, employee table, leave approve/decline, August 2026 payroll run, employee documents, contact, annual leave and salary panels.",
    primaryAction: "Add employee",
    stats: [{ title: "Headcount", value: "18", meta: "3 contractors", tone: "green" }, { title: "Leave", value: "5", meta: "2 awaiting decision", tone: "amber" }, { title: "Payroll", value: "Aug 2026", meta: "Gross, tax, social security", tone: "blue" }, { title: "Docs", value: "4 missing", meta: "contracts, IDs, visas", tone: "red" }],
    columns: [{ title: "Employee", cards: [{ title: "Abdullah Thamer", meta: "Sourcing & Logistics Agent", value: "Active", tone: "green" }] }, { title: "Leave requests", cards: [{ title: "Annual leave", meta: "Approve · Decline · Decided by", value: "Pending", tone: "amber" }] }, { title: "Payroll run", cards: [{ title: "AUGUST 2026 RUN", meta: "Basic · Allow. · Deduct. · Net", value: "Draft", tone: "blue" }] }],
    table: { title: "Employee documents", columns: ["Employee", "Role", "Document", "Expiry"], rows: [["Mohammed Alwaidh", "Logistics Manager", "Passport copy", "09 Jul 2026"], ["Abdullah Thamer", "Agent", "Employment contract", "02 Jul 2026"], ["Jihan Ali", "Employee", "ID + visa", "Review"]] },
    sideTitle: "Employee panels",
    sideItems: [{ title: "Contact", meta: "email, phone, emergency", tone: "neutral" }, { title: "Annual leave", meta: "balance and requests", tone: "amber" }, { title: "Salary — monthly", meta: "role-gated salary data", tone: "blue" }],
    actions: ["People", "Leave", "Payroll", "Documents", "Approve", "Decline"],
  },
  {
    id: "legal",
    label: "Legal",
    short: "Legal",
    icon: "§",
    eyebrow: "CLIENT SERVICES",
    title: "Legal",
    subtitle: "Client-services dashboard, billable month, pipeline by service, needs-attention table, enquiries, retainers and legal documents.",
    primaryAction: "Create enquiry",
    stats: [{ title: "Billable this month", value: "USD 74K", meta: "retainers and matters", tone: "green" }, { title: "Needs attention", value: "6", meta: "2 overdue", tone: "red" }, { title: "Retainers", value: "12", meta: "renewal soon", tone: "amber" }, { title: "Enquiries", value: "21", meta: "incoming client enquiries", tone: "blue" }],
    columns: [{ title: "Pipeline by service", cards: [{ title: "Company formation", meta: "Salameh & Sons", value: "New", tone: "blue" }, { title: "Retainer renewal", meta: "Mansour Group", value: "Renew", tone: "amber" }] }, { title: "Needs attention", cards: [{ title: "Import contract clause", meta: "Owner review required", value: "Today", tone: "red" }] }, { title: "Documents", cards: [{ title: "NDA template v3.docx", meta: "shared platform storage", value: "Ready", tone: "green" }] }],
    table: { title: "Enquiry table", columns: ["Enquiry", "Service", "Source", "Value", "Stage", "Owner"], rows: [["Salameh & Sons", "Company formation", "Referral", "USD 8K", "New", "Mariam"], ["Mansour Group", "Retainer", "Existing", "USD 24K", "Renewal", "Abdullah Abbas"], ["Obeidat Trading", "Import contract", "Importing", "USD 12K", "Review", "Tania"]] },
    sideTitle: "Legal documents",
    sideItems: [{ title: "Retainer packet", meta: "monthly, renews, status", tone: "green" }, { title: "Matter file", meta: "scope, owner review", tone: "amber" }],
    actions: ["Client services", "Pipeline", "Needs attention", "Enquiries", "Retainers", "Documents"],
  },
]

export const getHanoootModule = (id: HanoootModuleId) => hanoootModules.find((module) => module.id === id) ?? hanoootModules[0]
