import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless, GPU-smooth auto-scrolling marquee.
 * Moves continuously at a constant speed and can be dragged / swiped with a finger.
 */
export function Marquee({
  items,
  speed = 70,
  className,
  trackClassName,
}: {
  items: ReactNode[];
  speed?: number;
  className?: string;
  trackClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef(0);
  const half = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = 0;

    const measure = () => {
      half.current = track.scrollWidth / 2;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const step = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;

      if (!dragging.current) offset.current -= speed * dt;

      if (half.current > 0) {
        while (offset.current <= -half.current) offset.current += half.current;
        while (offset.current > 0) offset.current -= half.current;
      }

      track.style.transform = `translate3d(${offset.current}px, 0, 0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    startX.current = e.clientX;
    startOffset.current = offset.current;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    offset.current = startOffset.current + (e.clientX - startX.current);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden [cursor:grab] active:[cursor:grabbing]", className)}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div
        ref={trackRef}
        className={cn("flex w-max select-none gap-5 will-change-transform", trackClassName)}
      >
        {items.map((node, i) => (
          <div key={`a-${i}`} className="flex shrink-0">
            {node}
          </div>
        ))}
        {items.map((node, i) => (
          <div key={`b-${i}`} aria-hidden className="flex shrink-0">
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}
