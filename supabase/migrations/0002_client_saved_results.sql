create table if not exists client_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists client_saved_results (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references client_profiles(id) on delete cascade,
  locale text not null check (locale in ('en', 'fi')),
  quiz_id text not null,
  answers_json jsonb not null default '{}'::jsonb,
  recommendations_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table client_profiles enable row level security;
alter table client_saved_results enable row level security;

create policy "clients_manage_own_profile" on client_profiles
for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "clients_manage_own_saved_results" on client_saved_results
for all using (auth.uid() = client_id) with check (auth.uid() = client_id);
