import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ComparisonSection from "../components/sections/ComparisonSection";
import FAQSection from "../components/sections/FAQSection";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { usePageMeta } from "../hooks/usePageMeta";
import { routePaths } from "../lib/routes";

export default function LandingPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();
  usePageMeta(
    locale === "fi" ? "Myötä | Löydä oikea terapeutti" : "Myötä | Find the right therapist",
    locale === "fi"
      ? "Myötä auttaa löytämään oikean terapeutin rauhallisemmin, ilman että ensimmäinen käynti tuntuu arvaukselta."
      : "Myötä helps you find the right therapist more calmly, before the first appointment starts to feel like guesswork.",
  );

  return (
    <>
      <Navbar locale={locale} audience="client" />
      <HeroSection onOpenQuiz={() => navigate(routePaths.clientQuiz(locale))} />
      <HowItWorksSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection
        onOpenQuiz={() => navigate(routePaths.clientQuiz(locale))}
        onOpenLongQuiz={() => navigate(routePaths.clientQuizLong(locale))}
      />
      <Footer locale={locale} />
    </>
  );
}
