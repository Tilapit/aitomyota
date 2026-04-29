import type { Locale } from "../../types/app";

export type QuizId = "short" | "long";
export type QuizAnswerValue = string | string[];
export type QuizAnswers = Record<string, QuizAnswerValue>;

export type QuizAnswer = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  number: number;
  category: string;
  question: string;
  multiSelect?: boolean;
  openText?: boolean;
  answers?: QuizAnswer[];
  note?: string;
  slider?: {
    min: number;
    max: number;
    labelMin: string;
    labelMax: string;
    valueLabels?: Array<{ max: number; label: string }>;
  };
};

export type Quiz = {
  id: QuizId;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export type Recommendation = {
  name: string;
  title: string;
  reason: string;
  availability: string;
  tags: string[];
  bookingUrl?: string;
  contactDetail?: string;
  headshotUrl?: string;
  introVideoUrl?: string;
  score?: number;
  location?: string;
  priceDisplay?: string;
  sessionFormatDisplay?: string;
  education?: string;
  yearsExperience?: number;
};

type LocalizedQuizCollection = Record<Locale, Record<QuizId, Quiz>>;

const quizzesByLocale: LocalizedQuizCollection = {
  en: {
    short: {
      id: "short",
      title: "Short introduction",
      description:
        "10 questions, about 3 minutes. A lighter first step when you simply want to get moving.",
      questions: [
        {
          id: "q1",
          number: 1,
          category: "Situation",
          question: "What feels heaviest right now?",
          answers: [
            { id: "q1a", text: "Daily life or work weighs on me, my energy is under strain" },
            { id: "q1b", text: "There is one specific thing on my mind I want to talk about" },
            { id: "q1c", text: "A big life change is happening and I need support" },
            { id: "q1d", text: "I cannot name it yet — it just feels unclear and heavy" },
            { id: "q1e", text: "I just want to explore — not sure I need support yet" },
          ],
        },
        {
          id: "q2",
          number: 2,
          category: "Goal",
          question: "What do you want from therapy right now?",
          answers: [
            { id: "q2a", text: "I want to feel lighter" },
            { id: "q2b", text: "I want to understand myself better" },
            { id: "q2c", text: "I want to solve a specific problem" },
            { id: "q2d", text: "I want to create real change" },
          ],
        },
        {
          id: "q3",
          number: 3,
          category: "Support style",
          question: "What kind of person helps you most in difficult moments?",
          answers: [
            { id: "q3a", text: "Calm and gentle" },
            { id: "q3b", text: "Honest and direct" },
            { id: "q3c", text: "Warm and encouraging" },
            { id: "q3d", text: "Structured and goal-oriented" },
            { id: "q3e", text: "Not sure yet — any style works for me" },
          ],
        },
        {
          id: "q_workstyle",
          number: 4,
          category: "Working style",
          question: "How would you like your therapist to work with you?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Mostly listens",
            labelMax: "Actively guides",
            valueLabels: [
              { max: 20, label: "Listening and present" },
              { max: 40, label: "Mostly listening" },
              { max: 60, label: "Balanced" },
              { max: 80, label: "Fairly guiding" },
              { max: 100, label: "Actively guiding" },
            ],
          },
        },
        {
          id: "q_experience",
          number: 5,
          category: "Experience",
          question: "How important is it that the therapist has a lot of life experience?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Not important at all",
            labelMax: "Very important",
            valueLabels: [
              { max: 20, label: "Not important" },
              { max: 40, label: "Slightly important" },
              { max: 60, label: "Somewhat important" },
              { max: 80, label: "Fairly important" },
              { max: 100, label: "Very important" },
            ],
          },
        },
        {
          id: "q4",
          number: 6,
          category: "Therapist",
          question: "Does the therapist's gender matter to you?",
          answers: [
            { id: "q4a", text: "Woman" },
            { id: "q4b", text: "Man" },
            { id: "q4c", text: "Non-binary" },
            { id: "q4d", text: "No preference" },
          ],
        },
        {
          id: "q5",
          number: 7,
          category: "Practicalities",
          question: "What price range feels realistic per session?",
          answers: [
            { id: "q5a", text: "Under €80" },
            { id: "q5b", text: "€80–120" },
            { id: "q5c", text: "€120–160" },
            { id: "q5d", text: "Price is not a deciding factor" },
          ],
        },
        {
          id: "q6",
          number: 8,
          category: "Practicalities",
          question: "Would you like to use Kela reimbursement if possible?",
          note: "Kela can reimburse part of psychotherapy costs in certain situations. Short-term therapy is not Kela-reimbursable.",
          answers: [
            { id: "q6a", text: "Yes, show only eligible therapists" },
            { id: "q6b", text: "Would be nice but not essential" },
            { id: "q6c", text: "I'm not sure yet" },
          ],
        },
        {
          id: "q7",
          number: 9,
          category: "Practicalities",
          question: "Would you prefer to meet remotely or in person?",
          answers: [
            { id: "q7a", text: "Remotely — video works well" },
            { id: "q7b", text: "In person — physical presence matters" },
            { id: "q7c", text: "Either works for me" },
          ],
        },
        {
          id: "q8",
          number: 10,
          category: "Language",
          question: "What language would you like to use in therapy?",
          answers: [
            { id: "q8a", text: "Finnish" },
            { id: "q8b", text: "Swedish" },
            { id: "q8c", text: "English" },
          ],
        },
      ],
    },
    long: {
      id: "long",
      title: "Deeper introduction",
      description:
        "18 questions, about 6 minutes. More nuance, more detail, and a softer path toward a more precise match.",
      questions: [
        {
          id: "l1",
          number: 1,
          category: "Situation",
          question: "What feels heaviest right now?",
          answers: [
            { id: "l1a", text: "Daily life or work weighs on me, my energy is under strain" },
            { id: "l1b", text: "There is one specific thing on my mind I want to talk about" },
            { id: "l1c", text: "A big life change is happening and I need support" },
            { id: "l1d", text: "I cannot name it yet — it just feels unclear and heavy" },
            { id: "l1e", text: "I just want to explore — not sure I need support yet" },
          ],
        },
        {
          id: "l2",
          number: 2,
          category: "Goal",
          question: "What do you want from therapy right now?",
          answers: [
            { id: "l2a", text: "I want to feel lighter" },
            { id: "l2b", text: "I want to understand myself better" },
            { id: "l2c", text: "I want to solve a specific problem" },
            { id: "l2d", text: "I want to create real change" },
          ],
        },
        {
          id: "l3",
          number: 3,
          category: "Situation",
          question: "How long has this been weighing on you?",
          answers: [
            { id: "l3a", text: "Quite recently — it still feels new" },
            { id: "l3b", text: "For a few months" },
            { id: "l3c", text: "For a longer time, over a year" },
            { id: "l3d", text: "For as long as I can remember" },
          ],
        },
        {
          id: "l4",
          number: 4,
          category: "Situation",
          question: "What area of life would you most want to talk about? You can choose more than one.",
          multiSelect: true,
          answers: [
            { id: "l4a", text: "Work, career or studies" },
            { id: "l4b", text: "Relationships, partnership or family" },
            { id: "l4c", text: "Identity or direction in life" },
            { id: "l4d", text: "Mood, anxiety or exhaustion" },
            { id: "l4e", text: "Something else — I will describe it later" },
          ],
        },
        {
          id: "l5",
          number: 5,
          category: "Situation",
          question: "How disruptive does this feel in your everyday life right now?",
          note: "If you feel you are in crisis, the fastest available support is always the most important next step.",
          answers: [
            { id: "l5a", text: "Managing, but wanted to seek support early" },
            { id: "l5b", text: "Getting by, but my energy is low" },
            { id: "l5c", text: "Feels quite heavy and I need help now" },
            { id: "l5d", text: "Feels overwhelming" },
          ],
        },
        {
          id: "l6",
          number: 6,
          category: "Support style",
          question: "What kind of person helps you most in difficult moments?",
          answers: [
            { id: "l6a", text: "Calm and gentle" },
            { id: "l6b", text: "Honest and direct" },
            { id: "l6c", text: "Warm and encouraging" },
            { id: "l6d", text: "Structured and goal-oriented" },
            { id: "l6e", text: "Not sure yet — any style works for me" },
          ],
        },
        {
          id: "q_workstyle",
          number: 7,
          category: "Working style",
          question: "How would you like your therapist to work with you?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Mostly listens",
            labelMax: "Actively guides",
            valueLabels: [
              { max: 20, label: "Listening and present" },
              { max: 40, label: "Mostly listening" },
              { max: 60, label: "Balanced" },
              { max: 80, label: "Fairly guiding" },
              { max: 100, label: "Actively guiding" },
            ],
          },
        },
        {
          id: "l7",
          number: 8,
          category: "Approach",
          question: "How do you usually work through difficult things?",
          answers: [
            { id: "l7a", text: "I talk to people close to me — connection helps" },
            { id: "l7b", text: "I reflect quietly on my own" },
            { id: "l7c", text: "I do something concrete — action helps" },
            { id: "l7d", text: "It varies depending on the situation" },
          ],
        },
        {
          id: "l8",
          number: 9,
          category: "Approach",
          question: "What pace would feel right for you?",
          answers: [
            { id: "l8a", text: "Gently, at my own pace — no rush" },
            { id: "l8b", text: "Goal-oriented — I want to feel progress" },
            { id: "l8c", text: "Either works — I am flexible" },
          ],
        },
        {
          id: "l9",
          number: 10,
          category: "Practicalities",
          question: "Would you prefer to meet remotely or in person?",
          answers: [
            { id: "l9a", text: "Remotely — video works well" },
            { id: "l9b", text: "In person — physical presence matters" },
            { id: "l9c", text: "Either works for me" },
          ],
        },
        {
          id: "l10",
          number: 11,
          category: "Practicalities",
          question: "How often were you thinking of going?",
          answers: [
            { id: "l10a", text: "Once a week — I want to progress actively" },
            { id: "l10b", text: "A couple of times a month" },
            { id: "l10c", text: "Once a month is enough" },
            { id: "l10d", text: "I am not sure yet — I will try and see" },
          ],
        },
        {
          id: "q_experience",
          number: 12,
          category: "Experience",
          question: "How important is it that the therapist has a lot of life experience?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Not important at all",
            labelMax: "Very important",
            valueLabels: [
              { max: 20, label: "Not important" },
              { max: 40, label: "Slightly important" },
              { max: 60, label: "Somewhat important" },
              { max: 80, label: "Fairly important" },
              { max: 100, label: "Very important" },
            ],
          },
        },
        {
          id: "l11",
          number: 13,
          category: "Practicalities",
          question: "What price range feels realistic per session?",
          answers: [
            { id: "l11a", text: "Under €80" },
            { id: "l11b", text: "€80–120" },
            { id: "l11c", text: "€120–160" },
            { id: "l11d", text: "Price is not a deciding factor" },
          ],
        },
        {
          id: "l12",
          number: 14,
          category: "Practicalities",
          question: "Would you like to use Kela reimbursement if possible?",
          note: "Kela can reimburse part of psychotherapy costs in certain situations. Short-term therapy is not Kela-reimbursable.",
          answers: [
            { id: "l12a", text: "Yes, it is important to me" },
            { id: "l12b", text: "Would be nice but not essential" },
            { id: "l12c", text: "I am not sure yet — I would like to hear more" },
          ],
        },
        {
          id: "l13",
          number: 15,
          category: "History",
          question: "Have you been in therapy or received similar support before?",
          answers: [
            { id: "l13a", text: "No, this would be my first time" },
            { id: "l13b", text: "Yes, and it felt positive" },
            { id: "l13c", text: "Yes, but something about it did not feel right" },
            { id: "l13d", text: "I am currently in therapy and looking for something alongside or instead" },
          ],
        },
        {
          id: "l14",
          number: 16,
          category: "Language",
          question: "What language would you like to use in therapy?",
          answers: [
            { id: "l14a", text: "Finnish" },
            { id: "l14b", text: "Swedish" },
            { id: "l14c", text: "English" },
          ],
        },
        {
          id: "l15",
          number: 17,
          category: "Therapist",
          question: "Does the therapist's gender matter to you?",
          answers: [
            { id: "l15a", text: "Woman" },
            { id: "l15b", text: "Man" },
            { id: "l15c", text: "Non-binary" },
            { id: "l15d", text: "No preference" },
          ],
        },
        {
          id: "l16",
          number: 18,
          category: "You",
          question: "What do you hope will change in your life?",
          openText: true,
          note: "Write as little or as much as you like. This helps refine your match.",
        },
      ],
    },
  },
  fi: {
    short: {
      id: "short",
      title: "Lyhyt aloitus",
      description:
        "10 kysymystä, noin 3 minuuttia. Kevyempi ensimmäinen askel silloin, kun haluat vain päästä liikkeelle.",
      questions: [
        {
          id: "q1",
          number: 1,
          category: "Tilanne",
          question: "Mikä tuntuu raskaimmalta juuri nyt?",
          answers: [
            { id: "q1a", text: "Arki tai työ painaa, energiani on koetuksella" },
            { id: "q1b", text: "Mielessäni on yksi tietty asia, josta haluaisin puhua" },
            { id: "q1c", text: "Elämässäni on iso muutos käynnissä ja tarvitsen tukea" },
            { id: "q1d", text: "En osaa vielä nimetä — tuntuu vain epäselvältä ja raskaalta" },
            { id: "q1e", text: "Haluan vain tutustua — en ole varma tarvitsenko apua" },
          ],
        },
        {
          id: "q2",
          number: 2,
          category: "Tavoite",
          question: "Mitä haluat terapialta juuri nyt?",
          answers: [
            { id: "q2a", text: "Haluan tuntea oloni kevyemmäksi" },
            { id: "q2b", text: "Haluan ymmärtää itseäni paremmin" },
            { id: "q2c", text: "Haluan ratkaista tietyn ongelman" },
            { id: "q2d", text: "Haluan saada aikaan todellista muutosta" },
          ],
        },
        {
          id: "q3",
          number: 3,
          category: "Kohtaamistapa",
          question: "Millainen ihminen auttaa sinua eniten vaikeissa hetkissä?",
          answers: [
            { id: "q3a", text: "Rauhallinen ja lempeä" },
            { id: "q3b", text: "Rehellinen ja suora" },
            { id: "q3c", text: "Lämmin ja rohkaiseva" },
            { id: "q3d", text: "Strukturoitu ja tavoitteellinen" },
            { id: "q3e", text: "En osaa vielä sanoa — kaikki käy" },
          ],
        },
        {
          id: "q_workstyle",
          number: 4,
          category: "Työskentelyote",
          question: "Miten haluat terapeutin työskentelevän kanssasi?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Kuuntelee enimmäkseen",
            labelMax: "Ohjaa aktiivisesti",
            valueLabels: [
              { max: 20, label: "Kuunteleva ja läsnäoleva" },
              { max: 40, label: "Enimmäkseen kuunteleva" },
              { max: 60, label: "Tasapainoinen" },
              { max: 80, label: "Melko ohjaava" },
              { max: 100, label: "Aktiivisesti ohjaava" },
            ],
          },
        },
        {
          id: "q_experience",
          number: 5,
          category: "Kokemus",
          question: "Kuinka tärkeää on että terapeutilla on paljon elämänkokemusta?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Ei lainkaan tärkeää",
            labelMax: "Erittäin tärkeää",
            valueLabels: [
              { max: 20, label: "Ei merkitystä" },
              { max: 40, label: "Vähän merkitystä" },
              { max: 60, label: "Jonkin verran tärkeää" },
              { max: 80, label: "Melko tärkeää" },
              { max: 100, label: "Erittäin tärkeää" },
            ],
          },
        },
        {
          id: "q4",
          number: 6,
          category: "Terapeutti",
          question: "Onko terapeutin sukupuolella merkitystä?",
          answers: [
            { id: "q4a", text: "Nainen" },
            { id: "q4b", text: "Mies" },
            { id: "q4c", text: "Muunsukupuolinen" },
            { id: "q4d", text: "Ei väliä" },
          ],
        },
        {
          id: "q5",
          number: 7,
          category: "Käytännöt",
          question: "Mikä hintaluokka tuntuu realistiselta per sessio?",
          answers: [
            { id: "q5a", text: "Alle 80 €" },
            { id: "q5b", text: "80–120 €" },
            { id: "q5c", text: "120–160 €" },
            { id: "q5d", text: "Hinta ei ole ratkaiseva tekijä" },
          ],
        },
        {
          id: "q6",
          number: 8,
          category: "Käytännöt",
          question: "Haluaisitko käyttää Kela-korvausta jos mahdollista?",
          note: "Kela voi korvata osan psykoterapiakustannuksista tietyissä tilanteissa. Lyhytterapia ei ole Kela-korvattavaa.",
          answers: [
            { id: "q6a", text: "Kyllä, näytä vain sopivat terapeutit" },
            { id: "q6b", text: "Olisi kätevää mutta ei välttämätöntä" },
            { id: "q6c", text: "En ole varma vielä" },
          ],
        },
        {
          id: "q7",
          number: 9,
          category: "Käytännöt",
          question: "Haluaisitko tavata etänä vai kasvotusten?",
          answers: [
            { id: "q7a", text: "Etänä, videoyhteys sopii hyvin" },
            { id: "q7b", text: "Kasvotusten, fyysinen läsnäolo on minulle tärkeää" },
            { id: "q7c", text: "Kumpi vain sopii" },
          ],
        },
        {
          id: "q8",
          number: 10,
          category: "Kieli",
          question: "Millä kielellä haluaisit käydä terapiaa?",
          answers: [
            { id: "q8a", text: "Suomi" },
            { id: "q8b", text: "Ruotsi" },
            { id: "q8c", text: "Englanti" },
          ],
        },
      ],
    },
    long: {
      id: "long",
      title: "Syvempi aloitus",
      description:
        "18 kysymystä, noin 6 minuuttia. Enemmän nyanssia, enemmän yksityiskohtia ja pehmeämpi polku tarkempaan matchiin.",
      questions: [
        {
          id: "l1",
          number: 1,
          category: "Tilanne",
          question: "Mikä tuntuu raskaimmalta juuri nyt?",
          answers: [
            { id: "l1a", text: "Arki tai työ painaa, energiani on koetuksella" },
            { id: "l1b", text: "Mielessäni on yksi tietty asia, josta haluaisin puhua" },
            { id: "l1c", text: "Elämässäni on iso muutos käynnissä ja tarvitsen tukea" },
            { id: "l1d", text: "En osaa vielä nimetä — tuntuu vain epäselvältä ja raskaalta" },
            { id: "l1e", text: "Haluan vain tutustua — en ole varma tarvitsenko apua" },
          ],
        },
        {
          id: "l2",
          number: 2,
          category: "Tavoite",
          question: "Mitä haluat terapialta juuri nyt?",
          answers: [
            { id: "l2a", text: "Haluan tuntea oloni kevyemmäksi" },
            { id: "l2b", text: "Haluan ymmärtää itseäni paremmin" },
            { id: "l2c", text: "Haluan ratkaista tietyn ongelman" },
            { id: "l2d", text: "Haluan saada aikaan todellista muutosta" },
          ],
        },
        {
          id: "l3",
          number: 3,
          category: "Tilanne",
          question: "Kuinka kauan tämä on painanut sinua?",
          answers: [
            { id: "l3a", text: "Aika hiljattain, tuntuu vielä uudelta" },
            { id: "l3b", text: "Muutaman kuukauden ajan" },
            { id: "l3c", text: "Pidemmän aikaa, yli vuoden" },
            { id: "l3d", text: "Niin kauan kuin muistan — se on aina ollut jossakin muodossa läsnä" },
          ],
        },
        {
          id: "l4",
          number: 4,
          category: "Tilanne",
          question: "Mistä elämän osa-alueesta haluaisit puhua? (voit valita useamman)",
          multiSelect: true,
          answers: [
            { id: "l4a", text: "Työ, ura tai opinnot" },
            { id: "l4b", text: "Ihmissuhteet, parisuhde tai perhe" },
            { id: "l4c", text: "Identiteetti tai elämän suunta" },
            { id: "l4d", text: "Mieliala, ahdistus tai uupumus" },
            { id: "l4e", text: "Jokin muu — kerron omin sanoin myöhemmin" },
          ],
        },
        {
          id: "l5",
          number: 5,
          category: "Tilanne",
          question: "Miten kuormittavana koet tilanteen arjessasi juuri nyt?",
          note: "Jos tunnet olevasi kriisissä, nopein saatavilla oleva tuki on aina tärkein seuraava askel.",
          answers: [
            { id: "l5a", text: "Pärjään, mutta halusin hakea tukea ajoissa" },
            { id: "l5b", text: "Arki sujuu jotenkin, mutta energia on vähissä" },
            { id: "l5c", text: "Tuntuu melko raskaalta ja tarvitsen apua nyt" },
            { id: "l5d", text: "Tuntuu ylivoimaiselta" },
          ],
        },
        {
          id: "l6",
          number: 6,
          category: "Kohtaamistapa",
          question: "Millainen ihminen auttaa sinua eniten vaikeissa hetkissä?",
          answers: [
            { id: "l6a", text: "Rauhallinen ja lempeä" },
            { id: "l6b", text: "Rehellinen ja suora" },
            { id: "l6c", text: "Lämmin ja rohkaiseva" },
            { id: "l6d", text: "Strukturoitu ja tavoitteellinen" },
            { id: "l6e", text: "En osaa vielä sanoa — kaikki käy" },
          ],
        },
        {
          id: "q_workstyle",
          number: 7,
          category: "Työskentelyote",
          question: "Miten haluat terapeutin työskentelevän kanssasi?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Kuuntelee enimmäkseen",
            labelMax: "Ohjaa aktiivisesti",
            valueLabels: [
              { max: 20, label: "Kuunteleva ja läsnäoleva" },
              { max: 40, label: "Enimmäkseen kuunteleva" },
              { max: 60, label: "Tasapainoinen" },
              { max: 80, label: "Melko ohjaava" },
              { max: 100, label: "Aktiivisesti ohjaava" },
            ],
          },
        },
        {
          id: "l7",
          number: 8,
          category: "Lähestymistapa",
          question: "Miten yleensä käsittelet vaikeita asioita?",
          answers: [
            { id: "l7a", text: "Puhun läheisilleni, yhteys auttaa" },
            { id: "l7b", text: "Pohdin asioita hiljaa itsekseni" },
            { id: "l7c", text: "Teen jotain konkreettista, toiminta auttaa" },
            { id: "l7d", text: "Vaihtelee tilanteen mukaan" },
          ],
        },
        {
          id: "l8",
          number: 9,
          category: "Lähestymistapa",
          question: "Mikä tahti tuntuisi oikealta?",
          answers: [
            { id: "l8a", text: "Rauhallisesti omaan tahtiin, ei kiirettä" },
            { id: "l8b", text: "Tavoitteellisesti, haluan tuntea edistystä" },
            { id: "l8c", text: "Kumpi sopii, olen joustava" },
          ],
        },
        {
          id: "l9",
          number: 10,
          category: "Käytännöt",
          question: "Haluaisitko tavata etänä vai kasvotusten?",
          answers: [
            { id: "l9a", text: "Etänä, videoyhteys sopii hyvin" },
            { id: "l9b", text: "Kasvotusten, fyysinen läsnäolo on minulle tärkeää" },
            { id: "l9c", text: "Kumpi vain sopii" },
          ],
        },
        {
          id: "l10",
          number: 11,
          category: "Käytännöt",
          question: "Kuinka usein ajattelit käydä?",
          answers: [
            { id: "l10a", text: "Kerran viikossa, haluan edetä aktiivisesti" },
            { id: "l10b", text: "Pari kertaa kuussa" },
            { id: "l10c", text: "Kerran kuussa riittää" },
            { id: "l10d", text: "En osaa vielä sanoa, kokeilen ensin" },
          ],
        },
        {
          id: "q_experience",
          number: 12,
          category: "Kokemus",
          question: "Kuinka tärkeää on että terapeutilla on paljon elämänkokemusta?",
          slider: {
            min: 0,
            max: 100,
            labelMin: "Ei lainkaan tärkeää",
            labelMax: "Erittäin tärkeää",
            valueLabels: [
              { max: 20, label: "Ei merkitystä" },
              { max: 40, label: "Vähän merkitystä" },
              { max: 60, label: "Jonkin verran tärkeää" },
              { max: 80, label: "Melko tärkeää" },
              { max: 100, label: "Erittäin tärkeää" },
            ],
          },
        },
        {
          id: "l11",
          number: 13,
          category: "Käytännöt",
          question: "Mikä hintaluokka tuntuu realistiselta per sessio?",
          answers: [
            { id: "l11a", text: "Alle 80 €" },
            { id: "l11b", text: "80–120 €" },
            { id: "l11c", text: "120–160 €" },
            { id: "l11d", text: "Hinta ei ole ratkaiseva tekijä" },
          ],
        },
        {
          id: "l12",
          number: 14,
          category: "Käytännöt",
          question: "Haluaisitko käyttää Kela-korvausta jos mahdollista?",
          note: "Kela voi korvata osan psykoterapiakustannuksista tietyissä tilanteissa. Lyhytterapia ei ole Kela-korvattavaa.",
          answers: [
            { id: "l12a", text: "Kyllä, se on minulle tärkeää" },
            { id: "l12b", text: "Olisi kätevää mutta ei välttämätöntä" },
            { id: "l12c", text: "En ole varma vielä — haluaisin kuulla lisää" },
          ],
        },
        {
          id: "l13",
          number: 15,
          category: "Historia",
          question: "Onko sinulla aiempaa kokemusta terapiasta tai vastaavasta tuesta?",
          answers: [
            { id: "l13a", text: "Ei, tämä olisi ensimmäinen kerta" },
            { id: "l13b", text: "Kyllä, ja se tuntui positiiviselta" },
            { id: "l13c", text: "Kyllä, mutta jokin siinä ei tuntunut oikealta" },
            { id: "l13d", text: "Olen tällä hetkellä terapiassa ja etsin jotain sen rinnalle tai tilalle" },
          ],
        },
        {
          id: "l14",
          number: 16,
          category: "Kieli",
          question: "Millä kielellä haluaisit käydä terapiaa?",
          answers: [
            { id: "l14a", text: "Suomi" },
            { id: "l14b", text: "Ruotsi" },
            { id: "l14c", text: "Englanti" },
          ],
        },
        {
          id: "l15",
          number: 17,
          category: "Terapeutti",
          question: "Onko terapeutin sukupuolella merkitystä?",
          answers: [
            { id: "l15a", text: "Nainen" },
            { id: "l15b", text: "Mies" },
            { id: "l15c", text: "Muunsukupuolinen" },
            { id: "l15d", text: "Ei väliä" },
          ],
        },
        {
          id: "l16",
          number: 18,
          category: "Sinä",
          question: "Mitä toivot muuttuvan elämässäsi?",
          openText: true,
          note: "Kirjoita niin vähän tai paljon kuin haluat. Tämä auttaa tarkentamaan matchausta.",
        },
      ],
    },
  },
};

