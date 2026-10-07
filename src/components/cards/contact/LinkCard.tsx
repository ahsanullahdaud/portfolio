import { ExternalLink } from "@/components/ui/ExternalLink";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { cardClassName } from "../Card";
import { CardLabel } from "../CardLabel";

type LinkCardProps = {
  label: string;
  title: string;
  /** Muted mono line under the title, e.g. the profile handle or the file name. */
  handle: string;
  href: string;
  /** external: new tab with the ↗ cue. download: same-tab download with the ↓ cue. */
  kind: "external" | "download";
  className?: string;
};

/** A card that is itself a link: label row with the cue glyph, title at 32px, handle in muted mono. */
export function LinkCard({ label, title, handle, href, kind, className }: LinkCardProps) {
  const classes = cardClassName("default", "between", cn("transition-colors hover:border-accent-line", className));
  const glyph = kind === "external" ? ui.glyphs.newTab : ui.glyphs.download;
  const inner = (
    <>
      <CardLabel right={<span aria-hidden="true">{glyph}</span>}>{label}</CardLabel>
      <div>
        <h2 className="font-display text-title-sm font-bold text-fg">{title}</h2>
        <p className="mt-1 font-mono text-xs text-muted [overflow-wrap:anywhere]">{handle}</p>
      </div>
    </>
  );

  if (kind === "external") {
    return (
      <ExternalLink href={href} arrow={false} className={classes}>
        {inner}
      </ExternalLink>
    );
  }
  return (
    <a href={href} download className={classes}>
      {inner}
    </a>
  );
}
