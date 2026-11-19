# Badge

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/badge.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/badge.tsx` and `bases/radix/ui/badge.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/badge · HeroUI equivalent: chip (HeroUI `badge` is a notification dot/count; shadcn Badge ≈ HeroUI Chip)

## Primitive (Base UI import used by herocn)

```ts
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Slot } from "radix-ui"
```

## Exports

herocn: `Badge`, `badgeVariants`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cn";

const badgeVariants = cva(
	"group/badge inline-flex shrink-0 items-center justify-center gap-0.5 rounded-2xl px-2 py-0.5 font-medium leading-5 has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
	{
		variants: {
			variant: {
				default: "bg-default text-default-foreground",
				primary: "bg-default text-primary",
				success: "bg-default text-success",
				warning: "bg-default text-warning",
				destructive: "bg-default text-destructive",
			},
			size: {
				default: "text-xs",
				sm: "px-1 py-0.25 text-xs",
				lg: "px-3 py-1 font-medium text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Badge({
	className,
	variant = "default",
	size = "default",
	render,
	...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ variant, size }), className),
			},
			props,
		),
		render,
		state: {
			slot: "badge",
			variant,
			size,
		},
	});
}

export { Badge, badgeVariants };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| badgeVariants · base | `h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none` | `group/badge inline-flex shrink-0 items-center justify-center gap-0.5 rounded-2xl px-2 py-0.5 font-medium leading-5 has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!` |
| badgeVariants · variant=default | `bg-primary text-primary-foreground [a]:hover:bg-primary/80` | `bg-default text-default-foreground` |
| badgeVariants · variant=primary | *(part not in stock)* | `bg-default text-primary` |
| badgeVariants · variant=success | *(part not in stock)* | `bg-default text-success` |
| badgeVariants · variant=warning | *(part not in stock)* | `bg-default text-warning` |
| badgeVariants · variant=destructive | `bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20` | `bg-default text-destructive` |
| badgeVariants · size=default | *(part not in stock)* | `text-xs` |
| badgeVariants · size=sm | *(part not in stock)* | `px-1 py-0.25 text-xs` |
| badgeVariants · size=lg | *(part not in stock)* | `px-3 py-1 font-medium text-sm` |
| badgeVariants · variant=secondary | `bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80` | *(part not in herocn)* |
| badgeVariants · variant=outline | `border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground` | *(part not in herocn)* |
| badgeVariants · variant=ghost | `hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50` | *(part not in herocn)* |
| badgeVariants · variant=link | `text-primary underline-offset-4 hover:underline` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Badge`: new prop `size = "default"`, *safe additive (review)*: new optional prop with default.
- cva option `badgeVariants · size=default` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `badgeVariants · size=lg` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `badgeVariants · size=sm` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `badgeVariants · variant=primary` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `badgeVariants · variant=success` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `badgeVariants · variant=warning` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `badgeVariants · variant=ghost` exists in stock but **not in herocn**. Keep it in the user file; restyle it with the closest herocn option.
- cva option `badgeVariants · variant=link` exists in stock but **not in herocn**. Keep it in the user file; restyle it with the closest herocn option.
- cva option `badgeVariants · variant=outline` exists in stock but **not in herocn**. Keep it in the user file; restyle it with the closest herocn option.
- cva option `badgeVariants · variant=secondary` exists in stock but **not in herocn**. Keep it in the user file; restyle it with the closest herocn option.
- `defaultVariants.size = "default"` added for a variant group new in herocn. *Safe additive* (comes with that group).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `chip (HeroUI `badge` is a notification dot/count; shadcn Badge ≈ HeroUI Chip)`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**Visual meaning change (report, don't rename call sites):** stock (nova) `default` is a solid primary pill (`bg-primary text-primary-foreground`). herocn `default` is a neutral grey chip (`bg-default text-default-foreground`, = HeroUI Chip default). herocn's coloured options are tinted text on grey (`primary` = `bg-default text-primary`, plus `success`, `warning`, `destructive`).
**Stock-only keys** `secondary`, `outline`, `ghost`, `link` have no herocn equivalent (NOT FOUND). Keep their stock classes. `outline` needs `border` moved into the key, because herocn's base string drops stock's `border border-transparent`.
**`size` group** (`default | sm | lg`) and `defaultVariants.size = "default"` are new with that group: *safe additive*.
herocn's base drops stock's `h-5 w-fit overflow-hidden whitespace-nowrap` and the focus/invalid ring classes. That's class-only, applied as-is.
