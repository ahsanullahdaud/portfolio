# CLAUDE.md

Personal developer portfolio of Ahsan Ullah Daud. Static Next.js site, terminal / code-editor themed card grid. `PLAN.md` holds the screens, card lists, components, theme tokens and build order. This file holds the rules and the commands.

## Ground rules

1. **`CONTENT.md` is the single source of truth for all text.** Copy it verbatim. Never invent facts, numbers, employers, clients, technologies, dates or links. If something needed is missing, leave it out and raise it as a question instead of filling the gap.
2. **UI chrome strings** (prompt commands, dock labels, card labels, button labels, hints, 404 text) live only in `src/content/ui.ts`. Components never hard-code text; all copy comes from `src/content/*`.
3. **No backend.** No API routes, database, env vars, API keys, analytics, cookies, contact form or third-party scripts. Every route must build as a static page (`○` in the `next build` route table).
4. **Dependencies:** the create-next-app scaffold (next, react, tailwindcss, eslint, typescript) plus `next-themes`. Anything else needs a one-line justification in the commit message. No animation libraries, no icon packs (inline SVG only), no clsx or tailwind-merge (use `src/lib/cn.ts`).
5. **One accent colour (amber).** Components use only the token utilities from `globals.css` (`bg-surface`, `text-accent`, `border-line`, …). Never write a hex value in a component. `ok` is a status colour used on the prompt path, status dots and live tags, not a second accent.
6. **Own identity.** The reference site (mikelmrad.dev) inspired the four-screen structure only. Do not use its fonts (JetBrains Mono, Barlow Condensed), its monochrome near-black / off-white palette, its ALL-CAPS labels, its drag/fling gestures or its wording.
7. **Do not edit `CONTENT.md` to make copy fit.** Change the layout instead.

## Commands

```
npm run dev          # dev server with Turbopack at http://localhost:3000
npm run lint         # eslint
npm run build        # production build; must pass before every push
npx tsc --noEmit     # type check; run after a build, which generates the Next types
npm run start        # serve the production build locally
git push             # pushes main; Vercel redeploys automatically
gh repo view --web   # open the GitHub repo
```

Environment: Windows 10, PowerShell. Node 26.9, npm 11 (no pnpm, do not add a pnpm lockfile), git 2.45, `gh` 2.102 logged in as `ahsanullahdaud`. No Vercel CLI; deployment is the Vercel GitHub integration on `main`.

## Deploy

- Repo: `https://github.com/ahsanullahdaud/portfolio` (public).
- Production URL: https://ahsanullahdaud.vercel.app
- Every push to `main` deploys. Pull-request branches get preview URLs. No environment variables exist or are needed.

## Repo layout

```
CONTENT.md            source of truth for text (read-only during development)
PLAN.md               plan; update it when a decision changes
CLAUDE.md             this file
public/photo.jpg      433×577 portrait, used by next/image
public/cv.pdf         two-page CV, served as a download
src/app/              routes: / (Index), /work, /stack, /contact, not-found, layout, template, globals.css, icon.svg, robots.ts, sitemap.ts
src/components/shell/ PathBar, PaletteButton, ScreenName, Dock, DockItem, useScreen, ThemeToggle, KeyboardNav, CommandPalette, Screen, PromptLine, Cursor
src/components/cards/ Card, CardLabel, Chip, StatCard and one component per card type
src/components/ui/    Button, ExternalLink
src/content/          typed content modules transcribed from CONTENT.md, plus screens.ts, ui.ts, palette.ts
src/lib/              cn.ts, keys.ts
```

## Conventions

**TypeScript.** Strict mode. No `any`, no non-null assertions without a comment. Content modules are typed against `src/content/types.ts` and export plain objects and arrays.

**Components.** Server components by default. `'use client'` only where the browser is needed: `ThemeToggle`, `KeyboardNav`, `CommandPalette`, `PaletteButton`, `CopyButton`, and the two pieces that read the URL, `DockItem` and `ScreenName` (through the `useScreen` hook). Keep client components leaf-sized and pass content in as props. One component per file, PascalCase file names, props typed inline above the component. Hooks are `useX.ts`.

