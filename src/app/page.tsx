import { Card } from "@/components/cards/Card";
import { CardLabel } from "@/components/cards/CardLabel";
import { StatCard } from "@/components/cards/StatCard";
import { Cursor } from "@/components/shell/Cursor";
import { PromptLine } from "@/components/shell/PromptLine";
import { Screen } from "@/components/shell/Screen";
import { identity } from "@/content/identity";
import { screen } from "@/content/screens";
import { stats } from "@/content/stats";
import { ui } from "@/content/ui";

// Index (PLAN.md §5.1). The hero carries the prompt line and the name and the stat
// cards are final; the photo, status and featured cards are placeholders until step 7.
export default function Index() {
  const words = identity.name.split(" ");
  const firstLine = words.slice(0, -1).join(" ");
  const lastLine = words[words.length - 1];

  return (
    <Screen rows={screen.index.rows}>
      <Card as="section" variant="hero" className="sm:col-span-6 lg:col-span-6 lg:row-span-2">
        <PromptLine command={screen.index.command} />
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-[clamp(46px,5.3vw,76px)] font-bold leading-[0.98] tracking-[-0.03em] text-fg">
            {firstLine}
            <br />
            {lastLine}
            <Cursor />
          </h1>
          <p className="font-mono text-base font-medium text-accent-text">{identity.title}</p>
          <p className="max-w-prose font-display text-[clamp(17px,1.4vw,20px)] font-medium leading-snug text-fg-2">
            {identity.tagline}
          </p>
        </div>
      </Card>

      <Card className="sm:col-span-3 lg:col-span-3">
        <CardLabel>{ui.labels.photo}</CardLabel>
      </Card>

      <Card className="sm:col-span-3 lg:col-span-3">
        <CardLabel>{ui.labels.status}</CardLabel>
      </Card>

      <Card variant="featured" className="sm:col-span-6 lg:col-span-6">
        <CardLabel right={<span className="text-ok">{ui.labels.live}</span>}>
          {ui.labels.featured}
        </CardLabel>
      </Card>

      {/* Stats: 2x2 on phones, one row of four from 640px. */}
      <div className="grid grid-cols-2 gap-2.5 sm:contents">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={ui.labels.stats[stat.id]}
            stat={stat}
            className="sm:col-span-3 lg:col-span-3"
          />
        ))}
      </div>
    </Screen>
  );
}
