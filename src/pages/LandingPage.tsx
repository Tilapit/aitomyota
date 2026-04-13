import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ComparisonSection from "../components/sections/ComparisonSection";
import FAQSection from "../components/sections/FAQSection";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { routePaths } from "../lib/routes";

export default function LandingPage() {
  const locale = useCurrentLocale();
  const navigate = useNavigate();

  return (
    <>
      <Navbar locale={locale} />
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
