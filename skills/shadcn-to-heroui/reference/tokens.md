# herocn tokens → shadcn/ui (PRIMARY)

**Source of truth:** herocn `apps/docs/src/app/theme.css` (identical values in `apps/docs/src/registry/shared.ts` `cssVars` / `css`, which `npx shadcn add @herocn/style` installs). herocn commit `be08ffc` (2026-11-18).
herocn **keeps shadcn's variable names** (`--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--input`, …) and adds HeroUI tokens beside them (`--default`, `--surface*`, `--segment*`, `--success`, `--warning`, soft colors, `--snow`, `--eclipse`). So there's no renaming. Existing `components/ui` keep compiling.
HeroUI v3.2.7 values (spot-check only) come from `heroui-tokens.md`. Every ✗/≈ is listed in `reference/herocn-diff.md`.

## Quick reference

| Group | herocn tokens |
|---|---|
| Primitives | `--snow: oklch(0.9911 0 0)`, `--eclipse: oklch(0.2103 0.0059 285.89)` (declared only in `:root`) |
| Radius | `--radius: 0.5rem`; scale `--radius-xs … --radius-4xl` = `calc(var(--radius) * 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4)` = 2/4/6/8/12/16/24/32px (identical to HeroUI). Fields use `rounded-xl` (12px = HeroUI `--field-radius`), buttons/cards/dialogs `rounded-3xl` (24px) |
| Surfaces | `--surface`, `--surface-secondary`, `--surface-tertiary`, `--segment`, `--segment-foreground`; `--card` and `--popover` = `var(--surface)` |
| Status | `--default`, `--default-foreground`, `--success`, `--success-foreground` (light only), `--warning`, `--warning-foreground`, `--destructive`, `--destructive-foreground` |
| Soft colors | `--default-soft`, `--primary-soft`, `--destructive-soft`, `--warning-soft`, `--success-soft` + `-foreground` each (light 15%, dark 12%; destructive 15% in both) |
| Field fill | `--input` = `white` / `oklch(0.2103 0.0059 285.89)`. herocn fields use `bg-input`, not `border-input` |
| Font | `--font-sans: "Inter", sans-serif` (in `@theme inline`); `html` and `body` get `font-sans` |
| Shadows | **NOT FOUND** as tokens. herocn components use Tailwind's built-in `shadow-xs` / `shadow-sm` / `drop-shadow-xl`, not HeroUI's `--surface-shadow` / `--field-shadow` / `--overlay-shadow` |
| Spacing / sizing tokens | NOT FOUND (Tailwind default `--spacing: 0.25rem`, same as HeroUI) |
| Border width | NOT FOUND as a token. Components use `border` (1px) where needed; fields are borderless (`bg-input` + `shadow-xs`) |
| Focus / invalid / disabled | utilities `focus-ring`, `focus-field-ring`, `invalid-field-ring`, `invalid-field-ring-focus` (see `motion.md`); disabled is written inline per component: `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50` (HeroUI `--disabled-opacity: 0.5`) |
| Hover / pressed colors | NOT FOUND as tokens. herocn uses `brightness-*` filters and `/80`, `/90` opacity modifiers where HeroUI uses `color-mix` `*-hover` tokens |
| Not in herocn | HeroUI `--overlay*`, `--field-*`, `--separator*`, `--border-secondary/tertiary`, `--focus`, `--link`, `--backdrop` (herocn hardcodes `bg-black/50` / `dark:bg-black/60`), `*-hover`, `*-soft-hover`, `--surface-shadow`, `--overlay-shadow`, `--field-shadow`, `--disabled-opacity`, `--cursor-*`, `--ring-offset-width`, `--z-index-overlay`, `--tooltip-delay` |

## Mapping table: shadcn variable ← herocn value (with HeroUI check)

