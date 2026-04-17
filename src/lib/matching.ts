import { getSupabaseClient } from "./supabase";
import type { QuizAnswers as RawAnswers } from "../features/quiz/quizData";

export interface MatchingInput {
  primaryConcern: "arki_tyo" | "yksi_asia" | "iso_muutos" | "epaselva";
  concernDetail?: string;
  therapistApproach: "calm" | "honest" | "warm" | "structured";
  workStyle: number;
  interactionStyle: "relaxed" | "structured" | "either";
  experiencePreference: "any" | "some" | "experienced" | "senior";
  genderPreference: "Nainen" | "Mies" | "Muunsukupuolinen" | "any";
  priceRange: "under80" | "80to120" | "120to160" | "any";
  kelaRequired: boolean;
  sessionFormat: "remote" | "inperson" | "either";
  frequency: "weekly" | "biweekly" | "monthly" | "any";
  pace: "slow" | "goaloriented" | "either";
  location?: string;
  previousNegative: boolean;
}

export interface MatchResult {
  id: string;
  name: string;
  bio: string;
  location: string;
  price_min: number;
  price_max: number;
  session_format: string;
  approach: string;
  education: string;
  work_focus: string;
  years_experience: number;
  spec_stress: boolean;
  spec_anxiety: boolean;
  spec_depression: boolean;
  spec_selfesteem: boolean;
  spec_relationships: boolean;
  spec_crisis: boolean;
  spec_performance: boolean;
  spec_neuro: boolean;
  spec_parenting: boolean;
  score: number;
  scoreBreakdown: {
    specializations: number;
    approach: number;
    workStyle: number;
    pace: number;
    price: number;
    format: number;
    frequency: number;
    negativeExperience: number;
  };
  whyMatch: string;
}

type TherapistRow = {
  id: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  price_min: number | null;
  price_max: number | null;
  gender: string | null;
  kela: boolean | null;
  session_format: string | null;
  approach: string | null;
  work_style: number | null;
  interaction_style: number | null;
  work_pace: number | null;
  frequency: string | null;
  negative_experience: string | null;
  education: string | null;
  work_focus: string | null;
  years_experience: number | null;
  status: string | null;
  spec_stress: boolean | null;
  spec_anxiety: boolean | null;
  spec_depression: boolean | null;
  spec_selfesteem: boolean | null;
  spec_relationships: boolean | null;
  spec_crisis: boolean | null;
  spec_performance: boolean | null;
  spec_neuro: boolean | null;
  spec_parenting: boolean | null;
};

const specializationMap: Record<string, Partial<Record<string, number>>> = {
  arki_tyo: {
    spec_stress: 3,
    spec_selfesteem: 1,
    spec_performance: 1,
    spec_neuro: 0.5,
  },
  yksi_asia_ihmissuhde: {
    spec_relationships: 3,
    spec_selfesteem: 1,
    spec_crisis: 1,
  },
  yksi_asia_tyo: {
    spec_stress: 3,
    spec_performance: 2,
    spec_selfesteem: 1,
  },
  yksi_asia_menetys: {
    spec_crisis: 3,
    spec_relationships: 1,
  },
  yksi_asia_identiteetti: {
    spec_selfesteem: 3,
    spec_anxiety: 1,
  },
  iso_muutos: {
    spec_crisis: 3,
    spec_relationships: 2,
    spec_selfesteem: 1,
    spec_parenting: 0.5,
  },
  epaselva_alakulo: {
    spec_depression: 3,
    spec_anxiety: 1,
    spec_selfesteem: 1,
  },
  epaselva_huoli: {
    spec_anxiety: 3,
    spec_depression: 1,
  },
  epaselva_yksinaisyys: {
    spec_relationships: 3,
    spec_selfesteem: 2,
    spec_depression: 1,
  },
  epaselva: {
    spec_depression: 1,
    spec_anxiety: 1,
    spec_selfesteem: 1,
  },
};

function passesHardFilters(t: TherapistRow, a: MatchingInput): boolean {
  if (a.genderPreference !== "any" && t.gender !== a.genderPreference) return false;
  if (a.kelaRequired && !t.kela) return false;
  if (a.priceRange === "under80" && (t.price_min ?? 0) > 80) return false;
  if (a.priceRange === "80to120" && (t.price_min ?? 0) > 120) return false;
  if (a.priceRange === "120to160" && (t.price_min ?? 0) > 160) return false;
  if (a.sessionFormat === "remote" && t.session_format === "Vain kasvotusten") return false;
  if (a.sessionFormat === "inperson" && t.session_format === "Vain etäyhteys") return false;
  return true;
}

type ScoreBreakdown = MatchResult["scoreBreakdown"];

