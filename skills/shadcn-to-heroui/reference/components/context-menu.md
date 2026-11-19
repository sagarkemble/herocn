# ContextMenu

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/context-menu.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/context-menu.tsx` and `bases/radix/ui/context-menu.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/context-menu · HeroUI equivalent: menu (HeroUI has no context-menu; menu/menu-item styles are the closest)

## Primitive (Base UI import used by herocn)

```ts
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { ContextMenu as ContextMenuPrimitive } from "radix-ui"
```

## Exports

herocn: `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuGroup`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuPortal`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "cn";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import type * as React from "react";

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
	return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
	return (
		<ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
	);
}

function ContextMenuTrigger({
	className,
	...props
}: ContextMenuPrimitive.Trigger.Props) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			className={cn("select-none", className)}
			{...props}
		/>
	);
}

function ContextMenuContent({
	className,
	align = "start",
	alignOffset = 4,
	side = "inline-end",
	sideOffset = 0,
	...props
}: ContextMenuPrimitive.Popup.Props &
	Pick<
		ContextMenuPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Positioner
				className="isolate z-50 outline-none"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
			>
				<ContextMenuPrimitive.Popup
					data-slot="context-menu-content"
					className={cn(
						"z-50 max-h-(--available-height) w-(--anchor-width) min-w-45 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-3xl bg-popover p-1.5 text-popover-foreground shadow-xl outline-none ring-1 ring-foreground/10 transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.9] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[instant=group]:transition-none data-ending-style:duration-100 md:min-w-55",
						className,
					)}
					{...props}
				/>
			</ContextMenuPrimitive.Positioner>
		</ContextMenuPrimitive.Portal>
	);
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
	return (
		<ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
	);
}

function ContextMenuLabel({
	className,
	inset,
	...props
}: ContextMenuPrimitive.GroupLabel.Props & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.GroupLabel
			data-slot="context-menu-label"
			data-inset={inset}
			className={cn(
				"px-3 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-7",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: ContextMenuPrimitive.Item.Props & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"group/context-menu-item focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-3xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground not-data-[variant=destructive]:focus-visible:**:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus-visible:text-destructive data-[variant=destructive]:focus-visible:ring-destructive data-[variant=destructive]:hover:bg-destructive/20 data-[variant=destructive]:hover:text-destructive/90 dark:data-[variant=destructive]:hover:bg-destructive/10 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
	return (
		<ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
	);
}

function ContextMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.SubmenuTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] data-popup-open:bg-accent data-inset:ps-7 data-popup-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ms-auto rtl:rotate-180" />
		</ContextMenuPrimitive.SubmenuTrigger>
	);
}

function ContextMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuContent>) {
	return (
		<ContextMenuContent
			data-slot="context-menu-sub-content"
			className={cn(
				"relative flex w-full min-w-45 flex-col gap-1 overflow-clip rounded-3xl bg-popover p-1.5 text-popover-foreground shadow-2xl ring-1 ring-foreground/10 md:min-w-55",
				className,
			)}
			side="inline-end"
			{...props}
		/>
	);
}

function ContextMenuCheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			data-inset={inset}
			className={cn(
				"focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="pointer-events-none absolute end-2 flex items-center justify-center">
				<ContextMenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</ContextMenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	);
}

function ContextMenuRadioGroup({
	...props
}: ContextMenuPrimitive.RadioGroup.Props) {
	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot="context-menu-radio-group"
			{...props}
		/>
	);
}

function ContextMenuRadioItem({
	className,
	children,
	inset,
	...props
}: ContextMenuPrimitive.RadioItem.Props & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			data-inset={inset}
			className={cn(
				"focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 ps-1.5 pe-8 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<span className="pointer-events-none absolute end-2 flex items-center justify-center">
				<ContextMenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</ContextMenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	);
}

function ContextMenuSeparator({
	className,
	...props
}: ContextMenuPrimitive.Separator.Props) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}

function ContextMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="context-menu-shortcut"
			className={cn(
				"ms-auto text-muted-foreground text-xs tracking-widest group-focus/context-menu-item:text-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuPortal,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| ContextMenuTrigger | `select-none` | `select-none` |
| ContextMenuContent | `isolate z-50 outline-none`<br>`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-36 rounded-lg p-1 shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground! z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none` | `isolate z-50 outline-none`<br>`z-50 max-h-(--available-height) w-(--anchor-width) min-w-45 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-3xl bg-popover p-1.5 text-popover-foreground shadow-xl outline-none ring-1 ring-foreground/10 transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.9] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[instant=group]:transition-none data-ending-style:duration-100 md:min-w-55` |
| ContextMenuLabel | `text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7` | `px-3 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-7` |
| ContextMenuItem | `focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive focus:*:[svg]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 group/context-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `group/context-menu-item focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-3xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground not-data-[variant=destructive]:focus-visible:**:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus-visible:text-destructive data-[variant=destructive]:focus-visible:ring-destructive data-[variant=destructive]:hover:bg-destructive/20 data-[variant=destructive]:hover:text-destructive/90 dark:data-[variant=destructive]:hover:bg-destructive/10 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive` |
| ContextMenuSubTrigger | `ml-auto`<br>`focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0` | `ms-auto rtl:rotate-180`<br>`focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] data-popup-open:bg-accent data-inset:ps-7 data-popup-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| ContextMenuSubContent | `shadow-lg animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!` | `relative flex w-full min-w-45 flex-col gap-1 overflow-clip rounded-3xl bg-popover p-1.5 text-popover-foreground shadow-2xl ring-1 ring-foreground/10 md:min-w-55` |
| ContextMenuCheckboxItem | `absolute right-2 pointer-events-none`<br>`focus:bg-accent focus:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none absolute end-2 flex items-center justify-center`<br>`focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| ContextMenuRadioItem | `absolute right-2 pointer-events-none`<br>`focus:bg-accent focus:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none absolute end-2 flex items-center justify-center`<br>`focus-visible:focus-ring relative flex min-h-9 w-full cursor-default select-none items-center justify-start gap-3 rounded-2xl px-3 py-1.5 ps-1.5 pe-8 text-sm outline-none outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| ContextMenuSeparator | `bg-border -mx-1 my-1 h-px` | `-mx-1 my-1 h-px bg-border` |
| ContextMenuShortcut | `text-muted-foreground group-focus/context-menu-item:text-accent-foreground ml-auto text-xs tracking-widest` | `ms-auto text-muted-foreground text-xs tracking-widest group-focus/context-menu-item:text-accent-foreground` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--available-height`, `--transform-origin`, `data-[side=inline-end]`, `data-[side=inline-start]`
- Only in stock radix: `--radix-context-menu-content-available-height`, `--radix-context-menu-content-transform-origin`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `data-popup-open` (trigger while popup open) | `data-open:` (Radix triggers get `data-state="open"`; shadcn's `data-open` variant matches it). `group-data-popup-open/x:` → `group-data-open/x:`. |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |
| `--available-height` | `--radix-<primitive>-content-available-height`. |
| `--anchor-width` | `--radix-<primitive>-trigger-width` (e.g. `--radix-select-trigger-width`, `--radix-popover-trigger-width`). |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `ContextMenuContent`: prop changed `side = "right"` → `side = "inline-end"`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `ContextMenuSubContent`: new prop `className`, **review**: new prop without a default in the destructure (check the type is optional).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `menu (HeroUI has no context-menu; menu/menu-item styles are the closest)`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
