import { Fragment } from "react";
import { contact } from "@/content/contact";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { TerminalBlock } from "../TerminalBlock";

/**
 * Looking-for card: a terminal block headed `$ ahsan --looking-for` with aligned
 * key / value rows. Keys are chrome; values are verbatim fragments of CONTENT.md, and
 * only facts CONTENT.md has are listed.
 */
export function LookingForCard({ className }: { className?: string }) {
  return (
    <Card as="section" align="start" className={className}>
      <TerminalBlock heading={ui.terminal.lookingFor} className="flex-1">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
          {contact.lookingFor.map((row) => (
            <Fragment key={row.id}>
              <dt className="text-ok">{ui.lookingFor[row.id]}</dt>
              <dd className="text-fg-2">{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      </TerminalBlock>
    </Card>
  );
}
