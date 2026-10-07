import { ui } from "@/content/ui";
import { ScreenName } from "./ScreenName";
import { ThemeToggle } from "./ThemeToggle";

/** Top bar: amber dot, base path, current screen name, theme toggle. The palette hint arrives in step 11. */
export function PathBar() {
  return (
    <header className="flex h-11 shrink-0 items-center justify-between gap-4 rounded-card border border-line bg-surface px-4 font-mono text-sm">
      <div className="flex min-w-0 items-center gap-2.5">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-accent-line" />
        <span className="truncate text-muted">{ui.pathBar.base}</span>
        <ScreenName />
      </div>
      <ThemeToggle />
    </header>
  );
}
