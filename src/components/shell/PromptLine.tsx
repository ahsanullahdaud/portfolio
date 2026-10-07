import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Cursor } from "./Cursor";

type PromptLineProps = {
  command: string;
  /** Work, Stack and Contact use the prompt line as the screen's h1. */
  as?: "h1" | "p";
  cursor?: boolean;
  className?: string;
};

/** `~/ahsan $ command`, with the path in ok and the symbol in amber text. */
export function PromptLine({ command, as: Tag = "p", cursor = false, className }: PromptLineProps) {
  return (
    <Tag className={cn("font-mono text-sm leading-none", className)}>
      <span className="text-ok">{ui.prompt.path}</span>{" "}
      <span className="text-accent-text">{ui.prompt.symbol}</span>{" "}
      <span className="text-fg">{command}</span>
      {cursor && <Cursor />}
    </Tag>
  );
}
