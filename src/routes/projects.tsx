import { createFileRoute } from "@tanstack/react-router";
import { LitPanel } from "@/components/site/LitPanel";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ShowcaseVideo } from "@/components/site/ShowcaseVideo";
import { ShowcaseMarquee } from "@/components/site/ShowcaseMarquee";


import { PROJECTS } from "@/lib/site-content";

const TITLE = "Our Projects | Paradigm Design & Construct, Islamabad";
const DESC =
  "Selected construction projects delivered by Paradigm across Islamabad, Rawalpindi and Punjab — malls, plazas, residences, fuel stations and industrial facilities.";
const PROJECT_VIDEOS = Array.from(
  { length: 8 },
  (_, index) => `/project-videos/project-vidoe-${index + 1}.mp4`,
).concat("/project-videos/project-vidoe-9.MOV");

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Projects,
});

function Projects() {

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects delivered"
        intro="Over 150 completed projects across commercial, residential and industrial sectors."
        image="/images/infrastructure.jpg"
      />

      {/* Showreel */}
      <section className="border-t border-border bg-card/20 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <LitPanel className="overflow-hidden">
              <div className="img-watermark overflow-hidden rounded-[1.25rem]">
                <ShowcaseVideo
                  src="/projects-video.mp4"
                  poster="/projects-video-poster.jpg"
                  className="aspect-video w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </LitPanel>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Paradigm showreel
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured projects gallery */}
      <section className="border-t border-border bg-card/20 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] text-primary sm:text-xs">
            Our featured projects
          </p>
          <h2 className="mt-4 text-balance text-center text-2xl font-extrabold uppercase sm:text-3xl lg:text-4xl">
            Excellence delivered across Pakistan
          </h2>
        </div>
        <div className="mt-12">
          <ShowcaseMarquee />
        </div>
      </section>

      {/* Project walkthroughs */}
      <section className="border-t border-border py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] text-primary sm:text-xs">
            Project walkthroughs 
          </p>
          <h2 className="mt-4 text-balance text-center text-2xl font-extrabold uppercase sm:text-3xl lg:text-4xl">
            See the work in motion
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {PROJECT_VIDEOS.map((video, index) => (
            <Reveal key={video} className="reveal-step" delay={(index % 4) * 120}>
              <LitPanel className="img-watermark group overflow-hidden">
                <ShowcaseVideo
                  src={video}
                  poster={PROJECTS[index % PROJECTS.length].image}
                  controls
                  unmuted
                  loop={false}
                  autoPlay={false}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="border-t border-border px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Project walkthrough {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </LitPanel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={`${p.title}-${i}`} className="reveal-step" delay={(i % 3) * 160}>
              <LitPanel className="img-watermark group relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent p-6 pt-20">
                  <h2 className="text-lg">{p.title}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">
                    {p.location}
                  </p>
                </div>
              </LitPanel>
            </Reveal>
          ))}
        </div>
      </section>


    </>
  );
}