| shadcn / herocn variable | herocn light | herocn dark | HeroUI token (role) | HeroUI value (light / dark) | Match |
|---|---|---|---|---|---|
| `--background` | `oklch(0.9702 0 0)` | `oklch(0.1228 0.0029 285.97)` | --background | `oklch(0.9702 0 0) / oklch(12% 0.005 285.823)` | light ✓ / dark ≈ (different numbers) |
| `--foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | --foreground | `var(--eclipse) = oklch(0.2103 0.0059 285.89) / var(--snow) = oklch(0.9911 0 0)` | ✗ herocn text is darker in light and slightly dimmer in dark |
| `--card` | `var(--surface)` | `var(--surface)` | --surface | `white / oklch(0.2103 0.0059 285.89)` | ✓ |
| `--card-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | --surface-foreground (= foreground) | `eclipse / snow` | ✗ (same as foreground) |
| `--popover` | `var(--surface)` | `var(--surface)` | --overlay | `white / oklch(0.2103 0.0059 285.89)` | ✓ (same values) |
| `--popover-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | --overlay-foreground | `eclipse / snow` | ✗ (same as foreground) |
| `--primary` | `oklch(0.6204 0.195 253.83)` | `oklch(0.6204 0.195 253.83)` | --accent | `oklch(0.6204 0.195 253.83)` | ✓ |
| `--primary-foreground` | `oklch(0.97 0.014 254.604)` | `oklch(0.97 0.014 254.604)` | --accent-foreground | `var(--snow) = oklch(0.9911 0 0)` | ✗ herocn uses a light blue-tinted white |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | --default (closest) | `oklch(94% 0.001 286.375) / oklch(27.4% 0.006 286.033)` | light ✗ (herocn-only value) / dark ✓ |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | --default-foreground | `eclipse / snow` | ≈ (rounded numbers) |
| `--muted` | `oklch(0.94 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | --default | `94% / 27.4%` | ✓ |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` | `oklch(0.705 0.015 286.067)` | --muted | `oklch(0.5517 0.0138 285.94) / oklch(70.5% 0.015 286.067)` | light ≈ / dark ✓ |
| `--accent` | `oklch(0.94 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | --default | `94% / 27.4%` | ✓ |
| `--accent-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | --default-foreground | `eclipse / snow` | ≈ |
| `--destructive` | `oklch(0.6532 0.2328 25.74)` | `oklch(0.594 0.1967 24.63)` | --danger | `same` | ✓ |
| `--destructive-foreground` | `var(--snow)` | `var(--snow)` | --danger-foreground | `var(--snow)` | ✓ |
| `--border` | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` | --border | `same` | ✓ |
| `--input` | `white` | `oklch(0.2103 0.0059 285.89)` | --field-background | `var(--white) / oklch(0.2103 0.0059 285.89)` | ✓ (herocn uses --input as the field **fill**, not a border color) |
| `--ring` | `var(--primary)` | `var(--primary)` | --focus (= var(--accent)) | `accent` | ✓ |
| `--radius` | `0.5rem` | `—` | --radius | `0.5rem` | ✓ |
| `--chart-1 … --chart-5` | `oklch(0.809 0.105 251.813), oklch(0.623 0.214 259.815), oklch(0.546 0.245 262.881), oklch(0.488 0.243 264.376), oklch(0.424 0.199 265.638)` | `same` | NOT FOUND in HeroUI | — | herocn-only |
| `--sidebar` | `oklch(0.9702 0 0)` | `oklch(0.1228 0.0029 285.97)` | NOT FOUND in HeroUI | — | herocn-only (= background) |
| `--sidebar-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | NOT FOUND | — | herocn-only |
| `--sidebar-primary` | `oklch(0.6204 0.195 253.83)` | `oklch(0.6204 0.195 253.83)` | NOT FOUND | — | herocn-only |
| `--sidebar-primary-foreground` | `oklch(0.97 0.014 254.604)` | `oklch(0.97 0.014 254.604)` | NOT FOUND | — | herocn-only |
| `--sidebar-accent` | `oklch(0.93 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | NOT FOUND | — | herocn-only |
| `--sidebar-accent-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | NOT FOUND | — | herocn-only |
| `--sidebar-border` | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` | NOT FOUND | — | herocn-only |
| `--sidebar-ring` | `var(--foreground)` | `var(--foreground)` | NOT FOUND | — | herocn-only |
| `--snow` | `oklch(0.9911 0 0)` | `(inherits :root)` | --snow | `oklch(0.9911 0 0)` | ✓ |
| `--eclipse` | `oklch(0.2103 0.0059 285.89)` | `(inherits :root)` | --eclipse | `oklch(0.2103 0.0059 285.89)` | ✓ |
| `--default` | `oklch(94% 0.001 286.375)` | `oklch(27.4% 0.006 286.033)` | --default | `same` | ✓ |
| `--default-foreground` | `var(--eclipse)` | `var(--snow)` | --default-foreground | `same` | ✓ |
| `--success` | `oklch(0.7329 0.1935 150.81)` | `(inherits :root)` | --success | `same (declared once)` | ✓ |
| `--success-foreground` | `var(--eclipse)` | `(inherits)` | --success-foreground | `var(--eclipse)` | ✓ |
| `--warning` | `oklch(0.7819 0.1585 72.33)` | `oklch(0.8203 0.1388 76.34)` | --warning | `same` | ✓ |
| `--warning-foreground` | `var(--eclipse)` | `var(--eclipse)` | --warning-foreground | `same` | ✓ |
| `--surface` | `white` | `oklch(0.2103 0.0059 285.89)` | --surface | `var(--white) / same` | ✓ |
| `--surface-secondary` | `oklch(0.9524 0.0013 286.37)` | `oklch(0.257 0.0037 286.14)` | --surface-secondary | `same` | ✓ |
| `--surface-tertiary` | `oklch(0.9373 0.0013 286.37)` | `oklch(0.2721 0.0024 247.91)` | --surface-tertiary | `same` | ✓ |
| `--segment` | `var(--snow)` | `oklch(0.3964 0.01 285.93)` | --segment | `var(--white) / same` | light ✗ (snow vs white) / dark ✓ |
| `--segment-foreground` | `var(--eclipse)` | `var(--foreground)` | --segment-foreground | `same` | ✓ |
| `--default-soft / -foreground` | `color-mix(in oklab, var(--default) 50%, transparent) / var(--default-foreground)` | `same` | --default-soft | `same` | ✓ |
| `--primary-soft` | `color-mix(in oklab, var(--primary) 15%, transparent)` | `… 12% …` | --accent-soft | `15% / 12%` | ✓ |
| `--primary-soft-foreground` | `color-mix(in oklab, var(--primary) 70%, var(--foreground) 30%)` | `… 80% … 30%` | --accent-soft-foreground | `70/30 / 80/30` | ✓ |
| `--destructive-soft` | `color-mix(in oklab, var(--destructive) 15%, transparent)` | `… 15% …` | --danger-soft | `15% / 15%` | ✓ |
| `--destructive-soft-foreground` | `color-mix(in oklab, var(--destructive) 70%, var(--foreground) 40%)` | `… 80% … 30%` | --danger-soft-foreground | `70/40 / 80/30` | ✓ |
| `--warning-soft / -foreground` | `15%; 80% + fg 70%` | `12%; 80% + fg 30%` | --warning-soft* | `same` | ✓ |
| `--success-soft / -foreground` | `15%; 80% + fg 60%` | `12%; 80% + fg 30%` | --success-soft* | `same` | ✓ |

## herocn `theme.css` (verbatim)

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
	/* Primitive Colors (Do not change between light and dark) */
	--snow: oklch(0.9911 0 0);
	--eclipse: oklch(0.2103 0.0059 285.89);

	--radius: 0.5rem;
	--background: oklch(0.9702 0 0);
	--foreground: oklch(0.141 0.005 285.823);
	--card: var(--surface);
	--card-foreground: oklch(0.141 0.005 285.823);
	--popover: var(--surface);
	--popover-foreground: oklch(0.141 0.005 285.823);
	--primary: oklch(0.6204 0.195 253.83);
	--primary-foreground: oklch(0.97 0.014 254.604);
	--secondary: oklch(0.967 0.001 286.375);
	--secondary-foreground: oklch(0.21 0.006 285.885);
	--muted: oklch(0.94 0.001 286.375);
	--muted-foreground: oklch(0.552 0.016 285.938);
	--accent: oklch(0.94 0.001 286.375);
	--accent-foreground: oklch(0.21 0.006 285.885);
	--destructive: oklch(0.6532 0.2328 25.74);
	--destructive-foreground: var(--snow);
	--border: oklch(90% 0.004 286.32);
	--input: white;
	--ring: var(--primary);
	--chart-1: oklch(0.809 0.105 251.813);
	--chart-2: oklch(0.623 0.214 259.815);
	--chart-3: oklch(0.546 0.245 262.881);
	--chart-4: oklch(0.488 0.243 264.376);
	--chart-5: oklch(0.424 0.199 265.638);
	--sidebar: oklch(0.9702 0 0);
	--sidebar-foreground: oklch(0.141 0.005 285.823);
	--sidebar-primary: oklch(0.6204 0.195 253.83);
	--sidebar-primary-foreground: oklch(0.97 0.014 254.604);
	--sidebar-accent: oklch(0.93 0.001 286.375);
	--sidebar-accent-foreground: oklch(0.21 0.006 285.885);
	--sidebar-border: oklch(90% 0.004 286.32);
	--sidebar-ring: var(--foreground);

	/* herocn Colors */
	--default: oklch(94% 0.001 286.375);
	--default-foreground: var(--eclipse);
	--success: oklch(0.7329 0.1935 150.81);
	--success-foreground: var(--eclipse);
	--warning: oklch(0.7819 0.1585 72.33);
	--warning-foreground: var(--eclipse);

	/* herocn surface */
	--surface: white;
	--surface-secondary: oklch(0.9524 0.0013 286.37);
	--surface-tertiary: oklch(0.9373 0.0013 286.37);
	--segment: var(--snow);
	--segment-foreground: var(--eclipse);

	/* herocn soft colors */
	--default-soft: color-mix(in oklab, var(--default) 50%, transparent);
	--default-soft-foreground: var(--default-foreground);
	--primary-soft: color-mix(in oklab, var(--primary) 15%, transparent);
	--primary-soft-foreground: color-mix(
		in oklab,
		var(--primary) 70%,
		var(--foreground) 30%
	);
	--destructive-soft: color-mix(in oklab, var(--destructive) 15%, transparent);
	--destructive-soft-foreground: color-mix(
		in oklab,
		var(--destructive) 70%,
		var(--foreground) 40%
	);
	--warning-soft: color-mix(in oklab, var(--warning) 15%, transparent);
	--warning-soft-foreground: color-mix(
		in oklab,
		var(--warning) 80%,
		var(--foreground) 70%
	);
	--success-soft: color-mix(in oklab, var(--success) 15%, transparent);
	--success-soft-foreground: color-mix(
		in oklab,
		var(--success) 80%,
		var(--foreground) 60%
	);
}

.dark {
	--background: oklch(0.1228 0.0029 285.97);
	--foreground: oklch(0.985 0 0);
	--card: var(--surface);
	--card-foreground: oklch(0.985 0 0);
	--popover: var(--surface);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.6204 0.195 253.83);
	--primary-foreground: oklch(0.97 0.014 254.604);
	--secondary: oklch(0.274 0.006 286.033);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.274 0.006 286.033);
	--muted-foreground: oklch(0.705 0.015 286.067);
	--accent: oklch(0.274 0.006 286.033);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.594 0.1967 24.63);
	--destructive-foreground: var(--snow);
	--border: oklch(28% 0.006 286.033);
	--input: oklch(0.2103 0.0059 285.89);
	--ring: var(--primary);
	--chart-1: oklch(0.809 0.105 251.813);
	--chart-2: oklch(0.623 0.214 259.815);
	--chart-3: oklch(0.546 0.245 262.881);
	--chart-4: oklch(0.488 0.243 264.376);
	--chart-5: oklch(0.424 0.199 265.638);
	--sidebar: oklch(0.1228 0.0029 285.97);
	--sidebar-foreground: oklch(0.985 0 0);
	--sidebar-primary: oklch(0.6204 0.195 253.83);
	--sidebar-primary-foreground: oklch(0.97 0.014 254.604);
	--sidebar-accent: oklch(0.274 0.006 286.033);
	--sidebar-accent-foreground: oklch(0.985 0 0);
	--sidebar-border: oklch(28% 0.006 286.033);
	--sidebar-ring: var(--foreground);

	/* herocn Colors */
	--default: oklch(27.4% 0.006 286.033);
	--default-foreground: var(--snow);
	--warning: oklch(0.8203 0.1388 76.34);
	--warning-foreground: var(--eclipse);

	/* herocn surface */
	--surface: oklch(0.2103 0.0059 285.89);
	--surface-secondary: oklch(0.257 0.0037 286.14);
	--surface-tertiary: oklch(0.2721 0.0024 247.91);
	--segment: oklch(0.3964 0.01 285.93);
	--segment-foreground: var(--foreground);

	/* herocn soft colors */
	--default-soft: color-mix(in oklab, var(--default) 50%, transparent);
	--default-soft-foreground: var(--default-foreground);
	--primary-soft: color-mix(in oklab, var(--primary) 12%, transparent);
	--primary-soft-foreground: color-mix(
		in oklab,
		var(--primary) 80%,
		var(--foreground) 30%
	);
	--destructive-soft: color-mix(in oklab, var(--destructive) 15%, transparent);
	--destructive-soft-foreground: color-mix(
		in oklab,
		var(--destructive) 80%,
		var(--foreground) 30%
	);
	--warning-soft: color-mix(in oklab, var(--warning) 12%, transparent);
	--warning-soft-foreground: color-mix(
		in oklab,
		var(--warning) 80%,
		var(--foreground) 30%
	);
	--success-soft: color-mix(in oklab, var(--success) 12%, transparent);
	--success-soft-foreground: color-mix(
		in oklab,
		var(--success) 80%,
		var(--foreground) 30%
	);
}

