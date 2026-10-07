import { Card } from "@/components/cards/Card";
import { CardLabel } from "@/components/cards/CardLabel";
import { PromptLine } from "@/components/shell/PromptLine";
import { Screen } from "@/components/shell/Screen";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";

// Stack (PLAN.md §5.3): two equal rows. Summary and education in columns 1-3, six
// skill groups in columns 4-12. Step 4: placeholders in their final positions.
export default function Stack() {
  const g = ui.labels.groups;
  const groups = [
    { label: g.languages, className: "lg:col-start-4 lg:row-start-1" },
    { label: g.frontEnd, className: "lg:col-start-7 lg:row-start-1" },
    { label: g.backEnd, className: "lg:col-start-10 lg:row-start-1" },
    { label: g.data, className: "lg:col-start-4 lg:row-start-2" },
    { label: g.ai, className: "lg:col-start-7 lg:row-start-2" },
    { label: g.tools, className: "lg:col-start-10 lg:row-start-2" },
  ];

  return (
    <Screen rows={screen.stack.rows}>
      <Card as="section" className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-1">
        <PromptLine as="h1" command={screen.stack.command} cursor />
      </Card>

      {groups.map(({ label, className }) => (
        <Card key={label} className={`sm:col-span-3 lg:col-span-3 ${className}`}>
          <CardLabel>{label}</CardLabel>
        </Card>
      ))}

      <Card className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-2">
        <CardLabel>{ui.labels.education}</CardLabel>
      </Card>
    </Screen>
  );
}
