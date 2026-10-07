import Image from "next/image";
import { identity } from "@/content/identity";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";

/**
 * Photo card: label, then the photo filling the rest of the card (object-fit cover,
 * 8px radius, surface-2 frame). Hidden on phones, where the hero shows a 64px photo.
 * `fill` is the one place next/image runs without explicit dimensions: the frame
 * takes the card's remaining height at >= 1024px and a 3:4 box on tablets.
 */
export function PhotoCard({ className }: { className?: string }) {
  return (
    <Card as="section" className={cn("hidden sm:flex", className)}>
      <CardLabel>{ui.labels.photo}</CardLabel>
      <div className="relative aspect-[3/4] min-h-0 flex-1 overflow-hidden rounded-[8px] bg-surface-2 lg:aspect-auto">
        <Image
          src={identity.photoPath}
          alt={identity.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-[center_30%]"
          priority
        />
      </div>
    </Card>
  );
}
