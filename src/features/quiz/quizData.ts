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
};

type LocalizedQuizCollection = Record<Locale, Record<QuizId, Quiz>>;

const quizzesByLocale: LocalizedQuizCollection = {
  en: {
    short: {
      id: "short",
      title: "Short introduction",
      description:
        "7 questions, about 2 minutes. A lighter first step when you simply want to get moving.",
      questions: [
        {
          id: "s1",
          number: 1,
          category: "Situation",
          question: "What best describes what feels heaviest for you right now?",
          answers: [
            { id: "s1a", text: "Daily life or work feels heavy — my energy is under strain" },
            { id: "s1b", text: "There is one specific thing on my mind I want to talk about" },
            { id: "s1c", text: "A big life change is happening and I need support" },
            { id: "s1d", text: "I cannot name it yet — it just feels unclear and heavy" },
          ],
        },
        {
          id: "s2",
          number: 2,
          category: "Language",
          question: "What language would you like to use with the professional?",
          answers: [
            { id: "s2a", text: "Finnish" },
            { id: "s2b", text: "Swedish" },
            { id: "s2c", text: "English" },
          ],
        },
        {
          id: "s3",
          number: 3,
          category: "Support style",
          question: "What kind of support feels most important right now?",
          answers: [
            { id: "s3a", text: "A safe space to unpack things without pressure" },
            { id: "s3b", text: "Concrete tools I can use in everyday life" },
            { id: "s3c", text: "Help understanding why I react the way I do" },
            { id: "s3d", text: "A clearer direction — I want movement and change" },
          ],
        },
        {
          id: "s4",
          number: 4,
          category: "Therapist",
          question: "Does the therapist's gender matter to you?",
          answers: [
            { id: "s4a", text: "Woman" },
            { id: "s4b", text: "Man" },
            { id: "s4c", text: "Non-binary" },
            { id: "s4d", text: "No preference" },
          ],
        },
        {
          id: "s5",
          number: 5,
          category: "Practicalities",
          question: "What price range feels realistic per session?",
          answers: [
            { id: "s5a", text: "Under €80" },
            { id: "s5b", text: "€80–120" },
            { id: "s5c", text: "€120–160" },
            { id: "s5d", text: "Price is not a deciding factor" },
          ],
        },
        {
          id: "s6",
          number: 6,
          category: "Practicalities",
          question: "Would you like to use Kela reimbursement if possible?",
          note: "Short-term therapy is not covered by Kela.",
          answers: [
            { id: "s6a", text: "Yes, show only eligible therapists" },
            { id: "s6b", text: "Would be nice but not essential" },
            { id: "s6c", text: "I'm not sure yet" },
          ],
        },
        {
          id: "s7",
          number: 7,
          category: "Practicalities",
          question: "Would you prefer to meet remotely or in person?",
          answers: [
            { id: "s7a", text: "Remotely — video works well" },
            { id: "s7b", text: "In person — physical presence matters" },
            { id: "s7c", text: "Either works for me" },
          ],
        },
      ],
    },
    long: {
      id: "long",
      title: "Deeper introduction",
      description:
        "16 questions, about 5 minutes. More nuance, more detail, and a softer path toward a more precise match.",
      questions: [
        {
          id: "l1",
          number: 1,
          category: "Situation",
          question: "What best describes what feels heaviest for you right now?",
          answers: [
            { id: "l1a", text: "Daily life or work feels heavy — my energy is under strain" },
            { id: "l1b", text: "There is one specific thing on my mind I want to talk about" },
            { id: "l1c", text: "A big life change is happening and I need support" },
            { id: "l1d", text: "I cannot name it yet — it just feels unclear and heavy" },
          ],
        },
        {
          id: "l2",
          number: 2,
          category: "Language",
          question: "What language would you like to use with the professional?",
          answers: [
            { id: "l2a", text: "Finnish" },
            { id: "l2b", text: "Swedish" },
            { id: "l2c", text: "English" },
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
          question: "What area of life would you most want to talk about?",
          multiSelect: true,
          note: "You can choose more than one.",
          answers: [
            { id: "l4a", text: "Work, career or studies" },
            { id: "l4b", text: "Relationships, partnership or family" },
            { id: "l4c", text: "Identity or direction in life" },
            { id: "l4d", text: "Mood, anxiety or exhaustion" },
            { id: "l4e", text: "Something else" },
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
          category: "Approach",
          question: "How do you usually work through difficult things?",
          answers: [
            { id: "l6a", text: "I talk to people close to me — connection helps" },
            { id: "l6b", text: "I reflect quietly on my own" },
            { id: "l6c", text: "I do something concrete — action helps" },
            { id: "l6d", text: "It varies depending on the situation" },
          ],
        },
        {
          id: "l7",
          number: 7,
          category: "Approach",
          question: "What kind of support feels most important right now?",
          answers: [
            { id: "l7a", text: "A safe space to unpack things without pressure" },
            { id: "l7b", text: "Concrete tools I can use in everyday life" },
            { id: "l7c", text: "Help understanding why I react the way I do" },
            { id: "l7d", text: "A clearer direction — I want movement and change" },
          ],
        },
        {
          id: "l8",
          number: 8,
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
          number: 9,
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
          number: 10,
          category: "Practicalities",
          question: "What session frequency sounds right to you?",
          answers: [
            { id: "l10a", text: "Once a week — I want to progress actively" },
            { id: "l10b", text: "A couple of times a month" },
            { id: "l10c", text: "Once a month is enough" },
            { id: "l10d", text: "I am not sure yet" },
          ],
        },
        {
          id: "l11",
          number: 11,
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
          number: 12,
          category: "Practicalities",
          question: "Would you like to use Kela reimbursement if possible?",
          note: "Short-term therapy is not covered by Kela.",
          answers: [
            { id: "l12a", text: "Yes, show only eligible therapists" },
            { id: "l12b", text: "Would be nice but not essential" },
            { id: "l12c", text: "I'm not sure yet" },
          ],
        },
        {
          id: "l13",
          number: 13,
          category: "History",
          question: "Have you been in therapy or received similar support before?",
          answers: [
            { id: "l13a", text: "No, this would be my first time" },
            { id: "l13b", text: "Yes, and it felt positive" },
            { id: "l13c", text: "Yes, but something about it did not feel right" },
            { id: "l13d", text: "I am currently in therapy and looking for something alongside it" },
          ],
        },
        {
          id: "l14",
          number: 14,
          category: "History",
          question: "If you have been before, what felt good or what felt missing?",
          openText: true,
          note: "Optional.",
        },
        {
          id: "l15",
          number: 15,
          category: "You",
          question: "How would you describe your relationship to your own emotions?",
          answers: [
            { id: "l15a", text: "Emotions are strongly present and sometimes overwhelming" },
            { id: "l15b", text: "I tend to keep my emotions inside" },
            { id: "l15c", text: "Hard to say — I have not thought about it much" },
            { id: "l15d", text: "I am quite balanced emotionally" },
          ],
        },
        {
          id: "l16",
          number: 16,
          category: "You",
          question: "Is there anything else you would want a therapist to know before a first appointment?",
          openText: true,
          note: "Optional.",
        },
      ],
    },
  },
  fi: {
    short: {
      id: "short",
      title: "Lyhyt aloitus",
      description:
        "7 kysymystä, noin 2 minuuttia. Kevyempi ensimmäinen askel silloin, kun haluat vain päästä liikkeelle.",
      questions: [
        {
          id: "s1",
          number: 1,
          category: "Tilanne",
          question: "Mikä kuvaa parhaiten sitä, mikä tuntuu juuri nyt raskaimmalta?",
          answers: [
            { id: "s1a", text: "Arki tai työ painaa — energiani on koetuksella" },
            { id: "s1b", text: "Mielessäni on yksi tietty asia, josta haluaisin puhua" },
            { id: "s1c", text: "Elämässäni on iso muutos käynnissä ja tarvitsen tukea" },
            { id: "s1d", text: "En osaa vielä nimetä — tuntuu vain epäselvältä ja raskaalta" },
          ],
        },
        {
          id: "s2",
          number: 2,
          category: "Kieli",
          question: "Millä kielellä haluaisit keskustella ammattilaisen kanssa?",
          answers: [
            { id: "s2a", text: "Suomi" },
            { id: "s2b", text: "Ruotsi" },
            { id: "s2c", text: "Englanti" },
          ],
        },
        {
          id: "s3",
          number: 3,
          category: "Tuen tyyli",
          question: "Millainen tuki tuntuu juuri nyt tärkeimmältä?",
          answers: [
            { id: "s3a", text: "Turvallinen tila purkaa ajatuksia ilman painetta" },
            { id: "s3b", text: "Konkreettisia työkaluja arkeen" },
            { id: "s3c", text: "Apua ymmärtää miksi reagoin niin kuin reagoin" },
            { id: "s3d", text: "Selkeä suunta — haluan liikettä ja muutosta" },
          ],
        },
        {
          id: "s4",
          number: 4,
          category: "Terapeutti",
          question: "Onko terapeutin sukupuolella sinulle merkitystä?",
          answers: [
            { id: "s4a", text: "Nainen" },
            { id: "s4b", text: "Mies" },
            { id: "s4c", text: "Muunsukupuolinen" },
            { id: "s4d", text: "Ei väliä" },
          ],
        },
        {
          id: "s5",
          number: 5,
          category: "Käytännöt",
          question: "Mikä hintataso tuntuu realistiselta yhtä käyntiä kohden?",
          answers: [
            { id: "s5a", text: "Alle 80 €" },
            { id: "s5b", text: "80–120 €" },
            { id: "s5c", text: "120–160 €" },
            { id: "s5d", text: "Hinta ei ole ratkaiseva tekijä" },
          ],
        },
        {
          id: "s6",
          number: 6,
          category: "Käytännöt",
          question: "Haluaisitko hyödyntää Kela-korvausta, jos se on mahdollista?",
          note: "Lyhytterapia ei ole Kela-korvattavaa.",
          answers: [
            { id: "s6a", text: "Kyllä, näytä vain sopivat terapeutit" },
            { id: "s6b", text: "Olisi kätevää mutta ei välttämätöntä" },
            { id: "s6c", text: "En ole varma vielä" },
          ],
        },
        {
          id: "s7",
          number: 7,
          category: "Käytännöt",
          question: "Tapaisitko mieluummin etänä vai kasvokkain?",
          answers: [
            { id: "s7a", text: "Etänä — videoyhteys sopii hyvin" },
            { id: "s7b", text: "Kasvokkain — fyysinen läsnäolo on tärkeää" },
            { id: "s7c", text: "Kumpi vain sopii" },
          ],
        },
      ],
    },
    long: {
      id: "long",
      title: "Syvempi aloitus",
      description:
        "16 kysymystä, noin 5 minuuttia. Enemmän nyanssia, enemmän yksityiskohtia ja pehmeämpi polku tarkempaan matchiin.",
      questions: [
        {
          id: "l1",
          number: 1,
          category: "Tilanne",
          question: "Mikä kuvaa parhaiten sitä, mikä tuntuu juuri nyt raskaimmalta?",
          answers: [
            { id: "l1a", text: "Arki tai työ painaa — energiani on koetuksella" },
            { id: "l1b", text: "Mielessäni on yksi tietty asia, josta haluaisin puhua" },
            { id: "l1c", text: "Elämässäni on iso muutos käynnissä ja tarvitsen tukea" },
            { id: "l1d", text: "En osaa vielä nimetä — tuntuu vain epäselvältä ja raskaalta" },
          ],
        },
        {
          id: "l2",
          number: 2,
          category: "Kieli",
          question: "Millä kielellä haluaisit keskustella ammattilaisen kanssa?",
          answers: [
            { id: "l2a", text: "Suomi" },
            { id: "l2b", text: "Ruotsi" },
            { id: "l2c", text: "Englanti" },
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
            { id: "l3d", text: "Niin kauan kuin muistan" },
          ],
        },
        {
          id: "l4",
          number: 4,
          category: "Tilanne",
          question: "Mistä elämänalueesta haluaisit puhua eniten?",
          multiSelect: true,
          note: "Voit valita useamman.",
          answers: [
            { id: "l4a", text: "Työ, ura tai opinnot" },
            { id: "l4b", text: "Ihmissuhteet, parisuhde tai perhe" },
            { id: "l4c", text: "Identiteetti tai elämän suunta" },
            { id: "l4d", text: "Mieliala, ahdistus tai uupumus" },
            { id: "l4e", text: "Jokin muu" },
          ],
        },
        {
          id: "l5",
          number: 5,
          category: "Tilanne",
          question: "Kuinka paljon tämä häiritsee arkeasi juuri nyt?",
          note: "Jos tunnet olevasi kriisissä, nopein saatavilla oleva tuki on aina tärkein askel.",
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
          category: "Lähestymistapa",
          question: "Miten yleensä käsittelet vaikeita asioita?",
          answers: [
            { id: "l6a", text: "Puhun läheisilleni — yhteys auttaa" },
            { id: "l6b", text: "Pohdin hiljaa itsekseni" },
            { id: "l6c", text: "Teen jotain konkreettista — toiminta auttaa" },
            { id: "l6d", text: "Vaihtelee tilanteen mukaan" },
          ],
        },
        {
          id: "l7",
          number: 7,
          category: "Lähestymistapa",
          question: "Millainen tuki tuntuu juuri nyt tärkeimmältä?",
          answers: [
            { id: "l7a", text: "Turvallinen tila purkaa ajatuksia ilman painetta" },
            { id: "l7b", text: "Konkreettisia työkaluja arkeen" },
            { id: "l7c", text: "Apua ymmärtää miksi reagoin niin kuin reagoin" },
            { id: "l7d", text: "Selkeä suunta — haluan liikettä ja muutosta" },
          ],
        },
        {
          id: "l8",
          number: 8,
          category: "Lähestymistapa",
          question: "Millainen etenemistahti tuntuisi sinulle oikealta?",
          answers: [
            { id: "l8a", text: "Rauhallisesti omaan tahtiin, ei kiirettä" },
            { id: "l8b", text: "Tavoitteellisesti — haluan tuntea edistystä" },
            { id: "l8c", text: "Kumpi sopii, olen joustava" },
          ],
        },
        {
          id: "l9",
          number: 9,
          category: "Käytännöt",
          question: "Tapaisitko mieluummin etänä vai kasvokkain?",
          answers: [
            { id: "l9a", text: "Etänä — videoyhteys sopii hyvin" },
            { id: "l9b", text: "Kasvokkain — fyysinen läsnäolo on tärkeää" },
            { id: "l9c", text: "Kumpi vain sopii" },
          ],
        },
        {
          id: "l10",
          number: 10,
          category: "Käytännöt",
          question: "Millainen tapaamistiheys kuulostaa sinulle sopivalta?",
          answers: [
            { id: "l10a", text: "Kerran viikossa — haluan edetä aktiivisesti" },
            { id: "l10b", text: "Pari kertaa kuussa" },
            { id: "l10c", text: "Kerran kuussa riittää" },
            { id: "l10d", text: "En osaa vielä sanoa" },
          ],
        },
        {
          id: "l11",
          number: 11,
          category: "Käytännöt",
          question: "Mikä hintataso tuntuu realistiselta yhtä käyntiä kohden?",
          answers: [
            { id: "l11a", text: "Alle 80 €" },
            { id: "l11b", text: "80–120 €" },
            { id: "l11c", text: "120–160 €" },
            { id: "l11d", text: "Hinta ei ole ratkaiseva tekijä" },
          ],
        },
        {
          id: "l12",
          number: 12,
          category: "Käytännöt",
          question: "Haluaisitko hyödyntää Kela-korvausta, jos se on mahdollista?",
          note: "Lyhytterapia ei ole Kela-korvattavaa.",
          answers: [
            { id: "l12a", text: "Kyllä, näytä vain sopivat terapeutit" },
            { id: "l12b", text: "Olisi kätevää mutta ei välttämätöntä" },
            { id: "l12c", text: "En ole varma vielä" },
          ],
        },
        {
          id: "l13",
          number: 13,
          category: "Historia",
          question: "Oletko ollut aiemmin terapiassa tai saanut vastaavaa tukea?",
          answers: [
            { id: "l13a", text: "Ei, tämä olisi ensimmäinen kerta" },
            { id: "l13b", text: "Kyllä, ja se tuntui positiiviselta" },
            { id: "l13c", text: "Kyllä, mutta jokin siinä ei tuntunut oikealta" },
            { id: "l13d", text: "Olen tällä hetkellä terapiassa ja etsin jotain sen rinnalle" },
          ],
        },
        {
          id: "l14",
          number: 14,
          category: "Historia",
          question: "Jos olet käynyt aiemmin, mikä tuntui hyvältä tai mikä puuttui?",
          openText: true,
          note: "Valinnainen.",
        },
        {
          id: "l15",
          number: 15,
          category: "Sinä",
          question: "Miten kuvailisit suhdettasi omiin tunteisiisi?",
          answers: [
            { id: "l15a", text: "Tunteet ovat vahvasti läsnä ja joskus ylivoimaisia" },
            { id: "l15b", text: "Pidän tunteeni usein sisälläni" },
            { id: "l15c", text: "Vaikea sanoa — en ole paljon miettinyt" },
            { id: "l15d", text: "Olen melko tasapainoinen tunnepuolella" },
          ],
        },
        {
          id: "l16",
          number: 16,
          category: "Sinä",
          question: "Onko jotain muuta, mitä haluaisit terapeutin tietävän ennen ensimmäistä tapaamista?",
          openText: true,
          note: "Valinnainen.",
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
      readAnswer(answers, "s2", "l2"),
      {
        s2a: "suomeksi",
        s2b: "ruotsiksi",
        s2c: "englanniksi",
        l2a: "suomeksi",
        l2b: "ruotsiksi",
        l2c: "englanniksi",
      },
      "sinulle luontevalla kielellä",
    );

    const supportNeed = answerCopy(
      readAnswer(answers, "s3", "l7"),
      {
        s3a: "turvallista ja paineetonta tilaa purkaa asioita",
        s3b: "konkreettisia työkaluja arkeen",
        s3c: "apua omien reaktioiden ymmärtämiseen",
        s3d: "selkeämpää suuntaa ja liikettä eteenpäin",
        l7a: "turvallista ja paineetonta tilaa purkaa asioita",
        l7b: "konkreettisia työkaluja arkeen",
        l7c: "apua omien reaktioiden ymmärtämiseen",
        l7d: "selkeämpää suuntaa ja liikettä eteenpäin",
      },
      "tapaa tulla kohdatuksi ilman että sinun tarvitsee selittää kaikkea heti",
    );

    const sessionMode = answerCopy(
      readAnswer(answers, "s7", "l9"),
      {
        s7a: "etänä",
        s7b: "kasvokkain",
        s7c: "sekä etänä että kasvokkain",
        l9a: "etänä",
        l9b: "kasvokkain",
        l9c: "sekä etänä että kasvokkain",
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
      readAnswer(answers, "s1", "l1"),
      {
        s1a: "kannattelet kuormitusta energian, työn tai arjen ympärillä",
        s1b: "yksi tietty asia painaa mielessäsi vahvasti",
        s1c: "olet keskellä suurta elämänmuutosta",
        s1d: "yrität nimetä jotakin, joka tuntuu vielä epämääräiseltä",
        l1a: "kannattelet kuormitusta energian, työn tai arjen ympärillä",
        l1b: "yksi tietty asia painaa mielessäsi vahvasti",
        l1c: "olet keskellä suurta elämänmuutosta",
        l1d: "yrität nimetä jotakin, joka tuntuu vielä epämääräiseltä",
      },
      "sen äärellä, mikä tuntuu juuri nyt elämässäsi voimakkaimmalta",
    );

    const kelaPreference = readAnswer(answers, "s6", "l12");
    const kelaTag =
      kelaPreference === "s6a" || kelaPreference === "l12a"
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
    readAnswer(answers, "s2", "l2"),
    {
      s2a: "in Finnish",
      s2b: "in Swedish",
      s2c: "in English",
      l2a: "in Finnish",
      l2b: "in Swedish",
      l2c: "in English",
    },
    "in the language that feels natural to you",
  );

  const supportNeed = answerCopy(
    readAnswer(answers, "s3", "l7"),
    {
      s3a: "a safe and pressure-free space to unpack what is going on",
      s3b: "concrete tools that can help in everyday life",
      s3c: "help understanding the roots of your reactions",
      s3d: "clearer direction and movement forward",
      l7a: "a safe and pressure-free space to unpack what is going on",
      l7b: "concrete tools that can help in everyday life",
      l7c: "help understanding the roots of your reactions",
      l7d: "clearer direction and movement forward",
    },
    "a way of being met that does not ask too much of you at once",
  );

  const sessionMode = answerCopy(
    readAnswer(answers, "s7", "l9"),
    {
      s7a: "remotely",
      s7b: "in person",
      s7c: "either remotely or in person",
      l9a: "remotely",
      l9b: "in person",
      l9c: "either remotely or in person",
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
    readAnswer(answers, "s1", "l1"),
    {
      s1a: "carrying strain around energy, work, or everyday life",
      s1b: "holding one particular issue heavily in your mind",
      s1c: "moving through a major life change",
      s1d: "trying to name something that still feels vague",
      l1a: "carrying strain around energy, work, or everyday life",
      l1b: "holding one particular issue heavily in your mind",
      l1c: "moving through a major life change",
      l1d: "trying to name something that still feels vague",
    },
    "whatever in life feels most alive for you right now",
  );

  const kelaPreference = readAnswer(answers, "s6", "l12");
  const kelaTag =
    kelaPreference === "s6a" || kelaPreference === "l12a"
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
