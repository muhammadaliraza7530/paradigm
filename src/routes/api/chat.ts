import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site-content";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are Paradigm Assistant, the official AI assistant for ${SITE.name} in Islamabad, Pakistan.
Your job is to help users calculate construction costs, answer FAQs about Paradigm Design & Construct, and collect lead details: Name, Phone Number, and Plot Size.
Use these updated indicative rates (PKR per sq.ft):
- Residential: Grey Structure 5,000-6,000; Finishing 6,500-7,800; MEP/HVAC 4,500-4,800; Furnishing 4,000-4,500.
- Commercial: Grey Structure 2,750-2,900; Finishing 3,300-3,800.
For residential, total covered area is Ground Floor + First Floor + Mumty, or whichever covered area the user provides.
For commercial, total covered area is Single Floor Covered Area × Number of Floors.
Be concise but helpful. Always mention that the exact quote is confirmed after a free site visit.
If a user shares a lead, collect Name, Phone Number, and Plot Size; ask for any missing field in a friendly way.
Contact: UAN ${SITE.uan}, email ${SITE.email}. Head office: ${SITE.headOffice}.
Reply briefly (max ~150 words), warm and professional. You may reply in English or Roman Urdu, matching the user.`;

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

type RuntimeEnv = Record<string, unknown>;

function getServerValue(name: string) {
  const runtimeEnv = globalThis.__PARADIGM_RUNTIME_ENV as RuntimeEnv | undefined;
  const processValue = typeof process !== "undefined" ? process.env[name] : undefined;

  if (typeof runtimeEnv?.[name] === "string" && runtimeEnv[name]) {
    return { value: runtimeEnv[name] as string, source: "runtime binding" };
  }
  if (processValue) return { value: processValue, source: "process.env" };
  return { value: undefined, source: "missing" };
}

function environmentStatus() {
  const processAvailable = typeof process !== "undefined";
  const runtimeEnv = globalThis.__PARADIGM_RUNTIME_ENV as RuntimeEnv | undefined;
  return {
    nodeProcessAvailable: processAvailable,
    runtimeBindingAvailable: Boolean(runtimeEnv),
    nodeEnv: processAvailable ? (process.env.NODE_ENV ?? "unknown") : "unavailable",
  };
}

async function callGemini(apiKey: string, messages: ChatMessage[], systemPrompt: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${getServerValue("GEMINI_MODEL").value || "gemini-3.6-flash"}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text();
    console.error("Gemini API error", res.status, detail);
    return { status: res.status, reply: null as string | null };
  }
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const reply =
    data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim() ?? "";
  return { status: 200, reply };
}

async function callLovableGateway(apiKey: string, messages: ChatMessage[], systemPrompt: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-3.7-flash",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error("AI gateway error", res.status, detail);
    return { status: res.status, reply: null as string | null };
  }
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return { status: 200, reply: data.choices?.[0]?.message?.content?.trim() ?? "" };
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const currentDate = new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const systemPrompt = `${SYSTEM}
Today's date is ${currentDate}. Use this date when answering time-sensitive questions about today, dates, deadlines, or relative times such as "tomorrow" and "next week".`;
        const gemini = getServerValue("GEMINI_API_KEY");
        const lovable = getServerValue("LOVABLE_API_KEY");
        const isDevelopment =
          typeof process === "undefined" || process.env.NODE_ENV !== "production";
        console.log(
          "[/api/chat] GEMINI_API_KEY is",
          gemini.value ? `defined (${gemini.source})` : "missing",
        );

        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return json({ error: "Request body must be valid JSON." }, 400);
        }

        const messages = Array.isArray(body.messages)
          ? body.messages
              .filter(
                (message): message is ChatMessage =>
                  typeof message === "object" &&
                  message !== null &&
                  ((message as ChatMessage).role === "user" ||
                    (message as ChatMessage).role === "assistant") &&
                  typeof (message as ChatMessage).content === "string" &&
                  (message as ChatMessage).content.trim().length > 0,
              )
              .slice(-20)
          : [];
        if (messages.length === 0) {
          return json({ error: "No messages provided." }, 400);
        }

        const geminiKey = gemini.value;
        const lovableKey = lovable.value;
        if (!geminiKey && !lovableKey) {
          const response: { error: string; environment?: ReturnType<typeof environmentStatus> } = {
            error: "AI is not configured. Set GEMINI_API_KEY or LOVABLE_API_KEY on the server.",
          };
          if (isDevelopment) response.environment = environmentStatus();
          return json(response, 503);
        }

        let result: { status: number; reply: string | null };
        try {
          result = geminiKey
            ? await callGemini(geminiKey, messages, systemPrompt)
            : await callLovableGateway(lovableKey!, messages, systemPrompt);
        } catch (error) {
          console.error("Primary AI provider failed", error);
          result = { status: 503, reply: null };
        }

        if (result.reply) {
          return json({ reply: result.reply });
        }

        // Gemini failed — try the Lovable gateway as a backup
        if (geminiKey && lovableKey) {
          try {
            const backup = await callLovableGateway(lovableKey, messages, systemPrompt);
            if (backup.reply) return json({ reply: backup.reply });
          } catch (error) {
            console.error("Backup AI provider failed", error);
          }
        }

        const message =
          result.status === 429
            ? "Too many requests right now — please try again in a moment."
            : result.status === 402
              ? "AI usage limit reached. Please contact us on WhatsApp instead."
              : "The assistant is temporarily unavailable. Please try again or contact us on WhatsApp.";
        return json({ error: message }, result.status === 429 ? 429 : 503);
      },
    },
  },
});
