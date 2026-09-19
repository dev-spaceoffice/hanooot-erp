import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const requiredFiles = [
  "src/sections/hanooot/HanoootWorkspace.tsx",
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
