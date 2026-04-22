import type { Locale } from "../../types/app";
import type { QuizAnswers, QuizId, Recommendation } from "../quiz/quizData";

export type SavedClientResult = {
  id: string;
  locale: Locale;
  quizId: QuizId;
  savedAt: string;
  answers: QuizAnswers;
  recommendations: Recommendation[];
};

const STORAGE_KEY = "client-saved-results";
const PENDING_KEY = "client-pending-result";

function readResults() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [] as SavedClientResult[];
  }

  try {
    return JSON.parse(raw) as SavedClientResult[];
  } catch {
    return [];
  }
}

function writeResults(results: SavedClientResult[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function listSavedClientResults() {
  return readResults().sort((a, b) => (a.savedAt < b.savedAt ? 1 : -1));
}

export function saveClientResult(input: Omit<SavedClientResult, "id" | "savedAt">) {
  const results = readResults();
  const next: SavedClientResult = {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    ...input,
  };
  results.unshift(next);
  writeResults(results);
  return next;
}

export function deleteSavedClientResult(id: string) {
  writeResults(readResults().filter((result) => result.id !== id));
}

export function savePendingClientResult(result: Omit<SavedClientResult, "id" | "savedAt">) {
  window.localStorage.setItem(PENDING_KEY, JSON.stringify(result));
}

export function readPendingClientResult() {
  const raw = window.localStorage.getItem(PENDING_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Omit<SavedClientResult, "id" | "savedAt">;
  } catch {
    return null;
  }
}

export function clearPendingClientResult() {
  window.localStorage.removeItem(PENDING_KEY);
}
