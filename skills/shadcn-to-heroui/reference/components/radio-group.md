# RadioGroup

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/radio-group.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/radio-group.tsx` and `bases/radix/ui/radio-group.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/radio-group · HeroUI equivalent: radio-group / radio

## Primitive (Base UI import used by herocn)

```ts
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
```

## Exports

herocn: `RadioGroup`, `RadioGroupItem`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "cn";

function RadioGroup({
	className,
	variant = "default",
	...props
}: RadioGroupPrimitive.Props & { variant?: "default" | "secondary" }) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			data-variant={variant}
			className={cn("group/radio-group grid w-full gap-3", className)}
			{...props}
		/>
	);
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
	return (
		<RadioPrimitive.Root
			data-slot="radio-group-item"
			className={cn(
				"group/radio-group-item peer not-aria-invalid:focus-visible:focus-ring aria-invalid:not-focus-visible:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus relative flex aspect-square size-4 shrink-0 rounded-3xl border-none bg-input shadow-sm outline-none brightness-100 transition-[color,background-color,box-shadow,opacity,scale,filter] duration-200 after:absolute after:-inset-x-3 after:-inset-y-2 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-checked:text-primary-foreground hover:data-unchecked:brightness-97 group-data-[variant=secondary]/radio-group:shadow-none group-data-[variant=secondary]/radio-group:data-unchecked:bg-default dark:hover:data-unchecked:brightness-125",
				className,
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="flex size-4 items-center justify-center"
			>
				<span className="absolute start-1/2 top-1/2 size-1.75 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-primary-foreground transition-transform duration-200 group-active/radio-group-item:scale-120 rtl:translate-x-1/2" />
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);
}

export { RadioGroup, RadioGroupItem };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| RadioGroup | `grid gap-2 w-full` | `group/radio-group grid w-full gap-3` |
| RadioGroupItem | `flex size-4 items-center justify-center`<br>`bg-primary-foreground absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full`<br>`border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 flex size-4 rounded-full focus-visible:ring-3 aria-invalid:ring-3 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50` | `flex size-4 items-center justify-center`<br>`absolute start-1/2 top-1/2 size-1.75 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-primary-foreground transition-transform duration-200 group-active/radio-group-item:scale-120 rtl:translate-x-1/2`<br>`group/radio-group-item peer not-aria-invalid:focus-visible:focus-ring aria-invalid:not-focus-visible:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus relative flex aspect-square size-4 shrink-0 rounded-3xl border-none bg-input shadow-sm outline-none brightness-100 transition-[color,background-color,box-shadow,opacity,scale,filter] duration-200 after:absolute after:-inset-x-3 after:-inset-y-2 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-checked:text-primary-foreground hover:data-unchecked:brightness-97 group-data-[variant=secondary]/radio-group:shadow-none group-data-[variant=secondary]/radio-group:data-unchecked:bg-default dark:hover:data-unchecked:brightness-125` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `RadioGroup`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `radio-group / radio`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
