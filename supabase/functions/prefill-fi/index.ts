interface TherapistLocalizationFields {
  shortIntro: string;
  bio: string;
  approachSummary: string;
  freeTextPublicAnswers: Record<string, string>;
}

const openAiApiKey = Deno.env.get("OPENAI_API_KEY");

Deno.serve(async (request) => {
  const payload = (await request.json()) as TherapistLocalizationFields;

  if (!openAiApiKey) {
    return Response.json(payload);
  }

  const prompt = `Translate the following therapist profile content from English to Finnish. Preserve keys and return strict JSON with the same shape.\n\n${JSON.stringify(payload)}`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      input: prompt,
    }),
  });

  if (!response.ok) {
    return Response.json(payload);
  }

  const data = await response.json();
  const output = data.output_text;

  try {
    return Response.json(JSON.parse(output));
  } catch {
    return Response.json(payload);
  }
});
