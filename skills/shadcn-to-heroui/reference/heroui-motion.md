# HeroUI v3.2.7 motion (SECONDARY reference: source @heroui/styles; herocn is primary, see motion.md)

> **Superseded for application.** This file records the raw HeroUI v3.2.7 values used to spot-check herocn (`reference/herocn-diff.md`). The skill applies **herocn** tokens/classes from `tokens.md`, `motion.md` and `components/*.md`. Don't paste the globals block or class snippets from this file into projects; they use an older naming scheme (`--primary-hover`, `bg-field`, …) that herocn doesn't define.

Source: `@heroui/styles` v3.2.7 (commit `08d4f13`). Paths are relative to `heroui-inc/heroui:packages/styles/`.
Searched: `transition`, `duration`, `ease`, `animate`, `scale`, `translate`, `@keyframes`, `data-pressed`, `data-hovered`, `data-entering`, `data-exiting` in `components/*.css`, `base/overlay-motion.css`, `themes/shared/theme.css`.

**State attribute mapping (React Aria → Radix/shadcn)**

| HeroUI (React Aria) | shadcn (Radix / native) |
|---|---|
| `[data-pressed="true"]` / `:active` | `active:` |
| `[data-hovered="true"]` / `:hover` inside `@media (hover: hover)` | `hover:` (Tailwind v4 already wraps `hover:` in `@media (hover: hover)`) |
| `[data-focus-visible="true"]` | `focus-visible:` |
| `[data-entering="true"]` | `data-[state=open]:` |
| `[data-exiting="true"]` | `data-[state=closed]:` (Radix waits for `animationend` before unmounting, so exit keyframes play) |
| `[data-placement="top/bottom/left/right"]` | `data-[side=top/bottom/left/right]:` |
| `[data-expanded="true"]` | `data-[state=open]:` |
| `[data-selected="true"]` (tabs) | `data-[state=active]:` |
| `origin-(--trigger-anchor-point)` | keep shadcn `origin-(--radix-…-content-transform-origin)` |
| `motion-reduce:` (HeroUI custom variant: `[data-reduce-motion="true"]` or `prefers-reduced-motion: reduce`) | Tailwind `motion-reduce:` (media query only) |

---

## 1. Defaults

| Item | Value | Source |
|---|---|---|
| Global default duration / easing | HeroUI declares no global one. Each component sets explicit `transition:` lists. When a HeroUI component uses bare `transition` / `transition-all`, Tailwind's default applies: `--default-transition-duration: 150ms`, `--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)` | tailwindcss 4.3.5 `theme.css` |
| Most common color transition | `background-color 150ms var(--ease-smooth)` / `color 150ms var(--ease-smooth)` / `box-shadow 150ms var(--ease-out)` | button, input, tabs, link, popover triggers |
| Most common transform transition | `transform 250ms var(--ease-out-quart)` (triggers, menu items, close button); button uses `transform 250ms var(--ease-smooth)` | close-button.css, menu-item.css, button.css |
| `--ease-smooth` | `ease` | themes/shared/theme.css |
| `--ease-out` | not defined by HeroUI, so Tailwind's `cubic-bezier(0, 0, 0.2, 1)` | tailwindcss theme.css |
| `--ease-out-quad` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | theme.css |
| `--ease-out-quart` | `cubic-bezier(0.165, 0.84, 0.44, 1)` | theme.css |
| `--ease-out-fluid` | `cubic-bezier(0.32, 0.72, 0, 1)` | theme.css |
| Reduced motion | every transition/animation is followed by `motion-reduce:transition-none` / `motion-reduce:animate-none` | all component CSS |

### Paste into globals.css: HeroUI easings and named animations

