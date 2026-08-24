import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.3em]">
        {align === "left" && <span className="h-px w-8 bg-primary" />}
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-2xl leading-[1.12] sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>}
    </Reveal>
  );
}
