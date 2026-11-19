# HeroUI v3.2.7 tokens (SECONDARY reference: source @heroui/styles; herocn is primary, see tokens.md)

> **Superseded for application.** This file records the raw HeroUI v3.2.7 values used to spot-check herocn (`reference/herocn-diff.md`). The skill applies **herocn** tokens/classes from `tokens.md`, `motion.md` and `components/*.md`. Don't paste the globals block or class snippets from this file into projects; they use an older naming scheme (`--primary-hover`, `bg-field`, …) that herocn doesn't define.

Source: `@heroui/styles` **v3.2.7**, repo `heroui-inc/heroui` commit `08d4f13ce74b4cec13d5b5452f458891950b3ebc` (2026-11-18).
Files (heroui-inc/heroui @ `08d4f13`):

- `packages/styles/themes/default/variables.css`: all color / radius / border / shadow variables (light + dark)
- `packages/styles/themes/shared/theme.css`: Tailwind `@theme inline` mapping, radius scale, easings, animations
- `packages/styles/utilities/index.css`: focus ring, invalid ring, disabled utilities
- `packages/styles/base/base.css`: border-color inheritance, overlay z-index
- Cross-checked with HeroUI's skill script `get_theme.mjs` output and https://heroui.com/react/DESIGN.md.

---

## Quick reference (extracted)

### Colors: light / dark (exact values)

