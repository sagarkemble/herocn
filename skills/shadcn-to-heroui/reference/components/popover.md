# Popover

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/popover.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/popover.tsx` and `bases/radix/ui/popover.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/popover · HeroUI equivalent: popover

## Primitive (Base UI import used by herocn)

```ts
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Popover as PopoverPrimitive } from "radix-ui"
```

## Exports

herocn: `Popover`, `PopoverContent`, `PopoverDescription`, `PopoverHeader`, `PopoverTitle`, `PopoverTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: `PopoverAnchor`

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "cn";
import { ChevronUp } from "lucide-react";
import type * as React from "react";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	withArrow = false,
	children,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<
		PopoverPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	> & { withArrow?: boolean }) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(
						"z-50 flex min-w-40 origin-(--transform-origin) flex-col gap-2.5 rounded-3xl bg-popover p-4 text-popover-foreground text-sm outline-none outline-hidden drop-shadow-2xl transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.95] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[instant=group]:transition-none data-ending-style:duration-100",
						className,
					)}
					{...props}
				>
					{withArrow && (
						<PopoverPrimitive.Arrow className="text-popover data-[side=inline-end]:-inset-s-4.5 data-[side=inline-start]:-inset-e-4.5 data-[side=bottom]:-top-4.5 data-[side=left]:-right-4.5 data-[side=top]:-bottom-4.5 data-[side=right]:-left-4.5 data-[side=inline-end]:rotate-90 data-[side=inline-start]:rotate-270 data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180">
							<ChevronUp className="size-8 fill-popover" aria-hidden />
						</PopoverPrimitive.Arrow>
					)}
					{children}
				</PopoverPrimitive.Popup>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="popover-header"
			className={cn("flex flex-col gap-0.5 text-sm", className)}
			{...props}
		/>
	);
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn("font-medium", className)}
			{...props}
		/>
	);
}

function PopoverDescription({
	className,
	...props
}: PopoverPrimitive.Description.Props) {
	return (
		<PopoverPrimitive.Description
			data-slot="popover-description"
			className={cn("text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| PopoverContent | `isolate z-50`<br>`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 w-72 origin-(--transform-origin) outline-hidden` | `isolate z-50`<br>`text-popover data-[side=inline-end]:-inset-s-4.5 data-[side=inline-start]:-inset-e-4.5 data-[side=bottom]:-top-4.5 data-[side=left]:-right-4.5 data-[side=top]:-bottom-4.5 data-[side=right]:-left-4.5 data-[side=inline-end]:rotate-90 data-[side=inline-start]:rotate-270 data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180`<br>`size-8 fill-popover`<br>`z-50 flex min-w-40 origin-(--transform-origin) flex-col gap-2.5 rounded-3xl bg-popover p-4 text-popover-foreground text-sm outline-none outline-hidden drop-shadow-2xl transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.95] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[instant=group]:transition-none data-ending-style:duration-100` |
| PopoverHeader | `flex flex-col gap-0.5 text-sm` | `flex flex-col gap-0.5 text-sm` |
| PopoverTitle | `font-medium` | `font-medium` |
| PopoverDescription | `text-muted-foreground` | `text-muted-foreground` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--transform-origin`, `data-[side=inline-end]`, `data-[side=inline-start]`
- Only in stock radix: `--radix-popover-content-transform-origin`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `PopoverContent`: prop changed `sideOffset = 4` → `sideOffset = 8`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `PopoverContent`: new prop `withArrow = false`, *safe additive (review)*: new optional prop with default.
- `PopoverContent`: new prop `children`, **review**: new prop without a default in the destructure (check the type is optional).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `popover`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
