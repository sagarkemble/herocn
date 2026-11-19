# Landing page vs shadcn-to-heroui skill: override audit

Repo `/workspace/s2h-landing` @ `96d6a09` (audit only, nothing changed). Skill: `/workspace/shadcn-to-heroui`.
Method: (1) each `components/ui/*.tsx` diffed against the `## Target file` block of `reference/components/<name>.md`, after a prettier pass on both, with imports ignored. (2) `app/globals.css` diffed against the "Ready-to-paste globals.css" block in `reference/tokens.md`. (3) TypeScript-AST scan of every JSX use of a `@/components/ui/*` component and every raw `<button>/<a>/<input>` in `components/landing/*.tsx` and `app/page.tsx` (372 uses, 194 with className), plus a grep for hex/rgb colours.

Classes: **A** breaks the skill look, fix it · **B** layout only, fine · **C** debatable (sized-down mocks, heroui.com marketing specials, section accents).

Counts: **A = 11 findings (22 sites)** · **C = 19 findings** · B = everything else (≈150 sites: widths, gaps, margins, `max-*:hidden`, `absolute` positioning, `flex-row`, `w-auto!`, text truncation).

---
## 1. components/ui/* vs skill Target files

Identical after normalisation (0 drift): avatar, button, calendar (data-day fix is in the skill now), card, chart, checkbox, command, dialog, input-group, input, kbd, label, navigation-menu, progress, separator, sheet, slider, switch, table, textarea, tooltip.
The stock-only components added in d5888a2 (**calendar, command, table, chart, input-group**) are **all styled to the skill, byte for byte**.

