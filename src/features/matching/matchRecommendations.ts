import type { Locale } from "../../types/app";
import type { TherapistProfileRecord } from "../../types/therapist";
import type { QuizAnswers, QuizId, Recommendation } from "../quiz/quizData";

type ClientPreferenceProfile = {
  preferredLanguage: string | null;
  concerns: string[];
  supportStyles: string[];
  preferredGender: string | null;
  experienceNeed: "experienced" | "none" | null;
  budgetBand: "under_80" | "80_120" | "120_160" | "open" | null;
  kelaNeed: "required" | "preferred" | "unknown" | null;
  sessionFormat: "remote_only" | "in_person_only" | "either" | null;
  sessionFrequency: "intensive" | "flexible" | "infrequent" | null;
  pacePreference: "calm" | "goal_oriented" | "flexible" | null;
  openText: string;
  historyNeedsCare: boolean;
};

type TherapistCapabilityProfile = {
  profile: TherapistProfileRecord;
  localizedIntro: string;
  localizedApproach: string;
  languages: string[];
  specializations: string[];
  workFocus: string | null;
  sessionFormats: string[];
  frequency: string | null;
  pricePerSession: number | null;
  kelaApproved: boolean;
  yearsExperience: number | null;
  genderIdentity: string | null;
  workingStyle: number | null;
  paceOfProgress: number | null;
  interactionStyle: number | null;
  meetClientStyle: string | null;
  supportsNegativeTherapyExperience: boolean;
  contactDetail: string;
};

type MatchResult = {
  recommendation: Recommendation;
  score: number;
};

const MATCH_WEIGHTS = {
  language: 24,
  concerns: 24,
  practical: 18,
  style: 18,
  experience: 10,
  identity: 3,
  nuance: 3,
} as const;

const CONCERN_EQUIVALENTS: Record<string, string[]> = {
  stress_burnout: ["stress_burnout", "depression_low_mood", "anxiety_fears"],
  relationships_family: ["relationships_family", "parenthood"],
  crises_grief: ["crises_grief", "self_esteem_identity"],
  self_esteem_identity: ["self_esteem_identity", "neurodiversity"],
  academic_pressure: ["academic_pressure", "stress_burnout"],
  anxiety_fears: ["anxiety_fears", "stress_burnout", "depression_low_mood"],
  depression_low_mood: ["depression_low_mood", "anxiety_fears", "stress_burnout"],
  identity_direction: ["self_esteem_identity", "crises_grief"],
};

function readSingle(answers: QuizAnswers, ...keys: string[]) {
  for (const key of keys) {
    const value = answers[key];
    if (typeof value === "string") {
      return value;
    }
  }

  return null;
}

