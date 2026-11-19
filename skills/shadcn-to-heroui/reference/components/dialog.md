# Dialog

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/dialog.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/dialog.tsx` and `bases/radix/ui/dialog.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/dialog · HeroUI equivalent: modal

## Primitive (Base UI import used by herocn)

```ts
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Dialog as DialogPrimitive } from "radix-ui"
```

## Exports

herocn: `Dialog`, `DialogClose`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	variant = "opaque",
	...props
}: DialogPrimitive.Backdrop.Props & {
	variant?: "opaque" | "blur" | "transparent";
}) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
			data-variant={variant}
			className={cn(
				"fixed inset-0 isolate z-50 opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/50 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md data-ending-style:duration-100 dark:data-[variant=blur]:bg-black/60 dark:data-[variant=opaque]:bg-black/60",
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	overlayVariant = "opaque",
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean;
	overlayVariant?: "opaque" | "blur" | "transparent";
}) {
	return (
		<DialogPortal>
			<DialogOverlay variant={overlayVariant} />
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				className={cn(
					"fixed start-1/2 top-[calc(50%-0.75rem*var(--nested-dialogs,0))] z-50 flex w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.04*var(--nested-dialogs,0))] flex-col gap-5 rounded-3xl bg-popover p-6 text-popover-foreground text-sm outline-none ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-black/5 after:opacity-0 data-starting-style:translate-y-[calc(-50%+0.25rem)] data-ending-style:scale-[calc(0.95-0.04*var(--nested-dialogs,0))] data-starting-style:scale-[calc(1.05-0.04*var(--nested-dialogs,0))] data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-100 data-nested-dialog-open:after:opacity-100 sm:max-w-md rtl:translate-x-1/2 dark:after:bg-white/10",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={
							<Button
								variant="tertiary"
								className="absolute end-4 top-4"
								size="icon-xs"
							/>
						}
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-3", className)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("flex flex-row items-center justify-end gap-2", className)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close
					data-slot="close-button"
					render={<Button variant="outline" />}
				>
					Close
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("font-medium text-base leading-none", className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(
				"text-muted-foreground text-sm leading-[1.43] *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| DialogOverlay | `data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50` | `fixed inset-0 isolate z-50 opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-[variant=blur]:bg-black/50 data-[variant=opaque]:bg-black/50 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[variant=blur]:backdrop-blur-md data-ending-style:duration-100 dark:data-[variant=blur]:bg-black/60 dark:data-[variant=opaque]:bg-black/60` |
| DialogContent | `absolute top-2 right-2`<br>`sr-only`<br>`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 sm:max-w-sm fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none` | `absolute end-4 top-4`<br>`sr-only`<br>`fixed start-1/2 top-[calc(50%-0.75rem*var(--nested-dialogs,0))] z-50 flex w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.04*var(--nested-dialogs,0))] flex-col gap-5 rounded-3xl bg-popover p-6 text-popover-foreground text-sm outline-none ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-black/5 after:opacity-0 data-starting-style:translate-y-[calc(-50%+0.25rem)] data-ending-style:scale-[calc(0.95-0.04*var(--nested-dialogs,0))] data-starting-style:scale-[calc(1.05-0.04*var(--nested-dialogs,0))] data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-100 data-nested-dialog-open:after:opacity-100 sm:max-w-md rtl:translate-x-1/2 dark:after:bg-white/10` |
| DialogHeader | `gap-2 flex flex-col` | `flex flex-col gap-3` |
| DialogFooter | `bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` | `flex flex-row items-center justify-end gap-2` |
| DialogTitle | `text-base leading-none font-medium` | `font-medium text-base leading-none` |
| DialogDescription | `text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3` | `text-muted-foreground text-sm leading-[1.43] *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| nested dialog stacking (`data-nested-dialog-open`, `--nested-dialogs`) | NOT AVAILABLE in Radix. Drop these classes (the centred position without the nested offset remains). |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `DialogOverlay`: new prop `variant = "opaque"`, *safe additive (review)*: new optional prop with default.
- `DialogContent`: new prop `overlayVariant = "opaque"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `modal`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.

## Hand-review notes

**Decisions**
- **Dialog stays centred** at every breakpoint (herocn behaviour). HeroUI's `placement="auto"` bottom-sheet-on-mobile isn't reproduced.
- **Footer Close button follows herocn:** `DialogFooter` `showCloseButton` renders `<DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>`, the same variant as stock. Only the classes around it change (`flex flex-row items-center justify-end gap-2`; the stock `bg-muted/50 -mx-4 -mb-4 border-t` strip is removed). Verified against herocn source: the built-in close renders **after** `children` as an outline "Close" button, in both herocn and stock. The `[Cancel][Save changes]` footer on herocn's docs page is **demo content** (`examples/dialog-demo.tsx`: `<DialogFooter><DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose><Button type="submit">Save changes</Button></DialogFooter>`, no `showCloseButton`). It's app code, so the skill doesn't reorder or restyle app footers to match it. A user who wants that look writes it at the call site.
- **X close button:** herocn uses `<Button variant="tertiary" size="icon-xs" className="absolute end-4 top-4" />` (stock: `variant="ghost" size="icon-sm"`, `absolute top-2 right-2`). Changing the variant/size of the Button the component renders is a **class-level change** (no public prop changes), so it's applied. It needs the `tertiary` variant and `icon-xs` size in `button.tsx` (both added by the Button conversion).
- `variant` on `DialogOverlay` and `overlayVariant` on `DialogContent` (`opaque | blur | transparent`, default `opaque`) are *safe additive (review)*: optional with defaults, nothing existing changes.

**Radix projects:** herocn animates with transitions on `data-starting-style` / `data-ending-style`. Radix needs keyframes (Presence waits for animations):
- Overlay: `fixed inset-0 isolate z-50 bg-black/50 dark:bg-black/60 data-open:animate-in data-open:fade-in-0 data-open:duration-150 data-closed:animate-out data-closed:fade-out-0 data-closed:duration-100 ease-[cubic-bezier(0.22,1,0.36,1)]`
- Content: replace herocn's `transition-[opacity,scale,translate] duration-250 … data-starting-style:* data-ending-style:*` with `ease-[cubic-bezier(0.22,1,0.36,1)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-105 data-open:slide-in-from-bottom-1 data-open:duration-250 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:duration-100`
- Use `top-1/2` (no `--nested-dialogs`), and drop the `data-nested-dialog-open:*` classes.

**HeroUI v3.2.7 reference:** `.modal__dialog` = `bg-overlay shadow-overlay p-6 rounded-[min(32px,var(--radius-3xl))]`, sizes xs/sm/md/lg = `max-w-xs/sm/md/lg`; header `flex flex-col gap-3`; header→body `mt-2`, body→footer `mt-5`; footer `flex flex-row items-center justify-end gap-2`; close trigger `absolute end-4 top-4` using `.close-button` (24px, `rounded-xl`, `bg-default text-muted`, pressed `scale(0.93)`); backdrop `bg-black/50` (dark 60%), blur variant `backdrop-blur-md`. Enter/exit keyframes are in `reference/heroui-motion.md`. Differences: herocn-diff D1–D8.