| HeroUI token | Light | Dark |
|---|---|---|
| `--white` | `oklch(100% 0 0)` | same (primitive) |
| `--black` | `oklch(0% 0 0)` | same (primitive) |
| `--snow` | `oklch(0.9911 0 0)` | same (primitive) |
| `--eclipse` | `oklch(0.2103 0.0059 285.89)` | same (primitive) |
| `--background` | `oklch(0.9702 0 0)` | `oklch(12% 0.005 285.823)` |
| `--foreground` | `var(--eclipse)` | `var(--snow)` |
| `--surface` | `var(--white)` | `oklch(0.2103 0.0059 285.89)` |
| `--surface-secondary` | `oklch(0.9524 0.0013 286.37)` | `oklch(0.257 0.0037 286.14)` |
| `--surface-tertiary` | `oklch(0.9373 0.0013 286.37)` | `oklch(0.2721 0.0024 247.91)` |
| `--overlay` | `var(--white)` | `oklch(0.2103 0.0059 285.89)` |
| `--muted` (text color) | `oklch(0.5517 0.0138 285.94)` | `oklch(70.5% 0.015 286.067)` |
| `--default` | `oklch(94% 0.001 286.375)` | `oklch(27.4% 0.006 286.033)` |
| `--default-foreground` | `var(--eclipse)` | `var(--snow)` |
| `--accent` | `oklch(0.6204 0.195 253.83)` | same (declared once in `:root, :host`) |
| `--accent-foreground` | `var(--snow)` | same |
| `--success` | `oklch(0.7329 0.1935 150.81)` | same |
| `--success-foreground` | `var(--eclipse)` | same |
| `--warning` | `oklch(0.7819 0.1585 72.33)` | `oklch(0.8203 0.1388 76.34)` |
| `--warning-foreground` | `var(--eclipse)` | `var(--eclipse)` |
| `--danger` | `oklch(0.6532 0.2328 25.74)` | `oklch(0.594 0.1967 24.63)` |
| `--danger-foreground` | `var(--snow)` | `var(--snow)` |
| `--field-background` | `var(--white)` | `oklch(0.2103 0.0059 285.89)` |
| `--field-foreground` | `oklch(0.2103 0.0059 285.89)` | `var(--foreground)` |
| `--field-placeholder` | `var(--muted)` | `var(--muted)` |
| `--field-border` | `transparent` | same |
| `--segment` | `var(--white)` | `oklch(0.3964 0.01 285.93)` |
| `--border` | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` |
| `--separator` | `oklch(92% 0.004 286.32)` | `oklch(25% 0.006 286.033)` |
| `--focus` | `var(--accent)` | `var(--accent)` |
| `--link` | `var(--foreground)` | `var(--foreground)` |
| `--backdrop` | `rgba(0, 0, 0, 0.5)` | `rgba(0, 0, 0, 0.6)` |

Hover / soft / field-state colors are `color-mix()` formulas; see the verbatim block below. Note that light and dark use **different percentages** for `--accent-soft*`, `--warning-soft*`, `--success-soft*` and `--danger-soft-foreground`.

### Radius

| Token | Value |
|---|---|
| `--radius` | `0.5rem` (8px) |
| `--field-radius` | `calc(var(--radius) * 1.5)` (12px) |
| `--radius-xs` … `--radius-4xl` | `×0.25`, `×0.5`, `×0.75`, `×1`, `×1.5`, `×2`, `×3`, `×4` of `--radius` (2/4/6/8/12/16/24/32px) |
| Card / Modal / Popover radius | `min(32px, var(--radius-3xl))` (components/card.css, modal.css, popover.css) |
| Tooltip radius | `min(32px, var(--radius-xl))` (components/tooltip.css) |
| Button radius | `rounded-3xl` (components/button.css) |
| Field radius | `rounded-field` = `var(--field-radius)` (components/input.css) |

### Shadows

| Token | Light | Dark |
|---|---|---|
| `--surface-shadow` (`shadow-surface`) | `0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(0, 0, 0, 0.06)` | `0 0 0 0 transparent inset` |
| `--overlay-shadow` (`shadow-overlay`) | `0 2px 8px 0 rgba(0, 0, 0, 0.06), 0 -6px 12px 0 rgba(0, 0, 0, 0.03), 0 14px 28px 0 rgba(0, 0, 0, 0.08)` | `0 0 1px 0 rgba(255, 255, 255, 0.3) inset` |
| `--field-shadow` (`shadow-field`) | same as surface shadow | `0 0 0 0 transparent inset` |

### Typography

| Item | Value | Source |
|---|---|---|
| Font family | HeroUI sets **no** font-family. It "inherits the application's font family and uses Tailwind's type scale". | DESIGN.md §Typography |
| Font used on heroui.com docs | `--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif` (Inter via `next/font/google`) | `apps/docs/src/app/global.css:63`, `apps/docs/src/app/[lang]/layout.tsx` |
| Sizes used by components | `text-xs` (0.75rem / lh calc(1/0.75)), `text-sm` (0.875rem / lh calc(1.25/0.875)), `text-base` (1rem / lh 1.5) | Tailwind v4.3.5 `theme.css` |
| Weights used by components | `font-medium` (500): button, label, card title, modal heading. `font-semibold` (600) is not used by the 4 core components | component CSS |
| Custom HeroUI font tokens | NOT FOUND (no `--font-*` in @heroui/styles) | `rg font-family packages/styles` |

### Spacing / sizing

| Token | Value |
|---|---|
| `--spacing` | `0.25rem` (4px rhythm) |
| Component sizes | Tailwind spacing utilities inside component CSS (e.g. button `h-10 md:h-9`); see `reference/components/*.md` |
| Dedicated size tokens (`--size-*`, `--height-*`) | NOT FOUND |

### Border, focus ring, disabled

| Rule | Value | Source |
|---|---|---|
| `--border-width` | `1px` | variables.css |
| `--field-border-width` | `0px` (fields have **no border** by default) | variables.css |
| `--field-border` | `transparent` | variables.css |
| Global border color | `*, ::after, ::before, ::backdrop, ::file-selector-button { border-color: var(--border, currentColor); }` | base/base.css |
| `focus-ring` (buttons, links, triggers) | `ring-2 ring-focus ring-offset-0 ring-offset-background outline-none; --tw-ring-offset-width: var(--ring-offset-width)` (2px) | utilities/index.css |
| `focus-field-ring` (inputs) | `ring-2 ring-focus ring-offset-0 outline-none; --tw-ring-offset-width: 0px` | utilities/index.css |
| `invalid-field-ring` | unfocused: `outline-1 outline-danger outline-solid`; focused: `ring-2 ring-danger ring-offset-0` | utilities/index.css |
| `status-disabled` | `opacity: var(--disabled-opacity)` (0.5); `cursor: var(--cursor-disabled)` (not-allowed); `pointer-events: none` | utilities/index.css |
| Cursor on interactive elements | `cursor: var(--cursor-interactive)` (pointer) | variables.css + component CSS |

---

## a) Raw HeroUI blocks (verbatim)

### `packages/styles/themes/default/variables.css`

```css
@layer base {
  /* HeroUI Default Theme */

  /*
   * == Common Variables ==
   * Identical in every theme, so they are also declared on `:host`: `:root` matches
   * nothing inside a shadow tree, and the theme blocks below never re-declare these.
   */
  :root,
  :host {
    /* Primitive Colors (Do not change between light and dark) */
    --white: oklch(100% 0 0);
    --black: oklch(0% 0 0);
    --snow: oklch(0.9911 0 0);
    --eclipse: oklch(0.2103 0.0059 285.89);

    /* Spacing scale */
    --spacing: 0.25rem;

    /* Border */
    --border-width: 1px;
    --field-border-width: 0px;
    --disabled-opacity: 0.5;

    /* Ring offset - Used for focus ring */
    --ring-offset-width: 2px;

    /* Cursor */
    --cursor-interactive: pointer;
    --cursor-disabled: not-allowed;

    /* Radius */
    --radius: 0.5rem;
    --field-radius: calc(var(--radius) * 1.5);

    /* Accent and status hues (shared with the dark theme) */
    --accent: oklch(0.6204 0.195 253.83);
    --accent-foreground: var(--snow);

    --success: oklch(0.7329 0.1935 150.81);
    --success-foreground: var(--eclipse);

    /* no border by default on form fields */
    --field-border: transparent;

    /* Skeleton Default Global Animation */
    --skeleton-animation: shimmer; /* shimmer, pulse, none */

    /* Tooltip Default Delays */
    --tooltip-delay: 1500ms;
    --tooltip-close-delay: 500ms;
  }

  :root,
  .light,
  .default,
  [data-theme="light"],
  [data-theme="default"],
  :host(.light),
  :host(.default),
  :host([data-theme="light"]),
  :host([data-theme="default"]) {
    color-scheme: light;

    /* == Light Theme Variables == */

    /* Base Colors */
    --background: oklch(0.9702 0 0);
    --foreground: var(--eclipse);

    /* Surface: Used for non-overlay components (cards, accordions, disclosure groups) */
    --surface: var(--white);
    --surface-foreground: var(--foreground);

    --surface-secondary: oklch(0.9524 0.0013 286.37);
    --surface-secondary-foreground: var(--foreground);

    --surface-tertiary: oklch(0.9373 0.0013 286.37);
    --surface-tertiary-foreground: var(--foreground);

    /* Overlay: Used for floating/overlay components (tooltips, popovers, modals, menus) */
    --overlay: var(--white);
    --overlay-foreground: var(--foreground);

    --muted: oklch(0.5517 0.0138 285.94);

    --scrollbar: var(--scrollbar-thumb);
    --scrollbar-thumb: color-mix(in oklch, var(--foreground) 15%, transparent);
    --scrollbar-track: transparent;
    --scrollbar-gutter: auto;
    --scrollbar-width: thin;
    --scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);

    --default: oklch(94% 0.001 286.375);
    --default-foreground: var(--eclipse);

    /* Form Fields */
    --field-background: var(--white);
    --field-foreground: oklch(0.2103 0.0059 285.89);
    --field-placeholder: var(--muted);

    /* Status Colors */
    --warning: oklch(0.7819 0.1585 72.33);
    --warning-foreground: var(--eclipse);

    --danger: oklch(0.6532 0.2328 25.74);
    --danger-foreground: var(--snow);

    /* Component Colors */
    --segment: var(--white);
    --segment-foreground: var(--eclipse);

    /* Misc Colors */
    --border: oklch(90% 0.004 286.32);
    --separator: oklch(92% 0.004 286.32);
    --focus: var(--accent);
    --link: var(--foreground);

    /* Backdrop */
    --backdrop: rgba(0, 0, 0, 0.5);

    /* Calculated Colors */
    --surface-hover: color-mix(in oklab, var(--surface) 92%, var(--surface-foreground) 8%);

    --background-secondary: color-mix(in oklab, var(--background) 96%, var(--foreground) 4%);
    --background-tertiary: color-mix(in oklab, var(--background) 92%, var(--foreground) 8%);
    --background-inverse: var(--foreground);

    --default-hover: color-mix(in oklab, var(--default) 96%, var(--default-foreground) 4%);
    --accent-hover: color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%);
    --success-hover: color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%);
    --warning-hover: color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%);
    --danger-hover: color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%);

    --field-hover: color-mix(
      in oklab,
      var(--field-background, var(--default)) 90%,
      var(--field-foreground, var(--foreground)) 2%
    );
    --field-focus: var(--field-background, var(--default));
    --field-border-hover: color-mix(
      in oklab,
      var(--field-border, var(--border)) 88%,
      var(--field-foreground, var(--foreground)) 10%
    );
    --field-border-focus: color-mix(
      in oklab,
      var(--field-border, var(--border)) 74%,
      var(--field-foreground, var(--foreground)) 22%
    );

    --default-soft: color-mix(in oklab, var(--default) 50%, transparent);
    --default-soft-foreground: var(--default-foreground);
    --default-soft-hover: color-mix(in oklab, var(--default) 60%, transparent);

    --accent-soft: color-mix(in oklab, var(--accent) 15%, transparent);
    --accent-soft-foreground: color-mix(in oklab, var(--accent) 70%, var(--foreground) 30%);
    --accent-soft-hover: color-mix(in oklab, var(--accent) 20%, transparent);

    --danger-soft: color-mix(in oklab, var(--danger) 15%, transparent);
    --danger-soft-foreground: color-mix(in oklab, var(--danger) 70%, var(--foreground) 40%);
    --danger-soft-hover: color-mix(in oklab, var(--danger) 20%, transparent);

    --warning-soft: color-mix(in oklab, var(--warning) 15%, transparent);
    --warning-soft-foreground: color-mix(in oklab, var(--warning) 80%, var(--foreground) 70%);
    --warning-soft-hover: color-mix(in oklab, var(--warning) 20%, transparent);

    --success-soft: color-mix(in oklab, var(--success) 15%, transparent);
    --success-soft-foreground: color-mix(in oklab, var(--success) 80%, var(--foreground) 60%);
    --success-soft-hover: color-mix(in oklab, var(--success) 20%, transparent);

    --separator-secondary: color-mix(in oklab, var(--surface) 85%, var(--surface-foreground) 15%);
    --separator-tertiary: color-mix(in oklab, var(--surface) 81%, var(--surface-foreground) 19%);

    --border-secondary: color-mix(in oklab, var(--surface) 78%, var(--surface-foreground) 22%);
    --border-tertiary: color-mix(in oklab, var(--surface) 66%, var(--surface-foreground) 34%);

    /* Shadows */
    /* --surface-shadow: 0 0px 0px 0 rgba(24, 24, 27, 0.03), 0 2px 10px 0 rgba(24, 24, 27, 0.08); */
    --surface-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06),
      0 0 1px 0 rgba(0, 0, 0, 0.06);
    /* Overlay shadow */
    --overlay-shadow:
      0 2px 8px 0 rgba(0, 0, 0, 0.06), 0 -6px 12px 0 rgba(0, 0, 0, 0.03),
      0 14px 28px 0 rgba(0, 0, 0, 0.08);
    --field-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06),
      0 0 1px 0 rgba(0, 0, 0, 0.06);
  }

  .dark,
  [data-theme="dark"],
  :host(.dark),
  :host([data-theme="dark"]) {
    color-scheme: dark;
    /* == Dark Theme Variables == */

    /* Base Colors */
    --background: oklch(12% 0.005 285.823);
    --foreground: var(--snow);

    /* Surface: Used for non-overlay components (cards, accordions, disclosure groups) */
    --surface: oklch(0.2103 0.0059 285.89);
    --surface-foreground: var(--foreground);

    --surface-secondary: oklch(0.257 0.0037 286.14);
    --surface-secondary-foreground: var(--foreground);

    --surface-tertiary: oklch(0.2721 0.0024 247.91);
    --surface-tertiary-foreground: var(--foreground);

    /* Overlay: Used for floating/overlay components (tooltips, popovers, modals, menus) - lighter for contrast */
    --overlay: oklch(0.2103 0.0059 285.89);
    --overlay-foreground: var(--foreground);

    --muted: oklch(70.5% 0.015 286.067);

    --scrollbar: var(--scrollbar-thumb);
    --scrollbar-thumb: color-mix(in oklch, var(--foreground) 15%, transparent);
    --scrollbar-track: transparent;
    --scrollbar-gutter: auto;
    --scrollbar-width: thin;
    --scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);

    --default: oklch(27.4% 0.006 286.033);
    --default-foreground: var(--snow);

    /* Form Fields */
    --field-background: oklch(0.2103 0.0059 285.89);
    --field-foreground: var(--foreground);
    --field-placeholder: var(--muted);

    /* Status Colors */
    --warning: oklch(0.8203 0.1388 76.34);
    --warning-foreground: var(--eclipse);

    --danger: oklch(0.594 0.1967 24.63);
    --danger-foreground: var(--snow);

    /* Component Colors */
    --segment: oklch(0.3964 0.01 285.93);
    --segment-foreground: var(--foreground);

    /* Misc Colors */
    --border: oklch(28% 0.006 286.033);
    --separator: oklch(25% 0.006 286.033);
    --focus: var(--accent);
    --link: var(--foreground);

    /* Backdrop */
    --backdrop: rgba(0, 0, 0, 0.6);

    /* Shadows */
    --surface-shadow: 0 0 0 0 transparent inset; /* No shadow on dark mode */
    --overlay-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.3) inset;
    --field-shadow: 0 0 0 0 transparent inset; /* Transparent shadow to allow ring utilities to work */

    /* Calculated Colors */
    --surface-hover: color-mix(in oklab, var(--surface) 92%, var(--surface-foreground) 8%);

    --background-secondary: color-mix(in oklab, var(--background) 96%, var(--foreground) 4%);
    --background-tertiary: color-mix(in oklab, var(--background) 92%, var(--foreground) 8%);
    --background-inverse: var(--foreground);

    --default-hover: color-mix(in oklab, var(--default) 96%, var(--default-foreground) 4%);
    --accent-hover: color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%);
    --success-hover: color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%);
    --warning-hover: color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%);
    --danger-hover: color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%);

    --field-hover: color-mix(
      in oklab,
      var(--field-background, var(--default)) 90%,
      var(--field-foreground, var(--foreground)) 2%
    );
    --field-focus: var(--field-background, var(--default));
    --field-border-hover: color-mix(
      in oklab,
      var(--field-border, var(--border)) 88%,
      var(--field-foreground, var(--foreground)) 10%
    );
    --field-border-focus: color-mix(
      in oklab,
      var(--field-border, var(--border)) 74%,
      var(--field-foreground, var(--foreground)) 22%
    );

    --default-soft: color-mix(in oklab, var(--default) 50%, transparent);
    --default-soft-foreground: var(--default-foreground);
    --default-soft-hover: color-mix(in oklab, var(--default) 60%, transparent);

    --accent-soft: color-mix(in oklab, var(--accent) 12%, transparent);
    --accent-soft-foreground: color-mix(in oklab, var(--accent) 80%, var(--foreground) 30%);
    --accent-soft-hover: color-mix(in oklab, var(--accent) 16%, transparent);

    --danger-soft: color-mix(in oklab, var(--danger) 15%, transparent);
    --danger-soft-foreground: color-mix(in oklab, var(--danger) 80%, var(--foreground) 30%);
    --danger-soft-hover: color-mix(in oklab, var(--danger) 20%, transparent);

    --warning-soft: color-mix(in oklab, var(--warning) 12%, transparent);
    --warning-soft-foreground: color-mix(in oklab, var(--warning) 80%, var(--foreground) 30%);
    --warning-soft-hover: color-mix(in oklab, var(--warning) 16%, transparent);

    --success-soft: color-mix(in oklab, var(--success) 12%, transparent);
    --success-soft-foreground: color-mix(in oklab, var(--success) 80%, var(--foreground) 30%);
    --success-soft-hover: color-mix(in oklab, var(--success) 16%, transparent);

    --separator-secondary: color-mix(in oklab, var(--surface) 85%, var(--surface-foreground) 15%);
    --separator-tertiary: color-mix(in oklab, var(--surface) 81%, var(--surface-foreground) 19%);

    --border-secondary: color-mix(in oklab, var(--surface) 78%, var(--surface-foreground) 22%);
    --border-tertiary: color-mix(in oklab, var(--surface) 66%, var(--surface-foreground) 34%);
  }

  /* Vibrant palette - more saturated soft foregrounds, less contrast */
  [data-vibrant-palette="true"]:not(.dark):not([data-theme="dark"]) {
    --accent-soft-foreground: color-mix(in oklab, var(--accent) 92%, var(--foreground) 8%);
    --danger-soft-foreground: color-mix(in oklab, var(--danger) 92%, var(--foreground) 8%);
    --warning-soft-foreground: color-mix(in oklab, var(--warning) 92%, var(--foreground) 8%);
    --success-soft-foreground: color-mix(in oklab, var(--success) 92%, var(--foreground) 8%);
  }

  [data-vibrant-palette="true"].dark,
  [data-vibrant-palette="true"][data-theme="dark"] {
    --accent-soft-foreground: color-mix(in oklab, var(--accent) 92%, var(--foreground) 8%);
    --danger-soft-foreground: color-mix(in oklab, var(--danger) 92%, var(--foreground) 8%);
    --warning-soft-foreground: color-mix(in oklab, var(--warning) 92%, var(--foreground) 8%);
    --success-soft-foreground: color-mix(in oklab, var(--success) 92%, var(--foreground) 8%);
  }
}
```

### `packages/styles/themes/shared/theme.css`

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-surface: var(--surface);
  --color-surface-foreground: var(--surface-foreground);
  --color-surface-hover: var(--surface-hover);

  --color-surface-secondary: var(--surface-secondary);
  --color-surface-secondary-foreground: var(--surface-secondary-foreground);

  --color-surface-tertiary: var(--surface-tertiary);
  --color-surface-tertiary-foreground: var(--surface-tertiary-foreground);

  --color-overlay: var(--overlay);
  --color-overlay-foreground: var(--overlay-foreground);

  --color-muted: var(--muted);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-segment: var(--segment);
  --color-segment-foreground: var(--segment-foreground);

  --color-border: var(--border);
  --color-separator: var(--separator);
  --color-focus: var(--focus);
  --color-link: var(--link);

  --color-default: var(--default);
  --color-default-foreground: var(--default-foreground);

  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);

  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);

  --color-danger: var(--danger);
  --color-danger-foreground: var(--danger-foreground);

  --color-backdrop: var(--backdrop);

  --shadow-surface: var(--surface-shadow);
  --shadow-overlay: var(--overlay-shadow);
  --shadow-field: var(--field-shadow);

  /* Form Field Tokens */
  --color-field: var(--field-background, var(--default));
  --color-field-hover: var(--field-hover);
  --color-field-foreground: var(--field-foreground, var(--foreground));
  --color-field-placeholder: var(--field-placeholder, var(--muted));
  --color-field-border: var(--field-border, var(--border));
  --radius-field: var(--field-radius, calc(var(--radius) * 1.5));
  --border-width-field: var(--field-border-width, var(--border-width));

  /* Color Tokens */
  --color-background-secondary: var(--background-secondary);
  --color-background-tertiary: var(--background-tertiary);
  --color-background-inverse: var(--background-inverse);

  --color-default-hover: var(--default-hover);
  --color-accent-hover: var(--accent-hover);
  --color-success-hover: var(--success-hover);
  --color-warning-hover: var(--warning-hover);
  --color-danger-hover: var(--danger-hover);

  /* Form Field Colors */
  --color-field-focus: var(--field-focus);
  --color-field-border-hover: var(--field-border-hover);
  --color-field-border-focus: var(--field-border-focus);

  /* Soft Colors */
  --color-default-soft: var(--default-soft);
  --color-default-soft-foreground: var(--default-soft-foreground);
  --color-default-soft-hover: var(--default-soft-hover);

  --color-accent-soft: var(--accent-soft);
  --color-accent-soft-foreground: var(--accent-soft-foreground);
  --color-accent-soft-hover: var(--accent-soft-hover);

  --color-danger-soft: var(--danger-soft);
  --color-danger-soft-foreground: var(--danger-soft-foreground);
  --color-danger-soft-hover: var(--danger-soft-hover);

  --color-warning-soft: var(--warning-soft);
  --color-warning-soft-foreground: var(--warning-soft-foreground);
  --color-warning-soft-hover: var(--warning-soft-hover);

  --color-success-soft: var(--success-soft);
  --color-success-soft-foreground: var(--success-soft-foreground);
  --color-success-soft-hover: var(--success-soft-hover);

  /* Separator Colors - Levels */
  --color-separator-secondary: var(--separator-secondary);
  --color-separator-tertiary: var(--separator-tertiary);

  /* Border Colors - Levels */
  --color-border-secondary: var(--border-secondary);
  --color-border-tertiary: var(--border-tertiary);

  /* Radius and default sizes - defaults can change by just changing the --radius */
  --radius-xs: calc(var(--radius) * 0.25); /* 0.125rem (2px) */
  --radius-sm: calc(var(--radius) * 0.5); /* 0.25rem (4px) */
  --radius-md: calc(var(--radius) * 0.75); /* 0.375rem (6px) */
  --radius-lg: calc(var(--radius) * 1); /* 0.5rem (8px) */
  --radius-xl: calc(var(--radius) * 1.5); /* 0.75rem (12px) */
  --radius-2xl: calc(var(--radius) * 2); /* 1rem (16px) */
  --radius-3xl: calc(var(--radius) * 3); /* 1.5rem (24px) */
  --radius-4xl: calc(var(--radius) * 4); /* 2rem (32px) */

  /* Transition Timing Functions  */
  --ease-smooth: ease; /* same as transition: ease; */
  /* These custom curves are made by https://twitter.com/bdc */

  /* From smoother to faster */
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
  /* From slower to faster */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
  /* Custom smooth-out curve: fast start, smooth stop - Apple style */
  --ease-out-fluid: cubic-bezier(0.32, 0.72, 0, 1);
  /* From slower to faster */
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  /* Linear */
  --ease-linear: linear;

  /* Animations */
  --animate-spin-fast: spin 0.75s linear infinite;
  --animate-skeleton: skeleton 2s linear infinite;
  --animate-caret-blink: caret-blink 1.2s ease-out infinite;

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

### `packages/styles/utilities/index.css`

```css
/* === Focus Ring === */
@utility focus-ring {
  @apply ring-2 ring-focus ring-offset-0 ring-offset-background outline-none;
  /* Overrides the ring offset from the theme variables */
  --tw-ring-offset-width: var(--ring-offset-width);
}

