# Handoff: /themes theme editor (HeroUI heroui.com/en/themes clone): Pass 6, NOT committed

Repo: `/workspace/s2h-landing` (Next.js 16.4.5, Tailwind v4, shadcn Base UI components restyled by the skill at `/workspace/shadcn-to-heroui`). HEAD is still `4260fdd`. Nothing from this pass is committed or built yet.

The docs worker has uncommitted `components/ui/*` files in the same repo (popover, alert-dialog, toast, input-otp, radio-group, spinner, alert, field, drawer, item, surface, code-block, …) and package.json/lock changes. This editor depends on those files, so commit them first, or together with this work.

## Original requirements (from parent / user Sagar)
- Exact clone, visual AND behaviour, of https://heroui.com/en/themes at the route `/themes`.
- Link it from the landing header as "Themes". Edit only `components/landing/header.tsx` `SiteHeader`, and keep the edit minimal.
- Build it only from OUR `components/ui/*`. Do not override skill styles (see `/workspace/landing-audit.md`).
- Include every control: accent (hue slider and colour picker), base, font family (suggested and custom CDN), radius, radius form, theme presets, vibrant palette, dark/light, undo/redo, reset, shuffle, share, view code. Include the live preview.
- Derived values must match heroui.com exactly:
  - Provide a test table comparing heroui.com with ours for every variable over N settings.
  - Never guess a formula: write NOT FOUND and explain any approximation.
- "View code" must show the CSS in OUR globals.css token format (`:root` and `.dark`), with copy and download.
- Dark mode must work. State persists in the URL, like heroui.com.
- Verification:
  - typecheck, build
  - zero console errors in light, dark and at 390px mobile width
  - the value table passes
  - side-by-side screenshots vs heroui.com (default plus 2 modified settings) in `/workspace/themes-shots/`
  - restart `next start -p 3103`
- Git scope:
  - Touch only `app/themes/**`, `components/themes/**`, `lib/theme*/**` and the header nav.
  - Stage with `git add <paths>`. Commit with `git -c user.name=box -c user.email=box@local commit -m "Pass 6: theme editor"`.
  - Never touch the skill folder; report any skill token bug instead.

## Algorithm source (verified)
Source is the HeroUI repo clone `/workspace/shadcn-to-heroui/research/heroui` @ 08d4f13 (v3.2.7, Apache-2.0), under `apps/docs/src/app/[lang]/themes/`.

- **`utils/generate-theme-colors.ts`** (OKLCH maths):
  - neutrals: gray chroma = `base`, and `hue` applies to all neutrals
  - semantic hue blend 0.12
  - chromaBoost = 1 + 2·base
  - `formatOklch` output looks like `oklch(xx.xx% c.cccc h.hh)`
  - derived color-mix: soft is 15%/20% in light, 12%/16% in dark
  - `calculateAccentForeground` threshold is 0.65
  - `radiusDerivedVariables` comes from here too
- **`hooks/use-computed-theme-vars.ts`**: `adaptiveColors` maps the accent `oklch(0 0 0)` to dark `oklch(0.9848 0 0)`. Base is ignored on that path.
- **`findMatchingTheme`** applies the preset's `semanticOverrides`.
- **Live check:** `/workspace/themes-work/heroui-values.json` (live heroui.com) vs `expected-hero.json` (repo algorithm). 1968 of 1976 raw values are identical after var() substitution.
- **The 8 mismatches are a HeroUI bug (vibrant palette):**
  - The code does `"var(--VAR)".replace("--VAR","accent")`, which produces `var(accent)`. The browser drops that declaration.
  - heroui.com then falls back to the html `[data-vibrant-palette=true]` rule, which uses the DEFAULT accent.
  - We emit the intended formula instead: `color-mix(in oklab, var(--X) 92%, var(--foreground) 8%)`, via `fixVibrantRefs` in `lib/theme-editor/compute.ts`. Report this deviation.
- **Picker maths:** culori `formatHsl`/oklch plus react-aria HSLColor, re-implemented in `lib/theme-editor/color.ts`. Verified with 24000 checks and 0 mismatches (`/workspace/themes-work/color-test.mjs`).

## HeroUI var -> skill token mapping (`SKILL_TOKEN_SOURCES` in `lib/theme-editor/compute.ts`)

| Skill token | HeroUI var |
|---|---|
| background | background |
| foreground | foreground |
| card-foreground | surface-foreground |
| popover / popover-foreground | overlay / overlay-foreground |
| primary / primary-foreground | accent / accent-foreground |
| ring | focus |
| secondary, muted, accent | default |
| secondary-foreground, accent-foreground | default-foreground |
| muted-foreground | muted |
| destructive / destructive-foreground | danger / danger-foreground |
| border | border |
| input | field-background |
| sidebar* | the matching tokens |
| default, success, warning (+ -foreground) | same name, 1:1 |
| surface* | same name, 1:1 |
| segment* | same name, 1:1 |
| soft tokens (primary-soft, destructive-soft, …) | accent-soft, danger-soft, … |

