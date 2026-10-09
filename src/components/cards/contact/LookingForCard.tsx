import { Fragment } from "react";
import { NoBreak } from "@/components/ui/NoBreak";
import { contact } from "@/content/contact";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { TerminalBlock } from "../TerminalBlock";

/**
 * Looking-for card: a terminal block headed `$ ahsan --looking-for` with aligned
 * key / value rows. Keys are chrome; values are verbatim fragments of CONTENT.md, and
 * only facts CONTENT.md has are listed. Tighter paddings and 12px text in a short row.
 */
export function LookingForCard({ className }: { className?: string }) {
  return (
    <Card as="section" align="start" className={className ? `${className} short:p-3` : "short:p-3"}>
      <TerminalBlock heading={ui.terminal.lookingFor} className="flex-1 short:gap-1 short:p-3 short:text-xs">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 short:gap-y-0.5">
          {contact.lookingFor.map((row) => (
            <Fragment key={row.id}>
              <dt className="text-ok">{ui.lookingFor[row.id]}</dt>
              <dd className="text-fg-2">
                <NoBreak>{row.value}</NoBreak>
              </dd>
            </Fragment>
          ))}
        </dl>
      </TerminalBlock>
    </Card>
  );
}
