import { CurrentlyCard } from "@/components/cards/index/CurrentlyCard";
import { FeaturedCard } from "@/components/cards/index/FeaturedCard";
import { HeroCard } from "@/components/cards/index/HeroCard";
import { StatusCard } from "@/components/cards/index/StatusCard";
import { StatCard } from "@/components/cards/StatCard";
import { Screen } from "@/components/shell/Screen";
import { screen } from "@/content/screens";
import { stats } from "@/content/stats";
import { ui } from "@/content/ui";

// Index (PLAN.md §5.1, design/MOCKUP_SPEC.md §4): 12 columns x 3 equal rows.
// Hero with the framed photo 1-6 / rows 1-2, status 7-9, currently 10-12, featured
// 7-12 / row 2, four stats in row 3. Phones: hero (64px photo), status, currently,
// featured, stats 2x2.
export default function Index() {
  return (
    <Screen rows={screen.index.rows}>
      <HeroCard className="sm:col-span-6 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1" />
      <StatusCard className="sm:col-span-3 lg:col-span-3 lg:col-start-7 lg:row-start-1" />
      <CurrentlyCard className="sm:col-span-3 lg:col-span-3 lg:col-start-10 lg:row-start-1" />
      <FeaturedCard className="sm:col-span-6 lg:col-span-6 lg:col-start-7 lg:row-start-2" />

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
