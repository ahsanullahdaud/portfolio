import Image from "next/image";
import { Cursor } from "@/components/shell/Cursor";
import { PromptLine } from "@/components/shell/PromptLine";
import { Button } from "@/components/ui/Button";
import { NoBreak } from "@/components/ui/NoBreak";
import { identity } from "@/content/identity";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";
import { Card } from "../Card";

/**
 * Index hero. Prompt line; the name on two lines with the cursor, the title and the
 * tagline; and from 640px a framed photo beside them (surface-2, 1px line, card radius,
 * 4:5, width `--photo-w` = clamp(140px, 23.5vh, 230px), so at most 230×288). The frame
 * and the text block share one grid row and the same `--hero-gap` top margin (32px at
 * 900px tall, 10px at 700px): the block stretches to the frame's height with the name at
 * the top and the tagline at the bottom, so the frame's edges align with the top of the
 * name and the bottom of the tagline. The caption sits in the row below the frame, and
 * the two buttons on their own row. In a short hero the frame narrows to 22.5vh and the
 * gaps tighten. The name is capped by `--name-fit` so its
 * first line never wraps in the narrower column. On phones the photo is a 64px square at
 * the top right. The cutout is `object-contain` anchored to the bottom of its frame, so
 * the head is never cut.
 */
export function HeroCard({ className }: { className?: string }) {
  const words = identity.name.split(" ");
  const firstLine = words.slice(0, -1).join(" ");
  const lastLine = words[words.length - 1];
  const alt = `${ui.a11y.portraitOf} ${identity.name}`;

  return (
    <Card as="section" variant="hero" className={className}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 gap-y-0 sm:grid-cols-[minmax(0,1fr)_var(--photo-w)] sm:gap-x-6 short-hero:[--photo-w:22.5vh]">
        <PromptLine command={screen.index.command} className="col-start-1 row-start-1 self-center" />

        {/* Phones: 64px photo at the top right. */}
        <figure className="relative col-start-2 row-start-1 size-16 justify-self-end overflow-hidden rounded-[8px] border border-line bg-surface-2 sm:hidden">
          <Image src={ui.assets.photoCutout} alt={alt} fill sizes="64px" className="object-contain object-bottom" priority />
        </figure>

        <div className="col-span-2 row-start-2 mt-3 flex flex-col justify-between gap-1.5 sm:col-span-1 sm:col-start-1 sm:mt-[var(--hero-gap)] short-hero:gap-1">
          <div className="flex flex-col gap-1.5 short-hero:gap-1">
            <h1 className="font-display text-name font-bold text-fg sm:text-[min(var(--text-name),var(--name-fit))]">
              {firstLine}
              <br />
              {lastLine}
              <Cursor />
            </h1>
            <p className="font-mono text-base font-medium text-accent-text">
              <NoBreak>{identity.title}</NoBreak>
            </p>
          </div>
          <p className="max-w-prose font-display text-lead font-medium text-fg-2">
            <NoBreak>{identity.tagline}</NoBreak>
          </p>
        </div>

        {/* From 640px: the framed photo in the name's row, its caption in the row below. */}
        <figure className="hidden sm:contents">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-line bg-surface-2 sm:col-start-2 sm:row-start-2 sm:mt-[var(--hero-gap)]">
            <Image
              src={ui.assets.photoCutout}
              alt={alt}
              fill
              sizes="(min-width: 640px) 230px, 64px"
              className="object-contain object-bottom"
              priority
            />
          </div>
          <figcaption className="mt-1.5 font-mono text-[11px] leading-tight text-muted sm:col-start-2 sm:row-start-3 short-hero:mt-0.5 short-hero:text-[10px]">
            {ui.labels.photo}
          </figcaption>
        </figure>
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