```css
@theme inline {
  /* Easings: verbatim from themes/shared/theme.css */
  --ease-smooth: ease;
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-out-fluid: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  --ease-linear: linear;

  /* Animations: verbatim from themes/shared/theme.css */
  --animate-spin-fast: spin 0.75s linear infinite;
  --animate-skeleton: skeleton 2s linear infinite;
  --animate-caret-blink: caret-blink 1.2s ease-out infinite;

  /* Named shortcuts. Name + duration + easing copied from the component CSS cited. */
  --animate-heroui-popover-in: heroui-overlay-enter-90 150ms var(--ease-smooth);   /* popover/dropdown/tooltip enter */
  --animate-heroui-popover-out: heroui-overlay-exit 100ms var(--ease-smooth);      /* popover/dropdown/tooltip exit  */
  --animate-heroui-modal-in: heroui-overlay-enter-105 250ms var(--ease-out-quad);  /* modal.css .modal__container enter */
  --animate-heroui-modal-out: heroui-overlay-exit 100ms var(--ease-out-quad);      /* modal.css .modal__container exit  */
  --animate-heroui-backdrop-in: heroui-overlay-fade-in 150ms var(--ease-out);      /* modal.css .modal__backdrop enter */
  --animate-heroui-backdrop-out: heroui-overlay-fade-out 100ms var(--ease-out);    /* modal.css .modal__backdrop exit  */

  @keyframes skeleton {
    100% {
      transform: translateX(200%);
    }
  }

  @keyframes caret-blink {
    0%,
    70%,
    100% {
      opacity: 1;
    }
    20%,
    50% {
      opacity: 0;
    }
  }
}
```

Then paste the whole of `base/overlay-motion.css` (section 4) at top level, outside `@theme`, so the `heroui-overlay-*` keyframes always ship.

---

## 2. Press (active) scale

| Element | Pressed transform | Transition | Source |
|---|---|---|---|
| Button md (default) | `scale(0.97)` | `transform 250ms var(--ease-smooth), background-color 100ms var(--ease-out), box-shadow 100ms var(--ease-out)` + `transform-gpu` | button.css |
| Button sm | `scale(0.98)` | same | button.css `.button--sm` |
| Button lg | `scale(0.96)` | same | button.css `.button--lg` |
| CloseButton | `scale(0.93)` | `transform 250ms var(--ease-out-quart), color 150ms var(--ease-out), background-color 100ms var(--ease-out), box-shadow 150ms var(--ease-out)` | close-button.css |
| Modal/Drawer/Dropdown trigger | `scale(0.97)` | `transform 250ms var(--ease-out-quart), background-color 150ms var(--ease-smooth), box-shadow 150ms var(--ease-out)` | modal.css, drawer.css, dropdown.css |
| Menu item / ListBox item | `scale(0.98)` | `transform 250ms var(--ease-out-quart), box-shadow 150ms var(--ease-out)` | menu-item.css, list-box-item.css |

Tailwind (shadcn) class strings. Use `[transform:…]` rather than `scale-*`, because Tailwind v4 `scale-*` writes the `scale` property while HeroUI transitions `transform`:

```txt
Button (md):   transform-gpu [transition:transform_250ms_var(--ease-smooth),background-color_100ms_var(--ease-out),box-shadow_100ms_var(--ease-out)] motion-reduce:transition-none active:[transform:scale(0.97)]
Button (sm):   … active:[transform:scale(0.98)]
Button (lg):   … active:[transform:scale(0.96)]
Close button:  transform-gpu [transition:transform_250ms_var(--ease-out-quart),color_150ms_var(--ease-out),background-color_100ms_var(--ease-out),box-shadow_150ms_var(--ease-out)] motion-reduce:transition-none active:[transform:scale(0.93)]
Menu item:     [transition:transform_250ms_var(--ease-out-quart),box-shadow_150ms_var(--ease-out)] motion-reduce:transition-none active:[transform:scale(0.98)]
```

## 3. Hover behavior

HeroUI hover changes **background color only**. There is no lift, no shadow and no scale. Hover rules sit inside `@media (hover: hover)`.

| Element | Hover | Source |
|---|---|---|
| Button primary | `--accent` → `--accent-hover` (`color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%)`) | button.css |
| Button secondary / tertiary | `--default` → `--default-hover` | button.css |
| Button ghost | transparent → `--default` | button.css |
| Button outline | transparent → `color-mix(in srgb, var(--default) 60%, transparent)` | button.css |
| Button danger / danger-soft | `--danger` → `--danger-hover`; `--danger-soft` → `--danger-soft-hover` | button.css |
| Input | `bg-field-hover` + `border-color: var(--field-border-hover)` (not while focused) | input.css |
| Tabs tab (not selected) | `opacity-70` | tabs.css |
| Accordion trigger (collapsed) | `background-color: color-mix(in oklab, var(--foreground) 3%, transparent 90%)` | accordion.css |
| Link | `underline decoration-muted/50`; pressed `decoration-muted` | link.css |
| Close button | `bg-default` → `bg-default-hover` | close-button.css |

## 4. Overlay keyframes: `base/overlay-motion.css` (verbatim, paste at top level)

