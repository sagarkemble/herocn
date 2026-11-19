# Avatar

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/avatar.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/avatar.tsx` and `bases/radix/ui/avatar.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/avatar · HeroUI equivalent: avatar

## Primitive (Base UI import used by herocn)

```ts
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Avatar as AvatarPrimitive } from "radix-ui"
```

## Exports

herocn: `Avatar`, `AvatarBadge`, `AvatarFallback`, `AvatarGroup`, `AvatarGroupCount`, `AvatarImage`, `avatarVariants`

- Extra vs stock base: `avatarVariants`
- Missing vs stock base: none
- Extra vs stock radix: `avatarVariants`
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

function Avatar({
	className,
	size = "default",
	...props
}: AvatarPrimitive.Root.Props & {
	size?: "default" | "sm" | "lg";
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(
				"group/avatar relative flex size-10 shrink-0 select-none rounded-3xl after:absolute after:inset-0 after:rounded-3xl after:border after:border-border after:mix-blend-darken data-[size=lg]:size-12 data-[size=sm]:size-8 dark:after:mix-blend-lighten",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(
				"aspect-square size-full rounded-3xl object-cover",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	...props
}: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"flex size-full items-center justify-center rounded-3xl bg-muted text-muted-foreground text-sm group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

export const avatarVariants = cva("absolute", {
	variants: {
		variant: {
			default: "bg-default text-default-foreground",
			primary: "bg-primary text-primary-foreground",
			success: "bg-success text-success-foreground",
			warning: "bg-warning text-warning-foreground",
			destructive: "bg-destructive text-destructive-foreground",
		},
		position: {
			"bottom-end": "end-0 bottom-0",
			"bottom-start": "start-0 bottom-0",
			"top-end": "end-0 top-0",
			"top-start": "start-0 top-0",
		},
	},
	defaultVariants: {
		variant: "default",
		position: "bottom-end",
	},
});

function AvatarBadge({
	className,
	variant,
	position,
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof avatarVariants>) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(
				"z-10 inline-flex select-none items-center justify-center rounded-3xl bg-primary text-primary-foreground bg-blend-color ring-2 ring-background",
				"group-data-[size=sm]/avatar:size-2.5 group-data-[size=sm]/avatar:text-[6px] group-data-[size=sm]/avatar:[&>svg]:hidden",
				"group-data-[size=default]/avatar:size-3 group-data-[size=default]/avatar:text-[8px] group-data-[size=default]/avatar:[&>svg]:size-2.5",
				"group-data-[size=lg]/avatar:size-3.5 group-data-[size=lg]/avatar:text-[10px] group-data-[size=lg]/avatar:[&>svg]:size-2.5",
				avatarVariants({ variant, position }),
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group"
			className={cn(
				"group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroupCount({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group-count"
			className={cn(
				"relative flex size-10 shrink-0 items-center justify-center rounded-3xl bg-muted text-muted-foreground text-sm ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-12 group-has-data-[size=sm]/avatar-group:size-8 group-has-data-[size=lg]/avatar-group:text-base group-has-data-[size=sm]/avatar-group:text-xs [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Avatar | `size-8 rounded-full after:rounded-full data-[size=lg]:size-10 data-[size=sm]:size-6 group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten` | `group/avatar relative flex size-10 shrink-0 select-none rounded-3xl after:absolute after:inset-0 after:rounded-3xl after:border after:border-border after:mix-blend-darken data-[size=lg]:size-12 data-[size=sm]:size-8 dark:after:mix-blend-lighten` |
| AvatarImage | `rounded-full aspect-square size-full object-cover` | `aspect-square size-full rounded-3xl object-cover` |
| AvatarFallback | `bg-muted text-muted-foreground rounded-full flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs` | `flex size-full items-center justify-center rounded-3xl bg-muted text-muted-foreground text-sm group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-xs` |
| avatarVariants · base | *(part not in stock)* | `absolute` |
| avatarVariants · variant=default | *(part not in stock)* | `bg-default text-default-foreground` |
| avatarVariants · variant=primary | *(part not in stock)* | `bg-primary text-primary-foreground` |
| avatarVariants · variant=success | *(part not in stock)* | `bg-success text-success-foreground` |
| avatarVariants · variant=warning | *(part not in stock)* | `bg-warning text-warning-foreground` |
| avatarVariants · variant=destructive | *(part not in stock)* | `bg-destructive text-destructive-foreground` |
| avatarVariants · position=bottom-end | *(part not in stock)* | `end-0 bottom-0` |
| avatarVariants · position=bottom-start | *(part not in stock)* | `start-0 bottom-0` |
| avatarVariants · position=top-end | *(part not in stock)* | `end-0 top-0` |
| avatarVariants · position=top-start | *(part not in stock)* | `start-0 top-0` |
| AvatarBadge | `bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none`<br>`group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden`<br>`group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2`<br>`group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2` | `z-10 inline-flex select-none items-center justify-center rounded-3xl bg-primary text-primary-foreground bg-blend-color ring-2 ring-background`<br>`group-data-[size=sm]/avatar:size-2.5 group-data-[size=sm]/avatar:text-[6px] group-data-[size=sm]/avatar:[&>svg]:hidden`<br>`group-data-[size=default]/avatar:size-3 group-data-[size=default]/avatar:text-[8px] group-data-[size=default]/avatar:[&>svg]:size-2.5`<br>`group-data-[size=lg]/avatar:size-3.5 group-data-[size=lg]/avatar:text-[10px] group-data-[size=lg]/avatar:[&>svg]:size-2.5` |
| AvatarGroup | `group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background` | `group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background` |
| AvatarGroupCount | `bg-muted text-muted-foreground size-8 rounded-full text-sm group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 relative flex shrink-0 items-center justify-center ring-2 ring-background` | `relative flex size-10 shrink-0 items-center justify-center rounded-3xl bg-muted text-muted-foreground text-sm ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-12 group-has-data-[size=sm]/avatar-group:size-8 group-has-data-[size=lg]/avatar-group:text-base group-has-data-[size=sm]/avatar-group:text-xs [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `AvatarBadge`: new prop `variant`, **review**: new prop without a default in the destructure (check the type is optional).
- `AvatarBadge`: new prop `position`, **review**: new prop without a default in the destructure (check the type is optional).
- cva option `avatarVariants · position=bottom-end` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · position=bottom-start` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · position=top-end` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · position=top-start` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · variant=default` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · variant=destructive` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · variant=primary` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · variant=success` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `avatarVariants · variant=warning` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `avatar`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
