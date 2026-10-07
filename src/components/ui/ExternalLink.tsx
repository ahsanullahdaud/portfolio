import type { ReactNode } from "react";
import { ui } from "@/content/ui";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Opens in a new tab with a trailing arrow and a screen-reader note. */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> {ui.a11y.opensInNewTab}</span>
    </a>
  );
}
