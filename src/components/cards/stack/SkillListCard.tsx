import type { SkillGroup } from "@/content/types";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";
import { ListRows } from "../ListRows";

type SkillListCardProps = {
  group: SkillGroup;
  className?: string;
};

/** One skill group: label row with the item count in amber, then the items as divided rows. */
export function SkillListCard({ group, className }: SkillListCardProps) {
  const count = String(group.items.length).padStart(2, "0");
  const rows = group.items.map((item) => ({
    name: item.name,
    note: item.learning ? ui.labels.learning : undefined,
  }));

  return (
    <Card as="section" align="start" className={className}>
      <CardLabel right={<span className="text-accent-text">{count}</span>}>{ui.labels.groups[group.id]}</CardLabel>
      <ListRows rows={rows} />
    </Card>
  );
}
