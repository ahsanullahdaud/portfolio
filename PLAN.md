# PLAN.md — Portfolio build plan

Owner: Ahsan Ullah Daud. Written 2026-10-07, revised the same day against the approved mockups. Companion: `CLAUDE.md` (conventions and commands).
Content source: `CONTENT.md`. Design source: `design/MOCKUP_SPEC.md`.

## 1. Decisions locked in

| Topic | Decision |
|---|---|
| Stack | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS 4. Public GitHub repo `ahsanullahdaud/portfolio`, Vercel Hobby plan, auto-deploy on push to `main`. |
| Extra dependencies | `next-themes` only (persisted theme with no flash). Everything else is hand-written. |
| Backend / data / keys / analytics | None. Every route builds as a static page. |
| Screens and URLs | Index `/`, Work `/work`, Stack `/stack`, Contact `/contact`. |
| Mockups | `design/MOCKUP_SPEC.md` wins on layout, sizes and colours (sections 3, 5 and 8 follow it). This plan wins on content rules, components, keyboard map, accessibility and build order. |
| Accent | Amber `#F2B544` as a fill in both themes. As text it is `#F2B544` in dark and `#8A5200` in light; amber is never text on white. Borders, the path-bar dot and the cursor use `--accent-line`: `#F2B544` dark, `#B87A00` light. `ok` teal is a status colour used in three places, not a second accent. |
| Fonts (next/font/google, self-hosted at build, no runtime requests) | **IBM Plex Mono** for labels, prompts, the path bar, dock, chips, buttons and code. **Space Grotesk 700** for display text: the name, project titles, stat numbers, "Let's talk.". **IBM Plex Sans** for paragraphs and bullet text. |
| Prompt string | `~/ahsan $`, with `~/ahsan` in `ok` and `$` in amber. It sits inside the first card of each screen, not above the grid. |
| Reference site (mikelmrad.dev) | Structure only: four keyboard-switchable screens. Not used: its fonts (JetBrains Mono, Barlow Condensed), its monochrome `#0a0a0a` / `#f3f3f1` palette, its drag/fling gestures, and its wording ("INDEX (press 1)", "DRAG · FLING · 1—4 · ← → · ESC"). |
| Experience and education placement | Work = three projects, the about strip, then the two EZsoft roles as expandable cards below the fold. Stack = summary, six skill-group lists and education. |
| Index | Hero with the name at 76px, photo card, status card, the featured Creator Match card with **live demo** and **code** buttons, and four stats. About is not on Index (the mockup has no room for it); it moves to Work. |
| Overflow | Path bar and dock stay fixed. Index, Stack and Contact fill the window. Work's first three rows fill the window and the about strip and role cards sit below, reached by scrolling the grid inside the screen. |

## 2. Content rules

- `CONTENT.md` is the only source of text. Every visible string is either copied verbatim from it or is UI chrome.
- UI chrome = prompt commands, dock and path-bar text, card labels, button labels (`./view-work`, `download cv.pdf`, `live demo`, `code`, `view code`, `copy`, `cd roles`), count and year captions (`03`, `projects`, `2026 CV`, `categories`, item counts), the "this site" lines, the copyright line, the 404 text and hints. All of it lives in `src/content/ui.ts` and is listed in section 5 so it can be reviewed.
- Numeric stat values may be abbreviated for display (`3 yrs`, `~8 h`) as chrome; their captions stay verbatim fragments.
- Nothing is paraphrased. Where a card shows a subset of a section (the about strip, the role one-liners, the looking-for rows), this plan names the exact sentence or fragment.
- Not in `CONTENT.md`, therefore not on the site: project screenshots, a custom domain, a separate meta description (the Tagline is used), pronouns, a year for the price comparison tool.

## 3. Layout model (from the mockup spec)

```
┌ page padding 20px ──────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ● ~/ahsan/portfolio  work                press [Ctrl K] for commands  ☾ │ │  PathBar: 44px surface card, 10px radius
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                 12px gap                                    │
│ ┌──────────────────────────────┐ ┌──────────────┐ ┌──────────────┐          │
│ │ ~/ahsan $ whoami             │ │ card         │ │ card         │          │  Grid: 12 columns × 2 or 3 equal rows,
│ │ (prompt inside first card)   │ └──────────────┘ └──────────────┘          │  12px gap, fills the window height.
│ │                              │ ┌───────────────────────────────┐          │  Scrolls inside the screen only when
│ │                              │ │ card                          │          │  a screen has rows below the fold.
│ └──────────────────────────────┘ └───────────────────────────────┘          │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐                 │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘                 │
│                                 12px gap                                    │
│                [ 1 index ] [ 2 work ] [ 3 stack ] [ 4 contact ]             │  Dock: centred, items 44px, 8px radius
└─────────────────────────────────────────────────────────────────────────────┘
```

- Page padding 20px. 12px between path bar, grid and dock. Grid gap 12px.
- Grid height is `calc(100dvh - 152px)` (20 + 44 + 12 above, 12 + 44 + 20 below). Rows are strictly equal, `repeat(n, minmax(0, 1fr))`, with n = 3 on Index and Contact and n = 2 on Stack. Cards on these screens have `min-height: 0` and are CSS size containers (`container: card / size` at ≥1024px), so a card never grows its row; instead it adapts to the height its row gives it through the container-query variants in `globals.css`: `short` (a card under 213px, or under 237px when narrower than 726px) and `short-list` (a Stack card under 301px). Work uses `repeat(3, minmax(var(--row-3), auto))` and its cards are not contained, so rows 1 to 3 fill the window and the rows after them are reached by scrolling the grid, while the bars stay fixed. The scroll container is `<main>` with `overflow-y: auto` and `overscroll-behavior: contain`. Verified by the height sweep in step 13.
- Path bar: 44px surface card, 10px radius. Left: a 10px amber dot (`--accent-line`), `~/ahsan/portfolio` in muted mono, then the current screen name in fg. Right: the theme toggle and, from step 11 when the palette exists, `press [Ctrl K] for commands` (hidden below 640px, where a palette icon button with an `aria-label` replaces it).
- Dock: centred row of four items, 44px high, 8px radius, number then label (`1 index`, `2 work`, `3 stack`, `4 contact`). Active item: `primary` fill with bold `primary-fg` text (amber with dark text in dark mode, `#10161D` with white text in light mode) and `aria-current="page"`. Others: surface with a line border, number in muted. A `← →` hint sits right of the dock at ≥640px.
- Cards: surface background, 1px line border, 10px radius, 20px padding (32px on the Index hero and Contact hero). Most cards are a flex column with the label row at the top and the main content pushed to the bottom (`justify-content: space-between`). Featured cards (Index featured, Work Creator Match, Contact email) have a 1px amber border (`--accent-line`) instead of line.
- Prompt line: inside the first card of each screen. `~/ahsan` in `ok`, `$` in amber text, the command in fg, in 14px mono.
- Cursor: a solid amber rectangle (`--accent-line`) 0.3em wide and 0.8em tall after the last word of the screen's lead line (the name on Index, the prompt command elsewhere). Blinks at `1s step-end`; solid under reduced motion; `aria-hidden`.
- Tablets (640px to 1023px): six columns, spans halve, rows are `auto` height and the grid scrolls.
- Phones (<640px): see section 5.6.