@utility focus-field-ring {
  @apply ring-2 ring-focus ring-offset-0 outline-none;
  /* No separation - ring sits directly against the element */
  --tw-ring-offset-width: 0px;
}

@utility invalid-field-ring {
  /* Unfocused: show 1px outline */
  @apply outline-1 outline-danger outline-solid;
  --tw-ring-offset-width: 3px;

  /* Focused: show 2px ring in danger color, remove outline */
  &:focus,
  &:focus-visible,
  &[data-focused="true"],
  &[data-focus-visible="true"],
  &:focus-within,
  &[data-focus-within="true"] {
    @apply ring-2 ring-danger ring-offset-0;
    --tw-ring-offset-width: 0px;
  }
}

@utility no-highlight {
  -webkit-tap-highlight-color: transparent;
}

/**
 * Widens the pressable area of a control smaller than the 24px minimum target size
 * (WCAG 2.5.8) with a transparent centred overlay, leaving its size, its visible content
 * and the surrounding layout untouched. The host must establish a containing block
 * (`relative` or `absolute`), otherwise the overlay escapes to the nearest one.
 */
@utility touch-target {
  &::after {
    content: "";
    @apply absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2;
  }
}

/* === Statuses === */
@utility status-focused {
  @apply focus-ring;
}

@utility status-focused-field {
  @apply focus-field-ring;
}

