-- Per-user AI rate limiting for the gemini-proxy edge function.
-- The day cap is the app's Gemini cost ceiling: worst case = users x day_limit calls.
create table public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  day_count int not null default 0,
  minute_start timestamptz not null default now(),
  minute_count int not null default 0,
  primary key (user_id, day)
);

alter table public.ai_usage enable row level security;
-- No RLS policies on purpose: only the edge function (service role, which
-- bypasses RLS) may touch this table.

-- Atomic check-and-increment. Called only with the service role: p_user_id is
-- caller-supplied, so authenticated/anon users must never be able to execute
-- this directly (they could burn another user's quota).
create or replace function public.check_and_increment_ai_usage(
  p_user_id uuid,
  p_minute_limit int,
  p_day_limit int
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  rec ai_usage%rowtype;
begin
  insert into ai_usage (user_id, day)
  values (p_user_id, current_date)
  on conflict (user_id, day) do nothing;

  select * into rec
  from ai_usage
  where user_id = p_user_id and day = current_date
  for update;

  if rec.day_count >= p_day_limit then
    return false;
  end if;

  if now() - rec.minute_start >= interval '1 minute' then
    update ai_usage
    set minute_start = now(), minute_count = 1, day_count = rec.day_count + 1
    where user_id = p_user_id and day = rec.day;
    return true;
  end if;

  if rec.minute_count >= p_minute_limit then
    return false;
  end if;

  update ai_usage
  set minute_count = rec.minute_count + 1, day_count = rec.day_count + 1
  where user_id = p_user_id and day = rec.day;
  return true;
end
$$;

revoke execute on function public.check_and_increment_ai_usage(uuid, int, int)
  from public, anon, authenticated;
