import type { Screen, ScreenId } from "./types";

/** The four screens: route, dock label, number, prompt command, grid rows (PLAN.md §5). */
export const screen = {
  index: { id: "index", number: 1, route: "/", label: "index", command: "whoami", rows: 3 },
  work: { id: "work", number: 2, route: "/work", label: "work", command: "ls projects/", rows: 3 },
  stack: { id: "stack", number: 3, route: "/stack", label: "stack", command: "cat stack.json", rows: 2 },
  contact: { id: "contact", number: 4, route: "/contact", label: "contact", command: "./contact", rows: 3 },
} satisfies Record<ScreenId, Screen>;

/** Dock and keyboard order. */
export const screens: readonly Screen[] = [screen.index, screen.work, screen.stack, screen.contact];

/** The screen matching a pathname, or undefined on unknown routes such as the 404 page. */
export function screenForPath(pathname: string): Screen | undefined {
  return screens.find((s) => s.route === pathname);
}
