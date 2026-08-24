import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * "PARADIGM" wordmark: PARA in foreground, DIGM in brand blue.
 * Letters rise up into view (staggered) whenever the wordmark enters the viewport.
 */
const LETTERS = "PARADIGM".split("");

export function Wordmark({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={cn("wordmark", visible && "is-in", className)}
      aria-label="Paradigm"
    >
      {LETTERS.map((ch, i) => (
        <span key={i} aria-hidden className="wordmark-letter">
          <span
            className={i < 4 ? "text-foreground" : "text-primary"}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}
