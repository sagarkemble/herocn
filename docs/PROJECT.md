# herocn — project spec for agents

Read this file first in a new chat. It is the source of truth for **what this repo is**. Then open the specialist docs listed at the end if the task touches that area. Do not treat `HANDOFF.md` as current product status; it is a leftover work log.

**Owner:** Sagar Kemble  
**npm package name in `package.json`:** `s2h-landing` (historical; the product is **herocn**)  
**GitHub skills install name:** `sagarkemble/herocn`  
**Live site:** https://herocn.sagarkemble.dev

---

## 1. One-sentence purpose

This is a **Next.js demo app + shadcn registry + agent skills** that restyles **shadcn/ui (Base UI, nova)** so it **looks like HeroUI v3**, without leaving shadcn. Consumers copy source files into their own apps. Nothing is published as an npm component library.

## 2. What this project is (four products in one repo)

| Product | What it is | How people use it |
|---|---|---|
| **Demo site** | Marketing clone of heroui.com plus docs, theme builder, registry catalog | Browse https://herocn.sagarkemble.dev |
| **`@herocn` registry** | shadcn registry JSON at `/r/{name}.json` | `npx shadcn@latest add @herocn/button` after registering the URL |
| **Agent skills** | Cursor/Claude skills in `skills/` (restyle, customize, visualize, taste) | `npx skills add sagarkemble/herocn --skill <name>` or download zips |
| **Preview templates** | Dashboard / mail / chat / finances / CRM shells | Theme page tabs + registry `template-*` items |

This page is also the **design-system preview** of the restyle. `components/ui/*` is the canonical HeroUI-look implementation that the registry ships.

## 3. What this project is not

- Not HeroUI itself. Official HeroUI lives at heroui-inc/heroui (Apache-2.0). We do not ship HeroUI as a dependency.
- Not a fork that swaps Radix/Base UI for HeroUI primitives. **Reskin only:** same files, same exports, same props, different tokens/classes/motion.
- Not an npm package of components. The CLI copies TSX/CSS into the consumer.
- Not a pixel-perfect copy of heroui.com assets. Do **not** copy heroui.com images, logos, or wallpapers. Layout numbers were measured from the live site. Glyphs and wallpapers in this repo are original (SVG + CSS gradients).
- Headline type on heroui.com is commercial Britti Sans / heroSans. We use **Inter Tight** as `--font-display`. Body/UI is **Inter** via `next/font` as `--font-sans`.

## 4. Provenance and licenses

| Source | License | Role |
|---|---|---|
| **herocn** (github.com/Maqed/herocn, MIT, © 2026 Maqed) | MIT | Primary visual source: tokens, class tables, component look. Keep the notice when redistributing. |
| **HeroUI v3.2.7** (`08d4f13`) | Apache-2.0 | Spot-check of look; **theme-builder maths** in `lib/theme-editor/` is a port of HeroUI’s algorithm. Keep `LICENSE-heroui` in skills. |
| **shadcn/ui** nova / Base UI | MIT (upstream) | Primitive library: `@base-ui/react`, style `base-nova` in `components.json`. |
| This demo app | same constraints as above | Original landing measurements, original hero glyphs, original CSS wallpaper gradients. |

Known herocn-vs-HeroUI mismatches: `skills/shadcn-to-heroui/reference/herocn-diff.md`. Prefer herocn values unless a task says otherwise.

## 5. Hard rules (non-negotiable)

1. **Never invent token or colour values.** Use `app/globals.css`, `skills/shadcn-to-heroui/reference/tokens.md`, or the theme engine output. If a value is missing, write **NOT FOUND** and leave the existing value.
2. **Never override skill styles on `components/ui/*` from call sites** for radius, border, shadow, colour, padding, focus, or motion. Layout-only classes (position, width, margin, gap, `hidden`) are fine. If a primitive looks wrong, fix the ui file (and the skill reference), not a one-off `className`.
3. **Never swap the primitive library.** Radix stays Radix; Base UI stays Base UI. This repo is Base UI (`@base-ui/react`).
4. **Never break props or exports** on ui primitives. Do not remove/rename exports, cva keys, or `data-slot`s. Do not change defaults unless a skill note marks a change *safe additive*.
5. **Do not copy heroui.com assets.** HeroUI **repo** files are OK with Apache-2.0 attribution.
6. **No nested interactive elements:** no `<button>` in `<button>`, no `<a>` in `<a>`. Docs/landing previews that look clickable use `inert` plus a stretched trigger (see landing cards).
7. **Do not treat `AGENTS.md` as project spec.** Next.js 16 rewrites that file (`next dev`). Before writing Next.js code, read `node_modules/next/dist/docs/` because this Next is not the training-data Next.
8. **Package manager is Bun**, not npm. Lockfile is `bun.lock`. Consumer-facing CLI examples still use `npx` (shadcn / skills CLIs).
9. Commits use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (see `.cursor/rules/commit-conventions.mdc`). Do not invent “Pass N:” subjects. Only commit when the user asks.
10. **Ask before implementing** if the user only asked a question. `AGENTS.md` currently also says to ask before coding; follow that unless they already asked you to implement.

