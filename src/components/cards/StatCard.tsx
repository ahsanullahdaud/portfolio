import { NoBreak } from "@/components/ui/NoBreak";
import type { Stat } from "@/content/types";
import { Card } from "./Card";
import { CardLabel } from "./CardLabel";

type StatCardProps = {
  label: string;
  stat: Stat;
  className?: string;
};

/** Label at the top, 56px display number, one muted caption line. */
export function StatCard({ label, stat, className }: StatCardProps) {
  return (
    <Card as="section" className={className}>
      <CardLabel>{label}</CardLabel>
      <div>
        <p className="font-display text-stat font-bold text-fg">
          {stat.value}
        </p>
        <p className="mt-1.5 font-mono text-xs leading-snug text-muted short:mt-1 short:text-[11px]">
          <NoBreak>{stat.caption}</NoBreak>
        </p>
      </div>
    </Card>
  );
}
