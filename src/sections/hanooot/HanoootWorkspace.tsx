"use client"

import { useMemo, useState } from "react"

type ModuleId = "overview" | "importing" | "settings" | "messages" | "drive" | "hr" | "legal"
type Tone = "blue" | "green" | "amber" | "purple" | "red" | "neutral"

type Row = { id: string; cells: string[] }
type CardItem = { title: string; meta: string; value?: string; tone?: Tone }
type ModulePage = {
  id: ModuleId
  label: string
  short: string
  icon: string
  eyebrow: string
  title: string
  subtitle: string
  primaryAction: string
  stats: CardItem[]
  columns: { title: string; items: CardItem[] }[]
  tableTitle: string
  tableColumns: string[]
  tableRows: Row[]
  sideTitle: string
  sideItems: CardItem[]
  footerActions: string[]
}

const toneClass: Record<Tone, string> = {
  blue: "bg-[#E7EEFB] text-[#1D4ED8] border-[#CAD8F6]",
  green: "bg-[#E6F2EA] text-[#2F8F63] border-[#CDE7D5]",
  amber: "bg-[#FBF4E4] text-[#8A5A12] border-[#F1DCAC]",
  purple: "bg-[#EFE9F3] text-[#5B4B9A] border-[#DFD2EA]",
  red: "bg-[#F4E3E1] text-[#A2402F] border-[#E6C3BD]",
  neutral: "bg-[#EFEDE6] text-[#78736A] border-[#E4E0D6]",
}

