"use client";

import { useScreen } from "./useScreen";

/** The current screen's name in the path bar. Client-only because it depends on the URL. */
export function ScreenName() {
  const screen = useScreen();
  return <span className="text-fg">{screen?.label ?? ""}</span>;
}
