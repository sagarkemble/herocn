# ScrollArea

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/scroll-area.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/scroll-area.tsx` and `bases/radix/ui/scroll-area.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/scroll-area · HeroUI equivalent: scroll-shadow (different behaviour: HeroUI fades edges, no custom scrollbar)

## Primitive (Base UI import used by herocn)

```ts
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"
```

## Exports

herocn: `ScrollArea`, `ScrollBar`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";
import type React from "react";

function ScrollArea({
	className,
	children,
	...props
}: ScrollAreaPrimitive.Root.Props): React.ReactElement {
	return (
		<ScrollAreaPrimitive.Root className={cn("size-full", className)} {...props}>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="focus-visible:focus-ring size-full rounded-[inherit] transition-[color,box-shadow]"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: ScrollAreaPrimitive.Scrollbar.Props): React.ReactElement {
	return (
		<ScrollAreaPrimitive.Scrollbar
			className={cn(
				"m-1 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.25 data-[orientation=vertical]:w-1.25 data-[orientation=horizontal]:flex-col data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-100 data-scrolling:duration-100",
				className,
			)}
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			{...props}
		>
			<ScrollAreaPrimitive.Thumb
				className="relative flex-1 rounded-lg bg-foreground/20 hover:bg-foreground/60"
				data-slot="scroll-area-thumb"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| ScrollArea | `size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1`<br>`relative` | `focus-visible:focus-ring size-full rounded-[inherit] transition-[color,box-shadow]`<br>`size-full` |
| ScrollBar | `rounded-full relative flex-1 bg-border`<br>`data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none p-px transition-colors select-none` | `relative flex-1 rounded-lg bg-foreground/20 hover:bg-foreground/60`<br>`m-1 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.25 data-[orientation=vertical]:w-1.25 data-[orientation=horizontal]:flex-col data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-100 data-scrolling:duration-100` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `scroll-shadow (different behaviour: HeroUI fades edges, no custom scrollbar)`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
