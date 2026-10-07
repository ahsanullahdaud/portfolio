import { currentRole } from "@/content/experience";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/** Current role at a glance: title, org, dates and the stack line, with a link to the role cards below. */
export function DayJobCard({ className }: { className?: string }) {
  const role = currentRole;

  return (
    <Card as="section" className={className}>
      <CardLabel
        right={
          <a
            href={`#${role.id}`}
            className="normal-case tracking-normal text-accent-text hover:underline"
          >
            {ui.buttons.cdRoles}
          </a>
        }
      >
        {ui.labels.dayJob}
      </CardLabel>
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-title-24 font-bold text-fg">{role.title}</h2>
        <p className="font-sans text-sm text-fg-2">{role.org}</p>
        <p className="font-mono text-xs text-muted">{role.dates}</p>
        <p className="mt-1.5 font-mono text-[11px] leading-normal text-muted">{role.stack.join(", ")}</p>
      </div>
    </Card>
  );
}
