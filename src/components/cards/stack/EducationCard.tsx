import { education } from "@/content/education";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/** Education: two entries, each a 24px degree title with the institution and dates in muted text. */
export function EducationCard({ className }: { className?: string }) {
  return (
    <Card as="section" className={className}>
      <CardLabel>{ui.labels.education}</CardLabel>
      <ul className="flex flex-col gap-4 short-list:gap-2">
        {education.map((entry) => (
          <li key={entry.degree} className="flex flex-col gap-0.5 short-list:gap-0">
            <h2 className="font-display text-title-24 font-bold text-fg short-list:text-[22px]">{entry.degree}</h2>
            <p className="font-sans text-sm text-fg-2 short-list:text-[13px]">{entry.institution}</p>
            <p className="font-mono text-xs text-muted short-list:text-[11px]">{entry.dates}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
