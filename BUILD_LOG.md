# Build log

One entry per build step from `PLAN.md`, in order. Dates and commit hashes come from the git history; durations are approximate, taken from the commit timestamps (each commit marks the end of its step) and exclude the pauses in which Ahsan reviewed a step on the live site before approving the next. The site was built in Claude Code over two sessions: 2026-10-07, 15:35 to 21:41, and 2026-10-08, about 12:15 to 13:50.

Roles throughout: Ahsan wrote `CONTENT.md` and `design/MOCKUP_SPEC.md`, set the brief and the rules, answered the planning questions, reviewed every step on the production URL and approved or corrected it. Claude Code (Fable 5.1) planned, built, verified and committed each step, and recorded decisions in `PLAN.md`.

## Planning (2026-10-07, about 1 h)

### What Ahsan decided

- The brief: Next.js App Router, TypeScript, Tailwind, free Vercel hosting from a public GitHub repo; no backend, database, API keys or analytics. Four full-window screens (Index, Work, Stack, Contact) as card grids, a bottom dock, keys 1 to 4 and arrows, a command palette on Ctrl K or "/", light and dark themes with a remembered toggle, Creator Match featured with Live demo and Code buttons, phones stacking to one column, accessible and fast. `CONTENT.md` is the single source of truth for all text; nothing invented.
- Answers to the four planning questions: amber accent; IBM Plex Mono for labels and chrome, Space Grotesk 700 for display text, IBM Plex Sans for paragraphs; Work holds the projects and the expandable EZsoft role cards while Stack holds the skill groups and education; the prompt string is `~/ahsan $`. Index must carry the featured Creator Match card; About stays short; role cards expand; a taller grid scrolls inside the screen while the path bar and dock stay fixed.
- Then `design/MOCKUP_SPEC.md`, describing the approved mockups: a cool blue-black palette with amber only as a fill in light mode (`#8A5200` as text), the exact type sizes (name 76px, "Let's talk." 120px, 64px project title, 56px stats), the shell measurements, and the card layout of every screen. The spec wins on layout, sizes and colours; the plan wins on content rules, components, keyboard map, accessibility and build order.
- Three follow-ups: a "Status (short): Open to roles" line added to `CONTENT.md`; an `--accent-line` token (`#B87A00` in light mode) for amber borders, the path-bar dot and the cursor; and a one-line exception in `CLAUDE.md` making `ok` a status colour, not a second accent.

### What Claude Code did

- Read `CONTENT.md`, the photo and the CV; fetched the reference site's CSS to learn what to avoid (JetBrains Mono, Barlow Condensed, a monochrome palette, its wording); checked the toolchain (Node 26.9, npm 11, git 2.45, `gh` logged in, no Vercel CLI).
- Wrote `PLAN.md` (screens, card lists, components, theme tokens, keyboard map, accessibility checklist, 14 build steps with the first deploy at step 2) and `CLAUDE.md` (rules and commands), then revised sections 3, 5 and 8 against the mockup spec and computed WCAG contrast for every colour pair in the spec: every text pair passes 4.5:1; the only weak pair was amber as a non-text mark on white (1.8:1), which became the `--accent-line` token.

## Step 1 - Scaffold (2026-10-07, about 15 min, commit `8e43c70`)

- `create-next-app` 16.4 (TypeScript, Tailwind 4, ESLint, App Router, `src/`, npm) scaffolded beside the project, because it refuses a folder with unknown files, then merged in with `mv -n` after listing name collisions (none). Ahsan asked for that collision list and no-clobber move after interrupting a plain `mv`. The three assets had doubled extensions on disk, which Ahsan had already fixed; the CV and photo moved to `public/`.
- Placeholder Index page, git init on `main`, repo-local identity using the GitHub noreply address because no git identity existed on the machine.
- Verification: lint clean, `next build` with two static routes, `tsc` clean after the build (Next 16 generates the `LayoutProps` type at build time), dev server returned the heading.

## Step 2 - GitHub and Vercel (2026-10-07, about 20 min, commits `3e8d1b9`, `1698690`)

