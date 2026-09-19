# Supabase foundation

This branch includes the production-ready Supabase foundation required for the Hanooot ERP prototype review.

## Files

- `migrations/20260919201500_hanooot_core.sql` — application schema, Storage buckets, RLS enablement, and authenticated demo policies.
- `seed/seed.sql` — local demo records for organisation, users, departments, importing flow, activity, mocked integrations, and outbound actions.

## Coverage

The schema covers the accepted baseline entities:

- Auth/platform: `profiles`, `organisations`, `departments`, `department_permissions`, `role_assignments`
- System: `activity_events`, `notifications`, `bug_reports`
- Collaboration: `messages`, `message_threads`, `comments`, `mentions`, `groups`
- Documents: `drive_files`, `document_links`, Storage buckets
- Importing: `campaigns`, `lead_forms`, `leads`, `lead_calls`, `deals`, `sourcing_requests`, `sourcing_items`, `orders`, `shipments`, `products`, `contacts`, `quotes`
- HR: `employees`, `leave_requests`, `payroll_runs`, `payroll_items`, `employee_documents`
- Legal: `legal_enquiries`, `legal_matters`, `retainers`, `legal_documents`
- Integration stubs: `integration_connections`, `sync_runs`, `outbound_actions`

## Local use

```bash
supabase start
supabase db reset
```

Live Facebook, Zoho Books, WhatsApp, bank/payroll, and PDF provider calls are intentionally disabled for v1. Their UI actions write to `integration_connections`, `sync_runs`, or `outbound_actions` until the user approves live integration wiring.
