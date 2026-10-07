import Image from "next/image";
import { Cursor } from "@/components/shell/Cursor";
import { PromptLine } from "@/components/shell/PromptLine";
import { Button } from "@/components/ui/Button";
import { identity } from "@/content/identity";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";
import { Card } from "../Card";

/**
 * Index hero (design/MOCKUP_SPEC.md §4): prompt line, the name on two lines with the
 * cursor, title in amber mono, tagline, and two buttons at the bottom. On phones the
 * photo sits as a 64px square at the top right, because the Photo card is not rendered.
 */
export function HeroCard({ className }: { className?: string }) {
  const words = identity.name.split(" ");
  const firstLine = words.slice(0, -1).join(" ");
  const lastLine = words[words.length - 1];

  return (
    <Card as="section" variant="hero" className={className}>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-start justify-between gap-4">
          <PromptLine command={screen.index.command} />
          <Image
            src={identity.photoPath}
            alt={identity.name}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-[8px] object-cover object-[center_30%] sm:hidden"
          />
        </div>
        <h1 className="font-display text-name font-bold text-fg">
          {firstLine}
          <br />
          {lastLine}
          <Cursor />
        </h1>
        <p className="font-mono text-base font-medium text-accent-text">{identity.title}</p>
        <p className="max-w-prose font-display text-lead font-medium text-fg-2">
          {identity.tagline}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
        <Button variant="primary" href={screen.work.route}>
          {ui.buttons.viewWork}
        </Button>
        <Button href={identity.cvPath} download>
          {ui.buttons.downloadCv}
        </Button>
      </div>
    </Card>
  );
}
