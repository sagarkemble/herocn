# Slider

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/slider.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/slider.tsx` and `bases/radix/ui/slider.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/slider · HeroUI equivalent: slider

## Primitive (Base UI import used by herocn)

```ts
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Slider as SliderPrimitive } from "radix-ui"
```

## Exports

herocn: `Slider`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "cn";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: SliderPrimitive.Root.Props) {
	const _values = Array.isArray(value)
		? value
		: Array.isArray(defaultValue)
			? defaultValue
			: [min, max];

	return (
		<SliderPrimitive.Root
			className={cn(
				"data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full",
				className,
			)}
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			thumbCollisionBehavior="swap"
			{...props}
		>
			<SliderPrimitive.Control className="relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-dragging:cursor-grabbing data-[orientation=vertical]:flex-col data-disabled:opacity-50">
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="relative grow select-none overflow-hidden rounded-xl bg-muted data-[orientation=horizontal]:h-5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-4.5"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="select-none bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						key={index}
						className="group/slider-thumb has-focus-visible:focus-ring flex shrink-0 cursor-grab select-none items-center justify-center rounded-xl bg-primary shadow-sm transition-[color,background-color,box-shadow] data-disabled:pointer-events-none data-[orientation=horizontal]:h-5.25 data-[orientation=vertical]:h-6.5 data-[orientation=horizontal]:w-7 data-[orientation=vertical]:w-4.5 data-disabled:cursor-default data-dragging:cursor-grabbing"
					>
						<div
							className={cn(
								"block bg-white transition duration-200 ease-out group-active/slider-thumb:scale-90 group-data-disabled/slider-thumb:scale-100",
								"group-data-[orientation=horizontal]/slider-thumb:h-4 group-data-[orientation=horizontal]/slider-thumb:w-6",
								"group-data-[orientation=vertical]/slider-thumb:h-5.5 group-data-[orientation=vertical]/slider-thumb:w-3.5",
								"rounded-lg",
							)}
						/>
					</SliderPrimitive.Thumb>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Slider | `data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col`<br>`bg-muted rounded-full data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1 relative grow overflow-hidden select-none`<br>`bg-primary select-none data-horizontal:h-full data-vertical:w-full`<br>`border-ring ring-ring/50 relative size-3 rounded-full border bg-white transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50`<br>`data-horizontal:w-full data-vertical:h-full` | `relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-dragging:cursor-grabbing data-[orientation=vertical]:flex-col data-disabled:opacity-50`<br>`relative grow select-none overflow-hidden rounded-xl bg-muted data-[orientation=horizontal]:h-5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-4.5`<br>`select-none bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full`<br>`group/slider-thumb has-focus-visible:focus-ring flex shrink-0 cursor-grab select-none items-center justify-center rounded-xl bg-primary shadow-sm transition-[color,background-color,box-shadow] data-disabled:pointer-events-none data-[orientation=horizontal]:h-5.25 data-[orientation=vertical]:h-6.5 data-[orientation=horizontal]:w-7 data-[orientation=vertical]:w-4.5 data-disabled:cursor-default data-dragging:cursor-grabbing`<br>`data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full`<br>`block bg-white transition duration-200 ease-out group-active/slider-thumb:scale-90 group-data-disabled/slider-thumb:scale-100`<br>`group-data-[orientation=horizontal]/slider-thumb:h-4 group-data-[orientation=horizontal]/slider-thumb:w-6`<br>`group-data-[orientation=vertical]/slider-thumb:h-5.5 group-data-[orientation=vertical]/slider-thumb:w-3.5`<br>`rounded-lg` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `slider`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
