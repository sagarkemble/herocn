# HoverCard

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/hover-card.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/hover-card.tsx` and `bases/radix/ui/hover-card.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/hover-card · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { HoverCard as HoverCardPrimitive } from "radix-ui"
```

## Exports

herocn: `HoverCard`, `HoverCardContent`, `HoverCardTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "cn";
import { ChevronUp } from "lucide-react";

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
	return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
	return (
		<PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	);
}

function HoverCardContent({
	className,
	side = "bottom",
	sideOffset = 8,
	align = "center",
	alignOffset = 8,
	withArrow = false,
	children,
	...props
}: PreviewCardPrimitive.Popup.Props &
	Pick<
		PreviewCardPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	> & { withArrow?: boolean }) {
	return (
		<PreviewCardPrimitive.Portal data-slot="hover-card-portal">
			<PreviewCardPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<PreviewCardPrimitive.Popup
					data-slot="hover-card-content"
					className={cn(
						"data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=inline-end]:slide-in-from-start-2 z-50 flex min-w-40 origin-(--transform-origin) flex-col gap-2.5 rounded-3xl bg-popover p-4 text-popover-foreground text-sm outline-none outline-hidden drop-shadow-2xl duration-100 data-closed:animate-out data-open:animate-in",
						className,
					)}
					{...props}
				>
					{withArrow && (
						<PreviewCardPrimitive.Arrow className="text-popover data-[side=inline-end]:-inset-s-4.5 data-[side=inline-start]:-inset-e-4.5 data-[side=bottom]:-top-4.5 data-[side=left]:-right-4.5 data-[side=top]:-bottom-4.5 data-[side=right]:-left-4.5 data-[side=inline-end]:rotate-90 data-[side=inline-start]:rotate-270 data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180">
							<ChevronUp className="size-8 fill-popover" aria-hidden />
						</PreviewCardPrimitive.Arrow>
					)}
					{children}
				</PreviewCardPrimitive.Popup>
			</PreviewCardPrimitive.Positioner>
		</PreviewCardPrimitive.Portal>
	);
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| HoverCardContent | `isolate z-50`<br>`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground w-64 rounded-lg p-2.5 text-sm shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 origin-(--transform-origin) outline-hidden` | `isolate z-50`<br>`text-popover data-[side=inline-end]:-inset-s-4.5 data-[side=inline-start]:-inset-e-4.5 data-[side=bottom]:-top-4.5 data-[side=left]:-right-4.5 data-[side=top]:-bottom-4.5 data-[side=right]:-left-4.5 data-[side=inline-end]:rotate-90 data-[side=inline-start]:rotate-270 data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180`<br>`size-8 fill-popover`<br>`data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=inline-end]:slide-in-from-start-2 z-50 flex min-w-40 origin-(--transform-origin) flex-col gap-2.5 rounded-3xl bg-popover p-4 text-popover-foreground text-sm outline-none outline-hidden drop-shadow-2xl duration-100 data-closed:animate-out data-open:animate-in` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--transform-origin`, `data-[side=inline-end]`, `data-[side=inline-start]`
- Only in stock radix: `--radix-hover-card-content-transform-origin`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `HoverCardContent`: prop changed `sideOffset = 4` → `sideOffset = 8`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `HoverCardContent`: prop changed `alignOffset = 4` → `alignOffset = 8`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `HoverCardContent`: new prop `withArrow = false`, *safe additive (review)*: new optional prop with default.
- `HoverCardContent`: new prop `children`, **review**: new prop without a default in the destructure (check the type is optional).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `hover-card`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
