# Progress

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/progress.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/progress.tsx` and `bases/radix/ui/progress.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/progress · HeroUI equivalent: progress-bar

## Primitive (Base UI import used by herocn)

```ts
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Progress as ProgressPrimitive } from "radix-ui"
```

## Exports

herocn: `Progress`, `ProgressIndicator`, `ProgressLabel`, `ProgressTrack`, `ProgressValue`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: `ProgressIndicator`, `ProgressLabel`, `ProgressTrack`, `ProgressValue`
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "cn";

function Progress({
	className,
	children,
	variant = "primary",
	size = "default",
	value,
	...props
}: ProgressPrimitive.Root.Props & {
	variant?: "default" | "primary" | "success" | "warning" | "destructive";
	size?: "sm" | "default" | "lg";
}) {
	return (
		<ProgressPrimitive.Root
			value={value}
			data-slot="progress"
			data-variant={variant}
			data-size={size}
			className={cn("group/progress flex flex-wrap gap-3", className)}
			{...props}
		>
			{children}
			<ProgressTrack>
				<ProgressIndicator />
			</ProgressTrack>
		</ProgressPrimitive.Root>
	);
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
	return (
		<ProgressPrimitive.Track
			className={cn(
				"relative flex w-full items-center overflow-x-hidden rounded-sm bg-default",
				"group-data-[size=default]/progress:h-2 group-data-[size=lg]/progress:h-3 group-data-[size=sm]/progress:h-1 group-data-[size=lg]/progress:rounded-md group-data-[size=sm]/progress:rounded-xs",
				className,
			)}
			data-slot="progress-track"
			{...props}
		/>
	);
}

function ProgressIndicator({
	className,
	...props
}: ProgressPrimitive.Indicator.Props) {
	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			className={cn(
				"h-full rounded-sm transition-[width] duration-300 ease-out motion-reduce:transition-none",
				"group-data-[variant=default]/progress:bg-default-foreground",
				"group-data-[variant=primary]/progress:bg-primary",
				"group-data-[variant=success]/progress:bg-success",
				"group-data-[variant=warning]/progress:bg-warning",
				"group-data-[variant=destructive]/progress:bg-destructive",
				"group-data-[size=lg]/progress:rounded-md group-data-[size=sm]/progress:rounded-xs",
				className,
			)}
			{...props}
		/>
	);
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
	return (
		<ProgressPrimitive.Label
			className={cn("font-medium text-sm", className)}
			data-slot="progress-label"
			{...props}
		/>
	);
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
	return (
		<ProgressPrimitive.Value
			className={cn("ms-auto text-sm tabular-nums", className)}
			data-slot="progress-value"
			{...props}
		/>
	);
}

export {
	Progress,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Progress | `flex flex-wrap gap-3` | `group/progress flex flex-wrap gap-3` |
| ProgressTrack | `bg-muted h-1 rounded-full relative flex w-full items-center overflow-x-hidden` | `relative flex w-full items-center overflow-x-hidden rounded-sm bg-default`<br>`group-data-[size=default]/progress:h-2 group-data-[size=lg]/progress:h-3 group-data-[size=sm]/progress:h-1 group-data-[size=lg]/progress:rounded-md group-data-[size=sm]/progress:rounded-xs` |
| ProgressIndicator | `bg-primary h-full transition-all` | `h-full rounded-sm transition-[width] duration-300 ease-out motion-reduce:transition-none`<br>`group-data-[variant=default]/progress:bg-default-foreground`<br>`group-data-[variant=primary]/progress:bg-primary`<br>`group-data-[variant=success]/progress:bg-success`<br>`group-data-[variant=warning]/progress:bg-warning`<br>`group-data-[variant=destructive]/progress:bg-destructive`<br>`group-data-[size=lg]/progress:rounded-md group-data-[size=sm]/progress:rounded-xs` |
| ProgressLabel | `text-sm font-medium` | `font-medium text-sm` |
| ProgressValue | `text-muted-foreground ml-auto text-sm tabular-nums` | `ms-auto text-sm tabular-nums` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Progress`: new prop `variant = "primary"`, *safe additive (review)*: new optional prop with default.
- `Progress`: new prop `size = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `progress-bar`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
