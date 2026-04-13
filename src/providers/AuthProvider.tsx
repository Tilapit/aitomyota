import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient, hasSupabaseEnv } from "../lib/supabase";
import { AuthContext, type AuthContextValue } from "./auth-context";

const LOCAL_AUTH_USERS_KEY = "local-therapist-auth-users";
const LOCAL_AUTH_SESSION_KEY = "local-therapist-auth-session";

type LocalUserRecord = {
  id: string;
  email: string;
  password: string;
  displayName: string;
};

function readLocalUsers() {
  const raw = window.localStorage.getItem(LOCAL_AUTH_USERS_KEY);
  if (!raw) {
    return [] as LocalUserRecord[];
  }

  try {
    return JSON.parse(raw) as LocalUserRecord[];
  } catch {
    return [];
  }
}

function writeLocalUsers(users: LocalUserRecord[]) {
  window.localStorage.setItem(LOCAL_AUTH_USERS_KEY, JSON.stringify(users));
}

function toLocalUser(record: LocalUserRecord): User {
  return {
    id: record.id,
    email: record.email,
    app_metadata: {},
    user_metadata: { display_name: record.displayName },
    aud: "authenticated",
    created_at: new Date().toISOString(),
  } as User;
}

function readLocalSession(): User | null {
  const raw = window.localStorage.getItem(LOCAL_AUTH_SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [localUser, setLocalUser] = useState<User | null>(() =>
    hasSupabaseEnv ? null : readLocalSession(),
  );
  const [loading, setLoading] = useState(hasSupabaseEnv);

  useEffect(() => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpWithPassword = async ({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const users = readLocalUsers();
      if (users.some((user) => user.email === email)) {
        return { error: "An account with this email already exists." };
      }

      const record = {
        id: crypto.randomUUID(),
        email,
        password,
        displayName,
      };
      users.push(record);
      writeLocalUsers(users);
      const user = toLocalUser(record);
      window.localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify(user));
      setLocalUser(user);
      return {};
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });

    if (data.session) {
      setSession(data.session);
    }

    return error ? { error: error.message } : {};
  };

  const signInWithPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const user = readLocalUsers().find(
        (candidate) => candidate.email === email && candidate.password === password,
      );

      if (!user) {
        return { error: "Could not find a matching local therapist account." };
      }

      const nextUser = toLocalUser(user);
      window.localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify(nextUser));
      setLocalUser(nextUser);
      return {};
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (data.session) {
      setSession(data.session);
    }

    return error ? { error: error.message } : {};
  };

  const sendMagicLink = async (email: string) => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const existing = readLocalUsers().find((user) => user.email === email);
      if (!existing) {
        const created = {
          id: crypto.randomUUID(),
          email,
          password: "",
          displayName: email.split("@")[0],
        };
        writeLocalUsers([...readLocalUsers(), created]);
        const nextUser = toLocalUser(created);
        window.localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify(nextUser));
        setLocalUser(nextUser);
      } else {
        const nextUser = toLocalUser(existing);
        window.localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify(nextUser));
        setLocalUser(nextUser);
      }

      return {};
    }

    const { error } = await supabase.auth.signInWithOtp({ email });
    return error ? { error: error.message } : {};
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      window.localStorage.removeItem(LOCAL_AUTH_SESSION_KEY);
      setLocalUser(null);
      return;
    }

    await supabase.auth.signOut();
    setSession(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? localUser ?? null,
      loading,
      configured: hasSupabaseEnv,
      signUpWithPassword,
      signInWithPassword,
      sendMagicLink,
      signOut,
    }),
    [loading, localUser, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
