# Pagination

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/pagination.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/pagination.tsx` and `bases/radix/ui/pagination.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/pagination · HeroUI equivalent: pagination

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

herocn: `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cn } from "cn";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex items-center gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) {
	return (
		<Button
			variant={isActive ? "tertiary" : "ghost"}
			size={size}
			className={cn(className)}
			nativeButton={false}
			render={
				<a
					aria-current={isActive ? "page" : undefined}
					data-slot="pagination-link"
					data-active={isActive}
					{...props}
				/>
			}
		/>
	);
}

function PaginationPrevious({
	className,
	text = "Previous",
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("ps-2!", className)}
			{...props}
		>
			<ChevronLeftIcon data-icon="inline-start" className="rtl:rotate-180" />
			<span className="hidden sm:block">{text}</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	text = "Next",
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("pe-2!", className)}
			{...props}
		>
			<span className="hidden sm:block">{text}</span>
			<ChevronRightIcon data-icon="inline-end" className="rtl:rotate-180" />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				"flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Pagination | `mx-auto flex w-full justify-center` | `mx-auto flex w-full justify-center` |
| PaginationContent | `gap-0.5 flex items-center` | `flex items-center gap-1` |
| PaginationPrevious | *(empty)*<br>`hidden sm:block`<br>`pl-1.5!` | `rtl:rotate-180`<br>`hidden sm:block`<br>`ps-2!` |
| PaginationNext | `hidden sm:block`<br>*(empty)*<br>`pr-1.5!` | `hidden sm:block`<br>`rtl:rotate-180`<br>`pe-2!` |
| PaginationEllipsis | `sr-only`<br>`size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center` | `sr-only`<br>`flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `pagination`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
