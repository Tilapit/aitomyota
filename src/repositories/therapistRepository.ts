import { getSupabaseClient } from "../lib/supabase";
import { prefillFinnishContent } from "../lib/prefillFinnish";
import type {
  TherapistAvailability,
  TherapistBaseProfile,
  TherapistLocalizationFields,
  TherapistProfileRecord,
  TherapistQuizAnswers,
} from "../types/therapist";
import type { Locale } from "../types/app";

const LOCAL_STORAGE_KEY = "therapist-profiles";

function readLocalProfiles(): TherapistProfileRecord[] {
  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as TherapistProfileRecord[];
  } catch {
    return [];
  }
}

function writeLocalProfiles(records: TherapistProfileRecord[]) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

function buildDraftRecord(
  userId: string,
  email: string,
  displayName: string,
  answers: TherapistQuizAnswers,
  localizedContentFi: TherapistLocalizationFields,
): TherapistProfileRecord {
  const base: TherapistBaseProfile = {
    displayName: displayName || String(answers.practice_name ?? ""),
    title: "Therapist",
    languages: Array.isArray(answers.languages) ? answers.languages : [],
    modalities: Array.isArray(answers.modalities) ? answers.modalities : [],
    sessionFormats: Array.isArray(answers.session_formats) ? answers.session_formats : [],
    acceptsNewClients: true,
    introVideoUrl: String(answers.intro_video_url ?? ""),
    headshotUrl: "",
    bookingUrl: "",
    published: true,
  };

  const english: TherapistLocalizationFields = {
    shortIntro: String(answers.client_fit ?? ""),
    bio: String(answers.client_fit ?? ""),
    approachSummary: String(answers.approach ?? ""),
    freeTextPublicAnswers: {
      client_fit: String(answers.client_fit ?? ""),
      availability_summary: String(answers.availability_summary ?? ""),
    },
  };

  const availability: TherapistAvailability = {
    acceptingNewClients: true,
    availabilitySummary: String(answers.availability_summary ?? ""),
    sessionTimes: "",
    responseTimeNote: "",
    timezone: "Europe/Helsinki",
  };

  return {
    id: userId,
    email,
    slug: displayName.toLowerCase().trim().replace(/\s+/g, "-") || userId,
    base,
    localizations: {
      en: english,
      fi: localizedContentFi,
    },
    availability,
    quizAnswers: answers,
  };
}

export async function persistTherapistOnboarding(params: {
  userId: string;
  email: string;
  displayName: string;
  answers: TherapistQuizAnswers;
}) {
  const localizedFi = await prefillFinnishContent({
    shortIntro: String(params.answers.client_fit ?? ""),
    bio: String(params.answers.client_fit ?? ""),
    approachSummary: String(params.answers.approach ?? ""),
    freeTextPublicAnswers: {
      client_fit: String(params.answers.client_fit ?? ""),
      availability_summary: String(params.answers.availability_summary ?? ""),
    },
  });

  const supabase = getSupabaseClient();

  if (!supabase) {
    const profiles = readLocalProfiles().filter((profile) => profile.id !== params.userId);
    const next = buildDraftRecord(
      params.userId,
      params.email,
      params.displayName,
      params.answers,
      localizedFi,
    );
    profiles.push(next);
    writeLocalProfiles(profiles);
    return next;
  }

  const record = buildDraftRecord(
    params.userId,
    params.email,
    params.displayName,
    params.answers,
    localizedFi,
  );

  await supabase.from("therapist_profiles").upsert({
    id: record.id,
    slug: record.slug,
    email: record.email,
    display_name: record.base.displayName,
    title: record.base.title,
    languages: record.base.languages,
    modalities: record.base.modalities,
    session_formats: record.base.sessionFormats,
    accepts_new_clients: record.base.acceptsNewClients,
    intro_video_url: record.base.introVideoUrl,
    headshot_url: record.base.headshotUrl,
    booking_url: record.base.bookingUrl,
    published: true,
  });

  await supabase.from("therapist_profile_localizations").upsert([
    {
      therapist_id: record.id,
      locale: "en",
      short_intro: record.localizations.en.shortIntro,
      bio: record.localizations.en.bio,
      approach_summary: record.localizations.en.approachSummary,
      free_text_public_answers: record.localizations.en.freeTextPublicAnswers,
    },
    {
      therapist_id: record.id,
      locale: "fi",
      short_intro: record.localizations.fi.shortIntro,
      bio: record.localizations.fi.bio,
      approach_summary: record.localizations.fi.approachSummary,
      free_text_public_answers: record.localizations.fi.freeTextPublicAnswers,
    },
  ]);

  await supabase.from("therapist_availability").upsert({
    therapist_id: record.id,
    accepting_new_clients: record.availability.acceptingNewClients,
    availability_summary: record.availability.availabilitySummary,
    session_times: record.availability.sessionTimes,
    response_time_note: record.availability.responseTimeNote,
    timezone: record.availability.timezone,
  });

  await supabase.from("therapist_quiz_responses").upsert(
    Object.entries(record.quizAnswers).map(([questionId, value]) => ({
      therapist_id: record.id,
      question_id: questionId,
      answer_type: Array.isArray(value) ? "multi" : "text",
      answer_value_json: Array.isArray(value) ? value : null,
      answer_value_text: Array.isArray(value) ? null : value,
      source: "onboarding",
    })),
  );

  return record;
}

