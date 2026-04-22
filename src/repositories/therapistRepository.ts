import { getSupabaseClient } from "../lib/supabase";
import { prefillFinnishContent } from "../lib/prefillFinnish";
import { ensureUserRole } from "./userRolesRepository";
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

function normalizeWebsiteUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function extractContactPreference(value: unknown) {
  const contactPreference =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, string>)
      : {};

  return {
    website: String(contactPreference.website ?? "").trim(),
    contactEmail: String(contactPreference.contact_email ?? "").trim(),
  };
}

function buildContactPreferenceSummary(website: string, contactEmail: string) {
  return [website, contactEmail].filter(Boolean).join(" • ");
}

function buildDraftRecord(
  userId: string,
  email: string,
  displayName: string,
  answers: TherapistQuizAnswers,
  localizedContentFi: TherapistLocalizationFields,
): TherapistProfileRecord {
  const identity =
    answers.identity && typeof answers.identity === "object" && !Array.isArray(answers.identity)
      ? (answers.identity as Record<string, string>)
      : {};

  const normalizedDisplayName = displayName || identity.name || "";
  const normalizedTitle =
    identity.title === "Other" || identity.title === "Muu"
      ? identity.title_custom || "Therapist"
      : identity.title || "Therapist";
  const { website: contactWebsite, contactEmail } = extractContactPreference(answers.contact_preference);
  const intro = String(answers.client_intro ?? "");
  const workFocus = String(answers.work_focus ?? "");
  const officeLocation =
    answers.office_location && typeof answers.office_location === "object" && !Array.isArray(answers.office_location)
      ? (answers.office_location as Record<string, string>)
      : {};
  const officeLocationText = [
    officeLocation.street_address,
    officeLocation.postal_code,
    officeLocation.city,
    officeLocation.country,
  ]
    .filter((part) => String(part ?? "").trim().length > 0)
    .join(", ");

  const base: TherapistBaseProfile = {
    displayName: normalizedDisplayName,
    title: normalizedTitle,
    languages: Array.isArray(answers.language_skills) ? answers.language_skills : [],
    modalities: Array.isArray(answers.specializations) ? answers.specializations : [],
    sessionFormats:
      typeof answers.session_format === "string" ? [answers.session_format] : [],
    acceptsNewClients: true,
    introVideoUrl: "",
    headshotUrl: String(answers.profile_photo_url ?? ""),
    bookingUrl: normalizeWebsiteUrl(contactWebsite),
    published: true,
  };

  const english: TherapistLocalizationFields = {
    shortIntro: intro,
    bio: intro,
    approachSummary: workFocus,
    freeTextPublicAnswers: {
      gender_identity: String(answers.gender_identity ?? ""),
      education: String(answers.education ?? ""),
      years_experience: String(answers.years_experience ?? ""),
      negative_therapy_experience: String(answers.negative_therapy_experience ?? ""),
      kela_provider: String(answers.kela_provider ?? ""),
      language_skills: Array.isArray(answers.language_skills) ? answers.language_skills.join(", ") : "",
      price_per_session: String(answers.price_per_session ?? ""),
      appointment_frequency: String(answers.appointment_frequency ?? ""),
      session_format: String(answers.session_format ?? ""),
      specializations: Array.isArray(answers.specializations) ? answers.specializations.join(", ") : "",
      work_focus: workFocus,
      working_style: String(answers.working_style ?? ""),
      pace_of_progress: String(answers.pace_of_progress ?? ""),
      interaction_style: String(answers.interaction_style ?? ""),
      meet_client_style: String(answers.meet_client_style ?? ""),
      office_location: officeLocationText,
      contact_website: contactWebsite,
      contact_email: contactEmail,
      contact_preference: buildContactPreferenceSummary(contactWebsite, contactEmail),
    },
  };

  const availability: TherapistAvailability = {
    acceptingNewClients: true,
    availabilitySummary: String(answers.appointment_frequency ?? ""),
    sessionTimes: "",
    responseTimeNote: "",
    timezone: "Europe/Helsinki",
  };

  return {
    id: userId,
    email: email || identity.email || "",
    slug: normalizedDisplayName.toLowerCase().trim().replace(/\s+/g, "-") || userId,
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
    shortIntro: String(params.answers.client_intro ?? ""),
    bio: String(params.answers.client_intro ?? ""),
    approachSummary: String(params.answers.work_focus ?? ""),
    freeTextPublicAnswers: {
      client_intro: String(params.answers.client_intro ?? ""),
      contact_preference:
        params.answers.contact_preference &&
        typeof params.answers.contact_preference === "object" &&
        !Array.isArray(params.answers.contact_preference)
          ? buildContactPreferenceSummary(
              String((params.answers.contact_preference as Record<string, string>).website ?? "").trim(),
              String((params.answers.contact_preference as Record<string, string>).contact_email ?? "").trim(),
            )
          : "",
    },
  });

  const supabase = getSupabaseClient();

  if (!supabase) {
    await ensureUserRole(params.userId, "therapist");
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

  await ensureUserRole(params.userId, "therapist");

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
      answer_type: Array.isArray(value) ? "multi" : typeof value === "object" ? "json" : typeof value === "number" ? "number" : "text",
      answer_value_json: Array.isArray(value) || typeof value === "object" ? value : null,
      answer_value_text: Array.isArray(value) || typeof value === "object" ? null : String(value),
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
  const { website: contactWebsite, contactEmail } = extractContactPreference(record.quizAnswers.contact_preference);
  const nextRecord: TherapistProfileRecord = {
    ...record,
    base: {
      ...record.base,
      bookingUrl: normalizeWebsiteUrl(contactWebsite) || record.base.bookingUrl,
    },
    localizations: {
      ...record.localizations,
      en: {
        ...record.localizations.en,
        freeTextPublicAnswers: {
          ...record.localizations.en.freeTextPublicAnswers,
          contact_website: contactWebsite,
          contact_email: contactEmail,
          contact_preference: buildContactPreferenceSummary(contactWebsite, contactEmail),
        },
      },
    },
  };

  if (!supabase) {
    const profiles = readLocalProfiles().filter((profile) => profile.id !== record.id);
    profiles.push(nextRecord);
    writeLocalProfiles(profiles);
    return nextRecord;
  }

  const localizedFi =
    nextRecord.localizations.fi.shortIntro.trim() ||
    nextRecord.localizations.fi.bio.trim() ||
    nextRecord.localizations.fi.approachSummary.trim()
      ? nextRecord.localizations.fi
      : await prefillFinnishContent(nextRecord.localizations.en);

  await supabase.from("therapist_profiles").upsert({
    id: nextRecord.id,
    slug: nextRecord.slug,
    email: nextRecord.email,
    display_name: nextRecord.base.displayName,
    title: nextRecord.base.title,
    languages: nextRecord.base.languages,
    modalities: nextRecord.base.modalities,
    session_formats: nextRecord.base.sessionFormats,
    accepts_new_clients: nextRecord.base.acceptsNewClients,
    intro_video_url: nextRecord.base.introVideoUrl,
    headshot_url: nextRecord.base.headshotUrl,
    booking_url: nextRecord.base.bookingUrl,
    published: nextRecord.base.published,
  });

  await supabase.from("therapist_profile_localizations").upsert([
    {
      therapist_id: nextRecord.id,
      locale: "en",
      short_intro: nextRecord.localizations.en.shortIntro,
      bio: nextRecord.localizations.en.bio,
      approach_summary: nextRecord.localizations.en.approachSummary,
      free_text_public_answers: nextRecord.localizations.en.freeTextPublicAnswers,
    },
    {
      therapist_id: nextRecord.id,
      locale: "fi",
      short_intro: localizedFi.shortIntro,
      bio: localizedFi.bio,
      approach_summary: localizedFi.approachSummary,
      free_text_public_answers: localizedFi.freeTextPublicAnswers,
    },
  ]);

  await supabase.from("therapist_availability").upsert({
    therapist_id: nextRecord.id,
    accepting_new_clients: nextRecord.availability.acceptingNewClients,
    availability_summary: nextRecord.availability.availabilitySummary,
    session_times: nextRecord.availability.sessionTimes,
    response_time_note: nextRecord.availability.responseTimeNote,
    timezone: nextRecord.availability.timezone,
  });

  await supabase.from("therapist_quiz_responses").upsert(
    Object.entries(nextRecord.quizAnswers).map(([questionId, value]) => ({
      therapist_id: nextRecord.id,
      question_id: questionId,
      answer_type:
        Array.isArray(value)
          ? "multi"
          : typeof value === "object"
            ? "json"
            : typeof value === "number"
              ? "number"
              : "text",
      answer_value_json: Array.isArray(value) || typeof value === "object" ? value : null,
      answer_value_text: Array.isArray(value) || typeof value === "object" ? null : String(value),
      source: "dashboard",
    })),
  );

  return {
    ...nextRecord,
    localizations: {
      ...nextRecord.localizations,
      fi: localizedFi,
    },
  };
}

