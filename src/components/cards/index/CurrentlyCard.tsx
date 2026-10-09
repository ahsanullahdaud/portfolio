import Link from "next/link";
import { NoBreak } from "@/components/ui/NoBreak";
import { currentRole } from "@/content/experience";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { cardClassName } from "../Card";
import { CardLabel } from "../CardLabel";

/** The current role (title, company, dates), the whole card a link to its role card on Work. */
export function CurrentlyCard({ className }: { className?: string }) {
  const role = currentRole;

  return (
    <Link
      href={`${screen.work.route}#${role.id}`}
      data-card=""
      className={cardClassName("default", "between", cn("transition-colors hover:border-accent-line", className))}
    >
      <CardLabel right={<span aria-hidden="true">{ui.glyphs.go}</span>}>{ui.labels.currently}</CardLabel>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-display text-title-24 font-bold text-fg short:text-[22px]">{role.title}</h2>
        <p className="font-sans text-sm text-fg-2 short:text-[13px]">
          <NoBreak>{role.org}</NoBreak>
        </p>
        <p className="font-mono text-xs text-muted short:text-[11px]">{role.dates}</p>
      </div>
    </Link>
  );
}
