# Tabs

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/tabs.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/tabs.tsx` and `bases/radix/ui/tabs.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/tabs · HeroUI equivalent: tabs

## Primitive (Base UI import used by herocn)

```ts
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"
```

## Exports

herocn: `Tabs`, `TabsContent`, `TabsIndicator`, `TabsList`, `TabsTrigger`, `tabsListVariants`

- Extra vs stock base: `TabsIndicator`
- Missing vs stock base: none
- Extra vs stock radix: `TabsIndicator`
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cn";

function Tabs({
	className,
	orientation = "horizontal",
	...props
}: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				"group/tabs flex gap-2 data-[orientation=vertical]:flex-row data-[orientation=horizontal]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	"group/tabs-list relative isolate inline-flex items-center justify-center",
	{
		variants: {
			variant: {
				default: [
					"bg-default p-1",
					"rounded-[calc(var(--radius-2xl)+0.25rem)]",
					"group-data-[orientation=horizontal]/tabs:w-full group-data-[orientation=horizontal]/tabs:flex-row",
					"group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:gap-1",
				],
				line: [
					"rounded-none bg-transparent p-0",
					"group-data-[orientation=horizontal]/tabs:flex-row group-data-[orientation=horizontal]/tabs:overflow-x-auto group-data-[orientation=horizontal]/tabs:border-border group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=horizontal]/tabs:[scrollbar-width:none]",
					"group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:border-border group-data-[orientation=vertical]/tabs:border-s",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function TabsList({
	className,
	variant = "default",
	activateOnFocus = true,
	children,
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			activateOnFocus={activateOnFocus}
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		>
			{children}
			<TabsIndicator />
		</TabsPrimitive.List>
	);
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				// Base
				"relative z-1 flex h-8 w-full cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap px-4 text-center font-medium text-muted-foreground text-sm outline-none",
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				"transition-[color,box-shadow] duration-150 ease-out motion-reduce:transition-none",
				// Default variant: pill shape + vertical min-width
				"group-data-[variant=default]/tabs-list:rounded-3xl",
				"group-data-[variant=default]/tabs-list:group-data-[orientation=vertical]/tabs:min-w-20",
				// Line variant: no rounding
				"group-data-[variant=line]/tabs-list:rounded-none",
				// Selected state
				"data-active:text-segment-foreground",
				// Hover
				"hover:text-foreground/80 data-active:hover:text-segment-foreground",
				// Disabled
				"disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
				// Focus visible
				"focus-visible:focus-ring",
				className,
			)}
			{...props}
		/>
	);
}

function TabsIndicator({ className, ...props }: TabsPrimitive.Indicator.Props) {
	return (
		<TabsPrimitive.Indicator
			data-slot="tabs-indicator"
			className={cn(
				// Base positioning – tracks the active tab via CSS variables
				"absolute top-0 left-0 -z-1",
				"translate-x-(--active-tab-left) translate-y-(--active-tab-top)",
				"h-(--active-tab-height) w-(--active-tab-width)",
				"transition-[translate,width,height] duration-200 ease-out motion-reduce:transition-none",
				// Default variant: animated pill
				"group-data-[variant=default]/tabs-list:rounded-3xl",
				"group-data-[variant=default]/tabs-list:bg-segment",
				"group-data-[variant=default]/tabs-list:shadow-sm",
				// Line variant: flat, accent coloured, no shadow
				"group-data-[variant=line]/tabs-list:rounded-none",
				"group-data-[variant=line]/tabs-list:bg-ring",
				// Line + horizontal: collapse to a bottom 2px rule
				"group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:top-auto",
				"group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:bottom-0",
				"group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:translate-y-0",
				"group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:h-0.5",
				// Line + vertical: collapse to a start-side 2px rule
				"group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:translate-x-0",
				"group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:w-0.5",
				"group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:start-0",
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn(
				"w-full flex-1 p-2 outline-none",
				"group-data-[orientation=horizontal]/tabs:mt-4",
				"group-data-[orientation=vertical]/tabs:ms-4",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
	tabsListVariants,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Tabs | `gap-2 group/tabs flex data-horizontal:flex-col` | `group/tabs flex gap-2 data-[orientation=vertical]:flex-row data-[orientation=horizontal]:flex-col` |
| tabsListVariants · base | `rounded-lg p-[3px] group-data-horizontal/tabs:h-8 data-[variant=line]:rounded-none group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col` | `group/tabs-list relative isolate inline-flex items-center justify-center` |
| tabsListVariants · variant=default | `bg-muted` | `bg-default p-1 rounded-[calc(var(--radius-2xl)+0.25rem)] group-data-[orientation=horizontal]/tabs:w-full group-data-[orientation=horizontal]/tabs:flex-row group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:gap-1` |
| tabsListVariants · variant=line | `gap-1 bg-transparent` | `rounded-none bg-transparent p-0 group-data-[orientation=horizontal]/tabs:flex-row group-data-[orientation=horizontal]/tabs:overflow-x-auto group-data-[orientation=horizontal]/tabs:border-border group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=horizontal]/tabs:[scrollbar-width:none] group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:border-border group-data-[orientation=vertical]/tabs:border-s` |
| TabsTrigger | `gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0`<br>`group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent`<br>`data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground`<br>`after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100` | `relative z-1 flex h-8 w-full cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap px-4 text-center font-medium text-muted-foreground text-sm outline-none`<br>`[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`<br>`transition-[color,box-shadow] duration-150 ease-out motion-reduce:transition-none`<br>`group-data-[variant=default]/tabs-list:rounded-3xl`<br>`group-data-[variant=default]/tabs-list:group-data-[orientation=vertical]/tabs:min-w-20`<br>`group-data-[variant=line]/tabs-list:rounded-none`<br>`data-active:text-segment-foreground`<br>`hover:text-foreground/80 data-active:hover:text-segment-foreground`<br>`disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50`<br>`focus-visible:focus-ring` |
| TabsIndicator | *(part not in stock)* | `absolute top-0 left-0 -z-1`<br>`translate-x-(--active-tab-left) translate-y-(--active-tab-top)`<br>`h-(--active-tab-height) w-(--active-tab-width)`<br>`transition-[translate,width,height] duration-200 ease-out motion-reduce:transition-none`<br>`group-data-[variant=default]/tabs-list:rounded-3xl`<br>`group-data-[variant=default]/tabs-list:bg-segment`<br>`group-data-[variant=default]/tabs-list:shadow-sm`<br>`group-data-[variant=line]/tabs-list:rounded-none`<br>`group-data-[variant=line]/tabs-list:bg-ring`<br>`group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:top-auto`<br>`group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:bottom-0`<br>`group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:translate-y-0`<br>`group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:h-0.5`<br>`group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:translate-x-0`<br>`group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:w-0.5`<br>`group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs:start-0` |
| TabsContent | `text-sm flex-1 outline-none` | `w-full flex-1 p-2 outline-none`<br>`group-data-[orientation=horizontal]/tabs:mt-4`<br>`group-data-[orientation=vertical]/tabs:ms-4` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `aria-disabled`
- Only in stock radix: none

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| Tabs Indicator (`--active-tab-left/top/width/height`) | NOT AVAILABLE (Radix Tabs has no Indicator part). Don't add `TabsIndicator`. Put the indicator look on the active trigger instead: `group-data-[variant=default]/tabs-list:data-active:bg-segment group-data-[variant=default]/tabs-list:data-active:shadow-sm`, and for the line variant an `after:` underline using `bg-ring` (`after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ring after:opacity-0 group-data-[variant=line]/tabs-list:data-active:after:opacity-100`). |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `TabsList`: new prop `activateOnFocus = true`, *safe additive (review)*: new optional prop with default.
- `TabsList`: new prop `children`, **review**: new prop without a default in the destructure (check the type is optional).
- `TabsIndicator`: **new function/sub-component** (not in stock base). Props: `className`. *Safe additive (review)* as long as nothing in the app imports a stock-only name.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `tabs`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**Behaviour changes (NOT safe, don't copy by default):**
- `TabsList` default `activateOnFocus = true` (Base UI's default is `false`: arrow keys move focus without switching tabs). This changes keyboard behaviour, so leave it out unless the user opts in.
- `TabsList` renders `<TabsIndicator />` after `children`, and `TabsIndicator` is a new export using Base UI `Tabs.Indicator` (`--active-tab-*` vars). On **Base UI** projects this is *safe additive (review)* (new export, the indicator is purely visual, existing call sites are unchanged), and it's needed for the sliding pill. On **Radix** it's NOT AVAILABLE.

**Radix projects (no Indicator):** put the pill on the active trigger: add `group-data-[variant=default]/tabs-list:data-active:bg-segment group-data-[variant=default]/tabs-list:data-active:shadow-sm` and `after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ring after:opacity-0 group-data-[variant=line]/tabs-list:data-active:after:opacity-100` to the trigger (values from herocn's TabsIndicator: `bg-segment`, `shadow-sm`, `rounded-3xl` via the trigger, `bg-ring`, `h-0.5`, `bottom-0`). The motion of the sliding indicator is lost (static highlight). The shadcn `data-active` variant matches Radix `data-state="active"`.

**HeroUI v3.2.7 reference:** list container `bg-default p-1 rounded-[calc(var(--radius)*2.5)]` (20px), tab `h-8 px-4 rounded-3xl text-sm font-medium`, selected `text-segment-foreground`, indicator `bg-segment shadow-surface rounded-3xl`, transition 250ms `var(--ease-out-fluid)`, hover `opacity-70`; variant `secondary` = underline. Differences: herocn-diff X1–X4.