function calculateScore(
  t: TherapistRow,
  a: MatchingInput,
): { score: number; scoreBreakdown: ScoreBreakdown } {
  // 1. Specializations (max 25p)
  const concernKey =
    a.primaryConcern === "yksi_asia" && a.concernDetail
      ? `yksi_asia_${a.concernDetail}`
      : a.primaryConcern === "epaselva" && a.concernDetail
        ? `epaselva_${a.concernDetail}`
        : a.primaryConcern;

  const weights =
    specializationMap[concernKey] ?? specializationMap[a.primaryConcern] ?? {};
  let specSum = 0;
  let maxSpec = 0;
  const tRecord = t as Record<string, unknown>;
  for (const [spec, weight] of Object.entries(weights)) {
    if (weight && weight > 0) {
      maxSpec += weight;
      if (tRecord[spec] === true) specSum += weight;
    }
  }
  const specializations = maxSpec > 0 ? Math.round((specSum / maxSpec) * 25) : 0;

  // 2. Approach (max 20p)
  let approach = 0;
  const therapistApproach = t.approach ?? "";
  if (a.therapistApproach === "calm" && therapistApproach === "Rauhallinen ja lempeä") approach = 20;
  else if (a.therapistApproach === "honest" && therapistApproach === "Rehellinen ja suora") approach = 20;
  else if (a.therapistApproach === "warm" && therapistApproach === "Lämmin ja rohkaiseva") approach = 20;
  else if (a.therapistApproach === "structured") {
    if (therapistApproach === "Rehellinen ja suora") approach = 12;
    else if (therapistApproach === "Lämmin ja rohkaiseva") approach = 8;
  }

  // 3. Work style (max 15p)
  const styleDiff = Math.abs(a.workStyle - (t.work_style ?? 3));
  const workStyle = Math.max(0, 15 - styleDiff * 3);

  // 4. Pace (max 12p)
  const wp = t.work_pace ?? 3;
  let pace = 0;
  if (a.pace === "either") {
    pace = 12;
  } else if (a.pace === "slow") {
    if (wp <= 2) pace = 12;
    else if (wp === 3) pace = 6;
  } else {
    // goaloriented
    if (wp >= 4) pace = 12;
    else if (wp === 3) pace = 6;
  }

  // 5. Price (max 10p)
  const pm = t.price_min ?? 0;
  let price = 0;
  if (a.priceRange === "any") price = 10;
  else if (a.priceRange === "under80") {
    if (pm <= 80) price = 10;
    else if (pm <= 100) price = 5;
  } else if (a.priceRange === "80to120") {
    if (pm <= 120) price = 10;
    else if (pm <= 140) price = 5;
  } else {
    // 120to160
    if (pm <= 160) price = 10;
    else if (pm <= 180) price = 5;
  }

  // 6. Format (max 8p)
  const sf = t.session_format ?? "";
  let format = 0;
  if (a.sessionFormat === "either") format = 8;
  else if (
    a.sessionFormat === "remote" &&
    (sf === "Vain etäyhteys" || sf === "Sekä etä että kasvotusten")
  )
    format = 8;
  else if (
    a.sessionFormat === "inperson" &&
    (sf === "Vain kasvotusten" || sf === "Sekä etä että kasvotusten")
  )
    format = 8;

  // 7. Frequency (max 7p)
  const freq = t.frequency ?? "";
  let frequency = 0;
  if (a.frequency === "any") frequency = 7;
  else if (a.frequency === "weekly" && freq === "Tiivis (kerran viikossa)") frequency = 7;
  else if (a.frequency === "biweekly" && freq === "Joustava (pari kertaa kuussa)") frequency = 7;
  else frequency = 3;

  // 8. Negative experience (max 3p)
  const ne = t.negative_experience ?? "";
  let negativeExperience = 0;
  if (!a.previousNegative) {
    negativeExperience = 3;
  } else if (ne.includes("Kyllä") || ne.includes("Olen työskennellyt")) {
    negativeExperience = 3;
  }

  const score =
    specializations +
    approach +
    workStyle +
    pace +
    price +
    format +
    frequency +
    negativeExperience;

  return {
    score,
    scoreBreakdown: {
      specializations,
      approach,
      workStyle,
      pace,
      price,
      format,
      frequency,
      negativeExperience,
    },
  };
}

function generateWhyMatch(
  therapist: TherapistRow,
  _answers: MatchingInput,
  bd: ScoreBreakdown,
): string {
  const reasons: string[] = [];

  if (bd.approach === 20) {
    const approachLabel = (therapist.approach ?? "").toLowerCase();
    reasons.push(
      `Työskentelytyylisi kohtaavat — ${therapist.name ?? "hän"} on ${approachLabel}.`,
    );
  }

  if (bd.specializations >= 20) {
    reasons.push("Hänellä on vahva kokemus juuri sinulle tärkeistä teemoista.");
  }

  if (reasons.length < 2 && bd.workStyle >= 12) {
    reasons.push("Työskentelyotteenne sopii yhteen hyvin.");
  }

  if (reasons.length < 2 && bd.pace >= 12) {
    reasons.push("Etenemistahti vastaa toiveitasi.");
  }

  if (reasons.length === 0) {
    reasons.push("Hän sopii hyvin toiveisiisi.");
  }

  return reasons.slice(0, 2).join(" ");
}