## 6. Stack

| Layer | Choice |
|---|---|
| Runtime / PM | Bun `1.4.3` (`packageManager` in `package.json`) |
| App | Next.js **16.4.5** App Router, Turbopack, React **19.3.1** |
| Language | TypeScript, `"type": "module"`, path alias `@/*` → repo root |
| CSS | Tailwind **v4**, `@tailwindcss/postcss`, `tw-animate-css`, `shadcn/tailwind.css` |
| UI primitives | shadcn **base-nova**, `@base-ui/react`, CVA, `cn` package re-exported from `lib/utils.ts` |
| Icons | lucide-react; brand marks via `simple-icons` |
| Theming | `next-themes` (`class` on `<html>`), hotkey **D** toggles light/dark (see `components/theme-provider.tsx`) |
| Charts | recharts |
| Syntax highlight | shiki (docs code blocks; colours measured from heroui.com) |
| Registry CLI | `shadcn` package in this repo for `bun run registry:build` |

`components.json`: style `base-nova`, RSC, tsx, CSS variables, lucide, aliases `@/components`, `@/components/ui`, `@/lib/utils`, `@/hooks`.

## 7. Run, scripts, deploy

```bash
bun install
bun run dev          # next dev
bun run build        # prebuild rebuilds skill zips, then next build
bun run start
bun run typecheck
bun run lint
bun run format
bun run skills:build / skills:check / test:skills
bun run registry:generate   # rewrite registry.json from source
bun run registry:build      # generate + shadcn build → public/r/*.json
```

- Skill zip bytes depend on **Bun’s zlib**. After changing skill sources, run `bun run skills:build` (not Node) so `skills:check` stays green.
- Registry CORS: `next.config.ts` sets `Access-Control-Allow-Origin: *` on `/r/:path*` so foreign apps can `shadcn add` from this origin.
- Production host: **Vercel** at herocn.sagarkemble.dev (detected as Bun via `bun.lock`).
- Local registry testing historically used port **3103** (`bunx next start -p 3103`).

## 8. Public routes

| Route | File | Role |
|---|---|---|
| `/` | `app/page.tsx` | Marketing landing (heroui.com-inspired) |
| `/docs` | `app/docs/page.tsx` | Redirects to first component doc |
| `/docs/react/components` | `app/docs/react/components/page.tsx` | Component index |
| `/docs/react/components/[slug]` | `…/[slug]/page.tsx` | One page per ui primitive; static params from `data.json` |
| `/docs/skills` | `app/docs/skills/page.tsx` | Install docs for the published agent skills |
| `/themes` | `app/themes/page.tsx` | Theme builder (URL query = theme state) |
| `/registry` | `app/registry/page.tsx` | Human catalog of registry items |
| `/r/registry.json` | `public/r/registry.json` | Machine catalog |
| `/r/{name}.json` | `public/r/*.json` | One item per file |
| `/skills/<name>.zip` | `public/skills/*.zip` | Downloadable skill bundles |

Root layout (`app/layout.tsx`): Inter + Inter Tight + Geist Mono CSS variables; `ThemeProvider`; `suppressHydrationWarning` on `<html>`.

Docs layout (`app/docs/layout.tsx`) only imports `app/docs/docs.css` and returns `children`. Chrome is `DocsShell`.

## 9. Directory map

