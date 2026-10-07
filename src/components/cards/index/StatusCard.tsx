import { identity } from "@/content/identity";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/** Status card: ok dot + the short status at 30px display, then three muted detail lines. */
export function StatusCard({ className }: { className?: string }) {
  return (
    <Card as="section" className={className}>
      <CardLabel>{ui.labels.status}</CardLabel>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2.5 font-display text-[clamp(22px,2.1vw,30px)] font-bold leading-[1.1] tracking-[-0.01em] text-fg">
          <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-ok" />
          {identity.statusShort}
        </h2>
        <ul className="flex flex-col gap-0.5 font-mono text-xs leading-snug text-muted">
          <li>{identity.location}</li>
          {identity.statusDetails.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
