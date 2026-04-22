import { getSupabaseClient } from "./supabase";
import type { TherapistLocalizationFields } from "../types/therapist";

export async function prefillFinnishContent(
  english: TherapistLocalizationFields,
): Promise<TherapistLocalizationFields> {
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data } = await supabase.functions.invoke("prefill-fi", {
      body: english,
    });

    if (data) {
      return data as TherapistLocalizationFields;
    }
  }

  return {
    shortIntro: english.shortIntro,
    bio: english.bio,
    approachSummary: english.approachSummary,
    freeTextPublicAnswers: Object.fromEntries(
      Object.entries(english.freeTextPublicAnswers).map(([key, value]) => [key, value]),
    ),
  };
}
