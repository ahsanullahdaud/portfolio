import { Card } from "@/components/cards/Card";
import { CardLabel } from "@/components/cards/CardLabel";
import { PromptLine } from "@/components/shell/PromptLine";
import { Screen } from "@/components/shell/Screen";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";

// Contact (PLAN.md §5.4): hero in columns 1-5 across all three rows; the action cards
// in columns 6-12. Step 4: placeholders in their final positions.
export default function Contact() {
  return (
    <Screen rows={screen.contact.rows}>
      <Card as="section" variant="hero" className="sm:col-span-6 lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1">
        <PromptLine as="h1" command={screen.contact.command} cursor />
      </Card>

      <Card variant="featured" className="sm:col-span-6 lg:col-span-7 lg:col-start-6 lg:row-start-1">
        <CardLabel>{ui.labels.direct}</CardLabel>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-3 lg:col-start-6 lg:row-start-2">
        <CardLabel>{ui.labels.profile}</CardLabel>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-2 lg:col-start-9 lg:row-start-2">
        <CardLabel>{ui.labels.code}</CardLabel>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-2 lg:col-start-11 lg:row-start-2">
        <CardLabel>{ui.labels.download}</CardLabel>
      </Card>

      <Card className="sm:col-span-3 lg:col-span-4 lg:col-start-6 lg:row-start-3">
        <CardLabel className="normal-case tracking-normal">{ui.terminal.lookingFor}</CardLabel>
      </Card>

      <Card className="sm:col-span-3 lg:col-span-3 lg:col-start-10 lg:row-start-3">
        <CardLabel>{ui.labels.site}</CardLabel>
      </Card>
    </Screen>
  );
}
