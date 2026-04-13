import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { routePaths } from "../../lib/routes";
import type { Locale } from "../../types/app";

type ProtectedRouteProps = {
  locale: Locale;
  children: ReactElement;
};

export default function ProtectedRoute({ locale, children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[color:var(--cream)]" />;
  }

  if (!user) {
    return <Navigate to={routePaths.therapistAuth(locale)} replace />;
  }

  return children;
}