- Before the public repo Ahsan replaced the CV with a version without a phone number and asked for the old file to be purged from history: the first commit was amended, the reflog expired and the object store pruned; only the new blob was ever pushed. He also asked to turn off `cacheComponents` and `partialPrefetching`, add `.gitattributes` (`* text=auto eol=lf`) and reorder the check commands to lint, build, then tsc.
- Privacy scan of every tracked file before the push: the only email is the public one from `CONTENT.md`; no phone numbers, postcodes, env files or secrets; the photo has no Exif data; the CV text was extracted and scanned.
- `gh repo create portfolio --public` pushed `main`. Ahsan imported the repo in the Vercel dashboard; production is https://ahsanullahdaud.vercel.app, which returned the heading with no authentication, and a later push produced a new deployment within a minute (deployments are recorded on GitHub by the Vercel app).

## Step 3 - Tokens, fonts, theme toggle (2026-10-07, about 15 min, commit `1da4803`)

- All colour tokens from PLAN.md §8 as CSS variables on `:root` and `.dark`, exposed to Tailwind through `@theme inline` with the default palette removed; the three fonts through `next/font`; `next-themes` with the `ahsan-theme` key and system default; theme-color meta for both schemes; a `ThemeToggle` client component.
- Surprise: the React Compiler lint rule rejects `setState` inside an effect, so the toggle's mounted check uses `useSyncExternalStore`.
- Verification: tokens present in the production CSS, theme script in the HTML, no third-party hosts referenced; Ahsan confirmed both themes on the live site.

## Step 4 - Shell (2026-10-07, about 20 min, commit `9f43f2c`)

- Path bar, dock with `aria-current`, the `Screen` grid (1, 6 and 12 columns; window-filling rows on laptops; fixed rows plus below-the-fold rows on Work), `PromptLine`, `Cursor`, the `Card` and `CardLabel` primitives and the `screens`, `ui` and `identity` content modules; four routes with placeholder cards at their final grid positions. Two client pieces read the URL (`DockItem`, `ScreenName`), recorded in `CLAUDE.md`.
- Verification: all four routes plus the 404 render the right heading, active dock item and screen name; the Work hash ids are present.

## Step 5 - Keyboard navigation and transitions (2026-10-07, about 10 min, commit `00f9a9b`)

- `KeyboardNav` (1 to 4, left and right without wrapping; ignored while typing, with modifier keys, on repeat and while the palette flag is set) and `template.tsx` with a 180ms enter animation disabled under reduced motion.
- Verification: template wrapper and keyframes in the production CSS; Ahsan verified the keys on the live site.

## Step 6 - Content modules and primitives (2026-10-07, about 30 min, commit `ce852aa`)

- The rest of `CONTENT.md` as typed modules (stats, about, experience, projects, stack, education, contact) and the Chip, Button, ExternalLink, StatCard, TerminalBlock and ListRows primitives. Index shows the real stat cards; the Work placeholder shows the chips and the highlights block.
- Verification: an audit script checks every string in the content modules against `CONTENT.md`: 161 strings, 17 not verbatim, all of them import paths, ids, the site URL or the three agreed display derivations (`3 yrs`, `~8 h`, the joined support caption).

## Step 7 - Index screen (2026-10-07, about 25 min, commit `8a7cea2`; fix `ffc06d3`, about 20 min)

- Hero, photo, status and featured cards to the mockup spec, with the phone variant (64px photo in the hero, full-width button pairs, stats two by two). Grid rows changed to `1fr` so a tall card took height from its neighbours instead of overflowing.
- Surprises: headless Chrome refuses windows narrower than about 500px, so the phone screenshots were wrong until the checks moved to the Playwright CLI with the installed Chrome; the first 1366×768 run overflowed by about 12px until card gaps were tightened.
- Ahsan reported an overflow at 1920×880 on his machine and a photo cropped to a strip, and asked for type that scales with viewport height and for the whole head to stay visible. The fix made every display size a text token of the form `clamp(min, min(Xvw, Yvh), max)` and rebuilt the photo card around a top-anchored square crop inside a surface-2 frame. Verified with screenshots at 1920×880, 1920×950, 1536×730, 1440×900 and 1366×768 in both themes.

## Step 8 - Work screen (2026-10-07, about 35 min, commit `7cfe59d`)

