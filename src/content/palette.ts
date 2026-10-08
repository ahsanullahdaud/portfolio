import { identity } from "./identity";
import { creatorMatch, projects } from "./projects";
import { screens } from "./screens";
import { ui } from "./ui";

export type PaletteGroup = "screens" | "projects" | "links" | "actions";

export type PaletteAction =
  | { type: "route"; href: string }
  | { type: "external"; href: string }
  | { type: "mailto"; href: string }
  | { type: "download"; href: string }
  | { type: "theme" };

export type PaletteItem = {
  id: string;
  group: PaletteGroup;
  label: string;
  /** Muted text at the right of the row, e.g. the screen number or a year. */
  hint?: string;
  /** Search aliases, never displayed. */
  keywords: readonly string[];
  action: PaletteAction;
};

export const paletteGroups: readonly PaletteGroup[] = ["screens", "projects", "links", "actions"];

const words = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^a-z0-9.+#]+/)
    .filter(Boolean);

// Search aliases for the screens (chrome; never displayed).
const screenAliases: Record<string, readonly string[]> = {
  index: ["home", "start"],
  work: ["projects", "experience", "roles", "jobs"],
  stack: ["skills", "languages", "tools", "education"],
  contact: ["email", "links", "hire", "cv"],
};

function buildItems(): PaletteItem[] {
  const items: PaletteItem[] = [];

  for (const s of screens) {
    items.push({
      id: `screen-${s.id}`,
      group: "screens",
      label: s.label,
      hint: String(s.number),
      keywords: [s.command, ...(screenAliases[s.id] ?? [])],
      action: { type: "route", href: s.route },
    });
  }

  for (const p of projects) {
    items.push({
      id: `project-${p.id}`,
      group: "projects",
      label: p.name,
      hint: p.year,
      keywords: [p.number, ...words(p.stack.join(" ")), ...words(p.tagline ?? ""), ...words(p.description ?? "")],
      action: { type: "route", href: `/work#${p.id}` },
    });
  }

  if (creatorMatch.live) {
    items.push({
      id: "project-creator-match-live",
      group: "projects",
      label: `${creatorMatch.name} → ${ui.buttons.liveDemo}`,
      keywords: ["demo", "live", "app", "try"],
      action: { type: "external", href: creatorMatch.live },
    });
  }
  if (creatorMatch.code) {
    items.push({
      id: "project-creator-match-code",
      group: "projects",
      label: `${creatorMatch.name} → ${ui.buttons.code}`,
      keywords: ["github", "repo", "source", "code"],
      action: { type: "external", href: creatorMatch.code },
    });
  }

  items.push(
    {
      id: "link-email",
      group: "links",
      label: ui.palette.items.email,
      hint: identity.email,
      keywords: ["mail", "contact", "message", identity.email],
      action: { type: "mailto", href: `mailto:${identity.email}` },
    },
    {
      id: "link-linkedin",
      group: "links",
      label: ui.contactCards.linkedin,
      keywords: ["profile", "social", "network"],
      action: { type: "external", href: identity.linkedin },
    },
    {
      id: "link-github",
      group: "links",
      label: ui.contactCards.github,
      keywords: ["code", "repos", "source"],
      action: { type: "external", href: identity.github },
    },
    {
      id: "link-cv",
      group: "links",
      label: ui.buttons.downloadCv,
      keywords: ["resume", "cv", "pdf", "curriculum vitae", "download"],
      action: { type: "download", href: identity.cvPath },
    },
    {
      id: "action-theme",
      group: "actions",
      label: ui.palette.items.toggleTheme,
      keywords: ["dark", "light", "mode", "appearance", "colour", "color"],
      action: { type: "theme" },
    },
  );

  return items;
}

export const paletteItems: readonly PaletteItem[] = buildItems();

/** Case-insensitive substring match over label, hint and keywords. Empty query returns everything. */
export function filterItems(query: string): PaletteItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...paletteItems];
  return paletteItems.filter((item) =>
    [item.label, item.hint ?? "", ...item.keywords].some((text) => text.toLowerCase().includes(q)),
  );
}
