"use client";

import Link from "next/link";
import type { Screen } from "@/content/types";
import { cn } from "@/lib/cn";
import { useScreen } from "./useScreen";

/** One dock entry. Client-only so it can mark the active screen from the URL. */
export function DockItem({ screen }: { screen: Screen }) {
  const active = useScreen()?.id === screen.id;

  return (
    <Link
      href={screen.route}
      aria-current={active ? "page" : undefined}
      aria-keyshortcuts={String(screen.number)}
      className={cn(
        "flex h-11 flex-1 items-center justify-center gap-2 rounded-dock font-mono text-[13px] transition-colors sm:flex-none sm:border sm:px-3.5",
        active
          ? "bg-primary font-semibold text-primary-fg sm:border-primary"
          : "text-fg hover:bg-surface-2 sm:border-line sm:bg-surface",
      )}
    >
      <span aria-hidden="true" className={cn("hidden sm:inline", !active && "text-muted")}>
        {screen.number}
      </span>
      {screen.label}
    </Link>
  );
}
