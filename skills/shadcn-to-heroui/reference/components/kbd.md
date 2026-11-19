# Kbd

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/kbd.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/kbd.tsx` and `bases/radix/ui/kbd.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/kbd · HeroUI equivalent: kbd

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

herocn: `Kbd`, `KbdGroup`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cn } from "cn";

function Kbd({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"kbd"> & { variant?: "default" | "light" }) {
	return (
		<kbd
			data-slot="kbd"
			data-variant={variant}
			className={cn(
				"pointer-events-none inline-flex h-6 w-fit min-w-5.5 select-none items-center justify-center gap-1 space-x-0.5 whitespace-nowrap rounded-lg bg-default in-data-[slot=input-group]:bg-input px-2 text-center font-medium font-sans text-muted-foreground text-xs data-[variant=light]:bg-transparent [&_svg:not([class*='size-'])]:size-3",
				className,
			)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Kbd | `bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 h-5 w-fit min-w-5 gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*='size-'])]:size-3 pointer-events-none inline-flex items-center justify-center select-none` | `pointer-events-none inline-flex h-6 w-fit min-w-5.5 select-none items-center justify-center gap-1 space-x-0.5 whitespace-nowrap rounded-lg bg-default in-data-[slot=input-group]:bg-input px-2 text-center font-medium font-sans text-muted-foreground text-xs data-[variant=light]:bg-transparent [&_svg:not([class*='size-'])]:size-3` |
| KbdGroup | `gap-1 inline-flex items-center` | `inline-flex items-center gap-1` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Kbd`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `kbd`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
