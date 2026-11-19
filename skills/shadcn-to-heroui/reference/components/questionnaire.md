# Questionnaire

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/questionnaire.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/questionnaire.tsx` and `bases/radix/ui/questionnaire.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/questionnaire · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"
import { cn } from "cn"
```

## Exports

herocn: `Questionnaire`, `QuestionnaireActions`, `QuestionnaireChoice`, `QuestionnaireChoices`, `QuestionnaireDescription`, `QuestionnaireError`, `QuestionnaireInput`, `QuestionnaireItem`, `QuestionnaireNext`, `QuestionnairePrevious`, `QuestionnaireProgress`, `QuestionnaireSkip`, `QuestionnaireSubmit`, `QuestionnaireTitle`

- Extra vs stock base: none
- Missing vs stock base: `QuestionnaireChoiceDescription`
- Extra vs stock radix: none
- Missing vs stock radix: `QuestionnaireChoiceDescription`

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";
import type * as React from "react";
import { type Button, buttonVariants } from "@/registry/new-york-v4/ui/button";

function Questionnaire({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
	return (
		<QuestionnairePrimitive.Root
			data-slot="questionnaire"
			className={cn("flex w-full min-w-0 flex-col gap-6", className)}
			{...props}
		/>
	);
}

function QuestionnaireProgress({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
	return (
		<QuestionnairePrimitive.Progress
			data-slot="questionnaire-progress"
			className={cn(
				"w-fit min-w-[14ch] font-medium text-muted-foreground text-xs tabular-nums group-has-data-[slot=card-action]/card:leading-6",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireItem({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
	return (
		<QuestionnairePrimitive.Item
			data-slot="questionnaire-item"
			className={cn(
				"flex min-w-0 flex-col gap-5 border-0 p-0 outline-none",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireTitle({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
	return (
		<QuestionnairePrimitive.Title
			data-slot="questionnaire-title"
			className={cn(
				"text-pretty font-semibold text-base [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireDescription({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
	return (
		<QuestionnairePrimitive.Description
			data-slot="questionnaire-description"
			className={cn("text-pretty text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function QuestionnaireChoices({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
	return (
		<QuestionnairePrimitive.Choices
			data-slot="questionnaire-choices"
			className={cn(
				"group/questionnaire-choices grid min-w-0 gap-3",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireChoice({
	children,
	className,
	variant = "default",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice> & {
	variant?: "default" | "secondary";
}) {
	return (
		<QuestionnairePrimitive.Choice
			data-slot="questionnaire-choice"
			data-variant={variant}
			className={cn(
				"group/questionnaire-choice relative flex min-h-11 cursor-pointer select-none items-start gap-3.5 rounded-xl border border-input bg-input px-4 py-3.5 text-start text-sm shadow-xs outline-none dark:brightness-100",
				"data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none not-dark:data-[variant=secondary]:brightness-100",
				"hover:not-focus-visible:brightness-97 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110",
				"has-[>input:not([aria-invalid=true]):focus-visible]:focus-field-ring has-[>input:not([aria-invalid=true]):focus-visible]:ring-ring",
				"has-[>input[aria-invalid=true]:not(:focus-visible)]:invalid-field-ring has-[>input[aria-invalid=true]:focus-visible]:invalid-field-ring-focus",
				"data-checked:border-primary data-checked:bg-primary-soft",
				"data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<QuestionnairePrimitive.ChoiceInput
				data-slot="questionnaire-choice-input"
				className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
			/>
			<span
				aria-hidden="true"
				data-slot="questionnaire-choice-indicator"
				className="pointer-events-none relative flex size-4 shrink-0 items-center justify-center rounded-xl border border-input bg-default group-data-[variant=secondary]/questionnaire-choice:group-data-unchecked/questionnaire-choice:bg-card group-data-[type=radio]/questionnaire-choice:rounded-full group-data-checked/questionnaire-choice:border-primary group-data-checked/questionnaire-choice:bg-primary group-data-checked/questionnaire-choice:text-primary-foreground dark:group-data-checked/questionnaire-choice:bg-primary"
			>
				<span
					data-slot="questionnaire-choice-indicator-dot"
					className="hidden size-2 rounded-full bg-primary-foreground group-data-checked/questionnaire-choice:block group-data-[type=checkbox]/questionnaire-choice:hidden"
				/>
				<CheckIcon
					data-slot="questionnaire-choice-indicator-check"
					className="hidden size-3.5 group-data-checked/questionnaire-choice:block group-data-[type=radio]/questionnaire-choice:hidden"
				/>
			</span>
			<QuestionnairePrimitive.ChoiceLabel
				data-slot="questionnaire-choice-label"
				className="flex min-w-0 flex-1 flex-col gap-1 leading-snug"
			>
				{children}
			</QuestionnairePrimitive.ChoiceLabel>
			<QuestionnairePrimitive.ChoiceShortcut
				data-slot="questionnaire-choice-shortcut"
				className="pointer-events-none ms-auto mt-0.5 hidden size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background/80 font-medium font-mono text-[0.625rem] text-muted-foreground leading-none group-data-shortcut/questionnaire-choice:inline-flex"
			/>
		</QuestionnairePrimitive.Choice>
	);
}

function QuestionnaireInput({
	className,
	variant = "default",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input> & {
	variant?: "default" | "secondary";
}) {
	return (
		<QuestionnairePrimitive.Input
			data-slot="questionnaire-input"
			data-variant={variant}
			className={cn(
				"w-full min-w-0 rounded-xl bg-input px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground md:px-3 md:py-2 dark:brightness-100",
				"data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none not-dark:data-[variant=secondary]:brightness-100",
				"hover:not-focus-visible:brightness-97 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110",
				"not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring",
				"aria-invalid:not-focus-visible:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"selection:bg-primary selection:text-primary-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnaireError({
	className,
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
	return (
		<QuestionnairePrimitive.Error
			data-slot="questionnaire-error"
			className={cn("font-normal text-destructive text-sm", className)}
			{...props}
		/>
	);
}

function QuestionnaireActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="questionnaire-actions"
			className={cn(
				"flex min-h-11 w-full flex-wrap items-center justify-end gap-2 sm:min-h-9",
				className,
			)}
			{...props}
		/>
	);
}

function QuestionnairePrevious({
	children,
	className,
	size = "default",
	variant = "outline",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Previous
			data-slot="questionnaire-previous"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"me-auto min-h-11 sm:min-h-0",
				className,
			)}
			{...props}
		>
			{children ?? "Previous"}
		</QuestionnairePrimitive.Previous>
	);
}

function QuestionnaireSkip({
	children,
	className,
	size = "default",
	variant = "outline",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Skip
			data-slot="questionnaire-skip"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"min-h-11 sm:min-h-0",
				className,
			)}
			{...props}
		>
			{children ?? "Skip"}
		</QuestionnairePrimitive.Skip>
	);
}

function QuestionnaireNext({
	children,
	className,
	size = "default",
	variant = "default",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Next
			data-slot="questionnaire-next"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"min-h-11 sm:min-h-0",
				className,
			)}
			{...props}
		>
			{children ?? "Next"}
		</QuestionnairePrimitive.Next>
	);
}

function QuestionnaireSubmit({
	children,
	className,
	size = "default",
	variant = "default",
	...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit> &
	Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
	return (
		<QuestionnairePrimitive.Submit
			data-slot="questionnaire-submit"
			data-size={size}
			data-variant={variant}
			className={cn(
				buttonVariants({ size, variant }),
				"min-h-11 sm:min-h-0",
				className,
			)}
			{...props}
		>
			{children ?? "Submit"}
		</QuestionnairePrimitive.Submit>
	);
}

export {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireError,
	QuestionnaireInput,
	QuestionnaireItem,
	QuestionnaireNext,
	QuestionnairePrevious,
	QuestionnaireProgress,
	QuestionnaireSkip,
	QuestionnaireSubmit,
	QuestionnaireTitle,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Questionnaire | `gap-4 flex w-full min-w-0 flex-col` | `flex w-full min-w-0 flex-col gap-6` |
| QuestionnaireProgress | `text-xs min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground tabular-nums` | `w-fit min-w-[14ch] font-medium text-muted-foreground text-xs tabular-nums group-has-data-[slot=card-action]/card:leading-6` |
| QuestionnaireItem | `flex flex-col gap-4 min-w-0 border-0 p-0 outline-none` | `flex min-w-0 flex-col gap-5 border-0 p-0 outline-none` |
| QuestionnaireTitle | `text-base leading-snug font-medium [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4 text-pretty` | `text-pretty font-semibold text-base [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5` |
| QuestionnaireDescription | `text-muted-foreground text-sm text-pretty text-muted-foreground` | `text-pretty text-muted-foreground text-sm` |
| QuestionnaireChoices | `gap-2 group/questionnaire-choices grid min-w-0` | `group/questionnaire-choices grid min-w-0 gap-3` |
| QuestionnaireChoice | `absolute inset-0 z-10 size-full cursor-pointer opacity-0`<br>`border-input dark:bg-input/30 group-data-checked/questionnaire-choice:bg-primary dark:group-data-checked/questionnaire-choice:bg-primary group-data-checked/questionnaire-choice:text-primary-foreground group-data-checked/questionnaire-choice:border-primary size-4 translate-y-[--spacing(0.45)] group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 rounded-[4px] pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full`<br>`bg-primary-foreground size-2 hidden rounded-full group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block`<br>`size-3.5 hidden group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block`<br>`gap-0.5 flex min-w-0 flex-1 flex-col leading-snug`<br>`border-input bg-background text-muted-foreground size-5 translate-y-[--spacing(0.45)] group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 items-center justify-center rounded-md border font-mono text-[0.625rem] font-medium leading-none pointer-events-none ms-auto hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex`<br>`border-input dark:bg-input/20 hover:bg-muted/50 data-checked:border-primary/40 data-checked:bg-muted dark:data-checked:bg-muted data-invalid:border-destructive has-[>input:focus-visible]:border-ring has-[>input:focus-visible]:ring-ring/50 gap-2.5 rounded-lg border bg-transparent px-3 py-2.5 text-sm has-[>input:focus-visible]:ring-3 group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none`<br>`data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50` | `absolute inset-0 z-10 size-full cursor-pointer opacity-0`<br>`pointer-events-none relative flex size-4 shrink-0 items-center justify-center rounded-xl border border-input bg-default group-data-[variant=secondary]/questionnaire-choice:group-data-unchecked/questionnaire-choice:bg-card group-data-[type=radio]/questionnaire-choice:rounded-full group-data-checked/questionnaire-choice:border-primary group-data-checked/questionnaire-choice:bg-primary group-data-checked/questionnaire-choice:text-primary-foreground dark:group-data-checked/questionnaire-choice:bg-primary`<br>`hidden size-2 rounded-full bg-primary-foreground group-data-checked/questionnaire-choice:block group-data-[type=checkbox]/questionnaire-choice:hidden`<br>`hidden size-3.5 group-data-checked/questionnaire-choice:block group-data-[type=radio]/questionnaire-choice:hidden`<br>`flex min-w-0 flex-1 flex-col gap-1 leading-snug`<br>`pointer-events-none ms-auto mt-0.5 hidden size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background/80 font-medium font-mono text-[0.625rem] text-muted-foreground leading-none group-data-shortcut/questionnaire-choice:inline-flex`<br>`group/questionnaire-choice relative flex min-h-11 cursor-pointer select-none items-start gap-3.5 rounded-xl border border-input bg-input px-4 py-3.5 text-start text-sm shadow-xs outline-none dark:brightness-100`<br>`data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none not-dark:data-[variant=secondary]:brightness-100`<br>`hover:not-focus-visible:brightness-97 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110`<br>`has-[>input:not([aria-invalid=true]):focus-visible]:focus-field-ring has-[>input:not([aria-invalid=true]):focus-visible]:ring-ring`<br>`has-[>input[aria-invalid=true]:not(:focus-visible)]:invalid-field-ring has-[>input[aria-invalid=true]:focus-visible]:invalid-field-ring-focus`<br>`data-checked:border-primary data-checked:bg-primary-soft`<br>`data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50` |
| QuestionnaireInput | `w-full group/questionnaire-input relative min-w-0`<br>`dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base focus-visible:ring-3 aria-invalid:ring-3 md:text-sm min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0`<br>`selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground` | `w-full min-w-0 rounded-xl bg-input px-2.5 py-1.5 text-sm shadow-xs outline-none transition-[background-color,box-shadow,opacity,filter] placeholder:text-muted-foreground md:px-3 md:py-2 dark:brightness-100`<br>`data-[variant=secondary]:bg-default data-[variant=secondary]:shadow-none not-dark:data-[variant=secondary]:brightness-100`<br>`hover:not-focus-visible:brightness-97 hover:not-focus-visible:data-[variant=secondary]:bg-default not-dark:hover:not-focus-visible:data-[variant=secondary]:brightness-96 dark:hover:not-focus-visible:brightness-110`<br>`not-aria-invalid:focus-visible:focus-field-ring not-aria-invalid:focus-visible:ring-ring`<br>`aria-invalid:not-focus-visible:invalid-field-ring aria-invalid:focus-visible:invalid-field-ring-focus`<br>`disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`<br>`selection:bg-primary selection:text-primary-foreground` |
| QuestionnaireError | `mt-2 text-sm text-destructive` | `font-normal text-destructive text-sm` |
| QuestionnaireActions | `gap-2 sm:min-h-8 grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center` | `flex min-h-11 w-full flex-wrap items-center justify-end gap-2 sm:min-h-9` |
| QuestionnairePrevious | `col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0` | `me-auto min-h-11 sm:min-h-0` |
| QuestionnaireSkip | `col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0` | `min-h-11 sm:min-h-0` |
| QuestionnaireNext | `col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0` | `min-h-11 sm:min-h-0` |
| QuestionnaireSubmit | `col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0` | `min-h-11 sm:min-h-0` |
| QuestionnaireChoiceDescription | `text-muted-foreground` | *(part not in herocn)* |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `QuestionnaireChoice`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.
- `QuestionnaireInput`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.
- `QuestionnaireChoiceDescription`: exists in stock, **missing in herocn**. Keep the stock function (don't delete).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `questionnaire`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