- Count, day-job and CV cards; the Creator Match card with two inner columns and the highlights terminal block; projects 02 and 03; the about strip; two role cards with native `<details>` disclosures. Two fixed text tokens (28px and 24px) added.
- Decisions recorded in PLAN.md §11: the count caption is `projects` (project 02 has no year in `CONTENT.md`); the "Client is private" sentence is carried by the `private client` chip rather than a footer, because the footer pushed the card past its row.
- Verification: screenshots at 1920×880, 1440×900, 1366×768 and 390×844 in both themes; the hash deep link scrolls the grid while the bars stay fixed. At 1366×768 the MSc project's description makes row 3 about 40px taller than its third, reached by the same scroll that reaches row 4.
- Ahsan asked for the Index overflow to be parked as a note under step 13 for a by-construction fix.

## Step 9 - Stack screen (2026-10-07, about 10 min, commit `eb7c6bb`)

- Summary card with the commercial and project stack lines, six skill-group list cards with counts and the `learning` note, education card. `Card` gained an `align` option.
- Verification: two equal rows fill the window at 1920×880, 1440×900 and 1366×768 in both themes; phones stack in the spec order.

## Step 10 - Contact screen (2026-10-07, about 10 min, commit `984b555`)

- Hero with "Let's talk." and the amber full stop, email card with a client-side copy button, three link cards that are anchors themselves with the new-tab or download glyph in the label row, the looking-for terminal block and the this-site card.
- Ahsan's rule for the looking-for block: only rows `CONTENT.md` has facts for (role, working, based, visa); no start-date or notice-period row.
- Verification: three rows fill the window at the three laptop sizes in both themes; every link and the copy button checked on production.

## Step 11 - Command palette (2026-10-08, about 40 min, commit `b48ab83`)

- A modal dialog opened by Ctrl K, Meta K, "/" (not while typing) and a path-bar button; closed by Esc, outside click or after running an item. While open the `#shell` wrapper is `inert`, body scroll is locked, Tab cycles between the input and the close button, and focus returns to the opener. Combobox input with `aria-activedescendant` over a grouped listbox: screens, projects (hash deep links, live demo, code), links (email, LinkedIn, GitHub, download CV) and toggle theme. Items and keyword search live in `src/content/palette.ts`.
- Surprise: the React Compiler lint rule also rejects assigning `window.location.href`; `location.assign()` is used instead.
- Verification: a Playwright keyboard script drove the real page: open, aria-modal, inert shell, four-Tab trap, filter ("youtube" finds Creator Match), arrows, Enter to `/work#cyber-security-assessment` with the card in view, "/" and Esc, outside click, focus restored to the button, empty state, theme toggle. 26 of 27 checks passed; the 27th was the script's own expectation string for the focused input.

## Step 12 - Metadata, favicon, 404, README (2026-10-08, about 15 min, commit `9e0940d`)

- Titles from the content modules with a page template, description from the tagline, `metadataBase`, canonical URLs, Open Graph and Twitter tags; an SVG favicon that follows the system colour scheme; a 404 page that prints `cd <path>` with the shell's error line and a link home, served with a 404 status; `robots.ts`, `sitemap.ts`; the README.
- Verification on the production server: per-page titles and canonicals, the social tags, `icon.svg` as image/svg+xml, robots and sitemap, the 404 status.

## Step 13 - Accessibility and performance (2026-10-08, about 25 min, commit `bda0014`)

### What Ahsan decided

- Fix the height overflow by construction: equal `minmax(0, 1fr)` rows, cards with `min-height: 0`, content that fits a short row; verify with a sweep over widths 1920, 1536, 1440 and 1366 and every height from 700 to 1000 in steps of 10 on Index, Stack and Contact.
- Add a 1200×630 Open Graph image generated at build time and switch the Twitter card to `summary_large_image`.
- Check contrast of every text pair in both themes at 4.5:1, reduced motion, and run Lighthouse on all four routes. Keep screenshots in a gitignored `.shots` folder inside the project.

### What Claude Code did

- Cards on the window-filling screens became CSS size containers, with `short` and `short-list` container-query variants: the featured card drops its chips and places its buttons beside the text when its row is short; Stack lists and the summary tighten; the Contact looking-for block took five columns and this-site two.
- `src/app/opengraph-image.tsx` renders the image from two bundled TTFs (Space Grotesk Bold, IBM Plex Mono Regular); `src/lib/tokens.ts` mirrors the dark hex values for it.
- Surprise: the reduced-motion duration override lived inside `@layer base`, where the unlayered token block beat it. Moved out, it took effect.

### Verification

