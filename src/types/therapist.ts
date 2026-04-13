export type TherapistQuestionType = "single" | "multi" | "text";

export type TherapistQuestionOption = {
  id: string;
  label: string;
};

export type TherapistQuestion = {
  id: string;
  category: string;
  prompt: string;
  type: TherapistQuestionType;
  options?: TherapistQuestionOption[];
  note?: string;
};

export type TherapistAnswerValue = string | string[];

export type TherapistQuizAnswers = Record<string, TherapistAnswerValue>;

export type TherapistBaseProfile = {
  displayName: string;
  title: string;
  languages: string[];
  modalities: string[];
  sessionFormats: string[];
  acceptsNewClients: boolean;
  introVideoUrl: string;
  headshotUrl: string;
  bookingUrl: string;
  published: boolean;
};

export type TherapistLocalizationFields = {
  shortIntro: string;
  bio: string;
  approachSummary: string;
  freeTextPublicAnswers: Record<string, string>;
};

export type TherapistAvailability = {
  acceptingNewClients: boolean;
  availabilitySummary: string;
  sessionTimes: string;
  responseTimeNote: string;
  timezone: string;
};

export type TherapistProfileRecord = {
  id: string;
  email: string;
  slug: string;
  base: TherapistBaseProfile;
  localizations: Record<"en" | "fi", TherapistLocalizationFields>;
  availability: TherapistAvailability;
  quizAnswers: TherapistQuizAnswers;
};
