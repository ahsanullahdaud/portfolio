import { identity } from "@/content/identity";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/** "This site": three lines about the site itself and the copyright line. */
export function SiteCard({ className }: { className?: string }) {
  return (
    <Card as="section" className={className}>
      <CardLabel>{ui.labels.site}</CardLabel>
      <div className="flex flex-col gap-2 short:gap-1">
        <ul className="flex flex-col gap-0.5 font-mono text-xs text-fg-2 short:gap-0 short:text-[11px]">
          {ui.site.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="font-mono text-[11px] text-muted short:text-[10px]">
          {ui.site.copyright(new Date().getFullYear(), identity.name)}
        </p>
      </div>
    </Card>
  );
}
