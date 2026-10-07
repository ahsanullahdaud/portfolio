import type { ReactNode } from "react";
import { ui } from "@/content/ui";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Set false when the caller draws the ↗ itself (whole-card links put it in the label row). */
  arrow?: boolean;
};

/** Opens in a new tab with a trailing arrow and a screen-reader note. */
export function ExternalLink({ href, children, className, arrow = true }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {arrow && <span aria-hidden="true"> {ui.glyphs.newTab}</span>}
      <span className="sr-only"> {ui.a11y.opensInNewTab}</span>
    </a>
  );
}
