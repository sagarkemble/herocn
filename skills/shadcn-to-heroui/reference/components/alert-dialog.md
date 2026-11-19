# AlertDialog

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/alert-dialog.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/alert-dialog.tsx` and `bases/radix/ui/alert-dialog.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/alert-dialog · HeroUI equivalent: alert-dialog

## Primitive (Base UI import used by herocn)

```ts
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
```

## Exports

herocn: `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogMedia`, `AlertDialogOverlay`, `AlertDialogPortal`, `AlertDialogTitle`, `AlertDialogTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "cn";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	);
}

function AlertDialogOverlay({
	className,
	variant = "opaque",
	...props
}: AlertDialogPrimitive.Backdrop.Props & {
	variant?: "opaque" | "blur" | "transparent";
}) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-slot="alert-dialog-overlay"
			data-variant={variant}
			className={cn(
				"fixed inset-0 isolate z-50 opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/50 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md data-ending-style:duration-100 dark:data-[variant=blur]:bg-black/60 dark:data-[variant=opaque]:bg-black/60",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogContent({
	className,
	overlayVariant = "opaque",
	size = "default",
	...props
}: AlertDialogPrimitive.Popup.Props & {
	size?: "default" | "sm";
	overlayVariant?: "opaque" | "blur" | "transparent";
}) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay variant={overlayVariant} />
			<AlertDialogPrimitive.Popup
				data-slot="alert-dialog-content"
				data-size={size}
				className={cn(
					"group/alert-dialog-content fixed start-1/2 top-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-popover p-6 text-popover-foreground outline-none ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-starting-style:translate-y-[calc(-50%+0.25rem)] data-ending-style:scale-[0.95] data-starting-style:scale-[1.05] data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-100 data-[size=default]:sm:max-w-md rtl:translate-x-1/2",
					className,
				)}
				{...props}
			/>
		</AlertDialogPortal>
	);
}

function AlertDialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn("flex flex-col gap-3", className)}
			{...props}
		/>
	);
}

function AlertDialogFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				"mt-5 flex flex-row items-center justify-end gap-2",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogMedia({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-media"
			className={cn(
				"flex size-10 shrink-0 select-none items-center justify-center rounded-3xl bg-muted *:[svg:not([class*='size-'])]:size-5.5",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn("font-medium text-base text-foreground", className)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn(
				"text-balance text-muted-foreground text-sm leading-[1.43] md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogAction({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	return (
		<Button
			data-slot="alert-dialog-action"
			className={cn(className)}
			{...props}
		/>
	);
}

function AlertDialogCancel({
	className,
	variant = "tertiary",
	size = "default",
	...props
}: AlertDialogPrimitive.Close.Props &
	Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<AlertDialogPrimitive.Close
			data-slot="alert-dialog-cancel"
			className={cn(className)}
			render={<Button variant={variant} size={size} />}
			{...props}
		/>
	);
}

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| AlertDialogOverlay | `data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50` | `fixed inset-0 isolate z-50 opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/50 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md data-ending-style:duration-100 dark:data-[variant=blur]:bg-black/60 dark:data-[variant=opaque]:bg-black/60` |
| AlertDialogContent | `data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-popover text-popover-foreground ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none` | `group/alert-dialog-content fixed start-1/2 top-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-popover p-6 text-popover-foreground outline-none ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-starting-style:translate-y-[calc(-50%+0.25rem)] data-ending-style:scale-[0.95] data-starting-style:scale-[1.05] data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-100 data-[size=default]:sm:max-w-md rtl:translate-x-1/2` |
| AlertDialogHeader | `grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]` | `flex flex-col gap-3` |
| AlertDialogFooter | `bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end` | `mt-5 flex flex-row items-center justify-end gap-2` |
| AlertDialogMedia | `bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6` | `flex size-10 shrink-0 select-none items-center justify-center rounded-3xl bg-muted *:[svg:not([class*='size-'])]:size-5.5` |
| AlertDialogTitle | `text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2` | `font-medium text-base text-foreground` |
| AlertDialogDescription | `text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3` | `text-balance text-muted-foreground text-sm leading-[1.43] md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `AlertDialogOverlay`: new prop `variant = "opaque"`, *safe additive (review)*: new optional prop with default.
- `AlertDialogContent`: new prop `overlayVariant = "opaque"`, *safe additive (review)*: new optional prop with default.
- `AlertDialogCancel`: prop changed `variant = "outline"` → `variant = "tertiary"`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `alert-dialog`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
