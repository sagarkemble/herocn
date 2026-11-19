# Bubble

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/bubble.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/bubble.tsx` and `bases/radix/ui/bubble.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/bubble · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

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

herocn: `Bubble`, `BubbleContent`, `BubbleGroup`, `BubbleReactions`

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
import type * as React from "react";

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="bubble-group"
			className={cn("flex min-w-0 flex-col gap-2", className)}
			{...props}
		/>
	);
}

const bubbleVariants = cva(
	"group/bubble relative flex w-fit min-w-0 max-w-[80%] flex-col gap-1 data-[variant=ghost]:max-w-full data-[align=end]:self-end group-data-[align=end]/message:self-end",
	{
		variants: {
			variant: {
				default:
					"*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80",
				secondary:
					"*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
				muted:
					"*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
				soft: "*:data-[slot=bubble-content]:bg-primary-soft *:data-[slot=bubble-content]:text-primary-soft-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-soft/80",
				outline:
					"*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30",
				ghost:
					"border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
				destructive:
					"*:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Bubble({
	variant = "default",
	align = "start",
	className,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof bubbleVariants> & {
		align?: "start" | "end";
	}) {
	return (
		<div
			data-slot="bubble"
			data-variant={variant}
			data-align={align}
			className={cn(bubbleVariants({ variant }), className)}
			{...props}
		/>
	);
}

function BubbleContent({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"wrap-break-word [button,a]:focus-visible:focus-ring w-fit min-w-0 max-w-full overflow-hidden rounded-3xl border border-transparent px-3.5 py-2.5 text-sm leading-relaxed group-data-[align=end]/bubble:self-end [button,a]:outline-none [button,a]:transition-[color,background-color,border-color,box-shadow] [button,a]:focus-visible:border-ring [button]:text-start",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "bubble-content",
		},
	});
}

const bubbleReactionsVariants = cva(
	"absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-3xl bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0",
	{
		variants: {
			side: {
				top: "top-0 -translate-y-3/4",
				bottom: "bottom-0 translate-y-3/4",
			},
			align: {
				start: "start-3",
				end: "end-3",
			},
		},
		defaultVariants: {
			side: "bottom",
			align: "end",
		},
	},
);

function BubbleReactions({
	side = "bottom",
	align = "end",
	className,
	...props
}: React.ComponentProps<"div"> & {
	align?: "start" | "end";
	side?: "top" | "bottom";
}) {
	return (
		<div
			data-slot="bubble-reactions"
			data-align={align}
			data-side={side}
			className={cn(bubbleReactionsVariants({ side, align }), className)}
			{...props}
		/>
	);
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| BubbleGroup | `gap-2 flex min-w-0 flex-col` | `flex min-w-0 flex-col gap-2` |
| bubbleVariants · base | `gap-1 data-[align=end]:self-end max-w-[80%] data-[variant=ghost]:max-w-full group-data-[align=end]/message:self-end group/bubble relative flex w-fit min-w-0 flex-col` | `group/bubble relative flex w-fit min-w-0 max-w-[80%] flex-col gap-1 data-[variant=ghost]:max-w-full data-[align=end]:self-end group-data-[align=end]/message:self-end` |
| bubbleVariants · variant=default | `*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80` | `*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80` |
| bubbleVariants · variant=secondary | `*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]` | `*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]` |
| bubbleVariants · variant=muted | `*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]` | `*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]` |
| bubbleVariants · variant=soft | *(part not in stock)* | `*:data-[slot=bubble-content]:bg-primary-soft *:data-[slot=bubble-content]:text-primary-soft-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-soft/80` |
| bubbleVariants · variant=outline | `*:data-[slot=bubble-content]:bg-background *:data-[slot=bubble-content]:border-border [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30` | `*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30` |
| bubbleVariants · variant=dark | *(empty)* | *(empty)* |
| bubbleVariants · variant=ghost | `*:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50 border-none` | `border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50` |
| bubbleVariants · variant=destructive | `*:data-[slot=bubble-content]:bg-destructive/10 dark:*:data-[slot=bubble-content]:bg-destructive/20 *:data-[slot=bubble-content]:text-destructive [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30` | `*:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30` |
| BubbleContent | `rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50 group-data-[align=end]/bubble:self-end w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors` | `wrap-break-word [button,a]:focus-visible:focus-ring w-fit min-w-0 max-w-full overflow-hidden rounded-3xl border border-transparent px-3.5 py-2.5 text-sm leading-relaxed group-data-[align=end]/bubble:self-end [button,a]:outline-none [button,a]:transition-[color,background-color,border-color,box-shadow] [button,a]:focus-visible:border-ring [button]:text-start` |
| bubbleReactionsVariants · base | `rounded-full ring-3 ring-card bg-muted shrink-0 gap-1 px-1.5 py-0.5 has-[button]:p-0 text-sm absolute z-10 flex w-fit items-center justify-center` | `absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-3xl bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0` |
| bubbleReactionsVariants · side=top | `top-0 -translate-y-3/4` | `top-0 -translate-y-3/4` |
| bubbleReactionsVariants · side=bottom | `bottom-0 translate-y-3/4` | `bottom-0 translate-y-3/4` |
| bubbleReactionsVariants · align=start | `left-3` | `start-3` |
| bubbleReactionsVariants · align=end | `right-3` | `end-3` |
| bubbleVariants · variant=tinted | `*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] dark:*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- cva option `bubbleVariants · variant=dark` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `bubbleVariants · variant=soft` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `bubbleVariants · variant=tinted` exists in stock but **not in herocn**. Keep it in the user file; restyle it with the closest herocn option.

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `bubble`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
