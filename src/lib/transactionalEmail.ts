import { getSupabaseClient } from "./supabase";
import type { TransactionalEmailPayload, TransactionalEmailResult } from "../types/email";

export async function sendTransactionalEmail(payload: TransactionalEmailPayload) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.functions.invoke<TransactionalEmailResult>("send-transactional-email", {
    body: payload,
  });

  if (error) {
    throw error;
  }

  return data;
}