- `var(--accent)` is renamed to `var(--primary)` and `var(--danger)` to `var(--destructive)` inside formulas.
- `--card: var(--surface)` and `--sidebar-ring: var(--foreground)` are re-declared in each scope.
- Unmapped HeroUI vars are listed in `UNMAPPED_HERO_VARS`: separator, scrollbar, field-foreground/placeholder/border, the hover variants, and others.
- **Skill gap (report it):** the skill has no `--field-radius`; its fields use `rounded-xl` (= radius × 1.5). `generate-css.ts` emits a flagged `[data-slot=input|textarea|select-trigger|native-select|input-group|input-otp-slot]{border-radius:var(--field-radius)}` rule.

## Assets
- `app/themes/assets/*.png` (airbnb, black, coinbase, default, discord, lavender, mint, netflix, rabbit, sky, spotify) are **byte-identical to the HeroUI repo's `apps/docs/src/assets/themes/`** @ 08d4f13 (Apache-2.0). They are plain gradients with no logos and were not taken from heroui.com.
- glass.png was removed (unused).
- Demo avatar and photo images are local SVG gradient data-URIs, so there are no heroui.com CDN assets.
- The repo licence is **Apache-2.0** (not MIT); the file headers have been corrected.

## Done (all uncommitted)
- **`lib/theme-editor/`:**
  - `generate-theme-colors.ts`, `theme-values.ts`, `font-utils.ts`: verbatim ports
  - `use-custom-fonts.ts`
  - `constants.ts`: fonts, radius options, themes, defaults, IDs
  - `compute.ts`: `computeHeroVars`, `computeSkillTheme`, mapping
  - `color.ts`
  - `generate-css.ts`:
    - `generateGlobalsCss` produces the View-code output in globals.css order, plus `@theme inline --font-sans` and an `@import` of the font CDN.
    - `generatePreviewCss` produces the injected CSS:
      - Page level (`#theme-builder-page`) gets colours only.
      - Content level (`#theme-builder-content`, plus a `body:has(open preview select)` select popup) gets colours, radius, font and field radius.
      - Light selectors use `:not(.dark *)`; dark selectors use `.dark`.
      - TODO: add `#theme-builder-bottom-sheet` to the content selectors.
  - `state.ts`:
    - URL state works like nuqs: pushState, clearOnDefault.
    - Keys: base, chroma, fontFamily, formRadius, hue, lightness, lockedVariables (comma list), radius, vibrantPalette, plus `template` for the tab.
    - Also contains `useUndoRedo` (port) and `useKeyPress`. Use `capture:true` only for "d", so the app-wide ThemeProvider "d" hotkey, which checks `defaultPrevented`, does not fire.