```css
/*
 * Overlay enter/exit motion.
 *
 * tw-animate-css `enter` / `exit` keyframes always animate `filter`, even when
 * the blur amount is 0. A filter animation on a popover — and especially on a
 * full-viewport modal backdrop — is a main-thread / GPU filter pass. On
 * mid-range devices (A14-class: iPhone 12, iPad 10) that pass often lasts
 * longer than the 100–250ms animation, so the overlay appears late and the
 * motion is skipped.
 *
 * These keyframes animate opacity and transform only. React Aria positions
 * overlays with top/left, so a transform animation does not fight placement.
 *
 * Every keyframe uses literal values. Reading custom properties inside
 * keyframes (`var(--x)`) can keep WebKit from running the animation on the
 * compositor, so each scale / direction combination is spelled out instead.
 *
 * Enter keyframes are named `heroui-overlay-enter-<scale>[-<offset>]`:
 *   scale   90 / 95 / 100 / 105 -> scale(0.9) / 0.95 / 1 / 1.05
 *   offset  y / ny / x / nx -> translate 0.25rem / -0.25rem on the Y / X axis
 */

@keyframes heroui-overlay-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes heroui-overlay-fade-out {
  to {
    opacity: 0;
  }
}

/* Both ends are set. An implicit `transform: none` start does not interpolate on WebKit,
   so the close animation never becomes `running` and the overlay unmounts immediately. */
@keyframes heroui-overlay-exit {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.95);
  }
}

@keyframes heroui-overlay-enter-90 {
  from {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.9);
  }
}

@keyframes heroui-overlay-enter-90-y {
  from {
    opacity: 0;
    transform: translate3d(0, 0.25rem, 0) scale(0.9);
  }
}

@keyframes heroui-overlay-enter-90-ny {
  from {
    opacity: 0;
    transform: translate3d(0, -0.25rem, 0) scale(0.9);
  }
}

@keyframes heroui-overlay-enter-90-x {
  from {
    opacity: 0;
    transform: translate3d(0.25rem, 0, 0) scale(0.9);
  }
}

@keyframes heroui-overlay-enter-90-nx {
  from {
    opacity: 0;
    transform: translate3d(-0.25rem, 0, 0) scale(0.9);
  }
}

@keyframes heroui-overlay-enter-95 {
  from {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.95);
  }
}

@keyframes heroui-overlay-enter-95-y {
  from {
    opacity: 0;
    transform: translate3d(0, 0.25rem, 0) scale(0.95);
  }
}

@keyframes heroui-overlay-enter-95-ny {
  from {
    opacity: 0;
    transform: translate3d(0, -0.25rem, 0) scale(0.95);
  }
}

@keyframes heroui-overlay-enter-95-x {
  from {
    opacity: 0;
    transform: translate3d(0.25rem, 0, 0) scale(0.95);
  }
}

@keyframes heroui-overlay-enter-95-nx {
  from {
    opacity: 0;
    transform: translate3d(-0.25rem, 0, 0) scale(0.95);
  }
}

@keyframes heroui-overlay-enter-105 {
  from {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(1.05);
  }
}

@keyframes heroui-overlay-enter-105-y {
  from {
    opacity: 0;
    transform: translate3d(0, 0.25rem, 0) scale(1.05);
  }
}

@keyframes heroui-overlay-enter-105-ny {
  from {
    opacity: 0;
    transform: translate3d(0, -0.25rem, 0) scale(1.05);
  }
}

@keyframes heroui-overlay-enter-100-y {
  from {
    opacity: 0;
    transform: translate3d(0, 0.25rem, 0) scale(1);
  }
}

@keyframes heroui-overlay-enter-100-ny {
  from {
    opacity: 0;
    transform: translate3d(0, -0.25rem, 0) scale(1);
  }
}

@keyframes heroui-overlay-enter-100 {
  from {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
```

## 5. Enter / exit per component