**Routing.** Four pages plus 404. Navigation uses `next/link` for anchors and `router.push` for keyboard and palette navigation so URLs stay real. The active dock item has `aria-current="page"`. Hash ids on Work cards (`creator-match`, `price-comparison`, `cyber-security-assessment`, `ezsoft-2025`, `ezsoft-2021`) are stable; do not rename them.

**Styling.** Tailwind CSS 4 utilities only. Tokens are CSS variables on `:root` and `.dark` in `globals.css`, exposed through `@theme inline`. Dark mode is class-based via `@custom-variant dark (&:where(.dark, .dark *))`. No CSS modules, no styled-jsx, no inline style objects except for values that are genuinely dynamic. Keyframes live in `globals.css`.

**Fonts.** `next/font/google` only, loaded once in `layout.tsx`, exposed as `--font-mono` (IBM Plex Mono), `--font-display` (Space Grotesk 700) and `--font-sans` (IBM Plex Sans), all with `display: 'swap'`. Mono for labels, prompts, path bar, dock, chips, buttons and code. Display for the name, project titles, stat values and the Contact heading. Sans for paragraphs and bullets. Never load a font from a CDN.

**Images.** `next/image` with explicit `width` and `height`. The photo is `priority` on Index only.

**Links.** External links go through `<ExternalLink>`: `target="_blank"`, `rel="noopener noreferrer"`, a trailing `↗` with `aria-hidden`, and an sr-only "(opens in new tab)". The CV link uses the `download` attribute. The email link is `mailto:`.

**Accessibility.** Visible `:focus-visible` ring (accent, 2px, 2px offset) everywhere. Every icon-only button has an `aria-label`. One `<h1>` per screen (the prompt heading), card titles are `<h2>`. Decorative glyphs (`▍`, `//`, `↗`, the status dot) are `aria-hidden` and never the only carrier of meaning. The palette is a focus-trapped `role="dialog"` with `aria-modal`. Keyboard shortcuts never fire while the target is an input, textarea or contenteditable. `prefers-reduced-motion: reduce` disables every transition and the cursor blink. Text contrast ≥ 4.5:1 in both themes (token table in PLAN.md §8).

**Motion.** CSS only, transform and opacity only, 200ms or less, using `--ease`, `--dur-1`, `--dur-2`.

**Content edits.** When `CONTENT.md` changes, update the matching `src/content/*.ts` module in the same commit and nothing else.

**Commits.** Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `a11y:`, `perf:`. One PLAN.md step per commit where practical. Imperative subject under 72 characters. End every commit message with the attribution trailer given for the session.

## Keyboard map

Keep this table, PLAN.md §4 and `src/lib/keys.ts` in sync.

| Key | Action |
|---|---|
| `1` `2` `3` `4` | Index / Work / Stack / Contact |
| `←` `→` | previous / next screen, no wrap |
| `Ctrl K`, `⌘ K`, `/` | open command palette |
| `Esc` | close palette |
| `↑` `↓` `Enter` | move / run inside the palette |

## Definition of done for every step

- `npm run lint`, `npm run build`, then `npx tsc --noEmit` pass with no warnings introduced (the type check needs the types a build generates).
- Checked in Chrome at 1366×768 and 390×844, light and dark, with reduced motion once.
- Keyboard-only walk of whatever changed; focus is visible at every stop.
- No new runtime requests to third parties (check the Network tab).
- Committed and pushed; the Vercel deployment is green.

## Do not

- Do not add a contact form, analytics, env vars, API routes or a database.
- Do not paraphrase, shorten or "improve" text from `CONTENT.md`.
- Do not introduce a second accent colour or any raw hex in components.
- Do not store the theme anywhere other than the `ahsan-theme` localStorage key that `next-themes` manages.
- Do not use `git push --force`, amend pushed commits, or skip hooks.
