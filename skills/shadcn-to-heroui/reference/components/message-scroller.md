# MessageScroller

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/message-scroller.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/message-scroller.tsx` and `bases/radix/ui/message-scroller.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/message-scroller · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import {
	MessageScroller as MessageScrollerPrimitive,
	useMessageScroller,
	useMessageScrollerScrollable,
	useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
import { cn } from "cn"
```

Stock radix imports:
```ts
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
import { cn } from "cn"
```

## Exports

herocn: `MessageScroller`, `MessageScrollerButton`, `MessageScrollerContent`, `MessageScrollerItem`, `MessageScrollerProvider`, `MessageScrollerViewport`, `useMessageScroller`, `useMessageScrollerScrollable`, `useMessageScrollerVisibility`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import {
	MessageScroller as MessageScrollerPrimitive,
	useMessageScroller,
	useMessageScrollerScrollable,
	useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller";
import { cn } from "cn";
import { ArrowDownIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

function MessageScrollerProvider(
	props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>,
) {
	return <MessageScrollerPrimitive.Provider {...props} />;
}

function MessageScroller({
	className,
	...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Root>) {
	return (
		<MessageScrollerPrimitive.Root
			data-slot="message-scroller"
			className={cn(
				"group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}

function MessageScrollerViewport({
	className,
	...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>) {
	return (
		<MessageScrollerPrimitive.Viewport
			data-slot="message-scroller-viewport"
			className={cn(
				"scroll-fade-b scrollbar-thin scrollbar-gutter-stable data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content",
				className,
			)}
			{...props}
		/>
	);
}

function MessageScrollerContent({
	className,
	...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
	return (
		<MessageScrollerPrimitive.Content
			data-slot="message-scroller-content"
			className={cn(
				"flex h-max min-h-full flex-col gap-8 px-1.5 py-4",
				className,
			)}
			{...props}
		/>
	);
}

function MessageScrollerItem({
	className,
	scrollAnchor = false,
	...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
	return (
		<MessageScrollerPrimitive.Item
			data-slot="message-scroller-item"
			scrollAnchor={scrollAnchor}
			className={cn(
				"min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
				className,
			)}
			{...props}
		/>
	);
}

function MessageScrollerButton({
	direction = "end",
	className,
	children,
	render,
	variant = "secondary",
	size = "icon-sm",
	...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Button> &
	Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<MessageScrollerPrimitive.Button
			data-slot="message-scroller-button"
			data-direction={direction}
			data-variant={variant}
			data-size={size}
			direction={direction}
			className={cn(
				"absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:data-[active=false]:-translate-y-full data-[active=false]:pointer-events-none data-[direction=start]:top-4 data-[direction=end]:bottom-4 data-[active=true]:translate-y-0 data-[active=false]:scale-95 data-[active=true]:scale-100 data-[active=false]:opacity-0 data-[active=true]:opacity-100 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] rtl:translate-x-1/2 rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
				className,
			)}
			render={render ?? <Button variant={variant} size={size} />}
			{...props}
		>
			{children ?? (
				<>
					<ArrowDownIcon />
					<span className="sr-only">
						{direction === "end" ? "Scroll to end" : "Scroll to start"}
					</span>
				</>
			)}
		</MessageScrollerPrimitive.Button>
	);
}

export {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
	useMessageScroller,
	useMessageScrollerScrollable,
	useMessageScrollerVisibility,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| MessageScroller | `group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden` | `group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden` |
| MessageScrollerViewport | `size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent data-pending-scroll:invisible` | `scroll-fade-b scrollbar-thin scrollbar-gutter-stable data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content` |
| MessageScrollerContent | `gap-6 flex h-max min-h-full flex-col` | `flex h-max min-h-full flex-col gap-8 px-1.5 py-4` |
| MessageScrollerItem | `min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]` | `min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]` |
| MessageScrollerButton | `sr-only`<br>`absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180` | `sr-only`<br>`absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:data-[active=false]:-translate-y-full data-[active=false]:pointer-events-none data-[direction=start]:top-4 data-[direction=end]:bottom-4 data-[active=true]:translate-y-0 data-[active=false]:scale-95 data-[active=true]:scale-100 data-[active=false]:opacity-0 data-[active=true]:opacity-100 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] rtl:translate-x-1/2 rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `message-scroller`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
