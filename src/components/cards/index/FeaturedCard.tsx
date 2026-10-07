import { Button } from "@/components/ui/Button";
import { creatorMatch } from "@/content/projects";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";
import { Chip } from "../Chip";

/**
 * Featured project on Index: amber border, label row with the live tag, the title at
 * 40px, the one-line description, then chips on the left and the two buttons on the
 * right. The bottom row wraps when the card is too narrow for both, with the buttons
 * staying right-aligned; on phones the buttons are a full-width pair.
 */
export function FeaturedCard({ className }: { className?: string }) {
  const project = creatorMatch;

  return (
    <Card as="section" variant="featured" className={className}>
      <CardLabel right={<span className="text-ok">{ui.labels.live}</span>}>{ui.labels.featured}</CardLabel>
      <div className="flex flex-col gap-2.5">
        <h2 className="font-display text-[clamp(24px,2.8vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
          {project.name}
        </h2>
        <p className="font-sans text-[15px] leading-normal text-fg-2">{project.oneLine}</p>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <ul className="flex flex-wrap gap-1.5">
            {project.featuredChips?.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
          <div className="grid w-full grid-cols-2 gap-2 sm:ml-auto sm:flex sm:w-auto">
            {project.live && (
              <Button variant="primary" href={project.live} external>
                {ui.buttons.liveDemo}
              </Button>
            )}
            {project.code && (
              <Button href={project.code} external>
                {ui.buttons.code}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
