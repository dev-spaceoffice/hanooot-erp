-- Hanooot ERP core schema, RLS, storage buckets, and integration-stub foundation.
-- Forward-only migration for the approved v1 local-review build.

create extension if not exists "pgcrypto";

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  base_currency text not null default 'SAR',
  sales_tax_rate numeric(5,2) not null default 15.00,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  organisation_id uuid references public.organisations(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  role text not null default 'member',
  is_super_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  slug text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (organisation_id, slug)
);

create table if not exists public.department_permissions (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references public.departments(id) on delete cascade,
  permission_key text not null,
  locked boolean not null default false,
  description text not null default '',
  unique (department_id, permission_key)
);

create table if not exists public.role_assignments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  department_id uuid references public.departments(id) on delete cascade,
  role text not null,
  access_level text not null check (access_level in ('read', 'write', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  department_slug text not null,
  actor_name text not null,
  title text not null,
  metadata jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  title text not null,
  severity text not null default 'info',
  target_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  target text not null,
  severity text not null default 'medium',
  what_went_wrong text not null,
  expected_instead text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  department_slug text,
  created_at timestamptz not null default now()
);

create table if not exists public.message_threads (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  group_id uuid references public.groups(id) on delete set null,
  subject text not null,
  linked_record_type text,
  linked_record_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  author_profile_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  record_type text not null,
  record_id uuid not null,
  author_profile_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.mentions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid references public.messages(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  mentioned_profile_id uuid references public.profiles(id) on delete cascade,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.drive_files (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  bucket text not null,
  path text not null,
  name text not null,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  size_bytes bigint not null default 0,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

create table if not exists public.document_links (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references public.drive_files(id) on delete cascade,
  record_type text not null,
  record_id uuid not null,
  created_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  source text not null default 'facebook',
  status text not null default 'mock_active',
  created_at timestamptz not null default now()
);

create table if not exists public.lead_forms (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  name text not null,
  questions jsonb not null default '[]'::jsonb
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id) on delete set null,
  customer_name text not null,
  source text not null default 'facebook',
  status text not null default 'new',
  assignee_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_calls (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  attempt_number integer not null,
  outcome text not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  title text not null,
  stage text not null default 'new',
  value_amount numeric(12,2) not null default 0,
  currency text not null default 'USD',
  owner_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.sourcing_requests (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references public.deals(id) on delete cascade,
  customer_cn text not null,
  status text not null default 'open',
  qr_reference text,
  created_at timestamptz not null default now()
);

create table if not exists public.sourcing_items (
  id uuid primary key default gen_random_uuid(),
  sourcing_request_id uuid not null references public.sourcing_requests(id) on delete cascade,
  product_name text not null,
  supplier_name text not null,
  price_rmb numeric(12,2) not null default 0,
  price_usd numeric(12,2) not null default 0,
  media jsonb not null default '[]'::jsonb
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references public.deals(id) on delete set null,
  order_number text not null unique,
  stage text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  route text not null,
  status text not null,
  eta date
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  sku text not null,
  media jsonb not null default '[]'::jsonb,
  unique (organisation_id, sku)
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  phone text,
  type text not null default 'customer',
  export_tags text[] not null default '{}'
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null default 'draft',
  total_amount numeric(12,2) not null default 0,
  currency text not null default 'USD',
  pdf_file_id uuid references public.drive_files(id) on delete set null
);

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  full_name text not null,
  role_title text not null,
  annual_leave_balance numeric(5,2) not null default 0,
  salary_amount numeric(12,2) not null default 0
);

create table if not exists public.leave_requests (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  status text not null default 'pending'
);

create table if not exists public.payroll_runs (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  period_label text not null,
  status text not null default 'draft'
);

create table if not exists public.payroll_items (
  id uuid primary key default gen_random_uuid(),
  payroll_run_id uuid not null references public.payroll_runs(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  gross_amount numeric(12,2) not null,
  net_amount numeric(12,2) not null
);

create table if not exists public.employee_documents (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  file_id uuid references public.drive_files(id) on delete set null,
  document_type text not null
);

create table if not exists public.legal_enquiries (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  client_name text not null,
  service text not null,
  status text not null default 'new'
);

create table if not exists public.legal_matters (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid references public.legal_enquiries(id) on delete set null,
  title text not null,
  service text not null,
  status text not null default 'open',
  needs_attention boolean not null default false
);

create table if not exists public.retainers (
  id uuid primary key default gen_random_uuid(),
  legal_matter_id uuid references public.legal_matters(id) on delete cascade,
  monthly_amount numeric(12,2) not null default 0,
  currency text not null default 'SAR',
  renewal_date date
);

create table if not exists public.legal_documents (
  id uuid primary key default gen_random_uuid(),
  legal_matter_id uuid references public.legal_matters(id) on delete cascade,
  file_id uuid references public.drive_files(id) on delete set null,
  document_type text not null
);

create table if not exists public.integration_connections (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  provider text not null,
  status text not null default 'mocked_disabled',
  credentials_ref text,
  settings jsonb not null default '{}'::jsonb,
  unique (organisation_id, provider)
);

create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  integration_connection_id uuid not null references public.integration_connections(id) on delete cascade,
  status text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  summary jsonb not null default '{}'::jsonb
);

create table if not exists public.outbound_actions (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  provider text not null,
  action_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'mock_queued',
  created_at timestamptz not null default now()
);

-- Storage-ready buckets for future Supabase Storage usage.
insert into storage.buckets (id, name, public)
values ('hanooot-shipments', 'hanooot-shipments', false),
       ('hanooot-quotes', 'hanooot-quotes', false),
       ('hanooot-hr', 'hanooot-hr', false),
       ('hanooot-legal', 'hanooot-legal', false)
on conflict (id) do nothing;

-- Enable row-level security on every application table.
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'organisations','profiles','departments','department_permissions','role_assignments','activity_events','notifications','bug_reports',
    'groups','message_threads','messages','comments','mentions','drive_files','document_links','campaigns','lead_forms','leads','lead_calls',
    'deals','sourcing_requests','sourcing_items','orders','shipments','products','contacts','quotes','employees','leave_requests','payroll_runs',
    'payroll_items','employee_documents','legal_enquiries','legal_matters','retainers','legal_documents','integration_connections','sync_runs','outbound_actions'
  ] loop
    execute format('alter table public.%I enable row level security', tbl);
  end loop;
end $$;

-- Demo-friendly authenticated policies. Production tightening can split these by department_permissions.
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'organisations','profiles','departments','department_permissions','role_assignments','activity_events','notifications','bug_reports',
    'groups','message_threads','messages','comments','mentions','drive_files','document_links','campaigns','lead_forms','leads','lead_calls',
    'deals','sourcing_requests','sourcing_items','orders','shipments','products','contacts','quotes','employees','leave_requests','payroll_runs',
    'payroll_items','employee_documents','legal_enquiries','legal_matters','retainers','legal_documents','integration_connections','sync_runs','outbound_actions'
  ] loop
    execute format('drop policy if exists "%s authenticated read" on public.%I', tbl, tbl);
    execute format('create policy "%s authenticated read" on public.%I for select to authenticated using (true)', tbl, tbl);
    execute format('drop policy if exists "%s authenticated write" on public.%I', tbl, tbl);
    execute format('create policy "%s authenticated write" on public.%I for all to authenticated using (true) with check (true)', tbl, tbl);
  end loop;
end $$;