export async function getTherapistProfile(userId: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return readLocalProfiles().find((profile) => profile.id === userId) ?? null;
  }

  const { data: profile } = await supabase
    .from("therapist_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (!profile) {
    return null;
  }

  const { data: localizations } = await supabase
    .from("therapist_profile_localizations")
    .select("*")
    .eq("therapist_id", userId);

  const { data: availability } = await supabase
    .from("therapist_availability")
    .select("*")
    .eq("therapist_id", userId)
    .maybeSingle();

  const { data: responses } = await supabase
    .from("therapist_quiz_responses")
    .select("*")
    .eq("therapist_id", userId);

  const localizationMap = {
    en: {
      shortIntro: "",
      bio: "",
      approachSummary: "",
      freeTextPublicAnswers: {},
    },
    fi: {
      shortIntro: "",
      bio: "",
      approachSummary: "",
      freeTextPublicAnswers: {},
    },
  } as TherapistProfileRecord["localizations"];

  localizations?.forEach((entry) => {
    if (entry.locale === "en" || entry.locale === "fi") {
      const localeKey = entry.locale as "en" | "fi";
      localizationMap[localeKey] = {
        shortIntro: entry.short_intro ?? "",
        bio: entry.bio ?? "",
        approachSummary: entry.approach_summary ?? "",
        freeTextPublicAnswers: (entry.free_text_public_answers ?? {}) as Record<string, string>,
      };
    }
  });

  const quizAnswers = Object.fromEntries(
    (responses ?? []).map((response) => [
      response.question_id,
      response.answer_value_json ?? response.answer_value_text ?? "",
    ]),
  ) as TherapistQuizAnswers;

  return {
    id: profile.id,
    email: profile.email ?? "",
    slug: profile.slug ?? "",
    base: {
      displayName: profile.display_name ?? "",
      title: profile.title ?? "",
      languages: profile.languages ?? [],
      modalities: profile.modalities ?? [],
      sessionFormats: profile.session_formats ?? [],
      acceptsNewClients: profile.accepts_new_clients ?? true,
      introVideoUrl: profile.intro_video_url ?? "",
      headshotUrl: profile.headshot_url ?? "",
      bookingUrl: profile.booking_url ?? "",
      published: profile.published ?? false,
    },
    localizations: localizationMap,
    availability: {
      acceptingNewClients: availability?.accepting_new_clients ?? true,
      availabilitySummary: availability?.availability_summary ?? "",
      sessionTimes: typeof availability?.session_times === "string"
        ? availability.session_times
        : JSON.stringify(availability?.session_times ?? ""),
      responseTimeNote: availability?.response_time_note ?? "",
      timezone: availability?.timezone ?? "Europe/Helsinki",
    },
    quizAnswers,
  } satisfies TherapistProfileRecord;
}

