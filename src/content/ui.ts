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
  buttons: {
    viewWork: "./view-work",
    downloadCv: "download cv.pdf",
    liveDemo: "live demo",
    code: "code",
    viewCode: "view code",
    copy: "copy",
    copied: "copied",
    cdRoles: "cd roles ↓",
  },
  details: {
    showMore: (count: number) => `show ${count} more`,
    showLess: "show less",
  },
  captions: {
    projects: "projects",
    /** Update when the CV changes. */
    cvYear: "2026 CV",
    categories: "categories",
  },
  /** Labels of the two stack lines on the Stack summary card. */
  summary: {
    commercial: "commercial",
    projects: "projects",
  },
  /** Titles of the Contact action cards; the service names appear in CONTENT.md's Contact actions. */
  contactCards: {
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "CV",
  },
  glyphs: {
    newTab: "↗",
    download: "↓",
    /** Palette button on phones, where the text hint is hidden. */
    palette: ">_",
  },
  palette: {
    title: "command palette",
    openButton: "open command palette",
    placeholder: "type a command…",
    empty: "no matches",
    close: "close command palette",
    closeHint: "esc",
    footer: "↑ ↓ move · enter run · esc close",
    groups: {
      screens: "screens",
      projects: "projects",
      links: "links",
      actions: "actions",
    },
    items: {
      email: "email",
      toggleTheme: "toggle theme",
    },
  },
  /** The "this site" card: facts about this site itself. */
  site: {
    lines: ["built with Claude Code", "Next.js, TypeScript, Tailwind CSS", "hosted on Vercel"],
    copyright: (year: number, name: string) => `© ${year} ${name}`,
  },
  a11y: {
    opensInNewTab: "(opens in new tab)",
  },
  /** Document titles: "<page> — <name>"; the root is "<name> — <title>". */
  meta: {
    separator: " — ",
    pages: {
      work: "Work",
      stack: "Stack",
      contact: "Contact",
      notFound: "Not found",
    },
  },
  notFound: {
    command: "cd",
    message: "cd: no such file or directory",
    back: "back to ~",
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
    privateClient: "private client",
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
    learning: "learning",
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
  /** Keys of the looking-for rows; values come from contact.ts. */
  lookingFor: {
    role: "role",
    working: "working",
    based: "based",
    visa: "visa",
  },
} as const;
