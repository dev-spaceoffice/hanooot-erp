# Hanooot ERP Design Inventory

## Palette and theme tokens

| Token | Light | Dark intent |
| --- | --- | --- |
| App background | `#F5F3EE` warm ivory | Deep warm charcoal |
| Ink | `#3C382F` | Warm ivory text |
| Left rail | `#2D2922` charcoal/brown | Near-black charcoal |
| Active/nav accent | `#EAD8B4` warm cream/tan | Muted bronze surface |
| Card | `#FFFDF8` warm white | Elevated charcoal card |
| Border | `#DED3BF` thin warm line | Low-contrast warm line |
| Brand accent | `#D8B982` tan/gold | Same accent |

CSS variables live in `src/app/globals.css` as `--hanooot-*` tokens with `.dark`/`[data-theme="dark"]` overrides.

## Typography

- Primary font: Tajawal via `next/font/google`.
- Root defaults to `lang="ar"` and `dir="rtl"` for Arabic-first ERP surfaces.
- Numeric KPI values use `dir="ltr"` on the number element to preserve readable amounts.

## Layout rules

- Full-height warm ivory shell.
- Fixed start-side rail: `76px` desktop width, charcoal/brown background, H brand block at top.
- Header: `64px` sticky top bar, warm background blur, content offset by rail on desktop.
- Content: `24px` desktop padding, scrollable main area, responsive mobile padding.
- Cards: warm white, `18–22px` radius, thin warm border, subtle shadow.
- RTL-ready spacing uses logical classes (`ms`, `me`, `start`, `text-start`) where direction matters.

## Initial surfaces implemented

- Login panel placeholder for Supabase Auth and role-based access.
- Overview dashboard with KPI cards, import operations table, Kanban shell, activity feed, and module inventory.
- Fixed left rail with icon/short-label navigation for Overview, Importing, Messages, Drive, HR, and Legal.
- Header actions for Activity and report-a-bug.
- Report-a-bug modal placeholder; no external bug tracker call.
- Shared primitives: Button, Card, Input, Modal, Table, Badge, KanbanShell.

## Module inventory for later slices

1. **Auth / roles / permissions** — Supabase Auth, profiles, organizations, roles, permission matrix, RLS.
2. **Settings** — currency, tax, company profile, localization, audit settings.
3. **Importing trade operations** — suppliers, purchase orders, shipments, ports, customs, cost allocation.
4. **Messages** — internal threaded messages and operational notifications.
5. **Drive** — document library with entity-linked files and access controls.
6. **HR** — employees, contracts, attendance/payroll-ready data model.
7. **Legal** — contract metadata, compliance dates, reminders, document status.
8. **Activity / alerts** — audit log, user feed, critical workflow alerts.

## Integration stance

All v1 external-integration surfaces are mocked/stubbed in the UI foundation. No live third-party APIs are called in this slice.
