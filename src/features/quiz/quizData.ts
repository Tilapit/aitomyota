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
            { id: "s1a", text: "Daily life or work feels heavy and my energy is under strain" },
            { id: "s1b", text: "There is one specific thing on my mind that I want to talk about" },
            { id: "s1c", text: "A big life change is happening and I need support around it" },
            { id: "s1d", text: "I cannot quite name it yet, it just feels unclear and heavy" },
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
            { id: "s3a", text: "A safe space to unpack what is going on without pressure" },
            { id: "s3b", text: "Concrete tools I can try in everyday life" },
            { id: "s3c", text: "Help understanding why I react the way I do" },
            { id: "s3d", text: "A clearer direction, I want movement and change" },
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
            { id: "s4c", text: "Non-binary or another identity" },
            { id: "s4d", text: "No preference" },
          ],
        },
        {
          id: "s5",
          number: 5,
          category: "Therapist",
          question: "Does the therapist's age matter to you?",
          answers: [
            { id: "s5a", text: "Younger, under 40" },
            { id: "s5b", text: "More experienced, over 45" },
            { id: "s5c", text: "No preference" },
          ],
        },
        {
          id: "s6",
          number: 6,
          category: "Practicalities",
          question: "What price range feels realistic to you per session?",
          note: "These ranges are indicative and may vary by professional.",
          answers: [
            { id: "s6a", text: "Under 80 EUR" },
            { id: "s6b", text: "80 to 120 EUR" },
            { id: "s6c", text: "120 to 160 EUR" },
            { id: "s6d", text: "Price is not the deciding factor for me" },
          ],
        },
        {
          id: "s7",
          number: 7,
          category: "Practicalities",
          question: "Would you like to use Kela reimbursement if possible?",
          note: "Kela may reimburse part of psychotherapy costs under certain conditions in Finland.",
          answers: [
            { id: "s7a", text: "Yes, show only therapists who fit that path" },
            { id: "s7b", text: "It is helpful, but not essential" },
            { id: "s7c", text: "I am not sure yet, tell me more later" },
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
            { id: "l1a", text: "Daily life or work feels heavy and my energy is under strain" },
            { id: "l1b", text: "There is one specific thing on my mind that I want to talk about" },
            { id: "l1c", text: "A big life change is happening and I need support around it" },
            { id: "l1d", text: "I cannot quite name it yet, it just feels unclear and heavy" },
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
            { id: "l3a", text: "Quite recently, it still feels new" },
            { id: "l3b", text: "For a few months" },
            { id: "l3c", text: "For a longer time, more than a year" },
            { id: "l3d", text: "For as long as I can remember, it has always been there in some way" },
          ],
        },
        {
          id: "l4",
          number: 4,
          category: "Situation",
          question: "What area of life would you most want to talk about? You can choose more than one.",
          multiSelect: true,
          answers: [
            { id: "l4a", text: "Work, career, or studies" },
            { id: "l4b", text: "Relationships, partnership, or family" },
            { id: "l4c", text: "Identity or life direction" },
            { id: "l4d", text: "Mood, anxiety, or burnout" },
            { id: "l4e", text: "Something else, I can explain it in my own words later" },
          ],
        },
        {
          id: "l5",
          number: 5,
          category: "Situation",
          question: "How disruptive does this feel in your everyday life right now?",
          note: "If you feel in crisis, the fastest available support is always the most important next step.",
          answers: [
            { id: "l5a", text: "I am coping, but I wanted to seek support early" },
            { id: "l5b", text: "Daily life still works somehow, but my energy is running low" },
            { id: "l5c", text: "It feels quite heavy and I need help now" },
            { id: "l5d", text: "It feels overwhelming" },
          ],
        },
        {
          id: "l6",
          number: 6,
          category: "Approach",
          question: "How do you usually work through difficult things?",
          answers: [
            { id: "l6a", text: "I talk to people close to me, connection helps" },
            { id: "l6b", text: "I think about things quietly on my own" },
            { id: "l6c", text: "I do something concrete, action helps" },
            { id: "l6d", text: "It depends on the situation" },
          ],
        },
        {
          id: "l7",
          number: 7,
          category: "Approach",
          question: "What kind of professional would feel most natural to you?",
          answers: [
            { id: "l7a", text: "Warm and empathetic, I mainly want to feel heard" },
            { id: "l7b", text: "Knowledgeable and structured, I want to understand what is happening" },
            { id: "l7c", text: "Direct, I can appreciate challenging observations too" },
            { id: "l7d", text: "I am not sure yet, I would rather discover it as I go" },
          ],
        },
        {
          id: "l8",
          number: 8,
          category: "Approach",
          question: "What pace would feel right for you?",
          answers: [
            { id: "l8a", text: "Slowly and at my own pace, no rush" },
            { id: "l8b", text: "Goal-oriented, I want to feel progress" },
            { id: "l8c", text: "Either can work, I am flexible" },
          ],
        },
        {
          id: "l9",
          number: 9,
          category: "Practicalities",
          question: "Would you prefer to meet remotely or in person?",
          answers: [
            { id: "l9a", text: "Remote, video sessions would work well for me" },
            { id: "l9b", text: "In person, physical presence matters to me" },
            { id: "l9c", text: "Either works" },
          ],
        },
        {
          id: "l10",
          number: 10,
          category: "Practicalities",
          question: "What session frequency sounds right to you?",
          answers: [
            { id: "l10a", text: "Once a week, I want to move actively" },
            { id: "l10b", text: "A couple of times a month" },
            { id: "l10c", text: "Once a month is enough" },
            { id: "l10d", text: "I am not sure yet, I would rather try first" },
          ],
        },
        {
          id: "l11",
          number: 11,
          category: "Practicalities",
          question: "What price range feels realistic to you per session?",
          answers: [
            { id: "l11a", text: "Under 80 EUR" },
            { id: "l11b", text: "80 to 120 EUR" },
            { id: "l11c", text: "120 to 160 EUR" },
            { id: "l11d", text: "Price is not the deciding factor for me" },
          ],
        },
        {
          id: "l12",
          number: 12,
          category: "Practicalities",
          question: "Would you like to use Kela reimbursement if possible?",
          note: "Kela may reimburse part of psychotherapy costs under certain conditions in Finland.",
          answers: [
            { id: "l12a", text: "Yes, that matters to me" },
            { id: "l12b", text: "It is helpful, but not essential" },
            { id: "l12c", text: "I am not sure yet, I would like to hear more" },
          ],
        },
        {
          id: "l13",
          number: 13,
          category: "History",
          question: "Have you been in therapy or received similar professional support before?",
          answers: [
            { id: "l13a", text: "No, this would be my first experience" },
            { id: "l13b", text: "Yes, and it felt positive" },
            { id: "l13c", text: "Yes, but something about it did not feel right" },
            { id: "l13d", text: "I am currently in therapy and looking for something alongside it or in place of it" },
          ],
        },
        {
          id: "l14",
          number: 14,
          category: "History",
          question: "If you have been before, what felt good or what felt missing?",
          answers: [
            { id: "l14a", text: "I felt heard, but concrete tools were missing" },
            { id: "l14b", text: "There was a lot of theory, but the human connection felt distant" },
            { id: "l14c", text: "It worked well, I am looking for something similar" },
            { id: "l14d", text: "I do not have earlier experience, I will skip this" },
          ],
        },
        {
          id: "l15",
          number: 15,
          category: "You",
          question: "How would you describe your relationship to your own emotions?",
          answers: [
            { id: "l15a", text: "They feel very present, sometimes almost too much" },
            { id: "l15b", text: "They feel distant, it is hard to tell what I feel" },
            { id: "l15c", text: "I can function with them, but something still feels stuck" },
            { id: "l15d", text: "I have not really thought about that before" },
          ],
        },
        {
          id: "l16",
          number: 16,
          category: "You",
          question: "Is there anything else you would want a therapist to know before a first appointment?",
          openText: true,
          note: "Write as little or as much as you want. This helps add nuance to the match.",
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
            { id: "s1a", text: "Arki tai työ tuntuu raskaalta ja energia on koetuksella" },
            { id: "s1b", text: "Mielessä on yksi tietty asia, josta haluan puhua" },
            { id: "s1c", text: "Elämässä on iso muutos ja tarvitsen siihen tukea" },
            { id: "s1d", text: "En osaa vielä oikein nimetä sitä, kaikki tuntuu vain epäselvältä ja raskaalta" },
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
            { id: "s3a", text: "Turvallinen tila purkaa asioita ilman painetta" },
            { id: "s3b", text: "Konkreettiset keinot, joita voin kokeilla arjessa" },
            { id: "s3c", text: "Apua ymmärtää, miksi reagoin niin kuin reagoin" },
            { id: "s3d", text: "Selkeämpi suunta, haluan liikettä ja muutosta" },
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
            { id: "s4c", text: "Muunsukupuolinen tai muu identiteetti" },
            { id: "s4d", text: "Ei väliä" },
          ],
        },
        {
          id: "s5",
          number: 5,
          category: "Terapeutti",
          question: "Onko terapeutin iällä sinulle merkitystä?",
          answers: [
            { id: "s5a", text: "Nuorempi, alle 40-vuotias" },
            { id: "s5b", text: "Kokeneempi, yli 45-vuotias" },
            { id: "s5c", text: "Ei väliä" },
          ],
        },
        {
          id: "s6",
          number: 6,
          category: "Käytännöt",
          question: "Mikä hintataso tuntuu realistiselta yhtä käyntiä kohden?",
          note: "Nämä hintahaarukat ovat suuntaa antavia ja voivat vaihdella ammattilaisittain.",
          answers: [
            { id: "s6a", text: "Alle 80 EUR" },
            { id: "s6b", text: "80–120 EUR" },
            { id: "s6c", text: "120–160 EUR" },
            { id: "s6d", text: "Hinta ei ole minulle ratkaiseva tekijä" },
          ],
        },
        {
          id: "s7",
          number: 7,
          category: "Käytännöt",
          question: "Haluaisitko hyödyntää Kela-korvausta, jos se on mahdollista?",
          note: "Kela voi tietyin ehdoin korvata osan psykoterapian kustannuksista Suomessa.",
          answers: [
            { id: "s7a", text: "Kyllä, näytä vain siihen polkuun sopivat terapeutit" },
            { id: "s7b", text: "Se olisi hyödyllistä, mutta ei välttämätöntä" },
            { id: "s7c", text: "En ole vielä varma, kerro siitä myöhemmin lisää" },
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
            { id: "l1a", text: "Arki tai työ tuntuu raskaalta ja energia on koetuksella" },
            { id: "l1b", text: "Mielessä on yksi tietty asia, josta haluan puhua" },
            { id: "l1c", text: "Elämässä on iso muutos ja tarvitsen siihen tukea" },
            { id: "l1d", text: "En osaa vielä oikein nimetä sitä, kaikki tuntuu vain epäselvältä ja raskaalta" },
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
            { id: "l3a", text: "Melko hiljattain, tämä tuntuu vielä uudelta" },
            { id: "l3b", text: "Muutaman kuukauden ajan" },
            { id: "l3c", text: "Pidempään, yli vuoden" },
            { id: "l3d", text: "Niin kauan kuin muistan, tämä on ollut jollain tavalla mukana aina" },
          ],
        },
        {
          id: "l4",
          number: 4,
          category: "Tilanne",
          question: "Mistä elämänalueesta haluaisit puhua eniten? Voit valita useamman.",
          multiSelect: true,
          answers: [
            { id: "l4a", text: "Työ, ura tai opiskelu" },
            { id: "l4b", text: "Ihmissuhteet, parisuhde tai perhe" },
            { id: "l4c", text: "Identiteetti tai elämän suunta" },
            { id: "l4d", text: "Mieliala, ahdistus tai uupumus" },
            { id: "l4e", text: "Jokin muu, voin selittää sen myöhemmin omin sanoin" },
          ],
        },
        {
          id: "l5",
          number: 5,
          category: "Tilanne",
          question: "Kuinka paljon tämä häiritsee arkeasi juuri nyt?",
          note: "Jos koet olevasi kriisissä, nopein saatavilla oleva tuki on aina tärkein seuraava askel.",
          answers: [
            { id: "l5a", text: "Pärjään vielä, mutta halusin hakea tukea ajoissa" },
            { id: "l5b", text: "Arki toimii jotenkin, mutta energia on vähissä" },
            { id: "l5c", text: "Tämä tuntuu melko raskaalta ja tarvitsen apua nyt" },
            { id: "l5d", text: "Tämä tuntuu ylivoimaiselta" },
          ],
        },
        {
          id: "l6",
          number: 6,
          category: "Lähestymistapa",
          question: "Miten yleensä käsittelet vaikeita asioita?",
          answers: [
            { id: "l6a", text: "Puhun läheisilleni, yhteys auttaa" },
            { id: "l6b", text: "Pohdin asioita hiljaa itsekseni" },
            { id: "l6c", text: "Teen jotain konkreettista, toiminta auttaa" },
            { id: "l6d", text: "Se riippuu tilanteesta" },
          ],
        },
        {
          id: "l7",
          number: 7,
          category: "Lähestymistapa",
          question: "Millainen ammattilainen tuntuisi sinulle luontevimmalta?",
          answers: [
            { id: "l7a", text: "Lämmin ja empaattinen, haluan ennen kaikkea tulla kuulluksi" },
            { id: "l7b", text: "Asiantunteva ja jäsentävä, haluan ymmärtää mitä tapahtuu" },
            { id: "l7c", text: "Suora, pystyn arvostamaan myös haastavia havaintoja" },
            { id: "l7d", text: "En ole vielä varma, mieluummin löydän sen matkan varrella" },
          ],
        },
        {
          id: "l8",
          number: 8,
          category: "Lähestymistapa",
          question: "Millainen etenemistahti tuntuisi sinulle oikealta?",
          answers: [
            { id: "l8a", text: "Rauhallisesti ja omaan tahtiin, ilman kiirettä" },
            { id: "l8b", text: "Tavoitteellisesti, haluan tuntea edistyväni" },
            { id: "l8c", text: "Kumpikin voi toimia, olen joustava" },
          ],
        },
        {
          id: "l9",
          number: 9,
          category: "Käytännöt",
          question: "Tapaisitko mieluummin etänä vai kasvokkain?",
          answers: [
            { id: "l9a", text: "Etänä, videovastaanotto sopisi minulle hyvin" },
            { id: "l9b", text: "Kasvokkain, fyysinen läsnäolo on minulle tärkeää" },
            { id: "l9c", text: "Kumpikin sopii" },
          ],
        },
        {
          id: "l10",
          number: 10,
          category: "Käytännöt",
          question: "Millainen tapaamistiheys kuulostaa sinulle sopivalta?",
          answers: [
            { id: "l10a", text: "Kerran viikossa, haluan edetä aktiivisesti" },
            { id: "l10b", text: "Muutaman kerran kuukaudessa" },
            { id: "l10c", text: "Kerran kuukaudessa riittää" },
            { id: "l10d", text: "En ole vielä varma, haluaisin ensin kokeilla" },
          ],
        },
        {
          id: "l11",
          number: 11,
          category: "Käytännöt",
          question: "Mikä hintataso tuntuu realistiselta yhtä käyntiä kohden?",
          answers: [
            { id: "l11a", text: "Alle 80 EUR" },
            { id: "l11b", text: "80–120 EUR" },
            { id: "l11c", text: "120–160 EUR" },
            { id: "l11d", text: "Hinta ei ole minulle ratkaiseva tekijä" },
          ],
        },
        {
          id: "l12",
          number: 12,
          category: "Käytännöt",
          question: "Haluaisitko hyödyntää Kela-korvausta, jos se on mahdollista?",
          note: "Kela voi tietyin ehdoin korvata osan psykoterapian kustannuksista Suomessa.",
          answers: [
            { id: "l12a", text: "Kyllä, sillä on minulle merkitystä" },
            { id: "l12b", text: "Se olisi hyödyllistä, mutta ei välttämätöntä" },
            { id: "l12c", text: "En ole vielä varma, haluaisin kuulla lisää" },
          ],
        },
        {
          id: "l13",
          number: 13,
          category: "Historia",
          question: "Oletko ollut aiemmin terapiassa tai saanut vastaavaa ammatillista tukea?",
          answers: [
            { id: "l13a", text: "En, tämä olisi ensimmäinen kokemukseni" },
            { id: "l13b", text: "Kyllä, ja se tuntui hyvältä" },
            { id: "l13c", text: "Kyllä, mutta jokin siinä ei tuntunut oikealta" },
            { id: "l13d", text: "Olen tällä hetkellä terapiassa ja etsin jotain sen rinnalle tai tilalle" },
          ],
        },
        {
          id: "l14",
          number: 14,
          category: "Historia",
          question: "Jos olet käynyt aiemmin, mikä tuntui hyvältä tai mikä puuttui?",
          answers: [
            { id: "l14a", text: "Tulin kuulluksi, mutta konkreettisia keinoja puuttui" },
            { id: "l14b", text: "Teoriaa oli paljon, mutta inhimillinen yhteys tuntui etäiseltä" },
            { id: "l14c", text: "Se toimi hyvin, etsin jotakin samankaltaista" },
            { id: "l14d", text: "Minulla ei ole aiempaa kokemusta, ohitan tämän" },
          ],
        },
        {
          id: "l15",
          number: 15,
          category: "Sinä",
          question: "Miten kuvailisit suhdettasi omiin tunteisiisi?",
          answers: [
            { id: "l15a", text: "Ne tuntuvat hyvin läsnä olevilta, joskus melkein liikaakin" },
            { id: "l15b", text: "Ne tuntuvat etäisiltä, minun on vaikea sanoa mitä tunnen" },
            { id: "l15c", text: "Pystyn toimimaan niiden kanssa, mutta jokin tuntuu silti jumittuneelta" },
            { id: "l15d", text: "En ole oikeastaan ajatellut sitä aiemmin" },
          ],
        },
        {
          id: "l16",
          number: 16,
          category: "Sinä",
          question: "Onko jotain muuta, mitä haluaisit terapeutin tietävän ennen ensimmäistä tapaamista?",
          openText: true,
          note: "Kirjoita niin vähän tai paljon kuin haluat. Tämä auttaa tuomaan matchiin lisää sävyjä.",
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
        s3b: "käytännöllisiä keinoja arjen tueksi",
        s3c: "apua omien reaktioiden juurien ymmärtämiseen",
        s3d: "selkeämpää suuntaa ja liikettä eteenpäin",
        l7a: "lämmintä ja empaattista kohtaamista",
        l7b: "jäsenneltyä ja ajatuksellista työskentelytapaa",
        l7c: "rehellistä, jopa hieman haastavaa peilausta",
        l7d: "tilaa löytää sopiva tapa ilman pakottamista",
      },
      "tapaa tulla kohdatuksi ilman että sinun tarvitsee selittää kaikkea heti",
    );

    const sessionMode = answerCopy(
      readAnswer(answers, "l9"),
      {
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

    const kelaPreference = readAnswer(answers, "s7", "l12");
    const kelaTag =
      kelaPreference === "s7a" || kelaPreference === "l12a"
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
      s3b: "practical tools that can help in everyday life",
      s3c: "help understanding the roots of your reactions",
      s3d: "clearer direction and movement forward",
      l7a: "a warm and empathetic encounter",
      l7b: "a structured and thoughtful working style",
      l7c: "honest, even slightly challenging reflection",
      l7d: "space to discover the right fit without forcing it",
    },
    "a way of being met that does not ask too much of you at once",
  );

  const sessionMode = answerCopy(
    readAnswer(answers, "l9"),
    {
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

  const kelaPreference = readAnswer(answers, "s7", "l12");
  const kelaTag =
    kelaPreference === "s7a" || kelaPreference === "l12a"
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
