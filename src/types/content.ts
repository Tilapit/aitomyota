export type Testimonial = {
  quote: string;
  name: string;
  context: string;
  image: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ComparisonPoint = {
  text: string;
  em?: string;
};

export type TherapistExperience = {
  name: string;
  portrait: string;
  videoPoster: string;
  duration: string;
  preview: string;
  videoIntro: string;
  videoPoints: string[];
  contactCopy: string;
};
