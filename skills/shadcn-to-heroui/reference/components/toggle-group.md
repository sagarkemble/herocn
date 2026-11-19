# ToggleGroup

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/toggle-group.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/toggle-group.tsx` and `bases/radix/ui/toggle-group.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/toggle-group · HeroUI equivalent: toggle-button-group

## Primitive (Base UI import used by herocn)

```ts
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"
```

## Exports

herocn: `ToggleGroup`, `ToggleGroupItem`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";
import { toggleVariants } from "@/registry/new-york-v4/ui/toggle";

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants> & {
		spacing?: number;
		orientation?: "horizontal" | "vertical";
	}
>({
	size: "default",
	variant: "default",
	spacing: 0,
	orientation: "horizontal",
});

function ToggleGroup({
	className,
	variant,
	size,
	spacing = 0,
	orientation = "horizontal",
	children,
	...props
}: ToggleGroupPrimitive.Props &
	VariantProps<typeof toggleVariants> & {
		spacing?: number;
		orientation?: "horizontal" | "vertical";
	}) {
	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-variant={variant}
			data-size={size}
			data-spacing={spacing}
			orientation={orientation}
			style={{ "--gap": spacing } as React.CSSProperties}
			className={cn(
				"group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] *:active:scale-100 *:aria-pressed:scale-100 data-[spacing=0]:data-[variant=default]:rounded-3xl data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
				className,
			)}
			{...props}
		>
			<ToggleGroupContext.Provider
				value={{ variant, size, spacing, orientation }}
			>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive>
	);
}

function ToggleGroupItem({
	className,
	children,
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	const context = React.useContext(ToggleGroupContext);

	return (
		<TogglePrimitive
			data-slot="toggle-group-item"
			data-variant={context.variant || variant}
			data-size={context.size || size}
			data-spacing={context.spacing}
			className={cn(
				"shrink-0 focus:z-10 focus-visible:z-10 data-[state=on]:bg-muted group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-3 group-data-[spacing=0]/toggle-group:shadow-none group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-2.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-2.5 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-e-3xl group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-3xl group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-s-3xl group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-3xl",
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</TogglePrimitive>
	);
}

export { ToggleGroup, ToggleGroupItem };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| ToggleGroup | `rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch` | `group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] *:active:scale-100 *:aria-pressed:scale-100 data-[spacing=0]:data-[variant=default]:rounded-3xl data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch` |
| ToggleGroupItem | `group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t` | `shrink-0 focus:z-10 focus-visible:z-10 data-[state=on]:bg-muted group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-3 group-data-[spacing=0]/toggle-group:shadow-none group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-2.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-2.5 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-e-3xl group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-3xl group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-s-3xl group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-3xl` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `ToggleGroup`: prop changed `spacing = 2` → `spacing = 0`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `toggle-button-group`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
