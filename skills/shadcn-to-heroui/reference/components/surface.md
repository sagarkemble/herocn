# Surface

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/surface.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/surface.tsx` and `bases/radix/ui/surface.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/surface · HeroUI equivalent: surface

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
```

## Exports

herocn: `Surface`, `surfaceVariants`

- Stock base: NOT FOUND (no stock component)
- Stock radix: NOT FOUND (no stock radix component)

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

export const surfaceVariants = cva(
	"group/surface relative border-none text-foreground",
	{
		variants: {
			variant: {
				default: "bg-surface",
				secondary: "bg-surface-secondary",
				tertiary: "bg-surface-tertiary",
				transparent: "bg-transparent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Surface({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof surfaceVariants>) {
	return (
		<div
			data-slot="surface"
			className={cn(surfaceVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Surface };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| surfaceVariants · base | NOT FOUND (no stock component) | `group/surface relative border-none text-foreground` |
| surfaceVariants · variant=default | NOT FOUND (no stock component) | `bg-surface` |
| surfaceVariants · variant=secondary | NOT FOUND (no stock component) | `bg-surface-secondary` |
| surfaceVariants · variant=tertiary | NOT FOUND (no stock component) | `bg-surface-tertiary` |
| surfaceVariants · variant=transparent | NOT FOUND (no stock component) | `bg-transparent` |

## Radix notes

Stock radix: NOT FOUND (no `bases/radix/ui/surface.tsx`).

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- Whole component is herocn-only (no stock file). Adding it is *safe additive*: a new file.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `surface`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
- Not in stock shadcn either (herocn-only component).