@theme inline {
	--font-sans: "Inter", sans-serif;
	--color-sidebar-ring: var(--sidebar-ring);
	--color-sidebar-border: var(--sidebar-border);
	--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
	--color-sidebar-accent: var(--sidebar-accent);
	--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
	--color-sidebar-primary: var(--sidebar-primary);
	--color-sidebar-foreground: var(--sidebar-foreground);
	--color-sidebar: var(--sidebar);
	--color-chart-5: var(--chart-5);
	--color-chart-4: var(--chart-4);
	--color-chart-3: var(--chart-3);
	--color-chart-2: var(--chart-2);
	--color-chart-1: var(--chart-1);
	--color-ring: var(--ring);
	--color-input: var(--input);
	--color-border: var(--border);
	--color-destructive: var(--destructive);
	--color-destructive-foreground: var(--destructive-foreground);
	--color-accent-foreground: var(--accent-foreground);
	--color-accent: var(--accent);
	--color-muted-foreground: var(--muted-foreground);
	--color-muted: var(--muted);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-secondary: var(--secondary);
	--color-primary-foreground: var(--primary-foreground);
	--color-primary: var(--primary);
	--color-popover-foreground: var(--popover-foreground);
	--color-popover: var(--popover);
	--color-card-foreground: var(--card-foreground);
	--color-card: var(--card);
	--color-foreground: var(--foreground);
	--color-background: var(--background);
	--radius-xs: calc(var(--radius) * 0.25);
	--radius-sm: calc(var(--radius) * 0.5);
	--radius-md: calc(var(--radius) * 0.75);
	--radius-lg: calc(var(--radius) * 1);
	--radius-xl: calc(var(--radius) * 1.5);
	--radius-2xl: calc(var(--radius) * 2);
	--radius-3xl: calc(var(--radius) * 3);
	--radius-4xl: calc(var(--radius) * 4);

	/* herocn Colors */
	--color-default: var(--default);
	--color-default-foreground: var(--default-foreground);
	--color-success: var(--success);
	--color-success-foreground: var(--success-foreground);
	--color-warning: var(--warning);
	--color-warning-foreground: var(--warning-foreground);

	/* herocn surface */
	--color-surface: var(--surface);
	--color-surface-secondary: var(--surface-secondary);
	--color-surface-tertiary: var(--surface-tertiary);
	--color-segment: var(--segment);
	--color-segment-foreground: var(--segment-foreground);

	/* herocn soft colors */
	--color-default-soft: var(--default-soft);
	--color-default-soft-foreground: var(--default-soft-foreground);
	--color-primary-soft: var(--primary-soft);
	--color-primary-soft-foreground: var(--primary-soft-foreground);
	--color-destructive-soft: var(--destructive-soft);
	--color-destructive-soft-foreground: var(--destructive-soft-foreground);
	--color-warning-soft: var(--warning-soft);
	--color-warning-soft-foreground: var(--warning-soft-foreground);
	--color-success-soft: var(--success-soft);
	--color-success-soft-foreground: var(--success-soft-foreground);

	/* herocn animations */
	--animate-skeleton: skeleton 2s linear infinite;
	@keyframes skeleton {
		100% {
			transform: translateX(200%);
		}
	}
}

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply relative font-sans bg-background text-foreground;
	}
	html {
		@apply font-sans;
	}
}

