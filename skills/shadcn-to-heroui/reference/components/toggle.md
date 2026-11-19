# Toggle

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/toggle.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/toggle.tsx` and `bases/radix/ui/toggle.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/toggle · HeroUI equivalent: toggle-button

## Primitive (Base UI import used by herocn)

```ts
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"
```

## Exports

herocn: `Toggle`, `toggleVariants`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cn";

const toggleVariants = cva(
	"group/toggle pressible focus-visible:focus-field-ring relative isolate inline-flex w-fit shrink-0 origin-center cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-3xl px-4 font-medium text-sm outline-none transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70 aria-pressed:bg-primary-soft aria-pressed:text-primary-soft-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-default text-default-foreground hover:bg-default/80 active:bg-default/80",
				ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
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

function Toggle({
	className,
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| toggleVariants · base | `hover:text-foreground aria-pressed:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[state=on]:bg-muted gap-1 rounded-lg text-sm font-medium transition-all [&_svg:not([class*='size-'])]:size-4 group/toggle inline-flex items-center justify-center whitespace-nowrap outline-none hover:bg-muted focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `group/toggle pressible focus-visible:focus-field-ring relative isolate inline-flex w-fit shrink-0 origin-center cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-3xl px-4 font-medium text-sm outline-none transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70 aria-pressed:bg-primary-soft aria-pressed:text-primary-soft-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| toggleVariants · variant=default | `bg-transparent` | `bg-default text-default-foreground hover:bg-default/80 active:bg-default/80` |
| toggleVariants · variant=ghost | *(part not in stock)* | `hover:bg-muted hover:text-foreground dark:hover:bg-muted/50` |
| toggleVariants · size=default | `h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `h-9 px-4 py-2` |
| toggleVariants · size=xs | *(part not in stock)* | `h-7 gap-0.5 px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2 [&_svg:not([class*='size-'])]:size-3` |
| toggleVariants · size=sm | `h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5` | `h-8 gap-1 px-3 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5 [&_svg:not([class*='size-'])]:size-3.5` |
| toggleVariants · size=lg | `h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `h-10 gap-1.5 px-4 text-base [&_svg:not([class*='size-'])]:size-4` |
| toggleVariants · size=icon | *(part not in stock)* | `size-9 [&_svg:not([class*='size-'])]:size-5` |
| toggleVariants · size=icon-xs | *(part not in stock)* | `size-7 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5 [&_svg:not([class*='size-'])]:size-3.5` |
| toggleVariants · size=icon-sm | *(part not in stock)* | `size-8 [&_svg:not([class*='size-'])]:size-4` |
| toggleVariants · size=icon-lg | *(part not in stock)* | `size-10 [&_svg:not([class*='size-'])]:size-5.5` |
| toggleVariants · variant=outline | `border-input hover:bg-muted border bg-transparent` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- cva option `toggleVariants · size=icon` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `toggleVariants · size=icon-lg` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `toggleVariants · size=icon-sm` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `toggleVariants · size=icon-xs` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `toggleVariants · size=xs` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `toggleVariants · variant=ghost` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `toggleVariants · variant=outline` exists in stock but **not in herocn**. Keep it in the user file; restyle it with the closest herocn option.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `toggle-button`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**Visual meaning change (report):** stock `default` is transparent until pressed (`bg-transparent`, `aria-pressed:bg-muted`). herocn `default` is a filled grey (`bg-default text-default-foreground`), and herocn's new `ghost` key is the transparent look. Toggles that should stay transparent can use `variant="ghost"` at the call site; report them, don't change them automatically.
**Stock-only `outline`** (NOT FOUND in herocn): keep the stock classes with `border-input` → `border-border` (herocn `--input` is a fill).
**ToggleGroup:** herocn changes `spacing` default 2 → 0. NOT safe; keep the stock default (2).
