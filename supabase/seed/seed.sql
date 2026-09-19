-- Demo seed data for Hanooot ERP local review.
with org as (
  insert into public.organisations (name, base_currency, sales_tax_rate)
  values ('The Spice', 'SAR', 15.00)
  returning id
), users as (
  insert into public.profiles (organisation_id, full_name, email, phone, role, is_super_admin)
  select id, 'Salim', 'salim@admin.com', '+966500000001', 'Founder / CEO', true from org
  union all
  select id, 'Abeer', 'abeer@hanooot.test', '+966500000002', 'Importing Manager', false from org
  union all
  select id, 'Mariam', 'mariam@hanooot.test', '+971500000003', 'Legal Lead', false from org
  returning id, organisation_id, full_name
), deps as (
  insert into public.departments (organisation_id, name, slug)
  select id, 'Overview', 'overview' from org union all
  select id, 'Settings', 'settings' from org union all
  select id, 'Importing', 'importing' from org union all
  select id, 'Messages', 'messages' from org union all
  select id, 'Drive', 'drive' from org union all
  select id, 'HR', 'hr' from org union all
  select id, 'Legal', 'legal' from org
  returning id, organisation_id, slug
), perms as (
  insert into public.department_permissions (department_id, permission_key, locked, description)
  select id, slug || '.read', false, 'Read module data' from deps union all
  select id, slug || '.write', slug in ('settings'), 'Write module data with role gate' from deps
), campaigns as (
  insert into public.campaigns (organisation_id, name, source, status)
  select id, 'Ramadan imports', 'facebook', 'mock_active' from org returning id, organisation_id
), leads as (
  insert into public.leads (campaign_id, customer_name, source, status)
  select id, 'Noura Trading', 'facebook', 'new' from campaigns returning id
), deals as (
  insert into public.deals (lead_id, title, stage, value_amount, currency)
  select id, 'Bulk spice sourcing', 'sourcing', 21700, 'USD' from leads returning id
), orders as (
  insert into public.orders (deal_id, order_number, stage)
  select id, 'PO-388', 'quote_review' from deals returning id
), files as (
  insert into public.drive_files (organisation_id, bucket, path, name, size_bytes)
  select id, 'hanooot-quotes', 'quotes/po-388.pdf', 'quote-po-388.pdf', 420000 from org returning id, organisation_id
)
insert into public.activity_events (organisation_id, department_slug, actor_name, title, metadata)
select id, 'importing', 'Mock sync', 'Facebook lead synced into New lead column', '{"source":"facebook"}'::jsonb from org;

insert into public.integration_connections (organisation_id, provider, status, settings)
select id, 'facebook_lead_ads', 'mocked_disabled', '{"surface":"sync now button visible"}'::jsonb from public.organisations where name='The Spice'
on conflict (organisation_id, provider) do nothing;

insert into public.outbound_actions (organisation_id, provider, action_type, payload, status)
select id, 'whatsapp', 'bulk_message', '{"audience":"facebook_export","enabled":false}'::jsonb, 'mock_queued' from public.organisations where name='The Spice';
