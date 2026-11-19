# Table

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/table.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/table.tsx` and `bases/radix/ui/table.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/table · HeroUI equivalent: table

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

herocn: `Table`, `TableBody`, `TableCaption`, `TableCell`, `TableFooter`, `TableHead`, `TableHeader`, `TableRow`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { cn } from "cn";
import type * as React from "react";

function Table({
	className,
	containerClassName,
	variant = "primary",
	...props
}: React.ComponentProps<"table"> & {
	variant?: "primary" | "secondary";
	containerClassName?: string;
}) {
	return (
		<div
			data-slot="table-container"
			data-variant={variant}
			className={cn(
				"group/table no-scrollbar relative w-full overflow-x-auto",
				variant === "primary" && "rounded-3xl bg-surface-secondary p-1",
				containerClassName,
			)}
		>
			<table
				data-slot="table"
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className={cn(
				"group-data-[variant=primary]/table:bg-surface-secondary [&_tr]:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn(
				"[&_tr:last-child]:border-b-0",
				"group-data-[variant=primary]/table:[&_tr:first-child_td:first-child]:rounded-ss-3xl group-data-[variant=primary]/table:[&_tr:first-child_td:last-child]:rounded-se-3xl group-data-[variant=primary]/table:[&_tr:last-child_td:first-child]:rounded-es-3xl group-data-[variant=primary]/table:[&_tr:last-child_td:last-child]:rounded-ee-3xl",
				className,
			)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"[&_tr]:[&_td]:!bg-transparent font-medium group-data-[variant=secondary]/table:border-border/50 group-data-[variant=secondary]/table:border-t [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"border-border/50 border-b transition-colors data-[state=selected]:[&_td]:bg-surface/10",
				"group-data-[variant=primary]/table:hover:[&_td]:bg-surface/40",
				"group-data-[variant=secondary]/table:hover:[&_td]:bg-default/50",
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"relative px-4 py-2.5 text-start font-medium text-muted-foreground text-xs after:pointer-events-none after:absolute after:end-0 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:rounded-sm after:bg-border/50 after:content-['']",
				"group-data-[variant=secondary]/table:bg-surface-secondary group-data-[variant=secondary]/table:last:rounded-e-xl group-data-[variant=secondary]/table:first:rounded-s-xl",
				"[&:has([role=checkbox])]:pe-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"px-4 py-3 align-middle text-foreground text-sm",
				"group-data-[variant=primary]/table:bg-surface",
				"[&:has([role=checkbox])]:pe-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("my-1.5 text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Table | `relative w-full overflow-x-auto`<br>`w-full caption-bottom text-sm` | `group/table no-scrollbar relative w-full overflow-x-auto`<br>`[variant === "primary"] rounded-3xl bg-surface-secondary p-1`<br>`w-full caption-bottom text-sm` |
| TableHeader | `[&_tr]:border-b` | `group-data-[variant=primary]/table:bg-surface-secondary [&_tr]:border-b-0` |
| TableBody | `[&_tr:last-child]:border-0` | `[&_tr:last-child]:border-b-0`<br>`group-data-[variant=primary]/table:[&_tr:first-child_td:first-child]:rounded-ss-3xl group-data-[variant=primary]/table:[&_tr:first-child_td:last-child]:rounded-se-3xl group-data-[variant=primary]/table:[&_tr:last-child_td:first-child]:rounded-es-3xl group-data-[variant=primary]/table:[&_tr:last-child_td:last-child]:rounded-ee-3xl` |
| TableFooter | `bg-muted/50 border-t font-medium [&>tr]:last:border-b-0` | `[&_tr]:[&_td]:!bg-transparent font-medium group-data-[variant=secondary]/table:border-border/50 group-data-[variant=secondary]/table:border-t [&>tr]:last:border-b-0` |
| TableRow | `hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors has-aria-expanded:bg-muted/50` | `border-border/50 border-b transition-colors data-[state=selected]:[&_td]:bg-surface/10`<br>`group-data-[variant=primary]/table:hover:[&_td]:bg-surface/40`<br>`group-data-[variant=secondary]/table:hover:[&_td]:bg-default/50` |
| TableHead | `text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0` | `relative px-4 py-2.5 text-start font-medium text-muted-foreground text-xs after:pointer-events-none after:absolute after:end-0 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:rounded-sm after:bg-border/50 after:content-['']`<br>`group-data-[variant=secondary]/table:bg-surface-secondary group-data-[variant=secondary]/table:last:rounded-e-xl group-data-[variant=secondary]/table:first:rounded-s-xl`<br>`[&:has([role=checkbox])]:pe-0` |
| TableCell | `p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0` | `px-4 py-3 align-middle text-foreground text-sm`<br>`group-data-[variant=primary]/table:bg-surface`<br>`[&:has([role=checkbox])]:pe-0` |
| TableCaption | `text-muted-foreground mt-4 text-sm` | `my-1.5 text-muted-foreground text-sm` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Table`: new prop `containerClassName`, **review**: new prop without a default in the destructure (check the type is optional).
- `Table`: new prop `variant = "primary"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `table`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
