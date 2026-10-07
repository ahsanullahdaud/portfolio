import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TerminalBlockProps = {
  /** The `$ …` line at the top, e.g. "$ cat highlights.md". */
  heading: string;
  children: ReactNode;
  className?: string;
};

/** Inset surface-2 block styled like a terminal pane. */
export function TerminalBlock({ heading, children, className }: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-dock border border-line bg-surface-2 p-4 font-mono text-[13px] leading-relaxed",
        className,
      )}
    >
      <p className="text-muted">{heading}</p>
      {children}
    </div>
  );
}
