# Button

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/button.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/button.tsx` and `bases/radix/ui/button.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/button · HeroUI equivalent: button

## Primitive (Base UI import used by herocn)

```ts
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Slot } from "radix-ui"
```

## Exports

herocn: `Button`, `buttonVariants`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cn";

const buttonVariants = cva(
	"group/button pressible focus-visible:focus-ring relative isolate inline-flex shrink-0 origin-center cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-3xl font-medium text-sm outline-none transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-data-[icon=inline-start]:ps-3.5 has-data-[icon=inline-end]:pe-3.5 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/80 aria-expanded:bg-primary/80",
				outline:
					"border border-border hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground group-data-[variant=secondary]/input-group:text-foreground dark:active:bg-muted/50 dark:hover:bg-muted/50",
				secondary:
					"bg-default text-primary-soft-foreground hover:brightness-95 active:brightness-95 aria-expanded:brightness-95 dark:active:brightness-110 dark:hover:brightness-110",
				tertiary:
					"bg-default text-default-foreground hover:brightness-95 active:brightness-95 aria-expanded:brightness-95 dark:active:brightness-110 dark:hover:brightness-110",
				ghost:
					"hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground group-data-[variant=secondary]/input-group:text-foreground dark:hover:bg-muted/50",
				link: "text-primary underline-offset-4 hover:underline",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive active:bg-destructive/80 aria-expanded:bg-destructive/80",
				"destructive-soft":
					"bg-destructive-soft text-destructive-soft-foreground hover:brightness-90 focus-visible:ring-destructive active:brightness-90 dark:active:brightness-110 dark:hover:brightness-110",
			},
			size: {
				default: "h-9 px-4 py-2",
				xs: "h-7 gap-0.5 px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1 px-3 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-10 gap-1.5 px-4 text-base [&_svg:not([class*='size-'])]:size-4",
				icon: "size-9 [&_svg:not([class*='size-'])]:size-5",
				"icon-xs":
					"size-7 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				"icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
				"icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-5.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| buttonVariants · base | `focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 active:not-aria-[haspopup]:translate-y-px [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `group/button pressible focus-visible:focus-ring relative isolate inline-flex shrink-0 origin-center cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-3xl font-medium text-sm outline-none transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-data-[icon=inline-start]:ps-3.5 has-data-[icon=inline-end]:pe-3.5 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| buttonVariants · variant=default | `bg-primary text-primary-foreground hover:bg-primary/80` | `bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/80 aria-expanded:bg-primary/80` |
| buttonVariants · variant=outline | `border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground` | `border border-border hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground group-data-[variant=secondary]/input-group:text-foreground dark:active:bg-muted/50 dark:hover:bg-muted/50` |
| buttonVariants · variant=secondary | `bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground` | `bg-default text-primary-soft-foreground hover:brightness-95 active:brightness-95 aria-expanded:brightness-95 dark:active:brightness-110 dark:hover:brightness-110` |
| buttonVariants · variant=tertiary | *(part not in stock)* | `bg-default text-default-foreground hover:brightness-95 active:brightness-95 aria-expanded:brightness-95 dark:active:brightness-110 dark:hover:brightness-110` |
| buttonVariants · variant=ghost | `hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground` | `hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground group-data-[variant=secondary]/input-group:text-foreground dark:hover:bg-muted/50` |
| buttonVariants · variant=link | `text-primary underline-offset-4 hover:underline` | `text-primary underline-offset-4 hover:underline` |
| buttonVariants · variant=destructive | `bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30` | `bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive active:bg-destructive/80 aria-expanded:bg-destructive/80` |
| buttonVariants · variant=destructive-soft | *(part not in stock)* | `bg-destructive-soft text-destructive-soft-foreground hover:brightness-90 focus-visible:ring-destructive active:brightness-90 dark:active:brightness-110 dark:hover:brightness-110` |
| buttonVariants · size=default | `h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `h-9 px-4 py-2` |
| buttonVariants · size=xs | `h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3` | `h-7 gap-0.5 px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2 [&_svg:not([class*='size-'])]:size-3` |
| buttonVariants · size=sm | `h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5` | `h-8 gap-1 px-3 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5 [&_svg:not([class*='size-'])]:size-3.5` |
| buttonVariants · size=lg | `h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `h-10 gap-1.5 px-4 text-base [&_svg:not([class*='size-'])]:size-4` |
| buttonVariants · size=icon | `size-8` | `size-9 [&_svg:not([class*='size-'])]:size-5` |
| buttonVariants · size=icon-xs | `size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3` | `size-7 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5 [&_svg:not([class*='size-'])]:size-3.5` |
| buttonVariants · size=icon-sm | `size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg` | `size-8 [&_svg:not([class*='size-'])]:size-4` |
| buttonVariants · size=icon-lg | `size-9` | `size-10 [&_svg:not([class*='size-'])]:size-5.5` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- cva option `buttonVariants · variant=destructive-soft` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `buttonVariants · variant=tertiary` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `button`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**Decision: shadcn `secondary` → herocn `tertiary`.** Stock shadcn `secondary` is a neutral grey button. In herocn, `secondary` is grey with **primary-tinted text** (`text-primary-soft-foreground`, HeroUI "secondary"), and the neutral grey look is `tertiary` (`bg-default text-default-foreground`). When converting:
- In `button.tsx`, keep the `secondary` key (props mustn't break) and **add** `tertiary` and `destructive-soft` (safe additive).
- Give `secondary` herocn's `secondary` classes (HeroUI look).
- In app code, replace `variant="secondary"` with `variant="tertiary"` wherever the neutral grey look was intended. That's the default rule; flag any case where a tinted button looks intentional.

**Stock `destructive` changes meaning visually.** Stock (nova) is a soft red tint (`bg-destructive/10 text-destructive`); herocn is solid (`bg-destructive text-destructive-foreground`). The soft look is now `destructive-soft`. Report this to the user. Don't rename call sites automatically.

**Radix projects:** stock radix Button uses `Slot` / `asChild`, Base UI uses `render`. Keep whichever the project has, and apply only the cva classes. `pressible` and `focus-ring` are plain utilities and work with both.

**HeroUI v3.2.7 reference (carried over from the earlier HeroUI-based file; differences in herocn-diff B1–B11):** `.button` = `h-10 md:h-9 rounded-3xl px-4 text-sm font-medium`, sm `h-9 md:h-8 px-3`, lg `h-11 md:h-10 text-base`; icon-only `w-10 md:w-9` (sm `w-9 md:w-8`, lg `w-11 md:w-10`); svg `size-5 sm:size-4`; pressed `scale(0.97)` (sm 0.98, lg 0.96); transition `transform 250ms var(--ease-smooth), background-color 100ms var(--ease-out), box-shadow 100ms var(--ease-out)`; variants primary/secondary/tertiary/outline/ghost/danger/danger-soft use `--accent-hover` / `--default-hover` / `--danger-hover` tokens; outline hover `color-mix(in srgb, var(--default) 60%, transparent)`.
