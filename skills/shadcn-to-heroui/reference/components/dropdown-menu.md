# DropdownMenu

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/dropdown-menu.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/dropdown-menu.tsx` and `bases/radix/ui/dropdown-menu.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/dropdown-menu · HeroUI equivalent: dropdown / menu / menu-item

## Primitive (Base UI import used by herocn)

```ts
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
```

## Exports

herocn: `DropdownMenu`, `DropdownMenuCheckboxItem`, `DropdownMenuContent`, `DropdownMenuEmpty`, `DropdownMenuFilterProvider`, `DropdownMenuGroup`, `DropdownMenuInput`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuList`, `DropdownMenuPortal`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuTrigger`

- Extra vs stock base: `DropdownMenuEmpty`, `DropdownMenuFilterProvider`, `DropdownMenuInput`, `DropdownMenuList`
- Missing vs stock base: none
- Extra vs stock radix: `DropdownMenuEmpty`, `DropdownMenuFilterProvider`, `DropdownMenuInput`, `DropdownMenuList`
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { CheckIcon, ChevronRightIcon, XIcon } from "lucide-react";
import type * as React from "react";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
	return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
	return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
	return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
	align = "start",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	className,
	...props
}: MenuPrimitive.Popup.Props &
	Pick<
		MenuPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				className="isolate z-50 outline-none"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
			>
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={cn(
						"z-50 max-h-(--available-height) w-(--anchor-width) min-w-45 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-3xl bg-popover p-1.5 text-popover-foreground shadow-xl outline-none ring-1 ring-foreground/10 transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.9] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[instant=group]:transition-none data-ending-style:duration-100 md:min-w-55",
						className,
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
	return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
	className,
	inset,
	...props
}: MenuPrimitive.GroupLabel.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot="dropdown-menu-label"
			data-inset={inset}
			className={cn(
				"px-3 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-7",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: MenuPrimitive.Item.Props & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"group/dropdown-menu-item focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground not-data-[variant=destructive]:focus-visible:**:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus-visible:text-destructive data-[variant=destructive]:focus-visible:ring-destructive data-[variant=destructive]:hover:bg-destructive/20 data-[variant=destructive]:hover:text-destructive/90 dark:data-[variant=destructive]:hover:bg-destructive/10 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] data-popup-open:bg-accent data-inset:ps-7 data-popup-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ms-auto rtl:rotate-180" />
		</MenuPrimitive.SubmenuTrigger>
	);
}

function DropdownMenuSubContent({
	align = "start",
	alignOffset = 0,
	side = "inline-end",
	sideOffset = 8,
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return (
		<DropdownMenuContent
			data-slot="dropdown-menu-sub-content"
			className={cn(
				"relative flex w-full min-w-45 flex-col gap-1 overflow-clip rounded-2xl bg-popover p-1.5 text-popover-foreground shadow-2xl ring-1 ring-foreground/10 md:min-w-55",
				className,
			)}
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: MenuPrimitive.CheckboxItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			data-inset={inset}
			className={cn(
				"focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span
				className="pointer-events-none absolute end-2 flex items-center justify-center"
				data-slot="dropdown-menu-checkbox-item-indicator"
			>
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
	return (
		<MenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

function DropdownMenuRadioItem({
	className,
	children,
	inset,
	...props
}: MenuPrimitive.RadioItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			data-inset={inset}
			className={cn(
				"focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 ps-1.5 pe-8 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<span
				className="pointer-events-none absolute end-2 flex items-center justify-center"
				data-slot="dropdown-menu-radio-item-indicator"
			>
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function DropdownMenuSeparator({
	className,
	...props
}: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}

function DropdownMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn(
				"ms-auto text-muted-foreground text-xs tracking-widest group-focus/dropdown-menu-item:text-accent-foreground group-data-highlighted/dropdown-menu-item:text-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuEmpty({ className, ...props }: MenuPrimitive.Empty.Props) {
	return (
		<MenuPrimitive.Empty
			data-slot="dropdown-menu-empty"
			className={cn(
				"px-3 py-6 text-center text-muted-foreground text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuFilterProvider({
	...props
}: MenuPrimitive.FilterProvider.Props) {
	return (
		<MenuPrimitive.FilterProvider
			data-slot="dropdown-menu-filter-provider"
			{...props}
		/>
	);
}

function DropdownMenuInput({
	className,
	showClear = true,
	...props
}: MenuPrimitive.Input.Props & {
	showClear?: boolean;
}) {
	return (
		<div
			data-slot="dropdown-menu-input-wrapper"
			className="relative m-1.5 mb-0"
		>
			<MenuPrimitive.Input
				data-slot="dropdown-menu-input"
				data-variant="secondary"
				className={cn(
					"w-full min-w-0 rounded-xl bg-input px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none md:px-3 md:py-2 dark:brightness-100",
					"aria-invalid:not-data-highlighted:invalid-field-ring",
					"aria-invalid:data-highlighted:invalid-field-ring-focus",
					"not-aria-invalid:data-highlighted:focus-field-ring not-aria-invalid:data-highlighted:ring-ring",
					"hover:not-data-highlighted:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-data-highlighted:data-[variant=secondary]:bg-default not-dark:hover:not-data-highlighted:data-[variant=secondary]:brightness-96 dark:hover:not-data-highlighted:brightness-110 dark:hover:not-data-highlighted:data-[variant=secondary]:bg-default",
					showClear && "pe-8!",
					className,
				)}
				{...props}
			/>
			{showClear && (
				<MenuPrimitive.Clear
					data-slot="dropdown-menu-clear"
					className="absolute end-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-3xl text-muted-foreground outline-none transition hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
				>
					<XIcon />
				</MenuPrimitive.Clear>
			)}
		</div>
	);
}

function DropdownMenuList({ className, ...props }: MenuPrimitive.List.Props) {
	return (
		<MenuPrimitive.List
			data-slot="dropdown-menu-list"
			className={cn(
				"scroll-py-1 overflow-y-auto overscroll-contain p-2 outline-none",
				className,
			)}
			{...props}
		/>
	);
}

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuEmpty,
	DropdownMenuFilterProvider,
	DropdownMenuGroup,
	DropdownMenuInput,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuList,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| DropdownMenuContent | `isolate z-50 outline-none`<br>`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground! z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden` | `isolate z-50 outline-none`<br>`z-50 max-h-(--available-height) w-(--anchor-width) min-w-45 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-3xl bg-popover p-1.5 text-popover-foreground shadow-xl outline-none ring-1 ring-foreground/10 transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.9] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[instant=group]:transition-none data-ending-style:duration-100 md:min-w-55` |
| DropdownMenuLabel | `text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7` | `px-3 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-7` |
| DropdownMenuItem | `focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `group/dropdown-menu-item focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground not-data-[variant=destructive]:focus-visible:**:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus-visible:text-destructive data-[variant=destructive]:focus-visible:ring-destructive data-[variant=destructive]:hover:bg-destructive/20 data-[variant=destructive]:hover:text-destructive/90 dark:data-[variant=destructive]:hover:bg-destructive/10 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive` |
| DropdownMenuSubTrigger | `ml-auto`<br>`focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0` | `ms-auto rtl:rotate-180`<br>`focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] data-popup-open:bg-accent data-inset:ps-7 data-popup-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| DropdownMenuSubContent | `data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-[96px] rounded-lg p-1 shadow-lg ring-1 duration-100 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground! w-auto` | `relative flex w-full min-w-45 flex-col gap-1 overflow-clip rounded-2xl bg-popover p-1.5 text-popover-foreground shadow-2xl ring-1 ring-foreground/10 md:min-w-55` |
| DropdownMenuCheckboxItem | `absolute right-2 flex items-center justify-center pointer-events-none`<br>`focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none absolute end-2 flex items-center justify-center`<br>`focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| DropdownMenuRadioItem | `absolute right-2 flex items-center justify-center pointer-events-none`<br>`focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none absolute end-2 flex items-center justify-center`<br>`focus-visible:focus-ring data-highlighted:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 ps-1.5 pe-8 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| DropdownMenuSeparator | `bg-border -mx-1 my-1 h-px` | `-mx-1 my-1 h-px bg-border` |
| DropdownMenuShortcut | `text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest` | `ms-auto text-muted-foreground text-xs tracking-widest group-focus/dropdown-menu-item:text-accent-foreground group-data-highlighted/dropdown-menu-item:text-accent-foreground` |
| DropdownMenuEmpty | *(part not in stock)* | `px-3 py-6 text-center text-muted-foreground text-sm` |
| DropdownMenuInput | *(part not in stock)* | `relative m-1.5 mb-0`<br>`absolute end-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-3xl text-muted-foreground outline-none transition hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`<br>`w-full min-w-0 rounded-xl bg-input px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none md:px-3 md:py-2 dark:brightness-100`<br>`aria-invalid:not-data-highlighted:invalid-field-ring`<br>`aria-invalid:data-highlighted:invalid-field-ring-focus`<br>`not-aria-invalid:data-highlighted:focus-field-ring not-aria-invalid:data-highlighted:ring-ring`<br>`hover:not-data-highlighted:brightness-97 not-dark:data-[variant=secondary]:brightness-100 hover:not-data-highlighted:data-[variant=secondary]:bg-default not-dark:hover:not-data-highlighted:data-[variant=secondary]:brightness-96 dark:hover:not-data-highlighted:brightness-110 dark:hover:not-data-highlighted:data-[variant=secondary]:bg-default`<br>`[showClear] pe-8!` |
| DropdownMenuList | *(part not in stock)* | `scroll-py-1 overflow-y-auto overscroll-contain p-2 outline-none` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--anchor-width`, `--available-height`, `--transform-origin`, `data-[side=inline-end]`, `data-[side=inline-start]`, `data-popup-open`
- Only in stock radix: `--radix-dropdown-menu-content-available-height`, `--radix-dropdown-menu-content-transform-origin`, `--radix-dropdown-menu-trigger-width`, `data-[state=closed]`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `data-popup-open` (trigger while popup open) | `data-open:` (Radix triggers get `data-state="open"`; shadcn's `data-open` variant matches it). `group-data-popup-open/x:` → `group-data-open/x:`. |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |
| `--available-height` | `--radix-<primitive>-content-available-height`. |
| `--anchor-width` | `--radix-<primitive>-trigger-width` (e.g. `--radix-select-trigger-width`, `--radix-popover-trigger-width`). |
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `DropdownMenuContent`: prop changed `sideOffset = 4` → `sideOffset = 8`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `DropdownMenuSubContent`: prop changed `alignOffset = -3` → `alignOffset = 0`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `DropdownMenuSubContent`: prop changed `side = "right"` → `side = "inline-end"`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `DropdownMenuSubContent`: prop changed `sideOffset = 0` → `sideOffset = 8`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `DropdownMenuEmpty`: **new function/sub-component** (not in stock base). Props: `className`. *Safe additive (review)* as long as nothing in the app imports a stock-only name.
- `DropdownMenuFilterProvider`: **new function/sub-component** (not in stock base). Props: —. *Safe additive (review)* as long as nothing in the app imports a stock-only name.
- `DropdownMenuInput`: **new function/sub-component** (not in stock base). Props: `className`, `showClear = true`. *Safe additive (review)* as long as nothing in the app imports a stock-only name.
- `DropdownMenuList`: **new function/sub-component** (not in stock base). Props: `className`. *Safe additive (review)* as long as nothing in the app imports a stock-only name.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `dropdown / menu / menu-item`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
