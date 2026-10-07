import { Fragment } from "react";
import { PromptLine } from "@/components/shell/PromptLine";
import { contact } from "@/content/contact";
import { identity } from "@/content/identity";
import { screen } from "@/content/screens";
import { Card } from "../Card";

/**
 * Contact hero (design/MOCKUP_SPEC.md §7): prompt line as the screen's h1, the heading
 * at 120px on two lines with its full stop in amber, the sub-line, and at the bottom
 * the ok dot with the short status.
 */
export function ContactHeroCard({ className }: { className?: string }) {
  const words = contact.heading.split(" ");

  return (
    <Card as="section" variant="hero" className={className}>
      <PromptLine as="h1" command={screen.contact.command} cursor />
      <div className="flex flex-col gap-4 sm:gap-5">
        <h2 className="font-display text-talk font-bold text-fg">
          {words.map((word, i) => {
            const stop = word.endsWith(".");
            const text = stop ? word.slice(0, -1) : word;
            return (
              <Fragment key={word}>
                {i > 0 && <br />}
                {text}
                {stop && <span className="text-accent-text">.</span>}
              </Fragment>
            );
          })}
        </h2>
        <p className="max-w-prose font-display text-lead font-medium text-fg-2">{contact.line}</p>
      </div>
      <p className="flex items-center gap-2.5 font-mono text-sm text-fg">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-ok" />
        {identity.statusShort}
      </p>
    </Card>
  );
}
