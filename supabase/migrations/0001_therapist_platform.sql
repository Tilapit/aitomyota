create table if not exists therapist_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  slug text unique not null,
  email text,
  display_name text not null default '',
  title text not null default '',
  languages text[] not null default '{}',
  modalities text[] not null default '{}',
  session_formats text[] not null default '{}',
  accepts_new_clients boolean not null default true,
  intro_video_url text not null default '',
  headshot_url text not null default '',
  booking_url text not null default '',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists therapist_profile_localizations (
  therapist_id uuid not null references therapist_profiles(id) on delete cascade,
  locale text not null check (locale in ('en', 'fi')),
  short_intro text not null default '',
  bio text not null default '',
  approach_summary text not null default '',
  free_text_public_answers jsonb not null default '{}'::jsonb,
  primary key (therapist_id, locale)
);

create table if not exists therapist_quiz_responses (
  therapist_id uuid not null references therapist_profiles(id) on delete cascade,
  question_id text not null,
  answer_type text not null,
  answer_value_json jsonb,
  answer_value_text text,
  source text not null default 'onboarding',
  updated_at timestamptz not null default now(),
  primary key (therapist_id, question_id)
);

create table if not exists therapist_availability (
  therapist_id uuid primary key references therapist_profiles(id) on delete cascade,
  accepting_new_clients boolean not null default true,
  availability_summary text not null default '',
  session_times jsonb not null default '{}'::jsonb,
  response_time_note text not null default '',
  timezone text not null default 'Europe/Helsinki',
  updated_at timestamptz not null default now()
);

alter table therapist_profiles enable row level security;
alter table therapist_profile_localizations enable row level security;
alter table therapist_quiz_responses enable row level security;
alter table therapist_availability enable row level security;

create policy "therapists_manage_own_profile" on therapist_profiles
for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "therapists_manage_own_localizations" on therapist_profile_localizations
for all using (auth.uid() = therapist_id) with check (auth.uid() = therapist_id);

create policy "therapists_manage_own_quiz" on therapist_quiz_responses
for all using (auth.uid() = therapist_id) with check (auth.uid() = therapist_id);

create policy "therapists_manage_own_availability" on therapist_availability
for all using (auth.uid() = therapist_id) with check (auth.uid() = therapist_id);

create policy "public_read_published_profiles" on therapist_profiles
for select using (published = true);

create policy "public_read_published_localizations" on therapist_profile_localizations
for select using (
  exists (
    select 1
    from therapist_profiles
    where therapist_profiles.id = therapist_profile_localizations.therapist_id
      and therapist_profiles.published = true
  )
);
