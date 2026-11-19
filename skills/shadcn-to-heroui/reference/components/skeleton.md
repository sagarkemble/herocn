# Skeleton

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/skeleton.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/skeleton.tsx` and `bases/radix/ui/skeleton.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/skeleton · HeroUI equivalent: skeleton

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

herocn: `Skeleton`, `skeletonAnimationTypes`

- Extra vs stock base: `skeletonAnimationTypes`
- Missing vs stock base: none
- Extra vs stock radix: `skeletonAnimationTypes`
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const skeletonAnimationTypes = cva(
	"skeleton pointer-events-none relative overflow-hidden rounded-sm bg-surface-tertiary/70",
	{
		variants: {
			animationType: {
				shimmer: "skeleton--shimmer",
				pulse: "animate-pulse",
				none: "",
			},
		},
		defaultVariants: {
			animationType: "shimmer",
		},
	},
);

function Skeleton({
	className,
	animationType,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonAnimationTypes>) {
	return (
		<div
			data-slot="skeleton"
			className={cn(skeletonAnimationTypes({ animationType, className }))}
			{...props}
		/>
	);
}

export { Skeleton, skeletonAnimationTypes };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| skeletonAnimationTypes · base | *(part not in stock)* | `skeleton pointer-events-none relative overflow-hidden rounded-sm bg-surface-tertiary/70` |
| skeletonAnimationTypes · animationType=shimmer | *(part not in stock)* | `skeleton--shimmer` |
| skeletonAnimationTypes · animationType=pulse | *(part not in stock)* | `animate-pulse` |
| skeletonAnimationTypes · animationType=none | *(part not in stock)* | *(empty)* |
| Skeleton | `bg-muted rounded-md animate-pulse` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Skeleton`: new prop `animationType`, **review**: new prop without a default in the destructure (check the type is optional).
- cva option `skeletonAnimationTypes · animationType=none` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `skeletonAnimationTypes · animationType=pulse` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.
- cva option `skeletonAnimationTypes · animationType=shimmer` is **new in herocn**. *Safe additive*: adds a variant value without changing existing ones.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `skeleton`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
