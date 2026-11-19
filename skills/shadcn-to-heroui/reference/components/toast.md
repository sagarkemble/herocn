# Toast

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/toast.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/toast.tsx` and `bases/radix/ui/toast.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/toast · HeroUI equivalent: toast

## Primitive (Base UI import used by herocn)

```ts
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { cn } from "cn"
```

## Exports

herocn: `Toast`, `ToastAction`, `ToastClose`, `ToastContent`, `ToastDescription`, `ToastPortal`, `ToastProvider`, `ToastTitle`, `ToastViewport`, `Toaster`, `createToastManager`, `toast`, `useToastManager`

- Extra vs stock base: none
- Missing vs stock base: none
- Stock radix: NOT FOUND (no stock radix component)

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "cn";
import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
	XIcon,
} from "lucide-react";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

const toast = ToastPrimitive.createToastManager();

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
	return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
	return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
	return (
		<ToastPrimitive.Viewport
			data-slot="toast-viewport"
			className={cn(
				"pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:start-auto sm:end-4 sm:mx-0 sm:w-full",
				className,
			)}
			{...props}
		/>
	);
}

function getToastRootClasses() {
	return cn(
		"group/toast pointer-events-auto absolute inset-inline-0 z-[calc(1000-var(--toast-index))] flex w-full origin-bottom select-none flex-row items-start justify-start gap-1.5 rounded-3xl bg-surface px-4 py-3 text-foreground shadow-xl outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		"[--gap:var(--toast-gap,8px)] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc((var(--toast-dir)*(var(--toast-offset-y)+var(--toast-index)*var(--gap)))+var(--toast-swipe-movement-y))] [--peek:0.5rem] [--scale:calc(max(0,1-(var(--toast-index)*var(--toast-scale-factor,0.05))))] [--shrink:calc(1-var(--scale))]",
		"bottom-0 origin-bottom [--toast-dir:-1] after:top-full",
		"transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-dir)*(var(--toast-index)*var(--peek)+(var(--shrink)*var(--height))))))_scale(var(--scale))] h-(--height) [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms,box-shadow_150ms]",
		"after:absolute after:start-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
		"data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-expanded:h-(--toast-height)",
		"data-starting-style:transform-[translateY(calc(var(--toast-dir)*-150%))] data-limited:pointer-events-none data-limited:opacity-0",
		"[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(calc(var(--toast-dir)*-150%))]",
		"data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
		"data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
		"data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
		"data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
		"data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
		"data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
		"data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
		"data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
		"**:data-[slot=toast-title]:text-foreground",
		"[&[data-type=success]_[data-slot=toast-title]]:text-success-soft-foreground",
		"[&[data-type=info]_[data-slot=toast-title]]:text-primary-soft-foreground",
		"[&[data-type=warning]_[data-slot=toast-title]]:text-warning-soft-foreground",
		"[&[data-type=error]_[data-slot=toast-title]]:text-destructive-soft-foreground",
	);
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
	return (
		<ToastPrimitive.Root
			data-slot="toast"
			className={cn(getToastRootClasses(), className)}
			{...props}
		/>
	);
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
	return (
		<ToastPrimitive.Content
			data-slot="toast-content"
			className={cn(
				"flex h-full min-w-0 grow items-center gap-3 overflow-hidden transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
				className,
			)}
			{...props}
		/>
	);
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
	return (
		<ToastPrimitive.Title
			data-slot="toast-title"
			className={cn("font-medium text-sm", className)}
			{...props}
		/>
	);
}

function ToastDescription({
	className,
	...props
}: ToastPrimitive.Description.Props) {
	return (
		<ToastPrimitive.Description
			data-slot="toast-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function ToastAction({
	className,
	render = <Button variant="tertiary" size="sm" />,
	...props
}: ToastPrimitive.Action.Props) {
	return (
		<ToastPrimitive.Action
			data-slot="toast-action"
			render={render}
			className={cn("shrink-0", className)}
			{...props}
		/>
	);
}

function ToastClose({
	className,
	children,
	...props
}: ToastPrimitive.Close.Props) {
	return (
		<ToastPrimitive.Close
			data-slot="toast-close"
			aria-label="Close toast"
			render={<Button variant="tertiary" size="icon-xs" />}
			className={cn(
				"pointer-events-none absolute -end-1 -top-1 z-10 size-5 border border-border bg-surface opacity-0 transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/toast:pointer-events-auto group-hover/toast:opacity-100 group-focus-visible/toast:pointer-events-auto group-focus-visible/toast:opacity-100",
				className,
			)}
			{...props}
		>
			{children ?? <XIcon className="size-3" aria-hidden="true" />}
		</ToastPrimitive.Close>
	);
}

function ToastIcon({ type }: { type: string | undefined }) {
	let icon: React.ReactNode = null;

	if (type === "success") {
		icon = <CircleCheckIcon aria-hidden="true" />;
	}

	if (type === "info") {
		icon = <InfoIcon aria-hidden="true" />;
	}

	if (type === "warning") {
		icon = <TriangleAlertIcon aria-hidden="true" />;
	}

	if (type === "error") {
		icon = <OctagonXIcon className="text-destructive" aria-hidden="true" />;
	}

	if (type === "loading") {
		icon = <Loader2Icon className="animate-spin" aria-hidden="true" />;
	}

	if (!icon) {
		return null;
	}

	return (
		<span
			data-type={type}
			data-slot="toast-icon"
			className={cn(
				"flex shrink-0 items-center justify-center p-0.5 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				"data-[type=success]:text-success-soft-foreground",
				"data-[type=warning]:text-warning-soft-foreground",
				"data-[type=error]:text-destructive-soft-foreground",
				"data-[type=info]:text-primary-soft-foreground",
			)}
		>
			{icon}
		</span>
	);
}

