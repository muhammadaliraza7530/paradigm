import { Quote } from "lucide-react";
import { Marquee } from "./Marquee";
import { LitPanel } from "./LitPanel";
import { TESTIMONIALS } from "@/lib/site-content";

export function TestimonialsMarquee() {
  return (
    <Marquee
      speed={115}
      className="px-5 py-2 lg:px-8"
      items={TESTIMONIALS.map((t) => (
        <LitPanel className="is-lit flex h-full w-[285px] flex-col bg-background p-6 sm:w-[380px] sm:p-7 lg:w-[440px]">
          <Quote className="size-6 shrink-0 text-primary" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
          <div className="mt-auto border-t border-border pt-5">
            <p className="font-display text-base font-semibold">{t.name}</p>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-primary">{t.role}</p>
          </div>
        </LitPanel>
      ))}
      trackClassName="items-stretch"
    />
  );
}
