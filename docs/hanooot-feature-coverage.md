# Hanooot ERP feature coverage

## Current implementation

The Hanooot ERP frontend is implemented as real Next.js App Router pages under `src/app/`. The previous `HanoootWorkspace.tsx` file and the renamed `HanoootPage.tsx` component are deleted. Each `src/app/.../page.tsx` now owns its own Hanooot composition data and JSX. Only small shared primitives such as shell, badges, cards, board columns, and tables live under `src/app/_hanooot/`, so there is no central Hanooot screen renderer and no direct storage/rendering of the attached standalone HTML file.

The attached HTML was decoded outside the repository and used as the visual/data reference. It exposed the shell, root overview surface, and module bundles for Importing, Settings, Messages, Drive, HR, and Legal; those labels, flows, colors, tables, cards, and controls are represented in typed route data and native JSX.

## App routes

- `/` and `/overview`
- `/overview/activity`, `/overview/alerts`, `/overview/bug-report`, `/overview/branches`
- `/importing`, `/importing/leads`, `/importing/campaigns`, `/importing/calls`, `/importing/pipeline`, `/importing/sourcing`, `/importing/orders`, `/importing/products`, `/importing/contacts`, `/importing/shipments`, `/importing/quotes`, `/importing/settings`
- `/settings`, `/settings/organisation`, `/settings/users`, `/settings/roles`, `/settings/permissions`, `/settings/authority-matrix`, `/settings/finance`, `/settings/exchange-rates`, `/settings/notifications`
- `/messages`, `/messages/groups`, `/messages/people`, `/messages/threads`, `/messages/mentions`, `/messages/record-history`
- `/drive`, `/drive/upload`, `/drive/files`, `/drive/linked-documents`, `/drive/legal-documents`, `/drive/hr-documents`, `/drive/importing-documents`
- `/hr`, `/hr/people`, `/hr/leave`, `/hr/payroll`, `/hr/documents`, `/hr/contact`, `/hr/salary`
- `/legal`, `/legal/client-services`, `/legal/pipeline`, `/legal/needs-attention`, `/legal/enquiries`, `/legal/retainers`, `/legal/documents`

## Native UI coverage

- Warm Hanooot palette, 76px dark rail, top module header, role/profile surface, mobile bottom navigation, responsive cards/tables/kanban boards.
- Overview activity feed, alerts, report-bug fields, department shortcuts, and branch table.
- Importing lead intake, campaign/source filters, call attempts, pipeline/deal actions, sourcing CN workflow, supplier/customer photos, RMB/USD pricing, order/shipment/quote/product/contact/outbound actions.
- Settings organisation, users, access grants, authority matrix, finance/tax/currency/exchange-rate, notification rule surfaces.
- Messages groups, people search, threads, replies, mentions, activity handoff, and record-history panel.
- Drive upload/add-file fields, storage table, linked document areas, and module-specific document links.
- HR people/headcount, leave approval, August 2026 payroll, employee documents, contact, annual leave, and salary panels.
- Legal client-services dashboard, pipeline, needs-attention table, enquiries, retainers, legal documents, and owner-review surfaces.

## Validation

`npm test` verifies the native route set, rejects the old standalone HTML asset, rejects `HanoootWorkspace.tsx`, `HanoootPage.tsx`, and a shared `HanoootScreen.tsx` renderer, rejects wrapper-only routes, rejects iframe/checklist approaches, checks concrete rendered-screen markers, and confirms Supabase schema coverage. `npm run lint` and `npm run build` are required before review handoff.
