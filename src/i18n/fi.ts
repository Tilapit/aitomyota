import type { Translations } from "./en";

const fi: Translations = {
  nav: {
    howItWorks: "Miten toimii",
    stories: "Tarinat",
    startMatching: "Aloita matching",
  },
  hero: {
    eyebrow: "Matchmaking-palvelu",
    title1: "Löydä oikea terapeutti",
    title2: "heti ensimmäisellä kerralla.",
    subtitle:
      "Rauhallisempi tapa löytää sopiva ammattilainen — ennen kuin ensimmäinen tapaaminen muuttuu arvaamiseksi.",
    cta: "Aloita matching →",
    stats: [
      { num: "99+", lbl: "Terapeuttia" },
      { num: "5 min", lbl: "Tarkka matchauspolku" },
      { num: "3", lbl: "Räätälöityä ehdotusta" },
    ],
  },
  howItWorks: {
    eyebrow: "Miten toimii",
    title: "Kolme selkeää vaihetta",
    subtitle:
      "Lyhyt polku epävarmuudesta ensimmäiseen keskusteluun, joka tuntuu harkitulta.",
    steps: [
      {
        kicker: "Vaihe 01",
        title: "Kerro mikä tuntuu tärkeimmältä",
        text: "Muutama kysymys auttaa meitä ymmärtämään tahtiasi, toiveitasi ja sitä, millainen tuki tuntuisi oikealta.",
        pill: "Noin 2–5 minuuttia",
      },
      {
        kicker: "Vaihe 02",
        title: "Katso kolme vahvaa ehdotusta",
        text: "Rajaamme kentän ja selitämme miksi kukin ehdokas erottuu — jotta sinun ei tarvitse selata hakemistoa yksin.",
        pill: "Perustelut mukana",
      },
      {
        kicker: "Vaihe 03",
        title: "Ota yhteyttä kun yksi tuntuu oikealta",
        text: "Katso lyhyt esittely, lähetä viesti tai varaa pikakeskustelu suoraan ehdotuksesta.",
        pill: "Etene vain kun olet valmis",
      },
    ],
  },
  comparison: {
    eyebrow: "Miksi Myötä",
    title: "Vähemmän etsimistä, enemmän suuntaa",
    directoryLabel: "Tavallinen hakemisto",
    directoryPoints: [
      "Satoja profiileja, mutta ei selvää lähtökohtaa",
      "Ei selitystä sille, miksi jokin terapeutti sopisi juuri sinulle",
      "Ensimmäinen tapaaminen voi tuntua kalliilta arvaukselta",
      "Into hiipuu ennen kuin olet edes aloittanut",
    ],
    myotaPoints: [
      { text: "Lyhyt matchauspolku rajaa vaihtoehdot nopeasti" },
      { text: "Jokaiseen ehdotukseen tulee perustelu: ", em: "miksi se sopii" },
      { text: "Voit katsoa esittelyn tai ottaa yhteyttä suoraan tuloksesta" },
      { text: "Ensimmäinen tapaaminen tuntuu valitulta, ei sattumanvaraiselta" },
    ],
  },
  testimonials: {
    eyebrow: "Kokemuksia",
    title: "Mitä ihmiset sanovat kun viimein aloittavat",
    subtitle: "Muutama ääni ihmisiltä, jotka siirtyivät selailusta harkitumpaan ensimmäiseen askeleeseen.",
    featuredBadge: "Rakastetuin",
    items: [
      {
        quote:
          "Odotin jälleen pitkää hakemistoa ja epävarmuutta. Sen sijaan sain kolme harkittua ehdotusta ja ymmärsin, miksi kukin niistä voisi toimia minulle.",
        name: "Emilia, 31",
        context: "Aloitti lyhyemmällä kyselyllä",
      },
      {
        quote:
          "Syvempi versio auttoi minua huomaamaan, millaista terapeuttia oikeasti tarvitsin — ei vain mistä aiheesta halusin puhua. Se muutti kaiken.",
        name: "Jonas, 42",
        context: "Valitsi syvemmän kyselyn",
      },
      {
        quote:
          "Parasta oli se, että ensimmäinen askel tuntui lempeältä. Minun ei tarvinnut löytää täydellisiä sanoja, ja silti tunsin tulevani ymmärretyksi.",
        name: "Mira, 27",
        context: "Varasi ajan ensimmäisen ehdotuksen jälkeen",
      },
    ],
  },
  faq: {
    eyebrow: "UKK",
    title: "Kysymykset jotka yleensä nousevat esiin",
    subtitle: "Käytännön yksityiskohdat ilman koko esitystä.",
    items: [
      {
        question: "Kauanko tämä kestää?",
        answer:
          "Useimmat ihmiset pääsevät läpi pääpolun noin kahdessa minuutissa. Saatavilla on myös pidempi versio, jos haluat antaa matchaukselle enemmän kontekstia.",
      },
      {
        question: "Pitääkö minun tietää tarkalleen mikä on vialla ennen kuin aloitan?",
        answer:
          "Ei. Monet aloittavat silloin kun pystyvät kuvailemaan vain tunteen, ei selkeää diagnoosia. Kysymykset on suunniteltu toimimaan sen epävarmuuden kanssa, ei sitä vastaan.",
      },
      {
        question: "Saanko vain yhden ehdotuksen?",
        answer:
          "Et. Saat kolme ehdotusta sekä lyhyen selityksen siitä, miksi kukin voisi sopia sinulle.",
      },
      {
        question: "Voinko aloittaa lyhyellä kyselyllä ja mennä syvemmälle myöhemmin?",
        answer:
          "Kyllä. Voit aloittaa lyhyemmällä polulla ja vaihtaa pidempään versioon myöhemmin, jos haluat kattavamman ehdotuksen.",
      },
    ],
    secondaryText:
      "Aloita tavallisella matchauspolulla tai valitse pidempi versio, jos haluat antaa ehdotukselle enemmän tietoa.",
    shortQuizBtn: "Aloita lyhyt kysely",
    longQuizBtn: "Tee syvempi kysely",
  },
  footer: {
    quote: '"Ensimmäisen terapia-ajan pitäisi tuntua turvalliselta, ei arvaukselta."',
    links: ["Tietosuoja", "Terapeuteille", "Yhteystiedot"],
    copy: "© 2026 Myötä · Helsinki, Suomi",
  },
};

export default fi;