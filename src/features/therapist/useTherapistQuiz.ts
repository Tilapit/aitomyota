import { useMemo, useState } from "react";
import type { Locale } from "../../types/app";
import type { TherapistAnswerValue, TherapistQuizAnswers } from "../../types/therapist";
import { getTherapistQuiz } from "./quizData";

export function useTherapistQuiz(locale: Locale) {
  const questions = useMemo(() => getTherapistQuiz(locale), [locale]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<TherapistQuizAnswers>({});
  const [complete, setComplete] = useState(false);

  const question = questions[currentStep];
  const selectedValue = answers[question?.id] as TherapistAnswerValue | undefined;
  const totalQuestions = questions.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalQuestions - 1;

  const canProceed =
    typeof selectedValue === "string"
      ? selectedValue.trim().length > 0
      : Array.isArray(selectedValue)
        ? selectedValue.length > 0
        : false;

  const onSingleSelect = (value: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const onMultiToggle = (value: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => {
      const existing = Array.isArray(current[question.id])
        ? (current[question.id] as string[])
        : [];

      return {
        ...current,
        [question.id]: existing.includes(value)
          ? existing.filter((item) => item !== value)
          : [...existing, value],
      };
    });
  };

  const onTextChange = (value: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const onBack = () => {
    if (!isFirst) {
      setCurrentStep((current) => current - 1);
    }
  };

  const onNext = () => {
    if (!canProceed) {
      return;
    }

    if (isLast) {
      setComplete(true);
      return;
    }

    setCurrentStep((current) => current + 1);
  };

  return {
    questions,
    question,
    currentStep,
    totalQuestions,
    answers,
    selectedValue,
    isFirst,
    isLast,
    canProceed,
    complete,
    onSingleSelect,
    onMultiToggle,
    onTextChange,
    onBack,
    onNext,
  };
}