function readMulti(answers: QuizAnswers, ...keys: string[]) {
  for (const key of keys) {
    const value = answers[key];
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function parseFirstNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function normalizeClientAnswers(quizId: QuizId, answers: QuizAnswers): ClientPreferenceProfile {
  const primarySituation = readSingle(answers, "s1", "l1");
  const language = readSingle(answers, "s2", "l2");
  const shortSupport = readSingle(answers, "s3");
  const longSupport = readSingle(answers, "l7");
  const genderPreference = readSingle(answers, "s4");
  const agePreference = readSingle(answers, "s5");
  const budget = readSingle(answers, "s6", "l11");
  const kela = readSingle(answers, "s7", "l12");
  const longConcerns = readMulti(answers, "l4");
  const sessionFormat = readSingle(answers, "l9");
  const sessionFrequency = readSingle(answers, "l10");
  const pace = readSingle(answers, "l8");
  const history = readSingle(answers, "l13");
  const historyFollowup = readSingle(answers, "l14");
  const openText = readSingle(answers, "l16") ?? "";

  const concerns = new Set<string>();

  if (primarySituation === "s1a" || primarySituation === "l1a") {
    concerns.add("stress_burnout");
  }
  if (primarySituation === "s1b" || primarySituation === "l1b") {
    concerns.add("relationships_family");
    concerns.add("crises_grief");
  }
  if (primarySituation === "s1c" || primarySituation === "l1c") {
    concerns.add("crises_grief");
    concerns.add("identity_direction");
  }
  if (primarySituation === "s1d" || primarySituation === "l1d") {
    concerns.add("self_esteem_identity");
    concerns.add("anxiety_fears");
  }

  for (const value of longConcerns) {
    if (value === "l4a") concerns.add("academic_pressure");
    if (value === "l4b") concerns.add("relationships_family");
    if (value === "l4c") concerns.add("self_esteem_identity");
    if (value === "l4d") {
      concerns.add("anxiety_fears");
      concerns.add("depression_low_mood");
      concerns.add("stress_burnout");
    }
  }

  const supportStyles = new Set<string>();

  if (shortSupport === "s3a" || longSupport === "l7a") supportStyles.add("warm");
  if (shortSupport === "s3b" || longSupport === "l7b") supportStyles.add("practical");
  if (shortSupport === "s3c") supportStyles.add("insight");
  if (shortSupport === "s3d" || longSupport === "l7c") supportStyles.add("direct");
  if (longSupport === "l7b") supportStyles.add("structured");

  return {
    preferredLanguage:
      language === "s2a" || language === "l2a"
        ? "finnish"
        : language === "s2b" || language === "l2b"
          ? "swedish"
          : language === "s2c" || language === "l2c"
            ? "english"
            : null,
    concerns: [...concerns],
    supportStyles: [...supportStyles],
    preferredGender:
      genderPreference === "s4a"
        ? "woman"
        : genderPreference === "s4b"
          ? "man"
          : genderPreference === "s4c"
            ? "non_binary"
            : null,
    experienceNeed: agePreference === "s5b" ? "experienced" : agePreference === "s5c" ? "none" : null,
    budgetBand:
      budget === "s6a" || budget === "l11a"
        ? "under_80"
        : budget === "s6b" || budget === "l11b"
          ? "80_120"
          : budget === "s6c" || budget === "l11c"
            ? "120_160"
            : budget === "s6d" || budget === "l11d"
              ? "open"
              : null,
    kelaNeed:
      kela === "s7a" || kela === "l12a"
        ? "required"
        : kela === "s7b" || kela === "l12b"
          ? "preferred"
          : "unknown",
    sessionFormat:
      sessionFormat === "l9a"
        ? "remote_only"
        : sessionFormat === "l9b"
          ? "in_person_only"
          : sessionFormat === "l9c"
            ? "either"
            : null,
    sessionFrequency:
      sessionFrequency === "l10a"
        ? "intensive"
        : sessionFrequency === "l10b" || sessionFrequency === "l10d"
          ? "flexible"
          : sessionFrequency === "l10c"
            ? "infrequent"
            : quizId === "short"
              ? "flexible"
              : null,
    pacePreference:
      pace === "l8a"
        ? "calm"
        : pace === "l8b"
          ? "goal_oriented"
          : pace === "l8c"
            ? "flexible"
            : null,
    openText,
    historyNeedsCare: history === "l13c" || historyFollowup === "l14b",
  };
}

function normalizeTherapistProfile(profile: TherapistProfileRecord, locale: Locale): TherapistCapabilityProfile {
  const localized = profile.localizations[locale];
  const english = profile.localizations.en;
  const localizedIntro = localized.shortIntro || localized.bio || english.shortIntro || english.bio || "";
  const localizedApproach = localized.approachSummary || english.approachSummary || "";
  const freeText = english.freeTextPublicAnswers;
  const negativeSupportRaw = String(freeText.negative_therapy_experience ?? "").toLowerCase();

  return {
    profile,
    localizedIntro,
    localizedApproach,
    languages: profile.base.languages,
    specializations: profile.base.modalities,
    workFocus: String(freeText.work_focus ?? "") || null,
    sessionFormats: profile.base.sessionFormats,
    frequency: String(freeText.appointment_frequency ?? "") || null,
    pricePerSession: parseFirstNumber(String(freeText.price_per_session ?? "")),
    kelaApproved: String(freeText.kela_provider ?? "") === "yes",
    yearsExperience: parseFirstNumber(String(freeText.years_experience ?? "")),
    genderIdentity: String(freeText.gender_identity ?? "") || null,
    workingStyle: parseFirstNumber(String(freeText.working_style ?? "")),
    paceOfProgress: parseFirstNumber(String(freeText.pace_of_progress ?? "")),
    interactionStyle: parseFirstNumber(String(freeText.interaction_style ?? "")),
    meetClientStyle: String(freeText.meet_client_style ?? "") || null,
    supportsNegativeTherapyExperience:
      negativeSupportRaw.includes("yes") ||
      negativeSupportRaw.includes("kyllä") ||
      negativeSupportRaw.includes("experience") ||
      negativeSupportRaw.includes("kokem"),
    contactDetail: String(freeText.contact_preference ?? ""),
  };
}

function hasHardMismatch(client: ClientPreferenceProfile, therapist: TherapistCapabilityProfile) {
  if (!therapist.profile.base.acceptsNewClients || !therapist.profile.availability.acceptingNewClients) {
    return true;
  }

  if (client.preferredLanguage && !therapist.languages.includes(client.preferredLanguage)) {
    return true;
  }

  if (client.sessionFormat && client.sessionFormat !== "either") {
    if (!therapist.sessionFormats.includes(client.sessionFormat) && !therapist.sessionFormats.includes("both")) {
      return true;
    }
  }

  if (client.kelaNeed === "required" && !therapist.kelaApproved) {
    return true;
  }

  if (client.budgetBand === "under_80" && (therapist.pricePerSession ?? 0) > 140) {
    return true;
  }

  return false;
}

function scoreBudget(client: ClientPreferenceProfile, therapist: TherapistCapabilityProfile) {
  if (client.budgetBand === "open" || client.budgetBand === null || therapist.pricePerSession === null) {
    return 5;
  }

  const price = therapist.pricePerSession;
  if (client.budgetBand === "under_80") return price <= 80 ? 5 : price <= 100 ? 2 : 0;
  if (client.budgetBand === "80_120") return price >= 80 && price <= 120 ? 5 : price <= 140 ? 2 : 0;
  if (client.budgetBand === "120_160") return price >= 120 && price <= 160 ? 5 : price >= 100 ? 2 : 0;
  return 0;
}

function scoreStyle(client: ClientPreferenceProfile, therapist: TherapistCapabilityProfile) {
  let score = 0;

  if (client.supportStyles.includes("warm")) {
    if (therapist.meetClientStyle === "warm_encouraging" || therapist.meetClientStyle === "calm_gentle") score += 6;
    if ((therapist.interactionStyle ?? 3) <= 3) score += 2;
  }
  if (client.supportStyles.includes("practical")) {
    if (therapist.workFocus === "concrete_problems") score += 6;
    if ((therapist.workingStyle ?? 3) >= 3) score += 2;
  }
  if (client.supportStyles.includes("insight")) {
    if (therapist.workFocus === "self_understanding") score += 6;
    if ((therapist.paceOfProgress ?? 3) <= 3) score += 2;
  }
  if (client.supportStyles.includes("direct")) {
    if (therapist.meetClientStyle === "honest_direct") score += 6;
    if ((therapist.workingStyle ?? 3) >= 4) score += 2;
  }
  if (client.supportStyles.includes("structured")) {
    if (therapist.meetClientStyle === "analytical_structured") score += 6;
    if ((therapist.interactionStyle ?? 3) >= 4) score += 2;
  }

  if (client.pacePreference === "calm" && (therapist.paceOfProgress ?? 3) <= 3) score += 4;
  if (client.pacePreference === "goal_oriented" && (therapist.paceOfProgress ?? 3) >= 4) score += 4;
  if (client.pacePreference === "flexible") score += 2;

  return Math.min(score, 20);
}

function scoreTextNuance(client: ClientPreferenceProfile, therapist: TherapistCapabilityProfile) {
  const haystack = `${therapist.localizedIntro} ${therapist.localizedApproach}`.toLowerCase();
  const needles = client.openText
    .toLowerCase()
    .split(/[^a-zA-ZåäöÅÄÖ]+/)
    .filter((word) => word.length > 4);

  const overlap = needles.filter((word) => haystack.includes(word)).length;
  return Math.min(overlap, 5);
}

function getConcernOverlap(client: ClientPreferenceProfile, therapist: TherapistCapabilityProfile) {
  const overlap = new Set<string>();

  for (const concern of client.concerns) {
    const acceptable = CONCERN_EQUIVALENTS[concern] ?? [concern];
    if (therapist.specializations.some((specialization) => acceptable.includes(specialization))) {
      overlap.add(concern);
    }
  }

  return [...overlap];
}

function buildReasons(client: ClientPreferenceProfile, therapist: TherapistCapabilityProfile) {
  const reasons: string[] = [];

  if (client.preferredLanguage && therapist.languages.includes(client.preferredLanguage)) {
    reasons.push(client.preferredLanguage === "finnish" ? "Works in Finnish" : client.preferredLanguage === "swedish" ? "Works in Swedish" : "Works in English");
  }

  const specializationOverlap = therapist.specializations.filter((value) => client.concerns.includes(value));
  if (specializationOverlap.length > 0) {
    reasons.push(`Matches ${specializationOverlap.slice(0, 2).join(" and ").replaceAll("_", " ")}`);
  }

  if (client.kelaNeed !== "unknown" && therapist.kelaApproved) {
    reasons.push("Kela pathway available");
  }

  if (client.sessionFrequency && therapist.frequency === client.sessionFrequency) {
    reasons.push("Session rhythm aligns");
  }

  if (client.supportStyles.includes("practical") && therapist.workFocus === "concrete_problems") {
    reasons.push("Concrete, tool-oriented approach");
  }
  if (client.supportStyles.includes("warm") && ["warm_encouraging", "calm_gentle"].includes(therapist.meetClientStyle ?? "")) {
    reasons.push("Warm interpersonal style");
  }
  if (client.historyNeedsCare && therapist.supportsNegativeTherapyExperience) {
    reasons.push("Comfortable with previous difficult therapy experiences");
  }

  return reasons.slice(0, 3);
}

function formatConcernTag(value: string, locale: Locale) {
  const labels: Record<string, string> = {
    stress_burnout: locale === "fi" ? "Stressi ja uupumus" : "Stress and burnout",
    relationships_family: locale === "fi" ? "Ihmissuhteet ja perhe" : "Relationships and family",
    depression_low_mood: locale === "fi" ? "Masennus ja alakulo" : "Depression and low mood",
    anxiety_fears: locale === "fi" ? "Ahdistuneisuus ja pelot" : "Anxiety and fears",
    crises_grief: locale === "fi" ? "Kriisit ja suru" : "Crises and grief",
    self_esteem_identity: locale === "fi" ? "Itsetunto ja identiteetti" : "Self-esteem and identity",
    academic_pressure: locale === "fi" ? "Opiskelu ja suoriutuspaineet" : "Academic and performance pressure",
  };

  return labels[value] ?? value;
}

function buildRecommendationText(reasons: string[], therapist: TherapistCapabilityProfile, locale: Locale) {
  if (locale === "fi") {
    if (reasons.length === 0) {
      return `${therapist.profile.base.displayName} tuntuu harkitulta vaihtoehdolta, koska profiilin käytännöt, kieli ja työskentelytapa näyttävät sopivan hyvin yhteen vastaustesi kanssa.`;
    }

    return `${therapist.profile.base.displayName} nousee esiin erityisesti siksi, että ${reasons.join(", ").toLowerCase()}. ${therapist.localizedIntro || therapist.localizedApproach}`;
  }

  if (reasons.length === 0) {
    return `${therapist.profile.base.displayName} stands out as a thoughtful option because their language, practical setup, and way of working fit well with what you described.`;
  }

  return `${therapist.profile.base.displayName} rises because ${reasons.join(", ").toLowerCase()}. ${therapist.localizedIntro || therapist.localizedApproach}`;
}

export function matchRecommendations(params: {
  quizId: QuizId;
  answers: QuizAnswers;
  locale: Locale;
  therapists: TherapistProfileRecord[];
}) {
  const client = normalizeClientAnswers(params.quizId, params.answers);

  const scored = params.therapists
    .map((profile) => normalizeTherapistProfile(profile, params.locale))
    .filter((therapist) => !hasHardMismatch(client, therapist))
    .map((therapist): MatchResult => {
      let score = 0;

      if (client.preferredLanguage && therapist.languages.includes(client.preferredLanguage)) {
        score += MATCH_WEIGHTS.language;
      }

      const specializationOverlap = getConcernOverlap(client, therapist);
      score += Math.min(specializationOverlap.length * 12, MATCH_WEIGHTS.concerns);

      let practical = 0;
      practical += scoreBudget(client, therapist);
      if (client.sessionFrequency && therapist.frequency === client.sessionFrequency) practical += 5;
      if (client.sessionFormat === null || client.sessionFormat === "either") practical += 3;
      else if (therapist.sessionFormats.includes(client.sessionFormat) || therapist.sessionFormats.includes("both")) practical += 5;
      if (client.kelaNeed === "preferred" && therapist.kelaApproved) practical += 5;
      if (therapist.profile.availability.availabilitySummary) practical += 2;
      score += Math.min(practical, MATCH_WEIGHTS.practical);

      score += Math.min(scoreStyle(client, therapist), MATCH_WEIGHTS.style);

      let experience = 0;
      if (client.experienceNeed === "experienced" && (therapist.yearsExperience ?? 0) >= 10) experience += 6;
      else if (client.experienceNeed === "experienced" && (therapist.yearsExperience ?? 0) >= 6) experience += 4;
      if (client.historyNeedsCare && therapist.supportsNegativeTherapyExperience) experience += 4;
      score += Math.min(experience, MATCH_WEIGHTS.experience);

      if (!client.preferredGender || client.preferredGender === therapist.genderIdentity) {
        score += MATCH_WEIGHTS.identity;
      }

      score += Math.min(scoreTextNuance(client, therapist), MATCH_WEIGHTS.nuance);

      const reasons = buildReasons(client, therapist);
      const tags = [
        ...specializationOverlap.slice(0, 2).map((item) => formatConcernTag(item, params.locale)),
        ...(client.preferredLanguage
          ? [client.preferredLanguage === "finnish" ? (params.locale === "fi" ? "Suomi" : "Finnish") : client.preferredLanguage === "swedish" ? (params.locale === "fi" ? "Ruotsi" : "Swedish") : "English"]
          : []),
        ...((therapist.yearsExperience ?? 0) >= 10
          ? [params.locale === "fi" ? "Kokenut työote" : "Experienced practitioner"]
          : []),
      ].slice(0, 3);

      return {
        score,
        recommendation: {
          name: therapist.profile.base.displayName,
          title: therapist.profile.base.title,
          availability:
            therapist.profile.availability.availabilitySummary ||
            (params.locale === "fi" ? "Ottaa uusia asiakkaita" : "Accepting new clients"),
          reason: buildRecommendationText(reasons, therapist, params.locale),
          tags,
          bookingUrl: therapist.profile.base.bookingUrl || undefined,
          contactDetail: therapist.contactDetail || therapist.profile.email,
          headshotUrl: therapist.profile.base.headshotUrl || undefined,
          introVideoUrl: therapist.profile.base.introVideoUrl || undefined,
          score,
        },
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((entry) => entry.recommendation);
}
