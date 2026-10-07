import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  /** For chrome chips such as "private client". */
  muted?: boolean;
  className?: string;
};

/** 11px mono tag on a surface-2 pill with a line border. */
export function Chip({ children, muted = false, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-ui border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-medium leading-none whitespace-nowrap",
        muted ? "text-muted" : "text-fg-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
