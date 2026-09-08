-- TOCFL A1: per-user learning progress table.
-- Run this file once in Supabase Dashboard -> SQL Editor.
--
-- SECURITY:
-- Each authenticated user can only read/write the row whose user_id matches
-- auth.uid(). The browser should use ONLY the public/publishable key.

create table if not exists public.user_learning_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  favorites jsonb not null default '[]'::jsonb,
  last_day smallint not null default 1 check (last_day between 1 and 26),
  ui_language text not null default 'vi' check (ui_language in ('vi', 'en', 'zh-Hant')),
  updated_at timestamptz not null default now()
);

alter table public.user_learning_state enable row level security;

-- Be explicit about exposed-schema grants.
revoke all on table public.user_learning_state from anon, authenticated;
grant select, insert, update, delete on table public.user_learning_state to authenticated;

-- Re-running this file is safe.
drop policy if exists "Users can read their own learning state" on public.user_learning_state;
drop policy if exists "Users can create their own learning state" on public.user_learning_state;
drop policy if exists "Users can update their own learning state" on public.user_learning_state;
drop policy if exists "Users can delete their own learning state" on public.user_learning_state;

create policy "Users can read their own learning state"
on public.user_learning_state
for select
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users can create their own learning state"
on public.user_learning_state
for insert
to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users can update their own learning state"
on public.user_learning_state
for update
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users can delete their own learning state"
on public.user_learning_state
for delete
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