@utility focus-ring {
	@apply ring-2 ring-ring ring-offset-2 ring-offset-background outline-none;
}

@utility focus-field-ring {
	@apply ring-2 ring-ring ring-offset-0 outline-none;
}

@utility invalid-field-ring {
	@apply outline-1 outline-destructive outline-solid;
}

@utility invalid-field-ring-focus {
	@apply ring-2 outline-none ring-destructive ring-offset-0;
}

@utility pressible {
	transition:
		transform 250ms var(--ease-smooth),
		background-color 100ms var(--ease-out),
		box-shadow 100ms var(--ease-out);
	@apply transform-gpu motion-reduce:transition-none active:scale-[0.97] aria-expanded:scale-[0.97];
}
.skeleton--shimmer {
	@apply relative overflow-hidden rtl:[--skeleton-animation-dir:reverse];
}

.skeleton--shimmer::after {
	@apply absolute inset-0 -translate-x-full animate-skeleton bg-linear-to-r from-transparent via-surface-tertiary to-transparent content-[''];
	animation-direction: var(--skeleton-animation-dir, normal);
}

.skeleton--shimmer:has(.skeleton)::after {
	content: none;
}

.skeleton--shimmer:has(.skeleton)::before {
	@apply absolute inset-0 z-10 pointer-events-none mix-blend-overlay -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-skeleton content-[''];
	animation-direction: var(--skeleton-animation-dir, normal);
}

