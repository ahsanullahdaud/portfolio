import { NoBreak } from "@/components/ui/NoBreak";
import { about } from "@/content/about";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/** The three selected About sentences (PLAN.md §5.2), as one paragraph. */
export function AboutCard({ className }: { className?: string }) {
  return (
    <Card contain={false} as="section" className={className}>
      <CardLabel>{ui.labels.about}</CardLabel>
      <p className="font-sans text-[15px] leading-relaxed text-fg-2">
        <NoBreak>{about.selected.join(" ")}</NoBreak>
      </p>
    </Card>
  );
}
