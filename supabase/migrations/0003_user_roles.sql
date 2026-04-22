create table if not exists user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('client', 'therapist')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

insert into user_roles (user_id, role)
select id, 'client'
from client_profiles
on conflict (user_id, role) do nothing;

insert into user_roles (user_id, role)
select id, 'therapist'
from therapist_profiles
on conflict (user_id, role) do nothing;

alter table user_roles enable row level security;

create policy "users_manage_own_roles" on user_roles
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
