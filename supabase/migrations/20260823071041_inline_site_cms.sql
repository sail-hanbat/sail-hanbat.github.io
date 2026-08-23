create table if not exists public.site_pages (
  page_key text primary key,
  content jsonb not null default '{}'::jsonb,
  version bigint not null default 1 check (version > 0),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null,
  constraint site_pages_content_is_object check (jsonb_typeof(content) = 'object')
);

comment on table public.site_pages is
  'Editable public website content. The application accesses this table through a replaceable repository adapter.';

alter table public.site_pages enable row level security;

revoke all on table public.site_pages from anon, authenticated;
grant select on table public.site_pages to anon;
grant select, insert, update on table public.site_pages to authenticated;

create policy "site content is public"
on public.site_pages
for select
to anon, authenticated
using (true);

create policy "admins can create site content"
on public.site_pages
for insert
to authenticated
with check (private.is_site_admin());

create policy "admins can update site content"
on public.site_pages
for update
to authenticated
using (private.is_site_admin())
with check (private.is_site_admin());

create or replace function public.set_site_page_audit_fields()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.version := old.version + 1;
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

revoke all on function public.set_site_page_audit_fields() from public;

drop trigger if exists set_site_page_audit_fields on public.site_pages;
create trigger set_site_page_audit_fields
before update on public.site_pages
for each row
execute function public.set_site_page_audit_fields();

do $$
begin
  alter publication supabase_realtime add table public.site_pages;
exception
  when duplicate_object then null;
end;
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "site media is public"
on storage.objects
for select
to public
using (bucket_id = 'site-media');

create policy "admins can upload site media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-media' and private.is_site_admin());

create policy "admins can update site media"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-media' and private.is_site_admin())
with check (bucket_id = 'site-media' and private.is_site_admin());

create policy "admins can delete site media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-media' and private.is_site_admin());