export async function getPublishedTherapistProfiles() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return readLocalProfiles().filter((profile) => profile.base.published);
  }

  const { data: profiles } = await supabase
    .from("therapist_profiles")
    .select("*")
    .eq("published", true);

  if (!profiles?.length) {
    return [];
  }

  const ids = profiles.map((profile) => profile.id);
  const { data: localizations } = await supabase
    .from("therapist_profile_localizations")
    .select("*")
    .in("therapist_id", ids)
    .in("locale", ["en", "fi"]);

  const { data: availability } = await supabase
    .from("therapist_availability")
    .select("*")
    .in("therapist_id", ids);

  const { data: responses } = await supabase
    .from("therapist_quiz_responses")
    .select("*")
    .in("therapist_id", ids);

  return profiles.map((profile) => {
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

    localizations
      ?.filter((entry) => entry.therapist_id === profile.id)
      .forEach((entry) => {
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

    const availabilityRow = availability?.find((entry) => entry.therapist_id === profile.id);
    const quizAnswers = Object.fromEntries(
      (responses ?? [])
        .filter((response) => response.therapist_id === profile.id)
        .map((response) => [
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
        acceptingNewClients: availabilityRow?.accepting_new_clients ?? true,
        availabilitySummary: availabilityRow?.availability_summary ?? "",
        sessionTimes:
          typeof availabilityRow?.session_times === "string"
            ? availabilityRow.session_times
            : JSON.stringify(availabilityRow?.session_times ?? ""),
        responseTimeNote: availabilityRow?.response_time_note ?? "",
        timezone: availabilityRow?.timezone ?? "Europe/Helsinki",
      },
      quizAnswers,
    } satisfies TherapistProfileRecord;
  });
}

export async function getPublishedTherapists(locale: Locale) {
  const profiles = await getPublishedTherapistProfiles();

  return profiles.slice(0, 3).map((profile) => ({
    name: profile.base.displayName,
    title: profile.base.title,
    availability:
      profile.availability.availabilitySummary ||
      (locale === "fi" ? "Ottaa uusia asiakkaita" : "Accepting new clients"),
    reason:
      profile.localizations[locale].shortIntro ||
      profile.localizations.en.shortIntro ||
      profile.localizations.en.bio,
    tags: profile.base.modalities.slice(0, 3),
    bookingUrl: profile.base.bookingUrl || undefined,
    contactDetail:
      String(profile.localizations.en.freeTextPublicAnswers.contact_email ?? "") ||
      String(profile.localizations.en.freeTextPublicAnswers.contact_website ?? "") ||
      String(profile.localizations.en.freeTextPublicAnswers.contact_preference ?? "") ||
      profile.email,
    headshotUrl: profile.base.headshotUrl || undefined,
    introVideoUrl: profile.base.introVideoUrl || undefined,
  }));
}
