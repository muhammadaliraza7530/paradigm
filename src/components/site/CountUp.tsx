import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value ("150+", "99.9%", "10+") from 0 when it scrolls
 * into view. Non-numeric prefix/suffix characters are preserved.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const raw = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = Number(raw.replace(/,/g, ""));
  const animatable = Boolean(match) && !Number.isNaN(target);
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;

  const [display, setDisplay] = useState(() => (match ? (0).toFixed(decimals) : value));

  useEffect(() => {
    if (!animatable) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target.toFixed(decimals));
      return;
    }

    let raf = 0;
    let done = false;
    const run = () => {
      done = true;
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay((target * eased).toFixed(decimals));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !done) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, decimals, animatable]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
