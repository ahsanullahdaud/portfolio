import { PromptLine } from "@/components/shell/PromptLine";
import { projects } from "@/content/projects";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";
import { Card } from "../Card";

/** Work's first card: the prompt line (the screen's h1) and the project count at 64px. */
export function CountCard({ className }: { className?: string }) {
  const count = String(projects.length).padStart(2, "0");

  return (
    <Card contain={false} as="section" className={className}>
      <PromptLine as="h1" command={screen.work.command} cursor />
      <div>
        <p className="font-display text-title-xl font-bold text-fg">{count}</p>
        <p className="mt-1.5 font-mono text-xs text-muted">{ui.captions.projects}</p>
      </div>
    </Card>
  );
}
