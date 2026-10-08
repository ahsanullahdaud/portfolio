import type { Role } from "@/content/types";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";
import { Chip } from "../Chip";

type RoleCardProps = {
  role: Role;
  className?: string;
};

/**
 * Expandable role card: title, org, place, the first bullet as the summary, the stack
 * chips, and a native <details> that reveals the remaining bullets. No JavaScript;
 * the summary is keyboard-operable and all bullets stay in the HTML.
 */
export function RoleCard({ role, className }: RoleCardProps) {
  const [summary, ...rest] = role.bullets;

  return (
    <Card contain={false} id={role.id} as="article" className={className}>
      <CardLabel>{`${ui.labels.experience} · ${role.dates}`}</CardLabel>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-display text-title-24 font-bold text-fg">{role.title}</h2>
          <p className="font-sans text-sm text-fg-2">{role.org}</p>
          <p className="font-mono text-xs text-muted">{role.place}</p>
        </div>
        <p className="font-sans text-sm leading-snug text-fg-2">{summary}</p>
        <ul className="flex flex-wrap gap-1.5">
          {role.stack.map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>
        {rest.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer list-none font-mono text-xs text-accent-text hover:underline [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">{ui.details.showMore(rest.length)}</span>
              <span className="hidden group-open:inline">{ui.details.showLess}</span>
            </summary>
            <ul className="mt-3 flex flex-col gap-1.5 font-sans text-sm leading-snug text-fg-2">
              {rest.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span aria-hidden="true" className="shrink-0 text-muted">
                    -
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </Card>
  );
}
