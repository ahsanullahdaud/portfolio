import Image from "next/image";
import { identity } from "@/content/identity";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/**
 * Photo card: label, then a surface-2 frame (8px radius) filling the rest of the card.
 * On laptops the frame is wide and short, so a square as tall as the frame holds the
 * photo cropped from the top: the whole head stays visible and the frame shows at the
 * sides. On tablets the frame is 3:4, the photo's own ratio, so it shows in full.
 * Hidden on phones, where the hero shows a 64px photo. `fill` is the one place
 * next/image runs without explicit dimensions, because the box is sized by the row.
 */
export function PhotoCard({ className }: { className?: string }) {
  return (
    <Card as="section" className={cn("hidden sm:flex", className)}>
      <CardLabel>{ui.labels.photo}</CardLabel>
      <div className="flex aspect-[3/4] min-h-0 flex-1 justify-center overflow-hidden rounded-[8px] bg-surface-2 lg:aspect-auto">
        <div className="relative h-full w-full lg:aspect-square lg:w-auto">
          <Image
            src={identity.photoPath}
            alt={identity.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </Card>
  );
}
