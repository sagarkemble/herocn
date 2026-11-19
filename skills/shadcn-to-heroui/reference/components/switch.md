# Switch

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/switch.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/switch.tsx` and `bases/radix/ui/switch.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/switch · HeroUI equivalent: switch

## Primitive (Base UI import used by herocn)

```ts
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Switch as SwitchPrimitive } from "radix-ui"
```

## Exports

herocn: `Switch`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "cn";

function Switch({
	className,
	size = "default",
	...props
}: SwitchPrimitive.Root.Props & {
	size?: "sm" | "default" | "lg";
}) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={cn(
				"peer group/switch focus-visible:focus-ring aria-invalid:not-focus-visible:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus relative inline-flex shrink-0 items-center rounded-3xl border border-transparent outline-none transition-[color,background-color,box-shadow] after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-checked:bg-primary data-unchecked:bg-surface-secondary data-disabled:opacity-50",
				"data-[size=sm]:h-4 data-[size=sm]:w-8",
				"data-[size=default]:h-5 data-[size=default]:w-10",
				"data-[size=lg]:h-6 data-[size=lg]:w-12",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"pointer-events-none ms-0.5 block rounded-3xl bg-white shadow-sm ring-0 transition-[margin] data-disabled:bg-default-foreground/20 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
					"group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-[1.03125rem] group-data-[size=sm]/switch:data-checked:ms-[calc(100%-1.15625rem)]",
					"group-data-[size=default]/switch:h-4 group-data-[size=default]/switch:w-[1.375rem] group-data-[size=default]/switch:data-checked:ms-[calc(100%-1.5rem)]",
					"group-data-[size=lg]/switch:h-5 group-data-[size=lg]/switch:w-[1.71875rem] group-data-[size=lg]/switch:data-checked:ms-[calc(100%-1.84375rem)]",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Switch | `bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform`<br>`data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent focus-visible:ring-3 aria-invalid:ring-3 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:border-transparent data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50` | `peer group/switch focus-visible:focus-ring aria-invalid:not-focus-visible:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus relative inline-flex shrink-0 items-center rounded-3xl border border-transparent outline-none transition-[color,background-color,box-shadow] after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-checked:bg-primary data-unchecked:bg-surface-secondary data-disabled:opacity-50`<br>`data-[size=sm]:h-4 data-[size=sm]:w-8`<br>`data-[size=default]:h-5 data-[size=default]:w-10`<br>`data-[size=lg]:h-6 data-[size=lg]:w-12`<br>`pointer-events-none ms-0.5 block rounded-3xl bg-white shadow-sm ring-0 transition-[margin] data-disabled:bg-default-foreground/20 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground`<br>`group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-[1.03125rem] group-data-[size=sm]/switch:data-checked:ms-[calc(100%-1.15625rem)]`<br>`group-data-[size=default]/switch:h-4 group-data-[size=default]/switch:w-[1.375rem] group-data-[size=default]/switch:data-checked:ms-[calc(100%-1.5rem)]`<br>`group-data-[size=lg]/switch:h-5 group-data-[size=lg]/switch:w-[1.71875rem] group-data-[size=lg]/switch:data-checked:ms-[calc(100%-1.84375rem)]` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `switch`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
