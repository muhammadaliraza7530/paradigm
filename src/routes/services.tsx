import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LitPanel } from "@/components/site/LitPanel";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/site-content";

const TITLE = "Construction Services in Islamabad | Paradigm Design & Construct";
const DESC =
  "Civil and industrial construction, architectural development, MEP, HVAC, mechanical works, solar systems and infrastructure services by Paradigm in Islamabad.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Services,
});

function Services() {

  return (
    <>
      <PageHero
        eyebrow="Quality services"
        title="What we build"
        intro="A complete design-and-construct capability, from ground works to the final mechanical commissioning."
        image="/images/mep.jpg"
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-20 px-5 lg:px-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2"
            >
              <Reveal
                className={`${i % 2 === 1 ? "lg:order-2 reveal-right" : "reveal-left"}`}
                delay={80}
              >
                <LitPanel className="img-watermark overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </LitPanel>
              </Reveal>
              <Reveal className="reveal-step" delay={240}>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  <span className="h-px w-8 bg-primary" />
                  0{i + 1}
                </p>
                <h2 className="mt-4 text-3xl lg:text-4xl">{s.title}</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.subCategories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                {s.body.map((p) => (
                  <p key={p} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="btn-shake mt-8 inline-flex items-center gap-2 border border-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Request a quote <ArrowRight className="size-4" />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
