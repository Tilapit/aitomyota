import type { Locale } from "../types/app";
import type { ComparisonPoint, FAQItem, Testimonial } from "../types/content";

type HomeContent = {
  testimonials: Testimonial[];
  faqs: FAQItem[];
  directoryPoints: string[];
  myotaPoints: ComparisonPoint[];
};

const homeContentByLocale: Record<Locale, HomeContent> = {
  en: {
    testimonials: [
      {
        quote:
          "I expected another long directory and more uncertainty. Instead, I got three thoughtful recommendations and understood why each one could work for me.",
        name: "Emilia, 31",
        context: "Started with the shorter quiz",
        image: "/images/pexels-polina-zimmerman-3958407.jpg",
      },
      {
        quote:
          "The deeper version helped me notice what kind of therapist I actually needed, not just what topic I wanted to talk about. That changed everything.",
        name: "Jonas, 42",
        context: "Chose the deeper quiz",
        image: "/images/pexels-shkrabaanthony-7579187.jpg",
      },
      {
        quote:
          "What I appreciated most was that the first step felt gentle. I did not need perfect words, and I still felt understood.",
        name: "Mira, 27",
        context: "Booked after her first recommendation",
        image: "/images/pexels-karola-g-6255631.jpg",
      },
    ],
    faqs: [
      {
        question: "How long does this take?",
        answer:
          "Most people can finish the main flow in about two minutes. There is also a longer version if you want to give the match more context.",
      },
      {
        question: "Do I need to know exactly what is wrong before I start?",
        answer:
          "No. Many people begin when they can only describe a feeling, not a clear label. The questions are designed to work with that uncertainty rather than against it.",
      },
      {
        question: "What if none of the recommendations feels right yet?",
        answer:
          "That is still useful information. You can retake the flow, choose the longer version, and get a clearer read on what kind of person or pace would feel better for you.",
      },
      {
        question: "What if reaching out still feels like a big step?",
        answer:
          "That is normal. The goal is not to pressure you into booking instantly, but to help the first message or first call feel more grounded and less random.",
      },
      {
        question: "Can I start with the short quiz and go deeper later?",
        answer:
          "Yes. You can begin with the shorter path and switch to the longer version later if you want a fuller recommendation.",
      },
    ],
    directoryPoints: [
      "Hundreds of profiles, but no clear place to begin",
      "No explanation for why a certain therapist might fit you",
      "The first appointment can feel like a costly guess",
      "Momentum gets lost before you even start",
    ],
    myotaPoints: [
      { text: "A short match flow narrows the field quickly" },
      { text: "Every recommendation comes with a reason: ", em: "why it fits" },
      { text: "You can watch an intro or reach out directly from the result" },
      { text: "The first session feels chosen, not random" },
    ],
  },
  fi: {
    testimonials: [
      {
        quote:
          "Odotin taas yhtä pitkää hakemistoa ja lisää epävarmuutta. Sen sijaan sain kolme harkittua suositusta ja ymmärsin, miksi jokainen niistä voisi sopia minulle.",
        name: "Emilia, 31",
        context: "Aloitti lyhyemmällä kyselyllä",
        image: "/images/pexels-polina-zimmerman-3958407.jpg",
      },
      {
        quote:
          "Pidempi versio auttoi minua huomaamaan, millaista terapeuttia oikeasti tarvitsin, ei vain sitä aihetta josta halusin puhua. Se muutti kaiken.",
        name: "Jonas, 42",
        context: "Valitsi pidemmän kyselyn",
        image: "/images/pexels-shkrabaanthony-7579187.jpg",
      },
      {
        quote:
          "Arvostin eniten sitä, että ensimmäinen askel tuntui lempeältä. Minulla ei tarvinnut olla täydellisiä sanoja, ja silti tunsin tulleeni ymmärretyksi.",
        name: "Mira, 27",
        context: "Varaus heti ensimmäisen suosituksen jälkeen",
        image: "/images/pexels-karola-g-6255631.jpg",
      },
    ],
    faqs: [
      {
        question: "Kuinka kauan tämä kestää?",
        answer:
          "Useimmat tekevät pääpolun noin kahdessa minuutissa. Tarjolla on myös pidempi versio, jos haluat antaa matchille enemmän kontekstia.",
      },
      {
        question: "Pitääkö minun tietää tarkalleen mikä on pielessä ennen aloittamista?",
        answer:
          "Ei. Monet aloittavat tilanteessa, jossa he osaavat nimetä vain tunteen mutta eivät selkeää otsikkoa. Kysymykset on tehty toimimaan juuri sen epävarmuuden kanssa.",
      },
      {
        question: "Entä jos mikään suosituksista ei tunnu vielä oikealta?",
        answer:
          "Sekin on hyödyllistä tietoa. Voit tehdä polun uudelleen, valita pidemmän version ja saada tarkemman kuvan siitä, millainen ihminen tai etenemistahti tuntuisi paremmalta.",
      },
      {
        question: "Entä jos yhteyden ottaminen tuntuu edelleen isolta askeleelta?",
        answer:
          "Se on hyvin tavallista. Tarkoitus ei ole painostaa varaamaan heti, vaan auttaa ensimmäistä viestiä tai puhelua tuntumaan harkitummalta ja vähemmän satunnaiselta.",
      },
      {
        question: "Voinko aloittaa lyhyellä kyselyllä ja mennä syvemmälle myöhemmin?",
        answer:
          "Kyllä. Voit aloittaa lyhyemmällä polulla ja siirtyä myöhemmin pidempään versioon, jos haluat tarkemman suosituksen.",
      },
    ],
    directoryPoints: [
      "Satoja profiileja, mutta ei selkeää paikkaa aloittaa",
      "Ei selitystä sille, miksi tietty terapeutti voisi sopia sinulle",
      "Ensimmäinen käynti voi tuntua kalliilta arvaukselta",
      "Momentum katoaa jo ennen kuin ehdit aloittaa",
    ],
    myotaPoints: [
      { text: "Lyhyt match-polku rajaa vaihtoehtoja nopeasti" },
      { text: "Jokaiselle suositukselle tulee perustelu: ", em: "miksi se sopii" },
      { text: "Voit katsoa esittelyn tai ottaa yhteyttä suoraan tuloksesta" },
      { text: "Ensimmäinen käynti tuntuu valitulta, ei satunnaiselta" },
    ],
  },
};

export function getHomeContent(locale: Locale) {
  return homeContentByLocale[locale];
}