| Component | Enter | Exit | Placement variants | Source |
|---|---|---|---|---|
| Modal backdrop | `heroui-overlay-fade-in 150ms var(--ease-out)` | `heroui-overlay-fade-out 100ms var(--ease-out)` | none | modal.css `.modal__backdrop` |
| Modal dialog (container) | `heroui-overlay-enter-105 250ms var(--ease-out-quad)` (opacity 0 → 1, scale 1.05 → 1) | `heroui-overlay-exit 100ms var(--ease-out-quad)` (scale 1 → 0.95, opacity → 0) | auto: `-105-y` (mobile) / `-105` (≥sm); top: `-105-ny`; bottom: `-105-y`; center: `-105`; size full: `-100*` enter + `heroui-overlay-fade-out` exit | modal.css `.modal__container` |
| Popover | `heroui-overlay-enter-90 150ms var(--ease-smooth)` | `heroui-overlay-exit 100ms var(--ease-smooth)` + `pointer-events-none` | top `-90-y`, bottom `-90-ny`, left `-90-x`, right `-90-nx` | popover.css |
| Dropdown (menu popover) | same as Popover | same as Popover | same | dropdown.css `.dropdown__popover` |
| Tooltip | same as Popover | same as Popover | same | tooltip.css |
| Tooltip delays | `--tooltip-delay: 1500ms`, `--tooltip-close-delay: 500ms` | | | variables.css |
| Accordion panel | `height` (to `var(--disclosure-panel-height)`) `200ms var(--ease-out-quad)` + `opacity 0 → 1 200ms var(--ease-out)` | reverse (same transitions) | none | accordion.css `.accordion__panel` (lines ~100-122), disclosure.css |
| Accordion indicator | `transition duration-250` (Tailwind default props + easing), `-rotate-180` when expanded | | | accordion.css |
| Tabs indicator | sliding pill: `transition-property: translate, width, height; transition-duration: 250ms; transition-timing-function: var(--ease-out-fluid)` | | | tabs.css `.tabs__indicator` |
| Tabs tab | `color 150ms var(--ease-smooth), background-color 150ms var(--ease-smooth), box-shadow 150ms var(--ease-out), opacity 150ms var(--ease-smooth)` | | | tabs.css `.tabs__tab` |
| Tabs panel | NOT FOUND (no enter animation; exiting panel only gets `absolute start-0 top-0 w-full`) | | | tabs.css `.tabs__panel` |
| Skeleton | shimmer: `::after` `-translate-x-full animate-skeleton bg-linear-to-r from-transparent via-surface-tertiary to-transparent`; pulse: `animate-pulse` | | | skeleton.css |
| Spinner | `animate-spin-fast` (`spin 0.75s linear infinite`) | | | spinner.css |
| Field error | `opacity 150ms var(--ease-out), height 350ms var(--ease-smooth)` | | | field-error.css |

### shadcn snippets

**Dialog overlay** (`DialogOverlay`):
```txt
replace: data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0
with:    data-[state=open]:animate-heroui-backdrop-in data-[state=closed]:animate-heroui-backdrop-out motion-reduce:animate-none
```

