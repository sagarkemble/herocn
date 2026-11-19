# Menubar

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/menubar.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/menubar.tsx` and `bases/radix/ui/menubar.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/menubar · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Menubar as MenubarPrimitive } from "radix-ui"
```

## Exports

herocn: `Menubar`, `MenubarCheckboxItem`, `MenubarContent`, `MenubarGroup`, `MenubarItem`, `MenubarLabel`, `MenubarMenu`, `MenubarPortal`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarSub`, `MenubarSubContent`, `MenubarSubTrigger`, `MenubarTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";
import type * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu";

function Menubar({
	className,
	variant = "default",
	...props
}: MenubarPrimitive.Props & {
	variant?: "default" | "secondary" | "tertiary" | "outline";
}) {
	return (
		<MenubarPrimitive
			data-slot="menubar"
			data-variant={variant}
			className={cn(
				"group/menubar flex items-center rounded-3xl bg-surface p-1.5",
				variant === "outline" && "border bg-transparent",
				variant === "secondary" && "bg-surface-secondary",
				variant === "tertiary" && "bg-surface-tertiary",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
	return <DropdownMenu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
	return <DropdownMenuGroup data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
	return <DropdownMenuPortal data-slot="menubar-portal" {...props} />;
}

function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
	return (
		<DropdownMenuTrigger
			data-slot="menubar-trigger"
			className={cn(
				"pressible focus-visible:focus-ring inline-flex cursor-pointer select-none items-center justify-center rounded-2xl px-3 py-1.5 font-medium text-sm outline-none hover:bg-muted data-popup-open:bg-muted group-data-[variant=secondary]/menubar:data-popup-open:brightness-97 group-data-[variant=tertiary]/menubar:data-popup-open:brightness-94 group-data-[variant=secondary]/menubar:hover:brightness-97 group-data-[variant=tertiary]/menubar:hover:brightness-94 dark:group-data-[variant=secondary]/menubar:data-popup-open:brightness-110 dark:group-data-[variant=tertiary]/menubar:data-popup-open:brightness-120 dark:group-data-[variant=secondary]/menubar:hover:brightness-110 dark:group-data-[variant=tertiary]/menubar:hover:brightness-120",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarContent({
	...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return <DropdownMenuContent data-slot="menubar-content" {...props} />;
}

function MenubarItem({
	...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
	return <DropdownMenuItem data-slot="menubar-item" {...props} />;
}

function MenubarCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			className={cn(
				"focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			{children}
			<span
				className="pointer-events-none absolute end-2 flex items-center justify-center"
				data-slot="menubar-checkbox-item-indicator"
			>
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon className="size-4" />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
		</MenuPrimitive.CheckboxItem>
	);
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
	return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarRadioItem({
	className,
	children,
	...props
}: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="menubar-radio-item"
			className={cn(
				"focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 ps-1.5 pe-8 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<span
				className="pointer-events-none absolute end-2 flex items-center justify-center"
				data-slot="menubar-radio-item-indicator"
			>
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon className="size-4" />
				</MenuPrimitive.RadioItemIndicator>
			</span>
		</MenuPrimitive.RadioItem>
	);
}

function MenubarLabel({
	...props
}: React.ComponentProps<typeof DropdownMenuLabel>) {
	return <DropdownMenuLabel data-slot="menubar-label" {...props} />;
}

function MenubarSeparator({
	...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
	return <DropdownMenuSeparator data-slot="menubar-separator" {...props} />;
}

function MenubarShortcut({
	...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
	return <DropdownMenuShortcut data-slot="menubar-shortcut" {...props} />;
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
	return <DropdownMenuSub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
	...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>) {
	return <DropdownMenuSubTrigger data-slot="menubar-sub-trigger" {...props} />;
}

function MenubarSubContent({
	...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
	return <DropdownMenuSubContent data-slot="menubar-sub-content" {...props} />;
}

export {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarPortal,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Menubar | `h-8 gap-0.5 rounded-lg border p-[3px] flex items-center` | `group/menubar flex items-center rounded-3xl bg-surface p-1.5`<br>`outline`<br>`[variant === "outline"] border bg-transparent`<br>`[variant === "secondary"] bg-surface-secondary`<br>`[variant === "tertiary"] bg-surface-tertiary` |
| MenubarTrigger | `hover:bg-muted aria-expanded:bg-muted rounded-sm px-1.5 py-[2px] text-sm font-medium flex items-center outline-hidden select-none` | `pressible focus-visible:focus-ring inline-flex cursor-pointer select-none items-center justify-center rounded-2xl px-3 py-1.5 font-medium text-sm outline-none hover:bg-muted data-popup-open:bg-muted group-data-[variant=secondary]/menubar:data-popup-open:brightness-97 group-data-[variant=tertiary]/menubar:data-popup-open:brightness-94 group-data-[variant=secondary]/menubar:hover:brightness-97 group-data-[variant=tertiary]/menubar:hover:brightness-94 dark:group-data-[variant=secondary]/menubar:data-popup-open:brightness-110 dark:group-data-[variant=tertiary]/menubar:data-popup-open:brightness-120 dark:group-data-[variant=secondary]/menubar:hover:brightness-110 dark:group-data-[variant=tertiary]/menubar:hover:brightness-120` |
| MenubarCheckboxItem | `left-1.5 size-4 [&_svg:not([class*='size-'])]:size-4 pointer-events-none absolute flex items-center justify-center`<br>`focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-1.5 pl-7 text-sm data-inset:pl-7 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none absolute end-2 flex items-center justify-center`<br>`size-4`<br>`focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| MenubarRadioItem | `left-1.5 size-4 [&_svg:not([class*='size-'])]:size-4 pointer-events-none absolute flex items-center justify-center`<br>`focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-1.5 pl-7 text-sm data-disabled:opacity-50 data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none absolute end-2 flex items-center justify-center`<br>`size-4`<br>`focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 ps-1.5 pe-8 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| MenubarContent | `bg-popover text-popover-foreground data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-lg p-1 shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!` | *(part not in herocn)* |
| MenubarItem | `focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-disabled:opacity-50 data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 group/menubar-item` | *(part not in herocn)* |
| MenubarLabel | `px-1.5 py-1 text-sm font-medium data-inset:pl-7` | *(part not in herocn)* |
| MenubarSeparator | `bg-border -mx-1 my-1 h-px` | *(part not in herocn)* |
| MenubarShortcut | `text-muted-foreground group-focus/menubar-item:text-accent-foreground text-xs tracking-widest ml-auto` | *(part not in herocn)* |
| MenubarSubTrigger | `focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4` | *(part not in herocn)* |
| MenubarSubContent | `bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-32 rounded-lg p-1 shadow-lg ring-1 duration-100 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `data-[side=inline-end]`, `data-[side=inline-start]`
- Only in stock radix: `--radix-menubar-content-transform-origin`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-popup-open` (trigger while popup open) | `data-open:` (Radix triggers get `data-state="open"`; shadcn's `data-open` variant matches it). `group-data-popup-open/x:` → `group-data-open/x:`. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Menubar`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.
- `MenubarContent`: stock prop `className` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarContent`: stock prop `align = "start"` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarContent`: stock prop `alignOffset = -4` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarContent`: stock prop `sideOffset = 8` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarItem`: stock prop `className` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarItem`: stock prop `inset` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarItem`: stock prop `variant = "default"` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarCheckboxItem`: stock prop `inset` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarRadioItem`: stock prop `inset` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarLabel`: stock prop `className` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarLabel`: stock prop `inset` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarSeparator`: stock prop `className` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarShortcut`: stock prop `className` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarSubTrigger`: stock prop `className` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarSubTrigger`: stock prop `inset` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `MenubarSubContent`: stock prop `className` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `menubar`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