@utility status-invalid-field {
  @apply invalid-field-ring;
}

@utility status-disabled {
  opacity: var(--disabled-opacity);
  cursor: var(--cursor-disabled);
  pointer-events: none;
}

@utility status-pending {
  @apply pointer-events-none;
}

/* === Scrollbars (standards-only; apply per scroll slot in component CSS) === */
@utility scrollbar {
  scrollbar-width: var(--scrollbar-width);
  scrollbar-color: var(--scrollbar-color);
  scrollbar-gutter: var(--scrollbar-gutter);
}

@utility scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
  scrollbar-gutter: auto;
}

@utility scrollbar-default {
  scrollbar-width: auto;
  scrollbar-color: auto;
  scrollbar-gutter: auto;
}

/* Direct properties only — does not inherit none to nested scroll slots */
@utility scrollbar-none {
  scrollbar-width: none;
  scrollbar-color: auto;
  scrollbar-gutter: auto;
  -ms-overflow-style: none;
}
```

### `packages/styles/base/base.css`

```css
/* Shared by full and selective stylesheet imports. */
@import "./overlay-motion.css";

/*
 * Scrollbar styles
 *
 * TODO: This is a temporary workaround by removing the scrollbar styles.
 * Global scrollbar styling causes modal/overlay interaction/closure issues
 * (e.g. backdrop clicks not closing the overlay) and should be removed.
 */