export function getQuiz(quizId: QuizId, locale: Locale): Quiz {
  return quizzesByLocale[locale][quizId];
}

function readAnswer(answers: QuizAnswers, ...keys: string[]) {
  for (const key of keys) {
    const value = answers[key];
    if (typeof value === "string") {
      return value;
    }
  }

  return undefined;
}

function answerCopy(answerId: string | undefined, values: Record<string, string>, fallback: string) {
  if (!answerId) {
    return fallback;
  }

  return values[answerId] ?? fallback;
}

export function buildRecommendations(
  quizId: QuizId,
  answers: QuizAnswers,
  locale: Locale,
): Recommendation[] {
  if (locale === "fi") {
    const language = answerCopy(
      readAnswer(answers, "q8", "l14"),
      {
        q8a: "suomeksi", q8b: "ruotsiksi", q8c: "englanniksi",
        l14a: "suomeksi", l14b: "ruotsiksi", l14c: "englanniksi",
      },
      "sinulle luontevalla kielellä",
    );

    const supportNeed = answerCopy(
      readAnswer(answers, "q3", "l6"),
      {
        q3a: "rauhallista ja turvallista tilaa",
        q3b: "rehellistä ja suoraa lähestymistapaa",
        q3c: "lämmintä ja rohkaisevaa kohtaamista",
        q3d: "selkeää rakennetta ja tavoitteellista työskentelyä",
        l6a: "rauhallista ja turvallista tilaa",
        l6b: "rehellistä ja suoraa lähestymistapaa",
        l6c: "lämmintä ja rohkaisevaa kohtaamista",
        l6d: "selkeää rakennetta ja tavoitteellista työskentelyä",
      },
      "tapaa tulla kohdatuksi ilman että sinun tarvitsee selittää kaikkea heti",
    );

    const sessionMode = answerCopy(
      readAnswer(answers, "q7", "l9"),
      {
        q7a: "etänä", q7b: "kasvotusten", q7c: "sekä etänä että kasvotusten",
        l9a: "etänä", l9b: "kasvotusten", l9c: "sekä etänä että kasvotusten",
      },
      "joustavasti",
    );

    const pace = answerCopy(
      readAnswer(answers, "l8"),
      {
        l8a: "rauhallisesti omaan tahtiin",
        l8b: "selkeillä tavoitteilla ja tasaisella rytmillä",
        l8c: "joustavasti tilanteen mukaan",
      },
      "sinulle sopivassa tahdissa",
    );

    const focus = answerCopy(
      readAnswer(answers, "q1", "l1"),
      {
        q1a: "kannattelet kuormitusta energian, työn tai arjen ympärillä",
        q1b: "yksi tietty asia painaa mielessäsi vahvasti",
        q1c: "olet keskellä suurta elämänmuutosta",
        q1d: "yrität nimetä jotakin, joka tuntuu vielä epämääräiseltä",
        l1a: "kannattelet kuormitusta energian, työn tai arjen ympärillä",
        l1b: "yksi tietty asia painaa mielessäsi vahvasti",
        l1c: "olet keskellä suurta elämänmuutosta",
        l1d: "yrität nimetä jotakin, joka tuntuu vielä epämääräiseltä",
      },
      "sen äärellä, mikä tuntuu juuri nyt elämässäsi voimakkaimmalta",
    );

    const kelaPreference = readAnswer(answers, "q6", "l12");
    const kelaTag =
      kelaPreference === "q6a" || kelaPreference === "l12a"
        ? "Kela-polku mahdollinen"
        : "Joustava tapa aloittaa";

    const depthTag =
      quizId === "long" ? "Rakennettu pidemmän kyselyn pohjalta" : "Rakennettu lyhyen kyselyn pohjalta";

    return [
      {
        name: "Anna Mäkinen",
        title: "Kognitiivinen psykoterapeutti",
        availability: "Aikoja vapaana jo tällä viikolla",
        tags: [supportNeed, language, kelaTag],
        reason: `Anna nousee ensimmäiseksi, koska kuvasit tarvitsevasi ${supportNeed}. Hänen työskentelytapansa on selkeä, lämmin ja käytännöllinen, mikä tuntuu usein erityisen kannattelevalta silloin kun ${focus}. Hän voi tavata ${sessionMode} ja rakentaa ensimmäisen tapaamisen ${pace}.`,
      },
      {
        name: "Juhani Leppänen",
        title: "Psykodynaaminen terapeutti",
        availability: "Uusia asiakaspaikkoja ensi viikolla",
        tags: [language, "Pidempikestoinen työskentely", depthTag],
        reason: `Juhani on vahva vaihtoehto, kun haluat pysähtyä syvemmin ja ymmärtää, miten nykyinen kuormitus on rakentunut ajan myötä. Hän voi sopia erityisen hyvin tilanteisiin, joissa pinnan alla on useita kerroksia, mutta haluat silti rauhallisen rytmin ja tilaa ajatella ääneen ${language}.`,
      },
      {
        name: "Sari Rantanen",
        title: "ACT-terapeutti",
        availability: "Etävastaanottoja myös iltaisin",
        tags: [sessionMode, "Arjen työkalut", "Matala kynnys aloittaa"],
        reason: `Sari on hyvä kolmas suositus, jos toivot terapialta myös konkreettisia keinoja arkeen. Hänen lähestymistapansa auttaa usein silloin, kun haluat sekä myötätuntoa että hieman käytännöllistä liikettä eteenpäin. Tämä vaihtoehto toimii erityisen hyvin, jos haluat aloittaa ${sessionMode} ja pitää kynnyksen mahdollisimman lempeänä.`,
      },
    ];
  }

  const language = answerCopy(
    readAnswer(answers, "q8", "l14"),
    {
      q8a: "in Finnish", q8b: "in Swedish", q8c: "in English",
      l14a: "in Finnish", l14b: "in Swedish", l14c: "in English",
    },
    "in the language that feels natural to you",
  );

  const supportNeed = answerCopy(
    readAnswer(answers, "q3", "l6"),
    {
      q3a: "a calm and safe space",
      q3b: "an honest and direct approach",
      q3c: "warm and encouraging support",
      q3d: "clear structure and goal-oriented work",
      l6a: "a calm and safe space",
      l6b: "an honest and direct approach",
      l6c: "warm and encouraging support",
      l6d: "clear structure and goal-oriented work",
    },
    "a way of being met that does not ask too much of you at once",
  );

  const sessionMode = answerCopy(
    readAnswer(answers, "q7", "l9"),
    {
      q7a: "remotely", q7b: "in person", q7c: "either remotely or in person",
      l9a: "remotely", l9b: "in person", l9c: "either remotely or in person",
    },
    "in a flexible way",
  );

  const pace = answerCopy(
    readAnswer(answers, "l8"),
    {
      l8a: "slowly and at your own pace",
      l8b: "with clear goals and a steady rhythm",
      l8c: "with flexibility depending on the moment",
    },
    "at a pace that feels right for you",
  );

  const focus = answerCopy(
    readAnswer(answers, "q1", "l1"),
    {
      q1a: "carrying strain around energy, work, or everyday life",
      q1b: "holding one particular issue heavily in your mind",
      q1c: "moving through a major life change",
      q1d: "trying to name something that still feels vague",
      l1a: "carrying strain around energy, work, or everyday life",
      l1b: "holding one particular issue heavily in your mind",
      l1c: "moving through a major life change",
      l1d: "trying to name something that still feels vague",
    },
    "whatever in life feels most alive for you right now",
  );

  const kelaPreference = readAnswer(answers, "q6", "l12");
  const kelaTag =
    kelaPreference === "q6a" || kelaPreference === "l12a"
      ? "Kela pathway possible"
      : "Flexible way to begin";

  const depthTag =
    quizId === "long" ? "Built from the deeper quiz" : "Built from the shorter quiz";

  return [
    {
      name: "Anna Mäkinen",
      title: "Cognitive psychotherapist",
      availability: "Open times available this week",
      tags: [supportNeed, language, kelaTag],
      reason: `Anna rises first because you described needing ${supportNeed}. Her way of working is clear, warm, and practical, which often feels especially supportive when you are ${focus}. She can meet ${sessionMode} and shape a first appointment ${pace}.`,
    },
    {
      name: "Juhani Leppänen",
      title: "Psychodynamic therapist",
      availability: "New client openings next week",
      tags: [language, "Longer-term work", depthTag],
      reason: `Juhani is a strong alternative when you want to pause more deeply and understand how the current strain has grown over time. He can be a particularly good fit when there are layers beneath the surface, but you still want a calm rhythm and room to think aloud ${language}.`,
    },
    {
      name: "Sari Rantanen",
      title: "ACT therapist",
      availability: "Remote appointments also available in the evenings",
      tags: [sessionMode, "Everyday tools", "Low-pressure first step"],
      reason: `Sari is a good third recommendation if you hope therapy will leave you with practical tools to carry into daily life. Her approach often helps when you want both compassion and a little concrete forward movement. This option works especially well if you want to begin ${sessionMode} and keep the threshold as gentle as possible.`,
    },
  ];
}