.skeleton--shimmer:has(.skeleton) .skeleton::after {
	content: none;
}
```

## Ready-to-paste globals.css (Tailwind v4 + shadcn)

How to merge into an existing project (SKILL.md step 2):

1. **Keep** the project's `@import` lines, `@source`, `@plugin`, fonts and any app-specific variables. Make sure these three imports exist: `tailwindcss`, `tw-animate-css` and `shadcn/tailwind.css`. herocn relies on shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` custom variants.
2. **Replace** the values of every shadcn variable that appears below (`:root` and `.dark`). **Add** the herocn-only variables (`--snow`, `--eclipse`, `--default*`, `--success*`, `--warning*`, `--surface*`, `--segment*`, soft colors, the two easings).
3. **Merge** the `@theme inline` entries: herocn's radius scale replaces shadcn's `--radius-sm…4xl`, and its `--color-*` entries are added. If the project wires `--font-sans` to `next/font` (e.g. `--font-sans: var(--font-sans)` with Geist), keep that wiring and any app font vars (`--font-heading`), and tell the user herocn/HeroUI use Inter. Otherwise use herocn's `"Inter", sans-serif`.
4. **Add** the utilities and `.skeleton--shimmer` rules at the end (from `motion.md`; they're also in this block).

The block is herocn's `theme.css` minus its three `@import` lines, plus `--ease-smooth` / `--ease-out` in `:root`. herocn's `pressible` utility references them, but the herocn registry doesn't ship them, so the values are taken from herocn's own docs `global.css`.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

:root {
	/* Primitive Colors (Do not change between light and dark) */
	--snow: oklch(0.9911 0 0);
	--eclipse: oklch(0.2103 0.0059 285.89);

	/* Easings used by the herocn `pressible` utility. NOT shipped by the herocn registry;
	   values copied from herocn apps/docs/src/app/global.css (docs site). */
	--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
	--ease-out: cubic-bezier(0, 0, 0.2, 1);

	--radius: 0.5rem;
	--background: oklch(0.9702 0 0);
	--foreground: oklch(0.141 0.005 285.823);
	--card: var(--surface);
	--card-foreground: oklch(0.141 0.005 285.823);
	--popover: var(--surface);
	--popover-foreground: oklch(0.141 0.005 285.823);
	--primary: oklch(0.6204 0.195 253.83);
	--primary-foreground: oklch(0.97 0.014 254.604);
	--secondary: oklch(0.967 0.001 286.375);
	--secondary-foreground: oklch(0.21 0.006 285.885);
	--muted: oklch(0.94 0.001 286.375);
	--muted-foreground: oklch(0.552 0.016 285.938);
	--accent: oklch(0.94 0.001 286.375);
	--accent-foreground: oklch(0.21 0.006 285.885);
	--destructive: oklch(0.6532 0.2328 25.74);
	--destructive-foreground: var(--snow);
	--border: oklch(90% 0.004 286.32);
	--input: white;
	--ring: var(--primary);
	--chart-1: oklch(0.809 0.105 251.813);
	--chart-2: oklch(0.623 0.214 259.815);
	--chart-3: oklch(0.546 0.245 262.881);
	--chart-4: oklch(0.488 0.243 264.376);
	--chart-5: oklch(0.424 0.199 265.638);
	--sidebar: oklch(0.9702 0 0);
	--sidebar-foreground: oklch(0.141 0.005 285.823);
	--sidebar-primary: oklch(0.6204 0.195 253.83);
	--sidebar-primary-foreground: oklch(0.97 0.014 254.604);
	--sidebar-accent: oklch(0.93 0.001 286.375);
	--sidebar-accent-foreground: oklch(0.21 0.006 285.885);
	--sidebar-border: oklch(90% 0.004 286.32);
	--sidebar-ring: var(--foreground);

	/* herocn Colors */
	--default: oklch(94% 0.001 286.375);
	--default-foreground: var(--eclipse);
	--success: oklch(0.7329 0.1935 150.81);
	--success-foreground: var(--eclipse);
	--warning: oklch(0.7819 0.1585 72.33);
	--warning-foreground: var(--eclipse);

	/* herocn surface */
	--surface: white;
	--surface-secondary: oklch(0.9524 0.0013 286.37);
	--surface-tertiary: oklch(0.9373 0.0013 286.37);
	--segment: var(--snow);
	--segment-foreground: var(--eclipse);

	/* herocn soft colors */
	--default-soft: color-mix(in oklab, var(--default) 50%, transparent);
	--default-soft-foreground: var(--default-foreground);
	--primary-soft: color-mix(in oklab, var(--primary) 15%, transparent);
	--primary-soft-foreground: color-mix(
		in oklab,
		var(--primary) 70%,
		var(--foreground) 30%
	);
	--destructive-soft: color-mix(in oklab, var(--destructive) 15%, transparent);
	--destructive-soft-foreground: color-mix(
		in oklab,
		var(--destructive) 70%,
		var(--foreground) 40%
	);
	--warning-soft: color-mix(in oklab, var(--warning) 15%, transparent);
	--warning-soft-foreground: color-mix(
		in oklab,
		var(--warning) 80%,
		var(--foreground) 70%
	);
	--success-soft: color-mix(in oklab, var(--success) 15%, transparent);
	--success-soft-foreground: color-mix(
		in oklab,
		var(--success) 80%,
		var(--foreground) 60%
	);
}

.dark {
	--background: oklch(0.1228 0.0029 285.97);
	--foreground: oklch(0.985 0 0);
	--card: var(--surface);
	--card-foreground: oklch(0.985 0 0);
	--popover: var(--surface);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.6204 0.195 253.83);
	--primary-foreground: oklch(0.97 0.014 254.604);
	--secondary: oklch(0.274 0.006 286.033);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.274 0.006 286.033);
	--muted-foreground: oklch(0.705 0.015 286.067);
	--accent: oklch(0.274 0.006 286.033);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.594 0.1967 24.63);
	--destructive-foreground: var(--snow);
	--border: oklch(28% 0.006 286.033);
	--input: oklch(0.2103 0.0059 285.89);
	--ring: var(--primary);
	--chart-1: oklch(0.809 0.105 251.813);
	--chart-2: oklch(0.623 0.214 259.815);
	--chart-3: oklch(0.546 0.245 262.881);
	--chart-4: oklch(0.488 0.243 264.376);
	--chart-5: oklch(0.424 0.199 265.638);
	--sidebar: oklch(0.1228 0.0029 285.97);
	--sidebar-foreground: oklch(0.985 0 0);
	--sidebar-primary: oklch(0.6204 0.195 253.83);
	--sidebar-primary-foreground: oklch(0.97 0.014 254.604);
	--sidebar-accent: oklch(0.274 0.006 286.033);
	--sidebar-accent-foreground: oklch(0.985 0 0);
	--sidebar-border: oklch(28% 0.006 286.033);
	--sidebar-ring: var(--foreground);

	/* herocn Colors */
	--default: oklch(27.4% 0.006 286.033);
	--default-foreground: var(--snow);
	--warning: oklch(0.8203 0.1388 76.34);
	--warning-foreground: var(--eclipse);

	/* herocn surface */
	--surface: oklch(0.2103 0.0059 285.89);
	--surface-secondary: oklch(0.257 0.0037 286.14);
	--surface-tertiary: oklch(0.2721 0.0024 247.91);
	--segment: oklch(0.3964 0.01 285.93);
	--segment-foreground: var(--foreground);

	/* herocn soft colors */
	--default-soft: color-mix(in oklab, var(--default) 50%, transparent);
	--default-soft-foreground: var(--default-foreground);
	--primary-soft: color-mix(in oklab, var(--primary) 12%, transparent);
	--primary-soft-foreground: color-mix(
		in oklab,
		var(--primary) 80%,
		var(--foreground) 30%
	);
	--destructive-soft: color-mix(in oklab, var(--destructive) 15%, transparent);
	--destructive-soft-foreground: color-mix(
		in oklab,
		var(--destructive) 80%,
		var(--foreground) 30%
	);
	--warning-soft: color-mix(in oklab, var(--warning) 12%, transparent);
	--warning-soft-foreground: color-mix(
		in oklab,
		var(--warning) 80%,
		var(--foreground) 30%
	);
	--success-soft: color-mix(in oklab, var(--success) 12%, transparent);
	--success-soft-foreground: color-mix(
		in oklab,
		var(--success) 80%,
		var(--foreground) 30%
	);
}