Drift that the skill allows (it keeps the user's props and defaults, per SKILL.md L48–50 and the hand-review notes):
- `select.tsx`: no `variant` context wrapper. The stock `size` prop and `data-[size=sm]:h-7` are kept. `sideOffset=4` and `alignItemWithTrigger=true` are kept (the skill marks herocn's 8/false as an opt-in; the popup opens over the trigger, not below it). OK.
- `tabs.tsx`: no `activateOnFocus=true` (NOT safe per skill). OK.
- `toggle-group.tsx`: `spacing=2` is the stock default (herocn's 0 is NOT safe). OK; call sites pass `spacing={1}`.
- `badge.tsx`: stock-only keys `secondary/outline/ghost/link` kept with stock classes. `toggle.tsx`: stock `outline` key kept with `border-border`. OK (SKILL.md L48).

**A1 · `components/ui/accordion.tsx`, real drift:**
- Chevron: the page keeps stock shadcn's **two-icon swap** (`ChevronDownIcon … group-aria-expanded:hidden` + `ChevronUpIcon … group-aria-expanded:inline`). The skill/herocn uses **one ChevronDown that rotates**: `transition-transform duration-250 motion-reduce:transition-none group-aria-expanded/accordion-trigger:-rotate-180`. The preview shows an instant icon swap instead of the 250 ms rotation.
- Missing: the herocn `variant="surface"` (rounded-3xl bg-surface, inset separators, surface hover) and `hiddenUntilFound=true`. Both are safe additive (review). Also missing: `data-slot="accordion-content-inner"` on the content div.
- Fix: replace the file body with the Target file in `reference/components/accordion.md`, keeping the `@/lib/utils` import.

---
## 2. app/globals.css vs reference/tokens.md / motion.md

- **Token block: identical** to the skill paste block. That covers light and dark colours, `--radius`, the radius scale, soft tokens, `--ring`, sidebar, charts, `--ease-smooth`/`--ease-out`, `@layer base`, the utilities `focus-ring`, `focus-field-ring`, `invalid-field-ring(-focus)` and `pressible`, the skeleton shimmer and the `@theme inline` colour map.
- The only difference inside the block is the font lines: the page has `--font-heading: var(--font-sans); --font-sans: var(--font-sans);` where the skill has `--font-sans: "Inter", sans-serif`. That is what the skill prescribes when `next/font` is wired (tokens.md L390, SKILL.md L41). `layout.tsx` loads **Inter** into `--font-sans`, so the body and every component render in Inter, the same face as herocn/HeroUI. **OK.**
- **Inter Tight**: loaded as `--font-display` and used only by page utilities (`display-hero/statement/closing`), the wordmark, and the big numbers in `hero.tsx:176`, `rest.tsx:136/153/448`. No skill component uses it. The skill specifies Inter only and says nothing about a display face. **C**: it's fine for marketing headlines, but tell viewers that headings are not part of the system.
- Page-only additions, appended after the skill block: `site-container`, `section-gap`, `display-*`, `lead`, `.wall-*` (light and dark), `marquee-y`, `.hero-slot*`. **None of them redefine a token or target a component selector.** Fine.
- Classes that **do** redefine tokens (all **C**, see 3.C1):
  - `.agents-scope { --primary:#7828c8; --primary-foreground:var(--snow); --ring }`
  - `.herospace-scope { --primary:#6466e9; … }`
  - `.agents-scope, .herospace-scope, .theme-scope { --primary-soft; --primary-soft-foreground; --ring }`: these re-derive with the skill's formulas (tokens.md L703). Correct.
  - Note: the scopes set `--primary-foreground: var(--snow)` (oklch 0.9911 0 0), where the skill's `:root` value is `oklch(0.97 0.014 254.604)`. The difference is tiny.
- Missing: nothing.

---
## 3. components/landing/*.tsx + app/page.tsx

### A: breaks the skill look (fix)
| # | file:line | override | skill says | proposed fix |
|---|---|---|---|---|
| A1 | ui/accordion.tsx | chevron swap, no rotate | rotate-180, 250 ms | use Target file (see §1) |
| A2 | rest.tsx:189 (TestimonialCard) | `<Card className="gap-6 rounded-[20px] border border-border p-[22px] shadow-[0_1px_2px_rgb(0_0_0/4%),0_12px_24px_rgb(0_0_0/4%)] sm:gap-7 sm:p-6">` | Card = `rounded-3xl` (24px), no border, `shadow-sm`, `p-4` | `className="gap-6 sm:gap-7"`; also change the wrapper `<a>` at rest.tsx:188 from `rounded-[20px]` to `rounded-3xl` |
| A3 | rest.tsx:315 (Blog card) | hand-built `div.rounded-3xl bg-surface p-1` imitating Card, **no `shadow-sm`** | Card has `shadow-sm` | use `<Card className="group relative h-full gap-0 p-1">` or add `shadow-sm` (the inner `rounded-[20px]` frame is the correct concentric radius, keep it) |
| A4 | mocks.tsx:112, mocks.tsx:273, open-source.tsx:192 | InputGroup `rounded-full border border-border bg-surface` (`h-[46px]` / `h-10` / `h-9 rounded-full`) | InputGroup `h-9 rounded-xl bg-input`, no border, `focus-field-ring` | drop `rounded-full border border-border bg-surface`; the height can stay (C) |
| A5 | mocks.tsx:118, mocks.tsx:284 | InputGroupButton `rounded-2xl` / `rounded-full` | `rounded-xl` | drop the radius (follows A4) |
| A6 | mocks.tsx:261 | outline Button `h-8 justify-between rounded-xl px-2.5 font-normal text-xs` | Button `rounded-3xl`, sm = `h-8 px-3` | drop `rounded-xl px-2.5` (keep `justify-between font-normal`) |
| A7 | mocks.tsx:48, 58 (`shadow-lg`), 241, 343 (`shadow-xl`); pro.tsx:125, 140, 211 (`shadow-lg`) | Card elevation raised | Card `shadow-sm` | drop `shadow-*` (7 sites); same fix as the promo card in 96d6a09 |
| A8 | pro.tsx:187 | Card `bg-default shadow-none` for the "not joined" state | Card `bg-surface shadow-sm` | keep the Card default; show the state with a Badge or `text-muted-foreground`, or use `opacity-70` |
| A9 | pro.tsx:58 | Command `rounded-2xl shadow-lg` | Command `rounded-xl`, no shadow | drop both; if it must float, wrap it in a Card |
| A10 | agents.tsx:144–146; pro.tsx:144, 150 | ToggleGroup made into a segmented control: list `rounded-lg`/`rounded-xl bg-default p-0.5`, items `rounded-md`/`rounded-lg h-6`, `aria-pressed:bg-surface aria-pressed:text-primary` / `aria-pressed:shadow-sm` | Toggle `rounded-3xl`, pressed = `bg-primary-soft text-primary-soft-foreground`; the skill's segmented look is **Tabs** (`bg-default` list + `bg-segment shadow-sm` sliding pill) | replace with `<Tabs><TabsList><TabsTrigger>` (default variant), or keep ToggleGroup with no radius/pressed overrides |
| A11 | hero.tsx:168 | raw `<button>` dismiss (`size-6 rounded-full text-white/90 hover:bg-white/20`): no focus ring, no press scale | Button ghost `icon-xs` (`pressible focus-visible:focus-ring rounded-3xl`) | `<Button variant="ghost" size="icon-xs" aria-label="Dismiss" className="absolute top-2.5 right-2.5">` |

### C: debatable (keep, or decide)
- **C1 Section accent scopes:** `agents.tsx:544` (`.agents-scope`, purple #7828c8), `herospace.tsx:181` (`.herospace-scope`, indigo #6466e9), and `open-source.tsx:257–262` (`.theme-scope`, a live picker that sets `--primary`, `--radius`, `--font-sans` and `--background`). Every skill component in those sections renders purple, indigo or the picked accent instead of HeroUI blue. heroui.com does the same, and the soft and ring tokens are correctly re-derived. If the preview must be canonical, drop the scopes or label them "accent override demo". (Side note: at the "Inter" default, `--font-sans: var(--font-sans)` in the inline style is self-referential. It's harmless because the font inherits Inter, but `inherit`/unset would be cleaner.)
- **C2 Black marketing CTA** `ctaPrimary`/`ctaDark` (`bg-foreground text-background hover:bg-foreground/85`) on the default Button: hero.tsx:194, 222; header.tsx:147, 168; rest.tsx:100, 339; pro.tsx:324, 346 (8 sites). heroui.com styles its CTAs black. In the preview, though, a default Button reads as black, not blue. Alternative: use the plain default Button in the hero, or add a named `inverse` variant to the skill.
- **C3 Ghost "sidebar" nav buttons:** `rounded-xl`/`rounded-lg` + active `bg-default`/`bg-surface`, `h-7/h-8 px-2 font-normal` at agents.tsx:92, 293, 359; mocks.tsx:326; open-source.tsx:95; pro.tsx:308. They imitate a sidebar menu (the skill's SidebarMenuButton is `rounded-lg`, hover `bg-sidebar-accent`). Cleaner option: use Sidebar components, or plain ghost Buttons.
- **C4 Sized-down mock controls** (height/font only): Button `h-5/h-6/h-7 text-[10px]/[11px]` (herospace.tsx:63, 125, 126; open-source.tsx:112), Input `h-7 text-[10px]/text-xs` (agents.tsx:299, 300; pro.tsx:166, 167), InputGroup `h-8`/`h-7` + `text-xs` inputs (agents.tsx:125, 127, 281, 283; open-source.tsx:118, 120; pro.tsx:216, 218), SelectTrigger `h-8` (agents.tsx:510, 514; pro.tsx:338), TabsTrigger `text-[11px]` (agents.tsx:488, 489; herospace.tsx:75, 76), CardTitle/Description `text-xs/[10px]/[11px]`, Card size=sm `px-3`/`p-2`/`px-1.5` density (agents, herospace, pro, rest.tsx:269, 285), Table `text-[10px]/[11px]`, Switch `scale-[0.6]` (rest.tsx:248, inside thumbnail art), Avatar `size-4` (pro.tsx:113), Label `text-[11px]`.
- **C5 Floating dark toolbar** (open-source.tsx:301–346): SelectTrigger `border-0 bg-foreground/10 text-foreground h-7`, ToggleGroup `rounded-full bg-foreground/10` with swatch items `aria-pressed:bg-transparent`, ghost Button `hover:bg-foreground/10`, Badge `bg-foreground/10 text-foreground`. These are glass-toolbar recolours copied from heroui.com.
- **C6 Header nav** (header.tsx:111, 129): NavigationMenuTrigger/Link `h-8 bg-transparent px-2 text-muted-foreground hover:bg-transparent data-[popup-open]:bg-transparent`. This removes the skill's `hover:bg-muted rounded-2xl px-3.5` pill and keeps heroui.com's text-link nav.
- **C7 Header theme switch** (header.tsx:62, 74): ToggleGroup `rounded-full bg-default p-0.5`, items `rounded-full aria-pressed:bg-surface aria-pressed:shadow-sm`. This is a segmented control, the same pattern as A10, but a heroui.com header detail. A Tabs default variant would be skill-true.
- **C8 Line tabs** (agents.tsx:569, 571): TabsList `border-0 gap-1`, TabsTrigger `border-b-2 border-border data-[active]:text-primary`. The skill's line variant shows only the `h-0.5 bg-ring` indicator under the active tab, with foreground text.
- **C9 Glass tabs** (pro.tsx:516): TabsList `bg-surface/50 backdrop-blur-xl` sits over the wallpaper. The skill list is `bg-default`.
- **C10 Progress** (products.tsx:134): track `h-[3px] bg-border`. The skill's sm track is `h-1` with `bg-default`. This is heroui.com's auto-advance bar.
- **C11 Hue Slider** (mocks.tsx:78): a rainbow track, transparent range and `bg-surface` thumb. It's a colour picker by nature (artwork-like).
- **C12 Nested mock cards** (mocks.tsx:107, 137): Card `rounded-[16px] shadow-none` inside a `rounded-[20px] bg-default p-1 shadow-lg` wrapper (mocks.tsx:103, 134; heroui.com Pro mocks). Strictly that breaks the card radius. To be skill-true, drop `rounded-[16px]` and let the wrapper go `rounded-[28px]`, or remove the wrapper.
- **C13 npm-copy pill** (open-source.tsx:353): tertiary Button `h-12 rounded-full pl-2 pr-4 text-base`. This is a marketing pill; `rounded-full` and `rounded-3xl` look the same at this height.
- **C14 FAB** (open-source.tsx:211): Button icon-lg `rounded-full shadow-lg`. The radius is a no-op at size-10; the shadow is extra.
- **C15 Avatars**: `rounded-xl after:rounded-xl` for square album art (mocks.tsx:162), plus AvatarFallback fills `bg-primary-soft`, `bg-foreground text-background` and gradients (agents.tsx:86, 344; pro.tsx:113, 301; open-source.tsx:62, 88; mocks.tsx:163).
- **C16 Footer accordion** (rest.tsx:398, 399): trigger `px-0 py-[18px] text-[15px] hover:bg-transparent`, content `px-0`. This removes the skill's `hover:bg-foreground/3` and padding (heroui.com mobile footer).
- **C17 Hand-built list rows** (open-source.tsx:125, 200): raw `<button>` mail rows `rounded-xl`/`rounded-2xl`, selected `bg-surface shadow-sm`, **no focus-visible style**. At minimum add `focus-visible:focus-ring`.
- **C18 Focus style on stretched cards**: products.tsx:122 (`focus-visible:outline-2 outline-ring outline-offset-4`), pro.tsx:483 and rest.tsx:318 (`focus-visible:after:outline-2 after:outline-ring`). The skill's focus is `focus-ring` (ring-2 ring-ring, 2px offset ring in background colour). Try `focus-visible:after:focus-ring`, or accept the outline.
- **C19 Card/link motion not in the skill**: rest.tsx:188 `hover:-translate-y-0.5 duration-300 ease-out` lift; preview zooms `group-hover:scale-[1.02]`/`scale-[0.87]` (rest.tsx:317, pro.tsx:479); products.tsx mock slide `duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`; Card `opacity-60` (agents.tsx:181). These are page-level marketing motion.

Not a finding:
- `pro.tsx:476`: the hand-built preview card `rounded-3xl bg-surface shadow-sm` equals Card's look. Could be `<Card>`, but it's visually true.
- Calendar `bg-transparent` (mocks.tsx:49) sits inside a Card of the same surface.
- Separator `opacity-50` (mocks.tsx:167).

### Variants/sizes used: all defined by the skill files
Button `ghost/outline/secondary/tertiary` + `xs/sm/icon/icon-xs/icon-sm/icon-lg`; Badge `primary/success/warning` + `sm`; Card `sm`; Input/InputGroup `secondary`; InputGroupButton `default/tertiary` + `sm/icon-xs`; Progress `default` + `sm`; SelectTrigger `sm` (stock size, kept per skill); Switch `sm`; Avatar `sm`; TabsList `line`; ToggleGroupItem `ghost` + `xs/icon-xs`. **None are undefined.**

### Raw elements that are fine (B / text links)
header.tsx:47 (wordmark), header.tsx:136 and rest.tsx:350, 403, 416, 420, 430 and ui-bits.tsx:90 (`TextLink`): plain text links with `hover:text-foreground`/`hover:text-primary`. No skill component is being imitated (Button `link` would be underlined). rest.tsx:132 is a stat link block. hero.tsx:143 is the hero glyph slot (artwork).

### Hardcoded colour: artwork, fine
agents.tsx:206–209, 213, 223, 265–270, 468 (map/landmark/shoe placeholders); hero.tsx:17–99 (glyph SVG fills), hero.tsx:166, 167, 183 (promo image gradient and its caption colour); mocks.tsx:43, 56, 73, 84 (colour-picker swatches/hue); open-source.tsx:54–56 (avatar gradients), 222–225 (accent options), 370 (brand icon); rest.tsx:145 (npm brand colour); `.wall-*` gradients.
Shadows with rgb on artwork frames: herospace.tsx:196, pro.tsx:523 (screenshot frames), rest.tsx:87 (app tile in the MCP diagram). Fine.
The **only** rgb on a skill component surface is rest.tsx:189 (A2).
