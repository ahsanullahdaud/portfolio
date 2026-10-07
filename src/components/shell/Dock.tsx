import { screens } from "@/content/screens";
import { ui } from "@/content/ui";
import { DockItem } from "./DockItem";

/** Bottom dock: a centred row of four items on larger screens, one rounded bar on phones. */
export function Dock() {
  return (
    <nav aria-label={ui.dock.navLabel} className="relative flex shrink-0 items-center justify-center">
      <div className="flex w-full gap-1 rounded-card border border-line bg-surface p-1 sm:w-auto sm:gap-2 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
        {screens.map((s) => (
          <DockItem key={s.id} screen={s} />
        ))}
      </div>
      <span aria-hidden="true" className="absolute right-0 hidden font-mono text-[13px] text-muted sm:inline">
        {ui.dock.arrowsHint}
      </span>
    </nav>
  );
}
