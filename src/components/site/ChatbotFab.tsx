import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { SITE } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: `Assalam-o-Alaikum! I'm the ${SITE.short} AI assistant. Ask me about our construction services, timelines, or rough costs.`,
};

export function ChatbotFab() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ||
            data.error ||
            "Sorry, I couldn't respond. Please reach us on WhatsApp.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Network issue — please try again or contact us on WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="fixed bottom-[10.5rem] right-6 z-50 inline-flex size-14 items-center justify-center rounded-full border border-primary bg-background text-primary shadow-lg transition-transform hover:scale-105"
      >
        <Bot className="size-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="AI assistant"
            className="relative flex h-[70vh] max-h-[36rem] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border p-5">
              <div>
                <p className="font-display text-base font-bold text-foreground">
                  {SITE.short} AI Assistant
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Instant answers · Powered by AI
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-background/60 text-foreground border border-border",
                  )}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="w-fit rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm text-muted-foreground">
                  Typing…
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services or cost…"
                aria-label="Message"
                className="flex-1 rounded-full border border-border bg-background/40 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
