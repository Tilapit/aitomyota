import { createContext } from "react";
import type { Session, User } from "@supabase/supabase-js";
import type { UserRole } from "../types/auth";

export type AuthContextValue = {
  session: Session | null;
  user: User | null;
  roles: UserRole[];
  loading: boolean;
  configured: boolean;
  hasRole: (role: UserRole) => boolean;
  refreshRoles: () => Promise<void>;
  signUpWithPassword: (params: {
    email: string;
    password: string;
    displayName: string;
    emailRedirectTo?: string;
  }) => Promise<{ error?: string }>;
  signInWithPassword: (params: { email: string; password: string }) => Promise<{ error?: string }>;
  sendMagicLink: (email: string, shouldCreateUser?: boolean, emailRedirectTo?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
