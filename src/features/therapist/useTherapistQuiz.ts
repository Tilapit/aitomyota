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

  const canProceed = (() => {
    if (!question) {
      return false;
    }

    if (!question.required) {
      if (selectedValue === undefined) {
        return true;
      }
    }

    if (question.type === "group") {
      if (!selectedValue || typeof selectedValue !== "object" || Array.isArray(selectedValue)) {
        return false;
      }

      const fieldsValid = (question.fields ?? []).every((field) => {
        const isVisible = field.showWhen
          ? field.showWhen.values.includes(String(selectedValue[field.showWhen.fieldId] ?? ""))
          : true;

        if (!isVisible) {
          return true;
        }

        return field.required ? String(selectedValue[field.id] ?? "").trim().length > 0 : true;
      });

      if (!fieldsValid) {
        return false;
      }

      if (question.groupRequirement?.mode === "atLeastOne") {
        return question.groupRequirement.fieldIds.some((fieldId) =>
          String(selectedValue[fieldId] ?? "").trim().length > 0,
        );
      }

      return true;
    }

    if (question.type === "number") {
      if (typeof selectedValue === "number") {
        return Number.isFinite(selectedValue);
      }

      if (typeof selectedValue === "string") {
        return selectedValue.trim().length > 0;
      }

      return false;
    }

    if (question.type === "scale") {
      return typeof selectedValue === "number" && selectedValue >= 1 && selectedValue <= 5;
    }

    if (typeof selectedValue === "string") {
      return selectedValue.trim().length > 0;
    }

    if (Array.isArray(selectedValue)) {
      return selectedValue.length > 0;
    }

    return false;
  })();

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

  const onNumberChange = (value: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: value,
    }));
  };

  const onScaleSelect = (value: number) => {
    if (!question) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: value,
    }));
  };

  const onGroupFieldChange = (fieldId: string, value: string) => {
    if (!question) {
      return;
    }

    setAnswers((current) => {
      const existing =
        current[question.id] && typeof current[question.id] === "object" && !Array.isArray(current[question.id])
          ? (current[question.id] as Record<string, string>)
          : {};

      return {
        ...current,
        [question.id]: {
          ...existing,
          [fieldId]: value,
        },
      };
    });
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
    onNumberChange,
    onScaleSelect,
    onGroupFieldChange,
    onBack,
    onNext,
  };
}
