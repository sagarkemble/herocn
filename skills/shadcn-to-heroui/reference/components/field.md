# Field

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/field.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/field.tsx` and `bases/radix/ui/field.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/field · HeroUI equivalent: textfield / fieldset / label / description / field-error

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

herocn: `Field`, `FieldContent`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLabel`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldTitle`

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
import { useMemo } from "react";
import { Label } from "@/registry/new-york-v4/ui/label";
import { Separator } from "@/registry/new-york-v4/ui/separator";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
	return (
		<fieldset
			data-slot="field-set"
			className={cn(
				"flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
				className,
			)}
			{...props}
		/>
	);
}

function FieldLegend({
	className,
	variant = "legend",
	...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
	return (
		<legend
			data-slot="field-legend"
			data-variant={variant}
			className={cn(
				"mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
				className,
			)}
			{...props}
		/>
	);
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-group"
			className={cn(
				"group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
				className,
			)}
			{...props}
		/>
	);
}

const fieldVariants = cva(
	"group/field flex w-full gap-1 data-[invalid=true]:text-destructive",
	{
		variants: {
			orientation: {
				vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
				horizontal:
					"flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
				responsive:
					"@md/field-group:flex-row flex-col @md/field-group:items-center *:w-full @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	},
);

function Field({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
	return (
		<div
			role="group"
			data-slot="field"
			data-orientation={orientation}
			className={cn(fieldVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-content"
			className={cn(
				"group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
				className,
			)}
			{...props}
		/>
	);
}

function FieldLabel({
	className,
	...props
}: React.ComponentProps<typeof Label>) {
	return (
		<Label
			data-slot="field-label"
			className={cn(
				"group/field-label peer/field-label flex w-fit gap-2 leading-snug has-[>[data-slot=field]]:has-data-checked:border-primary has-[>[data-slot=field]]:has-data-checked:bg-primary/15 has-[>[data-slot=field]]:has-data-checked:shadow-none has-[>[data-slot=field]]:rounded-2xl has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-surface has-[>[data-slot=field]]:bg-surface has-[>[data-slot=field]]:shadow-xs has-[>[data-slot=field]]:transition-[background-color,border-color,opacity,transform] has-[>[data-slot=field]]:duration-200 *:data-[slot=field]:px-5 *:data-[slot=field]:py-4 group-data-[disabled=true]/field:opacity-50 motion-reduce:has-[>[data-slot=field]]:transition-none dark:has-[>[data-slot=field]]:has-data-checked:bg-primary/10",
				"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-label"
			className={cn(
				"flex w-fit items-center gap-2 font-medium text-sm leading-snug group-data-[disabled=true]/field:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="field-description"
			className={cn(
				"text-start font-normal text-muted-foreground text-xs leading-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
				"nth-last-2:-mt-1 last:mt-0",
				"[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
}

function FieldSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"div"> & {
	children?: React.ReactNode;
}) {
	return (
		<div
			data-slot="field-separator"
			data-content={!!children}
			className={cn(
				"relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
				className,
			)}
			{...props}
		>
			<Separator className="absolute inset-0 top-1/2" />
			{children && (
				<span
					className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
					data-slot="field-separator-content"
				>
					{children}
				</span>
			)}
		</div>
	);
}

function FieldError({
	className,
	children,
	errors,
	...props
}: React.ComponentProps<"div"> & {
	errors?: Array<{ message?: string } | undefined>;
}) {
	const content = useMemo(() => {
		if (children) {
			return children;
		}

		if (!errors?.length) {
			return null;
		}

		const uniqueErrors = [
			...new Map(errors.map((error) => [error?.message, error])).values(),
		];

		if (uniqueErrors?.length === 1) {
			return uniqueErrors[0]?.message;
		}

		return (
			<ul className="ms-4 flex list-disc flex-col gap-1">
				{uniqueErrors.map(
					(error, index) =>
						error?.message && (
							<li key={`error-message-${index}`}>{error.message}</li>
						),
				)}
			</ul>
		);
	}, [children, errors]);

	if (!content) {
		return null;
	}

	return (
		<div
			role="alert"
			data-slot="field-error"
			className={cn("font-normal text-destructive text-sm", className)}
			{...props}
		>
			{content}
		</div>
	);
}

export {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| FieldSet | `gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col` | `flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3` |
| FieldLegend | `mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base` | `mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base` |
| FieldGroup | `gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 group/field-group @container/field-group flex w-full flex-col` | `group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4` |
| fieldVariants · base | `data-[invalid=true]:text-destructive gap-2 group/field flex w-full` | `group/field flex w-full gap-1 data-[invalid=true]:text-destructive` |
| fieldVariants · orientation=vertical | `flex-col *:w-full [&>.sr-only]:w-auto` | `flex-col *:w-full [&>.sr-only]:w-auto` |
| fieldVariants · orientation=horizontal | `flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` |
| fieldVariants · orientation=responsive | `flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `@md/field-group:flex-row flex-col @md/field-group:items-center *:w-full @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` |
| FieldContent | `gap-0.5 group/field-content flex flex-1 flex-col leading-snug` | `group/field-content flex flex-1 flex-col gap-0.5 leading-snug` |
| FieldLabel | `has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 *:data-[slot=field]:p-2.5 group/field-label peer/field-label flex w-fit`<br>`has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col` | `group/field-label peer/field-label flex w-fit gap-2 leading-snug has-[>[data-slot=field]]:has-data-checked:border-primary has-[>[data-slot=field]]:has-data-checked:bg-primary/15 has-[>[data-slot=field]]:has-data-checked:shadow-none has-[>[data-slot=field]]:rounded-2xl has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-surface has-[>[data-slot=field]]:bg-surface has-[>[data-slot=field]]:shadow-xs has-[>[data-slot=field]]:transition-[background-color,border-color,opacity,transform] has-[>[data-slot=field]]:duration-200 *:data-[slot=field]:px-5 *:data-[slot=field]:py-4 group-data-[disabled=true]/field:opacity-50 motion-reduce:has-[>[data-slot=field]]:transition-none dark:has-[>[data-slot=field]]:has-data-checked:bg-primary/10`<br>`has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col` |
| FieldTitle | `gap-2 leading-snug text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center` | `flex w-fit items-center gap-2 font-medium text-sm leading-snug group-data-[disabled=true]/field:opacity-50` |
| FieldDescription | `text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-data-horizontal/field:text-balance`<br>`last:mt-0 nth-last-2:-mt-1`<br>`[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary` | `text-start font-normal text-muted-foreground text-xs leading-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5`<br>`nth-last-2:-mt-1 last:mt-0`<br>`[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4` |
| FieldSeparator | `absolute inset-0 top-1/2`<br>`text-muted-foreground px-2 relative mx-auto block w-fit bg-background`<br>`-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative` | `absolute inset-0 top-1/2`<br>`relative mx-auto block w-fit bg-background px-2 text-muted-foreground`<br>`relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2` |
| FieldError | `ml-4 flex list-disc flex-col gap-1`<br>`text-destructive text-sm font-normal` | `ms-4 flex list-disc flex-col gap-1`<br>`font-normal text-destructive text-sm` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `textfield / fieldset / label / description / field-error`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
