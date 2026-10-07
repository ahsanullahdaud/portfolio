// Keyboard map (CLAUDE.md, PLAN.md §4). KeyboardNav and the command palette read from here.
export const keys = {
  /** Digits 1-4 jump to the screen with that number. */
  screens: ["1", "2", "3", "4"],
  prev: "ArrowLeft",
  next: "ArrowRight",
  /** With Ctrl or Meta. */
  palette: "k",
  paletteAlt: "/",
  close: "Escape",
} as const;

/** True when a key press would interrupt typing: inputs, textareas, selects, contenteditable. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}
