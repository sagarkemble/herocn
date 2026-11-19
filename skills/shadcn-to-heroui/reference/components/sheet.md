# Sheet

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/sheet.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/sheet.tsx` and `bases/radix/ui/sheet.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/sheet · HeroUI equivalent: sheet

## Primitive (Base UI import used by herocn)

```ts
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Dialog as SheetPrimitive } from "radix-ui"
```

## Exports

herocn: `Sheet`, `SheetClose`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetTitle`, `SheetTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	variant = "opaque",
	...props
}: SheetPrimitive.Backdrop.Props & {
	variant?: "opaque" | "blur" | "transparent";
}) {
	return (
		<SheetPrimitive.Backdrop
			data-slot="sheet-overlay"
			data-variant={variant}
			className={cn(
				"fixed inset-0 z-50 transition-opacity duration-150 data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/50 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md dark:data-[variant=blur]:bg-black/60 dark:data-[variant=opaque]:bg-black/60",
				className,
			)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = "right",
	overlayVariant = "opaque",
	showCloseButton = true,
	...props
}: SheetPrimitive.Popup.Props & {
	side?: "top" | "right" | "bottom" | "left";
	overlayVariant?: "opaque" | "blur" | "transparent";
	showCloseButton?: boolean;
}) {
	return (
		<SheetPortal>
			<SheetOverlay variant={overlayVariant} />
			<SheetPrimitive.Popup
				data-slot="sheet-content"
				data-side={side}
				className={cn(
					"fixed z-50 flex flex-col bg-popover bg-clip-padding text-popover-foreground text-sm shadow-lg transition duration-200 ease-in-out data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=bottom]:inset-x-0 data-[side=top]:inset-x-0 data-[side=left]:inset-y-0 data-[side=right]:inset-y-0 data-[side=top]:top-0 data-[side=right]:right-0 data-[side=bottom]:bottom-0 data-[side=left]:left-0 data-[side=bottom]:h-auto data-[side=left]:h-full data-[side=right]:h-full data-[side=top]:h-auto data-[side=left]:w-3/4 data-[side=right]:w-3/4 data-[side=right]:border-s data-[side=left]:border-e data-[side=bottom]:border-t data-[side=top]:border-b data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<SheetPrimitive.Close
						data-slot="sheet-close"
						render={
							<Button
								variant="tertiary"
								className="absolute end-4 top-4"
								size="icon-sm"
							/>
						}
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</SheetPrimitive.Close>
				)}
			</SheetPrimitive.Popup>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 p-6", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-6", className)}
			{...props}
		/>
	);
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("font-medium text-base text-foreground", className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: SheetPrimitive.Description.Props) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| SheetOverlay | `bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0` | `fixed inset-0 z-50 transition-opacity duration-150 data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/50 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md dark:data-[variant=blur]:bg-black/60 dark:data-[variant=opaque]:bg-black/60` |
| SheetContent | `absolute top-3 right-3`<br>`sr-only`<br>`bg-popover text-popover-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem]` | `absolute end-4 top-4`<br>`sr-only`<br>`fixed z-50 flex flex-col bg-popover bg-clip-padding text-popover-foreground text-sm shadow-lg transition duration-200 ease-in-out data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=bottom]:inset-x-0 data-[side=top]:inset-x-0 data-[side=left]:inset-y-0 data-[side=right]:inset-y-0 data-[side=top]:top-0 data-[side=right]:right-0 data-[side=bottom]:bottom-0 data-[side=left]:left-0 data-[side=bottom]:h-auto data-[side=left]:h-full data-[side=right]:h-full data-[side=top]:h-auto data-[side=left]:w-3/4 data-[side=right]:w-3/4 data-[side=right]:border-s data-[side=left]:border-e data-[side=bottom]:border-t data-[side=top]:border-b data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm` |
| SheetHeader | `gap-0.5 p-4 flex flex-col` | `flex flex-col gap-1.5 p-6` |
| SheetFooter | `gap-2 p-4 mt-auto flex flex-col` | `mt-auto flex flex-col gap-2 p-6` |
| SheetTitle | `text-foreground text-base font-medium` | `font-medium text-base text-foreground` |
| SheetDescription | `text-muted-foreground text-sm` | `text-muted-foreground text-sm` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `data-ending-style`, `data-starting-style`
- Only in stock radix: `data-closed`, `data-open`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `SheetOverlay`: new prop `variant = "opaque"`, *safe additive (review)*: new optional prop with default.
- `SheetContent`: new prop `overlayVariant = "opaque"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `sheet`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