const modules: ModulePage[] = [
  {
    id: "overview",
    label: "Overview",
    short: "Home",
    icon: "⌂",
    eyebrow: "PLATFORM ACTIVITY",
    title: "Overview",
    subtitle: "A single warm-neutral command center for revenue, open work, shipments, headcount, legal pipeline, branches, activity, alerts, and department handoff.",
    primaryAction: "Open activity",
    stats: [
      { title: "Revenue MTD", value: "SAR 482K", meta: "+12% from last month", tone: "green" },
      { title: "Open work items", value: "27", meta: "6 urgent approvals", tone: "amber" },
      { title: "Shipments in transit", value: "14", meta: "3 need documents", tone: "blue" },
      { title: "Legal pipeline", value: "9", meta: "2 need owner review", tone: "red" },
    ],
    columns: [
      { title: "Today", items: [{ title: "VAT mismatch", meta: "Finance settings · needs super-admin", value: "High", tone: "red" }] },
      { title: "In progress", items: [{ title: "Quote PDF prepared", meta: "Order PO-388 · Importing", value: "Ready", tone: "green" }] },
      { title: "Watching", items: [{ title: "New legal enquiry", meta: "Client services · Mariam", value: "Today", tone: "blue" }] },
    ],
    tableTitle: "Branches",
    tableColumns: ["Branch", "Live deals", "Orders", "Owner"],
    tableRows: [
      { id: "riyadh", cells: ["Riyadh", "18", "7 in transit", "Abeer"] },
      { id: "jeddah", cells: ["Jeddah", "11", "4 customs", "Salim"] },
      { id: "dubai", cells: ["Dubai", "6", "2 quote review", "Mariam"] },
    ],
    sideTitle: "Recent activity",
    sideItems: [
      { title: "Facebook lead synced", meta: "Importing · 12 min ago", tone: "blue" },
      { title: "Bill of lading linked", meta: "Drive · 1 hr ago", tone: "green" },
      { title: "Retainer renewal flagged", meta: "Legal · today", tone: "red" },
    ],
    footerActions: ["Report a bug", "Mark read", "Open department", "Switch role"],
  },
  {
    id: "importing",
    label: "Importing",
    short: "Trade",
    icon: "⇄",
    eyebrow: "TRADE OPERATIONS • FACEBOOK SYNC ACTIVE • LAST RUN 12 MIN AGO",
    title: "Importing",
    subtitle: "Leads, campaigns, calls, pipeline, sourcing, orders, products, contacts, shipments, quote PDF actions, and mocked Facebook/Zoho/WhatsApp surfaces.",
    primaryAction: "New lead",
    stats: [
      { title: "Deals won / week", value: "8", meta: "3 created orders", tone: "green" },
      { title: "Lead response SLA", value: "92%", meta: "Under 15 minutes", tone: "green" },
      { title: "Orders in transit", value: "14", meta: "5 need customs docs", tone: "amber" },
      { title: "Quote value", value: "USD 63K", meta: "PDF-ready drafts", tone: "blue" },
    ],
    columns: [
      { title: "New lead", items: [{ title: "Facebook form: bulk spices", meta: "Campaign · Ramadan imports", value: "Call 1", tone: "blue" }, { title: "Ad form: kitchenware", meta: "Assignee · Abeer", value: "New", tone: "neutral" }] },
      { title: "Sourcing", items: [{ title: "CN supplier photos", meta: "QR workflow · comments open", value: "RMB 18,400", tone: "amber" }] },
      { title: "Won → Order", items: [{ title: "Zoho draft quote", meta: "Drop-to-won creates PO", value: "USD 21,700", tone: "green" }] },
    ],
    tableTitle: "Orders and shipment flow",
    tableColumns: ["Order", "Customer", "Stage", "Quote", "Shipment"],
    tableRows: [
      { id: "po-241", cells: ["PO-241", "Noura Trading", "Supplier photos", "Priced", "Shanghai → Jeddah"] },
      { id: "po-309", cells: ["PO-309", "Gulf Retail", "Customs", "PDF generated", "Ningbo → Dammam"] },
      { id: "po-388", cells: ["PO-388", "Spice Market", "Quote approval", "Needs RMB conversion", "Dubai hub"] },
    ],
    sideTitle: "Integration surfaces",
    sideItems: [
      { title: "Facebook Lead Ads", meta: "Mock sync writes leads and sync_runs", tone: "blue" },
      { title: "Zoho Books", meta: "Draft quotes only · no live call", tone: "amber" },
      { title: "WhatsApp bulk", meta: "Queued outbound_action", tone: "green" },
    ],
    footerActions: ["Source", "Campaign", "Call attempt", "Advance", "Lost", "Generate quote PDF", "Export CSV"],
  },
  {
    id: "settings",
    label: "Settings",
    short: "Admin",
    icon: "⚙",
    eyebrow: "PLATFORM WIDE • READ ONLY STATES",
    title: "Settings",
    subtitle: "Organisation, active departments, users, access grants, authority matrix, base currency, sales tax, exchange rates, and notification rules.",
    primaryAction: "Create user",
    stats: [
      { title: "Active departments", value: "7", meta: "All core modules enabled", tone: "green" },
      { title: "Role grants", value: "32", meta: "5 read-only authority rows", tone: "blue" },
      { title: "Base currency", value: "SAR", meta: "VAT 15%", tone: "neutral" },
      { title: "Exchange rates", value: "4", meta: "RMB/USD/SAR/AED", tone: "amber" },
    ],
    columns: [
      { title: "Admin", items: [{ title: "Organisation settings", meta: "Create users and departments", value: "Open", tone: "green" }] },
      { title: "Department", items: [{ title: "Importing manager", meta: "Lead + order approvals", value: "Write", tone: "blue" }] },
      { title: "Locked", items: [{ title: "Tax setup", meta: "Super-admin explanatory copy", value: "Locked", tone: "amber" }] },
    ],
    tableTitle: "People directory",
    tableColumns: ["Name", "Organisation", "Phone", "Type", "Used By"],
    tableRows: [
      { id: "u1", cells: ["Salim", "The Spice", "+966 500 000 001", "Super admin", "All modules"] },
      { id: "u2", cells: ["Abeer", "Hanooot", "+966 500 000 002", "Importer", "Leads, Orders"] },
      { id: "u3", cells: ["Mariam", "External Counsel", "+971 500 000 003", "Read only", "Legal"] },
    ],
    sideTitle: "Finance settings",
    sideItems: [
      { title: "Base currency", meta: "SAR · controlled setting", tone: "neutral" },
      { title: "Sales tax", meta: "15% · super-admin locked", tone: "amber" },
      { title: "Notification rules", meta: "Activity, mentions, orders, legal", tone: "blue" },
    ],
    footerActions: ["Grant access", "Update VAT", "Edit rate", "Create rule"],
  },
  {
    id: "messages",
    label: "Messages",
    short: "Chat",
    icon: "✉",
    eyebrow: "GROUPS • MENTIONS • RECORD HISTORY",
    title: "Messages",
    subtitle: "New group, people search, threads, replies, mentions, activity handoff, linked record panels, and empty states.",
    primaryAction: "New group",
    stats: [
      { title: "Open threads", value: "19", meta: "5 mentions unread", tone: "amber" },
      { title: "Groups", value: "6", meta: "Importing, HR, Legal", tone: "blue" },
      { title: "Linked records", value: "41", meta: "Deals, files, matters", tone: "green" },
      { title: "SLA replies", value: "88%", meta: "Same business day", tone: "neutral" },
    ],
    columns: [
      { title: "Unread", items: [{ title: "Need invoice copy", meta: "Drive link missing", value: "@Finance", tone: "amber" }] },
      { title: "Active", items: [{ title: "Customer CN search", meta: "Importing record thread", value: "@Abeer", tone: "blue" }] },
      { title: "Resolved", items: [{ title: "Leave approval", meta: "HR record history", value: "Done", tone: "green" }] },
    ],
    tableTitle: "Thread inbox",
    tableColumns: ["Thread", "Linked To", "Last Reply", "Mention"],
    tableRows: [
      { id: "msg-1", cells: ["Supplier photos review", "Sourcing SRC-18", "9 min ago", "@Abeer"] },
      { id: "msg-2", cells: ["Legal contract clause", "Matter LEG-44", "1 hr ago", "@Mariam"] },
      { id: "msg-3", cells: ["Payroll note", "August payroll", "Yesterday", "@HR"] },
    ],
    sideTitle: "People search",
    sideItems: [
      { title: "Abeer", meta: "Importing manager · online", tone: "green" },
      { title: "Mariam", meta: "Legal · reviewing", tone: "blue" },
      { title: "Lina", meta: "HR admin · away", tone: "neutral" },
    ],
    footerActions: ["Search people", "Reply", "Mention", "Link record"],
  },
  {
    id: "drive",
    label: "Drive",
    short: "Files",
    icon: "▣",
    eyebrow: "DOCUMENTS • LINKED FILES • STORAGE READY",
    title: "Drive",
    subtitle: "Upload surface, storage table, linked documents across Importing, HR, Legal, and Supabase Storage-ready buckets.",
    primaryAction: "Upload",
    stats: [
      { title: "Stored files", value: "126", meta: "Demo seed references", tone: "green" },
      { title: "Linked records", value: "84%", meta: "Missing links flagged", tone: "blue" },
      { title: "Pending upload", value: "7", meta: "Mock local queue", tone: "amber" },
      { title: "Buckets", value: "4", meta: "Shipments, quotes, HR, legal", tone: "neutral" },
    ],
    columns: [
      { title: "Upload", items: [{ title: "Add shipment document", meta: "Modal-ready interaction", value: "New", tone: "blue" }] },
      { title: "Link", items: [{ title: "Attach to matter", meta: "Legal documents", value: "Needed", tone: "amber" }] },
      { title: "Archive", items: [{ title: "Employee record", meta: "Retention label", value: "Stored", tone: "green" }] },
    ],
    tableTitle: "Storage table",
    tableColumns: ["Name", "Linked To", "Owner", "Size"],
    tableRows: [
      { id: "file-1", cells: ["bill-of-lading-po-309.pdf", "Order PO-309", "Abeer", "1.8 MB"] },
      { id: "file-2", cells: ["retainer-mariam.docx", "Legal LEG-44", "Mariam", "420 KB"] },
      { id: "file-3", cells: ["employee-id-hassan.png", "Employee EMP-07", "HR", "840 KB"] },
    ],
    sideTitle: "Linked areas",
    sideItems: [
      { title: "Importing", meta: "Shipments, supplier photos, quotes", tone: "amber" },
      { title: "HR", meta: "Employee documents", tone: "green" },
      { title: "Legal", meta: "Retainers and matters", tone: "blue" },
    ],
    footerActions: ["Add file", "Preview", "Link", "Archive"],
  },
  {
    id: "hr",
    label: "HR",
    short: "People",
    icon: "◌",
    eyebrow: "PEOPLE • LEAVE • AUGUST 2026 PAYROLL",
    title: "HR",
    subtitle: "People, headcount, employee table, leave approve/decline, August 2026 payroll, documents, contact, annual leave, and salary panels.",
    primaryAction: "Add employee",
    stats: [
      { title: "Headcount", value: "18", meta: "3 contractors", tone: "green" },
      { title: "Leave requests", value: "5", meta: "2 await approval", tone: "amber" },
      { title: "Payroll run", value: "Aug 2026", meta: "Draft locked", tone: "blue" },
      { title: "Missing docs", value: "4", meta: "IDs and contracts", tone: "red" },
    ],
    columns: [
      { title: "Leave", items: [{ title: "Annual leave", meta: "Approve / decline", value: "Pending", tone: "amber" }] },
      { title: "Payroll", items: [{ title: "August 2026 run", meta: "Draft review", value: "Locked", tone: "blue" }] },
      { title: "Documents", items: [{ title: "Employee contract", meta: "Drive link ready", value: "Ready", tone: "green" }] },
    ],
    tableTitle: "Employee table",
    tableColumns: ["Employee", "Role", "Leave", "Salary Panel", "Documents"],
    tableRows: [
      { id: "emp-1", cells: ["Hassan", "Sourcing coordinator", "8 days", "SAR 9,500", "ID uploaded"] },
      { id: "emp-2", cells: ["Abeer", "Importing manager", "14 days", "SAR 16,000", "Contract missing"] },
      { id: "emp-3", cells: ["Lina", "HR admin", "11 days", "SAR 10,200", "Complete"] },
    ],
    sideTitle: "Employee panels",
    sideItems: [
      { title: "Contact", meta: "Phone and emergency details", tone: "neutral" },
      { title: "Annual leave", meta: "Balances and requests", tone: "amber" },
      { title: "Salary", meta: "Role-gated pay data", tone: "blue" },
    ],
    footerActions: ["Approve leave", "Decline leave", "Open payroll", "Upload document"],
  },
  {
    id: "legal",
    label: "Legal",
    short: "Legal",
    icon: "§",
    eyebrow: "CLIENT SERVICES • RETAINERS • DOCUMENTS",
    title: "Legal",
    subtitle: "Client services dashboard, billable month, pipeline by service, needs-attention table, enquiries, retainers, and legal documents.",
    primaryAction: "Create enquiry",
    stats: [
      { title: "Billable month", value: "SAR 74K", meta: "Retainers + matters", tone: "green" },
      { title: "Needs attention", value: "6", meta: "2 overdue", tone: "red" },
      { title: "Retainers", value: "12", meta: "3 renewal soon", tone: "amber" },
      { title: "Enquiries", value: "21", meta: "8 in review", tone: "blue" },
    ],
    columns: [
      { title: "Enquiry", items: [{ title: "New client service", meta: "KYC pending", value: "New", tone: "blue" }] },
      { title: "Matter", items: [{ title: "Import contract", meta: "Needs clause review", value: "Review", tone: "amber" }] },
      { title: "Retainer", items: [{ title: "Renewal packet", meta: "PDF in Drive", value: "Ready", tone: "green" }] },
    ],
    tableTitle: "Needs-attention table",
    tableColumns: ["Matter", "Service", "Owner", "Deadline", "Document"],
    tableRows: [
      { id: "leg-1", cells: ["LEG-44", "Retainer renewal", "Mariam", "Today", "Draft sent"] },
      { id: "leg-2", cells: ["LEG-51", "Import contract", "External Counsel", "Tomorrow", "Clause review"] },
      { id: "leg-3", cells: ["LEG-57", "Client enquiry", "Salim", "This week", "Missing KYC"] },
    ],
    sideTitle: "Legal documents",
    sideItems: [
      { title: "Retainer", meta: "Renewal and signature packet", tone: "green" },
      { title: "Matter file", meta: "Clause review and KYC", tone: "amber" },
      { title: "Client service", meta: "Pipeline by service", tone: "blue" },
    ],
    footerActions: ["Open matter", "Prepare retainer", "Attach document", "Resolve attention"],
  },
]

