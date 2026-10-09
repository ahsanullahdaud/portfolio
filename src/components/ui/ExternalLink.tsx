import type { ReactNode } from "react";
import { ui } from "@/content/ui";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Set false when the caller draws the ↗ itself (whole-card links put it in the label row). */
  arrow?: boolean;
  /** Marks a whole-card link as a card for the layout sweep. */
  "data-card"?: string;
};

/** Opens in a new tab with a trailing arrow and a screen-reader note. */
export function ExternalLink({ href, children, className, arrow = true, "data-card": dataCard }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-card={dataCard}>
      {children}
      {arrow && <span aria-hidden="true"> {ui.glyphs.newTab}</span>}
      <span className="sr-only"> {ui.a11y.opensInNewTab}</span>
    </a>
  );
}
