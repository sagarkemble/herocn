# Select

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/select.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/select.tsx` and `bases/radix/ui/select.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/select · HeroUI equivalent: select / list-box / list-box-item

## Primitive (Base UI import used by herocn)

```ts
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Select as SelectPrimitive } from "radix-ui"
```

## Exports

herocn: `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectScrollDownButton`, `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`, `SelectValue`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "cn";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as React from "react";

const SelectVariantContext = React.createContext<"default" | "secondary">(
	"default",
);

function Select<Value = string, Multiple extends boolean | undefined = false>({
	variant = "default",
	...props
}: SelectPrimitive.Root.Props<Value, Multiple> & {
	variant?: "default" | "secondary";
}) {
	return (
		<SelectVariantContext.Provider value={variant}>
			<SelectPrimitive.Root<Value, Multiple>
				data-slot="select"
				data-variant={variant}
				{...props}
			/>
		</SelectVariantContext.Provider>
	);
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn("scroll-my-1 p-1", className)}
			{...props}
		/>
	);
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={cn("flex flex-1 flex-wrap text-wrap text-start", className)}
			{...props}
		/>
	);
}

function SelectTrigger({
	className,
	children,
	...props
}: SelectPrimitive.Trigger.Props) {
	const variant = React.useContext(SelectVariantContext);
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cn(
				"focus-visible:focus-ring aria-invalid:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus group/button relative isolate inline-flex min-h-9 w-fit shrink-0 origin-center cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-surface px-3 py-2 font-medium text-foreground text-sm shadow-xs outline-none brightness-100 transition-all hover:not-data-popup-open:brightness-96 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-data-[icon=inline-start]:ps-3 has-data-[icon=inline-end]:pe-3 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70 dark:hover:not-data-popup-open:brightness-110 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				variant === "secondary" &&
					"bg-default shadow-none hover:bg-default/90 active:bg-default/90",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon
				render={
					<ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground transition-transform duration-200 data-popup-open:rotate-180" />
				}
			/>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	side = "bottom",
	sideOffset = 8,
	align = "center",
	alignOffset = 0,
	alignItemWithTrigger = false,
	...props
}: SelectPrimitive.Popup.Props &
	Pick<
		SelectPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
	>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				alignItemWithTrigger={alignItemWithTrigger}
				className="isolate z-50"
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					data-align-trigger={alignItemWithTrigger}
					className={cn(
						"relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-3xl border-input bg-popover p-1 text-popover-foreground drop-shadow-xl transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.95] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[align-trigger=true]:transition-none data-ending-style:duration-100",
						className,
					)}
					{...props}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List>{children}</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={cn(
				"px-3 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-7",
				className,
			)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"focus-visible:focus-ring relative flex w-full cursor-default select-none items-center gap-2.5 rounded-3xl py-2 ps-3 pe-8 text-sm outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground not-data-[variant=destructive]:hover:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator
				render={
					<span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center" />
				}
			>
				<CheckIcon className="pointer-events-none" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn(
				"pointer-events-none -mx-1 my-1 h-px bg-border/50",
				className,
			)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-button"
			className={cn(
				"top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<ChevronUpIcon />
		</SelectPrimitive.ScrollUpArrow>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-button"
			className={cn(
				"bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<ChevronDownIcon />
		</SelectPrimitive.ScrollDownArrow>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| SelectGroup | `scroll-my-1 p-1` | `scroll-my-1 p-1` |
| SelectValue | `flex flex-1 text-left` | `flex flex-1 flex-wrap text-wrap text-start` |
| SelectTrigger | `text-muted-foreground size-4 pointer-events-none`<br>`border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0` | `pointer-events-none size-4 text-muted-foreground transition-transform duration-200 data-popup-open:rotate-180`<br>`focus-visible:focus-ring aria-invalid:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus group/button relative isolate inline-flex min-h-9 w-fit shrink-0 origin-center cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-surface px-3 py-2 font-medium text-foreground text-sm shadow-xs outline-none brightness-100 transition-all hover:not-data-popup-open:brightness-96 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-data-[icon=inline-start]:ps-3 has-data-[icon=inline-end]:pe-3 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70 dark:hover:not-data-popup-open:brightness-110 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`<br>`[variant === "secondary"] bg-default shadow-none hover:bg-default/90 active:bg-default/90` |
| SelectContent | `isolate z-50`<br>`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-lg shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground! relative isolate z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none` | `isolate z-50`<br>`relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-3xl border-input bg-popover p-1 text-popover-foreground drop-shadow-xl transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1 data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-ending-style:scale-[0.95] data-starting-style:scale-[0.95] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[align-trigger=true]:transition-none data-ending-style:duration-100` |
| SelectLabel | `text-muted-foreground px-1.5 py-1 text-xs` | `px-3 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-7` |
| SelectItem | `flex flex-1 gap-2 shrink-0 whitespace-nowrap`<br>`pointer-events-none absolute right-2 flex size-4 items-center justify-center`<br>`pointer-events-none`<br>`focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0` | `flex flex-1 shrink-0 gap-2 whitespace-nowrap`<br>`pointer-events-none absolute end-2 flex size-4 items-center justify-center`<br>`pointer-events-none`<br>`focus-visible:focus-ring relative flex w-full cursor-default select-none items-center gap-2.5 rounded-3xl py-2 ps-3 pe-8 text-sm outline-hidden transition-[box-shadow] hover:bg-accent hover:text-accent-foreground not-data-[variant=destructive]:hover:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2` |
| SelectSeparator | `bg-border -mx-1 my-1 h-px pointer-events-none` | `pointer-events-none -mx-1 my-1 h-px bg-border/50` |
| SelectScrollUpButton | `bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 top-0 w-full` | `top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4` |
| SelectScrollDownButton | `bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 bottom-0 w-full` | `bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--anchor-width`, `--available-height`, `--transform-origin`, `data-[side=inline-end]`, `data-[side=inline-start]`
- Only in stock radix: `--radix-select-content-available-height`, `--radix-select-content-transform-origin`, `--radix-select-trigger-height`, `--radix-select-trigger-width`, `data-[position=popper]`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `data-popup-open` (trigger while popup open) | `data-open:` (Radix triggers get `data-state="open"`; shadcn's `data-open` variant matches it). `group-data-popup-open/x:` → `group-data-open/x:`. |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |
| `--available-height` | `--radix-<primitive>-content-available-height`. |
| `--anchor-width` | `--radix-<primitive>-trigger-width` (e.g. `--radix-select-trigger-width`, `--radix-popover-trigger-width`). |
| `data-[align-trigger=true]` | Stock radix `select.tsx` sets this attribute itself (`data-align-trigger={position === "item-aligned"}`), so keep it as-is. |
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Select`: **new function/sub-component** (not in stock base). Props: `variant = "default"`. *Safe additive (review)* as long as nothing in the app imports a stock-only name.
- `SelectTrigger`: stock prop `size = "default"` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.
- `SelectContent`: prop changed `sideOffset = 4` → `sideOffset = 8`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `SelectContent`: prop changed `alignItemWithTrigger = true` → `alignItemWithTrigger = false`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `select / list-box / list-box-item`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**Behaviour changes (NOT safe, don't copy):** herocn's `SelectContent` changes defaults `sideOffset` 4 → 8 and `alignItemWithTrigger` true → false (the popup opens below the trigger instead of over the selected item). Keep the user's defaults. The visual classes still apply. If the user wants the HeroUI "drop below" behaviour, they can pass `alignItemWithTrigger={false} sideOffset={8}` at call sites (opt-in).

**`variant` via context:** herocn wraps `Select` in a function that provides `SelectVariantContext` (`"default" | "secondary"`) so `SelectTrigger` can read it. Adding this wrapper is *safe additive (review)*, but it changes `Select` from `const Select = SelectPrimitive.Root` to a function component. Only add it if the user wants the secondary variant. Otherwise apply the default-variant trigger classes directly.
**Stock `size` prop on `SelectTrigger`** (`data-size` default/sm) isn't in herocn. Keep the prop. herocn's small trigger size is NOT FOUND, so keep the user's existing `data-[size=sm]:…` height rule unchanged and flag it in the report.

**Radix projects:** content uses `origin-(--radix-select-content-transform-origin)`, `max-h-(--radix-select-content-available-height)`, `min-w-(--radix-select-trigger-width)`. Use tw-animate enter/exit (`data-open:zoom-in-95 data-open:duration-150 data-closed:zoom-out-95 data-closed:duration-100`, side slide `*-1`). The trigger's `hover:not-data-popup-open:` becomes `hover:not-data-open:`, and the chevron's `data-popup-open:rotate-180` becomes `group-data-open/button:rotate-180` (herocn's trigger carries `group/button`; Radix `SelectIcon` has no open attribute, but the trigger has `data-state="open"`). Stock radix `SelectContent` defaults to `position = "item-aligned"` (and sets `data-align-trigger` itself). Keep the user's default. The side-slide classes only take effect with `position="popper"`.

**Item highlight on Radix (fix, class-only):** herocn's item uses `focus-visible:focus-ring` for the keyboard highlight and `hover:bg-accent` for the pointer highlight. In Base UI that split works. Radix moves DOM focus to items by script (on open and on pointer move), so `:focus-visible` inherits from whatever was focused before. If that element was keyboard-focused (e.g. an `autoFocus` button), the pointer-highlighted item shows the blue ring instead of herocn's grey highlight. On Radix, translate the item string:
- drop `focus-visible:focus-ring`
- `hover:bg-accent hover:text-accent-foreground not-data-[variant=destructive]:hover:**:text-accent-foreground` → `data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground`

Radix sets `data-highlighted` for both pointer and keyboard highlight. The trade-off: keyboard navigation on Radix shows herocn's grey hover highlight, not its focus ring.

**SelectValue on Radix (class-only):** stock radix `SelectValue` has no `className`; the stock trigger lays it out with `*:data-[slot=select-value]:…`, which herocn's trigger string replaces. Radix `Select.Value` **ignores `className` and `style`** (verified in `@radix-ui/react-select` source: both are destructured and dropped). So put herocn's `SelectValue` classes on the trigger as child selectors, the same mechanism stock uses: append `*:data-[slot=select-value]:flex *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:flex-wrap *:data-[slot=select-value]:text-wrap *:data-[slot=select-value]:text-start` to the `SelectTrigger` string. Without them, the value text is centred in a fixed-width trigger.

**Popup placement (flagged behaviour change, NOT applied by default):** herocn opens the popup **below** the trigger because it changes defaults (`alignItemWithTrigger = false`, `sideOffset = 8`). Stock (both libraries) opens item-aligned over the trigger. Changing this is a default change (hard rule 2), so the skill keeps the stock default and **flags it in the report as an opt-in**. If the user opts in, it's a one-line default change inside `components/ui/select.tsx` (no prop/type changes):
- Base UI: `SelectContent` → `sideOffset = 8`, `alignItemWithTrigger = false`
- Radix: `SelectContent` → `position = "popper"` and pass `sideOffset={8}` to `SelectPrimitive.Content` (default `sideOffset = 8` in the destructure). Then remove the stock popper-only `translate-*-1` offsets so the 8px offset isn't doubled. That last step is inferred from the stock file; verify visually.

Call sites that pass `position` / `alignItemWithTrigger` explicitly are unaffected.

**HeroUI v3.2.7 reference:** trigger `min-h-9 rounded-field bg-field px-3 py-2 text-sm shadow-field`, value `text-base sm:text-sm`, indicator `rotate-180 duration-150`; popover radius `min(32px, calc(var(--radius-2xl) + var(--spacing) * 1.5))` (22px), `--overlay-shadow`, enter `heroui-overlay-enter-95 150ms ease`; list-box-item `min-h-9 gap-3 rounded-2xl px-2 py-1.5`, hover `bg-default`, pressed `scale(0.98)`. Differences: herocn-diff S1–S8.