export function mapQuizToMatchingInput(rawAnswers: RawAnswers): MatchingInput {
  const get = (key: string): string | undefined => {
    const v = rawAnswers[key];
    return typeof v === "string" ? v : undefined;
  };

  const q1 = get("q1");
  const primaryConcernMap: Record<string, MatchingInput["primaryConcern"]> = {
    a: "arki_tyo",
    b: "yksi_asia",
    c: "iso_muutos",
    d: "epaselva",
  };
  const primaryConcern: MatchingInput["primaryConcern"] =
    primaryConcernMap[q1 ?? ""] ?? "epaselva";

  const q1b = get("q1b");
  const concernDetailFromB: Record<string, string> = {
    a: "ihmissuhde",
    b: "tyo",
    c: "menetys",
    d: "identiteetti",
    e: "muu",
  };
  const q1c = get("q1c");
  const concernDetailFromC: Record<string, string> = {
    a: "alakulo",
    b: "huoli",
    c: "yksinaisyys",
  };
  const concernDetail = q1b
    ? concernDetailFromB[q1b]
    : q1c
      ? concernDetailFromC[q1c]
      : undefined;

  const approachMap: Record<string, MatchingInput["therapistApproach"]> = {
    a: "calm",
    b: "honest",
    c: "warm",
    d: "structured",
  };
  const therapistApproach: MatchingInput["therapistApproach"] =
    approachMap[get("q3") ?? ""] ?? "warm";

  const workStyle = Number(get("q4") ?? "3");

  const styleMap: Record<string, MatchingInput["interactionStyle"]> = {
    a: "relaxed",
    b: "structured",
    c: "either",
  };
  const interactionStyle: MatchingInput["interactionStyle"] =
    styleMap[get("q5") ?? ""] ?? "either";

  const expMap: Record<string, MatchingInput["experiencePreference"]> = {
    a: "any",
    b: "some",
    c: "experienced",
    d: "senior",
  };
  const experiencePreference: MatchingInput["experiencePreference"] =
    expMap[get("q6") ?? ""] ?? "any";

  const genderMap: Record<string, MatchingInput["genderPreference"]> = {
    a: "Nainen",
    b: "Mies",
    c: "Muunsukupuolinen",
    d: "any",
  };
  const genderPreference: MatchingInput["genderPreference"] =
    genderMap[get("q7") ?? ""] ?? "any";

  const priceMap: Record<string, MatchingInput["priceRange"]> = {
    a: "under80",
    b: "80to120",
    c: "120to160",
    d: "any",
  };
  const priceRange: MatchingInput["priceRange"] =
    priceMap[get("q8") ?? ""] ?? "any";

  const kelaRequired = get("q9") === "a";

  const paceMap: Record<string, MatchingInput["pace"]> = {
    a: "slow",
    b: "goaloriented",
    c: "either",
  };
  const pace: MatchingInput["pace"] = paceMap[get("pq5") ?? ""] ?? "either";

  const freqMap: Record<string, MatchingInput["frequency"]> = {
    a: "weekly",
    b: "biweekly",
    c: "monthly",
    d: "any",
  };
  const frequency: MatchingInput["frequency"] =
    freqMap[get("pq6") ?? ""] ?? "any";

  const formatMap: Record<string, MatchingInput["sessionFormat"]> = {
    a: "remote",
    b: "inperson",
    c: "either",
  };
  const sessionFormat: MatchingInput["sessionFormat"] =
    formatMap[get("q10") ?? ""] ?? "either";

  const location = get("q10b");

  const previousNegative = get("pq7") === "c";

  return {
    primaryConcern,
    concernDetail,
    therapistApproach,
    workStyle,
    interactionStyle,
    experiencePreference,
    genderPreference,
    priceRange,
    kelaRequired,
    sessionFormat,
    frequency,
    pace,
    location,
    previousNegative,
  };
}

export async function matchTherapists(
  answers: MatchingInput,
): Promise<MatchResult[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("professionals")
    .select("*")
    .eq("status", "approved");

  if (error || !data) return [];

  const results: MatchResult[] = (data as TherapistRow[])
    .filter((t) => passesHardFilters(t, answers))
    .map((t) => {
      const scored = calculateScore(t, answers);
      return {
        ...scored,
        id: t.id,
        name: t.name ?? "",
        bio: t.bio ?? "",
        location: t.location ?? "",
        price_min: t.price_min ?? 0,
        price_max: t.price_max ?? 0,
        session_format: t.session_format ?? "",
        approach: t.approach ?? "",
        education: t.education ?? "",
        work_focus: t.work_focus ?? "",
        years_experience: t.years_experience ?? 0,
        spec_stress: t.spec_stress ?? false,
        spec_anxiety: t.spec_anxiety ?? false,
        spec_depression: t.spec_depression ?? false,
        spec_selfesteem: t.spec_selfesteem ?? false,
        spec_relationships: t.spec_relationships ?? false,
        spec_crisis: t.spec_crisis ?? false,
        spec_performance: t.spec_performance ?? false,
        spec_neuro: t.spec_neuro ?? false,
        spec_parenting: t.spec_parenting ?? false,
        whyMatch: generateWhyMatch(t, answers, scored.scoreBreakdown),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  console.log(
    "Matching results:",
    results.map((r) => ({
      name: r.name,
      score: r.score,
      breakdown: r.scoreBreakdown,
    })),
  );

  return results;
}
