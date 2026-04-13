import { useMemo, useState } from "react";
import {
  buildRecommendations,
  getQuiz,
  type QuizAnswers,
  type QuizAnswerValue,
  type QuizId,
} from "./quizData";
import type { Locale } from "../../types/app";

export function useQuiz(quizId: QuizId, locale: Locale) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isComplete, setIsComplete] = useState(false);

  const quiz = useMemo(() => getQuiz(quizId, locale), [locale, quizId]);
  const question = quiz.questions[currentStep];
  const selectedValue = answers[question?.id] as QuizAnswerValue | undefined;
  const totalQuestions = quiz.questions.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalQuestions - 1;

  const canProceed = question
    ? question.openText
      ? true
      : question.multiSelect
        ? Array.isArray(selectedValue) && selectedValue.length > 0
        : typeof selectedValue === "string" && selectedValue.length > 0
    : false;

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  const onSingleSelect = (answerId: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: answerId,
    }));
  };

  const onMultiToggle = (answerId: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => {
      const existing = Array.isArray(current[question.id])
        ? (current[question.id] as string[])
        : [];

      const next = existing.includes(answerId)
        ? existing.filter((item) => item !== answerId)
        : [...existing, answerId];

      return {
        ...current,
        [question.id]: next,
      };
    });
  };

  const onTextChange = (value: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: value,
    }));
  };

  const onBack = () => {
    if (isFirst) {
      return;
    }

    setCurrentStep((current) => current - 1);
  };

  const onNext = () => {
    if (!canProceed) {
      return;
    }

    if (isLast) {
      setIsComplete(true);
      return;
    }

    setCurrentStep((current) => current + 1);
  };

  const recommendations = useMemo(
    () => (isComplete ? buildRecommendations(quizId, answers, locale) : []),
    [answers, isComplete, locale, quizId],
  );

  const questionState = question
    ? {
        question,
        currentIndex: currentStep,
        total: totalQuestions,
        selectedValue,
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
    currentStep,
    totalQuestions,
    isComplete,
    questionState,
    recommendations,
    restart,
  };
}
