import type { Recommendation, QuizAnswers } from "../features/quiz/quizData";
import type { Locale } from "../types/app";

export async function generateWhyMatch(
  recommendation: Recommendation,
  answers: QuizAnswers,
  locale: Locale,
): Promise<string> {
  const openText = typeof answers["l16"] === "string" ? answers["l16"] : "";
  const primaryConcern = answers["q1"] ?? answers["l1"] ?? "";
  const goal = answers["q2"] ?? answers["l2"] ?? "";
  const tags = recommendation.tags.join(", ");

  const prompt =
    locale === "fi"
      ? `Olet Myötä-palvelun avustaja. Myötä auttaa ihmisiä löytämään sopivan terapeutin.

Terapeutti: ${recommendation.name}
Terapeutin erikoistumiset: ${tags}
Terapeutin esittely: ${recommendation.reason.slice(0, 300)}

Asiakkaan tilanne:
- Mikä tuntuu raskaalta: vastauskoodi ${primaryConcern}
- Mitä haluaa terapialta: vastauskoodi ${goal}
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
- What feels heavy: answer code ${primaryConcern}
- What they want: answer code ${goal}
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
