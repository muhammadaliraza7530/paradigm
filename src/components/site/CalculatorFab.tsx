import { useEffect, useMemo, useState } from "react";
import { Calculator, MessageCircle, X } from "lucide-react";
import { SITE, waLink } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const RATES = {
  grey: 2700,
  finishing: 3200,
  commercial: 3500,
} as const;

type BuildType = keyof typeof RATES;

const BUILD_TYPES: { id: BuildType; label: string }[] = [
  { id: "grey", label: "Grey Structure" },
  { id: "finishing", label: "Finishing" },
  { id: "commercial", label: "Commercial" },
];

const PLOT_SIZES = [
  { label: "3 Marla", area: 675 },
  { label: "5 Marla", area: 1125 },
  { label: "7 Marla", area: 1575 },
  { label: "10 Marla", area: 2250 },
  { label: "1 Kanal", area: 4500 },
  { label: "2 Kanal", area: 9000 },
];

const COVERAGE = 0.78;

const pkr = (n: number) =>
  "PKR " + Math.round(n).toLocaleString("en-PK", { maximumFractionDigits: 0 });

export function CalculatorFab() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<BuildType>("grey");
  const [plotIdx, setPlotIdx] = useState(3);
  const [floors, setFloors] = useState(1);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const plot = PLOT_SIZES[plotIdx];
  const area = useMemo(
    () => Math.round(plot.area * COVERAGE * floors),
    [plot.area, floors],
  );
  const rate = RATES[type];
  const total = area * rate;
  const selected = BUILD_TYPES.find((t) => t.id === type)!;

  const waText = `Assalam-o-Alaikum! I used the ${SITE.short} cost calculator.\n\nConstruction type: ${selected.label}\nPlot size: ${plot.label}\nFloors: ${floors === 1 ? "Ground only" : `Ground + ${floors - 1}`}\nCovered area: ${area.toLocaleString()} Sq.ft\nRate: PKR ${rate.toLocaleString()}/Sq.ft\nEstimated cost: ${pkr(total)}\n\nPlease share an exact quote.`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open construction cost calculator"
        className="fixed bottom-24 right-6 z-50 inline-flex size-14 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Calculator className="size-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close calculator"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Construction cost calculator"
            className="relative flex max-h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border p-5">
              <div>
                <p className="font-display text-base font-bold text-foreground">
                  {SITE.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Instant construction estimate for your plot, then a free site
                  visit &amp; exact fixed quote.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Service
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {BUILD_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
                        type === t.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background/40 text-foreground hover:border-primary/50",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Plot size
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {PLOT_SIZES.map((p, i) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPlotIdx(i)}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
                        i === plotIdx
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background/40 text-foreground hover:border-primary/50",
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Floors
                  </p>
                  <span className="text-sm font-bold text-primary">
                    {floors === 1 ? "Ground only" : `Ground + ${floors - 1}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="mt-3 w-full accent-primary"
                  aria-label="Number of floors"
                />
              </div>

              <div className="rounded-xl border border-primary/40 bg-primary/10 p-5 text-center">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                  Estimated cost · {plot.label} {selected.label}
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold text-foreground">
                  {pkr(total)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {area.toLocaleString()} Sq.ft @ PKR {rate.toLocaleString()}
                  /Sq.ft · exact quote after free site visit.
                </p>
              </div>

              <a
                href={waLink(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                <MessageCircle className="size-4" /> Get exact quote on WhatsApp
              </a>

              <p className="text-center text-[0.7rem] leading-relaxed text-muted-foreground">
                HQ: {SITE.headOffice} · Replies within minutes
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
