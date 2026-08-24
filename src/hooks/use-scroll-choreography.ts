import { useEffect } from "react";

/**
 * Lights panels section-by-section as they enter the viewport, and reveals
 * `.reveal` elements once. Runs after load so hydration is never disturbed.
 */
export function useScrollChoreography(dep?: string) {
  useEffect(() => {

    let raf = 0;
    let started = false;
    const lit = new Set<Element>();

    const update = () => {
      const vh = window.innerHeight;

      document.querySelectorAll<HTMLElement>(".lit-panel").forEach((el) => {
        const r = el.getBoundingClientRect();
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        const isVisible = visible > 0 && visible / Math.max(r.height, 1) > 0.16;
        if (isVisible && !lit.has(el)) {
          el.classList.add("is-lit");
          lit.add(el);
        } else if (!isVisible && lit.has(el)) {
          el.classList.remove("is-lit");
          lit.delete(el);
        }
      });

      document.querySelectorAll<HTMLElement>("section").forEach((el) => {
        const r = el.getBoundingClientRect();
        const isVisible = r.top < vh * 0.72 && r.bottom > vh * 0.18;
        el.classList.toggle("is-section-lit", isVisible);
      });

      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("is-in");
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const begin = () => {
      started = true;
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };

    let timer = 0;
    const kick = () => {
      timer = window.setTimeout(begin, 350);
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", kick);
      cancelAnimationFrame(raf);
      if (started) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
  }, [dep]);
}