```
app/                          Next.js App Router
  globals.css                 Tokens + utilities + landing-only extras
  layout.tsx                  Fonts + ThemeProvider
  page.tsx                    Landing composition
  docs/                       Docs routes + docs.css
  themes/                     Theme builder page + PNG assets
  registry/                   Human registry catalog
components/
  ui/                         64 restyled shadcn primitives (THE design system)
  landing/                    Marketing sections
  docs/                       Docs chrome, examples, previews, loaders
  themes/                     Theme builder UI + templates/
  theme-provider.tsx
hooks/                        use-mobile, use-highlighted-code
lib/
  utils.ts                    export { cn } from "cn"
  skills.ts                   Published skill metadata for /docs/skills
  registry-public.ts          Package-manager command helpers
  highlighter.tsx
  theme-editor/               HeroUI theme maths + URL state + CSS emit
skills/
  shadcn-to-heroui/           Skill: restyle any shadcn app
  heroui-customize/           Skill: apply a theme to an already-restyled app
  visualize-design-system/    Skill: copy landing + theme builder into another app
  heroui-taste/               Skill: HeroUI marketing/docs composition (not ui restyle)
scripts/
  generate-registry.mjs
  build-skills.mjs
  test-theme-script.mjs
registry.json                 Source catalog (commit this)
public/r/                     Built registry JSON (commit this too)
public/skills/                Built zips (commit after bun run skills:build)
handoff/                      Historical pass notes (stale; prefer this file)
```

## 10. Design system (`components/ui`)

**64 files** (also the registry `registry:ui` items):

accordion, alert, alert-dialog, aspect-ratio, attachment, avatar, badge, breadcrumb, bubble, button, button-group, calendar, card, carousel, chart, checkbox, code-block, collapsible, combobox, command, context-menu, dialog, direction, drawer, dropdown-menu, empty, field, hover-card, input, input-group, input-otp, item, kbd, label, marker, menubar, message, message-scroller, native-select, navigation-menu, pagination, popover, progress, questionnaire, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, spinner, surface, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip, trace.

Supporting registry items (not in `components/ui`):

- `style` — tokens, radius scale, `focus-ring`, `focus-field-ring`, `invalid-field-ring(-focus)`, `pressible`, skeleton shimmer
- `utils` — `lib/utils.ts`
- `use-mobile` — sidebar breakpoint hook
- `theme-provider`
- `template-shell`, `template-dashboard`, `template-mail`, `template-chat`, `template-finances`, `template-crm`
- `index` — kit: style + utils + hook + theme-provider + every UI file

### Tokens (mental model)

Defined in `app/globals.css` (`:root` + `.dark` + `@theme inline`).

- **Primitives:** `--snow`, `--eclipse`
- **shadcn mapped:** `--background`, `--foreground`, `--primary`, `--card` (= `--surface`), `--popover`, `--muted`, `--destructive`, `--border`, `--input` (**fill**, not a border colour — never use `border-input` as a stroke), `--ring` (= `--primary`), sidebar, charts
- **herocn extras:** `--default`, `--success`, `--warning`, `--surface` / `-secondary` / `-tertiary`, `--segment`, `*-soft` mixes, `--ease-smooth`, `--ease-out`
- **Radius:** `--radius` (default `0.5rem`) then `--radius-xs` … `--radius-4xl` as multipliers. Cards/buttons tend to `rounded-3xl`; fields `rounded-xl`.
- **Motion:** `pressible` (scale 0.97, 250ms), overlay enter/exit via Base UI `data-starting-style` / `data-ending-style`.
- **Focus:** `focus-ring` on buttons; `focus-field-ring` on fields; invalid uses `invalid-field-ring` / `invalid-field-ring-focus`.

**Button mapping:** stock shadcn `secondary` (grey) ≈ herocn **`tertiary`**. herocn `secondary` is primary-tinted. `destructive-soft` exists for a soft red look.

**Landing-only CSS** (do not ship in `@herocn/style`): `.site-container`, `.section-gap`, `.display-*`, `.lead`, `.wall-*`, `.marquee-y`, `.hero-slot*`, section accent scopes (`.agents-scope`, `.herospace-scope`, `.theme-scope`). Those scopes rematch heroui.com section accents; they are **not** the canonical system colour.

Canonical paste block for other apps: `skills/shadcn-to-heroui/reference/tokens.md` and `reference/motion.md`.

### Styling policy on this demo

`handoff/landing-audit.md` classifies landing `className`s:

- **A** — breaks the skill look (radius/shadow/border/colour on primitives) — fix
- **B** — layout only — OK
- **C** — heroui.com marketing specials (black CTAs, glass toolbars, sized-down mocks) — keep unless asked to make the preview strictly canonical

When adding UI, prefer stock variants/sizes from the ui files. Do not invent new cva keys on a page.

## 11. Landing page

`app/page.tsx` stacks:

`SiteHeader` → `Hero` → `ProPromo` → `TrustedBy` → `Products` → `OpenSource` → `Pro` → `Agents` → `HeroSpace` → `AiTooling` → `Community` → `Testimonials` → `Blog` → `FinalCta` → `SiteFooter` → `FooterMark`

Files live in `components/landing/`. Header wordmark is original bars + “hero” text (no copied logo). Nav includes Themes, Registry, Skills, Docs, GitHub.

