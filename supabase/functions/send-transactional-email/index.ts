import { createClient } from "npm:@supabase/supabase-js@2";

type TransactionalEmailPayload = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | string[];
  tags?: Array<{
    name: string;
    value: string;
  }>;
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resendFromEmail = Deno.env.get("RESEND_FROM_EMAIL");

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function normalizeRecipients(value: string | string[]) {
  return Array.isArray(value) ? value : [value];
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return json({ error: "Supabase environment is not configured" }, 500);
  }

  if (!resendApiKey || !resendFromEmail) {
    return json({ error: "Resend environment is not configured" }, 500);
  }

  const authorization = request.headers.get("Authorization");

  if (!authorization) {
    return json({ error: "Missing authorization header" }, 401);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: authorization,
      },
    },
  });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return json({ error: "Unauthorized" }, 401);
  }

  const payload = (await request.json()) as TransactionalEmailPayload;

  if (!payload.subject || (!payload.html && !payload.text)) {
    return json({ error: "Missing required email fields" }, 400);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "myota-supabase-function/1.0",
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: normalizeRecipients(payload.to),
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo ? normalizeRecipients(payload.replyTo) : undefined,
      tags: payload.tags,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return json(
      {
        error: "Resend request failed",
        details: data,
      },
      response.status,
    );
  }

  return json({ id: data.id });
});