function ToastList() {
	const { toasts } = ToastPrimitive.useToastManager();

	return toasts.map((toastItem) => (
		<Toast key={toastItem.id} toast={toastItem}>
			<ToastContent>
				<ToastIcon type={toastItem.type} />
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<ToastTitle />
					<ToastDescription />
					<ToastAction className="mt-2 self-start sm:hidden" />
				</div>
				<ToastClose />
			</ToastContent>
			<ToastAction className="hidden sm:flex" />
		</Toast>
	));
}

function Toaster({
	children,
	toastManager = toast,
	...props
}: ToastPrimitive.Provider.Props) {
	return (
		<ToastProvider toastManager={toastManager} {...props}>
			{children}
			<ToastPortal>
				<ToastViewport>
					<ToastList />
				</ToastViewport>
			</ToastPortal>
		</ToastProvider>
	);
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
	createToastManager,
	Toast,
	ToastAction,
	ToastClose,
	ToastContent,
	ToastDescription,
	Toaster,
	ToastPortal,
	ToastProvider,
	ToastTitle,
	ToastViewport,
	toast,
	useToastManager,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| ToastViewport | `pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full` | `pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:start-auto sm:end-4 sm:mx-0 sm:w-full` |
| getToastRootClasses | *(part not in stock)* | `group/toast pointer-events-auto absolute inset-inline-0 z-[calc(1000-var(--toast-index))] flex w-full origin-bottom select-none flex-row items-start justify-start gap-1.5 rounded-3xl bg-surface px-4 py-3 text-foreground shadow-xl outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`<br>`[--gap:var(--toast-gap,8px)] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc((var(--toast-dir)*(var(--toast-offset-y)+var(--toast-index)*var(--gap)))+var(--toast-swipe-movement-y))] [--peek:0.5rem] [--scale:calc(max(0,1-(var(--toast-index)*var(--toast-scale-factor,0.05))))] [--shrink:calc(1-var(--scale))]`<br>`bottom-0 origin-bottom [--toast-dir:-1] after:top-full`<br>`transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-dir)*(var(--toast-index)*var(--peek)+(var(--shrink)*var(--height))))))_scale(var(--scale))] h-(--height) [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms,box-shadow_150ms]`<br>`after:absolute after:start-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']`<br>`data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-expanded:h-(--toast-height)`<br>`data-starting-style:transform-[translateY(calc(var(--toast-dir)*-150%))] data-limited:pointer-events-none data-limited:opacity-0`<br>`[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(calc(var(--toast-dir)*-150%))]`<br>`data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]`<br>`data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]`<br>`data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]`<br>`data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]`<br>`**:data-[slot=toast-title]:text-foreground`<br>`[&[data-type=success]_[data-slot=toast-title]]:text-success-soft-foreground`<br>`[&[data-type=info]_[data-slot=toast-title]]:text-primary-soft-foreground`<br>`[&[data-type=warning]_[data-slot=toast-title]]:text-warning-soft-foreground`<br>`[&[data-type=error]_[data-slot=toast-title]]:text-destructive-soft-foreground` |
| ToastContent | `flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100` | `flex h-full min-w-0 grow items-center gap-3 overflow-hidden transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100` |
| ToastTitle | `text-sm font-medium` | `font-medium text-sm` |
| ToastDescription | `text-sm text-muted-foreground` | `text-muted-foreground text-sm` |
| ToastAction | `shrink-0` | `shrink-0` |
| ToastClose | `relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground` | `size-3`<br>`pointer-events-none absolute -end-1 -top-1 z-10 size-5 border border-border bg-surface opacity-0 transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/toast:pointer-events-auto group-hover/toast:opacity-100 group-focus-visible/toast:pointer-events-auto group-focus-visible/toast:opacity-100` |
| ToastIcon | `text-destructive`<br>`animate-spin`<br>`shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4` | `text-destructive`<br>`animate-spin`<br>`flex shrink-0 items-center justify-center p-0.5 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none`<br>`data-[type=success]:text-success-soft-foreground`<br>`data-[type=warning]:text-warning-soft-foreground`<br>`data-[type=error]:text-destructive-soft-foreground`<br>`data-[type=info]:text-primary-soft-foreground` |
| ToastList | `flex min-w-0 flex-1 flex-col gap-1` | `flex min-w-0 flex-1 flex-col gap-1`<br>`mt-2 self-start sm:hidden`<br>`hidden sm:flex` |
| Toast | `rounded-2xl group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom border bg-popover text-popover-foreground shadow-lg will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`<br>`[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]`<br>`h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]`<br>`after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']`<br>`data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]`<br>`data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]`<br>`[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]`<br>`data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]`<br>`data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]`<br>`data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]`<br>`data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]`<br>`data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]` | *(part not in herocn)* |

## Radix notes

Stock radix: NOT FOUND (no `bases/radix/ui/toast.tsx`). Stock Radix projects use `sonner` instead.

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `data-expanded` | Radix uses `data-state="open"` → `data-open:`. |
| Base UI Toast stacking/swipe vars | NOT AVAILABLE. Stock Radix uses `sonner` (no `toast.tsx`). Restyle sonner via its `toastOptions.classNames` with herocn surface/radius classes. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `ToastAction`: prop changed `render = <Button variant="outline" size="sm" />` → `render = <Button variant="tertiary" size="sm" />`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `ToastClose`: stock prop `render = <Button variant="ghost" size="icon-sm" />` is **not destructured in herocn** (forwarded via `...props` or dropped). **Review**; keep the stock prop.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `toast`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
