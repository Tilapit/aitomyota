import type { MatchResult } from "./matching";

const specLabels: Record<string, string> = {
  spec_stress: "stressi ja uupumus",
  spec_anxiety: "ahdistuneisuus ja pelot",
  spec_depression: "masennus ja alakulo",
  spec_selfesteem: "itsetunto ja identiteetti",
  spec_relationships: "ihmissuhteet ja perhe",
  spec_crisis: "kriisit ja suru",
  spec_performance: "opiskelu ja suorituspaineet",
  spec_neuro: "neurokirjo",
  spec_parenting: "vanhemmuus",
};

function buildStrengths(therapist: MatchResult): string[] {
  const bd = therapist.scoreBreakdown;
  const strengths: string[] = [];
  if (bd.approach === 20) strengths.push("kohtaamistapa");
  if (bd.specializations >= 20) strengths.push("erikoistumiset");
  if (bd.workStyle >= 12) strengths.push("työskentelyote");
  if (bd.pace >= 10) strengths.push("etenemistahti");
  return strengths;
}

function fallbackWhyMatch(
  therapist: MatchResult,
  strengths: string[],
  language: "fi" | "en",
): string {
  if (language === "fi") {
    return `${therapist.name} sopii sinulle erityisesti ${
      strengths[0] ?? "työskentelytavan"
    } perusteella. Yhteensopivuuspisteesi on ${therapist.score}/100.`;
  }
  return `${therapist.name} is a strong match for you, especially based on ${
    strengths[0] ?? "working style"
  }. Your compatibility score is ${therapist.score}/100.`;
}

export async function generateWhyMatch(
  therapist: MatchResult,
  quizAnswers: Record<string, string>,
  language: "fi" | "en",
): Promise<string> {
  const matchingSpecs = Object.entries(specLabels)
    .filter(([key]) => therapist[key as keyof MatchResult] === true)
    .map(([, label]) => label)
    .join(", ");

  const strengths = buildStrengths(therapist);
  const freeText = quizAnswers["pq8"] ?? "";
  const q1Answer = quizAnswers["q1"] ?? "";
  const q1bAnswer = quizAnswers["q1b"] ?? "";

  const prompt =
    language === "fi"
      ? `Olet Myötä-palvelun avustaja. Myötä yhdistää ihmisiä sopiviin terapeutteihin.

Algoritmimme on laskenut että tämä terapeutti sopii asiakkaalle yhteensopivuuspisteillä ${therapist.score}/100.

Terapeutin tiedot:
- Nimi: ${therapist.name}
- Erikoistumiset: ${matchingSpecs || "monipuolinen"}
- Bio: ${therapist.bio.slice(0, 200)}
- Kokemus: ${therapist.years_experience} vuotta
- Kohtaamistapa: ${therapist.approach}
- Työskentelypainotus: ${therapist.work_focus}

Parhaat matchin syyt algoritmimme mukaan: ${strengths.join(", ")}

Asiakkaan vastaukset:
- Mikä painaa: vaihtoehto ${q1Answer}
- Tarkennus: ${q1bAnswer}
- Asiakkaan omin sanoin: "${freeText}"

Kirjoita 2-3 lauseen lämmin, henkilökohtainen selitys MIKSI juuri tämä terapeutti sopii tälle asiakkaalle.

Tärkeää:
- Älä käytä kliinistä tai diagnosoivaa kieltä
- Älä lupaa tuloksia
- Puhu asiakkaalle suoraan (sinä-muoto)
- Mainitse terapeutin nimi
- Hyödynnä asiakkaan omia sanoja jos pq8 ei ole tyhjä
- Korosta miksi juuri tämä terapeutti erottuu muista
- Max 60 sanaa`
      : `You are an assistant for Myötä, a service that matches people with therapists.

Our algorithm matched this therapist with a compatibility score of ${therapist.score}/100.

Therapist details:
- Name: ${therapist.name}
- Specializations: ${matchingSpecs || "versatile"}
- Bio: ${therapist.bio.slice(0, 200)}
- Experience: ${therapist.years_experience} years
- Approach: ${therapist.approach}

Best match reasons: ${strengths.join(", ")}

Client's own words: "${freeText}"

Write a warm, personal 2-3 sentence explanation of WHY this specific therapist suits this client.

Important:
- No clinical or diagnostic language
- No promised outcomes
- Address client directly (you/your)
- Mention therapist by name
- Max 60 words`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 150,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      return fallbackWhyMatch(therapist, strengths, language);
    }

    const data = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content
      ?.map((b) => (b.type === "text" ? (b.text ?? "") : ""))
      .join("")
      .trim();

    return text || fallbackWhyMatch(therapist, strengths, language);
  } catch {
    return fallbackWhyMatch(therapist, strengths, language);
  }
}
