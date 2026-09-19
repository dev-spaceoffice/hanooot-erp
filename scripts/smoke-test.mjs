import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const requiredFiles = [
  "src/app/_hanooot/HanoootScreen.tsx",
  "src/app/_hanooot/hanooot-data.ts",
  "src/data/hanooot.ts",
  "src/types/hanooot.ts",
  "supabase/migrations/20260919201500_hanooot_core.sql",
  "supabase/seed/seed.sql",
  "docs/hanooot-feature-coverage.md",
]

const requiredTables = [
  "profiles",
  "organisations",
  "departments",
  "department_permissions",
  "role_assignments",
  "activity_events",
  "notifications",
  "bug_reports",
  "messages",
  "message_threads",
  "comments",
  "mentions",
  "groups",
  "drive_files",
  "document_links",
  "campaigns",
  "lead_forms",
  "leads",
  "lead_calls",
  "deals",
  "sourcing_requests",
  "sourcing_items",
  "orders",
  "shipments",
  "products",
  "contacts",
  "quotes",
  "employees",
  "leave_requests",
  "payroll_runs",
  "payroll_items",
  "employee_documents",
  "legal_enquiries",
  "legal_matters",
  "retainers",
  "legal_documents",
  "integration_connections",
  "sync_runs",
  "outbound_actions",
]

const requiredModules = ["overview", "settings", "importing", "messages", "drive", "hr", "legal"]


const renamedPagePath = path.join(root, "src/components/hanooot/HanoootPage.tsx")
if (fs.existsSync(renamedPagePath)) {
  throw new Error("Do not keep a renamed HanoootPage component; implement Hanooot route code under src/app")
}

const removedWorkspacePath = path.join(root, "src/sections/hanooot/HanoootWorkspace.tsx")
if (fs.existsSync(removedWorkspacePath)) {
  throw new Error("HanoootWorkspace.tsx must be deleted; use app-folder route code and shared primitives")
}
const appSources = fs.readdirSync(path.join(root, "src/app"), { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
for (const entry of appSources) {
  const file = path.join(entry.parentPath, entry.name)
  const source = fs.readFileSync(file, "utf8")
  if (source.includes("HanoootWorkspace")) {
    throw new Error(`App route still imports/uses deleted HanoootWorkspace: ${path.relative(root, file)}`)
  }
  if (source.includes("HanoootPage")) {
    throw new Error(`App route still imports/uses renamed HanoootPage: ${path.relative(root, file)}`)
  }
}

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missingFiles.length > 0) {
  throw new Error(`Missing required files: ${missingFiles.join(", ")}`)
}

const migration = fs.readFileSync(path.join(root, "supabase/migrations/20260919201500_hanooot_core.sql"), "utf8")
const missingTables = requiredTables.filter((table) => !migration.includes(`public.${table}`))
if (missingTables.length > 0) {
  throw new Error(`Migration missing tables: ${missingTables.join(", ")}`)
}

if (!migration.includes("enable row level security")) {
  throw new Error("Migration does not enable row-level security")
}

for (const table of requiredTables) {
  if (!migration.includes(`'${table}'`)) {
    throw new Error(`RLS loop missing table: ${table}`)
  }
}

const workspace = fs.readFileSync(path.join(root, "src/app/_hanooot/HanoootScreen.tsx"), "utf8") + "\n" + fs.readFileSync(path.join(root, "src/app/_hanooot/hanooot-data.ts"), "utf8")
for (const text of ["Overview", "Importing", "Settings", "Messages", "Drive", "HR", "Legal", "SIGNED IN AS", "REPORT A BUG"]) {
  if (!workspace.includes(text)) {
    throw new Error(`Native workspace missing UI text: ${text}`)
  }
}
if (fs.readFileSync(path.join(root, "src/app/page.tsx"), "utf8").includes("ExactPrototypeFrame")) {
  throw new Error("Primary route still uses the iframe prototype shortcut")
}

const forbiddenChecklist = ["PrototypeSurfaceMatrix", "Prototype-native detail coverage", "Full attached-HTML surfaces"]
for (const text of forbiddenChecklist) {
  if (workspace.includes(text)) {
    throw new Error(`Checklist/matrix implementation still present: ${text}`)
  }
}

const requiredRenderedScreens = [
  'data-native-screen={`${activeModule.id}-native-screen`}',
  "Reference details implemented in code",
  "Importing Service",
  "Amman — Head office",
  "Aqaba — Port office",
  "Dubai — Trade desk",
  "Mustafa Waiz",
  "Mohammed Alwaidh",
  "Qadri Auto Parts",
  "Mansour Group",
  "Shenzhen Yuhua",
  "AUGUST 2026 RUN",
  "Target picker",
  "Severity",
  "New deal modal",
  "Drop-to-won creates order",
  "Customer CN search",
  "Generate quote PDF",
  "Facebook audience CSV",
  "WhatsApp bulk action",
  "Authority matrix",
  "Sales tax rate",
  "People search",
  "Record history panel",
  "Add-file modal",
  "August 2026 payroll",
  "Approve / Decline",
  "Legal document generator",
]
for (const text of requiredRenderedScreens) {
  if (!workspace.includes(text)) {
    throw new Error(`Native rendered screen missing structure/content: ${text}`)
  }
}

const forbiddenFiles = ["public/hanooot-standalone.html"]
for (const file of forbiddenFiles) {
  if (fs.existsSync(path.join(root, file))) {
    throw new Error(`Reference HTML must not be stored in the repo: ${file}`)
  }
}

const requiredAppRoutes = [
  "src/app/overview/page.tsx",
  "src/app/importing/leads/page.tsx",
  "src/app/importing/pipeline/page.tsx",
  "src/app/importing/sourcing/page.tsx",
  "src/app/importing/orders/page.tsx",
  "src/app/settings/authority-matrix/page.tsx",
  "src/app/settings/finance/page.tsx",
  "src/app/messages/threads/page.tsx",
  "src/app/drive/upload/page.tsx",
  "src/app/hr/payroll/page.tsx",
  "src/app/legal/needs-attention/page.tsx",
]
for (const file of requiredAppRoutes) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing real Next.js app route: ${file}`)
  }
}


const workspaceSource = fs.readFileSync(path.join(root, "src/app/_hanooot/HanoootScreen.tsx"), "utf8") + "\n" + fs.readFileSync(path.join(root, "src/app/_hanooot/hanooot-data.ts"), "utf8")
if (workspaceSource.includes("hanooot-standalone")) {
  throw new Error("Native app source must not reference the standalone HTML asset")
}

const data = fs.readFileSync(path.join(root, "src/data/hanooot.ts"), "utf8")
const missingModules = requiredModules.filter((moduleId) => !data.includes(`id: "${moduleId}"`))
if (missingModules.length > 0) {
  throw new Error(`Missing module fixtures: ${missingModules.join(", ")}`)
}

for (const integration of ["Facebook", "Zoho", "WhatsApp", "Quote PDF"]) {
  if (!data.includes(integration)) {
    throw new Error(`Missing mocked integration surface: ${integration}`)
  }
}

console.log("Hanooot smoke coverage passed")
