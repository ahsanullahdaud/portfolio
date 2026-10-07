import { PromptLine } from "@/components/shell/PromptLine";
import { currentRole } from "@/content/experience";
import { creatorMatch } from "@/content/projects";
import { screen } from "@/content/screens";
import { skillGroups } from "@/content/stack";
import { ui } from "@/content/ui";
import { Card } from "../Card";

/**
 * Stack's first card: the prompt line (the screen's h1), the number of categories at
 * 64px, and two labelled lines: the commercial stack (the current role's Stack line)
 * and the project stack (Creator Match's).
 */
export function StackSummaryCard({ className }: { className?: string }) {
  const lines = [
    { label: ui.summary.commercial, value: currentRole.stack.join(", ") },
    { label: ui.summary.projects, value: creatorMatch.stack.join(", ") },
  ];

  return (
    <Card as="section" className={className}>
      <PromptLine as="h1" command={screen.stack.command} cursor />
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-display text-title-xl font-bold text-fg">{skillGroups.length}</p>
          <p className="mt-1.5 font-mono text-xs text-muted">{ui.captions.categories}</p>
        </div>
        <dl className="flex flex-col gap-2 font-mono text-xs leading-snug">
          {lines.map((line) => (
            <div key={line.label}>
              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">{line.label}</dt>
              <dd className="mt-0.5 text-fg-2">{line.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
