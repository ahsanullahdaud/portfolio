import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "hero" | "featured";

type CardProps = {
  /** hero: 32px padding on the Index and Contact heroes. featured: amber border. */
  variant?: CardVariant;
  /** between (default): label at the top, content pushed to the bottom. start: content follows the label. */
  align?: "between" | "start";
  as?: "div" | "section" | "article";
  /** Stable hash target (PLAN.md §4). */
  id?: string;
  /** Grid placement utilities. */
  className?: string;
  children: ReactNode;
};

const base = "flex flex-col gap-3 rounded-card border bg-surface scroll-mt-3";

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
): string {
  return cn(base, variantClass[variant], alignClass[align], className);
}

/**
 * Surface card: 1px border, 10px radius. Keeps the default `min-height: auto` so a
 * grid row can never be shorter than the card's content.
 */
export function Card({
  variant = "default",
  align = "between",
  as: Tag = "div",
  id,
  className,
  children,
}: CardProps) {
  return (
    <Tag id={id} className={cardClassName(variant, align, className)}>
      {children}
    </Tag>
  );
}
