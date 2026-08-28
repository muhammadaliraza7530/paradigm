import { createFileRoute } from "@tanstack/react-router";
import { LitPanel } from "@/components/site/LitPanel";
import { CountUp } from "@/components/site/CountUp";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { STATS } from "@/lib/site-content";

const TITLE = "About the Company | Paradigm Design & Construct";
const DESC =
  "Paradigm Design & Construct is an Islamabad-based design and construction firm with 10+ years of experience, its own crew, and registrations with FBR and SECP.";

const VALUES = [
  {
    title: "Sustainability",
    body: "We build with materials and methods that reduce waste and keep long-term running costs low for our clients.",
  },
  {
    title: "On time delivery",
    body: "Structured planning and our own in-house crew keep programmes on schedule and budgets predictable.",
  },
  {
    title: "Modern technology",
    body: "Cutting-edge design tools and construction techniques on every industrial and civil project we take on.",
  },
  {
    title: "Safety first",
    body: "Site safety practices are non-negotiable — we are committed to keeping people healthy and safe.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: About,
});

function About() {

  return (
    <>
      <PageHero
        eyebrow="The company"
        title="Turning dreams into reality"
        intro="A top-tier construction company based in Islamabad, Pakistan, with over 10 years of experience in the industry."
        image="/images/architecture.jpg"
      >
        <a
          href="/Paradigm Company Profile.l.pdf"
          download
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Company details
        </a>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal className="reveal-left">
            <LitPanel className="img-watermark overflow-hidden">
              <img
                src="/images/desing.jpg"
                alt="Paradigm engineers on a construction site"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </LitPanel>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Design and construct, under one roof"
              intro="From land purchase advice and custom design through to construction, mechanical works and commissioning, we handle the whole journey in-house."
            />
            <Reveal className="reveal-right" delay={120}>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Paradigm is registered with SECP, FBR, PEC (Pakistan Engineering Council), FWO, MES,
                PRA (Punjab Revenue Authority) and other government bodies. Our
                professionals have years of experience in the construction industry and are
                trained in the latest technology and techniques, so every project — from a small
                remodel to a full industrial plant — is delivered to the same standard.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/30 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <LitPanel key={s.label} className="bg-background p-8 lg:p-10">
              <p className="font-display text-4xl font-extrabold text-primary lg:text-5xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-3 text-sm leading-snug text-muted-foreground">{s.label}</p>
            </LitPanel>
          ))}
        </div>
      </section>


      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="How we work" title="Our values" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} className="reveal-step" delay={i * 150}>
                <LitPanel className="h-full bg-card/50 p-7">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    0{i + 1}
                  </p>
                  <h3 className="mt-4 text-lg">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </LitPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
