---
name: visualize-design-system
description: Add optional preview routes to a shadcn/ui app — a demo marketing landing at /demo-landing and/or a live design-system theme builder at /design-system (dashboard, mail, chat, finances, CRM). Use when the user wants a design system page, theme playground, component showcase, demo landing, or to visualize how their shadcn registry looks. Works with any shadcn registry (herocn, official, custom).
---

# Visualize a shadcn design system

Copies two optional **preview apps** from herocn into the user's project. Does **not** restyle `components/ui`. Does **not** replace the homepage.

Live reference: https://herocn.sagarkemble.dev (landing = `/`, theme builder = `/themes`). In the consumer app the routes are `/demo-landing` and `/design-system`.

Looks closest on HeroUI/herocn tokens (`--surface`, `--default`, `pressible`, Button `tertiary`). On other registries, still copy; missing tokens/variants are listed, never invented.

## Files

| Path | Use |
|---|---|
| `reference/demo-landing/` | Marketing landing (`app/page.tsx` + `components/landing/*` + landing CSS) |
| `reference/design-system/` | Theme builder (`app/themes` → `app/design-system`, `components/themes`, `lib/theme-editor`) |
| `LICENSE-herocn` | MIT, © 2026 Maqed — copied landing/theme UI classes |
| `LICENSE-heroui` | Apache-2.0 — theme maths and preset PNG gradients |

`$S` = this skill folder.

## Hard rules

1. **Ask first.** Never add either route until the user answers the prompt in step 2.
2. **Do not overwrite `/`.** Landing goes to `/demo-landing` only. Design system goes to `/design-system` only.
3. **Do not edit `components/ui/*`** except to `shadcn add` missing primitives the pages import.
4. **Never invent token values.** If `--surface` / `tertiary` / `pressible` are missing, keep the copied classes and report them. Suggest `shadcn-to-heroui` for the HeroUI look; do not hand-paint colors.
5. **Next.js App Router only.** If the app is Pages Router or Vite, stop those routes and report NOT FOUND.
6. Copy files **verbatim** from `reference/`, then apply only the rewrites in step 4.

## Procedure

### 1. Detect the project
- Read `package.json` and `components.json`. Need Tailwind v4 and a `components/ui` folder.
- App Router: `app/` or `src/app/`. If neither, skip both routes (NOT FOUND).
- Note `aliases.utils` (usually `@/lib/utils`) and whether `cn` is a package or `export function cn` in utils.
- HeroUI-styled if globals.css has `--surface`, `--primary-soft`, and `@utility pressible`. Record yes/no.
- List existing `components/ui/*.tsx` names.

### 2. Ask (one message, wait)
> I can add two optional preview routes (any shadcn registry; closest match with HeroUI/herocn tokens):
> 1. Demo landing at `/demo-landing` — marketing page with header, hero, product walls, and mock UIs.
> 2. Design system at `/design-system` — theme builder (color, radius, font) plus Dashboard, Mail, Chat, Finances, and CRM templates.
> Which should I add? Both, landing only, design system only, or neither.

If the user already asked for one or both, skip the ask. If neither, stop and report that nothing was added.

If `app/demo-landing` or `app/design-system` already exists, ask before overwriting.

### 3. Missing UI primitives
Union of imports from the routes you will add (from `reference/`). `shadcn add` only names that are **not** in `components/ui`. Use the project's default registry (do not force `@herocn/` unless `components.json` already has it).

**Landing:** accordion, avatar, badge, button, calendar, card, chart, checkbox, command, input, input-group, kbd, label, navigation-menu, progress, select, separator, sheet, slider, switch, table, tabs, toggle-group, tooltip.

**Design system:** alert, alert-dialog, avatar, badge, bubble, button, card, chart, checkbox, code-block, dialog, drawer, dropdown-menu, field, input, input-group, input-otp, item, kbd, label, message, popover, progress, radio-group, scroll-area, select, separator, sheet, slider, spinner, surface, switch, table, tabs, toast, tooltip.

Also: `next-themes` + a ThemeProvider wrapping the app; `lucide-react`; landing needs `simple-icons`. `recharts` if chart is added. Install packages the CLI does not.

If `shadcn add` has no `bubble` / `message` / `surface` / `code-block` on the official registry, skip those templates' extra files only after trying; report NOT FOUND. Do not write fake components.

### 4. Copy
`APP` = `app` or `src/app`. Keep `@/` aliases.

**Landing** (`reference/demo-landing/`):
- `components/landing/*` → `components/landing/`
- `page.tsx` → `$APP/demo-landing/page.tsx`
- Append `landing.css` to the global CSS file (`components.json` → `tailwind.css`) if those utilities (`.display-statement`, `.wall-blue`, `.hero-slot`, `.marquee-y`) are missing. Do not replace `:root` tokens.
- In root layout, add Inter Tight as `--font-display` if missing (`next/font/google`, `variable: "--font-display"`, put the class on `<html>`). If `next/font` is unavailable, set `--font-display: var(--font-sans)` in CSS and report it.
- Rewrite `from "cn"` to `from "<aliases.utils>"` when the project has no `cn` package.
- In `components/landing/header.tsx`, point Themes to `/design-system` if that route was added, else `#`. Point Docs / Registry / Skills at `#` unless those routes exist.

**Design system** (`reference/design-system/`):
- `lib/theme-editor/*` → `lib/theme-editor/`
- `components/themes/*` → `components/themes/`
- `app/themes/*` → `$APP/design-system/` (page + `assets/` PNGs)
- Imports already use `@/app/design-system/assets`. Rewrite `from "cn"` the same way as landing.
- In `components/themes/builder-header.tsx`, set the wordmark `href` to `/demo-landing` if landing was added, else `/`.
- Page must stay wrapped in `<Suspense>` (URL theme state).

Preset PNGs are Apache-2.0 (HeroUI theme-builder gradients, no logos). Keep `LICENSE-heroui` in the skill; mention it in the report.

### 5. Verify
- `npx tsc --noEmit` and the project build. Fix only errors you introduced.
- Open `/demo-landing` and/or `/design-system`. Switching templates and a color slider must work on the design system. Do not require the landing to match heroui.com pixel-for-pixel on a non-herocn theme.

### 6. Report
Which routes were added, HeroUI-styled yes/no, primitives installed, `cn` rewrites, header link rewrites, NOT FOUND items, build/typecheck.

## License
Landing/theme chrome uses herocn (MIT, © 2026 Maqed). Theme engine and preset thumbs: HeroUI Apache-2.0 (`LICENSE-heroui`). Keep both notices when redistributing the copied files.
