# Command

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/command.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/command.tsx` and `bases/radix/ui/command.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/command · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "cn"
```

## Exports

herocn: `Command`, `CommandDialog`, `CommandEmpty`, `CommandGroup`, `CommandInput`, `CommandItem`, `CommandList`, `CommandSeparator`, `CommandShortcut`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Command as CommandPrimitive } from "cmdk";
import { cn } from "cn";
import { CheckIcon, SearchIcon } from "lucide-react";
import type * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/registry/new-york-v4/ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
} from "@/registry/new-york-v4/ui/input-group";

function Command({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive>) {
	return (
		<CommandPrimitive
			data-slot="command"
			className={cn(
				"flex size-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	overlayVariant = "opaque",
	className,
	showCloseButton = false,
	...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> &
	Pick<React.ComponentProps<typeof DialogContent>, "overlayVariant"> & {
		title?: string;
		description?: string;
		className?: string;
		showCloseButton?: boolean;
		children: React.ReactNode;
	}) {
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
				className={cn(
					"top-4 translate-y-0 overflow-hidden rounded-2xl p-0 transition-none sm:max-w-xl md:top-1/3 md:-translate-y-1/3",
					className,
				)}
				overlayVariant={overlayVariant}
				showCloseButton={showCloseButton}
			>
				{children}
			</DialogContent>
		</Dialog>
	);
}

function CommandInput({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
	return (
		<div
			data-slot="command-input-wrapper"
			className="rounded-t-xl border-border border-b p-1 pb-1.5"
		>
			<InputGroup className="rounded-xl hover:not-focus-within:brightness-100 dark:hover:not-focus-within:brightness-100">
				<InputGroupAddon align="inline-start">
					<SearchIcon className="size-4" />
				</InputGroupAddon>
				<CommandPrimitive.Input
					data-slot="command-input"
					className={cn(
						"w-full text-sm outline-hidden placeholder:text-accent-foreground/80 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					{...props}
				/>
			</InputGroup>
		</div>
	);
}

function CommandList({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			className={cn(
				"no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overflow-x-hidden outline-none",
				className,
			)}
			{...props}
		/>
	);
}

function CommandEmpty({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className={cn("py-6 text-center text-sm", className)}
			{...props}
		/>
	);
}

function CommandGroup({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

function CommandSeparator({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn("my-1 h-px bg-border/50", className)}
			{...props}
		/>
	);
}

function CommandItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(
				"group/command-item relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[selected=true]:*:[svg]:text-foreground",
				className,
			)}
			{...props}
		>
			{children}
			<CheckIcon className="ms-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
		</CommandPrimitive.Item>
	);
}

function CommandShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn(
				"ms-auto text-muted-foreground text-xs tracking-widest group-data-[selected=true]/command-item:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Command | `bg-popover text-popover-foreground rounded-xl! p-1 flex size-full flex-col overflow-hidden` | `flex size-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground` |
| CommandDialog | `sr-only`<br>`rounded-xl! top-1/3 translate-y-0 overflow-hidden p-0` | `sr-only`<br>`top-4 translate-y-0 overflow-hidden rounded-2xl p-0 transition-none sm:max-w-xl md:top-1/3 md:-translate-y-1/3` |
| CommandInput | `p-1 pb-0`<br>`bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!`<br>`size-4 shrink-0 opacity-50`<br>`w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50` | `rounded-t-xl border-border border-b p-1 pb-1.5`<br>`rounded-xl hover:not-focus-within:brightness-100 dark:hover:not-focus-within:brightness-100`<br>`size-4`<br>`w-full text-sm outline-hidden placeholder:text-accent-foreground/80 disabled:cursor-not-allowed disabled:opacity-50` |
| CommandList | `no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto` | `no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overflow-x-hidden outline-none` |
| CommandEmpty | `py-6 text-center text-sm` | `py-6 text-center text-sm` |
| CommandGroup | `text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium` | `overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs` |
| CommandSeparator | `bg-border -mx-1 h-px` | `my-1 h-px bg-border/50` |
| CommandItem | `ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100`<br>`data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! [&_svg:not([class*='size-'])]:size-4 group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `ms-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100`<br>`group/command-item relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[selected=true]:*:[svg]:text-foreground` |
| CommandShortcut | `text-muted-foreground group-data-selected/command-item:text-foreground ml-auto text-xs tracking-widest` | `ms-auto text-muted-foreground text-xs tracking-widest group-data-[selected=true]/command-item:text-foreground` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `CommandDialog`: new prop `overlayVariant = "opaque"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `command`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
