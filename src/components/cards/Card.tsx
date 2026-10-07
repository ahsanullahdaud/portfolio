import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  /** hero: 32px padding on the Index and Contact heroes. featured: amber border. */
  variant?: "default" | "hero" | "featured";
  as?: "div" | "section" | "article";
  /** Stable hash target (PLAN.md §4). */
  id?: string;
  /** Grid placement utilities. */
  className?: string;
  children: ReactNode;
};

const variantClass = {
  default: "border-line p-5",
  hero: "border-line p-6 sm:p-8",
  featured: "border-accent-line p-5",
} as const;

/** Surface card: 1px border, 10px radius, label at the top and content pushed to the bottom. */
export function Card({ variant = "default", as: Tag = "div", id, className, children }: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "flex min-h-0 flex-col justify-between gap-4 rounded-card border bg-surface scroll-mt-3",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
