export type ScreenId = "index" | "work" | "stack" | "contact";

export type Screen = {
  id: ScreenId;
  /** Dock number and keyboard shortcut. */
  number: 1 | 2 | 3 | 4;
  route: "/" | "/work" | "/stack" | "/contact";
  /** Dock label and path-bar screen name. */
  label: string;
  /** Command shown after the prompt in the screen's first card. */
  command: string;
  /** Equal grid rows that fill the window at >= 1024px. */
  rows: 2 | 3;
};

/** CONTENT.md > Identity, verbatim. */
export type Identity = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  status: string;
  /** The sentences of `status` after the first, shown as detail lines on the status card. */
  statusDetails: readonly string[];
  statusShort: string;
  email: string;
  linkedin: string;
  github: string;
  cvPath: string;
  photoPath: string;
  siteUrl: string;
};

export type StatId = "experience" | "support" | "creatorMatch" | "tests";

/** CONTENT.md > At a glance. */
export type Stat = {
  id: StatId;
  /** The CONTENT.md line(s) this card shows, verbatim. */
  source: readonly string[];
  /** Display value: the number from `source`, abbreviated for the 56px display. */
  value: string;
  /** The rest of the line(s), verbatim; two lines are joined with " · ". */
  caption: string;
};

/** CONTENT.md > About. */
export type About = {
  paragraphs: readonly string[];
  /** The three sentences shown on the about card (PLAN.md §5.2). */
  selected: readonly string[];
};

export type RoleId = "ezsoft-2025" | "ezsoft-2021";

/** CONTENT.md > Experience. */
export type Role = {
  id: RoleId;
  title: string;
  org: string;
  dates: string;
  place: string;
  bullets: readonly string[];
  stack: readonly string[];
};

export type ProjectId = "creator-match" | "price-comparison" | "cyber-security-assessment";

/** CONTENT.md > Projects. Optional fields exist only where CONTENT.md has them. */
export type Project = {
  id: ProjectId;
  number: "01" | "02" | "03";
  name: string;
  year?: string;
  featured?: true;
  /** Kind line, e.g. "AI creator-matching tool for brands. Personal project." */
  tagline?: string;
  oneLine?: string;
  builtAiFirst?: string;
  description?: string;
  live?: string;
  code?: string;
  stack: readonly string[];
  /** Subset of `stack` shown as chips on the Index featured card. */
  featuredChips?: readonly string[];
  highlights?: readonly string[];
  note?: string;
};

export type SkillGroupId = "languages" | "frontEnd" | "backEnd" | "data" | "ai" | "tools";

export type SkillItem = { name: string; learning?: true };

/** CONTENT.md > Stack. */
export type SkillGroup = {
  id: SkillGroupId;
  name: string;
  items: readonly SkillItem[];
};

/** CONTENT.md > Education. */
export type Education = {
  degree: string;
  institution: string;
  dates: string;
};

export type LookingForId = "role" | "working" | "based" | "visa";

/** CONTENT.md > Contact, plus the looking-for rows (verbatim fragments; keys are chrome in ui.ts). */
export type Contact = {
  heading: string;
  line: string;
  lookingFor: readonly { id: LookingForId; value: string }[];
};
