import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "hero" | "featured";

type CardProps = {
  /** hero: 32px padding on the Index and Contact heroes. featured: amber border. */
  variant?: CardVariant;
  /** between (default): label at the top, content pushed to the bottom. start: content follows the label. */
  align?: "between" | "start";
  /**
   * true (default): the card never grows its grid row (min-height 0, size container at
   * >= 1024px) and can use the `short` / `short-list` variants. false: Work only, where
   * rows below the fold are allowed to grow with their content.
   */
  contain?: boolean;
  as?: "div" | "section" | "article";
  /** Stable hash target (PLAN.md §4). */
  id?: string;
  /** Grid placement utilities. */
  className?: string;
  children: ReactNode;
};

const base = "flex flex-col gap-3 rounded-card border bg-surface scroll-mt-3";

const containClass = "min-h-0 lg:[container-name:card] lg:[container-type:size]";

const variantClass = {
  default: "border-line p-5",
  hero: "border-line p-6 sm:p-8",
  featured: "border-accent-line p-5",
} as const;

const alignClass = {
  between: "justify-between",
  start: "justify-start",
} as const;

/** The card's classes, for elements that must be the card themselves (LinkCard renders an <a>). */
export function cardClassName(
  variant: CardVariant = "default",
  align: "between" | "start" = "between",
  className?: string,
  contain = true,
): string {
  return cn(base, contain && containClass, variantClass[variant], alignClass[align], className);
}

/** Surface card: 1px border, 10px radius. */
export function Card({
  variant = "default",
  align = "between",
  contain = true,
  as: Tag = "div",
  id,
  className,
  children,
}: CardProps) {
  return (
    <Tag id={id} data-card="" className={cardClassName(variant, align, className, contain)}>
      {children}
    </Tag>
  );
}
