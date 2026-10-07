import { identity } from "@/content/identity";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";
import { CopyButton } from "./CopyButton";

/** Email card: amber border, label row with the copy button, the address at 40px as a mailto link. */
export function EmailCard({ className }: { className?: string }) {
  return (
    <Card as="section" variant="featured" className={className}>
      <CardLabel right={<CopyButton text={identity.email} />}>{ui.labels.direct}</CardLabel>
      <h2 className="font-display text-title-md font-bold text-fg [overflow-wrap:anywhere]">
        <a href={`mailto:${identity.email}`} className="transition-colors hover:text-accent-text">
          {identity.email}
        </a>
      </h2>
    </Card>
  );
}
