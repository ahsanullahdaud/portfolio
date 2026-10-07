import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ScreenProps = {
  /** Equal rows that fill the window at >= 1024px. */
  rows: 2 | 3;
  /** Work only: fixed-height rows so extra rows sit below the fold and the grid scrolls. */
  belowFold?: boolean;
  children: ReactNode;
};

const rowsClass = {
  2: "lg:h-full lg:grid-rows-[repeat(2,minmax(0,1fr))]",
  3: "lg:h-full lg:grid-rows-[repeat(3,minmax(0,1fr))]",
  belowFold: "lg:grid-rows-[repeat(3,var(--row-3))]",
} as const;

/** The card grid: one column on phones, 6 on tablets, 12 with window-filling rows on laptops. */
export function Screen({ rows, belowFold = false, children }: ScreenProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2.5 sm:grid-cols-6 sm:gap-3 lg:grid-cols-12",
        belowFold ? rowsClass.belowFold : rowsClass[rows],
      )}
    >
      {children}
    </div>
  );
}
