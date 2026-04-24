import type { TherapistQuizAnswers } from "../../types/therapist";

const STORAGE_KEY = "myota_therapist_quiz_answers";

// Module-level flag — persists across React Strict Mode remounts, resets on page reload.
// This prevents duplicate Supabase inserts when React mounts/unmounts the dashboard twice in dev.
let insertAttempted = false;

export function savePendingQuizAnswers(answers: TherapistQuizAnswers): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // Safari private mode may block localStorage writes; fail silently.
  }
}

export function readPendingQuizAnswers(): TherapistQuizAnswers | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TherapistQuizAnswers;
  } catch {
    return null;
  }
}

export function clearPendingQuizAnswers(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function markPendingInsertAttempted(): void {
  insertAttempted = true;
}

export function resetPendingInsertAttempted(): void {
  insertAttempted = false;
}

export function hasPendingInsertBeenAttempted(): boolean {
  return insertAttempted;
}