@theme inline {
	--font-sans: "Inter", sans-serif;
	--color-sidebar-ring: var(--sidebar-ring);
	--color-sidebar-border: var(--sidebar-border);
	--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
	--color-sidebar-accent: var(--sidebar-accent);
	--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
	--color-sidebar-primary: var(--sidebar-primary);
	--color-sidebar-foreground: var(--sidebar-foreground);
	--color-sidebar: var(--sidebar);
	--color-chart-5: var(--chart-5);
	--color-chart-4: var(--chart-4);
	--color-chart-3: var(--chart-3);
	--color-chart-2: var(--chart-2);
	--color-chart-1: var(--chart-1);
	--color-ring: var(--ring);
	--color-input: var(--input);
	--color-border: var(--border);
	--color-destructive: var(--destructive);
	--color-destructive-foreground: var(--destructive-foreground);
	--color-accent-foreground: var(--accent-foreground);
	--color-accent: var(--accent);
	--color-muted-foreground: var(--muted-foreground);
	--color-muted: var(--muted);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-secondary: var(--secondary);
	--color-primary-foreground: var(--primary-foreground);
	--color-primary: var(--primary);
	--color-popover-foreground: var(--popover-foreground);
	--color-popover: var(--popover);
	--color-card-foreground: var(--card-foreground);
	--color-card: var(--card);
	--color-foreground: var(--foreground);
	--color-background: var(--background);
	--radius-xs: calc(var(--radius) * 0.25);
	--radius-sm: calc(var(--radius) * 0.5);
	--radius-md: calc(var(--radius) * 0.75);
	--radius-lg: calc(var(--radius) * 1);
	--radius-xl: calc(var(--radius) * 1.5);
	--radius-2xl: calc(var(--radius) * 2);
	--radius-3xl: calc(var(--radius) * 3);
	--radius-4xl: calc(var(--radius) * 4);

	/* herocn Colors */
	--color-default: var(--default);
	--color-default-foreground: var(--default-foreground);
	--color-success: var(--success);
	--color-success-foreground: var(--success-foreground);
	--color-warning: var(--warning);
	--color-warning-foreground: var(--warning-foreground);

	/* herocn surface */
	--color-surface: var(--surface);
	--color-surface-secondary: var(--surface-secondary);
	--color-surface-tertiary: var(--surface-tertiary);
	--color-segment: var(--segment);
	--color-segment-foreground: var(--segment-foreground);

	/* herocn soft colors */
	--color-default-soft: var(--default-soft);
	--color-default-soft-foreground: var(--default-soft-foreground);
	--color-primary-soft: var(--primary-soft);
	--color-primary-soft-foreground: var(--primary-soft-foreground);
	--color-destructive-soft: var(--destructive-soft);
	--color-destructive-soft-foreground: var(--destructive-soft-foreground);
	--color-warning-soft: var(--warning-soft);
	--color-warning-soft-foreground: var(--warning-soft-foreground);
	--color-success-soft: var(--success-soft);
	--color-success-soft-foreground: var(--success-soft-foreground);

	/* herocn animations */
	--animate-skeleton: skeleton 2s linear infinite;
	@keyframes skeleton {
		100% {
			transform: translateX(200%);
		}
	}
}

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply relative font-sans bg-background text-foreground;
	}
	html {
		@apply font-sans;
	}
}

