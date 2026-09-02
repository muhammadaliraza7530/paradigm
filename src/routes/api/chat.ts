import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site-content";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the friendly AI assistant for ${SITE.name}, a design & construction company in Islamabad, Pakistan.
Help visitors with services (civil construction, industrial, MEP, infrastructure, solar, finishing), rough construction cost guidance, and how to get a quote.
Indicative rates (PKR per sq.ft):
Residential — grey structure 5,000-6,000, finishing 6,500-7,800, MEP/HVAC 4,500-4,800, furnishing 4,000-4,500.
Commercial (per floor) — grey structure 2,750-2,900, finishing 3,300-3,800.
Always say the exact quote is confirmed after a free site visit.
Contact: UAN ${SITE.uan}, email ${SITE.email}. Head office: ${SITE.headOffice}.
Reply briefly (max ~120 words), warm and professional. You may reply in English or Roman Urdu, matching the user.`;

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Direct Google Gemini call (uses GEMINI_API_KEY — works on Vercel)
async function callGemini(apiKey: string, messages: ChatMessage[]) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
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

// Fallback: Lovable AI gateway (uses LOVABLE_API_KEY)
async function callLovableGateway(apiKey: string, messages: ChatMessage[]) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-3.7-flash",
      messages: [{ role: "system", content: SYSTEM }, ...messages],
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
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
        if (messages.length === 0) {
          return json({ error: "No messages provided." }, 400);
        }

        const geminiKey = process.env["GEMINI_API_KEY"];
        const lovableKey = process.env["LOVABLE_API_KEY"];
        if (!geminiKey && !lovableKey) {
          return json({ error: "AI is not configured." }, 500);
        }

        const result = geminiKey
          ? await callGemini(geminiKey, messages)
          : await callLovableGateway(lovableKey!, messages);

        if (result.reply) {
          return json({ reply: result.reply });
        }

        // Gemini failed — try the Lovable gateway as a backup
        if (geminiKey && lovableKey) {
          const backup = await callLovableGateway(lovableKey, messages);
          if (backup.reply) return json({ reply: backup.reply });
        }

        const message =
          result.status === 429
            ? "Too many requests right now — please try again in a moment."
            : result.status === 402
              ? "AI usage limit reached. Please contact us on WhatsApp instead."
              : `Assistant unavailable (${result.status}).`;
        return json({ error: message }, result.status === 429 ? 429 : 500);
      },
    },
  },
});
