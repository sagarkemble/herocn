# Resizable

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/resizable.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/resizable.tsx` and `bases/radix/ui/resizable.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/resizable · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
import * as ResizablePrimitive from "react-resizable-panels";
```

Stock base imports (differ):
```ts
import { cn } from "cn"
import * as ResizablePrimitive from "react-resizable-panels"
```

Stock radix imports:
```ts
import { cn } from "cn"
import * as ResizablePrimitive from "react-resizable-panels"
```

## Exports

herocn: `ResizableHandle`, `ResizablePanel`, `ResizablePanelGroup`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { cn } from "cn";
import * as ResizablePrimitive from "react-resizable-panels";

function ResizablePanelGroup({
	className,
	...props
}: ResizablePrimitive.GroupProps) {
	return (
		<ResizablePrimitive.Group
			data-slot="resizable-panel-group"
			className={cn(
				"flex h-full w-full aria-[orientation=vertical]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
	return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
	withHandle,
	className,
	...props
}: ResizablePrimitive.SeparatorProps & {
	withHandle?: boolean;
}) {
	return (
		<ResizablePrimitive.Separator
			data-slot="resizable-handle"
			className={cn(
				"relative flex w-px items-center justify-center bg-border/70 ring-offset-background after:absolute after:inset-y-0 after:start-1/2 after:w-1 after:-translate-x-1/2 hover:bg-border focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:start-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 rtl:after:translate-x-1/2 rtl:aria-[orientation=horizontal]:after:-translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90",
				className,
			)}
			{...props}
		>
			{withHandle && (
				<div className="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" />
			)}
		</ResizablePrimitive.Separator>
	);
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| ResizablePanelGroup | `flex h-full w-full aria-[orientation=vertical]:flex-col` | `flex h-full w-full aria-[orientation=vertical]:flex-col` |
| ResizableHandle | `bg-border h-6 w-1 rounded-lg z-10 flex shrink-0`<br>`relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90` | `z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border`<br>`relative flex w-px items-center justify-center bg-border/70 ring-offset-background after:absolute after:inset-y-0 after:start-1/2 after:w-1 after:-translate-x-1/2 hover:bg-border focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:start-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 rtl:after:translate-x-1/2 rtl:aria-[orientation=horizontal]:after:-translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `resizable`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
