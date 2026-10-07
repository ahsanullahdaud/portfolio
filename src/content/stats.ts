import type { Stat } from "./types";

// CONTENT.md > At a glance. `source` is verbatim. The 4-hour line shares the 10+ card
// (design/MOCKUP_SPEC.md §4). Labels are chrome in ui.ts.
export const stats: readonly Stat[] = [
  {
    id: "experience",
    source: ["3 years of commercial experience"],
    value: "3 yrs",
    caption: "commercial experience",
  },
  {
    id: "support",
    source: ["10+ out-of-hours production incidents resolved", "4-hour support response target"],
    value: "10+",
    caption: "out-of-hours production incidents resolved · 4-hour support response target",
  },
  {
    id: "creatorMatch",
    source: ["About 8 hours from plan to live product on Creator Match"],
    value: "~8 h",
    caption: "from plan to live product on Creator Match",
  },
  {
    id: "tests",
    source: ["158 automated tests on Creator Match"],
    value: "158",
    caption: "automated tests on Creator Match",
  },
];