const RailIcon = ({ module, active, onClick }: { module: ModulePage; active: boolean; onClick: () => void }) => (
  <button
    aria-current={active ? "page" : undefined}
    className={`grid w-[60px] place-items-center gap-[5px] rounded-[18px] px-0 pb-[7px] pt-[9px] text-center transition ${
      active ? "bg-[#EDE9E0] text-[#2F2A23]" : "text-[#CFC9B8] hover:text-[#EDE9E0]"
    }`}
    onClick={onClick}
    title={module.label}
    type="button"
  >
    <span className="text-[20px] leading-none">{module.icon}</span>
    <span className="text-[9.5px] font-semibold leading-tight">{module.short}</span>
  </button>
)

const Badge = ({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) => (
  <span className={`inline-flex rounded-full border px-[9px] py-[3px] text-[11px] font-semibold ${toneClass[tone]}`}>{children}</span>
)

const StatCard = ({ item }: { item: CardItem }) => (
  <div className="rounded-[18px] border border-[#E4E0D6] bg-[#FFFFFF] p-[16px_17px] shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">{item.title}</span>
      <Badge tone={item.tone}>{item.tone ?? "neutral"}</Badge>
    </div>
    <div className="mt-[10px] text-[27px] font-semibold leading-none tracking-[-0.035em] text-[#3C382F]">{item.value}</div>
    <div className="mt-[7px] text-[11.5px] font-medium text-[#78736A]">{item.meta}</div>
  </div>
)

const KanbanColumn = ({ title, items }: { title: string; items: CardItem[] }) => (
  <div className="min-h-[220px] rounded-[20px] border border-[#E4E0D6] bg-[#FBFAF7] p-3">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[13px] font-semibold text-[#3C382F]">{title}</h3>
      <span className="rounded-full bg-[#EFEDE6] px-2 py-1 text-[10px] font-semibold text-[#78736A]">{items.length}</span>
    </div>
    <div className="space-y-3">
      {items.map((item) => (
        <article className="rounded-[18px] border border-[#E4E0D6] bg-white p-3 shadow-[0_8px_20px_rgba(40,36,30,0.04)]" key={`${title}-${item.title}`}>
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-[13px] font-semibold text-[#3C382F]">{item.title}</h4>
            {item.value ? <Badge tone={item.tone}>{item.value}</Badge> : null}
          </div>
          <p className="mt-2 text-[12px] leading-5 text-[#78736A]">{item.meta}</p>
        </article>
      ))}
    </div>
  </div>
)

const DataTable = ({ columns, rows }: { columns: string[]; rows: Row[] }) => (
  <div className="overflow-hidden rounded-[18px] border border-[#E4E0D6]">
    <table className="w-full min-w-[680px] border-collapse text-start text-[12.5px]">
      <thead className="bg-[#EFEDE6] text-[#78736A]">
        <tr>{columns.map((column) => <th className="px-4 py-3 text-start font-semibold" key={column}>{column}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-[#E4E0D6] bg-white">
        {rows.map((row) => (
          <tr key={row.id}>{row.cells.map((cell, index) => <td className="px-4 py-3 text-[#3C382F]" key={`${row.id}-${index}`}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
)

const DetailCard = ({ title, kicker, children, tone = "neutral" }: { title: string; kicker: string; children: React.ReactNode; tone?: Tone }) => (
  <article className="rounded-[20px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_20px_rgba(40,36,30,0.04)]">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">{kicker}</p>
        <h3 className="mt-1 text-[14px] font-semibold text-[#3C382F]">{title}</h3>
      </div>
      <Badge tone={tone}>{kicker}</Badge>
    </div>
    {children}
  </article>
)

const MiniField = ({ label, value }: { label: string; value: string }) => (
  <label className="grid gap-1 text-[11.5px] font-semibold text-[#78736A]">
    {label}
    <span className="rounded-[14px] border border-[#E4E0D6] bg-[#FBFAF7] px-3 py-2 text-[12px] font-medium text-[#3C382F]">{value}</span>
  </label>
)

const MiniButton = ({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) => (
  <button className={`rounded-full border px-3 py-1.5 text-[11.5px] font-semibold ${toneClass[tone]}`} type="button">
    {children}
  </button>
)

const RealModuleScreens = ({ moduleId }: { moduleId: ModuleId }) => {
  if (moduleId === "overview") {
    return (
      <section data-native-screen="overview-activity" className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <DetailCard kicker="PLATFORM ACTIVITY" title="Activity drawer with feed rows" tone="blue">
          <div className="mb-3 flex items-center justify-between"><span className="text-[12px] text-[#78736A]">Department events, alerts, build label, timestamps</span><MiniButton tone="blue">Mark read</MiniButton></div>
          <div className="space-y-2">
            {["Facebook lead synced · Importing · 12 min ago", "Bill of lading linked · Drive · 1 hr ago", "Retainer renewal flagged · Legal · today", "Leave approval requested · HR · today"].map((row) => (
              <div className="flex items-center justify-between rounded-[16px] border border-[#E4E0D6] bg-[#FBFAF7] px-3 py-2" key={row}><span className="text-[12.5px] text-[#3C382F]">{row}</span><Badge tone="neutral">Open →</Badge></div>
            ))}
          </div>
        </DetailCard>
        <DetailCard kicker="REPORT A BUG" title="Bug report modal fields" tone="red">
          <div className="grid gap-2"><MiniField label="Target picker" value="Current module: Overview" /><MiniField label="Severity" value="Low · Medium · High · Critical" /><MiniField label="What went wrong" value="Textarea with visible focus" /><MiniField label="Expected instead" value="Textarea + Send + Reset demo" /></div>
        </DetailCard>
      </section>
    )
  }
  if (moduleId === "importing") {
    return (
      <section data-native-screen="importing-trade-operations" className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-3">
          <DetailCard kicker="LEADS" title="Lead intake board" tone="blue"><div className="grid grid-cols-2 gap-2"><MiniField label="Source" value="Facebook Lead Ads" /><MiniField label="Campaign" value="Ramadan imports" /><MiniField label="Assignee" value="Abeer" /><MiniField label="Quick filter" value="Uncalled / Hot / Form" /></div><div className="mt-3 flex flex-wrap gap-2"><MiniButton tone="blue">New lead</MiniButton><MiniButton tone="amber">Call attempt</MiniButton><MiniButton>Drag/drop column</MiniButton></div></DetailCard>
          <DetailCard kicker="PIPELINE" title="Deals kanban + order conversion" tone="green"><div className="grid gap-2">{["New deal modal", "Advance", "Lost", "Drop-to-won creates order"].map(x=><div className="rounded-[14px] bg-[#FBFAF7] px-3 py-2 text-[12px]" key={x}>{x}</div>)}</div></DetailCard>
          <DetailCard kicker="SOURCING" title="CN search and supplier media" tone="amber"><div className="grid grid-cols-2 gap-2"><MiniField label="Customer CN search" value="CN-88021" /><MiniField label="Supplier link" value="Yiwu Source" /><MiniField label="RMB price" value="¥18,400" /><MiniField label="USD price" value="$2,540" /></div><div className="mt-3 flex flex-wrap gap-2"><MiniButton tone="amber">Supplier photos</MiniButton><MiniButton tone="blue">Customer photos</MiniButton><MiniButton>QR workflow</MiniButton></div></DetailCard>
        </div>
        <DetailCard kicker="ORDERS PRODUCTS CONTACTS" title="Shipment, quote and outbound actions" tone="purple"><div className="grid gap-2 md:grid-cols-4">{["Order stages", "Products on deal", "Shipment actions", "Quote items", "Priced indicators", "Generate quote PDF", "Facebook audience CSV", "WhatsApp bulk action"].map(x=><span className="rounded-[14px] border border-[#E4E0D6] bg-[#FBFAF7] px-3 py-2 text-[12px]" key={x}>{x}</span>)}</div></DetailCard>
      </section>
    )
  }
  if (moduleId === "settings") {
    return <section data-native-screen="settings-authority-finance" className="grid gap-4 xl:grid-cols-3"><DetailCard kicker="PLATFORM WIDE" title="Organisation and users" tone="green"><div className="grid gap-2"><MiniField label="Active departments" value="Overview, Importing, Drive, HR, Legal" /><MiniField label="User creation" value="Name · Email · Role · Department" /><MiniButton tone="green">Grant access</MiniButton></div></DetailCard><DetailCard kicker="READ ONLY" title="Authority matrix" tone="amber"><DataTable columns={["Department", "Subdepartment", "Level", "State"]} rows={[{id:"a",cells:["Importing","Orders","Write","Open"]},{id:"b",cells:["Finance","Tax","Super admin","Locked"]},{id:"c",cells:["Legal","Retainers","Read","Read only"]}]} /></DetailCard><DetailCard kicker="FINANCE" title="Currency, tax and notifications" tone="blue"><div className="grid gap-2"><MiniField label="Base currency" value="SAR" /><MiniField label="Sales tax rate" value="15%" /><MiniField label="Exchange rates" value="RMB · USD · AED" /><MiniField label="Notification rules" value="Activity · Mentions · Orders" /></div></DetailCard></section>
  }
  if (moduleId === "messages") {
    return <section data-native-screen="messages-thread-record-history" className="grid gap-4 xl:grid-cols-[320px_1fr_300px]"><DetailCard kicker="PEOPLE" title="Groups and search" tone="blue"><MiniButton tone="blue">New group</MiniButton><div className="mt-3 grid gap-2"><MiniField label="People search" value="Abeer, Mariam, Lina" /><MiniField label="Empty state" value="Select a thread" /></div></DetailCard><DetailCard kicker="THREAD" title="Replies and mentions" tone="amber"><div className="space-y-2">{["@Abeer supplier photos are ready", "Reply composer with linked record", "Mention activity handoff"].map(x=><div className="rounded-[16px] bg-[#FBFAF7] px-3 py-2 text-[12.5px]" key={x}>{x}</div>)}</div></DetailCard><DetailCard kicker="HISTORY" title="Record history panel" tone="green"><div className="grid gap-2"><MiniField label="Linked To" value="Sourcing SRC-18" /><MiniField label="Record panel" value="Deal · File · Matter" /><MiniField label="Timeline" value="Comments + mentions" /></div></DetailCard></section>
  }
  if (moduleId === "drive") {
    return <section data-native-screen="drive-upload-linked-documents" className="grid gap-4 xl:grid-cols-[360px_1fr]"><DetailCard kicker="UPLOAD" title="Add-file modal" tone="green"><div className="grid gap-2"><MiniField label="File picker" value="Choose file" /><MiniField label="Linked To" value="Order / Employee / Matter" /><MiniField label="Owner" value="Abeer" /><MiniButton tone="green">Upload</MiniButton></div></DetailCard><DetailCard kicker="LINKED FILES" title="Document areas" tone="blue"><DataTable columns={["Area", "Name", "Linked To", "Status"]} rows={[{id:"d1",cells:["Importing","quote-po-309.pdf","Order PO-309","Ready"]},{id:"d2",cells:["HR","employee-contract.docx","EMP-07","Missing signature"]},{id:"d3",cells:["Legal","retainer.pdf","LEG-44","Owner review"]}]} /></DetailCard></section>
  }
  if (moduleId === "hr") {
    return <section data-native-screen="hr-people-payroll-documents" className="grid gap-4 xl:grid-cols-3"><DetailCard kicker="PEOPLE" title="Employee panels" tone="green"><div className="grid gap-2"><MiniField label="Headcount" value="18 employees" /><MiniField label="Contact" value="Phone · Emergency" /><MiniField label="Annual leave" value="Approve / Decline" /></div></DetailCard><DetailCard kicker="AUGUST 2026 PAYROLL" title="Payroll run" tone="blue"><div className="grid gap-2"><MiniField label="Payroll status" value="Draft locked" /><MiniField label="Salary panel" value="Role-gated" /><MiniButton tone="blue">Open payroll</MiniButton></div></DetailCard><DetailCard kicker="DOCUMENTS" title="Employee documents" tone="amber"><DataTable columns={["Employee", "Document", "State"]} rows={[{id:"h1",cells:["Hassan","ID","Uploaded"]},{id:"h2",cells:["Abeer","Contract","Missing"]},{id:"h3",cells:["Lina","Payroll form","Ready"]}]} /></DetailCard></section>
  }
  return <section data-native-screen="legal-client-services-documents" className="grid gap-4 xl:grid-cols-3"><DetailCard kicker="CLIENT SERVICES" title="Legal dashboard" tone="purple"><div className="grid gap-2"><MiniField label="Billable month" value="SAR 74K" /><MiniField label="Pipeline by service" value="Retainers · Matters · Enquiries" /><MiniButton tone="purple">Create enquiry</MiniButton></div></DetailCard><DetailCard kicker="NEEDS ATTENTION" title="Enquiries and retainers" tone="red"><DataTable columns={["Matter", "Service", "Owner", "State"]} rows={[{id:"l1",cells:["LEG-44","Retainer","Mariam","Renewal"]},{id:"l2",cells:["LEG-51","Import contract","Counsel","Clause review"]},{id:"l3",cells:["LEG-57","Client enquiry","Salim","Missing KYC"]}]} /></DetailCard><DetailCard kicker="DOCUMENTS" title="Legal document generator" tone="blue"><div className="grid gap-2"><MiniField label="Matter files" value="Drive linked" /><MiniField label="Owner review" value="Required" /><MiniField label="Retainer packet" value="Generated draft" /></div></DetailCard></section>
}

const ModuleView = ({ page }: { page: ModulePage }) => (
  <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
    <div className="flex h-[56px] flex-none items-center gap-3 border-b border-[#E4E0D6] bg-white px-6">
      <span className="text-[15.5px] font-semibold tracking-[-0.015em] text-[#3C382F]">{page.title}</span>
      <span className="text-[12.5px] text-[#78736A]">Sat 19 Sep 2026</span>
      <div className="flex-1" />
      <span className="hidden text-[12.5px] text-[#78736A] md:block">Good evening, Salim</span>
      <button className="rounded-full border border-[#E4E0D6] bg-[#F5F3EE] px-3 py-2 text-[12px] font-semibold text-[#3C382F]" type="button">{page.primaryAction}</button>
    </div>
    <div className="min-h-0 flex-1 overflow-auto p-6">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
        <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">{page.eyebrow}</p>
              <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#3C382F]">{page.title}</h1>
              <p className="mt-3 text-[13px] leading-6 text-[#78736A]">{page.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">{page.footerActions.slice(0, 4).map((action) => <Badge key={action} tone="neutral">{action}</Badge>)}</div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{page.stats.map((item) => <StatCard item={item} key={item.title} />)}</section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
          <div className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-3">{page.columns.map((column) => <KanbanColumn key={column.title} {...column} />)}</div>
            <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-semibold text-[#3C382F]">{page.tableTitle}</h2>
                  <p className="text-[12px] text-[#78736A]">Pixel-close table rhythm from the attached prototype: thin warm borders, compact text, and horizontal overflow.</p>
                </div>
                <Badge tone="green">Ready</Badge>
              </div>
              <DataTable columns={page.tableColumns} rows={page.tableRows} />
            </div>
            <RealModuleScreens moduleId={page.id} />
          </div>

          <aside className="space-y-4">
            <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
              <h2 className="text-[16px] font-semibold text-[#3C382F]">{page.sideTitle}</h2>
              <div className="mt-4 space-y-3">
                {page.sideItems.map((item) => (
                  <article className="rounded-[18px] border border-[#E4E0D6] bg-[#FBFAF7] p-3" key={item.title}>
                    <div className="flex items-start justify-between gap-3"><h3 className="text-[13px] font-semibold text-[#3C382F]">{item.title}</h3><Badge tone={item.tone}>{item.tone ?? "neutral"}</Badge></div>
                    <p className="mt-2 text-[12px] leading-5 text-[#78736A]">{item.meta}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="rounded-[22px] border border-[#E4E0D6] bg-[#2F2A23] p-4 text-[#EDE9E0] shadow-[0_12px_34px_rgba(40,36,30,0.22)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#CFC9B8]">SIGNED IN AS</p>
              <div className="mt-3 flex items-center gap-3 border-y border-white/10 py-3">
                <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#EDE9E0] text-[12px] font-semibold text-[#3C382F]">SA</span>
                <div><p className="text-[13.5px] font-semibold">Salim</p><p className="text-[11.5px] text-[#CFC9B8]">Founder / CEO</p></div>
              </div>
              <button className="mt-3 w-full rounded-[16px] bg-[#3C382F] px-3 py-2 text-[12px] font-semibold" type="button">Sign out</button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  </div>
)

const HanoootWorkspace = () => {
  const [activeId, setActiveId] = useState<ModuleId>("overview")
  const [rolesOpen, setRolesOpen] = useState(false)
  const [bugOpen, setBugOpen] = useState(false)
  const activePage = useMemo(() => modules.find((module) => module.id === activeId) ?? modules[0], [activeId])

  return (
    <main className="h-screen overflow-hidden bg-[#F5F3EE] font-[Tajawal,ui-sans-serif,system-ui] text-[#3C382F]" dir="ltr">
      <div className="flex h-full overflow-hidden">
        <aside className="hidden w-[76px] flex-none flex-col items-center bg-[#2F2A23] py-4 text-[#EDE9E0] shadow-[10px_0_30px_rgba(40,36,30,0.16)] lg:flex">
          <button className="grid h-11 w-11 place-items-center rounded-[16px] bg-[#EDE9E0] text-[22px] font-bold text-[#2F2A23]" onClick={() => setActiveId("overview")} type="button">H</button>
          <nav className="mt-7 flex flex-1 flex-col items-center gap-2" aria-label="Hanooot modules">
            {modules.map((module) => <RailIcon active={activeId === module.id} key={module.id} module={module} onClick={() => setActiveId(module.id)} />)}
          </nav>
          <div className="grid gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-[16px] bg-white/10 text-[13px] font-semibold text-[#CFC9B8]" type="button">!<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#A8453F] px-1 text-[10px] text-white">4</span></button>
            <button className="grid h-10 w-10 place-items-center rounded-[16px] bg-white/10 text-[13px] font-semibold text-[#CFC9B8]" onClick={() => setBugOpen(true)} type="button">🐞</button>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-[#EDE9E0] text-[12px] font-semibold text-[#2F2A23]" onClick={() => setRolesOpen((value) => !value)} type="button">SA</button>
          </div>
        </aside>

        <ModuleView page={activePage} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[#E4E0D6] bg-[#2F2A23] p-2 lg:hidden">
        {modules.map((module) => <button className={`flex-1 rounded-[14px] px-2 py-2 text-[11px] font-semibold ${activeId === module.id ? "bg-[#EDE9E0] text-[#2F2A23]" : "text-[#CFC9B8]"}`} key={module.id} onClick={() => setActiveId(module.id)} type="button">{module.short}</button>)}
      </div>

      {rolesOpen ? (
        <div className="fixed bottom-[18px] left-[82px] z-50 w-[262px] overflow-hidden rounded-[18px] border border-[#E4E0D6] bg-white shadow-[0_12px_34px_rgba(40,36,30,0.22)]">
          <div className="border-b border-[#E4E0D6] px-[14px] py-[11px] text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">SIGNED IN AS</div>
          <div className="flex items-center gap-[11px] border-b border-[#E4E0D6] px-[14px] py-3">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#EFEDE6] text-[12.5px] font-semibold text-[#3C382F]">SA</span>
            <div className="min-w-0 flex-1"><p className="text-[13.5px] font-semibold">Salim</p><p className="text-[11.5px] text-[#78736A]">Founder / CEO</p><p className="truncate text-[11.5px] text-[#78736A]">salim@admin.com</p></div>
          </div>
          <button className="w-full px-[14px] py-[11px] text-start text-[13px] font-semibold text-[#A2402F] hover:bg-[#FBFAF7]" type="button">Sign out</button>
        </div>
      ) : null}

      {bugOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4 backdrop-blur-sm" role="presentation">
          <section aria-modal="true" className="w-full max-w-[560px] rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_12px_34px_rgba(40,36,30,0.22)]" role="dialog">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">REPORT A BUG</p><h2 className="mt-1 text-[20px] font-semibold text-[#3C382F]">What went wrong?</h2></div><button className="rounded-full bg-[#EFEDE6] px-3 py-1 text-[16px]" onClick={() => setBugOpen(false)} type="button">×</button></div>
            <div className="mt-4 grid gap-3"><textarea className="min-h-28 rounded-[18px] border border-[#E4E0D6] bg-[#FBFAF7] p-3 text-[13px] outline-none focus:ring-4 focus:ring-[#E7EEFB]" placeholder="Describe what went wrong" /><textarea className="min-h-20 rounded-[18px] border border-[#E4E0D6] bg-[#FBFAF7] p-3 text-[13px] outline-none focus:ring-4 focus:ring-[#E7EEFB]" placeholder="What did you expect instead?" /></div>
            <div className="mt-4 flex justify-end gap-2"><button className="rounded-full bg-[#EFEDE6] px-4 py-2 text-[13px] font-semibold" onClick={() => setBugOpen(false)} type="button">Reset demo</button><button className="rounded-full bg-[#3C382F] px-4 py-2 text-[13px] font-semibold text-white" onClick={() => setBugOpen(false)} type="button">Send</button></div>
          </section>
        </div>
      ) : null}
    </main>
  )
}

export default HanoootWorkspace
