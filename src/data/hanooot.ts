export type ModuleKey = "overview" | "settings" | "importing" | "messages" | "drive" | "hr" | "legal"

export const departmentTones = {
  legal: { bg: "#E7EEFB", fg: "#1D4ED8" },
  hr: { bg: "#E6F2EA", fg: "#2F8F63" },
  importing: { bg: "#FBF4E4", fg: "#A16317" },
  drive: { bg: "#EFECE4", fg: "#4D463B" },
  settings: { bg: "#E9E2D4", fg: "#3C382F" },
}

export const navItems: Array<{ key: ModuleKey; short: string; label: string }> = [
  { key: "overview", short: "OV", label: "Overview" },
  { key: "settings", short: "SE", label: "Settings" },
  { key: "importing", short: "IM", label: "Importing" },
  { key: "messages", short: "MS", label: "Messages" },
  { key: "drive", short: "DR", label: "Drive" },
  { key: "hr", short: "HR", label: "HR" },
  { key: "legal", short: "LG", label: "Legal" },
]

export const metrics = [
  { label: "REVENUE MTD", value: "$184.2k", detail: "+12% vs last month", tone: "importing" },
  { label: "OPEN WORK ITEMS", value: "42", detail: "18 tagged to you", tone: "settings" },
  { label: "SHIPMENTS IN TRANSIT", value: "16", detail: "4 need documents", tone: "importing" },
  { label: "HEADCOUNT", value: "38", detail: "3 leave requests", tone: "hr" },
]

export const activity = [
  { dept: "Importing", text: "Facebook sync created 12 new leads from Autumn Campaign.", time: "12 min ago" },
  { dept: "Settings", text: "Amani updated USD ↔ RMB exchange rate for sourcing quotes.", time: "24 min ago" },
  { dept: "HR", text: "Mina requested annual leave; approval required.", time: "41 min ago" },
  { dept: "Legal", text: "New enquiry tagged as retainers / client services.", time: "1 hr ago" },
]

export const importingColumns = [
  { title: "Leads", items: ["CN-204 · WhatsApp follow-up", "CN-216 · Ad form: furniture", "CN-221 · Needs sourcing"] },
  { title: "Pipeline", items: ["Office fit-out · Quote items", "Retail buyer · Awaiting samples"] },
  { title: "Orders", items: ["ORD-881 · WeChat QR ready", "ORD-884 · Shipment in transit"] },
]

export const moduleCards = {
  settings: ["Organisation", "Active departments", "Authority matrix", "Base currency & tax", "Exchange rates", "Notification rules"],
  messages: ["New group", "People search", "Thread", "Reply", "Activity mentions", "Record history"],
  drive: ["Upload", "Storage", "Linked to", "Owner", "Size", "Document links"],
  hr: ["People", "Leave requests", "Payroll run", "Employee documents", "Contact", "Annual leave"],
  legal: ["Client services", "Pipeline by service", "Needs attention", "Enquiries", "Retainers", "Legal documents"],
}
