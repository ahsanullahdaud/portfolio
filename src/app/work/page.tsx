import { AboutCard } from "@/components/cards/work/AboutCard";
import { CountCard } from "@/components/cards/work/CountCard";
import { CreatorMatchCard } from "@/components/cards/work/CreatorMatchCard";
import { CvCard } from "@/components/cards/work/CvCard";
import { DayJobCard } from "@/components/cards/work/DayJobCard";
import { ProjectCard } from "@/components/cards/work/ProjectCard";
import { RoleCard } from "@/components/cards/work/RoleCard";
import { Screen } from "@/components/shell/Screen";
import { roles } from "@/content/experience";
import { cyberSecurity, priceComparison } from "@/content/projects";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";

// Work (PLAN.md §5.2, design/MOCKUP_SPEC.md §5): 12 columns x 3 rows that fill the
// window, then row 4 (about and the two roles) below the fold, reached by scrolling the
// grid while the bars stay fixed. DOM order follows the phone order in §5.6.
export default function Work() {
  return (
    <Screen rows={screen.work.rows} belowFold>
      <CountCard className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-1" />
      <CreatorMatchCard className="sm:col-span-6 lg:col-span-9 lg:col-start-4 lg:row-span-2 lg:row-start-1" />
      <ProjectCard
        project={priceComparison}
        label={ui.labels.work02}
        titleSize="28"
        className="sm:col-span-3 lg:col-span-5 lg:col-start-4 lg:row-start-3"
      />
      <ProjectCard
        project={cyberSecurity}
        label={ui.labels.work03}
        titleSize="24"
        className="sm:col-span-3 lg:col-span-4 lg:col-start-9 lg:row-start-3"
      />
      <DayJobCard className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-2" />
      <CvCard className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-3" />
      <AboutCard className="sm:col-span-6 lg:col-span-4 lg:col-start-1 lg:row-start-4" />
      {roles.map((role, i) => (
        <RoleCard
          key={role.id}
          role={role}
          className={`sm:col-span-3 lg:col-span-4 lg:row-start-4 ${i === 0 ? "lg:col-start-5" : "lg:col-start-9"}`}
        />
      ))}
    </Screen>
  );
}
