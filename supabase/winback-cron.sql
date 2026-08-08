-- Phase 2 — remote win-back scheduler.  NOT a migration on purpose: files under
-- supabase/migrations/ auto-run on `db push`, and this must be applied MANUALLY
-- (in the Supabase SQL editor) only AFTER Phase 1 is verified end-to-end on a
-- device and the secrets below exist. It schedules a daily job that pings the
-- send-winback-push function; the push_winback cooldown makes a daily run
-- idempotent (a user is touched at most monthly while dormant).

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- 1) Store the function URL + the CRON_SECRET in Vault (run once; values are
--    NOT committed). The CRON_SECRET must equal what you set on the function via
--    `npx supabase secrets set CRON_SECRET=...`.
--
--   select vault.create_secret(
--     'https://rvzlbmwanusnaanuqsxw.functions.supabase.co/send-winback-push',
--     'winback_url');
--   select vault.create_secret('<the CRON_SECRET>', 'winback_cron_secret');

-- 2) Schedule the daily job. 16:00 UTC is a placeholder — a fixed server hour
--    for v1 (per-user timezone is a later §4.1 unlock); pick an hour that lands
--    mid-morning for the US/IN bulk and revisit once there's a real spread.
select cron.schedule(
  'winback-daily',
  '0 16 * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'winback_url'),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'winback_cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Inspect:   select * from cron.job;
--            select * from cron.job_run_details order by start_time desc limit 20;
-- Remove:    select cron.unschedule('winback-daily');
