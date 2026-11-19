# Checkbox

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/checkbox.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/checkbox.tsx` and `bases/radix/ui/checkbox.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/checkbox · HeroUI equivalent: checkbox

## Primitive (Base UI import used by herocn)

```ts
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
```

## Exports

herocn: `Checkbox`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "cn";

function Checkbox({
	className,
	variant = "default",
	...props
}: CheckboxPrimitive.Root.Props & { variant?: "default" | "secondary" }) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"group peer focus-visible:focus-ring aria-invalid:not-data-checked:invalid-field-ring relative flex size-4 shrink-0 items-center justify-center rounded-md border border-none bg-input text-primary-foreground shadow-xs outline-none transition-[color,background-color,box-shadow,opacity] duration-200 after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 group-has-disabled/field:opacity-50 aria-invalid:text-destructive-foreground data-checked:bg-primary aria-invalid:data-checked:bg-destructive dark:data-checked:bg-primary",
				variant === "secondary" && "bg-default shadow-none",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="grid place-content-center text-current"
				keepMounted={true}
			>
				<svg
					aria-hidden="true"
					fill="none"
					role="presentation"
					stroke="currentColor"
					strokeDasharray={22}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					viewBox="0 0 17 18"
					style={{
						transition: "stroke-dashoffset 150ms linear 15ms",
					}}
					className="size-3 [stroke-dashoffset:66] group-data-checked:[stroke-dashoffset:44]"
				>
					<polyline points="1 9 7 14 15 4" />
				</svg>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Checkbox | `[&>svg]:size-3.5 grid place-content-center text-current transition-none`<br>`border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border transition-colors group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50` | `grid place-content-center text-current`<br>`size-3 [stroke-dashoffset:66] group-data-checked:[stroke-dashoffset:44]`<br>`group peer focus-visible:focus-ring aria-invalid:not-data-checked:invalid-field-ring relative flex size-4 shrink-0 items-center justify-center rounded-md border border-none bg-input text-primary-foreground shadow-xs outline-none transition-[color,background-color,box-shadow,opacity] duration-200 after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 group-has-disabled/field:opacity-50 aria-invalid:text-destructive-foreground data-checked:bg-primary aria-invalid:data-checked:bg-destructive dark:data-checked:bg-primary`<br>`[variant === "secondary"] bg-default shadow-none` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Checkbox`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `checkbox`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
