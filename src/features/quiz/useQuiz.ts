import { useEffect, useMemo, useState } from "react";
import {
  buildRecommendations,
  getQuiz,
  type QuizAnswers,
  type QuizAnswerValue,
  type QuizId,
  type QuizQuestion,
} from "./quizData";
import type { Locale } from "../../types/app";

export function useQuiz(quizId: QuizId, locale: Locale) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isComplete, setIsComplete] = useState(false);

  const quiz = useMemo(() => getQuiz(quizId), [quizId]);

  // Visible questions depend on current answers (conditionals resolved dynamically)
  const visibleQuestions = useMemo((): QuizQuestion[] => {
    return quiz.questions.filter((q) => {
      if (!q.conditionalOn) return true;
      return answers[q.conditionalOn.questionId] === q.conditionalOn.answerId;
    });
  }, [quiz.questions, answers]);

  const totalQuestions = visibleQuestions.length;
  const safeStep = Math.min(currentStep, Math.max(0, totalQuestions - 1));
  const question = visibleQuestions[safeStep];
  const selectedValue = question
    ? (answers[question.id] as QuizAnswerValue | undefined)
    : undefined;
  const isFirst = safeStep === 0;
  const isLast = safeStep === totalQuestions - 1;

  // Initialise slider default so the question is always answerable
  useEffect(() => {
    if (
      question?.type === "slider" &&
      answers[question.id] === undefined
    ) {
      const def = question.sliderDefault ?? 3;
      setAnswers((curr) => ({ ...curr, [question.id]: String(def) }));
    }
  }, [question?.id, question?.type, question?.sliderDefault]); // eslint-disable-line react-hooks/exhaustive-deps

  const canProceed = question
    ? question.optional || question.type === "slider"
      ? true
      : question.type === "multi"
        ? Array.isArray(selectedValue) && selectedValue.length > 0
        : typeof selectedValue === "string" && selectedValue.length > 0
    : false;

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  const onSingleSelect = (answerId: string) => {
    if (!question) return;
    setAnswers((curr) => ({ ...curr, [question.id]: answerId }));
  };

  const onMultiToggle = (answerId: string) => {
    if (!question) return;
    setAnswers((curr) => {
      const existing = Array.isArray(curr[question.id])
        ? (curr[question.id] as string[])
        : [];
      const next = existing.includes(answerId)
        ? existing.filter((i) => i !== answerId)
        : [...existing, answerId];
      return { ...curr, [question.id]: next };
    });
  };

  /**
   * onTextChange — stores free text for the current question.
   * Pass `subKey` to store under `${questionId}_${subKey}` instead,
   * used for the "other" text field in Q1B.
   */
  const onTextChange = (value: string, subKey?: string) => {
    if (!question) return;
    const key = subKey ? `${question.id}_${subKey}` : question.id;
    setAnswers((curr) => ({ ...curr, [key]: value }));
  };

  const onBack = () => {
    if (isFirst) return;
    setCurrentStep((curr) => curr - 1);
  };

  const onNext = () => {
    if (!canProceed) return;
    if (isLast) {
      setIsComplete(true);
      return;
    }
    setCurrentStep((curr) => curr + 1);
  };

  const recommendations = useMemo(
    () => (isComplete ? buildRecommendations(quizId, answers, locale) : []),
    [answers, isComplete, locale, quizId],
  );

  const questionState = question
    ? {
        question,
        currentIndex: safeStep,
        total: totalQuestions,
        selectedValue,
        answers,
        onSingleSelect,
        onMultiToggle,
        onTextChange,
        onBack,
        onNext,
        canProceed,
        isFirst,
        isLast,
      }
    : null;

  return {
    quiz,
    currentStep: safeStep,
    totalQuestions,
    isComplete,
    questionState,
    recommendations,
    answers,
    restart,
  };
}