## 4. Keyboard and navigation

| Key | Action |
|---|---|
| `1` `2` `3` `4` | Go to Index / Work / Stack / Contact |
| `←` `→` | Previous / next screen, no wrap-around |
| `Ctrl K`, `⌘ K`, `/` | Open the command palette |
| `Esc` | Close the palette |
| `↑` `↓` `Enter` (palette open) | Move highlight / run the item |
| `Tab` | Normal focus order; the palette traps focus while open |

Rules: shortcuts are ignored while the target is an input, textarea or contenteditable, and while the palette is open (except `Esc`). Navigation uses `router.push`, so URLs are real and back/forward work. `↑` `↓` are left to the browser for scrolling the grid.

Hash deep links (used by the palette and by cross-screen links): `/work#creator-match`, `/work#price-comparison`, `/work#cyber-security-assessment`, `/work#ezsoft-2025`, `/work#ezsoft-2021`. Cards with ids get `scroll-margin-top`.

## 5. Screens and cards (from the mockup spec)

Common rules:
- Prompt commands (chrome): Index `whoami`, Work `ls projects/`, Stack `cat stack.json`, Contact `./contact`.
- Card labels: 11px mono, uppercase via CSS, 0.08em tracking, muted. Written lowercase in `ui.ts`. A label row can carry a right-hand slot (a tag, a count or a button).
- Headings: one `<h1>` per screen. On Index it is the name; on Work, Stack and Contact it is the prompt line in the first card. Card titles are `<h2>`.
- Display sizes below are the maxima at a 1440×900 window and scale down with the `clamp()` values in section 8. Light mode swaps amber text for `#8A5200` everywhere amber is used as text.
- Column and row numbers refer to the 12-column grid at ≥1024px.

### 5.1 Index — `/` — 12 columns × 3 equal rows, fills the window

| Card | Cols | Rows | Content (verbatim from CONTENT.md unless marked chrome) |
|---|---|---|---|
| Hero (`<h1>` = name) | 1–6 | 1–2 | 32px padding. Top: prompt line `~/ahsan $ whoami`. Left: name on two lines, "Ahsan Ullah" / "Daud", 76px, cursor after "Daud"; title "Full-Stack Web Developer" in 16px mono, amber text; tagline at 20px, fg-2. Right, from 640px: the photo in a frame (surface-2, 1px line, card radius, 4:5) whose width is `--photo-w` = clamp(140px, 23vh, 230px), so it is at most 230×288 and shrinks with the window height. The text block stretches to the frame's height with the name at the top and the tagline at the bottom, so the frame's top edge aligns with the top of the name and its bottom edge with the bottom of the tagline. Caption `photo.jpg` in 11px muted mono below the frame. The image is `public/photo-cutout.png` (transparent background, 433×577) via `next/image` with `fill`, explicit `sizes`, `priority`, `object-contain` anchored to the bottom of the frame so the head is never cut; alt "Portrait of Ahsan Ullah Daud". Bottom row: primary button `./view-work` → `/work`, secondary button `download cv.pdf` → `/cv.pdf` with `download`. |
| Status | 7–9 | 1 | Label `status`. `ok` dot + "Open to roles" (the Status (short) line) at 30px display. Three muted lines: "Stoke-on-Trent, UK" / "Eligible to work in the UK without sponsorship." / "Open to hybrid working." |
| Currently | 10–12 | 1 | The whole card is a link to `/work#ezsoft-2025`. Label row: `currently` left, `→` right (chrome). "Full Stack Engineer" at 24px, "EZ Consultants & ERP Solutions (EZsoft)" in fg-2, "March 2025 to present" in muted mono. |
| Featured | 7–12 | 2 | Amber border. Label row: `featured project` left, `live` in `ok` right. "Creator Match" at 40px. The One line sentence ("Turns a brand brief into ten scored YouTube creators, each with reasons, concerns and a draft outreach message, in about 12 seconds.") in fg-2. Bottom row: chips Next.js 16, TypeScript, Gemini API (structured outputs), Vercel on the left; `live demo` (primary) → live URL and `code` (secondary) → repo URL on the right. |
| Stat × 4 | 1–3, 4–6, 7–9, 10–12 | 3 | Label top, 56px number, one muted caption line. `experience` / `3 yrs` / "commercial experience". `support` / `10+` / "out-of-hours production incidents resolved · 4-hour support response target". `creator match` / `~8 h` / "from plan to live product on Creator Match". `tests` / `158` / "automated tests on Creator Match". |

Fit (step 13 sweep): Index fills the window with no scrollbar and nothing clipped at every width in {1920, 1536, 1440, 1366} and every height from 700 to 1000. Display type scales with viewport height as well as width (section 8.3). The rows are strictly equal; when the featured card's row is short (the `short` variant: under 213px, or under 237px while the card is narrower than 726px) the card drops its four chips and places the two buttons beside the title and description, so it fits a third of a 700px-tall window; the status and stat cards tighten their gaps. On taller rows the featured card's bottom row holds chips left and buttons right, wrapping the buttons onto a second line when they do not fit. Card internals use 12px gaps (10px inside the featured card). The name never drops below 46px.

### 5.2 Work — `/work` — 12 columns × 3 equal rows, then rows below the fold

