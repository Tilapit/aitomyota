import type { Locale } from "../../types/app";
import type { TherapistQuizAnswers } from "../../types/therapist";

export type TherapistOnboardingDraft = {
  locale: Locale;
  answers: TherapistQuizAnswers;
  completedAt: string;
};

const DRAFT_KEY = "therapist-onboarding-draft";

export function saveTherapistOnboardingDraft(draft: TherapistOnboardingDraft) {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function readTherapistOnboardingDraft(): TherapistOnboardingDraft | null {
  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as TherapistOnboardingDraft;
  } catch {
    return null;
  }
}

export function clearTherapistOnboardingDraft() {
  window.localStorage.removeItem(DRAFT_KEY);
}
