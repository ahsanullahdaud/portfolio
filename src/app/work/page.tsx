import { Card } from "@/components/cards/Card";
import { CardLabel } from "@/components/cards/CardLabel";
import { PromptLine } from "@/components/shell/PromptLine";
import { Screen } from "@/components/shell/Screen";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";

// Work (PLAN.md §5.2). Rows 1-3 fill the window; row 4 (about and the two roles) sits
// below the fold and is reached by scrolling the grid. Step 4: placeholders in their
// final positions; DOM order follows the phone order in §5.6.
export default function Work() {
  return (
    <Screen rows={screen.work.rows} belowFold>
      <Card as="section" className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-1">
        <PromptLine as="h1" command={screen.work.command} cursor />
      </Card>

      <Card
        id="creator-match"
        variant="featured"
        className="sm:col-span-6 lg:col-span-9 lg:col-start-4 lg:row-span-2 lg:row-start-1"
      >
        <CardLabel right={<span className="text-ok">{ui.labels.live}</span>}>{ui.labels.work01}</CardLabel>
      </Card>

      <Card id="price-comparison" className="sm:col-span-3 lg:col-span-5 lg:col-start-4 lg:row-start-3">
        <CardLabel>{ui.labels.work02}</CardLabel>
      </Card>

      <Card id="cyber-security-assessment" className="sm:col-span-3 lg:col-span-4 lg:col-start-9 lg:row-start-3">
        <CardLabel>{ui.labels.work03}</CardLabel>
      </Card>

      <Card className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-2">
        <CardLabel>{ui.labels.dayJob}</CardLabel>
      </Card>

      <Card className="sm:col-span-3 lg:col-span-3 lg:col-start-1 lg:row-start-3">
        <CardLabel>{ui.labels.cv}</CardLabel>
      </Card>

      <Card className="sm:col-span-6 lg:col-span-4 lg:col-start-1 lg:row-start-4">
        <CardLabel>{ui.labels.about}</CardLabel>
      </Card>

      <Card id="ezsoft-2025" className="sm:col-span-3 lg:col-span-4 lg:col-start-5 lg:row-start-4">
        <CardLabel>{ui.labels.experience}</CardLabel>
      </Card>

      <Card id="ezsoft-2021" className="sm:col-span-3 lg:col-span-4 lg:col-start-9 lg:row-start-4">
        <CardLabel>{ui.labels.experience}</CardLabel>
      </Card>
    </Screen>
  );
}