## 12. Docs

Goal: preview every restyled component the way heroui.com docs do (web only), without HeroUI’s AI copy-prompt, Web/Native switch, or API tables.

- Catalog: `components/docs/data.json` → typed in `data.ts`
- Sidebar groups: Guides (Agent skills) + Buttons, Forms, Date and Time, Navigation, Overlays, Collections, Controls, Data Display, Feedback, Layout, AI
- Each `[slug]` page: Installation (`ComponentInstall` with pnpm/npm/yarn/bun toggles) → Usage preview → example sections with Preview/Code
- Example TSX: `components/docs/examples/*.tsx` (and `examples-extra/`)
- Per-slug preview maps: `components/docs/previews/<slug>.tsx` loaded via `loaders.ts`
- Chrome: `DocsShell` (264 | article | 228 toc at xl), `DocsSidebar`, `DocsTopbar` (⌘K), `DocsToc`
- Highlight: `components/docs/highlight.ts` (shiki, heroui.com token colours)
- Nested-button rule: previews that wrap interactive components must stay `inert` where the outer control is the Preview/Code toggle

`dynamicParams = false`; `generateStaticParams` from `pages` in `data.json`.

## 13. Theme builder (`/themes`)

Visual + behavioural clone of heroui.com/themes for **our** token names.

| Piece | Path | Job |
|---|---|---|
| Maths | `lib/theme-editor/theme-values.ts`, `generate-theme-colors.ts`, `color.ts`, `compute.ts` | Port of HeroUI algorithm — **do not re-derive** |
| CSS out | `lib/theme-editor/generate-css.ts` | View code panel: `:root` + `.dark` in herocn names |
| URL state | `lib/theme-editor/state.ts` | Query params; defaults omitted; undo via history |
| UI | `components/themes/*` | Builder chrome, sliders, presets, onboarding, code panel, CSS injection |
| Previews | `components/themes/templates/*` | components / dashboard / mail / chat / finances / crm |

Query params: `base`, `chroma`, `fontFamily`, `formRadius`, `hue`, `lightness`, `lockedVariables`, `radius`, `vibrantPalette`.

Presets (`themeIds`): default, sky, lavender, mint, netflix, uber, spotify, coinbase, airbnb, discord, rabbit.

Fonts: Inter, Figtree, Hanken Grotesk, Geist, DM Sans, Public Sans, Google Sans, Bricolage Grotesque, Varela Round, Fraunces, IBM Plex Mono, Fredoka, JetBrains Mono, Instrument Sans.

**Important:** the editor’s Default theme is **computed**. It will not match the **static** herocn tokens in `globals.css` exactly. That is expected. Restoring static herocn look = re-apply `shadcn-to-heroui` token paste, not the Default preset.

`scripts/test-theme-script.mjs` compares `theme-to-css.mjs` (shipped inside the customize skill) to the app’s TS (`generateGlobalsCss(parseState(…))`). Target: 41/41.

## 14. `@herocn` registry

**Template URL:** `https://herocn.sagarkemble.dev/r/{name}.json`  
`{name}` is required. `@herocn/button` → `https://herocn.sagarkemble.dev/r/button.json`.

Bare shadcn names (`button`) still mean **official shadcn**. Always prefix **`@herocn/`**.

Consumer requirements: Tailwind v4, `base-nova`, CSS variables, and:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

Every UI item `registryDependencies` includes `@herocn/style`.

**Maintainer pipeline**

1. Edit `components/ui/*`, tokens in `globals.css` / `scripts/generate-registry.mjs` style block, or templates.
2. `bun run registry:generate` writes `registry.json` (parses imports for npm + registry deps).
3. `bun run registry:build` also runs `shadcn build` → `public/r/*.json`.
4. Commit **both** `registry.json` and `public/r/`, then deploy.

Author string in generated items: `Sagar Kemble`. Homepage: `https://herocn.sagarkemble.dev`.

Human docs: `REGISTRY.md`. Command helpers: `lib/registry-public.ts`.

## 15. Agent skills

Published copies live in `skills/<name>/`. Zips: `public/skills/<name>.zip`, built by `scripts/build-skills.mjs` (also snapshots landing + theme builder into `visualize-design-system/reference/`). Page data: `lib/skills.ts`.

### `shadcn-to-heroui`

Restyle **any** existing shadcn app (Radix or Base UI) to the herocn/HeroUI look. Default path is **class tables**, not overwriting files.