/*
*:not(.alert-dialog__backdrop):not(.modal__backdrop) {
  scrollbar-color: var(--scrollbar) transparent;
  scrollbar-width: thin;
}
*/

/* Border color inheritance */
*,
::after,
::before,
::backdrop,
::file-selector-button {
  border-color: var(--border, currentColor);
}

/* Keeps main page content interactive during view transitions */
:root {
  view-transition-name: none;

  /**
   * Stacking level shared by every overlay that React Aria portals to the body.
   *
   * React Aria positions popover-level overlays (Dropdown, Popover, Select, Tooltip, …)
   * with a hard-coded `z-index: 100000`, so modal-level overlays (Modal, AlertDialog,
   * Drawer) have to match it rather than sit below it. Because the values are equal, the
   * portal mount order decides what paints on top, which is what we want in both
   * directions: a Modal opened from a Dropdown covers the closing dropdown, and a Select
   * opened inside a Modal still renders above the Modal.
   */
  --z-index-overlay: 100000;

  /* Toasts stay reachable while a modal-level overlay is open. */
  --z-index-toast: calc(var(--z-index-overlay) + 1);
}

::view-transition {
  pointer-events: none;
}
```

---

## b) Mapping table: HeroUI token → shadcn variable

How to read it: shadcn variable **names** stay the same so `components/ui/*` keeps compiling. Each one gets the **value** of the HeroUI token with the same *role*.
Watch for name collisions: shadcn `--accent` is a neutral hover fill, but HeroUI `--accent` is the brand blue. shadcn `--muted` is a background, but HeroUI `--muted` is a text color.

| HeroUI token | shadcn variable | Value (light) | Value (dark) |
|---|---|---|---|
| `--background` | `--background` | `oklch(0.9702 0 0)` | `oklch(12% 0.005 285.823)` |
| `--foreground` | `--foreground` | `var(--eclipse)` = `oklch(0.2103 0.0059 285.89)` | `var(--snow)` = `oklch(0.9911 0 0)` |
| `--surface` | `--card` | `var(--white)` = `oklch(100% 0 0)` | `oklch(0.2103 0.0059 285.89)` |
| `--surface-foreground` | `--card-foreground` | `var(--foreground)` | `var(--foreground)` |
| `--overlay` | `--popover` | `var(--white)` = `oklch(100% 0 0)` | `oklch(0.2103 0.0059 285.89)` |
| `--overlay-foreground` | `--popover-foreground` | `var(--foreground)` | `var(--foreground)` |
| `--accent` | `--primary` | `oklch(0.6204 0.195 253.83)` | `oklch(0.6204 0.195 253.83)` |
| `--accent-foreground` | `--primary-foreground` | `var(--snow)` | `var(--snow)` |
| `--default` | `--secondary` | `oklch(94% 0.001 286.375)` | `oklch(27.4% 0.006 286.033)` |
| `--default-foreground` | `--secondary-foreground` | `var(--eclipse)` | `var(--snow)` |
| `--default` | `--muted` (background role) | `oklch(94% 0.001 286.375)` | `oklch(27.4% 0.006 286.033)` |
| `--muted` | `--muted-foreground` | `oklch(0.5517 0.0138 285.94)` | `oklch(70.5% 0.015 286.067)` |
| `--default` | `--accent` (hover fill role) | `oklch(94% 0.001 286.375)` | `oklch(27.4% 0.006 286.033)` |
| `--default-foreground` | `--accent-foreground` | `var(--eclipse)` | `var(--snow)` |
| `--danger` | `--destructive` | `oklch(0.6532 0.2328 25.74)` | `oklch(0.594 0.1967 24.63)` |
| `--danger-foreground` | `--destructive-foreground` | `var(--snow)` | `var(--snow)` |
| `--border` | `--border` | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` |
| `--border` (HeroUI `--field-border` is `transparent`) | `--input` | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` |
| `--focus` (= `var(--accent)`) | `--ring` | `oklch(0.6204 0.195 253.83)` | `oklch(0.6204 0.195 253.83)` |
| `--radius` | `--radius` | `0.5rem` | `0.5rem` |
| NOT FOUND (no chart palette). Alias: `--accent` | `--chart-1` | `oklch(0.6204 0.195 253.83)` | same |
| NOT FOUND. Alias: `--success` | `--chart-2` | `oklch(0.7329 0.1935 150.81)` | same |
| NOT FOUND. Alias: `--warning` | `--chart-3` | `oklch(0.7819 0.1585 72.33)` | `oklch(0.8203 0.1388 76.34)` |
| NOT FOUND. Alias: `--danger` | `--chart-4` | `oklch(0.6532 0.2328 25.74)` | `oklch(0.594 0.1967 24.63)` |
| NOT FOUND. Alias: `--muted` | `--chart-5` | `oklch(0.5517 0.0138 285.94)` | `oklch(70.5% 0.015 286.067)` |
| NOT FOUND (no sidebar tokens). Alias: `--background` | `--sidebar` | `oklch(0.9702 0 0)` | `oklch(12% 0.005 285.823)` |
| alias: `--foreground` | `--sidebar-foreground` | `var(--eclipse)` | `var(--snow)` |
| alias: `--accent` | `--sidebar-primary` | `oklch(0.6204 0.195 253.83)` | same |
| alias: `--accent-foreground` | `--sidebar-primary-foreground` | `var(--snow)` | same |
| alias: `--default` | `--sidebar-accent` | `oklch(94% 0.001 286.375)` | `oklch(27.4% 0.006 286.033)` |
| alias: `--default-foreground` | `--sidebar-accent-foreground` | `var(--eclipse)` | `var(--snow)` |
| alias: `--border` | `--sidebar-border` | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` |
| alias: `--focus` | `--sidebar-ring` | `oklch(0.6204 0.195 253.83)` | same |

**Extra HeroUI tokens added to the project** (no shadcn equivalent, needed by `reference/components/*`):
`--surface*`, `--overlay*`, `--default*`, `--field-*`, `--success*`, `--warning*`, `--danger*`, `--segment*`, `--separator*`, `--border-secondary/tertiary`, `--focus`, `--link`, `--backdrop`, `--surface-shadow`, `--overlay-shadow`, `--field-shadow`, `--disabled-opacity`, `--ring-offset-width`, `--cursor-*`.
HeroUI's `--accent-hover`, `--accent-soft`, `--accent-soft-foreground` and `--accent-soft-hover` are renamed to **`--primary-hover`, `--primary-soft`, `--primary-soft-foreground`, `--primary-soft-hover`** because the name `--accent` is taken by shadcn. Their formulas are unchanged.

Utilities this unlocks: `bg-surface`, `bg-overlay`, `bg-default`, `bg-default-hover`, `bg-primary-hover`, `bg-danger-soft`, `text-danger-soft-foreground`, `bg-field`, `bg-field-hover`, `text-field-placeholder`, `border-field-border`, `rounded-field`, `shadow-surface`, `shadow-overlay`, `shadow-field`, `bg-backdrop`, `ring-focus`, `focus-ring`, `focus-field-ring`, `invalid-field-ring`, `status-disabled`.

---

## c) Ready-to-paste `globals.css` (Tailwind v4 + shadcn)

Replace your whole `app/globals.css` (or `src/app/globals.css` / `styles/globals.css`) with the block below. Keep project-specific additions (e.g. `@source`, extra `@layer` rules) by re-adding them at the end. Also paste the `@theme` block from `reference/motion.md` (easings + keyframes). The font line expects `next/font` Inter with `variable: "--font-inter"`. If the project uses another font, keep its existing `--font-sans` line instead.

```css
/* ==========================================================================
 * shadcn-to-heroui — replacement globals.css (Tailwind v4 + shadcn)
 * Values copied from @heroui/styles v3.2.7 (commit 08d4f13):
 *   packages/styles/themes/default/variables.css
 *   packages/styles/themes/shared/theme.css
 *   packages/styles/base/base.css, base/overlay-motion.css, utilities/index.css
 * shadcn variable NAMES are kept (so every components/ui file keeps working);
 * their VALUES now come from the HeroUI token listed in the trailing comment.
 * Extra HeroUI tokens are added under non-colliding names.
 * ========================================================================== */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css"; /* keep only if your project already imports it */