@utility focus-ring {
	@apply ring-2 ring-ring ring-offset-2 ring-offset-background outline-none;
}

@utility focus-field-ring {
	@apply ring-2 ring-ring ring-offset-0 outline-none;
}

@utility invalid-field-ring {
	@apply outline-1 outline-destructive outline-solid;
}

@utility invalid-field-ring-focus {
	@apply ring-2 outline-none ring-destructive ring-offset-0;
}

@utility pressible {
	transition:
		transform 250ms var(--ease-smooth),
		background-color 100ms var(--ease-out),
		box-shadow 100ms var(--ease-out);
	@apply transform-gpu motion-reduce:transition-none active:scale-[0.97] aria-expanded:scale-[0.97];
}
.skeleton--shimmer {
	@apply relative overflow-hidden rtl:[--skeleton-animation-dir:reverse];
}

.skeleton--shimmer::after {
	@apply absolute inset-0 -translate-x-full animate-skeleton bg-linear-to-r from-transparent via-surface-tertiary to-transparent content-[''];
	animation-direction: var(--skeleton-animation-dir, normal);
}

.skeleton--shimmer:has(.skeleton)::after {
	content: none;
}

.skeleton--shimmer:has(.skeleton)::before {
	@apply absolute inset-0 z-10 pointer-events-none mix-blend-overlay -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-skeleton content-[''];
	animation-direction: var(--skeleton-animation-dir, normal);
}

