-- Per-user sync mirror of the app's AsyncStorage blobs. The value is opaque
-- jsonb keyed by the existing AsyncStorage key names, so adding a new synced
-- feature is a client-side SYNC_KEYS change — never a server migration.
create table public.user_data (
  user_id uuid not null references auth.users (id) on delete cascade,
  key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.user_data enable row level security;

create policy "own rows" on public.user_data
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update, delete on public.user_data to authenticated;
