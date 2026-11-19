# NativeSelect

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/native-select.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/native-select.tsx` and `bases/radix/ui/native-select.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/native-select · HeroUI equivalent: NOT FOUND (closest: select)

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

herocn: `NativeSelect`, `NativeSelectOptGroup`, `NativeSelectOption`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";

type NativeSelectProps = React.ComponentProps<"select"> & {
	variant?: "default" | "secondary";
};

function NativeSelect({
	className,
	variant = "default",
	...props
}: NativeSelectProps) {
	return (
		<div
			className={cn(
				"relative w-fit has-[select:disabled]:opacity-50",
				className,
			)}
			data-slot="native-select-wrapper"
			data-variant={variant}
		>
			<select
				data-slot="native-select"
				data-variant={variant}
				className={cn(
					"w-full min-w-36 appearance-none rounded-xl bg-input px-2.5 py-1.5 pe-8 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none md:px-3 md:py-2 dark:brightness-100",
					"aria-invalid:not-focus-visible:invalid-field-ring",
					"aria-invalid:focus-visible:invalid-field-ring-focus",
					"not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring",
					"hover:not-focus-visible:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110 dark:hover:not-focus-visible:data-[variant=secondary]:bg-default",
				)}
				{...props}
			/>
			<ChevronDownIcon
				className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 select-none text-muted-foreground"
				aria-hidden="true"
				data-slot="native-select-icon"
			/>
		</div>
	);
}

function NativeSelectOption({
	className,
	...props
}: React.ComponentProps<"option">) {
	return (
		<option
			data-slot="native-select-option"
			className={cn("bg-[Canvas] text-[CanvasText]", className)}
			{...props}
		/>
	);
}

function NativeSelectOptGroup({
	className,
	...props
}: React.ComponentProps<"optgroup">) {
	return (
		<optgroup
			data-slot="native-select-optgroup"
			className={cn("bg-[Canvas] text-[CanvasText]", className)}
			{...props}
		/>
	);
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| NativeSelect | `border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 w-full min-w-0 appearance-none rounded-lg border bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed`<br>`text-muted-foreground top-1/2 right-2.5 size-4 -translate-y-1/2 pointer-events-none absolute select-none`<br>`group/native-select relative w-fit has-[select:disabled]:opacity-50` | `pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 select-none text-muted-foreground`<br>`relative w-fit has-[select:disabled]:opacity-50`<br>`w-full min-w-36 appearance-none rounded-xl bg-input px-2.5 py-1.5 pe-8 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none md:px-3 md:py-2 dark:brightness-100`<br>`aria-invalid:not-focus-visible:invalid-field-ring`<br>`aria-invalid:focus-visible:invalid-field-ring-focus`<br>`not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring`<br>`hover:not-focus-visible:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110 dark:hover:not-focus-visible:data-[variant=secondary]:bg-default` |
| NativeSelectOption | `bg-[Canvas] text-[CanvasText]` | `bg-[Canvas] text-[CanvasText]` |
| NativeSelectOptGroup | `bg-[Canvas] text-[CanvasText]` | `bg-[Canvas] text-[CanvasText]` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `NativeSelect`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.
- `NativeSelect`: stock prop `size = "default"` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.

## Herocn-only / not in HeroUI

- HeroUI equivalent: NOT FOUND (closest: select). Styling is herocn's own.
