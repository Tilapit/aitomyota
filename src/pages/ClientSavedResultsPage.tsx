import { useMemo, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Logo from "../components/layout/Logo";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { usePageMeta } from "../hooks/usePageMeta";
import { useAuth } from "../hooks/useAuth";
import { routePaths } from "../lib/routes";
import {
  type SavedClientResult,
} from "../features/clientResults/storage";
import {
  deleteClientResultForUser,
  listClientResultsForUser,
} from "../repositories/clientResultsRepository";

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fi" ? "fi-FI" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function ClientSavedResultsPage() {
  const locale = useCurrentLocale();
  const { t } = useTranslation("quiz-client");
  const { user } = useAuth();
  const [results, setResults] = useState<SavedClientResult[]>([]);
  const [openId, setOpenId] = useState<string | null>(results[0]?.id ?? null);

  usePageMeta(
    locale === "fi" ? "Myötä | Tallennetut suositukset" : "Myötä | Saved recommendations",
    locale === "fi"
      ? "Palaa aiemmin tallennettuihin terapeutti- ja match-suosituksiisi."
      : "Return to the therapist recommendations you saved earlier.",
  );

  const activeResult = useMemo(
    () => results.find((result) => result.id === openId) ?? null,
    [openId, results],
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    void listClientResultsForUser(user.id).then((next) => {
      setResults(next);
      setOpenId(next[0]?.id ?? null);
    });
  }, [user]);

  return (
    <div className="min-h-screen bg-[color:var(--cream)] px-6 py-10 sm:px-10 lg:px-[72px]">
      <div className="page-shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to={routePaths.clientHome(locale)} className="flex items-center text-[color:var(--ink)]">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <Link
              to={routePaths.clientQuiz(locale)}
              className="rounded-full border border-[color:var(--cream-dark)] bg-white/60 px-4 py-2 text-sm font-medium text-[color:var(--ink-mid)] transition hover:border-[color:var(--ink-light)] hover:text-[color:var(--ink)]"
            >
              {t("saved.backToQuiz")}
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <div className="s-label">{t("saved.eyebrow")}</div>
          <h1 className="max-w-full text-[clamp(34px,4vw,56px)] leading-[1.04]">{t("saved.title")}</h1>
          <p className="mt-4 max-w-[720px] text-[16px] leading-8 text-[color:var(--ink-mid)]">
            {t("saved.description")}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(30,22,16,0.06)]">
            <div className="font-serif text-[28px] text-[color:var(--ink)]">{t("saved.emptyTitle")}</div>
            <p className="mt-3 max-w-[640px] text-[15px] leading-7 text-[color:var(--ink-mid)]">
              {t("saved.emptyDescription")}
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-4">
              {results.map((result) => {
                const isActive = result.id === openId;

                return (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => setOpenId(result.id)}
                    className={[
                      "w-full rounded-[24px] border p-5 text-left transition",
                      isActive
                        ? "border-[color:var(--terra)] bg-white shadow-[0_18px_45px_rgba(196,103,74,0.12)]"
                        : "border-[rgba(196,103,74,0.12)] bg-white/70 hover:bg-white",
                    ].join(" ")}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--terra)]">
                      {result.quizId === "long" ? t("saved.longQuiz") : t("saved.shortQuiz")}
                    </div>
                    <div className="mt-2 font-serif text-[24px] text-[color:var(--ink)]">
                      {result.recommendations[0]?.name ?? t("saved.savedMatch")}
                    </div>
                    <div className="mt-2 text-[13px] leading-6 text-[color:var(--ink-light)]">
                      {formatDate(result.savedAt, locale)}
                    </div>
                    <div className="mt-4 text-[13px] leading-6 text-[color:var(--ink-mid)]">
                      {result.recommendations
                        .slice(0, 3)
                        .map((recommendation) => recommendation.name)
                        .join(" · ")}
                    </div>
                  </button>
                );
              })}
            </aside>

            <section className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(30,22,16,0.06)]">
              {activeResult && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--terra)]">
                      {activeResult.quizId === "long" ? t("saved.longQuiz") : t("saved.shortQuiz")}
                      </div>
                      <div className="mt-2 font-serif text-[32px] leading-[1.08] text-[color:var(--ink)]">
                        {t("saved.resultTitle")}
                      </div>
                      <div className="mt-2 text-[14px] text-[color:var(--ink-light)]">
                        {formatDate(activeResult.savedAt, locale)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!user) {
                          return;
                        }
                        await deleteClientResultForUser({ userId: user.id, resultId: activeResult.id });
                        const next = await listClientResultsForUser(user.id);
                        setResults(next);
                        setOpenId(next[0]?.id ?? null);
                      }}
                      className="rounded-full border border-[rgba(196,103,74,0.18)] px-4 py-2 text-sm font-semibold text-[color:var(--terra)] transition hover:bg-[color:var(--terra-wash)]"
                    >
                      {t("saved.delete")}
                    </button>
                  </div>

                  <div className="mt-8 space-y-5">
                    {activeResult.recommendations.map((recommendation, index) => (
                      <article
                        key={`${activeResult.id}-${recommendation.name}`}
                        className="rounded-[24px] border border-[rgba(196,103,74,0.12)] bg-[color:var(--sand-pale)] p-6"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[color:var(--terra)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                            {index === 0 ? t("meta.bestRecommendation") : t("meta.optionLabel", { index: index + 1 })}
                          </span>
                          <span className="text-[13px] text-[color:var(--ink-light)]">{recommendation.availability}</span>
                        </div>
                        <div className="mt-4 font-serif text-[30px] leading-[1.08] text-[color:var(--ink)]">
                          {recommendation.name}
                        </div>
                        <div className="mt-2 text-[14px] text-[color:var(--ink-light)]">{recommendation.title}</div>
                        <p className="mt-5 text-[15px] leading-7 text-[color:var(--ink-mid)]">{recommendation.reason}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {recommendation.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[color:var(--cream-dark)] bg-white px-3 py-1 text-[12px] font-medium text-[color:var(--ink-mid)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {(recommendation.contactDetail || recommendation.bookingUrl) && (
                          <div className="mt-5 flex flex-wrap gap-3">
                            {recommendation.contactDetail && (
                              <div className="rounded-full border border-[color:var(--cream-dark)] bg-white px-4 py-2 text-sm text-[color:var(--ink-mid)]">
                                {recommendation.contactDetail}
                              </div>
                            )}
                            {recommendation.bookingUrl && (
                              <a
                                href={recommendation.bookingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-[color:var(--terra)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--terra-mid)]"
                              >
                                {t("saved.openBooking")}
                              </a>
                            )}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
