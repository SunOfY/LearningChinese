-- Guest Groq trial quota for LearningChinese.
-- Run once in Supabase Dashboard -> SQL Editor.
-- Guest IDs are generated in the browser, SHA-256 hashed in the Edge Function,
-- and only the hash + usage count are stored here.

create table if not exists public.guest_groq_usage (
  guest_hash text primary key,
  used_count integer not null default 0 check (used_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.guest_groq_usage enable row level security;

-- Browser clients must never read or edit quota rows directly.
revoke all on table public.guest_groq_usage from anon, authenticated;
grant select, insert, update on table public.guest_groq_usage to service_role;

-- Atomically reserve one guest request. Returns allowed=false when the limit is reached.
create or replace function public.consume_guest_groq_trial(
  p_guest_hash text,
  p_limit integer default 20
)
returns table(allowed boolean, used_count integer, remaining integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
  v_limit integer := greatest(1, least(coalesce(p_limit, 20), 1000));
begin
  if p_guest_hash is null or length(p_guest_hash) < 16 then
    raise exception 'Invalid guest hash';
  end if;

  insert into public.guest_groq_usage (guest_hash, used_count, created_at, updated_at)
  values (p_guest_hash, 1, now(), now())
  on conflict (guest_hash) do update
    set used_count = public.guest_groq_usage.used_count + 1,
        updated_at = now()
    where public.guest_groq_usage.used_count < v_limit
  returning public.guest_groq_usage.used_count into v_count;

  if v_count is null then
    select g.used_count into v_count
    from public.guest_groq_usage g
    where g.guest_hash = p_guest_hash;

    return query select false, coalesce(v_count, v_limit), 0;
    return;
  end if;

  return query select true, v_count, greatest(v_limit - v_count, 0);
end;
$$;

-- If Groq itself fails after a request was reserved, return that trial attempt.
create or replace function public.refund_guest_groq_trial(p_guest_hash text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.guest_groq_usage
  set used_count = greatest(used_count - 1, 0),
      updated_at = now()
  where guest_hash = p_guest_hash;
end;
$$;

revoke all on function public.consume_guest_groq_trial(text, integer) from public, anon, authenticated;
revoke all on function public.refund_guest_groq_trial(text) from public, anon, authenticated;
grant execute on function public.consume_guest_groq_trial(text, integer) to service_role;
grant execute on function public.refund_guest_groq_trial(text) to service_role;
