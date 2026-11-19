# Item

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/item.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/item.tsx` and `bases/radix/ui/item.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/item · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

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

herocn: `Item`, `ItemActions`, `ItemContent`, `ItemDescription`, `ItemFooter`, `ItemGroup`, `ItemHeader`, `ItemMedia`, `ItemSeparator`, `ItemTitle`

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
import { Separator } from "@/registry/new-york-v4/ui/separator";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			role="list"
			data-slot="item-group"
			className={cn(
				"group/item-group flex w-full flex-col gap-2.5 has-data-[size=sm]:gap-1.5 has-data-[size=xs]:gap-1",
				className,
			)}
			{...props}
		/>
	);
}

function ItemSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="item-separator"
			orientation="horizontal"
			className={cn("my-1", className)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	"group/item focus-visible:focus-ring flex w-full flex-wrap items-center rounded-2xl text-sm outline-none transition-[box-shadow] duration-100 [a]:hover:bg-accent [a]:hover:text-accent-foreground",
	{
		variants: {
			variant: {
				default: "bg-surface shadow-sm",
				secondary: "bg-surface-secondary",
				tertiary: "bg-surface-tertiary",
				outline: "border border-border",
				transparent: "",
			},
			size: {
				default: "gap-2.5 px-3 py-2.5",
				sm: "gap-2 px-2.5 py-2",
				xs: "gap-1.5 in-data-[slot=dropdown-menu-content]:p-0 px-2 py-1.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Item({
	className,
	variant = "default",
	size = "default",
	render,
	...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(itemVariants({ variant, size, className })),
			},
			props,
		),
		render,
		state: {
			slot: "item",
			variant,
			size,
		},
	});
}

const itemMediaVariants = cva(
	"flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "rounded-lg bg-default p-2 group-data-[size=sm]/item:p-1.5 group-data-[size=xs]/item:p-1.5 group-data-[variant=secondary]/item:brightness-95 group-data-[variant=tertiary]/item:brightness-90 dark:group-data-[variant=secondary]/item:brightness-150 dark:group-data-[variant=tertiary]/item:brightness-150 [&_svg:not([class*='size-'])]:size-4",
				image:
					"size-7 overflow-hidden rounded-lg group-data-[size=sm]/item:size-6 group-data-[size=xs]/item:size-5 group-data-[size=xs]/item:rounded-md [&_img]:size-full [&_img]:object-cover",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function ItemMedia({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
	return (
		<div
			data-slot="item-media"
			data-variant={variant}
			className={cn(itemMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-content"
			className={cn(
				"flex flex-1 flex-col gap-0.5 [&+[data-slot=item-content]]:flex-none",
				className,
			)}
			{...props}
		/>
	);
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-title"
			className={cn(
				"line-clamp-1 flex w-fit items-center gap-2 font-medium text-sm leading-tight underline-offset-4 group-data-[size=sm]/item:text-xs group-data-[size=xs]/item:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="item-description"
			className={cn(
				"line-clamp-2 text-start font-normal text-muted-foreground text-xs leading-snug group-data-[size=sm]/item:text-[11px] group-data-[size=xs]/item:text-[11px] [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-actions"
			className={cn("flex items-center gap-2", className)}
			{...props}
		/>
	);
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-header"
			className={cn(
				"flex basis-full items-center justify-between gap-2",
				className,
			)}
			{...props}
		/>
	);
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-footer"
			className={cn(
				"flex basis-full items-center justify-between gap-2",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| ItemGroup | `gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2 group/item-group flex w-full flex-col` | `group/item-group flex w-full flex-col gap-2.5 has-data-[size=sm]:gap-1.5 has-data-[size=xs]:gap-1` |
| ItemSeparator | `my-2` | `my-1` |
| itemVariants · base | `[a]:hover:bg-muted rounded-lg border text-sm group/item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors` | `group/item focus-visible:focus-ring flex w-full flex-wrap items-center rounded-2xl text-sm outline-none transition-[box-shadow] duration-100 [a]:hover:bg-accent [a]:hover:text-accent-foreground` |
| itemVariants · variant=default | `border-transparent` | `bg-surface shadow-sm` |
| itemVariants · variant=secondary | *(part not in stock)* | `bg-surface-secondary` |
| itemVariants · variant=tertiary | *(part not in stock)* | `bg-surface-tertiary` |
| itemVariants · variant=outline | `border-border` | `border border-border` |
| itemVariants · variant=transparent | *(part not in stock)* | *(empty)* |
| itemVariants · size=default | `gap-2.5 px-3 py-2.5` | `gap-2.5 px-3 py-2.5` |
| itemVariants · size=sm | `gap-2.5 px-3 py-2.5` | `gap-2 px-2.5 py-2` |
| itemVariants · size=xs | `gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0` | `gap-1.5 in-data-[slot=dropdown-menu-content]:p-0 px-2 py-1.5` |
| itemMediaVariants · base | `gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start flex shrink-0 items-center justify-center [&_svg]:pointer-events-none` | `flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none` |
| itemMediaVariants · variant=default | `bg-transparent` | `bg-transparent` |
| itemMediaVariants · variant=icon | `[&_svg:not([class*='size-'])]:size-4` | `rounded-lg bg-default p-2 group-data-[size=sm]/item:p-1.5 group-data-[size=xs]/item:p-1.5 group-data-[variant=secondary]/item:brightness-95 group-data-[variant=tertiary]/item:brightness-90 dark:group-data-[variant=secondary]/item:brightness-150 dark:group-data-[variant=tertiary]/item:brightness-150 [&_svg:not([class*='size-'])]:size-4` |
| itemMediaVariants · variant=image | `size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover` | `size-7 overflow-hidden rounded-lg group-data-[size=sm]/item:size-6 group-data-[size=xs]/item:size-5 group-data-[size=xs]/item:rounded-md [&_img]:size-full [&_img]:object-cover` |
| ItemContent | `gap-1 group-data-[size=xs]/item:gap-0 flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none` | `flex flex-1 flex-col gap-0.5 [&+[data-slot=item-content]]:flex-none` |
| ItemTitle | `gap-2 text-sm leading-snug font-medium underline-offset-4 line-clamp-1 flex w-fit items-center` | `line-clamp-1 flex w-fit items-center gap-2 font-medium text-sm leading-tight underline-offset-4 group-data-[size=sm]/item:text-xs group-data-[size=xs]/item:text-xs` |
| ItemDescription | `text-muted-foreground text-left text-sm leading-normal group-data-[size=xs]/item:text-xs line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary` | `line-clamp-2 text-start font-normal text-muted-foreground text-xs leading-snug group-data-[size=sm]/item:text-[11px] group-data-[size=xs]/item:text-[11px] [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4` |
| ItemActions | `gap-2 flex items-center` | `flex items-center gap-2` |
| ItemHeader | `gap-2 flex basis-full items-center justify-between` | `flex basis-full items-center justify-between gap-2` |
| ItemFooter | `gap-2 flex basis-full items-center justify-between` | `flex basis-full items-center justify-between gap-2` |
| itemVariants · variant=muted | `bg-muted/50 border-transparent` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- cva option `itemVariants · variant=secondary` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `itemVariants · variant=tertiary` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `itemVariants · variant=transparent` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `itemVariants · variant=muted` exists in stock but **not in herocn**. Keep it in the user file; restyle it with the closest herocn option.

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `item`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
