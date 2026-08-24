import { Marquee } from "./Marquee";

const IMAGES = Array.from({ length: 14 }, (_, i) => `/newProjects/newProject${i + 1}.jpeg`);

export function ShowcaseMarquee() {
  return (
    <Marquee
      speed={150}
      className="py-2"
      trackClassName="gap-4 sm:gap-5"
      items={IMAGES.map((src, i) => (
        <div className="img-watermark overflow-hidden rounded-xl bg-card/40 shadow-lg shadow-background/30">
          <img
            src={src}
            alt={`Completed Paradigm project ${i + 1}`}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="pointer-events-none h-[230px] w-auto max-w-none rounded-xl object-contain sm:h-[310px] lg:h-[370px]"
          />
        </div>
      ))}
    />
  );
}
