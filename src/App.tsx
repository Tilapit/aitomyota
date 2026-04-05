import { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import ComparisonSection from "./ComparisonSection";
import ProfilesSection from "./ProfilesSection";
import QuizTeaserSection from "./QuizTeaserSection";
import Footer from "./Footer";
import QuizPage from "./QuizPage";

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      {quizOpen && <QuizPage onClose={() => setQuizOpen(false)} />}

      <div className={quizOpen ? "hidden" : ""}>
        <Navbar onOpenQuiz={() => setQuizOpen(true)} />
        <HeroSection onOpenQuiz={() => setQuizOpen(true)} />
        <HowItWorksSection />
        <ComparisonSection />
        <ProfilesSection />
        <QuizTeaserSection onOpenQuiz={() => setQuizOpen(true)} />
        <Footer />
      </div>
    </>
  );
}
