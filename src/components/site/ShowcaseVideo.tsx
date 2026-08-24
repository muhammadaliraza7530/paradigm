import { useEffect, useRef } from "react";

/**
 * Autoplays muted (mobile-safe) and switches sound ON automatically whenever the
 * video scrolls into view — no controls. Leaving the section mutes + pauses it.
 * Browsers require a user gesture before audio can start, so the first tap/scroll
 * anywhere on the page primes it; after that it is fully automatic.
 */
export function ShowcaseVideo({
  className,
  src = "/showcase.mp4",
  poster = "/showcase-poster.jpg",
}: {
  className?: string;
  src?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let inView = false;
    let retry = 0;

    const enableSound = () => {
      if (!inView) return;
      el.muted = false;
      el.volume = 1;
      void el.play().catch(() => {
        // Audio blocked (no user activation yet) — keep playing silently and retry.
        el.muted = true;
        void el.play().catch(() => {});
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          void el.play().catch(() => {});
          enableSound();
        } else {
          el.muted = true;
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    // Any interaction anywhere grants audio permission — retry immediately.
    const gestures = ["pointerdown", "pointermove", "touchstart", "keydown", "wheel", "scroll"];
    const opts: AddEventListenerOptions = { passive: true, capture: true };
    gestures.forEach((g) => window.addEventListener(g, enableSound, opts));

    // Safety net: while in view but still muted, keep trying.
    retry = window.setInterval(() => {
      if (inView && el.muted) enableSound();
    }, 800);

    return () => {
      io.disconnect();
      window.clearInterval(retry);
      gestures.forEach((g) => window.removeEventListener(g, enableSound, opts));
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controlsList="nodownload"
    />
  );
}