- **`components/themes/`:**
  - `strings.ts`: verbatim en.json strings
  - `lockable-label.tsx`
  - `sliders.tsx`: ChannelSlider in react-aria style, ChromaSlider port, ColorArea (HSL s×l)
  - `accent-selector.tsx`: hue slider plus picker popover with swatches carousel, area, hue slider, shuffle, and an input with a format Select
  - `base-slider.tsx`
  - `option-popovers.tsx`: Font (suggested and custom CDN), RadiusPopover, ThemePopover (presets, vibrant switch, T hint), ThemesList, ThemeInput
  - `builder-header.tsx`:
    - logo, undo/redo, separator, reset dialog, shuffle dialog (don't-show-again)
    - centred Tabs
    - SwitchMode (skill Tabs with sun/moon icons, "s" key), share (toast "Link copied"), code toggle
  - `toast.ts`: a local toast manager, to be rendered with `<Toaster toastManager={toastManager}>`
  - `theme-images.ts`
  - `demo.tsx`: the full 3-column preview grid, built from our ui components
- **NOT yet typechecked.** Expect small TS fixes, for example:
  - `PopoverTrigger nativeButton`
  - Select `items` prop
  - Slider `onValueChange` type
  - Field `FieldError` children
  - `Image src` type

## Remaining steps (in order)
1. **`components/themes/css-sync.tsx`:**
   - Inject `<style id="theme-builder-colors">{generatePreviewCss(state)}</style>` into the head.
   - Load the font with `injectFontLink(fontMeta.id-ish, fontMeta.cdnUrl)`.
2. **`components/themes/code-panel.tsx`:**
   - Use our `Sheet` with `side="right"`, className `data-[side=right]:w-[45%] sm:max-w-none`, approximately h-[88vh] (HeroUI: fixed end-6, rounded-xl, bg-surface/94).
   - Header title "globals.css" with download (theme.css) and copy buttons.
   - Body: `CodeBlockContent lineNumbers` with `generateGlobalsCss(state)` (useDeferredValue).
3. **`components/themes/onboarding.tsx`:**
   - Our Dialog, opened when localStorage `onboarding` is unset (then set it to "true"), max-w-[480px].
   - The animated block uses CSS keyframes over 4s easeInOut infinite:
     - borderRadius 24 → 8 → 0 → 12 → 24
     - bg #3b82f6 → #6366f1 → #10b981 → #f97316
     - inner bg #93c5fd → #a5b4fc → #6ee7b7 → #fdba74
   - Then the title, description, moreComing text and a full-width Continue button.
4. **`components/themes/mobile-footer.tsx`:**
   - Fixed bottom bar, `sm:hidden`, border-t, containing ThemeInput (opens the sheet) and `ShuffleButton enableKeyboardShortcut={false}`.
   - Bottom sheet: our Drawer or Sheet side=bottom, id `theme-builder-bottom-sheet`.
   - Sheet contents: ThemesList; Accent and Base; then a horizontally scrolling row of Font, Radius and Radius Form.
5. **`components/themes/theme-builder.tsx` (client):**
   - Page grid: `grid h-dvh grid-rows-[auto_1fr_auto] bg-background px-4 sm:overflow-hidden sm:px-6`, id `theme-builder-page`, with an sr-only h1 "Theme Builder".
   - BuilderHeader.
   - Content:
     - Wrapper: `mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-col`.
     - Scroll box: `rounded-2xl border border-border/50 overflow-scroll`, `[scrollbar-width:none]`.
     - Inner div: id `theme-builder-content`, `flex w-full flex-1 bg-background font-sans min-h-full px-4 py-8`, holding `DemoComponents` mounted after first render.
     - Non-components tabs: centred "HeroUI Pro templates are not part of this clone" placeholder (heroui.com loads heroui.pro iframes).
   - Footer (`mx-auto hidden items-center justify-between gap-4 py-6 max-[1200px]:flex-col sm:flex`):
     - group 1: Accent, Base, Font
     - group 2: Radius (radiusOptions, `t.radius.label`/description), Radius Form (formRadiusOptions, formLabel/formDescription), ThemePopover
   - Below the footer: `<div className="h-20 sm:hidden"/>`, then MobileFooter, Onboarding, CssSync, CodePanel.
   - Wrap everything in TooltipProvider and Toaster.
   - Add `document.documentElement` `data-vibrant-palette` toggling, optional.
6. **`app/themes/page.tsx`:** server component with metadata (title "HeroUI Theme Builder – Customize React UI"-style, rebranded) and `<Suspense><ThemeBuilder/></Suspense>`.
7. **Header link:** add `{ label: "Themes", href: "/themes" }` to `SiteHeader` nav in `components/landing/header.tsx`.
8. **Static checks:** `npx tsc --noEmit`, then fix errors. Run `npm run build` only at the end; the docs worker may be building, so retry if `.next` is locked.
9. **Value table:**
   - Run `/workspace/themes-work/probe.py` against `http://localhost:3103/themes?<params>` for the 13 settings in `settings.json`.
   - Resolve our tokens with probe divs (`getComputedStyle` color of an element with `color: var(--token)` inside `#theme-builder-content`, light and dark).
   - Compare with `heroui-values.json` resolved HeroUI vars through the mapping.
   - Write the result to `/workspace/themes-shots/value-table.md`. Expect 100% except the vibrant soft-fg values, which come from the documented bug.
   - Playwright setup: Python, `executable_path=/usr/bin/google-chrome`. Init script: localStorage `onboarding=true`, `theme=light|dark`; sessionStorage `heroui-pro-banner-dismissed-session=true`.
10. **Screenshots** in `/workspace/themes-shots/`:
    - ours-default-{light,dark}, ours-390, and 2 modified settings (e.g. `?hue=30&lightness=0.7&chroma=0.2&radius=none&formRadius=extra-large`, and the preset netflix).
    - Matching heroui.com shots taken with `ref.py`; `ref-*.png` already exist.
    - Check console errors.
11. **Finish:**
    - Restart `next start -p 3103`.
    - Stage only my paths (`git add app/themes components/themes lib/theme-editor components/landing/header.tsx`), retrying if `index.lock` exists, then commit.

## Known issues / notes
- Base UI portals render into body:
  - Footer popovers get the global theme (same as heroui.com, whose popovers are outside the page scope too).
  - The preview Select popup is themed by the `body:has(...)` rule.
- Our skill Button "icon" size draws svgs at size-5; HeroUI uses size-4. This was left at the skill default on purpose.
- The SwitchMode uses the skill Tabs (40px tall) instead of HeroUI's 36px pill.
- HeroUI ListBox grids are rendered as role=listbox divs, because the skill has no ListBox.
- Skipped: the ProBanner and Ask AI (marketing / HeroUI agent).
- Measurements of heroui.com are in `/workspace/themes-work/ref-measure.json`:
  - header buttons 36px
  - footer InputGroups 160×36 r12
  - hue/base tracks 160×24
  - tabs 32px in a 40px list
