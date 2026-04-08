import { useEffect, useState } from "react";
import type { QuizId } from "./features/quiz/quizData";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";

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
    <LandingPage
      onOpenQuiz={() => setPage({ name: "quiz", quizId: "short" })}
      onOpenLongQuiz={() => setPage({ name: "quiz", quizId: "long" })}
    />
  );
}
