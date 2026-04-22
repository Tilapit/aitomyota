import { getSupabaseClient } from "../lib/supabase";
import { ensureUserRole } from "./userRolesRepository";
import {
  clearPendingClientResult,
  deleteSavedClientResult as deleteLocalSavedClientResult,
  listSavedClientResults,
  readPendingClientResult,
  saveClientResult,
  type SavedClientResult,
} from "../features/clientResults/storage";

export async function saveClientResultForUser(params: {
  userId: string;
  email: string;
  displayName?: string;
  result: Omit<SavedClientResult, "id" | "savedAt">;
}) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    await ensureUserRole(params.userId, "client");
    return saveClientResult(params.result);
  }

  await ensureUserRole(params.userId, "client");

  await supabase.from("client_profiles").upsert({
    id: params.userId,
    email: params.email,
    display_name: params.displayName ?? "",
  });

  const { data, error } = await supabase
    .from("client_saved_results")
    .insert({
      client_id: params.userId,
      locale: params.result.locale,
      quiz_id: params.result.quizId,
      answers_json: params.result.answers,
      recommendations_json: params.result.recommendations,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    locale: data.locale,
    quizId: data.quiz_id,
    answers: data.answers_json as SavedClientResult["answers"],
    recommendations: data.recommendations_json as SavedClientResult["recommendations"],
    savedAt: data.created_at,
  } satisfies SavedClientResult;
}

export async function syncPendingClientResult(params: {
  userId: string;
  email: string;
  displayName?: string;
}) {
  const pending = readPendingClientResult();
  if (!pending) {
    return null;
  }

  const saved = await saveClientResultForUser({
    userId: params.userId,
    email: params.email,
    displayName: params.displayName,
    result: pending,
  });
  clearPendingClientResult();
  return saved;
}

export async function listClientResultsForUser(userId: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return listSavedClientResults();
  }

  const { data, error } = await supabase
    .from("client_saved_results")
    .select("*")
    .eq("client_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    locale: row.locale,
    quizId: row.quiz_id,
    answers: row.answers_json as SavedClientResult["answers"],
    recommendations: row.recommendations_json as SavedClientResult["recommendations"],
    savedAt: row.created_at,
  })) satisfies SavedClientResult[];
}

export async function deleteClientResultForUser(params: { userId: string; resultId: string }) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    deleteLocalSavedClientResult(params.resultId);
    return;
  }

  const { error } = await supabase
    .from("client_saved_results")
    .delete()
    .eq("client_id", params.userId)
    .eq("id", params.resultId);

  if (error) {
    throw error;
  }
}
