# Input

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/input.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/input.tsx` and `bases/radix/ui/input.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/input · HeroUI equivalent: input

## Primitive (Base UI import used by herocn)

```ts
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
```

## Exports

herocn: `Input`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import type * as React from "react";

function Input({
	className,
	variant = "default",
	type,
	...props
}: React.ComponentProps<"input"> & { variant?: "default" | "secondary" }) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			data-variant={variant}
			className={cn(
				"w-full min-w-0 rounded-xl bg-input px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none md:px-3 md:py-2 dark:brightness-100",
				"aria-invalid:not-focus-visible:invalid-field-ring",
				"aria-invalid:focus-visible:invalid-field-ring-focus",
				"not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring",
				"hover:not-focus-visible:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110 dark:hover:not-focus-visible:data-[variant=secondary]:bg-default",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Input | `dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50` | `w-full min-w-0 rounded-xl bg-input px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none md:px-3 md:py-2 dark:brightness-100`<br>`aria-invalid:not-focus-visible:invalid-field-ring`<br>`aria-invalid:focus-visible:invalid-field-ring-focus`<br>`not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring`<br>`hover:not-focus-visible:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110 dark:hover:not-focus-visible:data-[variant=secondary]:bg-default` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Input`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `input`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**Field state classes (herocn DESIGN.md, use verbatim on every field-like control: input, textarea, input-group, native-select, select trigger, combobox input, input-otp slots):**
- focus: `not-aria-invalid:focus-visible:focus-field-ring`
- invalid: `aria-invalid:not-focus-visible:invalid-field-ring` and `aria-invalid:focus-visible:invalid-field-ring-focus`
- disabled: `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`
- hover: `hover:brightness-97` (`dark:hover:brightness-110`)
- variants via `data-variant`: default `bg-input shadow-xs`; secondary `bg-default shadow-none`

**`variant` prop** (`"default" | "secondary"`, default `"default"`, rendered as `data-variant`) is *safe additive*: existing `<Input>` calls render as before.
**Stock `border-input` → herocn `bg-input`.** herocn fields are borderless. `--input` is the fill color (white / `oklch(0.2103 0.0059 285.89)`), so any app code that uses `border-input` for borders needs `border-border` instead (SKILL step 4).

**HeroUI v3.2.7 reference:** `.input` = `rounded-field` (12px) `bg-field` (white / 0.2103) `px-3 py-2 text-base sm:text-sm shadow-field`, focus `focus-field-ring`, invalid `invalid-field-ring`, disabled `status-disabled` (50%), secondary `bg-default shadow-none`. Differences: herocn-diff I1–I4.
