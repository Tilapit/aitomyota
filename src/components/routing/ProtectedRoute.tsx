import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { routePaths } from "../../lib/routes";
import type { Locale } from "../../types/app";
import type { UserRole } from "../../types/auth";

type ProtectedRouteProps = {
  locale: Locale;
  children: ReactElement;
  redirectTo?: string;
  requiredRole?: UserRole;
  missingRoleRedirectTo?: string;
};

export default function ProtectedRoute({
  locale,
  children,
  redirectTo,
  requiredRole,
  missingRoleRedirectTo,
}: ProtectedRouteProps) {
  const { user, loading, hasRole } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[color:var(--cream)]" />;
  }

  if (!user) {
    return <Navigate to={redirectTo ?? routePaths.therapistAuth(locale)} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={missingRoleRedirectTo ?? routePaths.clientHome(locale)} replace />;
  }

  return children;
}