.skeleton--shimmer:has(.skeleton) .skeleton::after {
	content: none;
}
```

### Scoped accent overrides (app code)
The `*-soft` / `*-soft-foreground` tokens are `color-mix()`es of `--primary` (etc.) **declared on `:root`/`.dark`**. A custom property resolves where it is declared, so overriding `--primary` on a subtree (a per-section accent like `.agents-scope { --primary: … }`, or a live theme preview) recolors `bg-primary` but leaves `bg-primary-soft`, `text-primary-soft-foreground` and `--ring` on the old colour. In that scope, re-declare them with the same formulas as the paste block:
```css
.my-scope {
	--primary: <value>;
	--primary-soft: color-mix(in oklab, var(--primary) 15%, transparent);
	--primary-soft-foreground: color-mix(in oklab, var(--primary) 70%, var(--foreground) 30%);
	--ring: var(--primary);
}
```
(Found while building the heroui.com sample landing page in `/workspace/s2h-landing`.)

## HeroUI extras herocn does NOT use (optional, not pasted)

If the user wants HeroUI-exact elevation instead of herocn's Tailwind shadows, the raw HeroUI values are in `heroui-tokens.md` (`--surface-shadow`, `--overlay-shadow`, `--field-shadow`, light and dark). Applying them means editing component classes (`shadow-sm` → `shadow-surface`, …). That's outside herocn, so the skill doesn't do it by default.
