# Card

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/card.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/card.tsx` and `bases/radix/ui/card.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/card · HeroUI equivalent: card

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

herocn: `Card`, `CardAction`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cn } from "cn";
import type * as React from "react";

function Card({
	className,
	size = "default",
	variant = "default",
	...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" } & {
	variant?: "default" | "transparent" | "secondary" | "tertiary";
}) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				"group/card relative flex flex-col gap-3 overflow-hidden rounded-3xl bg-surface p-4 text-card-foreground text-sm shadow-sm has-[>img:first-child]:p-0 has-data-[slot=card-footer]:pb-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
				variant === "transparent" && "bg-transparent shadow-none",
				variant === "secondary" && "bg-surface-secondary",
				variant === "tertiary" && "bg-surface-tertiary",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-has-[img:first-child]/card:px-4 group-data-[size=sm]/card:group-has-[img:first-child]:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"font-medium text-foreground text-sm leading-6 group-data-[size=sm]/card:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm leading-5", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn(
				"group-has-[img:first-child]/card:px-4 group-data-[size=sm]/card:group-has-[img:first-child]:px-3",
				className,
			)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center rounded-b-xl border-t py-4 group-has-[img:first-child]/card:px-4 group-data-[size=sm]/card:py-3 group-data-[size=sm]/card:group-has-[img:first-child]:px-3",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Card | `ring-foreground/10 bg-card text-card-foreground gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm ring-1 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col` | `group/card relative flex flex-col gap-3 overflow-hidden rounded-3xl bg-surface p-4 text-card-foreground text-sm shadow-sm has-[>img:first-child]:p-0 has-data-[slot=card-footer]:pb-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl`<br>`[variant === "transparent"] bg-transparent shadow-none`<br>`[variant === "secondary"] bg-surface-secondary`<br>`[variant === "tertiary"] bg-surface-tertiary` |
| CardHeader | `gap-1 rounded-t-xl px-(--card-spacing) [.border-b]:pb-(--card-spacing) group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]` | `group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-has-[img:first-child]/card:px-4 group-data-[size=sm]/card:group-has-[img:first-child]:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3` |
| CardTitle | `text-base leading-snug font-medium group-data-[size=sm]/card:text-sm` | `font-medium text-foreground text-sm leading-6 group-data-[size=sm]/card:text-xs` |
| CardDescription | `text-muted-foreground text-sm` | `text-muted-foreground text-sm leading-5` |
| CardAction | `col-start-2 row-span-2 row-start-1 self-start justify-self-end` | `col-start-2 row-span-2 row-start-1 self-start justify-self-end` |
| CardContent | `px-(--card-spacing)` | `group-has-[img:first-child]/card:px-4 group-data-[size=sm]/card:group-has-[img:first-child]:px-3` |
| CardFooter | `bg-muted/50 rounded-b-xl border-t p-(--card-spacing) flex items-center` | `flex items-center rounded-b-xl border-t py-4 group-has-[img:first-child]/card:px-4 group-data-[size=sm]/card:py-3 group-data-[size=sm]/card:group-has-[img:first-child]:px-3` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Card`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `card`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**New props `variant` (`default | transparent | secondary | tertiary` → `bg-surface` / transparent / `bg-surface-secondary` / `bg-surface-tertiary`, matching HeroUI Card variants) and `size` (`default | sm`)** are *safe additive* when the user's card already destructures `size` (stock base/nova does) or the prop is simply added with a default.
`CardAction` and `CardContent` keep stock classes.
**Shadow:** herocn `shadow-sm` (Tailwind) stays in dark mode. HeroUI uses `shadow-surface`, which is none in dark (herocn-diff C1).

**HeroUI v3.2.7 reference:** `.card` = `relative flex flex-col gap-3 overflow-visible p-4 shadow-surface rounded-[min(32px,var(--radius-3xl))]`; title `text-sm leading-6 font-medium`; description `text-sm leading-5 text-muted`; content `flex flex-1 flex-col gap-1`; footer `flex flex-row items-center`.
