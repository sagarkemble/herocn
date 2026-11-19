# Combobox

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/combobox.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/combobox.tsx` and `bases/radix/ui/combobox.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/combobox · HeroUI equivalent: combo-box / autocomplete

## Primitive (Base UI import used by herocn)

```ts
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { cn } from "cn"
```

## Exports

herocn: `Combobox`, `ComboboxChip`, `ComboboxChips`, `ComboboxChipsInput`, `ComboboxCollection`, `ComboboxContent`, `ComboboxEmpty`, `ComboboxGroup`, `ComboboxInput`, `ComboboxItem`, `ComboboxLabel`, `ComboboxList`, `ComboboxSeparator`, `ComboboxTrigger`, `ComboboxValue`, `useComboboxAnchor`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "cn";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/registry/new-york-v4/ui/input-group";

const ComboboxVariantContext = React.createContext<"default" | "secondary">(
	"default",
);

function Combobox<
	Value = string,
	Multiple extends boolean | undefined = false,
>({
	variant = "default",
	...props
}: ComboboxPrimitive.Root.Props<Value, Multiple> & {
	variant?: "default" | "secondary";
}) {
	return (
		<ComboboxVariantContext.Provider value={variant}>
			<ComboboxPrimitive.Root<Value, Multiple>
				data-slot="combobox"
				data-variant={variant}
				{...props}
			/>
		</ComboboxVariantContext.Provider>
	);
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
	return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
	className,
	children,
	...props
}: ComboboxPrimitive.Trigger.Props) {
	return (
		<ComboboxPrimitive.Trigger
			data-slot="combobox-trigger"
			className={cn(
				"group/combobox-trigger [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground transition duration-150 group-data-popup-open/combobox-trigger:rotate-180" />
		</ComboboxPrimitive.Trigger>
	);
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
	return (
		<ComboboxPrimitive.Clear
			data-slot="combobox-clear"
			render={<InputGroupButton variant="ghost" size="icon-xs" />}
			className={cn(className)}
			{...props}
		>
			<XIcon className="pointer-events-none size-4 text-muted-foreground" />
		</ComboboxPrimitive.Clear>
	);
}

function ComboboxInput({
	className,
	children,
	disabled = false,
	showTrigger = true,
	showClear = false,
	variant: variantProp,
	...props
}: ComboboxPrimitive.Input.Props & {
	showTrigger?: boolean;
	showClear?: boolean;
	variant?: "default" | "secondary";
}) {
	const contextVariant = React.useContext(ComboboxVariantContext);
	const variant = variantProp ?? contextVariant;
	return (
		<InputGroup
			variant={variant}
			className={cn(
				"in-data-[slot=combobox-content]:m-2! w-auto rounded-xl",
				variant === "default" ? "shadow" : "",
				className,
			)}
		>
			<ComboboxPrimitive.Input
				render={<InputGroupInput disabled={disabled} />}
				{...props}
			/>
			<InputGroupAddon align="inline-end">
				{showTrigger && (
					<InputGroupButton
						size="icon-xs"
						variant="ghost"
						render={<ComboboxTrigger />}
						data-slot="input-group-button"
						className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
						disabled={disabled}
					/>
				)}
				{showClear && <ComboboxClear disabled={disabled} />}
			</InputGroupAddon>
			{children}
		</InputGroup>
	);
}

function ComboboxContent({
	className,
	side = "bottom",
	sideOffset = 6,
	align = "start",
	alignOffset = 0,
	anchor,
	...props
}: ComboboxPrimitive.Popup.Props &
	Pick<
		ComboboxPrimitive.Positioner.Props,
		"side" | "align" | "sideOffset" | "alignOffset" | "anchor"
	>) {
	return (
		<ComboboxPrimitive.Portal>
			<ComboboxPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				anchor={anchor}
				className="isolate z-50"
			>
				<ComboboxPrimitive.Popup
					data-slot="combobox-content"
					data-chips={!!anchor}
					className={cn(
						"group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-(--anchor-width) min-w-[calc(var(--anchor-width)+--spacing(7))] max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 data-[chips=true]:min-w-(--anchor-width) data-closed:animate-out data-open:animate-in *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-9 *:data-[slot=input-group]:border-none *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none",
						className,
					)}
					{...props}
				/>
			</ComboboxPrimitive.Positioner>
		</ComboboxPrimitive.Portal>
	);
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
	return (
		<ComboboxPrimitive.List
			data-slot="combobox-list"
			className={cn(
				"max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
				className,
			)}
			{...props}
		/>
	);
}

function ComboboxItem({
	className,
	children,
	...props
}: ComboboxPrimitive.Item.Props) {
	return (
		<ComboboxPrimitive.Item
			data-slot="combobox-item"
			className={cn(
				"data-highlighted:focus-ring relative flex w-full cursor-default select-none items-center gap-2.5 rounded-2xl py-2 ps-3 pe-8 text-sm outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<ComboboxPrimitive.ItemIndicator
				render={
					<span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center" />
				}
			>
				<CheckIcon className="pointer-events-none" />
			</ComboboxPrimitive.ItemIndicator>
		</ComboboxPrimitive.Item>
	);
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
	return (
		<ComboboxPrimitive.Group
			data-slot="combobox-group"
			className={cn(className)}
			{...props}
		/>
	);
}

function ComboboxLabel({
	className,
	...props
}: ComboboxPrimitive.GroupLabel.Props) {
	return (
		<ComboboxPrimitive.GroupLabel
			data-slot="combobox-label"
			className={cn("px-3.5 py-2.5 text-muted-foreground text-xs", className)}
			{...props}
		/>
	);
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
	return (
		<ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
	);
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
	return (
		<ComboboxPrimitive.Empty
			data-slot="combobox-empty"
			className={cn(
				"hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex",
				className,
			)}
			{...props}
		/>
	);
}

function ComboboxSeparator({
	className,
	...props
}: ComboboxPrimitive.Separator.Props) {
	return (
		<ComboboxPrimitive.Separator
			data-slot="combobox-separator"
			className={cn("-mx-1 my-1 h-px bg-border/50", className)}
			{...props}
		/>
	);
}

function ComboboxChips({
	className,
	...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
	ComboboxPrimitive.Chips.Props) {
	const variant = React.useContext(ComboboxVariantContext);
	return (
		<ComboboxPrimitive.Chips
			data-slot="combobox-chips"
			data-variant={variant}
			className={cn(
				"flex min-h-9 flex-wrap items-center gap-1.5 rounded-xl border border-input bg-input bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground md:px-3 md:py-2",
				"dark:brightness-100",
				"hover:not-focus-within:brightness-97 dark:hover:not-focus-within:brightness-110",
				"focus-within:focus-field-ring",
				"has-aria-invalid:invalid-field-ring has-aria-invalid:focus-within:invalid-field-ring-focus",
				"has-data-[slot=combobox-chip]:px-1.5",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				variant === "secondary" &&
					"bg-default shadow-none not-dark:brightness-100 not-dark:hover:not-focus-within:brightness-96",
				className,
			)}
			{...props}
		/>
	);
}

function ComboboxChip({
	className,
	children,
	showRemove = true,
	...props
}: ComboboxPrimitive.Chip.Props & {
	showRemove?: boolean;
}) {
	return (
		<ComboboxPrimitive.Chip
			data-slot="combobox-chip"
			className={cn(
				"flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 whitespace-nowrap rounded-4xl bg-muted-foreground/10 px-2 font-medium text-foreground text-xs has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-data-[slot=combobox-chip-remove]:pe-0 has-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			{showRemove && (
				<ComboboxPrimitive.ChipRemove
					render={<Button variant="ghost" size="icon-xs" />}
					className="-ms-1 size-5 opacity-50 hover:opacity-100"
					data-slot="combobox-chip-remove"
				>
					<XIcon className="pointer-events-none" />
				</ComboboxPrimitive.ChipRemove>
			)}
		</ComboboxPrimitive.Chip>
	);
}

function ComboboxChipsInput({
	className,
	...props
}: ComboboxPrimitive.Input.Props) {
	return (
		<ComboboxPrimitive.Input
			data-slot="combobox-chip-input"
			className={cn("min-w-16 flex-1 outline-none", className)}
			{...props}
		/>
	);
}

function useComboboxAnchor() {
	return React.useRef<HTMLDivElement | null>(null);
}

export {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
	ComboboxValue,
	useComboboxAnchor,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| ComboboxTrigger | `text-muted-foreground size-4 pointer-events-none`<br>`[&_svg:not([class*='size-'])]:size-4` | `pointer-events-none size-4 text-muted-foreground transition duration-150 group-data-popup-open/combobox-trigger:rotate-180`<br>`group/combobox-trigger [&_svg:not([class*='size-'])]:size-4` |
| ComboboxClear | `pointer-events-none` | `pointer-events-none size-4 text-muted-foreground` |
| ComboboxInput | `group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent`<br>`w-auto` | `group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent`<br>`in-data-[slot=combobox-content]:m-2! w-auto rounded-xl`<br>`shadow` |
| ComboboxContent | `isolate z-50`<br>`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 max-h-72 min-w-36 overflow-hidden rounded-lg shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground! group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width)` | `isolate z-50`<br>`group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-(--anchor-width) min-w-[calc(var(--anchor-width)+--spacing(7))] max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 data-[chips=true]:min-w-(--anchor-width) data-closed:animate-out data-open:animate-in *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-9 *:data-[slot=input-group]:border-none *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none` |
| ComboboxList | `no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0 overflow-y-auto overscroll-contain` | `max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0` |
| ComboboxItem | `pointer-events-none absolute right-2 flex size-4 items-center justify-center`<br>`pointer-events-none`<br>`data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none absolute end-2 flex size-4 items-center justify-center`<br>`pointer-events-none`<br>`data-highlighted:focus-ring relative flex w-full cursor-default select-none items-center gap-2.5 rounded-2xl py-2 ps-3 pe-8 text-sm outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0` |
| ComboboxLabel | `text-muted-foreground px-2 py-1.5 text-xs` | `px-3.5 py-2.5 text-muted-foreground text-xs` |
| ComboboxEmpty | `text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex` | `hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex` |
| ComboboxSeparator | `bg-border -mx-1 my-1 h-px` | `-mx-1 my-1 h-px bg-border/50` |
| ComboboxChips | `dark:bg-input/30 border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive dark:has-aria-invalid:border-destructive/50 flex min-h-8 flex-wrap items-center gap-1 rounded-lg border bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:ring-3 has-aria-invalid:ring-3 has-data-[slot=combobox-chip]:px-1` | `flex min-h-9 flex-wrap items-center gap-1.5 rounded-xl border border-input bg-input bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground md:px-3 md:py-2`<br>`dark:brightness-100`<br>`hover:not-focus-within:brightness-97 dark:hover:not-focus-within:brightness-110`<br>`focus-within:focus-field-ring`<br>`has-aria-invalid:invalid-field-ring has-aria-invalid:focus-within:invalid-field-ring-focus`<br>`has-data-[slot=combobox-chip]:px-1.5`<br>`disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`<br>`[variant === "secondary"] bg-default shadow-none not-dark:brightness-100 not-dark:hover:not-focus-within:brightness-96` |
| ComboboxChip | `-ml-1 opacity-50 hover:opacity-100`<br>`pointer-events-none`<br>`bg-muted text-foreground flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50` | `-ms-1 size-5 opacity-50 hover:opacity-100`<br>`pointer-events-none`<br>`flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 whitespace-nowrap rounded-4xl bg-muted-foreground/10 px-2 font-medium text-foreground text-xs has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-data-[slot=combobox-chip-remove]:pe-0 has-disabled:opacity-50` |
| ComboboxChipsInput | `min-w-16 flex-1 outline-none` | `min-w-16 flex-1 outline-none` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-popup-open` (trigger while popup open) | `data-open:` (Radix triggers get `data-state="open"`; shadcn's `data-open` variant matches it). `group-data-popup-open/x:` → `group-data-open/x:`. |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |
| `--available-height` | `--radix-<primitive>-content-available-height`. |
| `--available-width` | `--radix-<primitive>-content-available-width`. |
| `--anchor-width` | `--radix-<primitive>-trigger-width` (e.g. `--radix-select-trigger-width`, `--radix-popover-trigger-width`). |
| `data-pressed` (Toggle) | Radix Toggle: `data-[state=on]:`. |
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Combobox`: **new function/sub-component** (not in stock base). Props: `variant = "default"`. *Safe additive (review)* as long as nothing in the app imports a stock-only name.
- `ComboboxInput`: new prop `variant: variantProp`, **review**: new prop without a default in the destructure (check the type is optional).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `combo-box / autocomplete`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
