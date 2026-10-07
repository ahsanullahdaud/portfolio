"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { screenForPath, screens } from "@/content/screens";
import type { Screen } from "@/content/types";
import { isEditableTarget, keys } from "@/lib/keys";

/**
 * Global shortcuts: 1-4 jump to a screen, ArrowLeft / ArrowRight step to the previous
 * or next one without wrapping. Ignored while typing, with modifier keys, on key repeat,
 * and while the command palette (step 11) marks <html data-palette-open="true">.
 * Renders nothing.
 */
export function KeyboardNav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (isEditableTarget(event.target)) return;
      if (document.documentElement.dataset.paletteOpen === "true") return;

      const current = screenForPath(pathname);
      const index = current ? screens.indexOf(current) : -1;
      let target: Screen | undefined;

      const digit = (keys.screens as readonly string[]).indexOf(event.key);
      if (digit !== -1) {
        target = screens[digit];
      } else if (event.key === keys.prev && index > 0) {
        target = screens[index - 1];
      } else if (event.key === keys.next && index !== -1 && index < screens.length - 1) {
        target = screens[index + 1];
      }

      if (!target || target.route === pathname) return;
      event.preventDefault();
      router.push(target.route);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, router]);

  return null;
}
