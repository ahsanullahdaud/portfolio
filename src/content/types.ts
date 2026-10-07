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

/** The Identity section of CONTENT.md, verbatim. */
export type Identity = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  status: string;
  statusShort: string;
  email: string;
  linkedin: string;
  github: string;
  cvPath: string;
  photoPath: string;
  siteUrl: string;
};
