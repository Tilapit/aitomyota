export type QuizId = "short" | "long";
export type QuizAnswerValue = string | string[] | number;
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
  slider?: {
    min: number;
    max: number;
    labelMin: string;
    labelMax: string;
    words: string[];
  };
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
};

export const shortQuiz: Quiz = {
  id: "short",
  title: "Nopea kartoitus",
  description:
    "8 kysymystä, noin 2 minuuttia. Kevyt ensimmäinen askel kun haluat vain päästä liikkeelle.",
  questions: [
    {
      id: "s1",
      number: 1,
      category: "tilanne",
      question: "Mikä tuntuu raskaimmalta juuri nyt?",
      answers: [
        { id: "s1a", text: "Arki tai työ painaa, energiani on koetuksella" },
        { id: "s1b", text: "Mielessäni on yksi tietty asia, josta haluaisin puhua" },
        { id: "s1c", text: "Elämässäni on iso muutos käynnissä ja tarvitsen tukea" },
        { id: "s1d", text: "En osaa vielä nimetä — tuntuu vain epäselvältä ja raskaalta" },
      ],
    },
    {
      id: "s2",
      number: 2,
      category: "tavoite",
      question: "Mitä haluat terapialta juuri nyt?",
      answers: [
        { id: "s2a", text: "Haluan tuntea oloni kevyemmäksi" },
        { id: "s2b", text: "Haluan ymmärtää itseäni paremmin" },
        { id: "s2c", text: "Haluan ratkaista tietyn ongelman" },
        { id: "s2d", text: "Haluan saada aikaan todellista muutosta" },
      ],
    },
    {
      id: "s3",
      number: 3,
      category: "persoona",
      question: "Millainen ihminen auttaa sinua eniten vaikeissa hetkissä?",
      answers: [
        { id: "s3a", text: "Rauhallinen ja lempeä" },
        { id: "s3b", text: "Rehellinen ja suora" },
        { id: "s3c", text: "Lämmin ja rohkaiseva" },
        { id: "s3d", text: "Analyyttinen ja jäsennelty" },
      ],
    },
    {
      id: "s4",
      number: 4,
      category: "työskentelytapa",
      question: "Miten haluat terapeutin työskentelevän kanssasi?",
      slider: {
        min: 1,
        max: 5,
        labelMin: "Kuuntelee enimmäkseen",
        labelMax: "Ohjaa aktiivisesti",
        words: ["Kuuntelee enimmäkseen", "Painottuu kuunteluun", "Tasapainossa", "Painottuu ohjaukseen", "Ohjaa aktiivisesti"],
      },
    },
    {
      id: "s5",
      number: 5,
      category: "ammattilainen",
      question: "Onko terapeutin sukupuolella merkitystä?",
      answers: [
        { id: "s5a", text: "Nainen" },
        { id: "s5b", text: "Mies" },
        { id: "s5c", text: "Muunsukupuolinen" },
        { id: "s5d", text: "Ei ole väliä" },
      ],
    },
    {
      id: "s6",
      number: 6,
      category: "ammattilainen",
      question: "Kuinka tärkeää on, että terapeutilla on paljon elämänkokemusta?",
      slider: {
        min: 1,
        max: 5,
        labelMin: "Ei merkitystä",
        labelMax: "Erittäin tärkeää",
        words: ["Ei merkitystä", "Vähän merkitystä", "Jonkin verran", "Melko tärkeää", "Erittäin tärkeää"],
      },
    },
    {
      id: "s7",
      number: 7,
      category: "käytäntö",
      question: "Mikä hintaluokka tuntuu realistiselta per sessio?",
      note: "Hinnat ovat suuntaa-antavia ja vaihtelevat ammattilaisittain.",
      answers: [
        { id: "s7a", text: "Alle 80 €" },
        { id: "s7b", text: "80–120 €" },
        { id: "s7c", text: "120–160 €" },
        { id: "s7d", text: "Hinta ei ole ratkaiseva tekijä" },
      ],
    },
    {
      id: "s8",
      number: 8,
      category: "käytäntö",
      question: "Haluaisitko käyttää Kela-korvausta, jos mahdollista?",
      note: "Kela korvaa osan psykoterapian kustannuksista tietyin edellytyksin.",
      answers: [
        { id: "s8a", text: "Kyllä, näytä vain sopivat terapeutit" },
        { id: "s8b", text: "Olisi kätevää, mutta ei välttämätöntä" },
        { id: "s8c", text: "En ole varma vielä" },
      ],
    },
  ],
};

