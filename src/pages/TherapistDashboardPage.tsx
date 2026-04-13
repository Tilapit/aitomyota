import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { useAuth } from "../hooks/useAuth";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { routePaths } from "../lib/routes";
import { getTherapistProfile, saveTherapistProfile } from "../repositories/therapistRepository";
import type { TherapistProfileRecord } from "../types/therapist";

export default function TherapistDashboardPage() {
  const locale = useCurrentLocale();
  const { t } = useTranslation("dashboard-therapist");
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<TherapistProfileRecord | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [dirty, setDirty] = useState(false);

  const updateProfile = (updater: (current: TherapistProfileRecord) => TherapistProfileRecord) => {
    setProfile((current) => (current ? updater(current) : current));
    setDirty(true);
    setSaveState("saving");
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    void getTherapistProfile(user.id).then((record) => {
      if (record) {
        setProfile(record);
      }
    });
  }, [user]);

  useEffect(() => {
    if (!profile || !dirty) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveTherapistProfile(profile)
        .then((next) => {
          setProfile(next);
          setDirty(false);
          setSaveState("saved");
        })
        .catch(() => setSaveState("error"));
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [dirty, profile]);

  const freeTextEntries = useMemo(
    () => Object.entries(profile?.quizAnswers ?? {}).filter(([, value]) => typeof value === "string"),
    [profile?.quizAnswers],
  );

  if (!profile) {
    return <div className="min-h-screen bg-[color:var(--cream)]" />;
  }

  return (
    <div className="min-h-screen bg-[color:var(--cream)] px-6 py-10 sm:px-10 lg:px-[72px]">
      <div className="page-shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to={routePaths.therapistLanding(locale)} className="flex items-center text-[color:var(--ink)]">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <span className="text-sm text-[color:var(--ink-light)]">
              {saveState === "saving"
                ? t("saveState.saving")
                : saveState === "saved"
                  ? t("saveState.saved")
                  : saveState === "error"
                    ? t("saveState.error")
                    : ""}
            </span>
            <button type="button" className="bk-btn outline !w-auto !px-6" onClick={() => void signOut()}>
              {t("actions.signOut")}
            </button>
          </div>
        </div>
        <div className="mt-10">
          <div className="s-label">{t("title")}</div>
          <h1 className="max-w-full text-[clamp(34px,4vw,56px)] leading-[1.04]">{profile.base.displayName}</h1>
          <p className="mt-4 max-w-[720px] text-[16px] leading-8 text-[color:var(--ink-mid)]">{t("description")}</p>
        </div>
        <div className="mt-10 grid gap-6">
          <section className="rounded-[30px] bg-white p-8 shadow-[0_20px_60px_rgba(30,22,16,0.05)]">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="max-w-full text-[28px]">{t("sections.profile")}</h2>
              <label className="inline-flex items-center gap-2 text-sm text-[color:var(--ink-mid)]">
                <input
                  type="checkbox"
                  checked={profile.base.published}
                  onChange={(event) =>
                    updateProfile((current) => ({
                      ...current,
                      base: { ...current.base, published: event.target.checked },
                    }))
                  }
                />
                {profile.base.published ? t("publish") : t("unpublish")}
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                [t("fields.displayName"), profile.base.displayName, "displayName"],
                [t("fields.title"), profile.base.title, "title"],
                [t("fields.introVideoUrl"), profile.base.introVideoUrl, "introVideoUrl"],
                [t("fields.headshotUrl"), profile.base.headshotUrl, "headshotUrl"],
                [t("fields.bookingUrl"), profile.base.bookingUrl, "bookingUrl"],
              ].map(([label, value, key]) => (
                <label key={String(key)} className="grid gap-2 text-sm text-[color:var(--ink-mid)]">
                  <span>{label}</span>
                  <input
                    value={String(value)}
                    onChange={(event) =>
                      updateProfile((current) => ({
                        ...current,
                        base: { ...current.base, [key]: event.target.value },
                      }))
                    }
                    className="rounded-[14px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-4 py-3"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-white p-8 shadow-[0_20px_60px_rgba(30,22,16,0.05)]">
            <h2 className="max-w-full text-[28px]">{t("sections.localized")}</h2>
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              {(["en", "fi"] as const).map((language) => (
                <div key={language} className="space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--terra)]">
                    {language === "en" ? t("headings.english") : t("headings.finnish")}
                  </div>
                  {[
                    ["shortIntro", t("fields.shortIntro")],
                    ["bio", t("fields.bio")],
                    ["approachSummary", t("fields.approachSummary")],
                  ].map(([field, label]) => (
                    <label key={field} className="grid gap-2 text-sm text-[color:var(--ink-mid)]">
                      <span>{label}</span>
                      <textarea
                        rows={4}
                        value={profile.localizations[language][field as keyof typeof profile.localizations.en] as string}
                        onChange={(event) =>
                          updateProfile((current) => ({
                            ...current,
                            localizations: {
                              ...current.localizations,
                              [language]: {
                                ...current.localizations[language],
                                [field]: event.target.value,
                              },
                            },
                          }))
                        }
                        className="rounded-[14px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-4 py-3"
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-white p-8 shadow-[0_20px_60px_rgba(30,22,16,0.05)]">
            <h2 className="max-w-full text-[28px]">{t("sections.availability")}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["availabilitySummary", t("fields.availabilitySummary")],
                ["sessionTimes", t("fields.sessionTimes")],
                ["responseTimeNote", t("fields.responseTimeNote")],
                ["timezone", t("fields.timezone")],
              ].map(([field, label]) => (
                <label key={field} className="grid gap-2 text-sm text-[color:var(--ink-mid)]">
                  <span>{label}</span>
                  <input
                    value={profile.availability[field as keyof typeof profile.availability] as string}
                    onChange={(event) =>
                      updateProfile((current) => ({
                        ...current,
                        availability: {
                          ...current.availability,
                          [field]: event.target.value,
                        },
                      }))
                    }
                    className="rounded-[14px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-4 py-3"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-white p-8 shadow-[0_20px_60px_rgba(30,22,16,0.05)]">
            <h2 className="max-w-full text-[28px]">{t("sections.responses")}</h2>
            <div className="mt-6 grid gap-4">
              {freeTextEntries.map(([questionId, value]) => (
                <label key={questionId} className="grid gap-2 text-sm text-[color:var(--ink-mid)]">
                  <span>{questionId}</span>
                  <textarea
                    rows={3}
                    value={String(value)}
                    onChange={(event) =>
                      updateProfile((current) => ({
                        ...current,
                        quizAnswers: {
                          ...current.quizAnswers,
                          [questionId]: event.target.value,
                        },
                      }))
                    }
                    className="rounded-[14px] border border-[color:var(--cream-dark)] bg-[color:var(--sand-pale)] px-4 py-3"
                  />
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
