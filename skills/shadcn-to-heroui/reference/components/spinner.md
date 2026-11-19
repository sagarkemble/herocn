# Spinner

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/spinner.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/spinner.tsx` and `bases/radix/ui/spinner.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/spinner · HeroUI equivalent: spinner

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

herocn: `Spinner`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { useId } from "react";

function SpinnerIcon({ ...props }: React.ComponentProps<"svg">) {
	const id = useId();

	return (
		<svg data-slot="spinner-icon" viewBox="0 0 24 24" {...props}>
			<title>Spinner SVG</title>
			<defs>
				<linearGradient
					id={`«data-slot-icon-def-1»-${id}`}
					x1="50%"
					x2="50%"
					y1="5.271%"
					y2="91.793%"
				>
					<stop offset="0%" stopColor="currentColor" />
					<stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
				</linearGradient>
				<linearGradient
					id={`«data-slot-icon-def-2»-${id}`}
					x1="50%"
					x2="50%"
					y1="15.24%"
					y2="87.15%"
				>
					<stop offset="0%" stopColor="currentColor" stopOpacity={0} />
					<stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
				</linearGradient>
			</defs>
			<g fill="none">
				<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
				<path
					d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
					fill={`url(#«data-slot-icon-def-1»-${id})`}
					transform="translate(1.5 1.625)"
				/>
				<path
					d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
					fill={`url(#«data-slot-icon-def-2»-${id})`}
					transform="translate(1.5 1.625)"
				/>
			</g>
		</svg>
	);
}

const spinnerVariants = cva(
	"animation-duration-750 pointer-events-none relative origin-center animate-spin",
	{
		variants: {
			variant: {
				default: "text-inherit",
				primary: "text-primary",
				destructive: "text-destructive",
				success: "text-success",
				warning: "text-warning",
			},
			size: {
				default: "size-6",
				sm: "size-4",
				lg: "size-8",
				xl: "size-10",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	},
);

function Spinner({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
	return (
		<SpinnerIcon
			role="status"
			aria-label="Loading"
			data-slot="spinner"
			className={cn(spinnerVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Spinner };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| spinnerVariants · base | *(part not in stock)* | `animation-duration-750 pointer-events-none relative origin-center animate-spin` |
| spinnerVariants · variant=default | *(part not in stock)* | `text-inherit` |
| spinnerVariants · variant=primary | *(part not in stock)* | `text-primary` |
| spinnerVariants · variant=destructive | *(part not in stock)* | `text-destructive` |
| spinnerVariants · variant=success | *(part not in stock)* | `text-success` |
| spinnerVariants · variant=warning | *(part not in stock)* | `text-warning` |
| spinnerVariants · size=default | *(part not in stock)* | `size-6` |
| spinnerVariants · size=sm | *(part not in stock)* | `size-4` |
| spinnerVariants · size=lg | *(part not in stock)* | `size-8` |
| spinnerVariants · size=xl | *(part not in stock)* | `size-10` |
| Spinner | `size-4 animate-spin` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `SpinnerIcon`: **new function/sub-component** (not in stock base). Props: —. *Safe additive (review)* as long as nothing in the app imports a stock-only name.
- `Spinner`: new prop `variant`, **review**: new prop without a default in the destructure (check the type is optional).
- `Spinner`: new prop `size`, **review**: new prop without a default in the destructure (check the type is optional).
- cva option `spinnerVariants · size=default` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · size=lg` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · size=sm` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · size=xl` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · variant=default` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · variant=destructive` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · variant=primary` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · variant=success` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `spinnerVariants · variant=warning` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `spinner`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
