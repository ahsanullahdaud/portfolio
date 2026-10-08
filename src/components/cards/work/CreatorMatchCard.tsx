import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { creatorMatch } from "@/content/projects";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";
import { Chip } from "../Chip";
import { TerminalBlock } from "../TerminalBlock";

/**
 * Featured project on Work (design/MOCKUP_SPEC.md §5): amber border and two inner
 * columns at >= 1024px. Left: label row with the live tag, the name at 64px on two
 * lines, the kind line, the description, the stack chips and the two buttons. Right:
 * a terminal block listing the six engineering highlights. One column on phones, with
 * the terminal block below the buttons.
 */
export function CreatorMatchCard({ className }: { className?: string }) {
  const project = creatorMatch;
  const nameLines = project.name.split(" ");

  return (
    <Card contain={false} id={project.id} as="article" variant="featured" className={className}>
      <div className="grid flex-1 gap-4 lg:grid-cols-[3fr_2fr] lg:gap-6">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <CardLabel right={<span className="text-ok">{ui.labels.live}</span>}>{ui.labels.work01}</CardLabel>
            <h2 className="font-display text-title-xl font-bold text-fg">
              {nameLines.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h2>
            {project.tagline && <p className="font-mono text-[13px] text-muted">{project.tagline}</p>}
            <p className="font-sans text-sm leading-snug text-fg-2">
              {[project.oneLine, project.builtAiFirst].filter(Boolean).join(" ")}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            {project.live && (
              <Button variant="primary" href={project.live} external>
                {ui.buttons.liveDemo}
              </Button>
            )}
            {project.code && (
              <Button href={project.code} external>
                {ui.buttons.viewCode}
              </Button>
            )}
          </div>
        </div>
        <TerminalBlock heading={ui.terminal.highlights}>
          <ul className="flex flex-col gap-1.5">
            {project.highlights?.map((line) => (
              <li key={line} className="flex gap-2">
                <span aria-hidden="true" className="shrink-0 text-ok">
                  +
                </span>
                <span className="text-fg-2">{line}</span>
              </li>
            ))}
          </ul>
        </TerminalBlock>
      </div>
    </Card>
  );
}
