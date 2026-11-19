# Attachment

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/attachment.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/attachment.tsx` and `bases/radix/ui/attachment.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/attachment · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Slot } from "radix-ui"
```

## Exports

herocn: `Attachment`, `AttachmentAction`, `AttachmentActions`, `AttachmentContent`, `AttachmentDescription`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentTitle`, `AttachmentTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

const attachmentVariants = cva(
	"group/attachment relative flex w-fit min-w-0 max-w-full shrink-0 flex-wrap rounded-2xl border bg-card text-card-foreground transition-[color,background-color,border-color,box-shadow] focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
	{
		variants: {
			size: {
				default:
					"gap-2.5 text-sm has-data-[slot=attachment-media]:p-2.5 has-data-[slot=attachment-content]:px-3 has-data-[slot=attachment-content]:py-2.5",
				sm: "gap-3 text-xs has-data-[slot=attachment-media]:p-2 has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2",
				xs: "gap-2 rounded-xl text-xs has-data-[slot=attachment-media]:p-1.5 has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5",
			},
			orientation: {
				horizontal: "min-w-40 items-center",
				vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
			},
		},
	},
);

function Attachment({
	className,
	state = "done",
	size = "default",
	orientation = "horizontal",
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof attachmentVariants> & {
		state?: "idle" | "uploading" | "processing" | "error" | "done";
	}) {
	return (
		<div
			data-slot="attachment"
			data-state={state}
			data-size={size}
			data-orientation={orientation}
			className={cn(attachmentVariants({ size, orientation }), className)}
			{...props}
		/>
	);
}

const attachmentMediaVariants = cva(
	"relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-lg group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				icon: "",
				image:
					"opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
			},
		},
		defaultVariants: {
			variant: "icon",
		},
	},
);

function AttachmentMedia({
	className,
	variant = "icon",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
	return (
		<div
			data-slot="attachment-media"
			data-variant={variant}
			className={cn(attachmentMediaVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AttachmentContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="attachment-content"
			className={cn(
				"min-w-0 max-w-full flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1.5",
				className,
			)}
			{...props}
		/>
	);
}

function AttachmentTitle({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="attachment-title"
			className={cn(
				"group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block min-w-0 max-w-full truncate font-medium",
				className,
			)}
			{...props}
		/>
	);
}

function AttachmentDescription({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="attachment-description"
			className={cn(
				"mt-1 block min-w-0 truncate text-muted-foreground text-xs group-data-[state=error]/attachment:text-destructive/80",
				"max-w-full",
				className,
			)}
			{...props}
		/>
	);
}

function AttachmentActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="attachment-actions"
			className={cn(
				"relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:end-3.5 group-data-[orientation=vertical]/attachment:top-3.5 group-data-[orientation=vertical]/attachment:gap-1.5",
				className,
			)}
			{...props}
		/>
	);
}

function AttachmentAction({
	className,
	variant,
	size = "icon-xs",
	...props
}: React.ComponentProps<typeof Button>) {
	return (
		<Button
			data-slot="attachment-action"
			variant={variant ?? "ghost"}
			size={size}
			className={cn(className)}
			{...props}
		/>
	);
}

function AttachmentTrigger({
	className,
	render,
	type,
	...props
}: useRender.ComponentProps<"button">) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				type: render ? type : (type ?? "button"),
				className: cn("absolute inset-0 z-10 outline-none", className),
			},
			props,
		),
		render,
		state: {
			slot: "attachment-trigger",
		},
	});
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="attachment-group"
			className={cn(
				"scroll-fade-x scrollbar-none flex min-w-0 snap-x snap-mandatory scroll-px-1.5 gap-4 overflow-x-auto overscroll-x-contain py-1.5 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentGroup,
	AttachmentMedia,
	AttachmentTitle,
	AttachmentTrigger,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| attachmentVariants · base | `rounded-xl w-fit focus-within:ring-1 focus-within:ring-ring/50 group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed` | `group/attachment relative flex w-fit min-w-0 max-w-full shrink-0 flex-wrap rounded-2xl border bg-card text-card-foreground transition-[color,background-color,border-color,box-shadow] focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed` |
| attachmentVariants · size=default | `gap-2 has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2 text-sm` | `gap-2.5 text-sm has-data-[slot=attachment-media]:p-2.5 has-data-[slot=attachment-content]:px-3 has-data-[slot=attachment-content]:py-2.5` |
| attachmentVariants · size=sm | `gap-2.5 has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5 text-xs` | `gap-3 text-xs has-data-[slot=attachment-media]:p-2 has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2` |
| attachmentVariants · size=xs | `gap-1.5 has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1 text-xs rounded-lg` | `gap-2 rounded-xl text-xs has-data-[slot=attachment-media]:p-1.5 has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5` |
| attachmentVariants · orientation=horizontal | `min-w-40 items-center` | `min-w-40 items-center` |
| attachmentVariants · orientation=vertical | `w-24 has-data-[slot=attachment-content]:w-30 flex-col` | `w-24 flex-col has-data-[slot=attachment-content]:w-30` |
| attachmentMediaVariants · base | `bg-muted text-foreground w-10 rounded-lg group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md [&_svg:not([class*='size-'])]:size-4 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5 group-data-[orientation=vertical]/attachment:w-full group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none` | `relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-lg group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none` |
| attachmentMediaVariants · variant=icon | *(empty)* | *(empty)* |
| attachmentMediaVariants · variant=image | `opacity-60 group-data-[state=idle]/attachment:opacity-100 group-data-[state=done]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover` | `opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover` |
| AttachmentContent | `leading-tight group-data-[orientation=vertical]/attachment:px-1 max-w-full min-w-0 flex-1` | `min-w-0 max-w-full flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1.5` |
| AttachmentTitle | `font-medium block max-w-full min-w-0 truncate group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer` | `group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block min-w-0 max-w-full truncate font-medium` |
| AttachmentDescription | `mt-0.5 text-xs block min-w-0 truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80`<br>`max-w-full` | `mt-1 block min-w-0 truncate text-muted-foreground text-xs group-data-[state=error]/attachment:text-destructive/80`<br>`max-w-full` |
| AttachmentActions | `group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 relative z-20 group-data-[orientation=vertical]/attachment:gap-1 flex shrink-0 items-center` | `relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:end-3.5 group-data-[orientation=vertical]/attachment:top-3.5 group-data-[orientation=vertical]/attachment:gap-1.5` |
| AttachmentTrigger | `absolute inset-0 z-10 outline-none absolute inset-0 z-10 outline-none` | `absolute inset-0 z-10 outline-none` |
| AttachmentGroup | `gap-3 scroll-px-1 py-1 flex min-w-0 scroll-fade-x snap-x snap-mandatory scrollbar-none overflow-x-auto overscroll-x-contain *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start` | `scroll-fade-x scrollbar-none flex min-w-0 snap-x snap-mandatory scroll-px-1.5 gap-4 overflow-x-auto overscroll-x-contain py-1.5 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `attachment`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
