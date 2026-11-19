# Phase B: herocn vs HeroUI v3.2.7 spot-check

herocn commit `be08ffc` (2026-11-18) vs `@heroui/styles` **v3.2.7** (heroui-inc/heroui `08d4f13`).
HeroUI files: `heroui-inc/heroui:packages/styles/components/{button,input,card,modal,close-button,select,list-box-item,tabs}.css`, `themes/default/variables.css`, `themes/shared/theme.css`, `utilities/index.css`.
herocn files: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/{button,input,card,dialog,select,tabs}.tsx`, `apps/docs/src/app/theme.css`.

Labels:
- **wrong**: herocn's value differs from HeroUI for the same thing.
- **herocn-only**: herocn adds something HeroUI doesn't have. Not wrong, just not HeroUI.

## Verdict

Each component was checked on five axes: radius, sizes, colors, states (focus/invalid/disabled), and motion (durations and enter/exit values).

| Component | Radius | Sizes | Colors | States | Motion | Core match? |
|---|---|---|---|---|---|---|
| Button | ✓ 24px `rounded-3xl` | ✓ desktop heights 32/36/40 (✗ mobile) | ✓ variant bg/fg tokens (✗ hover technique) | ✓ focus-ring / disabled 50% | ≈ same transition list, scale 0.97 (✗ effective timing, sm/lg scales) | **yes** |
| Input | ✓ 12px | ✓ min-h-9 / py-2 / px-3 at md | ✓ bg white / 0.2103, secondary = default | ✓ focus-field-ring, invalid outline/ring, disabled 50% | ✓ | **yes** |
| Card | ✓ 24px | ✓ p-4 gap-3 | ✓ surface variants | n/a | n/a | **yes** |
| Dialog | ✓ 24px | ✓ p-6, max-w-md, header gap-3 | ✓ surface bg, backdrop 50%/60%, blur | ✓ | ✓ 150/100 backdrop, 250/100 popup, scale 1.05 → 0.95 (✗ easing) | **yes** |
| Select | ✓ trigger 12px (✗ popover 24 vs 22, item radius) | ✓ min-h-9 px-3 py-2 | ✓ trigger bg, item hover | ✓ focus-ring, invalid | ✓ 150ms, scale 0.95, side offset, chevron rotate | **yes** |
| Tabs | ✓ list `radius-2xl + 4px` = 20px, triggers 24px | ✓ p-1, h-8, px-4 | ✓ list `bg-default`, indicator `bg-segment`, active `segment-foreground` | ✓ focus-ring | ≈ indicator 200 vs 250ms | **yes** |

**Result: 6 of 6 match on core design.** That's above the 5/6 threshold, so herocn is trusted for the other 58 components.
**Mismatches found: 48** (37 *wrong*, 11 *herocn-only*): 39 in the six components (29 wrong, 10 herocn-only) plus 9 token-level rows (8 wrong, 1 herocn-only). Most of the "wrong" items are **systemic** and repeat across components:
1. **Elevation**: herocn uses Tailwind `shadow-xs` / `shadow-sm` / `drop-shadow-xl` / `ring-1 ring-foreground/5`. HeroUI uses its multi-layer `--field-shadow` / `--surface-shadow` / `--overlay-shadow`, which drop to none (fields, surface) or change in dark mode.
2. **Hover technique**: herocn uses `brightness-*` filters and `/80`, `/90` opacity. HeroUI uses `color-mix` `*-hover` tokens.
3. **Easing**: herocn uses `cubic-bezier(0.22,1,0.36,1)` everywhere. HeroUI uses `ease` (`--ease-smooth`) / `--ease-out` / `--ease-out-fluid`.
4. **Mobile sizing**: HeroUI makes buttons and fields 4px taller, uses `text-base`, and makes icons larger below `md`/`sm`. herocn uses desktop sizes everywhere (inputs keep a smaller mobile padding).

Per the task (herocn = primary), the skill applies herocn's classes verbatim and doesn't patch these. They're listed so the user can decide on a later "HeroUI-exact" pass. Raw HeroUI values are in `reference/heroui-tokens.md` and `reference/heroui-motion.md`.

## Mismatches

### Tokens (theme.css vs HeroUI variables.css)

| # | Item | herocn | HeroUI v3.2.7 | Label |
|---|---|---|---|---|
| T1 | `--foreground` light | `oklch(0.141 0.005 285.823)` | `var(--eclipse)` = `oklch(0.2103 0.0059 285.89)` | wrong |
| T2 | `--foreground` dark | `oklch(0.985 0 0)` | `var(--snow)` = `oklch(0.9911 0 0)` | wrong |
| T3 | `--primary-foreground` | `oklch(0.97 0.014 254.604)` | `--accent-foreground: var(--snow)` | wrong |
| T4 | `--background` dark | `oklch(0.1228 0.0029 285.97)` | `oklch(12% 0.005 285.823)` | wrong (near-identical) |
| T5 | `--muted-foreground` light | `oklch(0.552 0.016 285.938)` | `--muted: oklch(0.5517 0.0138 285.94)` | wrong (near-identical) |
| T6 | `--segment` light | `var(--snow)` | `var(--white)` | wrong |
| T7 | `--secondary` light `oklch(0.967 0.001 286.375)`, `--chart-*`, `--sidebar-*` | defined | no HeroUI equivalent | herocn-only |
| T8 | Missing HeroUI tokens: `*-hover`, `*-soft-hover`, `--field-*`, `--overlay*`, `--separator*`, `--border-secondary/tertiary`, shadows, `--backdrop`, `--disabled-opacity`, cursors, `--ease-*` | absent | defined | wrong (missing) |
| T9 | `--ease-smooth` used by `pressible` but not shipped in registry CSS (only in docs `global.css` as `cubic-bezier(0.22, 1, 0.36, 1)`; HeroUI: `ease`) | undefined | `ease` | wrong |

### Button

| # | Item | herocn | HeroUI v3.2.7 | Label |
|---|---|---|---|---|
| B1 | Mobile heights | fixed `h-9` / sm `h-8` / lg `h-10` | `h-10 md:h-9` / `h-9 md:h-8` / `h-11 md:h-10`; icon-only widths likewise | wrong |
| B2 | Press scale per size | `active:scale-[0.97]` for all sizes | 0.97, sm **0.98**, lg **0.96** | wrong |
| B3 | Effective press transition | `transition-all` overrides `pressible` → all props 150ms `cubic-bezier(0.4,0,0.2,1)`; and `scale` property isn't in pressible's `transform` list (see `compile-check/pressible.md`) | `transform 250ms ease`, bg 100ms, shadow 100ms | wrong |
| B4 | Hover/pressed colors | primary `hover:bg-primary/80`; secondary/tertiary `hover:brightness-95` (`dark:hover:brightness-110`); destructive `/90`, active `/80` | `--accent-hover`, `--default-hover`, `--danger-hover` (color-mix tokens) | wrong (technique) |
| B5 | Outline hover | `hover:bg-muted` (= default 100%) | `color-mix(in srgb, var(--default) 60%, transparent)` | wrong |
| B6 | Icon size | default `size-4`; sm `size-3.5`; icon `size-5` | `size-5 sm:size-4`; sm `size-4` | wrong |
| B7 | `aria-disabled:opacity-70` | 70% | `status-disabled` 50% | wrong |
| B8 | `xs` (`h-7`) and `icon-xs` (`size-7`) sizes | present | absent | herocn-only |
| B9 | `aria-expanded:scale-[0.97]` (pressed look while menu open), `has-data-[icon=inline-*]` padding | present | absent | herocn-only |
| B10 | `link` variant (`text-primary underline-offset-4 hover:underline`) | present | not a Button variant (HeroUI `Link` component) | herocn-only |
| B11 | `destructive` focus ring `focus-visible:ring-destructive` | destructive ring | focus color always `--focus` | herocn-only |

### Input

| # | Item | herocn | HeroUI v3.2.7 | Label |
|---|---|---|---|---|
| I1 | Mobile padding/font | `px-2.5 py-1.5 text-sm md:px-3 md:py-2` | `px-3 py-2 text-base sm:text-sm` | wrong |
| I2 | Shadow | `shadow-xs` (light **and** dark, `dark:brightness-100`) | `--field-shadow` 3-layer; dark: none | wrong |
| I3 | Hover | `hover:brightness-97` / `dark:hover:brightness-110` | `--field-background-hover` (color-mix) | wrong (technique) |
| I4 | Transition list | `transition-[background-color,box-shadow,opacity,filter]` (Tailwind default 150ms ease) | `background-color 150ms var(--ease-smooth), border-color …, box-shadow …` | wrong (minor) |

### Card

| # | Item | herocn | HeroUI v3.2.7 | Label |
|---|---|---|---|---|
| C1 | Elevation | `shadow-sm` (also in dark) | `shadow-surface` (dark: none) | wrong |
| C2 | Overflow | `overflow-hidden` | `overflow-visible` | wrong |
| C3 | Root text | `text-sm` on root | none on root | herocn-only |
| C4 | Header `gap-1`; Footer `rounded-b-xl border-t py-4`; `size="sm"` | present | header `flex-col`, footer `flex-row items-center`, no size | herocn-only |
| C5 | Description color | `text-muted-foreground` | `text-muted` (same role) | — (match, naming only) |

### Dialog (HeroUI Modal)

| # | Item | herocn | HeroUI v3.2.7 | Label |
|---|---|---|---|---|
| D1 | Elevation | `ring-1 ring-foreground/5`, no shadow | `shadow-overlay` | wrong |
| D2 | Easing | `ease-[cubic-bezier(0.22,1,0.36,1)]` | `heroui-overlay-*` keyframes, `var(--ease-smooth)` = ease (see heroui-motion.md) | wrong |
| D3 | Section spacing | `gap-5` between all sections | header→body `mt-2`, body→footer `mt-5`, header→footer `mt-5` | wrong |
| D4 | Close (X) button | `<Button variant="tertiary" size="icon-xs">` → 28px, `rounded-3xl`, `text-default-foreground`, scale 0.97 | `.close-button` 24px, `rounded-xl`, `bg-default text-muted`, svg `size-4`, scale 0.93, `transform 250ms var(--ease-out-quart)` | wrong |
| D5 | Placement | always centred | `auto`: bottom on mobile, centred `sm+` | wrong (decision: **stays centred**) |
| D6 | Starting translate `translate-y-[calc(-50%+0.25rem)]` | present | keyframe zoom only | herocn-only |
| D7 | Nested dialog stacking (`--nested-dialogs`, `data-nested-dialog-open`) | present | absent | herocn-only |
| D8 | Footer close button `variant="outline"` | present | n/a | herocn-only (decision: keep herocn) |

### Select

| # | Item | herocn | HeroUI v3.2.7 | Label |
|---|---|---|---|---|
| S1 | Trigger shadow | `shadow-xs` | `shadow-field` | wrong |
| S2 | Trigger weight | `font-medium` | normal; value `text-base sm:text-sm` | wrong |
| S3 | Popover radius | `rounded-3xl` = 24px | `min(32px, calc(var(--radius-2xl) + var(--spacing) * 1.5))` = 22px | wrong |
| S4 | Popover elevation | `drop-shadow-xl` | `--overlay-shadow` | wrong |
| S5 | Item geometry | `rounded-3xl py-2 ps-3 pe-8 gap-2.5` | `min-h-9 rounded-2xl px-2 py-1.5 gap-3` | wrong |
| S6 | Item press | none | `scale(0.98)` | wrong |
| S7 | Easing | `cubic-bezier(0.22,1,0.36,1)` | `heroui-overlay-enter-95 150ms ease` | wrong |
| S8 | Chevron | `duration-200` | `duration-150` | wrong |

### Tabs

| # | Item | herocn | HeroUI v3.2.7 | Label |
|---|---|---|---|---|
| X1 | Indicator elevation | `shadow-sm` | `shadow-surface` | wrong |
| X2 | Indicator motion | `duration-200 ease-out` | 250ms `var(--ease-out-fluid)` | wrong |
| X3 | Trigger hover | `hover:text-foreground/80` | `opacity-70` | wrong |
| X4 | Variant name `line` (indicator `bg-ring h-0.5`) | `line` | `secondary` | herocn-only (naming) |

## Counts

| Section | wrong | herocn-only | total |
|---|---|---|---|
| Tokens | 8 (T1–T6, T8, T9) | 1 (T7) | 9 |
| Button | 7 (B1–B7) | 4 (B8–B11) | 11 |
| Input | 4 | 0 | 4 |
| Card | 2 (C1–C2) | 2 (C3–C4) | 4 (C5 is a naming note, not counted) |
| Dialog | 5 (D1–D5) | 3 (D6–D8) | 8 |
| Select | 8 | 0 | 8 |
| Tabs | 3 | 1 | 4 |
| **Total** | **37** | **11** | **48** |

## Post-visual-check verification (19 Nov 2026)

Eyeballed screenshot findings were checked against source. None of these add mismatch rows.

| Finding | Source check | Result |
|---|---|---|
| Card title weight looked semibold in HeroUI | herocn `CardTitle`: `font-medium text-foreground text-sm leading-6`; HeroUI `card.css` `.card__title`: `text-sm leading-6 font-medium` | **match** (both 500); the screenshot estimate was wrong |
| Card / Dialog radius looked ~20px in herocn vs ~24/28px in HeroUI | herocn `rounded-3xl` = `calc(var(--radius) * 3)` = 24px (compiled CSS in both test apps); HeroUI `.card` and `.modal__dialog` = `min(32px, var(--radius-3xl))` = 24px | **match** (24px everywhere); the screenshot estimate was wrong |
| Button focus ring: HeroUI shows a double ring with offset | herocn `focus-ring` = `ring-2 ring-ring ring-offset-2 ring-offset-background` (2px gap in the background color, then a 2px `--ring` ring); HeroUI `.button` focus = `status-focused` = 2px `--focus` ring with `--ring-offset-width` 2px | **match** (same construction); the test-app CSS compiles to exactly herocn's utility |
| Input focus ring: herocn looks thin light-blue | herocn input: `not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring` = 2px `--ring` ring, offset 0 (herocn docs example `input-demo.tsx` is a plain `<Input>`); test apps compile to the same rule | **match**; the apparent thinness comes from screenshot scaling |
| Tabs active pill looked smaller in herocn | Base test file has the same class strings as herocn (verified by diff); pill = `h-(--active-tab-height) w-(--active-tab-width)` = the tab's size. herocn docs demo uses `w-[400px]` vs the test demo's `max-w-sm` (384px) | **match**; size follows container width (Radix: the pill is on the trigger, same box) |