export async function saveTherapistProfile(record: TherapistProfileRecord) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const profiles = readLocalProfiles().filter((profile) => profile.id !== record.id);
    profiles.push(record);
    writeLocalProfiles(profiles);
    return record;
  }

  const localizedFi =
    record.localizations.fi.shortIntro.trim() ||
    record.localizations.fi.bio.trim() ||
    record.localizations.fi.approachSummary.trim()
      ? record.localizations.fi
      : await prefillFinnishContent(record.localizations.en);

  await supabase.from("therapist_profiles").upsert({
    id: record.id,
    slug: record.slug,
    email: record.email,
    display_name: record.base.displayName,
    title: record.base.title,
    languages: record.base.languages,
    modalities: record.base.modalities,
    session_formats: record.base.sessionFormats,
    accepts_new_clients: record.base.acceptsNewClients,
    intro_video_url: record.base.introVideoUrl,
    headshot_url: record.base.headshotUrl,
    booking_url: record.base.bookingUrl,
    published: record.base.published,
  });

  await supabase.from("therapist_profile_localizations").upsert([
    {
      therapist_id: record.id,
      locale: "en",
      short_intro: record.localizations.en.shortIntro,
      bio: record.localizations.en.bio,
      approach_summary: record.localizations.en.approachSummary,
      free_text_public_answers: record.localizations.en.freeTextPublicAnswers,
    },
    {
      therapist_id: record.id,
      locale: "fi",
      short_intro: localizedFi.shortIntro,
      bio: localizedFi.bio,
      approach_summary: localizedFi.approachSummary,
      free_text_public_answers: localizedFi.freeTextPublicAnswers,
    },
  ]);

  await supabase.from("therapist_availability").upsert({
    therapist_id: record.id,
    accepting_new_clients: record.availability.acceptingNewClients,
    availability_summary: record.availability.availabilitySummary,
    session_times: record.availability.sessionTimes,
    response_time_note: record.availability.responseTimeNote,
    timezone: record.availability.timezone,
  });

  return {
    ...record,
    localizations: {
      ...record.localizations,
      fi: localizedFi,
    },
  };
}

export async function getPublishedTherapists(locale: Locale) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return readLocalProfiles()
      .filter((profile) => profile.base.published)
      .slice(0, 3)
      .map((profile) => ({
        name: profile.base.displayName,
        title: profile.base.title,
        availability: profile.availability.availabilitySummary || "Accepting new clients",
        reason:
          profile.localizations[locale].shortIntro ||
          profile.localizations.en.shortIntro ||
          profile.localizations.en.bio,
        tags: profile.base.modalities.slice(0, 3),
      }));
  }

  const { data: profiles } = await supabase
    .from("therapist_profiles")
    .select("id, display_name, title, modalities, published")
    .eq("published", true)
    .limit(3);

  if (!profiles?.length) {
    return [];
  }

  const ids = profiles.map((profile) => profile.id);
  const { data: localizations } = await supabase
    .from("therapist_profile_localizations")
    .select("*")
    .in("therapist_id", ids)
    .in("locale", [locale, "en"]);

  const { data: availability } = await supabase
    .from("therapist_availability")
    .select("*")
    .in("therapist_id", ids);

  return profiles.map((profile) => {
    const localized =
      localizations?.find(
        (entry) => entry.therapist_id === profile.id && entry.locale === locale,
      ) ??
      localizations?.find(
        (entry) => entry.therapist_id === profile.id && entry.locale === "en",
      );
    const availabilityRow = availability?.find((entry) => entry.therapist_id === profile.id);

    return {
      name: profile.display_name,
      title: profile.title,
      availability: availabilityRow?.availability_summary || "Accepting new clients",
      reason: localized?.short_intro || localized?.bio || "",
      tags: profile.modalities?.slice(0, 3) ?? [],
    };
  });
}
