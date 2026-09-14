-- READ-ONLY REPORT: run manually in Supabase Dashboard -> SQL Editor.
-- It does not create tables/views and does not change RLS.
-- Shows one summary row per account that has user_learning_state data.

with base as (
  select
    s.user_id,
    u.email,
    s.updated_at,
    coalesce(s.progress -> 'radicals', '{}'::jsonb) as radicals
  from public.user_learning_state s
  left join auth.users u on u.id = s.user_id
),
learned as (
  select
    b.user_id,
    coalesce(sum(jsonb_array_length(coalesce(x.value -> 'done', '[]'::jsonb))), 0)::int as learned_items,
    count(*) filter (
      where jsonb_array_length(coalesce(x.value -> 'done', '[]'::jsonb)) > 0
    )::int as radicals_started
  from base b
  left join lateral jsonb_each(coalesce(b.radicals -> 'learning', '{}'::jsonb)) x on true
  group by b.user_id
),
written as (
  select
    b.user_id,
    count(distinct (r.key || ':' || c.key)) filter (
      where coalesce(nullif(c.value #>> '{}', '')::int, 0) > 0
    )::int as unique_written_characters,
    coalesce(sum(coalesce(nullif(c.value #>> '{}', '')::int, 0)), 0)::int as successful_writing_completions
  from base b
  left join lateral jsonb_each(coalesce(b.radicals -> 'writing', '{}'::jsonb)) r on true
  left join lateral jsonb_each(coalesce(r.value, '{}'::jsonb)) c on true
  group by b.user_id
)
select
  b.user_id,
  b.email,
  nullif(b.radicals ->> 'selectedRadicalKey', '') as current_radical,
  coalesce(l.radicals_started, 0) as radicals_started,
  coalesce(l.learned_items, 0) as learned_items,
  coalesce(w.unique_written_characters, 0) as unique_written_characters,
  coalesce(w.successful_writing_completions, 0) as successful_writing_completions,
  b.updated_at as last_cloud_sync
from base b
left join learned l using (user_id)
left join written w using (user_id)
order by b.updated_at desc;
