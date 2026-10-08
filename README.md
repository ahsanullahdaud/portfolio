# Ahsan Ullah Daud — portfolio

Personal developer portfolio: a terminal / code-editor themed card grid with four screens (Index, Work, Stack, Contact), keyboard navigation, a command palette and light / dark themes.

Live: https://ahsanullahdaud.vercel.app

## Stack

- Next.js 16 (App Router, fully static output), React 19, TypeScript
- Tailwind CSS 4 with design tokens as CSS variables (`src/app/globals.css`)
- `next-themes` for the persisted theme (system default)
- Fonts through `next/font`: IBM Plex Mono, IBM Plex Sans, Space Grotesk
- No backend, database, analytics, env vars or third-party scripts

## Scripts

```
npm run dev        # dev server at http://localhost:3000
npm run lint       # eslint
npm run build      # production build (all routes static)
npx tsc --noEmit   # type check; run after a build
npm run start      # serve the production build
```

## Structure

```
CONTENT.md             single source of truth for all text
PLAN.md, CLAUDE.md     plan, conventions and commands
BUILD_LOG.md           how it was built: the 14 steps, decisions, verification results
design/MOCKUP_SPEC.md  the approved mockups, described
src/app/               routes, layout, template, 404, favicon, robots, sitemap
src/components/shell/  path bar, dock, screen grid, prompt line, palette, keyboard nav
src/components/cards/  card primitives and one component per card
src/components/ui/     Button, ExternalLink
src/content/           typed content transcribed from CONTENT.md, UI strings, palette items
src/lib/               cn(), keyboard map
```

## Keyboard

| Key | Action |
|---|---|
| `1` `2` `3` `4` | Index / Work / Stack / Contact |
| `←` `→` | previous / next screen |
| `Ctrl K`, `⌘ K`, `/` | command palette |
| `Esc` | close the palette |

## Deploy

Every push to `main` deploys to Vercel.
