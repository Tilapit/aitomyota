# Myötä — React + TypeScript + Tailwind (Lovable)

## Tiedostorakenne

```
src/
├── main.tsx                        # Entry point
├── App.tsx                         # Pääsivu – koostaa osiot
├── index.css                       # Globaalit tyylit, CSS-muuttujat
│
├── data/
│   └── quizData.ts                 # Kysymykset ja tyypit
│
└── components/
    ├── Navbar.tsx                  # Navigaatio (fixed, scroll-aware)
    ├── HeroSection.tsx             # Hero-osio
    ├── HowItWorksSection.tsx       # Kolme askelta -osio
    ├── ComparisonSection.tsx       # Vertailutaulukko
    ├── ProfilesSection.tsx         # Terapeuttiesimerkit
    ├── QuizTeaserSection.tsx       # Alaspäin CTA-osio
    ├── Footer.tsx                  # Footer
    └── QuizModal.tsx               # Quiz-modaali (ainoa quiz-logiikka)
```

## Muutokset alkuperäiseen

- **Navbar-bugi korjattu**: `height: 100%` poistettu — nav on nyt `height: 72px`
- **Base64-kuvat poistettu**: body::before käyttää SVG-pohjaista noise-texturia
- **Quiz yhdistetty**: Vain yksi quiz-komponentti (QuizModal), duplikaattilogiikka poistettu
- **Kysymykset omassa tiedostossa**: `quizData.ts`
- **Scroll reveal**: `IntersectionObserver` + CSS-luokat `.reveal` / `.visible`
- **Inline styles → muuttujat**: Kaikki värit käyttävät CSS-muuttujia

## Lovable-setup

1. Lisää Google Fonts `index.html`-tiedostoon tai `index.css`-importtina (jo mukana CSS:ssä)
2. Tailwind: Komponentit käyttävät inline styles + CSS variables — ei Tailwind-luokkia, joten ei Tailwind-konfiguraatiota tarvita
3. Vite / React 18 + TypeScript toimii suoraan
