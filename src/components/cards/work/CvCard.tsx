import { Button } from "@/components/ui/Button";
import { identity } from "@/content/identity";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/** CV card: the year at 44px and the download button. */
export function CvCard({ className }: { className?: string }) {
  return (
    <Card contain={false} as="section" className={className}>
      <CardLabel>{ui.labels.cv}</CardLabel>
      <div className="flex flex-col gap-3">
        <p className="font-display text-title-lg font-bold text-fg">{ui.captions.cvYear}</p>
        <Button href={identity.cvPath} download className="self-start">
          {ui.buttons.downloadCv}
        </Button>
      </div>
    </Card>
  );
}