| Card | Cols | Rows | Content |
|---|---|---|---|
| Count (`<h1>` = prompt) | 1–3 | 1 | Prompt line `~/ahsan $ ls projects/` with cursor. "03" at 64px. Caption `projects` in muted (the mockup's "projects, 2024 to 2026" is not used; see §11). |
| Day job | 1–3 | 2 | Label row: `day job` left, link `cd roles ↓` → `#ezsoft-2025` right (chrome). "Full Stack Engineer" at 24px. "EZ Consultants & ERP Solutions (EZsoft)" in fg-2. "March 2025 to present" in muted mono. The role's Stack line in 11px muted mono, wrapping. |
| CV | 1–3 | 3 | Label `curriculum vitae`. "2026 CV" at 44px (year lives in `ui.ts`). Button `download cv.pdf` (secondary) → `/cv.pdf` with `download`. |
| Creator Match, id `creator-match` | 4–12 | 1–2 | Amber border. Two inner columns at ≥1024px, 3:2. Left: label row `work / 01 · 2026` left, `live` in `ok` right. Title "Creator" / "Match" at 64px on two lines. Subtitle "AI creator-matching tool for brands. Personal project." in 13px muted mono. One 14px paragraph in fg-2 made of two sentences: the One line sentence and "Built AI-first with Claude Code in about eight hours of working sessions, from plan to production." Nine chips: Next.js 16, React, TypeScript, Tailwind CSS, Gemini API (structured outputs), YouTube Data API v3, Upstash Redis, Vitest, Vercel. Buttons `live demo` (primary) and `view code` (secondary). Right: a terminal block (surface-2) headed `$ cat highlights.md` listing the six Engineering highlights verbatim, each prefixed by `+` in `ok`. |
| Project 02, id `price-comparison` | 4–8 | 3 | Label `work / 02 · client project`. Title "Price comparison tool" at 28px. The description sentence in fg-2 at 14px. Chips `React` and `private client` (chrome, muted). The sentence "Client is private: no name, link or screenshots." is not shown; the chip carries it (see §11). |
| Project 03, id `cyber-security-assessment` | 9–12 | 3 | Label `work / 03 · 2024, MSc`. Title "Cyber-security exposure assessment" at 24px. The description sentence. Chips ASP.NET MVC, SQL Server. |
| About | 1–4 | 4 (below the fold) | Label `about`. Three sentences: (1) "Full-stack web developer with three years' commercial experience building and supporting EZsoft, a multi-tenant ERP platform used by clients internationally." (2) "I own features end to end, from a client conversation or rough brief through data model, back end and front end to production deployment, and I stay accountable afterwards." (3) "I also build AI-first with Claude Code, using it across planning, implementation, debugging, testing, refactoring and documentation." Moved here from Index per the spec; see §11. |
| Role, id `ezsoft-2025` | 5–8 | 4 | Label `experience · March 2025 to present`. Title "Full Stack Engineer" at 24px. Org "EZ Consultants & ERP Solutions (EZsoft)". Place "Remote (Islamabad-based software house serving clients internationally)". One-line summary = bullet 1 ("Build and maintain EZsoft, a multi-tenant ERP web platform across finance, HR, payroll, sales, stock and POS modules."). Eleven chips from the Stack line. `<details>` with summary `show 7 more` (chrome) revealing bullets 2 to 8. |
| Role, id `ezsoft-2021` | 9–12 | 4 | Label `experience · February 2021 to July 2022`. Title "Software Developer" at 24px. Same org. Place "Islamabad, Pakistan (on-site)". One-line summary = bullet 1 ("Junior developer across the full stack of the EZsoft ERP product."). Five chips. `<details>` with summary `show 3 more` revealing bullets 2 to 4. |

Rows 1 to 3 fill the window; row 4 is `auto` height below it. Role cards use native `<details>`/`<summary>` (keyboard accessible, no JavaScript, content present for search engines). Fit, verified with screenshots in both themes (step 8): at 1920×880 and 1440×900 rows 1 to 3 fill the window exactly. At 1366×768 the MSc project's description makes row 3 taller than its third, so the bottom of row 3 sits a little below the fold and is reached by the same scroll that reaches row 4; the spec allows Work to scroll. Phones stack in the §5.6 order.

### 5.3 Stack — `/stack` — 12 columns × 2 equal rows, fills the window

| Card | Cols | Rows | Content |
|---|---|---|---|
| Summary (`<h1>` = prompt) | 1–3 | 1 | Prompt line `~/ahsan $ cat stack.json` with cursor. "6" at 64px. Caption `categories` in muted. Two labelled lines in 12px muted mono: `commercial` → the 2025 role's Stack line ("ASP.NET MVC, VB.NET, .NET Framework, SQL Server, T-SQL, JavaScript, jQuery, Bootstrap, Razor, Git, JIRA"); `projects` → the Creator Match Stack line. |
| Education | 1–3 | 2 | Label `education`. "MSc Computer Science" at 24px, then "University of Hertfordshire, UK" and "September 2022 to October 2024" in muted. "BS (Hons) Computer Science" at 24px, then "Capital University of Science & Technology, Pakistan" and "September 2015 to January 2020" in muted. |
| Skill group × 6 | 4–6, 7–9, 10–12 | 1 and 2 | Label row: group name left (`languages`, `front end`, `back end`, `data`, `ai`, `tools`), item count right in amber text (`07`, `06`, `05`, `04`, `04`, `06`, derived). Items as list rows separated by line-soft dividers, 14px mono, in the order written. "ASP.NET Core" shows a muted `learning` note on the right (C# is commercial since the 2026-10-08 content correction). Lists, not chips. |

The AI-first card is dropped: the two rows are full, and both of its sentences already appear on Work (the Creator Match card and the 2025 role bullets). See §11. Fit at 1366×768: rows ≈ 302px; the longest list (7 rows ≈ 210px + label + padding ≈ 264px) fits.

### 5.4 Contact — `/contact` — 12 columns × 3 equal rows, fills the window

| Card | Cols | Rows | Content |
|---|---|---|---|
| Hero (`<h1>` = prompt) | 1–5 | 1–3 | 32px padding. Prompt line `~/ahsan $ ./contact` with cursor. "Let's" / "talk." at 120px on two lines; the full stop in amber text. Sub-line "Open to full-stack and AI engineering roles in the UK." at 20px, fg-2. Bottom: `ok` dot + "Open to roles" (the Status (short) line). |
| Email | 6–12 | 1 | Amber border. Label row: `direct` left, a `copy` button right that reads `copied` for 1.5s in an `aria-live="polite"` region (the mockup's "click to copy" text becomes this button because the address itself is a `mailto:` link; see §11). "ahsanullahdaud@gmail.com" at 40px display as a `mailto:` link. |
| LinkedIn | 6–8 | 2 | Whole card is the link. Label `01 / profile`. "LinkedIn" at 32px. Handle `ahsan-ullah-daud-ba7647200` in muted mono. |
| GitHub | 9–10 | 2 | Whole card is the link. Label `02 / code`. "GitHub" at 32px. `ahsanullahdaud` in muted mono. |
| CV | 11–12 | 2 | Whole card is the link to `/cv.pdf` with `download`. Label `03 / download`. "CV" at 32px. `cv.pdf` in muted mono. |
| Looking for | 6–10 | 3 | Terminal block headed `$ ahsan --looking-for`, then aligned key/value rows with keys in `ok` (keys are chrome, values verbatim fragments): `role` → "full-stack and AI engineering roles in the UK"; `working` → "Open to hybrid working."; `based` → "Stoke-on-Trent, UK"; `visa` → "Eligible to work in the UK without sponsorship." Five columns (the spec drew four) so each row stays on one line at 1366px; tighter paddings and 12px text in a short row. |
| This site | 11–12 | 3 | Label `this site`. Three lines (chrome, true of this site): "built with Claude Code" / "Next.js, TypeScript, Tailwind CSS" / "hosted on Vercel". Copyright line "© 2026 Ahsan Ullah Daud". Two columns (the spec drew three). |

No contact form. The three link cards are anchors themselves and show `↗` (or `↓` for the CV) at the right of the label row as the new-tab or download cue. The looking-for block lists only facts CONTENT.md has: role, working, based, visa. There is no start-date or notice-period row. Fit, verified with screenshots in both themes (step 10): the three rows fill the window at 1920×880, 1440×900 and 1366×768 with no scrollbar; at 390px the column stacks hero, email, LinkedIn, GitHub, CV, looking-for, this site.

### 5.5 Not found — any other URL

One card, columns 1–6, row 1: prompt line `~/ahsan $ cd <path>`, then `cd: no such file or directory` in muted mono and a link `back to ~` (all chrome). Uses the shell, so the dock still works.

### 5.6 Phone — below 640px

- One column, page padding 12px, gaps 10px, card padding 20px (hero 24px). Rows are `auto`; the column scrolls inside the screen.
- Index order: path bar, hero (the photo is a 64px square at the top right of the hero card, in the same surface-2 frame; name at 46px), status, currently, featured, then the four stats in a 2×2 grid. From 640px the hero shows the framed photo beside the name block.
- Work order: count, Creator Match (single column, terminal block below the buttons), project 02, project 03, day job, CV, about, role 2025, role 2021.
- Stack order: summary, the six groups, education. Contact order: hero ("Let's talk." at 60px), email, LinkedIn, GitHub, CV, looking for, this site.
- Buttons are full width in pairs, 48px high.
- The dock becomes a single rounded bar pinned to the bottom with `padding-bottom: env(safe-area-inset-bottom)`, four equal items, labels only.

## 6. Command palette

- Opens on `Ctrl K`, `⌘ K`, `/` (not while typing) and the path bar button. Closes on `Esc`, outside click, or after running an item.
- Groups and items:
  - **screens**: index, work, stack, contact (each shows its number as a hint).
  - **projects**: Creator Match, Price comparison tool, Cyber-security exposure assessment → `/work#id`. Plus "Creator Match → live demo ↗" and "Creator Match → code ↗".
  - **links**: Email, LinkedIn ↗, GitHub ↗, Download CV.
  - **actions**: Toggle theme.
- Filter: case-insensitive substring match over label plus keywords (for example "resume" matches Download CV, "youtube" matches Creator Match). Empty state `no matches`.
- Semantics: `role="dialog"` `aria-modal="true"` `aria-labelledby`, input with `role="combobox"` `aria-expanded` `aria-controls`, list `role="listbox"` with `aria-activedescendant`, highlighted item `aria-selected`. Focus is trapped while open, body scroll is locked, and focus returns to the opener on close.
- Hand-written, about 150 lines; no `cmdk`.

## 7. Components

```
src/app/layout.tsx                 fonts → CSS variables; <ThemeProvider>; <PathBar/> <main> <Dock/> <CommandPalette/> <KeyboardNav/>
src/app/template.tsx               screen enter animation wrapper (re-mounts on every navigation)
src/app/globals.css                tokens, @theme inline, dark variant, base styles, cursor keyframes, reduced-motion
src/app/page.tsx                   Index
src/app/work/page.tsx              Work
src/app/stack/page.tsx             Stack
src/app/contact/page.tsx           Contact
src/app/not-found.tsx              404 screen
src/app/icon.svg                   favicon: amber block cursor on the page background
src/app/robots.ts, sitemap.ts      static metadata routes

src/components/shell/
  PathBar.tsx                      amber dot, ~/ahsan/portfolio, ScreenName, Ctrl K hint / palette button (step 11), ThemeToggle
  ScreenName.tsx *                 current screen name from the URL
  Dock.tsx, DockItem.tsx *         <nav aria-label="Screens">; DockItem reads the URL to set aria-current="page"
  useScreen.ts *                   usePathname → matching Screen; used by DockItem and ScreenName
  ThemeToggle.tsx  *               sun/moon inline SVG; aria-label says what it switches to
  KeyboardNav.tsx  *               no UI; global keydown → router.push
  CommandPalette.tsx *             modal dialog + combobox input + grouped listbox; rendered outside the #shell wrapper, which it makes inert while open
  PaletteButton.tsx *              path-bar button that dispatches the palette toggle event (text hint ≥640px, `>_` glyph below)
  Screen.tsx                       12-column grid with a `rows` prop (2 or 3), window-fill height, inner scroll
  PromptLine.tsx, Cursor.tsx       prompt inside the first card (ok path, amber $, command); the blinking block

src/components/cards/
  Card.tsx                         variants: default | hero (32px padding) | featured (amber border); optional id
  CardLabel.tsx                    label row with an optional right slot (tag, count or button)
  Chip.tsx, StatCard.tsx, TerminalBlock.tsx (surface-2 inset with a `$` heading line), ListRows.tsx (line-soft dividers)
  index/    HeroCard (with the framed photo), StatusCard, CurrentlyCard (a link to the current role on Work), FeaturedCard
  work/     CountCard, DayJobCard, CvCard, CreatorMatchCard, ProjectCard, AboutCard, RoleCard (details/summary)
  stack/    StackSummaryCard, SkillListCard, EducationCard
  contact/  ContactHeroCard, EmailCard, CopyButton *, LinkCard, LookingForCard, SiteCard

src/components/ui/
  Button.tsx                       primary (--primary fill) and secondary (line border); renders <a> or <button>; full width on phones
  ExternalLink.tsx                 target _blank, rel noopener noreferrer, ↗ glyph, sr-only "(opens in new tab)"

src/content/
  types.ts, identity.ts, stats.ts, about.ts, experience.ts, projects.ts, stack.ts, education.ts, contact.ts
  screens.ts                       route, dock label, number, prompt command, path-bar name
  ui.ts                            every chrome string
  palette.ts                       palette items derived from the modules above

src/lib/
  cn.ts                            three-line class joiner
  keys.ts                          shortcut map, isEditableTarget()

* = 'use client'. Everything else is a server component.
```

## 8. Theme tokens (from the mockup spec)

Defined as CSS variables on `:root` (light) and `.dark`, then exposed to Tailwind through `@theme inline` so utilities like `bg-surface`, `text-accent-text`, `border-line-soft` exist. Components never use raw hex.

### 8.1 Colours

| Token | Dark | Light | Tailwind utility | Used for |
|---|---|---|---|---|
| `--bg` | `#0D1117` | `#EDF0F3` | `bg-bg` | page background |
| `--surface` | `#151B23` | `#FFFFFF` | `bg-surface` | cards, path bar, dock items |
| `--surface-2` | `#10161D` | `#F4F6F8` | `bg-surface-2` | inset areas: photo frame, terminal blocks, chips |
| `--line` | `#2A3441` | `#CCD4DD` | `border-line` | 1px borders |
| `--line-soft` | `#222B36` | `#E1E6EB` | `border-line-soft` | row dividers inside cards |
| `--fg` | `#E8EDF2` | `#10161D` | `text-fg` | headings, primary text |
| `--fg-2` | `#C9D3DD` | `#2C3742` | `text-fg-2` | paragraphs |
| `--muted` | `#94A3B3` | `#55606E` | `text-muted` | labels, captions, secondary text |
| `--accent` | `#F2B544` | `#F2B544` | `bg-accent` | amber as a fill: active dock item and primary button (dark only), selection background |
| `--accent-line` | `#F2B544` | `#B87A00` | `border-accent-line`, `bg-accent-line` | amber as a border or small mark: featured, Creator Match and email card borders, the path-bar dot, the cursor |
| `--accent-text` | `#F2B544` | `#8A5200` | `text-accent-text` | amber as text: prompt `$`, hero title, item counts, the full stop in "Let's talk.", links on hover, focus ring |
| `--accent-fg` | `#0D1117` | `#10161D` | `text-accent-fg` | text on amber fills |
| `--primary` | `#F2B544` | `#10161D` | `bg-primary` | primary buttons, active dock item |
| `--primary-fg` | `#0D1117` | `#FFFFFF` | `text-primary-fg` | text on primary |
| `--ok` | `#56D4B8` | `#0B6B5C` | `text-ok`, `bg-ok` | `~/ahsan` in the prompt, the status dot, `live` tags, `+` prefixes, looking-for keys |

Rule: in light mode amber is never text on white or on the page background. Anything that is amber *text* uses `--accent-text`; anything that is an amber *fill* keeps `#F2B544` with dark text on it. The primary button and the active dock item are dark with white text in light mode.

### 8.2 Contrast check (computed 2026-10-07, WCAG 2.x)

Every text pair passes 4.5:1 in both themes. No text colour needs adjusting.

| Theme | Pair | Ratio |
|---|---|---|
| Dark | lowest text pair: `muted` on `surface` | 6.7:1 |
| Dark | `fg` / `fg-2` on any background | ≥ 11.4:1 |
| Dark | `accent-text` and `ok` on any background | ≥ 9.5:1 |
| Dark | `accent-fg` on amber fill | 10.3:1 |
| Light | lowest text pairs: `muted`, `accent-text`, `ok` on `bg` | 5.6:1 |
| Light | `muted`, `accent-text`, `ok` on `surface` / `surface-2` | ≥ 5.9:1 |
| Light | `fg` / `fg-2` on any background | ≥ 10.6:1 |
| Light | `accent-fg` on amber fill, white on `#10161D` | 9.9:1 and 18.2:1 |

Non-text amber in light mode is the only weak spot: `#F2B544` on white is 1.8:1 and on `bg` 1.6:1. Consequences, already applied above:
- The focus ring uses `--accent-text`, so it is `#8A5200` in light mode (6.4:1), never `#F2B544`.
- The full stop in "Let's talk." uses `--accent-text`. Large text still needs 3:1 and `#F2B544` on white fails it.
- The 1px amber borders (featured, Creator Match, email cards), the path-bar dot and the cursor use `--accent-line`: `#B87A00` in light mode (3.6:1 on white, 3.3:1 on `bg`, passing the 3:1 non-text threshold) and `#F2B544` in dark mode (9.5:1 on surface).
- Status dots and `+` prefixes are `ok`, which passes on both themes (6.4:1 light, 9.5:1 dark).

### 8.3 Type scale

Fonts: `--font-mono` IBM Plex Mono 400/500/600; `--font-display` Space Grotesk 500/700; `--font-sans` IBM Plex Sans 400/500. All `display: swap`. Display sizes are maxima at 1440×900. Each is a Tailwind text token in `globals.css` (`text-name`, `text-stat`, …) defined as `clamp(min, min(Xvw, Yvh), max)` with Y = max / 900, so sizes shrink on short windows as well as narrow ones and the Index never needs to scroll. The tokens carry their line height and tracking.

| Element | Max | Token and value | Line height | Tracking | Font |
|---|---|---|---|---|---|
| Name on Index | 76px | `text-name` = `clamp(46px, min(5.3vw, 8.4vh), 76px)` | 0.98 | -0.03em | display 700 |
| "Let's talk." | 120px | `text-talk` = `clamp(60px, min(8.3vw, 13.3vh), 120px)` | 0.92 | -0.03em | display 700 |
| Creator Match title on Work; "03" and "6" counts | 64px | `text-title-xl` = `clamp(40px, min(4.4vw, 7.1vh), 64px)` | 1.0 | -0.02em | display 700 |
| Stat numbers | 56px | `text-stat` = `clamp(36px, min(3.9vw, 6.2vh), 56px)` | 1.0 | -0.02em | display 700 |
| "2026 CV" | 44px | `text-title-lg` = `clamp(32px, min(3vw, 4.9vh), 44px)` | 1.0 | -0.02em | display 700 |
| Creator Match title on Index; the email address | 40px | `text-title-md` = `clamp(22px, min(2.8vw, 4.4vh), 40px)` | 1.05 | -0.02em | display 700 |
| LinkedIn / GitHub / CV titles | 32px | `text-title-sm` = `clamp(24px, min(2.2vw, 3.6vh), 32px)` | 1.1 | -0.01em | display 700 |
| "Open to roles" (status heading) | 30px | `text-status` = `clamp(22px, min(2.1vw, 3.3vh), 30px)` | 1.1 | -0.01em | display 700 |
| Project 02 title | 28px | `text-title-28` = 28px | 1.15 | -0.01em | display 700 |
| Project 03 title, role titles, day-job title, education titles | 24px | `text-title-24` = 24px | 1.2 | -0.01em | display 700 |
| Tagline, Contact sub-line | 20px | `text-lead` = `clamp(17px, min(1.4vw, 2.2vh), 20px)` | 1.4 | 0 | display 500, fg-2 |
| Hero title ("Full-Stack Web Developer") | 16px | fixed | 1.4 | 0 | mono 500, accent-text |
| Paragraphs, bullets, descriptions | 15px | fixed | 1.6 | 0 | sans 400 |
| Prompt line, list rows, terminal blocks, dock, buttons | 14px / 13px | fixed | 1.5 | 0 | mono 400/500 |
| Captions, handles, stack lines | 12px | fixed | 1.5 | 0 | mono 400, muted |
| Card labels | 11px | fixed | 1 | 0.08em, uppercase | mono 500, muted |
| Chips | 11px | fixed | 1 | 0 | mono 500 |

### 8.4 Spacing, shape, motion

| Group | Values |
|---|---|
| Page | padding 20px (12px on phones); 12px between path bar, grid and dock (10px on phones). |
| Grid | 12 columns, gap 12px (10px on phones); rows `minmax(0, 1fr)` to fill the window, `auto` below the fold and on small screens. |
| Cards | padding 20px, hero cards 32px (24px on phones); radius 10px; border 1px `--line` (or `--accent-line` for featured cards). Photo radius 8px. |
| Chips | 11px mono, padding 2px 6px, `surface-2` background, `line` border, 6px radius. |
| Buttons | 13px mono 500, height 40px (48px on phones), padding 0 16px, 6px radius. Primary = `--primary` / `--primary-fg`. Secondary = surface, `line` border, fg text; hover border → fg. |
| Dock items | height 44px, padding 0 14px, 8px radius, 13px mono; active = `--primary` fill, bold `--primary-fg`. |
| Path bar | height 44px, 10px radius, 14px mono. |
| Terminal block | `surface-2`, `line` border, 8px radius, 16px padding, 13px mono, heading line in muted. |
| Cursor | inline block 0.3em × 0.8em, `--accent-line`, margin-left 0.15em; `1s step-end infinite` blink; solid under reduced motion. |
| Motion | `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`; `--dur-1: 120ms` (hover, focus); `--dur-2: 180ms` (screen enter: opacity 0→1 and translateY 6px→0). Under `prefers-reduced-motion: reduce` every duration is 0ms. |
| Focus | `:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 2px }` on everything. |
| Selection | `::selection` background `--accent`, text `--accent-fg`. |
| Theme mechanics | `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `storageKey="ahsan-theme"`, `disableTransitionOnChange`. `<html suppressHydrationWarning>`. `color-scheme` set per theme. `<meta name="theme-color">` `#0D1117` dark, `#EDF0F3` light. |

## 9. Accessibility and performance checklist

- Landmarks: `<header>` path bar, `<main>` screen, `<nav aria-label="Screens">` dock.
- One `<h1>` per screen: the name on Index, the prompt line elsewhere. Card titles are `<h2>`.
- All interactive elements reachable and operable by keyboard; visible focus ring in both themes (`--accent-text`).
- Icon-only buttons carry `aria-label`. External links announce "(opens in new tab)". Decorative glyphs (cursor, dots, `+`, `↗`) are hidden from assistive tech.
- Shortcuts never override typing. The palette is a proper modal dialog.
- `prefers-reduced-motion` honoured for transitions and the cursor. `prefers-color-scheme` is the default theme.
- Text contrast ≥ 4.5:1 in both themes (section 8.2). Nothing conveyed by colour alone: the status dot has text, featured cards have a label, `live` is a word.
- Works at 200% zoom and at 320px wide without horizontal scroll.
- Performance targets: Lighthouse 100 performance / ≥ 95 accessibility, best practices, SEO on the production URL. First-load JS under 120 kB. No layout shift (image dimensions set, fonts swapped with size-adjust fallbacks from next/font). No third-party requests at runtime.

## 10. Build order

Prerequisites verified on this machine: Node 26.9, npm 11 (no pnpm), git 2.45, `gh` 2.102 logged in as `ahsanullahdaud`. No Vercel CLI; deploys use the Vercel GitHub integration. You need a Vercel account linked to GitHub before step 2. The folder already holds `CONTENT.md`, `cv.pdf` (current, two pages), `photo.jpg` (433×577), `design/MOCKUP_SPEC.md`, and a duplicate `MOCKUP_SPEC.md` at the root that is byte-identical to the one in `design/`.

Every step ends with: `npm run lint`, `npm run build`, then `npx tsc --noEmit` passing (the type check needs the types a build generates); a check in Chrome at 1366×768 and 390×844 in both themes; one commit; `git push` (from step 2 on, that redeploys).

### Step 1 — Scaffold and assets
1. `create-next-app` refuses a folder with unknown files, so scaffold beside the project and move it in:
   ```powershell
   npx create-next-app@latest ..\portfolio-scaffold --ts --eslint --tailwind --app --src-dir --turbopack --import-alias "@/*" --use-npm
   robocopy ..\portfolio-scaffold . /E /MOVE /NFL /NDL
   ```
   Answer "No" to React Compiler if asked.
2. Move the assets: `Move-Item cv.pdf public\cv.pdf`, `Move-Item photo.jpg public\photo.jpg`. Delete the root `MOCKUP_SPEC.md` duplicate (the canonical copy is `design/MOCKUP_SPEC.md`). Delete the scaffold's SVGs and boilerplate page content.
3. Replace `src/app/page.tsx` with a plain `<h1>~/ahsan $ whoami</h1>`.
4. `git init`, commit `chore: scaffold next app, add content and assets`.
   Done when `npm run dev` shows the heading at http://localhost:3000 and `npm run build` passes.

### Step 2 — First deploy
1. `gh repo create portfolio --public --source=. --remote=origin --push --description "Personal developer portfolio of Ahsan Ullah Daud, Full-Stack Web Developer"`.
2. On vercel.com: Add New → Project → Import `ahsanullahdaud/portfolio` → framework Next.js (auto) → Deploy. No environment variables.
3. Done 2026-10-07. Production URL: https://ahsanullahdaud.vercel.app (recorded in `CLAUDE.md`; goes into `src/content/identity.ts` as `siteUrl` in step 6). The URL returned the step 1 heading without authentication and a push to `main` produced a new deployment.

### Step 3 — Tokens, fonts, theme toggle
Write the section 8 tokens into `globals.css`, including the light-mode amber rule (`--accent-text`, `--accent-line`, `--primary`); load the three fonts in `layout.tsx`; add `next-themes`, `ThemeProvider` and `ThemeToggle` in a temporary header. Commit `feat: theme tokens, fonts and theme toggle`.
Done when the heading renders with the display font in both themes, amber text is `#8A5200` in light mode, the toggle persists across reloads, there is no flash on load, and the system setting is respected on first visit.

### Step 4 — Shell: path bar, dock, screens
`PathBar`, `ScreenName`, `Dock`, `DockItem`, `useScreen`, `Screen` (12-column, window-fill rows, inner scroll), `PromptLine`, `Cursor`; the `Card` and `CardLabel` primitives and the `screens`, `ui` and `identity` content modules, since the shell needs them; four route files each rendering a first card with its prompt line and placeholder cards at their final grid positions; phone layout with the pinned dock bar. Commit `feat: shell with path bar, dock and four screens`.
Done when all four URLs work by dock click and browser back/forward, the active dock item is marked, the grid fills the window at 1366×768, and the phone layout stacks with the dock reachable.

### Step 5 — Keyboard navigation and screen transitions
`KeyboardNav`, `src/lib/keys.ts`, `template.tsx` enter animation, reduced-motion handling. Commit `feat: keyboard navigation and screen transitions`.
Done when `1`–`4` and `←` `→` switch screens, nothing fires while typing in an input, and the animation is off under reduced motion.

### Step 6 — Content layer and card primitives
Transcribe the rest of `CONTENT.md` into typed modules in `src/content/` (`identity`, `screens` and `ui` exist from step 4); build `Chip`, `Button`, `ExternalLink`, `StatCard`, `TerminalBlock`, `ListRows` (`Card` and `CardLabel` exist from step 4). Review the content modules against `CONTENT.md` line by line. Commit `feat: typed content modules and card primitives`.
Done when the build and then `tsc` pass and a placeholder grid renders a stat card, a chip and a terminal block in both themes.

### Step 7 — Index screen
`HeroCard` (name at 76px with cursor, two buttons), `PhotoCard`, `StatusCard`, `FeaturedCard`, four `StatCard`s; the phone variant with the 64px photo inside the hero. Check the window fit at 1440×900, 1366×768 and 1280×720 and apply the 5.1 fallback order only if needed. Commit `feat: index screen`.
Done when Index fills the window with no inner scroll at laptop sizes and `live demo`, `code`, `./view-work` and `download cv.pdf` work.

### Step 8 — Work screen
`CountCard`, `DayJobCard`, `CvCard`, `CreatorMatchCard` (two inner columns, terminal block), `ProjectCard`, `AboutCard`, `RoleCard` with details/summary; ids and scroll margins for deep links. Commit `feat: work screen`.
Done when rows 1 to 3 fill the window, row 4 is reached by scrolling the grid while the bars stay fixed, roles expand by keyboard, and `/work#ezsoft-2025` scrolls to that card.

### Step 9 — Stack screen
`StackSummaryCard`, six `SkillListCard`s with counts and the learning note, `EducationCard`. Commit `feat: stack screen`.
Done when the two rows fill the window at 1366×768 and the longest list has no inner overflow.

### Step 10 — Contact screen
`ContactHeroCard` ("Let's talk." at 120px), `EmailCard` with `CopyButton`, three `LinkCard`s, `LookingForCard`, `SiteCard`. Commit `feat: contact screen`.
Done when every action works, the copy button announces `copied`, the CV downloads as `cv.pdf`, and the email address fits on one line at 1280px and wraps cleanly on phones.

### Step 11 — Command palette
`CommandPalette`, `src/content/palette.ts`, path bar trigger button, shortcuts wired in `keys.ts`. Commit `feat: command palette`.
Done when `Ctrl K`, `⌘ K` and `/` open it, filtering and arrow keys work, every item navigates or opens correctly, focus is trapped and restored, and `Esc` closes it.

### Step 12 — Metadata and polish
`metadata` in `layout.tsx` (title "Ahsan Ullah Daud — Full-Stack Web Developer", description = Tagline, `metadataBase` = https://ahsanullahdaud.vercel.app, Open Graph title/description), `icon.svg`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, README with the stack and scripts. Commit `feat: metadata, favicon, 404 and readme`. Done 2026-10-08. Step 13 added the Open Graph image: `src/app/opengraph-image.tsx` renders a 1200×630 PNG at build time (dark background, prompt line, the name in Space Grotesk, the title, the site host and the short status) from the TTF files in `src/assets/og/`; `twitter:card` is `summary_large_image`.

### Step 13 — Accessibility and performance pass
Run Lighthouse and axe DevTools in Chrome on the production URL in both themes; re-confirm the section 8.2 ratios on the rendered site; keyboard-only walk of every screen and the palette; reduced-motion check; 200% zoom and 320px width; inspect the `next build` route table (all routes static) and first-load JS. Fix findings. Commit `a11y: audit fixes` / `perf: …` as needed.

Done 2026-10-08. Results (scripts live in the gitignored `.shots/` folder and run against `npm run start` with the Playwright package from the npx cache):

- **Overflow fixed by construction** (the note parked from step 7 is resolved): rows `minmax(0, 1fr)`, cards `min-height: 0` and size containers, `short` / `short-list` container-query variants (section 3). `sweep.js`: widths 1920, 1536, 1440, 1366 × heights 700 to 1000 in steps of 10 × Index, Stack, Contact = 372 sizes; every one has `scrollHeight <= clientHeight` on `<main>` and no card whose content exceeds its box. 0 failures.
- **Open Graph image**: `/opengraph-image`, 1200×630 PNG, static at build; `og:image`, `og:image:alt` and `twitter:image` point at it; `twitter:card` is `summary_large_image`.
- **Contrast** (`a11y.js`, every visible text element on all four routes, both themes, plus the open palette and the expanded role cards): 8 to 10 colour pairs per screen, minimum 5.59:1 in light (muted on the page background) and 6.72:1 in dark (muted on surface). Nothing below 4.5:1.
- **Reduced motion**: the cursor blink and the screen-enter animation compute to `none`, `--dur-1` and `--dur-2` to 0, transitions to 0.01ms. The `:root` override had to move out of `@layer base`, because the unlayered token block was beating it.
- **Keyboard walk** on Index: palette button, theme toggle, the two hero buttons, the two featured buttons, the four dock items, all with the 2px focus ring; the palette's own trap was verified in step 11.
- **Lighthouse** (local production build, Chrome headless; all four categories):

  | Route | Desktop P / A / BP / SEO | Mobile P / A / BP / SEO |
  |---|---|---|
  | `/` | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |
  | `/work` | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |
  | `/stack` | 100 / 100 / 100 / 100 | 96 / 100 / 100 / 100 |
  | `/contact` | 100 / 100 / 100 / 100 | 97 / 100 / 100 / 100 |

  Mobile performance sits in the mid-90s because of the simulated slow 4G throttling on the font and image bytes; no third-party requests exist.

### Step 14 — Final deploy and handover
Push, confirm the production deployment in both themes on a phone, confirm the repo is public and the README is current. Optional: attach a custom domain in Vercel and update `metadataBase`.

Done 2026-10-08: production deployment green, all four routes and the 404 checked in both themes on production, repo public, README current, working tree clean. `BUILD_LOG.md` records the 14 steps with dates, rough durations, decisions and verification results. No custom domain; `metadataBase` stays the vercel.app address.

## 11. Assumptions and open questions

Decisions taken where the spec and the content rules meet. Each is a one-line change if you want it the other way.

- **About moved to Work.** The spec leaves it off Index and offers Work or "behind the hero tagline". It is now a 4-column card in Work's row 4, beside the two role cards. Alternative: drop it entirely, since its substance appears in the day-job card, the stats and the Creator Match card.
- **Status heading is "Open to roles".** Resolved: `CONTENT.md` now has a "Status (short)" line under Identity, used at 30px on the status card and at the bottom of the Contact hero. The three detail lines are unchanged.
- **Count card caption is `projects`.** The mockup's "projects, 2024 to 2026" asserts a range, but the price comparison tool has no year in `CONTENT.md`. Add a year for it and the caption can carry the range.
- **Email card: `copy` button instead of "click to copy".** The address is a `mailto:` link, so clicking it opens mail; the button next to the label does the copying.
- **Looking-for rows: four, not three.** `role`, `working`, `based`, `visa`, each a verbatim fragment. The spec's "where" row would have needed a new sentence.
- **AI-first card dropped from Stack.** The two-row grid is full and both of its sentences already appear on Work.
- **Private-client note not shown.** Project 02's "Client is private: no name, link or screenshots." would push the card past its row at 1366×768; the muted `private client` chip states the same fact.
- **Contact row 3 spans.** Looking-for takes columns 6–10 and this-site 11–12 (the spec drew 6–9 and 10–12) so the looking-for rows stay on one line at 1366px and the row fits a 700px-tall window.
- **Featured chips in short rows.** When the Index featured card's row is short, its four stack chips are not shown; the full stack is on Work. Nothing from CONTENT.md is lost.
- **Photo in the hero (2026-10-09).** The Photo card is gone; the photo sits in the hero beside the name as a transparent cutout in a 4:5 frame, and the freed top-right slot holds the status card (7–9) and a new "currently" card (10–12) linking to the current role on Work. Tablets, which used to show the Photo card, now show the hero's framed photo; phones keep the 64px square. `design/MOCKUP_SPEC.md` §4 and §8 record the same.
- **Stat captions.** The 4-hour target is folded into the `10+` caption as the spec asks, joined with a `·`. `3 yrs` and `~8 h` are display abbreviations; captions stay verbatim.
- **"2026 CV"** is chrome in `ui.ts`; update the year when the CV changes.
- **Light-mode amber borders, dot and cursor.** Resolved: `--accent-line` is `#B87A00` in light mode and `#F2B544` in dark mode (section 8.1).
- **Root `MOCKUP_SPEC.md`** is a byte-identical duplicate of `design/MOCKUP_SPEC.md`; step 1 deletes the root copy.
- Repo: `github.com/ahsanullahdaud/portfolio`. Production: https://ahsanullahdaud.vercel.app.
- `←` `→` switch screens; `↑` `↓` scroll the grid.
- Contact link cards show the handle taken from each URL rather than the full URL.
- A Vercel account on the free Hobby plan linked to your GitHub account is assumed to exist at step 2.
