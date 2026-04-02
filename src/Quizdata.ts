export interface QuizOption {
  value: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "concern",
    question: "Mikä on tärkein asia, johon haet apua?",
    options: [
      { value: "anxiety", label: "Ahdistus tai stressi" },
      { value: "depression", label: "Masennus tai alakulo" },
      { value: "relationships", label: "Ihmissuhteet" },
      { value: "selfgrowth", label: "Itsetuntemus ja kasvu" },
      { value: "trauma", label: "Traumat tai vaikeat kokemukset" },
      { value: "other", label: "Jokin muu" },
    ],
  },
  {
    id: "style",
    question: "Millainen terapiatyyli tuntuu sinulle luontevimmalta?",
    options: [
      { value: "talk", label: "Puhuminen ja kuunteleminen" },
      { value: "structured", label: "Selkeä rakenne ja harjoitukset" },
      { value: "bodywork", label: "Kehon ja mielen yhteys" },
      { value: "creative", label: "Luova tai toiminnallinen lähestymistapa" },
      { value: "unsure", label: "En osaa sanoa" },
    ],
  },
  {
    id: "gender",
    question: "Onko terapeutin sukupuolella merkitystä sinulle?",
    options: [
      { value: "female", label: "Kyllä, toivon naisterapeutin" },
      { value: "male", label: "Kyllä, toivon miesterapeutin" },
      { value: "any", label: "Ei ole väliä" },
    ],
  },
  {
    id: "experience",
    question: "Onko sinulla aiempaa kokemusta terapiasta?",
    options: [
      { value: "first", label: "En, tämä on ensimmäinen kerta" },
      { value: "some", label: "Kyllä, vähän" },
      { value: "lot", label: "Kyllä, paljon" },
    ],
  },
  {
    id: "format",
    question: "Haluatko käydä terapiassa...",
    options: [
      { value: "inperson", label: "Kasvotusten" },
      { value: "online", label: "Verkossa" },
      { value: "both", label: "Kumpi sopii, niin käy" },
    ],
  },
  {
    id: "urgency",
    question: "Miten kiireellinen tarpeesi on?",
    options: [
      { value: "asap", label: "Mahdollisimman pian" },
      { value: "weeks", label: "Muutaman viikon sisällä käy" },
      { value: "flexible", label: "Minulla on aikaa" },
    ],
  },
];
