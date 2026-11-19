# Alert

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/alert.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/alert.tsx` and `bases/radix/ui/alert.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/alert · HeroUI equivalent: alert

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
```

## Exports

herocn: `Alert`, `AlertAction`, `AlertDescription`, `AlertTitle`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

const alertVariants = cva(
	"group/alert relative grid w-full gap-1 rounded-3xl border-none bg-card px-4 py-3 text-start text-card-foreground text-sm shadow-md has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-4 has-data-[slot=alert-action]:pe-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
	{
		variants: {
			variant: {
				default: "",
				primary:
					"*:data-[slot=alert-title]:text-primary-soft-foreground *:[svg]:text-primary-soft-foreground",
				success:
					"*:data-[slot=alert-title]:text-success-soft-foreground *:[svg]:text-success-soft-foreground",
				warning:
					"*:data-[slot=alert-title]:text-warning-soft-foreground *:[svg]:text-warning-soft-foreground",
				destructive:
					"*:data-[slot=alert-title]:text-destructive-soft-foreground *:[svg]:text-destructive-soft-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"text-balance text-muted-foreground text-sm md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
				className,
			)}
			{...props}
		/>
	);
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-action"
			className={cn("absolute end-3 top-2.5", className)}
			{...props}
		/>
	);
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| alertVariants · base | `grid gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 group/alert relative w-full` | `group/alert relative grid w-full gap-1 rounded-3xl border-none bg-card px-4 py-3 text-start text-card-foreground text-sm shadow-md has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-4 has-data-[slot=alert-action]:pe-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current` |
| alertVariants · variant=default | `bg-card text-card-foreground` | *(empty)* |
| alertVariants · variant=primary | *(part not in stock)* | `*:data-[slot=alert-title]:text-primary-soft-foreground *:[svg]:text-primary-soft-foreground` |
| alertVariants · variant=success | *(part not in stock)* | `*:data-[slot=alert-title]:text-success-soft-foreground *:[svg]:text-success-soft-foreground` |
| alertVariants · variant=warning | *(part not in stock)* | `*:data-[slot=alert-title]:text-warning-soft-foreground *:[svg]:text-warning-soft-foreground` |
| alertVariants · variant=destructive | `text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current` | `*:data-[slot=alert-title]:text-destructive-soft-foreground *:[svg]:text-destructive-soft-foreground` |
| AlertTitle | `font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground` | `font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground` |
| AlertDescription | `text-muted-foreground text-sm text-balance md:text-pretty [&_p:not(:last-child)]:mb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground` | `text-balance text-muted-foreground text-sm md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4` |
| AlertAction | `absolute top-2 right-2` | `absolute end-3 top-2.5` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- cva option `alertVariants · variant=primary` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `alertVariants · variant=success` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `alertVariants · variant=warning` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `alert`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
