# Trace

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/trace.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/trace.tsx` and `bases/radix/ui/trace.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/trace · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
```

## Exports

herocn: `Trace`, `TraceCollapsible`, `TraceCollapsibleContent`, `TraceCollapsibleTrigger`, `TraceDescription`, `TraceIcon`, `TraceLine`, `TraceTitle`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cn } from "cn";
import { ChevronRightIcon } from "lucide-react";
import type * as React from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/new-york-v4/ui/collapsible";

function Trace({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="trace"
			className={cn(
				"*:has-[>[data-slot=trace-line]]:focus-visible:focus-ring flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:-mx-1 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:rounded-lg *:has-[>[data-slot=trace-line]]:px-1 *:has-[>[data-slot=trace-line]]:py-0.5 *:has-[>[data-slot=trace-line]]:text-start *:has-[>[data-slot=trace-line]]:outline-none",
				className,
			)}
			{...props}
		/>
	);
}

function TraceLine({
	className,
	status,
	...props
}: React.ComponentProps<"span"> & {
	status?: "running" | "error" | "pending";
}) {
	return (
		<span
			data-slot="trace-line"
			data-status={status}
			className={cn(
				"data-[status=running]:*:data-[slot=trace-title]:shimmer in-[a,button]:m-0 -mx-1 flex w-fit min-w-0 max-w-full in-[a,button]:cursor-pointer items-center gap-2 rounded-md in-[a,button]:p-0 px-1 py-0.5 in-[a:hover,button:hover]:text-foreground text-muted-foreground text-sm transition-colors data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=error]:text-destructive data-[status=pending]:opacity-60",
				className,
			)}
			{...props}
		/>
	);
}

function TraceIcon({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="trace-icon"
			aria-hidden="true"
			className={cn(
				"flex size-4 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [[data-slot=trace-title]~&]:-ms-1",
				className,
			)}
			{...props}
		/>
	);
}

function TraceTitle({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="trace-title"
			className={cn("motion-reduce:shimmer-none min-w-0 truncate", className)}
			{...props}
		/>
	);
}

function TraceDescription({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="trace-description"
			className={cn(
				"shrink-0 text-muted-foreground/70 tabular-nums",
				className,
			)}
			{...props}
		/>
	);
}

function TraceCollapsible({
	className,
	...props
}: Omit<React.ComponentProps<typeof Collapsible>, "open"> &
	(
		| { open?: undefined }
		| {
				open: boolean;
				onOpenChange: NonNullable<
					React.ComponentProps<typeof Collapsible>["onOpenChange"]
				>;
		  }
	)) {
	return (
		<Collapsible
			data-slot="trace-collapsible"
			className={cn("flex w-full min-w-0 flex-col", className)}
			{...props}
		/>
	);
}

function TraceCollapsibleTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
	return (
		<CollapsibleTrigger
			data-slot="trace-collapsible-trigger"
			className={cn(
				"group/trace-collapsible-trigger focus-visible:focus-ring -mx-1 flex w-fit min-w-0 max-w-full cursor-pointer items-center gap-1 rounded-lg px-1 py-0.5 text-start text-muted-foreground outline-none transition-colors hover:text-foreground has-data-[status=error]:text-destructive",
				className,
			)}
			{...props}
		>
			{children}
			<TraceIcon className="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
				<ChevronRightIcon />
			</TraceIcon>
		</CollapsibleTrigger>
	);
}

function TraceCollapsibleContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof CollapsibleContent>) {
	return (
		<CollapsibleContent
			data-slot="trace-collapsible-content"
			className="h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0"
			{...props}
		>
			<div
				data-slot="trace-collapsible-content-inner"
				className={cn(
					"wrap-break-word ms-[calc(--spacing(2)-1px)] mt-2 mb-2 min-w-0 border-s ps-4 pe-2 text-muted-foreground leading-relaxed",
					className,
				)}
			>
				{children}
			</div>
		</CollapsibleContent>
	);
}

export {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceDescription,
	TraceIcon,
	TraceLine,
	TraceTitle,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Trace | `gap-2 *:has-[>[data-slot=trace-line]]:rounded-md *:has-[>[data-slot=trace-line]]:focus-visible:ring-3 *:has-[>[data-slot=trace-line]]:focus-visible:ring-ring/50 flex w-full min-w-0 flex-col *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none` | `*:has-[>[data-slot=trace-line]]:focus-visible:focus-ring flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:-mx-1 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:rounded-lg *:has-[>[data-slot=trace-line]]:px-1 *:has-[>[data-slot=trace-line]]:py-0.5 *:has-[>[data-slot=trace-line]]:text-start *:has-[>[data-slot=trace-line]]:outline-none` |
| TraceLine | `gap-2 text-sm flex w-fit max-w-full min-w-0 items-center text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer` | `data-[status=running]:*:data-[slot=trace-title]:shimmer in-[a,button]:m-0 -mx-1 flex w-fit min-w-0 max-w-full in-[a,button]:cursor-pointer items-center gap-2 rounded-md in-[a,button]:p-0 px-1 py-0.5 in-[a:hover,button:hover]:text-foreground text-muted-foreground text-sm transition-colors data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=error]:text-destructive data-[status=pending]:opacity-60` |
| TraceIcon | `size-4 [&_svg:not([class*='size-'])]:size-4 [[data-slot=trace-title]~&]:-ml-1 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none` | `flex size-4 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [[data-slot=trace-title]~&]:-ms-1` |
| TraceTitle | `min-w-0 truncate motion-reduce:shimmer-none` | `motion-reduce:shimmer-none min-w-0 truncate` |
| TraceDescription | `shrink-0 text-muted-foreground/70 tabular-nums` | `shrink-0 text-muted-foreground/70 tabular-nums` |
| TraceCollapsible | `flex w-full min-w-0 flex-col` | `flex w-full min-w-0 flex-col` |
| TraceCollapsibleTrigger | `transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90`<br>`gap-1 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors outline-none hover:text-foreground has-[[data-status=error]]:text-destructive` | `transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90`<br>`group/trace-collapsible-trigger focus-visible:focus-ring -mx-1 flex w-fit min-w-0 max-w-full cursor-pointer items-center gap-1 rounded-lg px-1 py-0.5 text-start text-muted-foreground outline-none transition-colors hover:text-foreground has-data-[status=error]:text-destructive` |
| TraceCollapsibleContent | `duration-200 h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] data-ending-style:h-0 data-starting-style:h-0`<br>`mt-2 mb-1 ml-[calc(--spacing(2)-1px)] border-l pr-1 pl-4 leading-relaxed min-w-0 wrap-break-word text-muted-foreground` | `h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0`<br>`wrap-break-word ms-[calc(--spacing(2)-1px)] mt-2 mb-2 min-w-0 border-s ps-4 pe-2 text-muted-foreground leading-relaxed` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--collapsible-panel-height`, `data-ending-style`, `data-starting-style`
- Only in stock radix: `--radix-accordion-content-height`, `--radix-collapsible-content-height`, `data-closed`, `data-open`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `--collapsible-panel-height` | `--radix-collapsible-content-height` (+ `animate-collapsible-down/up` if defined, otherwise keep no height animation). |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `trace`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