- Sweep (`.shots/sweep.js`): 372 sizes, no scroll and no clipped card, on the local build and again on production.
- Contrast (`.shots/a11y.js`), every visible text element on all four routes in both themes, with the palette open and the roles expanded: 8 to 10 colour pairs per screen, minimum 5.59:1 in light and 6.72:1 in dark, nothing below 4.5:1.
- Reduced motion: cursor and screen-enter animations compute to `none`, the duration tokens to 0. Keyboard walk on Index: ten stops, all with the focus ring.
- Lighthouse on production (Chrome headless), performance / accessibility / best practices / SEO: desktop 100 / 100 / 100 / 100 on all four routes; mobile 92 / 100 / 100 / 100 on `/` and 98 / 100 / 100 / 100 on `/work`, `/stack` and `/contact`. The local build read 95 to 97 on mobile.

## Content correction (2026-10-08, about 10 min, commit `e254ea7`)

- Ahsan: C# is used commercially at EZsoft. `CONTENT.md` now lists C# next to VB.NET without the learning note and adds it to both EZsoft role stack lines; the stack and experience modules follow, which updates the day-job card and the commercial line on the Stack summary card. ASP.NET Core stays marked as learning.
- Verification: no "learning" note next to C# on any route; the content audit unchanged; the sweep still passes 372 sizes.

## Step 14 - Final deploy and handover (2026-10-08, about 15 min)

- Production deployment of the content correction green. All four routes, the 404, `robots.txt`, `sitemap.xml`, the OG image and `cv.pdf` return the expected status codes on production; screenshots of every route and the 404 in both themes saved to `.shots/`. Repo public at https://github.com/ahsanullahdaud/portfolio. README current. Working tree clean after this commit.
- This log written from the session and the git history. No custom domain; `metadataBase` stays the vercel.app address.

## Post-handover: photo in the hero (2026-10-09, about 1 h)

- Ahsan supplied `public/photo-cutout.png` (the portrait with a transparent background) and asked for the Photo card to go: the photo moves into the hero beside the name in a surface-2, line-bordered, card-radius 4:5 frame capped at 230×290, anchored to the bottom with the head fully visible, caption `photo.jpg` below; the frame's top edge aligned with the top of the name and its bottom edge with the bottom of the tagline; buttons on their own row; status moved to columns 7–9 and a new "currently" card in 10–12 (current role title, company, dates from `CONTENT.md`, linking to `/work#ezsoft-2025`); the photo shrinking with the hero on short windows; tablet and phone behaviour kept; `next/image` with `sizes`, `priority` and meaningful alt text.
- Claude Code: the frame width is a layout token, `clamp(140px, 23.5vh, 230px)`; the frame and the text block share a grid row, the block stretching to the frame's height with the name at the top and the tagline at the bottom, so both edges align by construction; the caption sits in the row below; the name is capped by `min(var(--text-name), var(--name-fit))`, where `--name-fit` uses container-query units so the first line never wraps in the narrower column (first attempt subtracted the padding twice, because `cqw` measures the content box). `CurrentlyCard` is a link styled as a card. Phones keep the 64px square, now in the same frame style; tablets show the hero frame instead of the removed card.
- Verification: height sweep 372 sizes pass; `.shots/hero-align.js` measures frame-top-to-name-top and frame-bottom-to-tagline-bottom deltas of 0px and two name lines at 1920×880, 1920×1000, 1536×730, 1440×900, 1440×700, 1366×768, 1366×700 and 768×1024; contrast on Index unchanged (min 5.59:1 light, 6.72:1 dark); screenshots at 1920×880, 1536×730, 1440×900 and 1366×768 in both themes plus tablet and phone frames. `design/MOCKUP_SPEC.md` §4 and §8 and `PLAN.md` §5.1, §5.6, §7, §11 record the change.
- Later the same day (about 20 min): Ahsan asked that "4-hour" in the support caption never break across lines and that other hyphenated terms be checked. A `NoBreak` renderer wraps every hyphenated word in a `whitespace-nowrap` span at render time (CONTENT.md and copied text stay verbatim) and is used on every content string on all four screens, including the LinkedIn handle and the terminal headings. `.shots/hyphens.js` finds no hyphenated word outside a span and no span on more than one line on any route at seven sizes; the sweep still passes.

## Totals

- 17 commits over two sessions; roughly 6.5 hours of build time, plus Ahsan's reviews between steps.
- Dependencies beyond the Next.js scaffold: `next-themes` only. Verification tooling (Playwright CLI, Lighthouse) ran through `npx` and is not a dependency.
