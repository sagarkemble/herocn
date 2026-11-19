# Drawer

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/drawer.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/drawer.tsx` and `bases/radix/ui/drawer.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/drawer · HeroUI equivalent: drawer

## Primitive (Base UI import used by herocn)

```ts
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Drawer as DrawerPrimitive } from "vaul"
```

## Exports

herocn: `Drawer`, `DrawerClose`, `DrawerContent`, `DrawerDescription`, `DrawerFooter`, `DrawerHeader`, `DrawerOverlay`, `DrawerPortal`, `DrawerSwipeHandle`, `DrawerTitle`, `DrawerTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: `DrawerSwipeHandle`
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "cn";
import * as React from "react";

type DrawerContextProps = {
	hasSnapPoints: boolean;
	modal: DrawerPrimitive.Root.Props["modal"];
	showSwipeHandle: boolean;
	swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>;
};

const DrawerContext = React.createContext<DrawerContextProps | null>(null);

function useDrawer() {
	const context = React.useContext(DrawerContext);

	if (!context) {
		throw new Error("useDrawer must be used within a Drawer.");
	}

	return context;
}

function Drawer({
	modal = true,
	showSwipeHandle = false,
	snapPoints,
	swipeDirection = "down",
	...props
}: DrawerPrimitive.Root.Props & {
	showSwipeHandle?: boolean;
}) {
	const hasSnapPoints = snapPoints != null && snapPoints.length > 0;
	const contextValue = React.useMemo(
		() => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
		[hasSnapPoints, modal, showSwipeHandle, swipeDirection],
	);

	return (
		<DrawerContext.Provider value={contextValue}>
			<DrawerPrimitive.Root
				data-slot="drawer"
				modal={modal}
				snapPoints={snapPoints}
				swipeDirection={swipeDirection}
				{...props}
			/>
		</DrawerContext.Provider>
	);
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
	className,
	variant = "opaque",
	...props
}: DrawerPrimitive.Backdrop.Props & {
	variant?: "opaque" | "blur" | "transparent";
}) {
	return (
		<DrawerPrimitive.Backdrop
			data-slot="drawer-overlay"
			data-variant={variant}
			className={cn(
				"fixed inset-0 z-50 min-h-dvh select-none bg-black/80 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:pointer-events-none data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/80 data-[variant=transparent]:bg-transparent data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute data-snap-points:[--drawer-overlay-min-opacity:0.5]",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerSwipeHandle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-swipe-handle"
			aria-hidden="true"
			className={cn(
				"relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 after:block after:shrink-0 after:rounded-full after:bg-muted active:cursor-grabbing group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-direction=up]/drawer-popup:items-start group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:after:h-25 group-data-[swipe-axis=y]/drawer-popup:after:h-1.5 group-data-[swipe-axis=x]/drawer-popup:after:w-1.5 group-data-[swipe-axis=y]/drawer-popup:after:w-[100px]",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerContent({
	className,
	children,
	overlayVariant = "opaque",
	...props
}: DrawerPrimitive.Popup.Props & {
	overlayVariant?: "opaque" | "blur" | "transparent";
}) {
	const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer();
	const swipeAxis =
		swipeDirection === "down" || swipeDirection === "up" ? "y" : "x";

	return (
		<DrawerPortal data-slot="drawer-portal">
			{modal === true && (
				<DrawerOverlay
					variant={overlayVariant}
					data-snap-points={hasSnapPoints ? "" : undefined}
				/>
			)}
			<DrawerPrimitive.Viewport
				data-slot="drawer-viewport"
				data-modal={modal}
				className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
			>
				<DrawerPrimitive.Popup
					data-slot="drawer-popup"
					data-swipe-axis={swipeAxis}
					data-snap-points={hasSnapPoints ? "" : undefined}
					className={cn(
						// Base.
						"group/drawer-popup transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) select-none flex-col border border-popover bg-popover text-popover-foreground text-sm outline-none transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [--drawer-bleed-background:transparent] [--drawer-inset:0px] [interpolate-size:allow-keywords] dark:border-border",
						// Nested.
						"data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95",
						// Bleed.
						"after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=x]:after:inset-y-0 data-[swipe-direction=right]:after:start-full data-[swipe-direction=left]:after:end-full data-[swipe-direction=down]:after:top-full data-[swipe-direction=up]:after:bottom-full data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-axis=x]:after:w-(--bleed)",
						// Sizing.
						"[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:80vh] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]",
						// Stack.
						"[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]",
						// Transitions.
						"data-ending-style:transform-(--closed-transform) data-starting-style:transform-(--closed-transform) data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-swiping:duration-0",
						// Axis: y.
						"data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height) data-[swipe-axis=y]:inset-x-0",
						// Axis: x.
						"data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row",
						// Direction: down.
						"data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]",
						// Direction: up.
						"data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]",
						// Direction: left.
						"data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]",
						// Direction: right.
						"data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]",
						className,
					)}
					{...props}
				>
					{showSwipeHandle && <DrawerSwipeHandle />}
					<DrawerPrimitive.Content
						data-slot="drawer-content"
						className={cn(
							"flex min-h-0 flex-1 select-text flex-col gap-2 overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-swiping/drawer-popup:select-none group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100",
						)}
					>
						{children}
					</DrawerPrimitive.Content>
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Viewport>
		</DrawerPortal>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cn(
				"flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-1.5 md:text-start",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn("flex shrink-0 flex-row-reverse gap-2 p-4 pt-0", className)}
			{...props}
		/>
	);
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn("font-medium text-base text-foreground", className)}
			{...props}
		/>
	);
}

function DrawerDescription({
	className,
	...props
}: DrawerPrimitive.Description.Props) {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("text-balance text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerSwipeHandle,
	DrawerTitle,
	DrawerTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| DrawerOverlay | `bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50 min-h-dvh opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute` | `fixed inset-0 z-50 min-h-dvh select-none bg-black/80 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:pointer-events-none data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/80 data-[variant=transparent]:bg-transparent data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute data-snap-points:[--drawer-overlay-min-opacity:0.5]` |
| DrawerSwipeHandle | `after:block after:shrink-0 after:rounded-full after:bg-muted group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-24 group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=up]/drawer-popup:items-start group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=x]/drawer-popup:after:h-24 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:order-last active:cursor-grabbing` | `relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 after:block after:shrink-0 after:rounded-full after:bg-muted active:cursor-grabbing group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-direction=up]/drawer-popup:items-start group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:after:h-25 group-data-[swipe-axis=y]/drawer-popup:after:h-1.5 group-data-[swipe-axis=x]/drawer-popup:after:w-1.5 group-data-[swipe-axis=y]/drawer-popup:after:w-[100px]` |
| DrawerContent | `pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto`<br>`bg-popover text-popover-foreground text-sm data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[swipe-direction=left]:rounded-r-xl data-[swipe-direction=left]:border-r data-[swipe-direction=right]:rounded-l-xl data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b group/drawer-popup pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] flex-col transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none select-none [interpolate-size:allow-keywords]`<br>`data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95`<br>`after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=x]:after:w-(--bleed) data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-direction=down]:after:top-full data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:after:left-full data-[swipe-direction=up]:after:bottom-full`<br>`[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]`<br>`[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]`<br>`data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]`<br>`data-[swipe-axis=y]:inset-x-0 data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height)`<br>`data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row`<br>`data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]`<br>`data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]`<br>`data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]`<br>`data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]`<br>`flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none` | `pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto`<br>`group/drawer-popup transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) select-none flex-col border border-popover bg-popover text-popover-foreground text-sm outline-none transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [--drawer-bleed-background:transparent] [--drawer-inset:0px] [interpolate-size:allow-keywords] dark:border-border`<br>`data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95`<br>`after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=x]:after:inset-y-0 data-[swipe-direction=right]:after:start-full data-[swipe-direction=left]:after:end-full data-[swipe-direction=down]:after:top-full data-[swipe-direction=up]:after:bottom-full data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-axis=x]:after:w-(--bleed)`<br>`[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:80vh] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]`<br>`[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]`<br>`data-ending-style:transform-(--closed-transform) data-starting-style:transform-(--closed-transform) data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-swiping:duration-0`<br>`data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height) data-[swipe-axis=y]:inset-x-0`<br>`data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row`<br>`data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]`<br>`data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]`<br>`data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]`<br>`data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]`<br>`flex min-h-0 flex-1 select-text flex-col gap-2 overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-swiping/drawer-popup:select-none group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100` |
| DrawerHeader | `gap-0.5 p-4 pb-0 md:gap-0.5 md:text-left flex shrink-0 flex-col group-data-[swipe-axis=y]/drawer-popup:text-center` | `flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-1.5 md:text-start` |
| DrawerFooter | `gap-2 p-4 pt-0 mt-auto flex shrink-0 flex-col` | `flex shrink-0 flex-row-reverse gap-2 p-4 pt-0` |
| DrawerTitle | `text-foreground text-base font-medium` | `font-medium text-base text-foreground` |
| DrawerDescription | `text-muted-foreground text-sm text-balance` | `text-balance text-muted-foreground text-sm` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--bleed`, `--closed-transform`, `--color-popover`, `--drawer-bleed-background`, `--drawer-content-height`, `--drawer-content-max-height`, `--drawer-content-width`, `--drawer-frontmost-height`, `--drawer-height`, `--drawer-inset`, `--drawer-overlay-min-opacity`, `--drawer-snap-point-offset`, `--drawer-swipe-movement-x`, `--drawer-swipe-movement-y`, `--drawer-swipe-progress`, `--drawer-swipe-strength`, `--nested-drawers`, `--peek`, `--stack-height`, `--stack-peek-offset`, `--stack-progress`, `--stack-scale`, `--stack-scale-base`, `--stack-shrink`, `--stack-step`, `--translate-x`, `--translate-y`, `data-[modal=true]`, `data-[swipe-axis=x]`, `data-[swipe-axis=y]`, `data-[swipe-direction=down]`, `data-[swipe-direction=left]`, `data-[swipe-direction=right]`, `data-[swipe-direction=up]`, `data-ending-style`, `data-nested-drawer-open`, `data-nested-drawer-swiping`, `data-snap-points`, `data-starting-style`, `data-swiping`, `group-data-[swipe-axis=x]`, `group-data-[swipe-axis=y]`, `group-data-[swipe-direction=down]`, `group-data-[swipe-direction=left]`, `group-data-[swipe-direction=right]`, `group-data-[swipe-direction=up]`
- Only in stock radix: `data-[vaul-drawer-direction=bottom]`, `data-[vaul-drawer-direction=left]`, `data-[vaul-drawer-direction=right]`, `data-[vaul-drawer-direction=top]`, `data-closed`, `data-open`, `group-data-[vaul-drawer-direction=bottom]`, `group-data-[vaul-drawer-direction=top]`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| Base UI Drawer vars (`--drawer-*`, nested drawers, swipe) | NOT AVAILABLE. Stock Radix drawer uses `vaul`. Keep vaul and apply only the static look classes (radius, bg, padding, handle). |
| Base UI Toast stacking/swipe vars | NOT AVAILABLE. Stock Radix uses `sonner` (no `toast.tsx`). Restyle sonner via its `toastOptions.classNames` with herocn surface/radius classes. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `DrawerOverlay`: new prop `variant = "opaque"`, *safe additive (review)*: new optional prop with default.
- `DrawerContent`: new prop `overlayVariant = "opaque"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `drawer`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
