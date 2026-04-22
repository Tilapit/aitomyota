import { getSupabaseClient } from "../lib/supabase";
import type { UserRole } from "../types/auth";

const LOCAL_USER_ROLES_KEY = "local-user-roles";

type LocalRoleMap = Record<string, UserRole[]>;

function readLocalRoleMap(): LocalRoleMap {
  const raw = window.localStorage.getItem(LOCAL_USER_ROLES_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as LocalRoleMap;
  } catch {
    return {};
  }
}

function writeLocalRoleMap(roleMap: LocalRoleMap) {
  window.localStorage.setItem(LOCAL_USER_ROLES_KEY, JSON.stringify(roleMap));
}

export function listLocalUserRoles(userId: string | null | undefined): UserRole[] {
  if (!userId) {
    return [];
  }

  return readLocalRoleMap()[userId] ?? [];
}

export async function listUserRoles(userId: string): Promise<UserRole[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return listLocalUserRoles(userId);
  }

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return (data ?? []).map((entry) => entry.role as UserRole);
}

export async function ensureUserRole(userId: string, role: UserRole) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const roleMap = readLocalRoleMap();
    const existing = roleMap[userId] ?? [];
    if (!existing.includes(role)) {
      roleMap[userId] = [...existing, role];
      writeLocalRoleMap(roleMap);
    }
    return;
  }

  const { error } = await supabase
    .from("user_roles")
    .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });

  if (error) {
    throw error;
  }
}
