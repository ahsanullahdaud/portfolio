// UI chrome: every visible string that is not content from CONTENT.md (PLAN.md §2).
// Prompt commands live with their screens in screens.ts.
export const ui = {
  prompt: { path: "~/ahsan", symbol: "$" },
  pathBar: {
    base: "~/ahsan/portfolio",
    /** Shown from step 11, when the command palette exists. */
    paletteHint: "press [Ctrl K] for commands",
  },
  dock: {
    navLabel: "Screens",
    arrowsHint: "← →",
  },
  labels: {
    photo: "photo.jpg",
    status: "status",
    featured: "featured project",
    live: "live",
    stats: {
      experience: "experience",
      support: "support",
      creatorMatch: "creator match",
      tests: "tests",
    },
    dayJob: "day job",
    cv: "curriculum vitae",
    work01: "work / 01 · 2026",
    work02: "work / 02 · client project",
    work03: "work / 03 · 2024, MSc",
    about: "about",
    experience: "experience",
    education: "education",
    groups: {
      languages: "languages",
      frontEnd: "front end",
      backEnd: "back end",
      data: "data",
      ai: "ai",
      tools: "tools",
    },
    direct: "direct",
    profile: "01 / profile",
    code: "02 / code",
    download: "03 / download",
    site: "this site",
  },
  terminal: {
    highlights: "$ cat highlights.md",
    lookingFor: "$ ahsan --looking-for",
  },
} as const;
