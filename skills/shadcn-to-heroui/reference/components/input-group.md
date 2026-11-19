# InputGroup

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/input-group.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/input-group.tsx` and `bases/radix/ui/input-group.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/input-group · HeroUI equivalent: input-group

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

herocn: `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";

function InputGroup({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & { variant?: "default" | "secondary" }) {
	return (
		<div
			data-slot="input-group"
			role="group"
			data-variant={variant}
			className={cn(
				"group/input-group has-[[data-slot=input-group-control]:not([aria-invalid=true]):focus-visible]:focus-field-ring has-[[data-slot][aria-invalid=true]:not(:focus-visible)]:invalid-field-ring has-[[data-slot][aria-invalid=true]:focus-visible]:invalid-field-ring-focus relative flex h-9 w-full min-w-0 items-center rounded-xl bg-input outline-none transition-[background-color,box-shadow,opacity,filter] in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col data-[variant=secondary]:bg-default dark:brightness-100 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3",
				"has-[>[data-slot=input-group-control]:disabled]:cursor-not-allowed has-[>[data-slot=input-group-control]:disabled]:opacity-50",
				"hover:not-focus-within:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-focus-within:data-[variant=secondary]:bg-default not-dark:hover:not-focus-within:data-[variant=secondary]:brightness-96 dark:hover:not-focus-within:brightness-110 dark:hover:not-focus-within:data-[variant=secondary]:bg-default",
				className,
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	"flex h-auto cursor-text select-none items-center justify-center gap-2 py-2 font-medium text-muted-foreground text-sm peer-disabled:cursor-not-allowed **:data-[slot=spinner]:size-4 **:data-[slot=kbd]:rounded-4xl **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 group-data-[disabled=true]/input-group:opacity-50 [&>svg:not([class*='size-'])]:size-4",
	{
		variants: {
			align: {
				"inline-start":
					"order-first ps-3 has-[>button]:-ms-3 has-[>kbd]:ms-[-0.15rem]",
				"inline-end":
					"order-last pe-3 has-[>button]:-me-3 has-[>kbd]:me-[-0.15rem]",
				"block-start":
					"order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-3 [.border-b]:pb-3",
				"block-end":
					"order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-3 [.border-t]:pt-3",
			},
		},
		defaultVariants: {
			align: "inline-start",
		},
	},
);

function InputGroupAddon({
	className,
	align = "inline-start",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
	return (
		<div
			role="group"
			data-slot="input-group-addon"
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={(e) => {
				if ((e.target as HTMLElement).closest("button")) {
					return;
				}
				e.currentTarget.parentElement?.querySelector("input")?.focus();
			}}
			{...props}
		/>
	);
}

const inputGroupButtonVariants = cva(
	"flex items-center gap-2 rounded-xl text-sm shadow-none",
	{
		variants: {
			size: {
				xs: "gap-1 px-2.5 [&>svg:not([class*='size-'])]:size-3",
				sm: "",
				"icon-xs": "size-7 gap-1 p-0 has-[>svg]:p-0",
				"icon-sm": "size-8 p-0 has-[>svg]:p-0",
			},
		},
		defaultVariants: {
			size: "xs",
		},
	},
);

function InputGroupButton({
	className,
	type = "button",
	variant = "ghost",
	size = "xs",
	...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
	VariantProps<typeof inputGroupButtonVariants> & {
		type?: "button" | "submit" | "reset";
	}) {
	return (
		<Button
			type={type}
			data-size={size}
			variant={variant}
			className={cn(inputGroupButtonVariants({ size }), className)}
			{...props}
		/>
	);
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function InputGroupInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="input-group-control"
			className={cn(
				"peer flex-1 rounded-none bg-transparent shadow-none focus-visible:ring-0! aria-invalid:outline-none aria-invalid:not-focus-visible:outline-0 dark:bg-transparent",
				"hover:not-focus-visible:bg-transparent hover:not-focus-visible:data-[variant=secondary]:bg-transparent dark:hover:not-focus-visible:bg-transparent dark:hover:not-focus-visible:data-[variant=secondary]:bg-transparent",
				"disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

function InputGroupTextarea({
	className,
	...props
}: React.ComponentProps<typeof Textarea>) {
	return (
		<Textarea
			data-slot="input-group-control"
			className={cn(
				"peer flex-1 resize-none rounded-none bg-transparent py-2 shadow-none focus-visible:ring-0! aria-invalid:outline-none aria-invalid:not-focus-visible:outline-0 dark:bg-transparent",
				"hover:not-focus-visible:bg-transparent hover:not-focus-visible:data-[variant=secondary]:bg-transparent dark:hover:not-focus-visible:bg-transparent dark:hover:not-focus-visible:data-[variant=secondary]:bg-transparent",
				"disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| InputGroup | `group/input-group border-input dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-disabled:bg-input/50 dark:has-disabled:bg-input/80 h-8 rounded-lg border transition-colors in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto` | `group/input-group has-[[data-slot=input-group-control]:not([aria-invalid=true]):focus-visible]:focus-field-ring has-[[data-slot][aria-invalid=true]:not(:focus-visible)]:invalid-field-ring has-[[data-slot][aria-invalid=true]:focus-visible]:invalid-field-ring-focus relative flex h-9 w-full min-w-0 items-center rounded-xl bg-input outline-none transition-[background-color,box-shadow,opacity,filter] in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col data-[variant=secondary]:bg-default dark:brightness-100 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3`<br>`has-[>[data-slot=input-group-control]:disabled]:cursor-not-allowed has-[>[data-slot=input-group-control]:disabled]:opacity-50`<br>`hover:not-focus-within:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-focus-within:data-[variant=secondary]:bg-default not-dark:hover:not-focus-within:data-[variant=secondary]:brightness-96 dark:hover:not-focus-within:brightness-110 dark:hover:not-focus-within:data-[variant=secondary]:bg-default` |
| inputGroupAddonVariants · base | `text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none` | `flex h-auto cursor-text select-none items-center justify-center gap-2 py-2 font-medium text-muted-foreground text-sm peer-disabled:cursor-not-allowed **:data-[slot=spinner]:size-4 **:data-[slot=kbd]:rounded-4xl **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 group-data-[disabled=true]/input-group:opacity-50 [&>svg:not([class*='size-'])]:size-4` |
| inputGroupAddonVariants · align=inline-start | `pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem] order-first` | `order-first ps-3 has-[>button]:-ms-3 has-[>kbd]:ms-[-0.15rem]` |
| inputGroupAddonVariants · align=inline-end | `pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem] order-last` | `order-last pe-3 has-[>button]:-me-3 has-[>kbd]:me-[-0.15rem]` |
| inputGroupAddonVariants · align=block-start | `px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start` | `order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-3 [.border-b]:pb-3` |
| inputGroupAddonVariants · align=block-end | `px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start` | `order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-3 [.border-t]:pt-3` |
| inputGroupButtonVariants · base | `gap-2 text-sm flex items-center shadow-none` | `flex items-center gap-2 rounded-xl text-sm shadow-none` |
| inputGroupButtonVariants · size=xs | `h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5` | `gap-1 px-2.5 [&>svg:not([class*='size-'])]:size-3` |
| inputGroupButtonVariants · size=sm | *(empty)* | *(empty)* |
| inputGroupButtonVariants · size=icon-xs | `size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0` | `size-7 gap-1 p-0 has-[>svg]:p-0` |
| inputGroupButtonVariants · size=icon-sm | `size-8 p-0 has-[>svg]:p-0` | `size-8 p-0 has-[>svg]:p-0` |
| InputGroupText | `text-muted-foreground gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none` | `flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none` |
| InputGroupInput | `rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1` | `peer flex-1 rounded-none bg-transparent shadow-none focus-visible:ring-0! aria-invalid:outline-none aria-invalid:not-focus-visible:outline-0 dark:bg-transparent`<br>`hover:not-focus-visible:bg-transparent hover:not-focus-visible:data-[variant=secondary]:bg-transparent dark:hover:not-focus-visible:bg-transparent dark:hover:not-focus-visible:data-[variant=secondary]:bg-transparent`<br>`disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50` |
| InputGroupTextarea | `rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1 resize-none` | `peer flex-1 resize-none rounded-none bg-transparent py-2 shadow-none focus-visible:ring-0! aria-invalid:outline-none aria-invalid:not-focus-visible:outline-0 dark:bg-transparent`<br>`hover:not-focus-visible:bg-transparent hover:not-focus-visible:data-[variant=secondary]:bg-transparent dark:hover:not-focus-visible:bg-transparent dark:hover:not-focus-visible:data-[variant=secondary]:bg-transparent`<br>`disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `InputGroup`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `input-group`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
