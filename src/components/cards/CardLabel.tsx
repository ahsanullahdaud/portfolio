import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardLabelProps = {
  children: ReactNode;
  /** Optional right-hand slot: a tag, a count or a button. */
  right?: ReactNode;
  className?: string;
};

/** 11px uppercase mono label row at the top of a card. */
export function CardLabel({ children, right, className }: CardLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted",
        className,
      )}
    >
      <span>{children}</span>
      {right !== undefined && <span>{right}</span>}
    </div>
  );
}
