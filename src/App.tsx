import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import i18n from "./lib/i18n";
import { detectPreferredLocale, persistLocale } from "./lib/locale";
import { isLocale } from "./types/app";
import ProtectedRoute from "./components/routing/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const TherapistLandingPage = lazy(() => import("./pages/TherapistLandingPage"));
const TherapistQuizPage = lazy(() => import("./pages/TherapistQuizPage"));
const TherapistAuthPage = lazy(() => import("./pages/TherapistAuthPage"));
const TherapistDashboardPage = lazy(() => import("./pages/TherapistDashboardPage"));

function RouteFallback() {
  return (
    <div className="min-h-screen bg-[color:var(--cream)] px-6 py-16 sm:px-10 lg:px-[72px]">
      <div className="page-shell-tight">
        <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(30,22,16,0.06)]">
          <div className="s-label">Loading</div>
          <p className="mt-3 text-[15px] leading-7 text-[color:var(--ink-mid)]">
            Preparing the next page.
          </p>
        </div>
      </div>
    </div>
  );
}

function LocaleBoundary() {
  const { locale } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (!isLocale(locale)) {
    return <Navigate to="/en" replace />;
  }

  persistLocale(locale);
  void i18n.changeLanguage(locale);

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="quiz/long" element={<QuizPage />} />
        <Route path="for-therapists" element={<TherapistLandingPage />} />
        <Route path="for-therapists/quiz" element={<TherapistQuizPage />} />
        <Route path="therapist/auth" element={<TherapistAuthPage />} />
        <Route
          path="therapist/dashboard"
          element={
            <ProtectedRoute locale={locale}>
              <TherapistDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${detectPreferredLocale()}`} replace />} />
      <Route path="/:locale/*" element={<LocaleBoundary />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}