@custom-variant dark (&:is(.dark *));

:root {
  /* HeroUI primitives */
  --white: oklch(100% 0 0);
  --black: oklch(0% 0 0);
  --snow: oklch(0.9911 0 0);
  --eclipse: oklch(0.2103 0.0059 285.89);

  /* HeroUI shape / border / state primitives */
  --radius: 0.5rem;                               /* HeroUI --radius */
  --field-radius: calc(var(--radius) * 1.5);      /* HeroUI --field-radius */
  --border-width: 1px;                            /* HeroUI --border-width */
  --field-border-width: 0px;                      /* HeroUI --field-border-width */
  --disabled-opacity: 0.5;                        /* HeroUI --disabled-opacity */
  --ring-offset-width: 2px;                       /* HeroUI --ring-offset-width */
  --cursor-interactive: pointer;                  /* HeroUI --cursor-interactive */
  --cursor-disabled: not-allowed;                 /* HeroUI --cursor-disabled */

  color-scheme: light;

  /* ---- shadcn variables (HeroUI values, light) ---- */
  --background: oklch(0.9702 0 0);                /* HeroUI --background */
  --foreground: var(--eclipse);                   /* HeroUI --foreground */
  --card: var(--white);                           /* HeroUI --surface */
  --popover: var(--white);                        /* HeroUI --overlay */
  --primary: oklch(0.6204 0.195 253.83);          /* HeroUI --accent */
  --primary-foreground: var(--snow);              /* HeroUI --accent-foreground */
  --secondary: oklch(94% 0.001 286.375);          /* HeroUI --default */
  --secondary-foreground: var(--eclipse);         /* HeroUI --default-foreground */
  --muted: oklch(94% 0.001 286.375);              /* HeroUI --default (neutral fill, e.g. tabs list bg) */
  --muted-foreground: oklch(0.5517 0.0138 285.94);/* HeroUI --muted */
  --accent: oklch(94% 0.001 286.375);             /* HeroUI --default (ghost/menu hover fill) */
  --accent-foreground: var(--eclipse);            /* HeroUI --default-foreground */
  --destructive: oklch(0.6532 0.2328 25.74);      /* HeroUI --danger */
  --destructive-foreground: var(--snow);          /* HeroUI --danger-foreground */
  --border: oklch(90% 0.004 286.32);              /* HeroUI --border */
  --input: oklch(90% 0.004 286.32);               /* HeroUI --border (HeroUI fields have no border: --field-border: transparent) */

  /* chart: NOT FOUND in HeroUI (no chart palette). Aliased to HeroUI semantic hues. */
  --chart-2: oklch(0.7329 0.1935 150.81);         /* alias -> HeroUI --success */
  --chart-3: oklch(0.7819 0.1585 72.33);          /* alias -> HeroUI --warning */
  --chart-4: oklch(0.6532 0.2328 25.74);          /* alias -> HeroUI --danger */
  --chart-5: oklch(0.5517 0.0138 285.94);         /* alias -> HeroUI --muted */

  /* sidebar: NOT FOUND in HeroUI (no sidebar tokens). Aliased to HeroUI tokens. */

  /* ---- extra HeroUI tokens (non-colliding names) ---- */
  --surface: var(--white);
  --surface-secondary: oklch(0.9524 0.0013 286.37);
  --surface-tertiary: oklch(0.9373 0.0013 286.37);
  --overlay: var(--white);
  --default: oklch(94% 0.001 286.375);
  --default-foreground: var(--eclipse);
  --field-background: var(--white);
  --field-foreground: oklch(0.2103 0.0059 285.89);
  --field-border: transparent;
  --success: oklch(0.7329 0.1935 150.81);
  --success-foreground: var(--eclipse);
  --warning: oklch(0.7819 0.1585 72.33);
  --warning-foreground: var(--eclipse);
  --danger: oklch(0.6532 0.2328 25.74);
  --danger-foreground: var(--snow);
  --segment: var(--white);
  --segment-foreground: var(--eclipse);
  --separator: oklch(92% 0.004 286.32);
  --backdrop: rgba(0, 0, 0, 0.5);

  /* HeroUI shadows (light) */
  --surface-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06),
    0 0 1px 0 rgba(0, 0, 0, 0.06);
  --overlay-shadow:
    0 2px 8px 0 rgba(0, 0, 0, 0.06), 0 -6px 12px 0 rgba(0, 0, 0, 0.03),
    0 14px 28px 0 rgba(0, 0, 0, 0.08);
  --field-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06),
    0 0 1px 0 rgba(0, 0, 0, 0.06);

  /* HeroUI misc */
  --z-index-overlay: 100000;
  --skeleton-animation: shimmer;
  --tooltip-delay: 1500ms;
  --tooltip-close-delay: 500ms;
}

