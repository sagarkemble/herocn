# CodeBlock

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/code-block.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/code-block.tsx` and `bases/radix/ui/code-block.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/code-block · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
```

## Exports

herocn: `CodeBlock`, `CodeBlockActions`, `CodeBlockContent`, `CodeBlockCopyButton`, `CodeBlockFooter`, `CodeBlockHeader`, `CodeBlockLine`, `CodeBlockTitle`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

const codeBlockVariants = cva(
	"group/code-block has-[>[data-slot=code-block-content]:focus-visible]:focus-ring relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg bg-surface-secondary text-sm data-[size=sm]:rounded-md data-[size=sm]:text-xs",
	{
		variants: {
			variant: {
				default: "border border-surface-secondary text-foreground",
				destructive: "border border-destructive/70 text-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function CodeBlock({
	className,
	variant = "default",
	size = "default",
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof codeBlockVariants> & { size?: "default" | "sm" }) {
	return (
		<div
			data-slot="code-block"
			data-variant={variant}
			data-size={size}
			className={cn(codeBlockVariants({ variant }), className)}
			{...props}
		/>
	);
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="code-block-header"
			className={cn(
				"flex min-w-0 shrink-0 items-center gap-1 px-2 pt-2 text-muted-foreground *:has-[>[data-slot=code-block-title]]:min-w-0 group-data-[size=sm]/code-block:px-1.5 group-data-[size=sm]/code-block:pt-1.5 group-data-[variant=destructive]/code-block:text-destructive",
				className,
			)}
			{...props}
		/>
	);
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="code-block-title"
			className={cn(
				"min-w-0 truncate font-medium font-sans text-sm group-data-[size=sm]/code-block:text-xs group-data-[variant=destructive]/code-block:text-destructive [&_svg:not([class*='size-'])]:size-4 group-data-[size=sm]/code-block:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle *:[svg]:me-1",
				className,
			)}
			{...props}
		/>
	);
}

function CodeBlockActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="code-block-actions"
			className={cn(
				"-my-1 ms-auto -me-1 flex shrink-0 items-center gap-0.5 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:pointer-coarse:opacity-100 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-1.5 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-1.5 [[data-slot=code-block]>&]:*:[button]:bg-background [[data-slot=code-block]>&]:*:[button]:ring-1 [[data-slot=code-block]>&]:*:[button]:ring-foreground/10",
				className,
			)}
			{...props}
		/>
	);
}

function CodeBlockCopyButton({
	value,
	variant = "ghost",
	size = "icon-xs",
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button> & { value: string }) {
	const [copied, setCopied] = React.useState(false);

	React.useEffect(() => {
		if (!copied) {
			return;
		}

		const timeout = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(timeout);
	}, [copied]);

	return (
		<>
			<Button
				data-slot="code-block-copy-button"
				data-copied={copied || undefined}
				variant={variant}
				size={size}
				aria-label={copied ? "Copied" : "Copy"}
				className={cn(className)}
				onClick={(event) => {
					onClick?.(event);
					navigator.clipboard
						.writeText(value)
						.then(() => setCopied(true))
						.catch(() => {});
				}}
				{...props}
			>
				{copied ? <CheckIcon /> : <CopyIcon />}
			</Button>
			<span aria-live="polite" className="sr-only">
				{copied ? "Copied" : ""}
			</span>
		</>
	);
}

function CodeBlockContent({
	className,
	children,
	style,
	wrap = false,
	lineNumbers = false,
	startLine = 1,
	...props
}: React.ComponentProps<"pre"> & {
	wrap?: boolean;
	lineNumbers?: boolean;
	startLine?: number;
}) {
	return (
		<pre
			data-slot="code-block-content"
			data-wrap={wrap || undefined}
			data-numbered={lineNumbers || undefined}
			dir="ltr"
			tabIndex={0}
			style={{ counterReset: `line ${startLine - 1}`, ...style }}
			className={cn(
				"scroll-fade-x scrollbar-thin data-wrap:scroll-fade-y data-wrap:wrap-break-word min-h-0 min-w-0 overflow-auto p-2 text-start font-mono leading-relaxed outline-none group-has-data-[slot=code-block-header]/code-block:pt-1.5 group-has-data-[slot=code-block-footer]/code-block:pb-1.5 data-wrap:whitespace-pre-wrap group-data-[size=sm]/code-block:px-1.5 group-data-[size=sm]/code-block:py-1.5 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-footer]/code-block:pb-1",
				className,
			)}
			{...props}
		>
			<code
				data-slot="code-block-code"
				className="grid min-h-lh in-data-wrap:min-w-0 min-w-max in-data-numbered:grid-cols-[auto_1fr] content-start"
			>
				{lineNumbers && typeof children === "string"
					? children
							.replace(/\n$/, "")
							.split("\n")
							.map((line, index) => (
								<CodeBlockLine key={index}>{line}</CodeBlockLine>
							))
					: children}
			</code>
		</pre>
	);
}

const codeBlockLineVariants = cva(
	"relative in-data-numbered:col-span-2 -mx-2 block in-data-numbered:grid min-h-lh in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-2 px-2 in-data-numbered:[counter-increment:line] before:min-w-6 in-data-numbered:before:select-none before:text-end before:text-muted-foreground in-data-numbered:before:content-[counter(line)] after:absolute after:start-1 after:top-0 after:select-none after:text-muted-foreground group-data-[size=sm]/code-block:-mx-1.5 group-data-[size=sm]/code-block:px-1.5 in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
	{
		variants: {
			variant: {
				default: "",
				added: "bg-muted after:content-['+']",
				removed: "bg-destructive/20 after:text-destructive after:content-['−']",
				highlighted: "bg-muted",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function CodeBlockLine({
	className,
	variant = "default",
	children,
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof codeBlockLineVariants>) {
	// An empty line holds a newline so copying a selection keeps blank lines.
	const empty =
		children === undefined ||
		children === null ||
		children === "" ||
		(Array.isArray(children) && children.length === 0);

	return (
		<span
			data-slot="code-block-line"
			data-variant={variant}
			className={cn(codeBlockLineVariants({ variant }), className)}
			{...props}
		>
			<span data-slot="code-block-line-content" className="min-w-0">
				{empty ? "\n" : children}
			</span>
		</span>
	);
}

function CodeBlockFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="code-block-footer"
			className={cn(
				"flex min-w-0 shrink-0 items-center gap-1 px-2 pb-1 text-muted-foreground group-data-[size=sm]/code-block:px-1.5 group-data-[size=sm]/code-block:pb-0.5",
				className,
			)}
			{...props}
		/>
	);
}

export {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFooter,
	CodeBlockHeader,
	CodeBlockLine,
	CodeBlockTitle,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| codeBlockVariants · base | `rounded-lg text-sm data-[size=sm]:text-xs has-[>[data-slot=code-block-content]:focus-visible]:ring-3 has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/50 group/code-block relative flex w-full min-w-0 flex-col overflow-hidden` | `group/code-block has-[>[data-slot=code-block-content]:focus-visible]:focus-ring relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg bg-surface-secondary text-sm data-[size=sm]:rounded-md data-[size=sm]:text-xs` |
| codeBlockVariants · variant=default | `border border-input text-foreground dark:bg-input/30 has-[>[data-slot=code-block-content]:focus-visible]:border-ring` | `border border-surface-secondary text-foreground` |
| codeBlockVariants · variant=destructive | `border border-destructive/30 text-destructive dark:border-destructive/40` | `border border-destructive/70 text-destructive` |
| CodeBlockHeader | `gap-2 px-3 pt-3 text-muted-foreground group-data-[variant=destructive]/code-block:text-destructive group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pt-2.5 flex min-w-0 shrink-0 items-center *:has-[>[data-slot=code-block-title]]:min-w-0` | `flex min-w-0 shrink-0 items-center gap-1 px-2 pt-2 text-muted-foreground *:has-[>[data-slot=code-block-title]]:min-w-0 group-data-[size=sm]/code-block:px-1.5 group-data-[size=sm]/code-block:pt-1.5 group-data-[variant=destructive]/code-block:text-destructive` |
| CodeBlockTitle | `font-sans text-sm font-medium text-foreground group-data-[variant=destructive]/code-block:text-destructive *:[svg]:me-1.5 [&_svg:not([class*='size-'])]:size-3.5 group-data-[size=sm]/code-block:text-xs min-w-0 truncate [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle` | `min-w-0 truncate font-medium font-sans text-sm group-data-[size=sm]/code-block:text-xs group-data-[variant=destructive]/code-block:text-destructive [&_svg:not([class*='size-'])]:size-4 group-data-[size=sm]/code-block:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle *:[svg]:me-1` |
| CodeBlockActions | `-my-1 -me-1.5 gap-1 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:end-2 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-1.5 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-1.5 [[data-slot=code-block]>&]:*:[button]:bg-background [[data-slot=code-block]>&]:*:[button]:ring-1 [[data-slot=code-block]>&]:*:[button]:ring-foreground/10 ms-auto flex shrink-0 items-center [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100` | `-my-1 ms-auto -me-1 flex shrink-0 items-center gap-0.5 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:pointer-coarse:opacity-100 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-1.5 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-1.5 [[data-slot=code-block]>&]:*:[button]:bg-background [[data-slot=code-block]>&]:*:[button]:ring-1 [[data-slot=code-block]>&]:*:[button]:ring-foreground/10` |
| CodeBlockCopyButton | `sr-only` | `sr-only` |
| CodeBlockContent | `grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0`<br>`px-3 py-3 leading-relaxed group-has-data-[slot=code-block-header]/code-block:pt-2 group-has-data-[slot=code-block-footer]/code-block:pb-2 group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:py-2.5 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1.5 min-h-0 min-w-0 scroll-fade-x scrollbar-thin overflow-auto text-start font-mono outline-none data-wrap:scroll-fade-y data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap` | `grid min-h-lh in-data-wrap:min-w-0 min-w-max in-data-numbered:grid-cols-[auto_1fr] content-start`<br>`scroll-fade-x scrollbar-thin data-wrap:scroll-fade-y data-wrap:wrap-break-word min-h-0 min-w-0 overflow-auto p-2 text-start font-mono leading-relaxed outline-none group-has-data-[slot=code-block-header]/code-block:pt-1.5 group-has-data-[slot=code-block-footer]/code-block:pb-1.5 data-wrap:whitespace-pre-wrap group-data-[size=sm]/code-block:px-1.5 group-data-[size=sm]/code-block:py-1.5 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-footer]/code-block:pb-1` |
| codeBlockLineVariants · base | `-mx-3 px-3 in-data-numbered:gap-x-3 before:min-w-6 before:text-end before:text-muted-foreground after:start-1 after:text-muted-foreground group-data-[size=sm]/code-block:-mx-2.5 group-data-[size=sm]/code-block:px-2.5 relative block min-h-lh after:absolute after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']` | `relative in-data-numbered:col-span-2 -mx-2 block in-data-numbered:grid min-h-lh in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-2 px-2 in-data-numbered:[counter-increment:line] before:min-w-6 in-data-numbered:before:select-none before:text-end before:text-muted-foreground in-data-numbered:before:content-[counter(line)] after:absolute after:start-1 after:top-0 after:select-none after:text-muted-foreground group-data-[size=sm]/code-block:-mx-1.5 group-data-[size=sm]/code-block:px-1.5 in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']` |
| codeBlockLineVariants · variant=default | *(empty)* | *(empty)* |
| codeBlockLineVariants · variant=added | `bg-muted after:content-['+']` | `bg-muted after:content-['+']` |
| codeBlockLineVariants · variant=removed | `bg-destructive/10 after:text-destructive after:content-['−']` | `bg-destructive/20 after:text-destructive after:content-['−']` |
| codeBlockLineVariants · variant=highlighted | `bg-muted` | `bg-muted` |
| CodeBlockLine | `min-w-0` | `min-w-0` |
| CodeBlockFooter | `gap-2 px-3 pb-3 text-muted-foreground group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pb-2.5 flex min-w-0 shrink-0 items-center` | `flex min-w-0 shrink-0 items-center gap-1 px-2 pb-1 text-muted-foreground group-data-[size=sm]/code-block:px-1.5 group-data-[size=sm]/code-block:pb-0.5` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `code-block`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
