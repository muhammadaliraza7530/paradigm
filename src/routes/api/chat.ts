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

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response(JSON.stringify({ error: "AI is not configured." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
        if (messages.length === 0) {
          return new Response(JSON.stringify({ error: "No messages provided." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.7-flash",
            messages: [{ role: "system", content: SYSTEM }, ...messages],
          }),
        });

        if (!res.ok) {
          const detail = await res.text();
          const message =
            res.status === 429
              ? "Too many requests right now — please try again in a moment."
              : res.status === 402
                ? "AI usage limit reached. Please contact us on WhatsApp instead."
                : `Assistant unavailable (${res.status}).`;
          console.error("AI gateway error", res.status, detail);
          return new Response(JSON.stringify({ error: message }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content?.trim() ?? "";
        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
