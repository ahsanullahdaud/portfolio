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
        <p className="font-display text-[clamp(36px,3.9vw,56px)] font-bold leading-none tracking-[-0.02em] text-fg">
          {stat.value}
        </p>
        <p className="mt-2 font-mono text-xs leading-snug text-muted">{stat.caption}</p>
      </div>
    </Card>
  );
}
