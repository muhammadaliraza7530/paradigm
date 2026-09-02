import { useEffect, useMemo, useState } from "react";
import { Calculator, MessageCircle, X } from "lucide-react";
import { SITE, waLink } from "@/lib/site-content";
import {
  COMMERCIAL,
  COM_SCOPES,
  RESIDENTIAL,
  RES_SCOPES,
  calculateCommercialEstimate,
  calculateResidentialEstimate,
  type CommercialScope,
  type ResidentialScope,
} from "@/lib/quotation-rates";
import { cn } from "@/lib/utils";

type Category = "residential" | "commercial";

const pkr = (n: number) =>
  "PKR " + Math.round(n).toLocaleString("en-PK", { maximumFractionDigits: 0 });

export function CalculatorFab() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("residential");
  const [resIdx, setResIdx] = useState(3);
  const [comIdx, setComIdx] = useState(3);
  const [resArea, setResArea] = useState(0);
  const [comArea, setComArea] = useState(COMMERCIAL[3].area);
  const [floors, setFloors] = useState(2);
  const [resScopes, setResScopes] = useState<ResidentialScope[]>(["grey", "finishing"]);
  const [comScopes, setComScopes] = useState<CommercialScope[]>(["grey", "finishing"]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const resPlot = RESIDENTIAL[resIdx];
  const comPlot = COMMERCIAL[comIdx];

  const selectRes = (i: number) => {
    setResIdx(i);
    setResArea(0);
  };
  const selectCom = (i: number) => {
    setComIdx(i);
    setComArea(COMMERCIAL[i].area);
  };

  const toggle = <T,>(list: T[], v: T): T[] =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  const { lines, total, totalArea } = useMemo(() => {
    if (category === "residential") {
      return calculateResidentialEstimate(resPlot, resArea, resScopes);
    }

    return calculateCommercialEstimate(comPlot, comArea, floors, comScopes);
  }, [category, resArea, resPlot, resScopes, comArea, comPlot, comScopes, floors]);

  const plotLabel = category === "residential" ? resPlot.label : comPlot.label;

  const waText = `Assalam-o-Alaikum! I used the ${SITE.short} cost calculator.\n\nCategory: ${category === "residential" ? "Residential" : "Commercial"}\nPlot size: ${plotLabel}\n${
    category === "residential"
      ? `Covered area (Ground + First + Mumty): ${totalArea.toLocaleString()} Sq.ft`
      : `Single floor covered area: ${comArea.toLocaleString()} Sq.ft\nFloors: ${floors}\nTotal covered area: ${totalArea.toLocaleString()} Sq.ft`
  }\n\n${lines
    .map((l) => `${l.label}: ${l.area.toLocaleString()} x ${l.rate} = ${pkr(l.amount)}`)
    .join("\n")}\n\nGrand total: ${pkr(total)}\n\nPlease share an exact quote.`;

  const chip = (active: boolean) =>
    cn(
      "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-background/40 text-foreground hover:border-primary/50",
    );

  const labelCls = "text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground";

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
                <p className="font-display text-base font-bold text-foreground">{SITE.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Instant construction estimate for your plot, then a free site visit &amp; exact
                  fixed quote.
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
                <p className={labelCls}>Category</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["residential", "commercial"] as Category[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={chip(category === c)}
                    >
                      {c === "residential" ? "Residential" : "Commercial"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className={labelCls}>Plot size</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {category === "residential"
                    ? RESIDENTIAL.map((p, i) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => selectRes(i)}
                          className={chip(i === resIdx)}
                        >
                          {p.label}
                        </button>
                      ))
                    : COMMERCIAL.map((p, i) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => selectCom(i)}
                          className={chip(i === comIdx)}
                        >
                          {p.label}
                        </button>
                      ))}
                </div>
              </div>

              {category === "residential" ? (
                <div>
                  <div className="flex items-center justify-between">
                    <p className={labelCls}>Total covered area</p>
                    <span className="text-sm font-bold text-primary">
                      {resArea.toLocaleString()} Sq.ft
                    </span>
                  </div>
                  <input
                    type="number"
                    min={100}
                    step={5}
                    value={resArea}
                    onChange={(e) => setResArea(Math.max(0, Number(e.target.value)))}
                    className="mt-3 w-full rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm font-semibold text-foreground"
                    aria-label="Total covered area in square feet"
                  />
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                    Sheet reference: ground-floor covered area is{" "}
                    {resPlot.groundFloorAreaMin.toLocaleString()}–
                    {resPlot.groundFloorAreaMax.toLocaleString()} Sq.ft; plot area is{" "}
                    {resPlot.plotAreaMin.toLocaleString()}–{resPlot.plotAreaMax.toLocaleString()}{" "}
                    Sq.ft. Enter total covered area (Ground + First Floor + Mumty).
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className={labelCls}>Covered area / floor</p>
                      <span className="text-sm font-bold text-primary">
                        {comArea.toLocaleString()} Sq.ft
                      </span>
                    </div>
                    <input
                      type="number"
                      min={100}
                      value={comArea}
                      onChange={(e) => setComArea(Math.max(0, Number(e.target.value)))}
                      className="mt-3 w-full rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm font-semibold text-foreground"
                      aria-label="Single floor covered area in square feet"
                    />
                    <p className="mt-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                      Rate applies per single floor — total covered area = single floor area ×
                      number of floors.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p className={labelCls}>Number of floors *</p>
                      <span className="text-sm font-bold text-primary">{floors}</span>
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      required
                      value={floors}
                      onChange={(e) =>
                        setFloors(Math.min(20, Math.max(1, Number(e.target.value) || 1)))
                      }
                      className="mt-3 w-full rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm font-semibold text-foreground"
                      aria-label="Number of floors"
                    />
                  </div>
                </>
              )}

              <div>
                <p className={labelCls}>Scope of work</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {category === "residential"
                    ? RES_SCOPES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setResScopes((p) => toggle(p, s.id))}
                          className={chip(resScopes.includes(s.id))}
                        >
                          {s.label}
                        </button>
                      ))
                    : COM_SCOPES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setComScopes((p) => toggle(p, s.id))}
                          className={chip(comScopes.includes(s.id))}
                        >
                          {s.label}
                        </button>
                      ))}
                </div>
              </div>

              <div className="rounded-xl border border-primary/40 bg-primary/10 p-5">
                <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                  {plotLabel} · {category === "residential" ? "Residential" : "Commercial"}
                </p>
                <p className="mt-1 text-center text-[0.7rem] text-muted-foreground">
                  Total covered area {totalArea.toLocaleString()} Sq.ft
                  {category === "commercial"
                    ? ` (${comArea.toLocaleString()} × ${floors} floors)`
                    : ""}
                </p>

                <div className="mt-4 space-y-2">
                  {lines.length === 0 ? (
                    <p className="text-center text-xs text-muted-foreground">
                      Select at least one scope of work.
                    </p>
                  ) : (
                    lines.map((l) => (
                      <div
                        key={l.label}
                        className="flex items-baseline justify-between gap-3 text-xs"
                      >
                        <span className="text-muted-foreground">
                          {l.label}
                          <span className="ml-1 opacity-70">@ {l.rate.toLocaleString()}/Sq.ft</span>
                        </span>
                        <span className="font-semibold text-foreground">{pkr(l.amount)}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 border-t border-primary/30 pt-3 text-center">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                    Grand total
                  </p>
                  <p className="mt-1 font-display text-3xl font-extrabold text-foreground">
                    {pkr(total)}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Exact quote after free site visit.
                  </p>
                </div>
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
