# NavigationMenu

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/navigation-menu.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/navigation-menu.tsx` and `bases/radix/ui/navigation-menu.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/navigation-menu · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
```

## Exports

herocn: `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuIndicator`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuList`, `NavigationMenuPositioner`, `NavigationMenuTrigger`, `navigationMenuTriggerStyle`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: `NavigationMenuPositioner`
- Missing vs stock radix: `NavigationMenuViewport`

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

function NavigationMenu({
	align = "start",
	className,
	children,
	...props
}: NavigationMenuPrimitive.Root.Props &
	Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(
				"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuPositioner align={align} />
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-0",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
			{...props}
		/>
	);
}

const navigationMenuTriggerStyle = cva(
	"group/navigation-menu-trigger focus-visible:focus-ring inline-flex h-8 w-max items-center justify-center rounded-2xl px-3.5 font-medium text-sm outline-none transition-[box-shadow,opacity] hover:bg-muted disabled:pointer-events-none disabled:opacity-50 data-open:bg-muted/50 data-popup-open:bg-muted/50 data-open:hover:bg-muted data-popup-open:hover:bg-muted",
);

function NavigationMenuTrigger({
	className,
	children,
	...props
}: NavigationMenuPrimitive.Trigger.Props) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "group", className)}
			{...props}
		>
			{children}{" "}
			<ChevronDownIcon
				className="relative top-px ms-1 size-3 transition duration-200 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: NavigationMenuPrimitive.Content.Props) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 isolate z-50 h-full w-auto p-2 transition-[opacity,transform,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow-2xl group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/5 group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-open:animate-in rtl:data-ending-style:data-activation-direction=left:-translate-x-[50%] rtl:data-ending-style:data-activation-direction=right:-translate-x-[-50%] rtl:data-starting-style:data-activation-direction=left:-translate-x-[-50%] rtl:data-starting-style:data-activation-direction=right:-translate-x-[50%]",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuPositioner({
	className,
	side = "bottom",
	sideOffset = 8,
	align = "start",
	alignOffset = 0,
	...props
}: NavigationMenuPrimitive.Positioner.Props) {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				className={cn(
					"isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:before:start-0 data-[side=bottom]:before:end-0 data-[side=bottom]:before:top-[-10px]",
					className,
				)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup className="data-[ending-style]:easing-[ease] relative h-(--popup-height) w-(--popup-width) xs:w-(--popup-width) origin-(--transform-origin) rounded-2xl bg-popover text-popover-foreground shadow outline-none ring-1 ring-foreground/5 transition-[opacity,transform,width,height,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-90 data-starting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-200">
					<NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	);
}

function NavigationMenuLink({
	className,
	...props
}: NavigationMenuPrimitive.Link.Props) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"focus-visible:focus-ring flex items-center gap-1.5 in-data-[slot=navigation-menu-content]:rounded-lg rounded-2xl px-3 py-2 text-sm outline-none transition-[box-shadow] hover:bg-muted data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
	return (
		<NavigationMenuPrimitive.Icon
			data-slot="navigation-menu-indicator"
			className={cn(
				"data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in",
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-ss-sm bg-border shadow-md" />
		</NavigationMenuPrimitive.Icon>
	);
}

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuPositioner,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| NavigationMenu | `max-w-max group/navigation-menu relative flex max-w-max flex-1 items-center justify-center` | `group/navigation-menu relative flex max-w-max flex-1 items-center justify-center` |
| NavigationMenuList | `gap-0 group flex flex-1 list-none items-center justify-center` | `group flex flex-1 list-none items-center justify-center gap-0` |
| NavigationMenuItem | `relative` | `relative` |
| navigationMenuTriggerStyle · base | `hover:bg-muted focus:bg-muted data-open:hover:bg-muted data-open:focus:bg-muted data-open:bg-muted/50 focus-visible:ring-ring/50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all focus-visible:ring-3 focus-visible:outline-1 disabled:opacity-50 group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none` | `group/navigation-menu-trigger focus-visible:focus-ring inline-flex h-8 w-max items-center justify-center rounded-2xl px-3.5 font-medium text-sm outline-none transition-[box-shadow,opacity] hover:bg-muted disabled:pointer-events-none disabled:opacity-50 data-open:bg-muted/50 data-popup-open:bg-muted/50 data-open:hover:bg-muted data-popup-open:hover:bg-muted` |
| NavigationMenuTrigger | `relative top-px ml-1 size-3 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180`<br>`group` | `relative top-px ms-1 size-3 transition duration-200 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180`<br>`group` |
| NavigationMenuContent | `data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:ring-foreground/10 p-1 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:duration-300 data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] h-full w-auto transition-[opacity,transform,translate] duration-[0.35s] data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none` | `data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 isolate z-50 h-full w-auto p-2 transition-[opacity,transform,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow-2xl group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/5 group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-open:animate-in rtl:data-ending-style:data-activation-direction=left:-translate-x-[50%] rtl:data-ending-style:data-activation-direction=right:-translate-x-[-50%] rtl:data-starting-style:data-activation-direction=left:-translate-x-[-50%] rtl:data-starting-style:data-activation-direction=right:-translate-x-[50%]` |
| NavigationMenuPositioner | `bg-popover text-popover-foreground ring-foreground/10 rounded-lg shadow ring-1 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-90 data-starting-style:opacity-0 data-[ending-style]:easing-[ease] xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]`<br>`relative size-full overflow-hidden`<br>`transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] data-instant:transition-none` | `data-[ending-style]:easing-[ease] relative h-(--popup-height) w-(--popup-width) xs:w-(--popup-width) origin-(--transform-origin) rounded-2xl bg-popover text-popover-foreground shadow outline-none ring-1 ring-foreground/5 transition-[opacity,transform,width,height,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-90 data-starting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-200`<br>`relative size-full overflow-hidden`<br>`isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:before:start-0 data-[side=bottom]:before:end-0 data-[side=bottom]:before:top-[-10px]` |
| NavigationMenuLink | `data-active:focus:bg-muted data-active:hover:bg-muted data-active:bg-muted/50 focus-visible:ring-ring/50 hover:bg-muted focus:bg-muted flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none focus-visible:ring-3 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md [&_svg:not([class*='size-'])]:size-4` | `focus-visible:focus-ring flex items-center gap-1.5 in-data-[slot=navigation-menu-content]:rounded-lg rounded-2xl px-3 py-2 text-sm outline-none transition-[box-shadow] hover:bg-muted data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted [&_svg:not([class*='size-'])]:size-4` |
| NavigationMenuIndicator | `bg-border rounded-tl-sm shadow-md relative top-[60%] h-2 w-2 rotate-45`<br>`data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden` | `relative top-[60%] h-2 w-2 rotate-45 rounded-ss-sm bg-border shadow-md`<br>`data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--available-width`, `--popup-height`, `--popup-width`, `--positioner-height`, `--positioner-width`, `--transform-origin`, `data-[ending-style]`, `data-[side=bottom]`, `data-ending-style`, `data-instant`, `data-starting-style`
- Only in stock radix: `--radix-navigation-menu-viewport-height`, `--radix-navigation-menu-viewport-width`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `data-popup-open` (trigger while popup open) | `data-open:` (Radix triggers get `data-state="open"`; shadcn's `data-open` variant matches it). `group-data-popup-open/x:` → `group-data-open/x:`. |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |
| `--available-width` | `--radix-<primitive>-content-available-width`. |
| `data-[instant=…]` | Radix Tooltip: `data-[state=instant-open]:transition-none` / `animate-none`. |
| `data-activation-direction` | NOT AVAILABLE in Radix. Drop. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `navigation-menu`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
