import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ExternalLink } from "./ExternalLink";

type ButtonProps = {
  variant?: "primary" | "secondary";
  /** Internal route, file path or external URL. Without it a <button> is rendered. */
  href?: string;
  /** Opens in a new tab via ExternalLink. */
  external?: boolean;
  /** Downloads the linked file (the CV). */
  download?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-ui px-4 font-mono text-[13px] font-medium whitespace-nowrap transition-colors sm:h-10 sm:w-auto";

const variants = {
  primary: "bg-primary text-primary-fg hover:bg-primary/85",
  secondary: "border border-line bg-surface text-fg hover:border-fg",
} as const;

/** 40px button (48px on phones), mono text. Renders a link when `href` is given. */
export function Button({
  variant = "secondary",
  href,
  external = false,
  download = false,
  onClick,
  children,
  className,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href && external) {
    return (
      <ExternalLink href={href} className={classes}>
        {children}
      </ExternalLink>
    );
  }
  if (href && download) {
    return (
      <a href={href} download className={classes}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
