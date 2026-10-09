# Mockup spec: what the approved mockups look like

This file describes the design mockups the owner reviewed and approved. Where it disagrees with PLAN.md sections 5 and 8, this file wins for layout, sizes and colours. PLAN.md still wins for content rules, components, keyboard map, accessibility and build order. All text comes from CONTENT.md.

## 1. Colours (cool blue-black neutrals, not warm brown)

| Token | Dark | Light | Used for |
|---|---|---|---|
| bg | #0D1117 | #EDF0F3 | page background |
| surface | #151B23 | #FFFFFF | cards, path bar, dock items |
| surface-2 | #10161D | #F4F6F8 | inset areas: photo frame, terminal blocks |
| line | #2A3441 | #CCD4DD | 1px borders |
| line-soft | #222B36 | #E1E6EB | row dividers inside cards |
| fg | #E8EDF2 | #10161D | headings, primary text |
| fg-2 | #C9D3DD | #2C3742 | paragraphs |
| muted | #94A3B3 | #55606E | labels, secondary text |
| accent | #F2B544 | #F2B544 as a fill; #8A5200 as text | cursor, prompt `$`, active dock item, primary buttons, featured card border |
| accent-fg | #0D1117 | #10161D | text on amber fills |
| ok | #56D4B8 | #0B6B5C | the `~/ahsan` part of the prompt, the status dot, the "live" tag |

Notes:
- In the light theme, amber is never used as text on white (poor contrast). Amber text becomes #8A5200; amber fills keep dark text. The primary "view work" button and the active dock item are dark (#10161D) with white text in light mode.
- `ok` is a small status colour, not a second accent. It appears only on the prompt path, the "open to roles" dot and "live" tags.
- Confirm all text pairs meet 4.5:1 in step 13 and adjust shades if needed.

## 2. Type

- Labels, prompts, path bar, dock, chips, buttons: IBM Plex Mono. Card labels are 11px, uppercase, letter-spacing 0.08em, muted.
- Display (name, project titles, stat numbers, "Let's talk."): Space Grotesk 700, tight tracking (-0.01em to -0.03em).
- Paragraphs: IBM Plex Sans.

Display sizes at a 1440×900 window (scale down fluidly with `clamp()` for smaller windows; these are the maximums):

| Element | Size |
|---|---|
| Name on Index | 76px, line-height 0.98, two lines: "Ahsan Ullah" / "Daud" followed by the block cursor |
| "Let's talk." on Contact | 120px, line-height 0.92, two lines, amber full stop |
| Creator Match title on Work | 64px, two lines |
| Creator Match title on Index | 40px |
| Stat numbers | 56px |
| Project titles 02 and 03, role titles | 24px to 28px |
| Tagline and Contact sub-line | 20px Space Grotesk 500 or IBM Plex Sans, fg-2 |

The large display type is the main visual character of the design. Do not reduce the name to a normal heading size.

## 3. Shell

- Page padding 20px; gap between path bar, grid and dock 12px; grid gap 12px.
- Path bar: 44px high, a surface card with 10px radius. Left: a 10px amber dot, `~/ahsan/portfolio`, then the current screen name in fg. Right: "press [Ctrl K] for commands" and the theme toggle.
- Dock: centred row of four items, each 44px high, 8px radius, showing the number then the label (`1 index`, `2 work`, `3 stack`, `4 contact`). Active item: amber fill, dark bold text. Others: surface with a line border; the number is muted.
- Cards: surface background, 1px line border, 10px radius, 20px padding (32px on the two hero cards). Most cards are a flex column with the label at the top and the main content at the bottom (`justify-content: space-between`).
- The block cursor is a solid amber rectangle about 0.3em wide and 0.8em tall after the last word; it blinks.
- Each screen's first card starts with the prompt line, for example `~/ahsan $ whoami`, with `~/ahsan` in `ok` and `$` in amber. The prompt sits inside the first card, not as a separate heading above the grid.

## 4. Index (12 columns × 3 equal rows, fills the window)