export const longQuiz: Quiz = {
  id: "long",
  title: "Tarkempi kartoitus",
  description:
    "Tarkempi kartoitus auttaa löytämään ammattilaiselta juuri sinulle sopivan lähestymistavan. Voit vastata omaan tahtiisi, ei ole oikeita tai vääriä vastauksia.",
  questions: [
    {
      id: "l1",
      number: 1,
      category: "tilanne",
      question: "Mikä tuntuu raskaimmalta juuri nyt?",
      answers: [
        { id: "l1a", text: "Arki tai työ painaa, energiani on koetuksella" },
        { id: "l1b", text: "Mielessäni on yksi tietty asia, josta haluaisin puhua" },
        { id: "l1c", text: "Elämässäni on iso muutos käynnissä ja tarvitsen tukea" },
        { id: "l1d", text: "En osaa vielä nimetä — tuntuu vain epäselvältä ja raskaalta" },
      ],
    },
    {
      id: "l2",
      number: 2,
      category: "tavoite",
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
      category: "tilanne",
      question: "Kuinka kauan tämä asia on painanut mieltäsi?",
      answers: [
        { id: "l3a", text: "Vasta hiljattain, asia on tuore" },
        { id: "l3b", text: "Muutaman kuukauden ajan" },
        { id: "l3c", text: "Pidemmän aikaa, yli vuoden" },
        { id: "l3d", text: "Niin kauan kuin muistan, se on ollut aina taustalla" },
      ],
    },
    {
      id: "l4",
      number: 4,
      category: "tilanne",
      question: "Mistä elämän alueesta haluaisit ensisijaisesti puhua? Voit valita useamman.",
      multiSelect: true,
      answers: [
        { id: "l4a", text: "Työ, ura tai opiskelu" },
        { id: "l4b", text: "Ihmissuhteet, parisuhde tai perhe" },
        { id: "l4c", text: "Oma identiteetti tai elämänsuunta" },
        { id: "l4d", text: "Mieliala, ahdistus tai uupumus" },
        { id: "l4e", text: "Jokin muu, voin kertoa lisää ammattilaiselle itse" },
      ],
    },
    {
      id: "l5",
      number: 5,
      category: "tilanne",
      question: "Miten kuormittava olo tuntuu juuri nyt arjessa?",
      note: "Jos tilanne tuntuu kriisiltä, ohjaamme sinut nopeimmin saatavilla olevan avun piiriin.",
      answers: [
        { id: "l5a", text: "Pärjään, mutta halusin hakea tukea ajoissa" },
        { id: "l5b", text: "Arki sujuu jotenkin, mutta energia ei riitä" },
        { id: "l5c", text: "Olo on melko raskas ja tarvitsen apua nyt" },
        { id: "l5d", text: "Tilanne tuntuu ylivoimaiselta" },
      ],
    },
    {
      id: "l6",
      number: 6,
      category: "persoona",
      question: "Millainen ihminen auttaa sinua eniten vaikeissa hetkissä?",
      answers: [
        { id: "l6a", text: "Rauhallinen ja lempeä" },
        { id: "l6b", text: "Rehellinen ja suora" },
        { id: "l6c", text: "Lämmin ja rohkaiseva" },
        { id: "l6d", text: "Analyyttinen ja jäsennelty" },
      ],
    },
    {
      id: "l7",
      number: 7,
      category: "työskentelytapa",
      question: "Miten haluat terapeutin työskentelevän kanssasi?",
      slider: {
        min: 1,
        max: 5,
        labelMin: "Kuuntelee enimmäkseen",
        labelMax: "Ohjaa aktiivisesti",
        words: ["Kuuntelee enimmäkseen", "Painottuu kuunteluun", "Tasapainossa", "Painottuu ohjaukseen", "Ohjaa aktiivisesti"],
      },
    },
    {
      id: "l8",
      number: 8,
      category: "tyyli",
      question: "Miten yleensä käsittelet vaikeita asioita?",
      answers: [
        { id: "l8a", text: "Puhun läheisille, yhteisöllisyys auttaa" },
        { id: "l8b", text: "Jään miettimään yksin, prosessoin rauhassa" },
        { id: "l8c", text: "Teen jotain konkreettista, toiminta auttaa" },
        { id: "l8d", text: "Vaihtelen tilanteen mukaan" },
      ],
    },
    {
      id: "l9",
      number: 9,
      category: "tyyli",
      question: "Millaisella tahdilla haluaisit edetä?",
      answers: [
        { id: "l9a", text: "Rauhallisesti ja omaan tahtiin, ei kiirettä" },
        { id: "l9b", text: "Tavoitteellisesti, haluan nähdä edistystä" },
        { id: "l9c", text: "Kumpi vain sopii, olen joustava" },
      ],
    },
    {
      id: "l10",
      number: 10,
      category: "käytäntö",
      question: "Haluatko tavata etänä vai kasvokkain?",
      answers: [
        { id: "l10a", text: "Etänä, videovastaanotto sopii hyvin" },
        { id: "l10b", text: "Kasvokkain, läsnäolo on minulle tärkeää" },
        { id: "l10c", text: "Kumpi vain käy" },
      ],
    },
    {
      id: "l11",
      number: 11,
      category: "käytäntö",
      question: "Mikä tapaamistiheys kuulostaisi sinulle sopivalta?",
      answers: [
        { id: "l11a", text: "Kerran viikossa, haluan edetä aktiivisesti" },
        { id: "l11b", text: "Pari kertaa kuussa" },
        { id: "l11c", text: "Kerran kuussa riittää" },
        { id: "l11d", text: "En tiedä vielä, kokeilen ensin" },
      ],
    },
    {
      id: "l12",
      number: 12,
      category: "ammattilainen",
      question: "Kuinka tärkeää on, että terapeutilla on paljon elämänkokemusta?",
      slider: {
        min: 1,
        max: 5,
        labelMin: "Ei merkitystä",
        labelMax: "Erittäin tärkeää",
        words: ["Ei merkitystä", "Vähän merkitystä", "Jonkin verran", "Melko tärkeää", "Erittäin tärkeää"],
      },
    },
    {
      id: "l13",
      number: 13,
      category: "käytäntö",
      question: "Mikä hintaluokka tuntuu realistiselta per sessio?",
      note: "Hinnat ovat suuntaa-antavia ja vaihtelevat ammattilaisittain.",
      answers: [
        { id: "l13a", text: "Alle 80 €" },
        { id: "l13b", text: "80–120 €" },
        { id: "l13c", text: "120–160 €" },
        { id: "l13d", text: "Hinta ei ole ratkaiseva tekijä" },
      ],
    },
    {
      id: "l14",
      number: 14,
      category: "käytäntö",
      question: "Haluaisitko käyttää Kela-korvausta, jos mahdollista?",
      note: "Kela korvaa osan psykoterapian kustannuksista tietyin edellytyksin.",
      answers: [
        { id: "l14a", text: "Kyllä, se on minulle tärkeää" },
        { id: "l14b", text: "Olisi kätevää, mutta ei välttämätöntä" },
        { id: "l14c", text: "En ole varma vielä" },
      ],
    },
    {
      id: "l15",
      number: 15,
      category: "historia",
      question: "Oletko aiemmin käynyt terapiassa tai saanut vastaavaa ammatillista tukea?",
      answers: [
        { id: "l15a", text: "En, tämä olisi minulle ensikokemus" },
        { id: "l15b", text: "Kyllä, ja kokemus oli myönteinen" },
        { id: "l15c", text: "Kyllä, mutta jokin siinä ei tuntunut toimivan" },
        { id: "l15d", text: "Käyn parhaillaan, etsin rinnalle tai tilalle jotain uutta" },
      ],
    },
    {
      id: "l16",
      number: 16,
      category: "sinä",
      question: "Onko jotain muuta, mitä haluaisit ammattilaisen tietävän sinusta ennen ensitapaamista?",
      openText: true,
      note: "Vastauksesi näkyy vain valitsemallesi ammattilaiselle.",
    },
  ],
};

