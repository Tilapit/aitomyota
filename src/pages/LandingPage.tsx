import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ComparisonSection from "../components/sections/ComparisonSection";
import FAQSection from "../components/sections/FAQSection";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";

type LandingPageProps = {
  onOpenQuiz: () => void;
  onOpenLongQuiz: () => void;
};

export default function LandingPage({
  onOpenQuiz,
  onOpenLongQuiz,
}: LandingPageProps) {
  return (
    <>
      <Navbar onOpenQuiz={onOpenQuiz} />
      <HeroSection onOpenQuiz={onOpenQuiz} />
      <HowItWorksSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection onOpenQuiz={onOpenQuiz} onOpenLongQuiz={onOpenLongQuiz} />
      <Footer />
    </>
  );
}
