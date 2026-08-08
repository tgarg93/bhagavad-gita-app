-- Remote win-back push (product-spec §4.1). The send-winback-push edge function
-- pushes the day's Daily Chai atom to users whose LOCAL one-shot notification
-- window has drained (fully dormant). Both objects here are service-role-only:
-- the function runs with the service role, which bypasses RLS.

-- Dedupe / cadence bookkeeping: one row per user we've win-back-pushed, so a
-- daily cron never re-pings the same dormant user more than once per cooldown.
create table public.push_winback (
  user_id uuid primary key references auth.users (id) on delete cascade,
  last_sent_at timestamptz not null default now()
);

alter table public.push_winback enable row level security;
-- No RLS policies on purpose: only the edge function (service role) touches it.

-- Find dormant users to win back: last active between p_min_days and p_max_days
-- ago (>= p_min_days so we never duplicate the 28-day local window; <= p_max_days
-- so we stop nagging the long-gone), an iOS push token on file, and not already
-- win-back-pushed within p_cooldown_days. Returns the opaque Expo token only.
--
-- security definer + execute revoked from anon/authenticated: p_* are caller-
-- supplied, so only the service role may run this (an authenticated user must
-- never be able to enumerate other users' tokens).
create or replace function public.dormant_push_targets(
  p_min_days int,
  p_max_days int,
  p_cooldown_days int
) returns table (user_id uuid, token text, platform text)
language sql
security definer
set search_path = public
as $$
  select ja.user_id,
         pr.value ->> 'token'    as token,
         pr.value ->> 'platform' as platform
  from user_data ja
  join user_data pr
    on pr.user_id = ja.user_id and pr.key = 'push_registration'
  left join push_winback w on w.user_id = ja.user_id
  where ja.key = 'journey_activity'
    -- guard the cast: a malformed date must skip the row, not error the batch
    and (ja.value ->> 'lastActiveDate') ~ '^\d{4}-\d{2}-\d{2}$'
    and (ja.value ->> 'lastActiveDate')::date <= current_date - p_min_days
    and (ja.value ->> 'lastActiveDate')::date >= current_date - p_max_days
    and (pr.value ->> 'platform') = 'ios'
    and (w.last_sent_at is null or w.last_sent_at < now() - make_interval(days => p_cooldown_days));
$$;

revoke execute on function public.dormant_push_targets(int, int, int)
  from public, anon, authenticated;
