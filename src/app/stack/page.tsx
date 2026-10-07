import { EducationCard } from "@/components/cards/stack/EducationCard";
import { SkillListCard } from "@/components/cards/stack/SkillListCard";
import { StackSummaryCard } from "@/components/cards/stack/StackSummaryCard";
import { Screen } from "@/components/shell/Screen";
import { screen } from "@/content/screens";
import { skillGroups } from "@/content/stack";

// Stack (PLAN.md §5.3, design/MOCKUP_SPEC.md §6): 12 columns x 2 equal rows. Summary
// and education in columns 1-3; the six skill groups three per row in columns 4-12.
// DOM order follows the phone order in §5.6: summary, groups, education.
const groupPlacement = [
  "lg:col-start-4 lg:row-start-1",
  "lg:col-start-7 lg:row-start-1",
  "lg:col-start-10 lg:row-start-1",
  "lg:col-start-4 lg:row-start-2",
  "lg:col-start-7 lg:row-start-2",
  "lg:col-start-10 lg:row-start-2",
];

export default function Stack() {
  return (
    <Screen rows={screen.stack.rows}>
      <StackSummaryCard className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-1" />
      {skillGroups.map((group, i) => (
        <SkillListCard
          key={group.id}
          group={group}
          className={`sm:col-span-3 lg:col-span-3 ${groupPlacement[i] ?? ""}`}
        />
      ))}
      <EducationCard className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-2" />
    </Screen>
  );
}
