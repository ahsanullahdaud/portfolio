"use client";

import { ui } from "@/content/ui";
import { PALETTE_EVENT } from "@/lib/keys";

/** Path-bar button that opens the command palette: the text hint from 640px, a `>_` glyph below. */
export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
      aria-label={ui.palette.openButton}
      aria-keyshortcuts="Control+K Meta+K /"
      className="inline-flex h-8 items-center rounded-ui border border-line bg-surface-2 px-2.5 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg"
    >
      <span className="hidden sm:inline">{ui.pathBar.paletteHint}</span>
      <span aria-hidden="true" className="sm:hidden">
        {ui.glyphs.palette}
      </span>
    </button>
  );
}