export const quizzes: Record<QuizId, Quiz> = {
  short: shortQuiz,
  long: longQuiz,
};

export function getQuiz(quizId: QuizId): Quiz {
  return quizzes[quizId];
}

function readAnswer(answers: QuizAnswers, ...keys: string[]) {
  for (const key of keys) {
    const value = answers[key];
    if (value !== undefined) return value;
  }
  return undefined;
}

function readStringAnswer(answers: QuizAnswers, ...keys: string[]): string | undefined {
  const value = readAnswer(answers, ...keys);
  return typeof value === "string" ? value : undefined;
}

function answerCopy(
  answerId: string | undefined,
  values: Record<string, string>,
  fallback: string,
) {
  if (!answerId) return fallback;
  return values[answerId] ?? fallback;
}

function sliderWord(value: QuizAnswerValue | undefined, words: string[]): string {
  if (typeof value !== "number") return words[2] ?? words[0];
  const idx = Math.min(Math.floor(((value - 1) / 4) * words.length), words.length - 1);
  return words[idx];
}

export function buildRecommendations(
  quizId: QuizId,
  answers: QuizAnswers,
): Recommendation[] {
  const tilanne = answerCopy(
    readStringAnswer(answers, "s1", "l1"),
    {
      s1a: "arjen ja jaksamisen kuormituksesta",
      s1b: "tietystä asiasta, joka pyörii mielessä",
      s1c: "isosta elämänmuutoksesta",
      s1d: "epämääräisestä mutta raskaasta olosta",
      l1a: "arjen ja jaksamisen kuormituksesta",
      l1b: "tietystä asiasta, joka pyörii mielessä",
      l1c: "isosta elämänmuutoksesta",
      l1d: "epämääräisestä mutta raskaasta olosta",
    },
    "siitä, mikä juuri nyt tuntuu raskaimmalta",
  );

  const tavoite = answerCopy(
    readStringAnswer(answers, "s2", "l2"),
    {
      s2a: "kevyemmän olon löytäminen",
      s2b: "itsensä parempi ymmärtäminen",
      s2c: "tietyn ongelman ratkaiseminen",
      s2d: "todellisen muutoksen aikaansaaminen",
      l2a: "kevyemmän olon löytäminen",
      l2b: "itsensä parempi ymmärtäminen",
      l2c: "tietyn ongelman ratkaiseminen",
      l2d: "todellisen muutoksen aikaansaaminen",
    },
    "eteenpäin löytäminen",
  );

  const persoona = answerCopy(
    readStringAnswer(answers, "s3", "l6"),
    {
      s3a: "rauhallinen ja lempeä",
      s3b: "rehellinen ja suora",
      s3c: "lämmin ja rohkaiseva",
      s3d: "analyyttinen ja jäsennelty",
      l6a: "rauhallinen ja lempeä",
      l6b: "rehellinen ja suora",
      l6c: "lämmin ja rohkaiseva",
      l6d: "analyyttinen ja jäsennelty",
    },
    "luontevalta tuntuva",
  );

  const tyoskentelyWords = ["kuuntelee enimmäkseen", "painottuu kuunteluun", "tasapainossa kuuntelun ja ohjauksen välillä", "painottuu ohjaukseen", "ohjaa aktiivisesti"];
  const tyoskentelyValue = readAnswer(answers, "s4", "l7");
  const tyoskentely = sliderWord(tyoskentelyValue, tyoskentelyWords);

  const tapaamistapa = answerCopy(
    readStringAnswer(answers, "l10"),
    {
      l10a: "etänä",
      l10b: "kasvokkain",
      l10c: "etänä tai kasvokkain",
    },
    "joustavasti",
  );

  const tahti = answerCopy(
    readStringAnswer(answers, "l9"),
    {
      l9a: "rauhallisesti ja omaan tahtiin",
      l9b: "tavoitteellisesti edeten",
      l9c: "joustavasti tilanteen mukaan",
    },
    "sinulle sopivalla tahdilla",
  );

  const kelaPreference = readStringAnswer(answers, "s8", "l14");
  const kelaTag =
    kelaPreference === "s8a" || kelaPreference === "l14a"
      ? "Kela-polku mahdollinen"
      : "Joustava aloitustapa";

  const depthTag =
    quizId === "long" ? "Tarkemman kartoituksen perusteella" : "Nopean kartoituksen perusteella";

  return [
    {
      name: "Anna Mäkinen",
      title: "Kognitiivinen psykoterapeutti",
      availability: "Vapaita aikoja tällä viikolla",
      tags: [tavoite, persoona, kelaTag],
      reason: `Anna nousee ensimmäiseksi ehdotukseksi, koska kerroit ${tilanne}. Tavoitteesi on ${tavoite} ja yhdistyt parhaiten ammattilaiseen, joka on ${persoona}. Hänen työskentelytapansa ${tyoskentely}, mikä sopii hyvin tilanteeseesi.`,
    },
    {
      name: "Juhani Leppänen",
      title: "Psykodynaaminen terapeutti",
      availability: "Uusia asiakaspaikkoja ensi viikolla",
      tags: [persoona, "Pidempiaikainen työ", depthTag],
      reason: `Juhani on vahva vaihtoehto, jos haluat pysähtyä syvemmin ja ymmärtää, miten nykyinen kuormitus on kehittynyt. Hän työskentelee tavalla, joka ${tyoskentely} — sopii hyvin kun tavoitteena on ${tavoite} huolellisen, kiireettömän pohdinnan kautta.`,
    },
    {
      name: "Sari Rantanen",
      title: "ACT-terapeutti",
      availability: "Etäaikoja myös iltaisin",
      tags: [tapaamistapa, "Arjen työkalut", "Matala kynnys aloittaa"],
      reason: `Sari on hyvä kolmas ehdotus, jos toivot terapian tuovan konkreettisia työkaluja arkeen. Hän on tyypiltään ${persoona} ja pitää kynnyksen matalana. Hyvä lähtökohta erityisesti jos haluat tavata ${tapaamistapa} ja edetä ${tahti}.`,
    },
  ];
}