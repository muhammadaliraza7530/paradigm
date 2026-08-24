import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img src={image} alt="" aria-hidden className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
        <div className="grid-backdrop absolute inset-0 opacity-50" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 lg:px-8">
        <p className="animate-rise-in flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-primary">
          <span className="size-2 rounded-full bg-primary animate-pulse-dot" />
          {eyebrow}
        </p>
        <h1 className="animate-wipe-in mt-5 text-[clamp(2.2rem,6vw,4.2rem)] font-extrabold uppercase leading-[0.98]">
          {title}
        </h1>
        {intro && (
          <p
            className="animate-rise-in mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground"
            style={{ animationDelay: "200ms" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