.dark {
  color-scheme: dark;

  /* ---- shadcn variables (HeroUI values, dark) ---- */
  --background: oklch(12% 0.005 285.823);         /* HeroUI --background */
  --foreground: var(--snow);                      /* HeroUI --foreground */
  --card: oklch(0.2103 0.0059 285.89);            /* HeroUI --surface */
  --popover: oklch(0.2103 0.0059 285.89);         /* HeroUI --overlay */
  --primary: oklch(0.6204 0.195 253.83);          /* HeroUI --accent (same in dark) */
  --primary-foreground: var(--snow);
  --secondary: oklch(27.4% 0.006 286.033);        /* HeroUI --default */
  --secondary-foreground: var(--snow);            /* HeroUI --default-foreground */
  --muted: oklch(27.4% 0.006 286.033);            /* HeroUI --default */
  --muted-foreground: oklch(70.5% 0.015 286.067); /* HeroUI --muted */
  --accent: oklch(27.4% 0.006 286.033);           /* HeroUI --default */
  --accent-foreground: var(--snow);
  --destructive: oklch(0.594 0.1967 24.63);       /* HeroUI --danger */
  --destructive-foreground: var(--snow);
  --border: oklch(28% 0.006 286.033);             /* HeroUI --border */
  --input: oklch(28% 0.006 286.033);              /* HeroUI --border */

  --chart-3: oklch(0.8203 0.1388 76.34);          /* alias -> HeroUI --warning (dark) */
  --chart-4: oklch(0.594 0.1967 24.63);           /* alias -> HeroUI --danger (dark) */
  --chart-5: oklch(70.5% 0.015 286.067);          /* alias -> HeroUI --muted (dark) */

  /* ---- extra HeroUI tokens (dark) ---- */
  --surface: oklch(0.2103 0.0059 285.89);
  --surface-secondary: oklch(0.257 0.0037 286.14);
  --surface-tertiary: oklch(0.2721 0.0024 247.91);
  --overlay: oklch(0.2103 0.0059 285.89);
  --default: oklch(27.4% 0.006 286.033);
  --default-foreground: var(--snow);
  --field-background: oklch(0.2103 0.0059 285.89);
  --field-foreground: var(--foreground);
  --warning: oklch(0.8203 0.1388 76.34);
  --danger: oklch(0.594 0.1967 24.63);
  --segment: oklch(0.3964 0.01 285.93);
  --segment-foreground: var(--foreground);
  --separator: oklch(25% 0.006 286.033);
  --backdrop: rgba(0, 0, 0, 0.6);


  /* HeroUI shadows (dark) */
  --surface-shadow: 0 0 0 0 transparent inset;
  --overlay-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.3) inset;
  --field-shadow: 0 0 0 0 transparent inset;
}

/* Derived tokens: declared for both modes (HeroUI repeats these in its light and dark blocks
   so they re-resolve wherever .dark is applied). */
:root,
.dark {
  --card-foreground: var(--foreground);           /* HeroUI --surface-foreground */
  --popover-foreground: var(--foreground);        /* HeroUI --overlay-foreground */
  --ring: var(--primary);                         /* HeroUI --focus = var(--accent) */
  --chart-1: var(--primary);                      /* alias -> HeroUI --accent */
  --sidebar: var(--background);
  --sidebar-foreground: var(--foreground);
  --sidebar-primary: var(--primary);
  --sidebar-primary-foreground: var(--primary-foreground);
  --sidebar-accent: var(--accent);
  --sidebar-accent-foreground: var(--accent-foreground);
  --sidebar-border: var(--border);
  --sidebar-ring: var(--ring);
  --surface-foreground: var(--foreground);
  --surface-secondary-foreground: var(--foreground);
  --surface-tertiary-foreground: var(--foreground);
  --overlay-foreground: var(--foreground);
  --field-placeholder: var(--muted-foreground);   /* HeroUI: var(--muted) */
  --focus: var(--primary);                        /* HeroUI --focus: var(--accent) */
  --link: var(--foreground);
  /* HeroUI calculated colors (formulas copied; HeroUI --accent renamed to --primary) */
  --surface-hover: color-mix(in oklab, var(--surface) 92%, var(--surface-foreground) 8%);
  --default-hover: color-mix(in oklab, var(--default) 96%, var(--default-foreground) 4%);
  --primary-hover: color-mix(in oklab, var(--primary) 90%, var(--primary-foreground) 10%);   /* HeroUI --accent-hover */
  --danger-hover: color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%);
  --success-hover: color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%);
  --warning-hover: color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%);
  --field-hover: color-mix(in oklab, var(--field-background, var(--default)) 90%, var(--field-foreground, var(--foreground)) 2%);
  --field-focus: var(--field-background, var(--default));
  --field-border-hover: color-mix(in oklab, var(--field-border, var(--border)) 88%, var(--field-foreground, var(--foreground)) 10%);
  --field-border-focus: color-mix(in oklab, var(--field-border, var(--border)) 74%, var(--field-foreground, var(--foreground)) 22%);
  --default-soft: color-mix(in oklab, var(--default) 50%, transparent);
  --default-soft-foreground: var(--default-foreground);
  --default-soft-hover: color-mix(in oklab, var(--default) 60%, transparent);
  --primary-soft: color-mix(in oklab, var(--primary) 15%, transparent);                          /* HeroUI --accent-soft */
  --primary-soft-foreground: color-mix(in oklab, var(--primary) 70%, var(--foreground) 30%);     /* HeroUI --accent-soft-foreground */
  --primary-soft-hover: color-mix(in oklab, var(--primary) 20%, transparent);                    /* HeroUI --accent-soft-hover */
  --danger-soft: color-mix(in oklab, var(--danger) 15%, transparent);
  --danger-soft-foreground: color-mix(in oklab, var(--danger) 70%, var(--foreground) 40%);
  --danger-soft-hover: color-mix(in oklab, var(--danger) 20%, transparent);
  --separator-secondary: color-mix(in oklab, var(--surface) 85%, var(--surface-foreground) 15%);
  --separator-tertiary: color-mix(in oklab, var(--surface) 81%, var(--surface-foreground) 19%);
  --border-secondary: color-mix(in oklab, var(--surface) 78%, var(--surface-foreground) 22%);
  --border-tertiary: color-mix(in oklab, var(--surface) 66%, var(--surface-foreground) 34%);

}

