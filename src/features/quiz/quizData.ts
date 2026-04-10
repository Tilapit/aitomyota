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
    "Tavoite on löytää sopivin ammattilainen ilman, että sinun täytyy selittää kaikkea heti alussa.",
  questions: [
    {
      id: "s1",
      number: 1,
      category: "tilanne",
      question: "Mikä kuvaa parhaiten sitä, mikä sinua juuri nyt kuormittaa?",
      answers: [
        { id: "s1a", text: "Arki tai työ tuntuu raskaalta ja jaksaminen on koetuksella" },
        { id: "s1b", text: "Jokin tietty asia pyörii mielessä ja haluaisin puhua siitä" },
        { id: "s1c", text: "Elämässä on iso muutos käynnissä ja kaipaan tukea" },
        { id: "s1d", text: "En osaa vielä nimetä, tunne on epämääräinen" },
      ],
    },
    {
      id: "s2",
      number: 2,
      category: "kieli",
      question: "Millä kielellä haluaisit tavata ammattilaisen?",
      answers: [
        { id: "s2a", text: "Suomi" },
        { id: "s2b", text: "Ruotsi" },
        { id: "s2c", text: "Englanti" },
      ],
    },
    {
      id: "s3",
      number: 3,
      category: "tuen muoto",
      question: "Minkälaista tukea kaipaat juuri nyt eniten?",
      answers: [
        { id: "s3a", text: "Turvallinen tila purkaa ajatuksia ilman paineita" },
        { id: "s3b", text: "Konkreettisia keinoja, joita voin kokeilla arjessa" },
        { id: "s3c", text: "Apua ymmärtää, miksi reagoin niin kuin reagoin" },
        { id: "s3d", text: "Selkeä tavoite ja suunta, haluan muutosta" },
      ],
    },
    {
      id: "s4",
      number: 4,
      category: "ammattilainen",
      question: "Onko ammattilaisen sukupuolella sinulle merkitystä?",
      answers: [
        { id: "s4a", text: "Nainen" },
        { id: "s4b", text: "Mies" },
        { id: "s4c", text: "Muu tai ei-binäärinen" },
        { id: "s4d", text: "Ei ole väliä" },
      ],
    },
    {
      id: "s5",
      number: 5,
      category: "ammattilainen",
      question: "Onko ammattilaisen iällä merkitystä sinulle?",
      answers: [
        { id: "s5a", text: "Nuorempi, alle 40-vuotias" },
        { id: "s5b", text: "Kokenut, yli 45-vuotias" },
        { id: "s5c", text: "Ei ole väliä" },
      ],
    },
    {
      id: "s6",
      number: 6,
      category: "käytäntö",
      question: "Mikä hintaluokka tuntuu sinulle sopivalta per tapaaminen?",
      note: "Hinnat ovat suuntaa-antavia ja vaihtelevat ammattilaisittain.",
      answers: [
        { id: "s6a", text: "alle 80 €" },
        { id: "s6b", text: "80–120 €" },
        { id: "s6c", text: "120–160 €" },
        { id: "s6d", text: "Hinta ei ole minulle ratkaiseva" },
      ],
    },
    {
      id: "s7",
      number: 7,
      category: "käytäntö",
      question: "Haluatko hyödyntää Kela-korvauksen?",
      note: "Kela korvaa osan psykoterapian kustannuksista tietyin edellytyksin.",
      answers: [
        { id: "s7a", text: "Kyllä, näytä vain Kela-korvattavat terapeutit" },
        { id: "s7b", text: "Ei ole minulle välttämätöntä" },
        { id: "s7c", text: "En tiedä vielä, kerro lisää" },
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
      question: "Mikä kuvaa parhaiten sitä, mikä sinua juuri nyt kuormittaa?",
      answers: [
        { id: "l1a", text: "Arki tai työ tuntuu raskaalta ja jaksaminen on koetuksella" },
        { id: "l1b", text: "Jokin tietty asia pyörii mielessä ja haluaisin puhua siitä" },
        { id: "l1c", text: "Elämässä on iso muutos käynnissä ja kaipaan tukea" },
        { id: "l1d", text: "En osaa vielä nimetä, tunne on epämääräinen" },
      ],
    },
    {
      id: "l2",
      number: 2,
      category: "kieli",
      question: "Millä kielellä haluaisit tavata ammattilaisen?",
      answers: [
        { id: "l2a", text: "Suomi" },
        { id: "l2b", text: "Ruotsi" },
        { id: "l2c", text: "Englanti" },
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
      category: "tyyli",
      question: "Miten yleensä käsittelet vaikeita asioita?",
      answers: [
        { id: "l6a", text: "Puhun läheisille, yhteisöllisyys auttaa" },
        { id: "l6b", text: "Jään miettimään yksin, prosessoin rauhassa" },
        { id: "l6c", text: "Teen jotain konkreettista, toiminta auttaa" },
        { id: "l6d", text: "Vaihtelen tilanteen mukaan" },
      ],
    },
    {
      id: "l7",
      number: 7,
      category: "tyyli",
      question: "Millainen ammattilainen tuntuisi sinulle luontevalta?",
      answers: [
        { id: "l7a", text: "Lämmin ja empaattinen, tärkeintä on tulla kuulluksi" },
        { id: "l7b", text: "Asiantunteva ja jäsennelty, haluan ymmärtää mistä on kyse" },
        { id: "l7c", text: "Suorasukainen, kuulen mielelläni myös haastavia havaintoja" },
        { id: "l7d", text: "En osaa sanoa, kokeilen ensin" },
      ],
    },
    {
      id: "l8",
      number: 8,
      category: "tyyli",
      question: "Millaisella tahdilla haluaisit edetä?",
      answers: [
        { id: "l8a", text: "Rauhallisesti ja omaan tahtiin, ei kiirettä" },
        { id: "l8b", text: "Tavoitteellisesti, haluan nähdä edistystä" },
        { id: "l8c", text: "Kumpi vain sopii, olen joustava" },
      ],
    },
    {
      id: "l9",
      number: 9,
      category: "käytäntö",
      question: "Haluatko tavata etänä vai kasvokkain?",
      answers: [
        { id: "l9a", text: "Etänä, videovastaanotto sopii hyvin" },
        { id: "l9b", text: "Kasvokkain, läsnäolo on minulle tärkeää" },
        { id: "l9c", text: "Kumpi vain käy" },
      ],
    },
    {
      id: "l10",
      number: 10,
      category: "käytäntö",
      question: "Mikä tapaamistiheys kuulostaisi sinulle sopivalta?",
      answers: [
        { id: "l10a", text: "Kerran viikossa, haluan edetä aktiivisesti" },
        { id: "l10b", text: "Pari kertaa kuussa" },
        { id: "l10c", text: "Kerran kuussa riittää" },
        { id: "l10d", text: "En tiedä vielä, kokeilen ensin" },
      ],
    },
    {
      id: "l11",
      number: 11,
      category: "käytäntö",
      question: "Mikä hintaluokka tuntuu sinulle sopivalta per tapaaminen?",
      answers: [
        { id: "l11a", text: "alle 80 €" },
        { id: "l11b", text: "80–120 €" },
        { id: "l11c", text: "120–160 €" },
        { id: "l11d", text: "Hinta ei ole minulle ratkaiseva" },
      ],
    },
    {
      id: "l12",
      number: 12,
      category: "käytäntö",
      question: "Haluatko hyödyntää Kela-korvauksen?",
      note: "Kela korvaa osan psykoterapian kustannuksista tietyin edellytyksin.",
      answers: [
        { id: "l12a", text: "Kyllä, se on minulle tärkeää" },
        { id: "l12b", text: "Ei ole minulle välttämätöntä" },
        { id: "l12c", text: "En tiedä vielä, haluaisin kuulla lisää" },
      ],
    },
    {
      id: "l13",
      number: 13,
      category: "historia",
      question: "Oletko aiemmin käynyt terapiassa tai saanut vastaavaa ammatillista tukea?",
      answers: [
        { id: "l13a", text: "En, tämä olisi minulle ensikokemus" },
        { id: "l13b", text: "Kyllä, ja kokemus oli myönteinen" },
        { id: "l13c", text: "Kyllä, mutta jokin siinä ei tuntunut toimivan" },
        { id: "l13d", text: "Käyn parhaillaan, etsin rinnalle tai tilalle jotain uutta" },
      ],
    },
    {
      id: "l14",
      number: 14,
      category: "historia",
      question: "Jos olet käynyt aiemmin, mikä siinä tuntui hyvältä tai mikä jäi puuttumaan?",
      answers: [
        { id: "l14a", text: "Tuli kuulluksi, mutta konkreettiset keinot jäivät vähäisiksi" },
        { id: "l14b", text: "Paljon teoriaa, mutta yhteys ammattilaiseen jäi etäiseksi" },
        { id: "l14c", text: "Kaikki toimi hyvin, hain jotain samankaltaista" },
        { id: "l14d", text: "Ei aiempaa kokemusta, ohitan tämän kysymyksen" },
      ],
    },
    {
      id: "l15",
      number: 15,
      category: "sinä",
      question: "Miten kuvailisit suhdettasi omiin tunteisiisi?",
      answers: [
        { id: "l15a", text: "Tunteet ovat vahvasti läsnä, joskus liikaakin" },
        { id: "l15b", text: "Tunteet ovat etäisiä, on vaikea tunnistaa mitä tunnen" },
        { id: "l15c", text: "Pärjään tunteiden kanssa, mutta jokin jumittaa" },
        { id: "l15d", text: "En ole ajatellut asiaa, kiinnostava kysymys" },
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

  const tuki = answerCopy(
    readStringAnswer(answers, "s3", "l7"),
    {
      s3a: "turvallinen tila ajatuksille",
      s3b: "konkreettiset arjen keinot",
      s3c: "itseymmärryksen syventäminen",
      s3d: "selkeä tavoite ja muutos",
      l7a: "lämmin ja empaattinen ote",
      l7b: "asiantunteva ja jäsennelty lähestyminen",
      l7c: "suorasukainen ja haastava työtapa",
      l7d: "avoin lähestyminen",
    },
    "sinulle sopiva tuki",
  );

  const tahti = answerCopy(
    readStringAnswer(answers, "l8"),
    {
      l8a: "rauhallisesti ja omaan tahtiin",
      l8b: "tavoitteellisesti edeten",
      l8c: "joustavasti tilanteen mukaan",
    },
    "sinulle sopivalla tahdilla",
  );

  const tapaamistapa = answerCopy(
    readStringAnswer(answers, "l9"),
    {
      l9a: "etänä",
      l9b: "kasvokkain",
      l9c: "etänä tai kasvokkain",
    },
    "joustavasti",
  );

  const kelaPreference = readStringAnswer(answers, "s7", "l12");
  const kelaTag =
    kelaPreference === "s7a" || kelaPreference === "l12a"
      ? "Kela-polku mahdollinen"
      : "Joustava aloitustapa";

  const depthTag =
    quizId === "long" ? "Tarkemman kartoituksen perusteella" : "Nopean kartoituksen perusteella";

  return [
    {
      name: "Anna Mäkinen",
      title: "Kognitiivinen psykoterapeutti",
      availability: "Vapaita aikoja tällä viikolla",
      tags: [tuki, kelaTag, depthTag],
      reason: `Anna nousee ensimmäiseksi ehdotukseksi, koska kerroit ${tilanne}. Hän tarjoaa ${tuki} ja työskentelee ${tahti}. Tapaamiset onnistuvat ${tapaamistapa}.`,
    },
    {
      name: "Juhani Leppänen",
      title: "Psykodynaaminen terapeutti",
      availability: "Uusia asiakaspaikkoja ensi viikolla",
      tags: [tuki, "Pidempiaikainen työ", depthTag],
      reason: `Juhani on vahva vaihtoehto, jos haluat pysähtyä syvemmin ja ymmärtää, miten nykyinen kuormitus on kehittynyt ajan myötä. Hän etenee ${tahti} ja luo tilaa rauhalliselle pohdinnalle.`,
    },
    {
      name: "Sari Rantanen",
      title: "ACT-terapeutti",
      availability: "Etäaikoja myös iltaisin",
      tags: [tapaamistapa, "Arjen työkalut", "Matala kynnys aloittaa"],
      reason: `Sari on hyvä kolmas ehdotus, jos toivot terapian tuovan konkreettisia työkaluja arkeen. Hän tarjoaa ${tuki} ja pitää kynnyksen matalana — erityisesti jos haluat aloittaa ${tapaamistapa}.`,
    },
  ];
}