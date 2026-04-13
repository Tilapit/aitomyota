import type { Locale } from "../../types/app";
import type { TherapistQuestion } from "../../types/therapist";

const therapistQuizByLocale: Record<Locale, TherapistQuestion[]> = {
  en: [
    {
      id: "practice_name",
      category: "practice",
      prompt: "How would you like your name and title to appear to clients?",
      type: "text",
    },
    {
      id: "approach",
      category: "approach",
      prompt: "How would you describe your therapeutic approach?",
      type: "single",
      options: [
        { id: "warm", label: "Warm and relational" },
        { id: "structured", label: "Structured and insight-oriented" },
        { id: "practical", label: "Practical and tool-based" },
        { id: "integrative", label: "Integrative depending on the client" }
      ],
    },
    {
      id: "modalities",
      category: "methods",
      prompt: "Which modalities or frameworks do you currently offer?",
      type: "multi",
      options: [
        { id: "cbt", label: "CBT" },
        { id: "psychodynamic", label: "Psychodynamic" },
        { id: "act", label: "ACT" },
        { id: "trauma", label: "Trauma-informed work" },
        { id: "other", label: "Other / mixed practice" }
      ],
    },
    {
      id: "client_fit",
      category: "clients",
      prompt: "What kind of client relationships tend to be your strongest fit?",
      type: "text",
      note: "You can answer in full sentences. This will later appear in your public profile.",
    },
    {
      id: "languages",
      category: "languages",
      prompt: "Which languages can you comfortably work in?",
      type: "multi",
      options: [
        { id: "en", label: "English" },
        { id: "fi", label: "Finnish" },
        { id: "sv", label: "Swedish" }
      ],
    },
    {
      id: "session_formats",
      category: "sessions",
      prompt: "Which session formats do you currently offer?",
      type: "multi",
      options: [
        { id: "remote", label: "Remote / video" },
        { id: "in_person", label: "In person" },
        { id: "hybrid", label: "Hybrid depending on the client" }
      ],
    },
    {
      id: "availability_summary",
      category: "availability",
      prompt: "How would you describe your current availability in one or two sentences?",
      type: "text",
    },
    {
      id: "intro_video_url",
      category: "media",
      prompt: "Share your intro video URL if you already have one. If not, you can leave this blank for now.",
      type: "text",
    }
  ],
  fi: [
    {
      id: "practice_name",
      category: "vastaanotto",
      prompt: "Miten haluaisit nimesi ja tittelisi näkyvän asiakkaille?",
      type: "text",
    },
    {
      id: "approach",
      category: "työskentelytapa",
      prompt: "Miten kuvailisit terapeuttista lähestymistapaasi?",
      type: "single",
      options: [
        { id: "warm", label: "Lämmin ja relationaalinen" },
        { id: "structured", label: "Rakenteinen ja oivalluksiin suuntautunut" },
        { id: "practical", label: "Käytännöllinen ja työkaluihin nojaava" },
        { id: "integrative", label: "Integratiivinen asiakkaan mukaan" }
      ],
    },
    {
      id: "modalities",
      category: "menetelmät",
      prompt: "Mitä menetelmiä tai viitekehyksiä tarjoat tällä hetkellä?",
      type: "multi",
      options: [
        { id: "cbt", label: "KKT" },
        { id: "psychodynamic", label: "Psykodynaaminen" },
        { id: "act", label: "ACT" },
        { id: "trauma", label: "Traumatietoinen työskentely" },
        { id: "other", label: "Muu / yhdistelmä" }
      ],
    },
    {
      id: "client_fit",
      category: "asiakkaat",
      prompt: "Millaiset asiakassuhteet ovat usein sinulle luontevin match?",
      type: "text",
      note: "Voit vastata kokonaisilla lauseilla. Tämä näkyy myöhemmin julkisessa profiilissasi.",
    },
    {
      id: "languages",
      category: "kielet",
      prompt: "Millä kielillä voit työskennellä sujuvasti?",
      type: "multi",
      options: [
        { id: "en", label: "Englanti" },
        { id: "fi", label: "Suomi" },
        { id: "sv", label: "Ruotsi" }
      ],
    },
    {
      id: "session_formats",
      category: "tapaamiset",
      prompt: "Millaisia tapaamismuotoja tarjoat tällä hetkellä?",
      type: "multi",
      options: [
        { id: "remote", label: "Etä / video" },
        { id: "in_person", label: "Lähitapaaminen" },
        { id: "hybrid", label: "Hybridimalli asiakkaan mukaan" }
      ],
    },
    {
      id: "availability_summary",
      category: "saatavuus",
      prompt: "Miten kuvailisit nykyistä saatavuuttasi yhdellä tai kahdella lauseella?",
      type: "text",
    },
    {
      id: "intro_video_url",
      category: "media",
      prompt: "Jaa esittelyvideosi URL, jos sinulla on se jo. Muuten voit jättää tämän tyhjäksi toistaiseksi.",
      type: "text",
    }
  ],
};

export function getTherapistQuiz(locale: Locale) {
  return therapistQuizByLocale[locale];
}