/* HeroUI dark-only soft-color percentages (must follow the shared block) */
.dark {
  --primary-soft: color-mix(in oklab, var(--primary) 12%, transparent);
  --primary-soft-foreground: color-mix(in oklab, var(--primary) 80%, var(--foreground) 30%);
  --primary-soft-hover: color-mix(in oklab, var(--primary) 16%, transparent);
  --danger-soft-foreground: color-mix(in oklab, var(--danger) 80%, var(--foreground) 30%);
}

@theme inline {
  /* Font: HeroUI inherits the app font. HeroUI docs use Inter (apps/docs global.css). */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* shadcn color utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* HeroUI color utilities (from themes/shared/theme.css, accent -> primary) */
  --color-surface: var(--surface);
  --color-surface-foreground: var(--surface-foreground);
  --color-surface-hover: var(--surface-hover);
  --color-surface-secondary: var(--surface-secondary);
  --color-surface-secondary-foreground: var(--surface-secondary-foreground);
  --color-surface-tertiary: var(--surface-tertiary);
  --color-surface-tertiary-foreground: var(--surface-tertiary-foreground);
  --color-overlay: var(--overlay);
  --color-overlay-foreground: var(--overlay-foreground);
  --color-default: var(--default);
  --color-default-foreground: var(--default-foreground);
  --color-default-hover: var(--default-hover);
  --color-default-soft: var(--default-soft);
  --color-default-soft-foreground: var(--default-soft-foreground);
  --color-default-soft-hover: var(--default-soft-hover);
  --color-primary-hover: var(--primary-hover);
  --color-primary-soft: var(--primary-soft);
  --color-primary-soft-foreground: var(--primary-soft-foreground);
  --color-primary-soft-hover: var(--primary-soft-hover);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-success-hover: var(--success-hover);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-warning-hover: var(--warning-hover);
  --color-danger: var(--danger);
  --color-danger-foreground: var(--danger-foreground);
  --color-danger-hover: var(--danger-hover);
  --color-danger-soft: var(--danger-soft);
  --color-danger-soft-foreground: var(--danger-soft-foreground);
  --color-danger-soft-hover: var(--danger-soft-hover);
  --color-segment: var(--segment);
  --color-segment-foreground: var(--segment-foreground);
  --color-separator: var(--separator);
  --color-separator-secondary: var(--separator-secondary);
  --color-separator-tertiary: var(--separator-tertiary);
  --color-border-secondary: var(--border-secondary);
  --color-border-tertiary: var(--border-tertiary);
  --color-focus: var(--focus);
  --color-link: var(--link);
  --color-backdrop: var(--backdrop);
  --color-field: var(--field-background, var(--default));
  --color-field-hover: var(--field-hover);
  --color-field-foreground: var(--field-foreground, var(--foreground));
  --color-field-placeholder: var(--field-placeholder, var(--muted-foreground));
  --color-field-border: var(--field-border, var(--border));
  --color-field-focus: var(--field-focus);
  --color-field-border-hover: var(--field-border-hover);
  --color-field-border-focus: var(--field-border-focus);

  /* HeroUI shadows */
  --shadow-surface: var(--surface-shadow);
  --shadow-overlay: var(--overlay-shadow);
  --shadow-field: var(--field-shadow);

  /* HeroUI radius scale (replaces shadcn's radius scale) */
  --radius-xs: calc(var(--radius) * 0.25);  /* 2px */
  --radius-sm: calc(var(--radius) * 0.5);   /* 4px */
  --radius-md: calc(var(--radius) * 0.75);  /* 6px */
  --radius-lg: calc(var(--radius) * 1);     /* 8px */
  --radius-xl: calc(var(--radius) * 1.5);   /* 12px */
  --radius-2xl: calc(var(--radius) * 2);    /* 16px */
  --radius-3xl: calc(var(--radius) * 3);    /* 24px */
  --radius-4xl: calc(var(--radius) * 4);    /* 32px */
  --radius-field: var(--field-radius, calc(var(--radius) * 1.5));

  /* HeroUI easings + animations: see reference/motion.md (paste its @theme block here too) */
}

@layer base {
  /* HeroUI base.css border color inheritance */
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--border, currentColor);
  }
  * {
    @apply outline-ring/50; /* shadcn default; HeroUI focus uses ring-2 ring-focus (see utilities) */
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* HeroUI focus/disabled/invalid utilities (copied from packages/styles/utilities/index.css) */
@utility focus-ring {
  @apply ring-2 ring-focus ring-offset-0 ring-offset-background outline-none;
  --tw-ring-offset-width: var(--ring-offset-width);
}
@utility focus-field-ring {
  @apply ring-2 ring-focus ring-offset-0 outline-none;
  --tw-ring-offset-width: 0px;
}
@utility invalid-field-ring {
  @apply outline-1 outline-danger outline-solid;
  --tw-ring-offset-width: 3px;
  &:focus, &:focus-visible, &[data-focused="true"], &[data-focus-visible="true"], &:focus-within, &[data-focus-within="true"] {
    @apply ring-2 ring-danger ring-offset-0;
    --tw-ring-offset-width: 0px;
  }
}
@utility status-disabled {
  opacity: var(--disabled-opacity);
  cursor: var(--cursor-disabled);
  pointer-events: none;
}
@utility no-highlight {
  -webkit-tap-highlight-color: transparent;
}
```
