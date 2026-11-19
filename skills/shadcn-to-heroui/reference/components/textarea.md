# Textarea

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/textarea.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/textarea.tsx` and `bases/radix/ui/textarea.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/textarea · HeroUI equivalent: textarea

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

herocn: `Textarea`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cn } from "cn";
import type * as React from "react";

function Textarea({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"textarea"> & {
	variant?: "default" | "secondary";
}) {
	return (
		<textarea
			data-slot="textarea"
			data-variant={variant}
			className={cn(
				"field-sizing-content flex min-h-16 w-full rounded-xl bg-input px-2.5 py-1.5 text-foreground text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground md:px-3 md:py-2 dark:brightness-100",
				"aria-invalid:not-focus-visible:invalid-field-ring",
				"aria-invalid:focus-visible:invalid-field-ring-focus",
				"not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring",
				"hover:not-focus-visible:brightness-97 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110 dark:hover:not-focus-visible:data-[variant=secondary]:bg-default",
				"data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none not-dark:data-[variant=secondary]:brightness-100",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Textarea | `border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-3 aria-invalid:ring-3 md:text-sm flex field-sizing-content min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50` | `field-sizing-content flex min-h-16 w-full rounded-xl bg-input px-2.5 py-1.5 text-foreground text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground md:px-3 md:py-2 dark:brightness-100`<br>`aria-invalid:not-focus-visible:invalid-field-ring`<br>`aria-invalid:focus-visible:invalid-field-ring-focus`<br>`not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring`<br>`hover:not-focus-visible:brightness-97 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110 dark:hover:not-focus-visible:data-[variant=secondary]:bg-default`<br>`data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none not-dark:data-[variant=secondary]:brightness-100`<br>`disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Textarea`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `textarea`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
