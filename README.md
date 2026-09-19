# Hanooot ERP

RTL-ready Next.js ERP foundation for Hanooot.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4 theme tokens
- Redux Toolkit + React Redux app state foundation
- Supabase-ready client helpers (no live integration calls in this slice)
- Tajawal font, Arabic/RTL root defaults, light/dark token support

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

Open <http://localhost:3000> after `npm run dev`.

## Environment

Supabase variables are optional for this foundation slice. When backend work starts, provide these through local environment management, not committed files:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Current scope

This branch implements the initial visual shell and shared primitives only. Live third-party integrations, production Supabase schema, RLS policies, and real auth flows are intentionally deferred.
