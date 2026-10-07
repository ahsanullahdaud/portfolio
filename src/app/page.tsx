import { FeaturedCard } from "@/components/cards/index/FeaturedCard";
import { HeroCard } from "@/components/cards/index/HeroCard";
import { PhotoCard } from "@/components/cards/index/PhotoCard";
import { StatusCard } from "@/components/cards/index/StatusCard";
import { StatCard } from "@/components/cards/StatCard";
import { Screen } from "@/components/shell/Screen";
import { screen } from "@/content/screens";
import { stats } from "@/content/stats";
import { ui } from "@/content/ui";

// Index (PLAN.md §5.1, design/MOCKUP_SPEC.md §4): 12 columns x 3 equal rows.
// Hero 1-6 / rows 1-2, photo 7-9, status 10-12, featured 7-12 / row 2, four stats in row 3.
// Phones: hero (with the 64px photo), status, featured, stats 2x2.
export default function Index() {
  return (
    <Screen rows={screen.index.rows}>
      <HeroCard className="sm:col-span-6 lg:col-span-6 lg:row-span-2" />
      <PhotoCard className="sm:col-span-3 lg:col-span-3" />
      <StatusCard className="sm:col-span-3 lg:col-span-3" />
      <FeaturedCard className="sm:col-span-6 lg:col-span-6" />

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
