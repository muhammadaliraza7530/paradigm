import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LitPanel({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("lit-panel", className)}>
      <span className="corner-mark tl" />
      <span className="corner-mark tr" />
      <span className="corner-mark bl" />
      <span className="corner-mark br" />
      {children}
    </Tag>
  );
}