**Dialog content** (`DialogContent`):
```txt
replace: duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
with:    data-[state=open]:animate-heroui-modal-in data-[state=closed]:animate-heroui-modal-out motion-reduce:animate-none
```
(The keyframes animate `transform`. shadcn centers with `translate-x-[-50%] translate-y-[-50%]`, which in Tailwind v4 writes the separate `translate` property, so they don't conflict.)

**Popover / DropdownMenu / Tooltip / Select / HoverCard content**:
```txt
replace: data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
         (and the Tooltip variant: animate-in fade-in-0 zoom-in-95 …)
with:    data-[state=open]:animate-heroui-popover-in data-[state=closed]:animate-heroui-popover-out data-[state=closed]:pointer-events-none
         data-[side=top]:data-[state=open]:[animation-name:heroui-overlay-enter-90-y]
         data-[side=bottom]:data-[state=open]:[animation-name:heroui-overlay-enter-90-ny]
         data-[side=left]:data-[state=open]:[animation-name:heroui-overlay-enter-90-x]
         data-[side=right]:data-[state=open]:[animation-name:heroui-overlay-enter-90-nx]
         motion-reduce:animate-none
```
Tooltip (`TooltipContent`): shadcn applies the enter classes **without** a state prefix (`animate-in fade-in-0 zoom-in-95 …`), because Radix Tooltip states are `delayed-open` / `instant-open` / `closed`. Replace `animate-in fade-in-0 zoom-in-95` with the unprefixed `animate-heroui-popover-in`, replace `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95` with `data-[state=closed]:animate-heroui-popover-out`, and use the `data-[side=*]` lines with `not-data-[state=closed]:` in place of `data-[state=open]:` (e.g. `data-[side=top]:not-data-[state=closed]:[animation-name:heroui-overlay-enter-90-y]`) so the exit name still wins, the same way HeroUI gives exit higher specificity.
Tooltip delays (optional, changes behavior): HeroUI `1500ms` open / `500ms` close vs shadcn `TooltipProvider delayDuration={0}`. Only change this if the user asks.

**Accordion content** (`AccordionContent`, Radix sets `--radix-accordion-content-height`):
```txt
replace: data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down
with:    data-[state=open]:animate-[accordion-down_200ms_var(--ease-out-quad),heroui-overlay-fade-in_200ms_var(--ease-out)]
         data-[state=closed]:animate-[accordion-up_200ms_var(--ease-out-quad),heroui-overlay-fade-out_200ms_var(--ease-out)]
         motion-reduce:animate-none
```
(`accordion-down`/`accordion-up` keyframes come from shadcn's `shadcn/tailwind.css` or tw-animate-css. Only duration and easing come from HeroUI.)

**Accordion chevron** (`ChevronDownIcon` inside `AccordionTrigger`):
```txt
icon    replace: transition-transform duration-200     with: transition duration-250 motion-reduce:transition-none
trigger replace: [&[data-state=open]>svg]:rotate-180   with: [&[data-state=open]>svg]:-rotate-180
```

**Tabs trigger**:
```txt
add: [transition:color_150ms_var(--ease-smooth),background-color_150ms_var(--ease-smooth),box-shadow_150ms_var(--ease-out),opacity_150ms_var(--ease-smooth)] motion-reduce:transition-none hover:not-data-[state=active]:opacity-70
```
Sliding indicator: HeroUI uses React Aria `SelectionIndicator` (one element that moves). Radix Tabs has no equivalent, so classes alone can't reproduce the slide. The active tab gets the indicator look instead (`bg-segment shadow-surface rounded-3xl`, see components/tabs.md in phase 4b). Recreating the slide would need new markup/JS, which this skill doesn't do (it's not a migration).

**Skeleton** (shimmer):
```txt
replace: animate-pulse rounded-md bg-accent
with:    relative overflow-hidden rounded-sm bg-surface-tertiary/70 after:absolute after:inset-0 after:-translate-x-full after:animate-skeleton after:bg-linear-to-r after:from-transparent after:via-surface-tertiary after:to-transparent after:content-['']
```
(Pulse alternative from skeleton.css: `animate-pulse`. Tailwind `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`.)

**Spinner** (e.g. `Loader2Icon` in buttons): `animate-spin-fast motion-reduce:animate-none`.

## 6. All other keyframes in @heroui/styles (full definitions)

`themes/shared/theme.css`: `skeleton`, `caret-blink` (in section 1). `base/overlay-motion.css`: all `heroui-overlay-*` (section 4). Remaining:

```css
/* components/drawer.css */
@keyframes heroui-drawer-enter-bottom {
  from {
    translate: 0 100%;
  }
}
@keyframes heroui-drawer-enter-top {
  from {
    translate: 0 -100%;
  }
}
@keyframes heroui-drawer-enter-left {
  from {
    translate: -100% 0;
  }
}
@keyframes heroui-drawer-enter-right {
  from {
    translate: 100% 0;
  }
}

/* components/sheet.css */
@keyframes heroui-sheet-backdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
@keyframes heroui-sheet-scale-back {
  to {
    transform: translateZ(-120px);
  }
}

/* components/toast.css */
@keyframes toast-indicator-fade {
  from {
    opacity: 0;
  }
}
@keyframes toast-indicator-scale {
  from {
    scale: 0.92;
  }
}

/* components/progress-bar.css */
@keyframes progress-bar-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

/* components/progress-circle.css */
@keyframes progress-circle-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* components/input-otp.css */
@keyframes slot-value-in {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* components/scroll-shadow.css */
@keyframes scroll-shadow-start-fade {
  from {
    --scroll-shadow-start-fade: 0px;
  }
  to {
    --scroll-shadow-start-fade: var(--scroll-shadow-size);
  }
}
@keyframes scroll-shadow-end-fade {
  from {
    --scroll-shadow-end-fade: var(--scroll-shadow-size);
  }
  to {
    --scroll-shadow-end-fade: 0px;
  }
}

```
Tailwind built-ins HeroUI references: `spin` (`to { transform: rotate(360deg); }`), `pulse` (`50% { opacity: 0.5; }`).

Other component timings (for phase 4b): Drawer backdrop `opacity 250ms cubic-bezier(0.32, 0.72, 0, 1)` (exit 200ms); Toast `--toast-ease: var(--ease-out-fluid)`, enter 350ms, exit 250ms, opacity 150ms; indicator `toast-indicator-fade 150ms`, `toast-indicator-scale 200ms`.
