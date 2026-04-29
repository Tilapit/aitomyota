import type { Recommendation, QuizAnswers, QuizId } from "../features/quiz/quizData";
import type { Locale } from "../types/app";

function resolveAnswerText(
  answers: QuizAnswers,
  _quizId: QuizId,
  locale: Locale,
): { primaryConcern: string; goal: string; openText: string } {
  const q1 = answers["q1"] ?? answers["l1"] ?? "";
  const q2 = answers["q2"] ?? answers["l2"] ?? "";

  const q1Labels: Record<string, Record<string, string>> = {
    fi: {
      q1a: "Arki, työ tai opinnot painavat — jaksaminen on koetuksella",
      q1b: "Mielessäni on yksi tietty asia, josta haluaisin puhua",
      q1c: "Elämässäni on iso muutos tai kriisi käynnissä",
      q1d: "Tuntuu ahdistuneelta, huolestuneelta tai alakuloiselta",
      q1e: "En osaa vielä nimetä — tuntuu vain raskaalta",
      q1f: "Olen harkitsemassa terapiaa mutta en ole vielä varma",
      l1a: "Arki, työ tai opinnot painavat — jaksaminen on koetuksella",
      l1b: "Mielessäni on yksi tietty asia, josta haluaisin puhua",
      l1c: "Elämässäni on iso muutos tai kriisi käynnissä",
      l1d: "Tuntuu ahdistuneelta, huolestuneelta tai alakuloiselta",
      l1e: "En osaa vielä nimetä — tuntuu vain raskaalta",
      l1f: "Olen harkitsemassa terapiaa mutta en ole vielä varma",
    },
    en: {
      q1a: "Daily life, work or studies feel heavy — my energy is strained",
      q1b: "There is one specific thing on my mind I want to talk about",
      q1c: "A big life change or crisis is happening",
      q1d: "I feel anxious, worried or low",
      q1e: "I cannot name it yet — it just feels heavy",
      q1f: "I am considering therapy but I am not sure yet",
      l1a: "Daily life, work or studies feel heavy — my energy is strained",
      l1b: "There is one specific thing on my mind I want to talk about",
      l1c: "A big life change or crisis is happening",
      l1d: "I feel anxious, worried or low",
      l1e: "I cannot name it yet — it just feels heavy",
      l1f: "I am considering therapy but I am not sure yet",
    },
  };

  const q2Labels: Record<string, Record<string, string>> = {
    fi: {
      q2a: "Haluan voida paremmin",
      q2b: "Haluan ymmärtää itseäni paremmin",
      q2c: "Haluan ratkaista tietyn ongelman",
      q2d: "Haluan käytännön työkaluja arkeen",
      q2e: "Haluan saada aikaan todellista muutosta",
      l2a: "Haluan voida paremmin",
      l2b: "Haluan ymmärtää itseäni paremmin",
      l2c: "Haluan ratkaista tietyn ongelman",
      l2d: "Haluan käytännön työkaluja arkeen",
      l2e: "Haluan saada aikaan todellista muutosta",
    },
    en: {
      q2a: "I want to feel better",
      q2b: "I want to understand myself better",
      q2c: "I want to solve a specific problem",
      q2d: "I want practical tools for everyday life",
      q2e: "I want to create real change",
      l2a: "I want to feel better",
      l2b: "I want to understand myself better",
      l2c: "I want to solve a specific problem",
      l2d: "I want practical tools for everyday life",
      l2e: "I want to create real change",
    },
  };

  const lang = locale === "fi" ? "fi" : "en";

  return {
    primaryConcern: q1Labels[lang][String(q1)] ?? String(q1),
    goal: q2Labels[lang][String(q2)] ?? String(q2),
    openText: typeof answers["l16"] === "string" ? answers["l16"] : "",
  };
}

export async function generateWhyMatch(
  recommendation: Recommendation,
  answers: QuizAnswers,
  locale: Locale,
  quizId: QuizId,
): Promise<string> {
  const { primaryConcern, goal, openText } = resolveAnswerText(answers, quizId, locale);
  const tags = recommendation.tags.join(", ");

  const prompt =
    locale === "fi"
      ? `Olet Myötä-palvelun avustaja. Myötä auttaa ihmisiä löytämään sopivan terapeutin.

Terapeutti: ${recommendation.name}
Terapeutin erikoistumiset: ${tags}
Terapeutin esittely: ${recommendation.reason.slice(0, 300)}

Asiakkaan tilanne:
- Mikä tuntuu raskaalta: ${primaryConcern}
- Mitä haluaa terapialta: ${goal}
- Asiakkaan omin sanoin: "${openText}"

Kirjoita 2 lyhyttä lausetta (max 40 sanaa yhteensä) miksi juuri ${recommendation.name} sopii tälle asiakkaalle.

Säännöt:
- Puhu asiakkaalle suoraan (sinä-muoto)
- Mainitse terapeutin nimi
- Ei kliinistä kieltä, ei diagnooseja
- Ei lupauksia tuloksista
- Lämmin ja inhimillinen sävy
- Hyödynnä asiakkaan omia sanoja jos openText ei ole tyhjä`
      : `You are an assistant for Myötä, a service that helps people find the right therapist.

Therapist: ${recommendation.name}
Specializations: ${tags}
Therapist bio: ${recommendation.reason.slice(0, 300)}

Client's situation:
- What feels heavy: ${primaryConcern}
- What they want: ${goal}
- In their own words: "${openText}"

Write 2 short sentences (max 40 words total) explaining why ${recommendation.name} is a good match for this client.

Rules:
- Address client directly (you/your)
- Mention therapist by name
- No clinical language, no diagnoses
- No promised outcomes
- Warm and human tone
- Use client's own words if openText is not empty`;

  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/why-match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 150,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content
      ?.map((b: { type: string; text?: string }) => (b.type === "text" ? (b.text ?? "") : ""))
      .join("")
      .trim();

    return text || fallback(recommendation, locale);
  } catch {
    return fallback(recommendation, locale);
  }
}

function fallback(rec: Recommendation, locale: Locale): string {
  if (locale === "fi") {
    return `${rec.name} vaikuttaa sopivalta vaihtoehdolta vastaustesi perusteella.`;
  }
  return `${rec.name} looks like a strong match based on your answers.`;
}
