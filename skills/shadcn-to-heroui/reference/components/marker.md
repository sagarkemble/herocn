# Marker

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/marker.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/marker.tsx` and `bases/radix/ui/marker.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/marker · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Slot } from "radix-ui"
```

## Exports

herocn: `Marker`, `MarkerContent`, `MarkerIcon`, `markerVariants`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

const markerVariants = cva(
	"group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
	{
		variants: {
			variant: {
				default: "",
				separator:
					"before:me-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ms-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
				border: "border-border border-b pb-2",
			},
		},
	},
);

function Marker({
	className,
	variant = "default",
	render,
	...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof markerVariants>) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(markerVariants({ variant, className })),
			},
			props,
		),
		render,
		state: {
			slot: "marker",
			variant,
		},
	});
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="marker-icon"
			aria-hidden="true"
			className={cn(
				"size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="marker-content"
			className={cn(
				"wrap-break-word min-w-0 group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export { Marker, MarkerContent, MarkerIcon, markerVariants };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| markerVariants · base | `gap-2 text-sm text-muted-foreground [a]:hover:text-foreground [a]:underline-offset-3 [a]:underline [&_svg:not([class*='size-'])]:size-4 min-h-4 text-left group/marker relative flex w-full items-center` | `group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground` |
| markerVariants · variant=default | *(empty)* | *(empty)* |
| markerVariants · variant=separator | `before:h-px before:min-w-0 before:flex-1 before:bg-border after:h-px after:min-w-0 after:flex-1 after:bg-border before:mr-1 after:ml-1` | `before:me-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ms-1 after:h-px after:min-w-0 after:flex-1 after:bg-border` |
| markerVariants · variant=border | `border-b border-border pb-2` | `border-border border-b pb-2` |
| MarkerIcon | `size-4 [&_svg:not([class*='size-'])]:size-4 shrink-0` | `size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4` |
| MarkerContent | `group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:hover:text-foreground *:[a]:underline *:[a]:underline-offset-3 min-w-0 wrap-break-word` | `wrap-break-word min-w-0 group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `marker`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