| Card | Columns | Rows | Content |
|---|---|---|---|
| Hero | 1–6 | 1–2 | Prompt line at top. Left: name (76px) with cursor, title in amber mono 16px, tagline 20px. Right (revised 2026-10-09): the photo as a transparent cutout (`photo-cutout.png`, 433×577) in a frame with `surface-2` background, 1px `line` border, card radius and a 3:4 ratio (the photo's own, so it fills the frame edge to edge; revised 2026-10-09), at most 230px wide so it stays sharp at 2x, shrinking with the window height. The photo is anchored to the bottom of the frame with the head fully visible. The frame's top edge aligns with the top of the name and its bottom edge with the bottom of the tagline; caption `photo.jpg` in muted mono below the frame, not overlaid. Bottom row: primary button `./view-work` → /work, secondary `download cv.pdf`. |
| Status | 7–9 | 1 | Label `status`. `ok` dot + "Open to roles" in display 30px. Three muted lines: location, UK eligibility, hybrid. (Was 10–12; the separate Photo card is removed, revised 2026-10-09.) |
| Currently | 10–12 | 1 | Label `currently`. The current role from CONTENT.md: title in display 24px, company, dates in muted mono. The whole card links to /work#ezsoft-2025. (Added 2026-10-09.) |
| Featured | 7–12 | 2 | Amber 1px border. Label row: `featured project` left, `live` in `ok` right. "Creator Match" 40px. One-line description. Bottom row: four chips left; `live demo` (primary) and `code` (secondary) right. |
| Stat × 4 | 3 cols each | 3 | Label top, 56px number, one muted line. Stats: `3 yrs`, `10+`, `~8 h`, `158`. |

The About text from PLAN.md 5.1 does not have its own card on Index in the mockup. If it must appear, put it on Work or behind the hero tagline; do not shrink the hero to fit it. The 4-hour response target is folded into the `10+` card's caption.

## 5. Work (12 columns × 3 rows; scrolls inside the screen when roles expand)

| Card | Columns | Rows | Content |
|---|---|---|---|
| Count | 1–3 | 1 | Prompt `~/ahsan $ ls projects/`. "03" in display 64px, caption "projects, 2024 to 2026". |
| Day job | 1–3 | 2 | Label `day job`. Current role title, dates, one-line stack. Links to the role cards below. |
| CV | 1–3 | 3 | Label `curriculum vitae`. "2026 CV" in display 44px, `download cv.pdf` button. |
| Creator Match | 4–12 | 1–2 | Amber border, two inner columns. Left: label row `work / 01 · 2026 · live`, title 64px on two lines, description, chips, `live demo` and `view code` buttons. Right: an inset terminal block (`surface-2`) headed `$ cat highlights.md` with the six highlights, each prefixed by a `+` in `ok`. |
| Project 02 | 4–8 | 3 | Label `work / 02 · client project`, title 28px, description, chips `React` and `private client`. |
| Project 03 | 9–12 | 3 | Label `work / 03 · 2024, MSc`, title 24px, description, chips. |
| Role cards × 2 | 6 cols each | below | As PLAN.md 5.2 rows 4 and 5 (expandable). These sit below the first three rows and are reached by scrolling. |

## 6. Stack (12 columns × 2 equal rows)

| Card | Columns | Rows | Content |
|---|---|---|---|
| Summary | 1–3 | 1 | Prompt `~/ahsan $ cat stack.json`. "6" in display 64px, caption "categories". Two lines: commercial stack and project stack. |
| Education | 1–3 | 2 | Label `education`. Two entries, each a 24px display title with muted detail lines. |
| Skill group × 6 | 3 cols each | 1–2 | Three per row. Label row: group name left, item count in amber right (`06`). Items as a list of rows separated by `line-soft` dividers, 14px, with a muted `learning` note on the right where it applies. Lists, not chips. |

The AI-first card from PLAN.md 5.3 can be added as a seventh card below if space allows; the six groups and education take priority.

## 7. Contact (12 columns × 3 rows)

| Card | Columns | Rows | Content |
|---|---|---|---|
| Hero | 1–5 | 1–3 | Prompt `~/ahsan $ ./contact`. "Let's talk." 120px on two lines. Sub-line 20px. Bottom: `ok` dot + availability line. |
| Email | 6–12 | 1 | Amber border. Label row `direct` / `click to copy`. The email address in display 40px as a mailto link. |
| LinkedIn | 6–8 | 2 | Whole card is a link. Label `01 / profile`, "LinkedIn" 32px, handle in muted mono. |
| GitHub | 9–10 | 2 | Label `02 / code`, "GitHub" 32px, handle. |
| CV | 11–12 | 2 | Label `03 / download`, "CV" 32px, `cv.pdf`. |
| Looking for | 6–9 | 3 | Inset terminal block: `$ ahsan --looking-for` then aligned key/value rows (role, where, based) with keys in `ok`. Use only facts from CONTENT.md. |
| This site | 10–12 | 3 | Label `this site`. Three lines: built with Claude Code; Next.js, TypeScript, Tailwind; hosted on Vercel. Copyright line. |

## 8. Phone (below 640px)

One column, 12px page padding, 10px gaps. Order on Index: path bar, hero (photo as a 64px square at the top right of the hero card, name 46px), status, currently, featured, then stats in a 2×2 grid. From 640px up to 1023px the hero shows the framed photo beside the name, as on laptops (revised 2026-10-09). Buttons are full width in pairs, 48px high. The dock becomes a single rounded bar pinned to the bottom with four equal items, labels only.
