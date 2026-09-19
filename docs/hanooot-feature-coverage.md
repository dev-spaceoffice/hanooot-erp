# Hanooot ERP feature coverage matrix

| Area | Implemented in this pass | Backend contract | Mocked integration boundary |
| --- | --- | --- | --- |
| Overview + activity | Metrics, branch pulse, attention queue, activity feed, alerts/report-bug surface | `activity_events`, `notifications`, `bug_reports` | No external calls |
| Settings/auth/roles | Organisation cards, active departments, people directory, authority matrix, currency/tax/rates, notification actions | `organisations`, `profiles`, `departments`, `department_permissions`, `role_assignments` | Identity/provider calls disabled |
| Importing/trade | Leads, campaigns, call attempts, pipeline/deals, sourcing, orders, products, contacts, shipments, quote actions | `campaigns`, `lead_forms`, `leads`, `lead_calls`, `deals`, `sourcing_requests`, `orders`, `shipments`, `products`, `contacts`, `quotes` | Facebook/Zoho/WhatsApp/PDF represented by `integration_connections`, `sync_runs`, `outbound_actions` |
| Messages | Groups, people search, threads, replies, mentions, record history | `groups`, `message_threads`, `messages`, `comments`, `mentions` | WhatsApp send disabled until approval |
| Drive | Upload UI, storage table, linked files, module documents | `drive_files`, `document_links`, Storage buckets | Local seeded file rows until storage keys exist |
| HR | Headcount, employee table, leave approve/decline, August 2026 payroll, employee docs, salary/contact panels | `employees`, `leave_requests`, `payroll_runs`, `payroll_items`, `employee_documents` | Payroll export queued only |
| Legal | Client services, billable month, pipeline, needs-attention table, enquiries, retainers, legal documents | `legal_enquiries`, `legal_matters`, `retainers`, `legal_documents` | Document generation queued only |

## Verification checklist

- Desktop: fixed 76px rail, 64px header, card grid, tables, kanban boards.
- Tablet/mobile: horizontal module tabs, responsive metric grids, scrollable tables.
- RTL/Arabic: `html` is configured for `dir="rtl"`, logical spacing classes are used, and Tajawal is loaded.
- Accessibility: buttons have labels, modal uses `role="dialog"`, focus states remain visible, tables include header scopes.
- Backend: migration creates all accepted entities and enables RLS on application tables.
