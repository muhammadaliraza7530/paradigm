import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, CalendarClock, Handshake } from "lucide-react";
import { LitPanel } from "@/components/site/LitPanel";
import { CountUp } from "@/components/site/CountUp";
import { ShowcaseVideo } from "@/components/site/ShowcaseVideo";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { ShowcaseMarquee } from "@/components/site/ShowcaseMarquee";
import { TestimonialsMarquee } from "@/components/site/TestimonialsMarquee";
import { Marquee } from "@/components/site/Marquee";
import { Wordmark } from "@/components/site/Wordmark";


import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CLIENTS, FAQS, PROJECTS, SERVICES, STATS, waLink } from "@/lib/site-content";


const TITLE = "Paradigm Design & Construct — Construction & Engineering, Islamabad";
const DESC =
  "Paradigm Design & Construct is a top-tier construction company in Islamabad with 10+ years of experience in civil, industrial, architectural, MEP, HVAC and solar projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [
      { rel: "preload", as: "image", href: "/images/architecture.jpg", fetchPriority: "high" },
    ],
  }),

  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <HeroSlideshow />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/55" />
          <div className="grid-backdrop absolute inset-0 opacity-60" />
        </div>


        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="animate-rise-in flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-primary sm:text-xs">
              <span className="size-2 shrink-0 rounded-full bg-primary animate-pulse-dot" />
              Welcome to
            </p>
            <h1 className="animate-wipe-in mt-4 font-display text-[clamp(2.9rem,13vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-[0.02em] drop-shadow-[0_0_38px_color-mix(in_oklab,var(--color-cyan-signal)_35%,transparent)]">
              <Wordmark />
            </h1>
            <p
              className="animate-rise-in mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              A top-tier construction company based in Islamabad, Pakistan, with over 10 years of
              experience in the industry.
            </p>
            <p
              className="animate-rise-in mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary"
              style={{ animationDelay: "300ms" }}
            >
              Featured project — Compassion Plaza
            </p>

            <div
              className="animate-rise-in mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "380ms" }}
            >
              <Link
                to="/services"
                className="btn-shake group inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Our services
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-shake rounded-full border border-border px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 sm:gap-4 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <LitPanel key={s.label} className="bg-background p-4 text-center sm:p-8 lg:p-10">
              <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2 text-balance text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.08em] text-muted-foreground sm:mt-3 sm:text-sm sm:tracking-normal">
                {s.label}
              </p>
            </LitPanel>
          ))}

        </div>
      </section>


      {/* Intro */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <LitPanel className="overflow-hidden">
              <div className="img-watermark overflow-hidden rounded-[1.25rem]">
                <ShowcaseVideo className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" />
              </div>

            </LitPanel>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Turning dreams into reality"
              title="10 years of undefeated success"
              intro="We are leaders in industrial construction and specialize in using cutting-edge technology to design and build facilities that meet our clients' needs."
            />
            <Reveal delay={120}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Sustainability", "Project on time", "Modern technology", "Latest designs"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <Link
                to="/about"
                className="btn-shake mt-10 inline-flex items-center gap-2 border border-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Work with us<ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Recent builds — draggable auto-scrolling showcase */}
      <section className="relative border-t border-border bg-card/20 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Recent builds"
              title="Homes we've delivered"
              intro="Drag to explore, or let it glide. Modern residences designed and constructed by our team across Islamabad and Lahore."
            />
            <Reveal>
              <Link
                to="/projects"
                className="btn-shake inline-flex items-center gap-2 border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
              >
                See portfolio <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="mt-12">
          <ShowcaseMarquee />
        </div>
      </section>

      {/* Services */}
      <section className="relative border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Build your dream" title="Quality services" />
            <Reveal>
              <Link
                to="/services"
                className="btn-shake inline-flex items-center gap-2 border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
              >
                View all <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} className="reveal-step" delay={i * 170}>
                <LitPanel className="group h-full bg-card/50">
                  <div className="img-watermark overflow-hidden rounded-t-[1.25rem]">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-lg">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                    <Link
                      to="/services"
                      hash={s.slug}
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"
                    >
                      Learn more <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </LitPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability band */}
      <section className="relative overflow-hidden border-y border-border">
        <img
          src="/images/mechanical.jpg"
          alt="Mechanical works in progress"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-background/88" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-2 lg:px-8">
          <SectionHeading
            eyebrow="Sustainability"
            title="Committed to keep people healthy & safe"
          />
          <Reveal delay={100}>
            <LitPanel className="bg-card/70 p-8 backdrop-blur-sm">
              <h3 className="text-xl">We follow best practices</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Experience the Paradigm, where quality meets perfection.
              </p>
              <Link
                to="/contact"
                className="btn-shake mt-7 inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Get in touch<ArrowRight className="size-4" />
              </Link>
            </LitPanel>
          </Reveal>
        </div>
      </section>

      {/* Latest work */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Portfolio" title="Our latest work" />
            <Reveal>
              <Link
                to="/projects"
                className="btn-shake inline-flex items-center gap-2 border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
              >
                View projects <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <Reveal key={`${p.title}-${i}`} className="reveal-step" delay={i * 150}>
                <LitPanel className="img-watermark group relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-6 pt-16">
                    <h3 className="text-base">{p.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">
                      {p.location}
                    </p>
                  </div>
                </LitPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="What our clients say"
            title="Testimonials"
            align="center"
          />
        </div>
        <div className="mt-12">
          <TestimonialsMarquee />
        </div>
      </section>



      {/* Schedule Meeting + Affiliate Partner */}
      <section className="relative border-t border-border bg-card/30 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:px-8">
          {/* Schedule Meeting */}
          <Reveal className="reveal-left">
            <LitPanel className="group relative h-full overflow-hidden bg-background p-6 sm:p-9 lg:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-80" />
              <div className="relative">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary sm:size-14">
                  <CalendarClock className="size-6 sm:size-7" />
                </span>
                <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary sm:mt-8 sm:text-xs sm:tracking-[0.35em]">
                  Schedule a meeting
                </p>
                <h3 className="mt-3 text-balance font-display text-[1.65rem] font-extrabold uppercase leading-[1.04] sm:mt-4 sm:text-3xl lg:text-4xl">
                  Plan your build with our engineers
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Book a focused consultation in Islamabad or online. Bring your plot details and leave
                  with a clear roadmap for structure, MEP, HVAC and finishing.
                </p>
                <Link
                  to="/contact"
                  className="btn-shake mt-8 inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
                >
                  Schedule your meeting
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </LitPanel>

          </Reveal>

          {/* Affiliate Partner */}
          <Reveal className="reveal-right" delay={140}>
            <LitPanel className="group relative h-full overflow-hidden bg-background p-6 sm:p-9 lg:p-10">
              <div className="pointer-events-none absolute -left-16 -bottom-16 size-56 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-80" />
              <div className="relative">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary sm:size-14">
                  <Handshake className="size-6 sm:size-7" />
                </span>
                <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary sm:mt-8 sm:text-xs sm:tracking-[0.35em]">
                  Affiliate partner
                </p>
                <h3 className="mt-3 text-balance font-display text-[1.65rem] font-extrabold uppercase leading-[1.04] sm:mt-4 sm:text-3xl lg:text-4xl">
                  Partner with Paradigm and grow
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Architects, brokers, suppliers and subcontractors can join our partner network,
                  refer quality projects and grow with a trusted construction team.
                </p>
                <Link
                  to="/contact"
                  className="btn-shake mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
                >
                  Become our partner
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </LitPanel>

          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section className="border-t border-border py-16">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-primary">
              Trust and worth · Our clients
            </p>
            <Marquee
              speed={180}
              className="mt-10"
              trackClassName="items-center gap-6 px-5 lg:px-8"
              items={CLIENTS.map((c) => (
                <div className="flex h-24 w-48 items-center justify-center rounded-2xl bg-white/95 p-4 shadow-sm ring-1 ring-border transition-transform hover:-translate-y-1 sm:w-56">
                  <img
                    src={c}
                    alt="Client logo"
                    loading="lazy"
                    decoding="async"
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Learn more from"
            title="Frequently asked questions"
            align="center"
          />
          <div className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} className="reveal-step" delay={i * 110}>
                <LitPanel as="details" className="group block bg-card/50 p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-base font-semibold">
                    {f.q}
                    <span className="text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </LitPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