- Reference: `skills/shadcn-to-heroui/reference/` (`tokens.md`, `motion.md`, `components/<name>.md` × 64, `radix-mapping.md`, `heroui-*.md`, `herocn-diff.md`)
- Optional shortcut: if the **target** is Base UI + Tailwind v4 **and** the user accepts overwrite, `npx shadcn@latest add @herocn/<name>`
- Hard rules inside the skill: never invent values; never swap primitives; never break props

There may be a sibling folder `~/Documents/projects/on-going/shadcn-to-heroui` (ungitted research clone). **This repo’s `skills/shadcn-to-heroui` is what we ship.** Do not commit into the sibling folder unless asked.

### `heroui-customize`

Re-theme a project that **already** has `--surface`, `--primary-soft`, `pressible`. One source, asked in chat: `/themes` URL, pasted View code CSS, or preset name.

- `scripts/theme-to-css.mjs` — same CSS as the View code panel (generated from `lib/theme-editor` TS)
- `scripts/merge-tokens.mjs` — in-place merge, HeroUI-raw name map (`--accent` → `--primary`, etc.)
- Never pick a preset for the user. Never hand-type colours.

### `visualize-design-system`

Copy **preview routes** into another shadcn app: `/demo-landing` and/or `/design-system`. Does **not** restyle `components/ui` and does **not** overwrite `/`. Asks first.

### `heroui-taste`

Page **composition** when the kit already looks like HeroUI. Landing, docs chrome, theme playground. Does **not** restyle `components/ui` and does not copy heroui.com assets.

- `skills/heroui-taste/reference/taste.md` — personality, hierarchy, placement, do/don't
- `skills/heroui-taste/reference/pages.md` — home / docs / themes notes from heroui.com
- Official default-theme contract (cite only): https://heroui.com/react/DESIGN.md

## 16. Next.js 16 note

`AGENTS.md` is generated by `next dev`. APIs may differ from older Next. Before new routes, server APIs, or config, read the matching guide under `node_modules/next/dist/docs/` (see `node_modules/next/dist/server/lib/generate-agent-files.js`).

## 17. Verification expectations

When you change UI, layout, tokens, or routes:

- Exercise the flow in the browser (not just a screenshot).
- Check other routes that share the state (theme query, docs nav, header links).
- Light and dark; docs also care about ~390px mobile.
- `bun run typecheck`; for skill/registry work also `bun run test:skills`, `bun run skills:check`, `bun run registry:generate` as appropriate.
- Hunt nested buttons/links and hydration mismatches (`suppressHydrationWarning` is only on `<html>` for theme).

## 18. Related files (read when the task matches)

| File | When |
|---|---|
| `README.md` | Quick start, consumer npx |
| `REGISTRY.md` | Registry protocol and maintainer commands |
| `skills/*/SKILL.md` | Exact procedure those skills must follow |
| `skills/shadcn-to-heroui/reference/*` | Token/class tables |
| `handoff/landing-audit.md` | What counts as a skill-style override |
| `handoff/docs.md`, `handoff/themes.md`, `handoff/skills.md`, `HANDOFF.md` | Historical WIP only |
| `.cursor/rules/commit-conventions.mdc` | Commit message format |

## 19. Typical tasks → where to edit

| User intent | Touch |
|---|---|
| Primitive looks wrong | `components/ui/<name>.tsx` + skill `reference/components/<name>.md` + regenerate registry |
| Token / radius / ring | `app/globals.css` + `scripts/generate-registry.mjs` `style` block + skill `tokens.md` / `motion.md` |
| Docs example | `components/docs/examples/`, `previews/`, maybe `data.json` |
| Landing section | `components/landing/*`, layout-only classes; no ui overrides |
| Theme maths | `lib/theme-editor/*` then `bun run skills:build` (customize script is generated) |
| New registry item | ui or template file + `bun run registry:build` |
| Skill procedure | `skills/<name>/SKILL.md` + `bun run skills:build` |
| Consumer copy on /registry or /docs/skills | `app/registry/page.tsx`, `lib/skills.ts`, `lib/registry-public.ts` |

## 20. Glossary

- **herocn** — MIT restyle of shadcn to HeroUI v3 look; also this product’s registry namespace `@herocn`.
- **HeroUI** — official design system (heroui-inc). We mimic look; we do not depend on their React package.
- **s2h** — “shadcn-to-heroui”; old folder/package name `s2h-landing`.
- **nova / base-nova** — shadcn style using Base UI, not Radix.
- **pressible** — herocn press-scale utility.
- **View code** — CSS dump from `/themes` (herocn token names).
- **NOT FOUND** — required answer when a measured/official value does not exist; do not guess.
