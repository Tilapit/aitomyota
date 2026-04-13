# Therapist Platform Implementation Tracker

- [x] Install and configure routing, Supabase client, and i18n dependencies
- [x] Replace page-state navigation with locale-prefixed router
- [x] Add language detection, switcher, and translation namespaces
- [ ] Move all existing client UI copy into English/Finnish translation files
- [x] Add therapist public landing page route and base layout
- [x] Define therapist onboarding quiz schema with free-text support
- [x] Add therapist quiz flow and post-quiz auth handoff state
- [x] Add Supabase auth screens for email/password and magic link
- [x] Create Supabase schema and RLS policies for therapist data
- [x] Persist therapist onboarding answers after auth and auto-publish profile
- [x] Add AI translation prefill path for Finnish localized therapist content
- [x] Build therapist dashboard: profile, localized content, quiz answers, media URLs, availability
- [x] Add publish/unpublish controls and live save behavior
- [x] Replace static therapist recommendation content with Supabase-backed published therapist data
- [ ] Add acceptance tests for locale routing, auth gating, onboarding persistence, dashboard edits, and localization behavior

## Notes

- Client-facing i18n is partially migrated. Route-aware language switching, locale-prefixed navigation, and translation namespaces are in place, but some existing client quiz and homepage copy still lives outside translation files and needs a full extraction pass.
- Therapist auth and dashboard are implemented with Supabase support plus a local fallback mode when env vars are missing, which keeps the flows testable during setup.
- Recommendation rendering now reads published therapist data through the repository layer when available and falls back to local seed data when the backend is not configured yet.
- Acceptance tests are still pending.
