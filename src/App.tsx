import { useEffect, useState } from "react";
import ComparisonSection from "./ComparisonSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import Navbar from "./Navbar";
import QuizPage from "./QuizPage";
import TestimonialsSection from "./TestimonialsSection";
import type { QuizId } from "./quizData";

type PageState =
  | { name: "landing" }
  | { name: "quiz"; quizId: QuizId };

export default function App() {
  const [page, setPage] = useState<PageState>({ name: "landing" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (page.name === "quiz") {
    return (
      <QuizPage
        key={page.quizId}
        quizId={page.quizId}
        onGoHome={() => setPage({ name: "landing" })}
        onSelectQuiz={(quizId) => setPage({ name: "quiz", quizId })}
      />
    );
  }

  return (
    <>
      <Navbar onOpenQuiz={() => setPage({ name: "quiz", quizId: "short" })} />
      <HeroSection onOpenQuiz={() => setPage({ name: "quiz", quizId: "short" })} />
      <HowItWorksSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection
        onOpenQuiz={() => setPage({ name: "quiz", quizId: "short" })}
        onOpenLongQuiz={() => setPage({ name: "quiz", quizId: "long" })}
      />
      <Footer />
    </>
  );
}
