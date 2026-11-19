# Calendar

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/calendar.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/calendar.tsx` and `bases/radix/ui/calendar.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/calendar · HeroUI equivalent: calendar

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
import {
	type DayButton,
	DayPicker,
	getDefaultClassNames,
	type Locale,
} from "react-day-picker";
```

Stock base imports (differ):
```ts
import { cn } from "cn"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"
```

Stock radix imports:
```ts
import { cn } from "cn"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"
```

## Exports

herocn: `Calendar`, `CalendarDayButton`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { cn } from "cn";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import * as React from "react";
import {
	type DayButton,
	DayPicker,
	getDefaultClassNames,
	type Locale,
} from "react-day-picker";
import { Button, buttonVariants } from "@/registry/new-york-v4/ui/button";

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	locale,
	formatters,
	components,
	...props
}: React.ComponentProps<typeof DayPicker> & {
	buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				"group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent p-3 [--cell-radius:var(--radius-4xl)] [--cell-size:--spacing(9)]",
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className,
			)}
			captionLayout={captionLayout}
			locale={locale}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString(locale?.code, { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: cn("w-fit border-0!", defaultClassNames.root),
				months: cn(
					"relative flex flex-col gap-4 md:flex-row",
					defaultClassNames.months,
				),
				month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
				nav: cn(
					"absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
					defaultClassNames.nav,
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none p-0 text-primary-soft-foreground hover:text-primary-soft-foreground active:text-primary-soft-foreground aria-disabled:opacity-50",
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none p-0 text-primary-soft-foreground hover:text-primary-soft-foreground active:text-primary-soft-foreground aria-disabled:opacity-50",
					defaultClassNames.button_next,
				),
				month_caption: cn(
					"flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
					defaultClassNames.month_caption,
				),
				dropdowns: cn(
					"flex h-(--cell-size) w-full items-center justify-center gap-1.5 font-medium text-sm",
					defaultClassNames.dropdowns,
				),
				dropdown_root: cn(
					"relative rounded-(--cell-radius)",
					defaultClassNames.dropdown_root,
				),
				dropdown: cn(
					"absolute inset-0 bg-popover opacity-0",
					defaultClassNames.dropdown,
				),
				caption_label: cn(
					"select-none font-medium",
					captionLayout === "label"
						? "text-sm"
						: "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
					defaultClassNames.caption_label,
				),
				weekdays: cn("flex", defaultClassNames.weekdays),
				weekday: cn(
					"flex-1 select-none rounded-(--cell-radius) font-medium text-[0.8rem] text-muted-foreground",
					defaultClassNames.weekday,
				),
				week: cn("mt-2 flex w-full", defaultClassNames.week),
				week_number_header: cn(
					"w-(--cell-size) select-none",
					defaultClassNames.week_number_header,
				),
				week_number: cn(
					"select-none text-[0.8rem] text-muted-foreground",
					defaultClassNames.week_number,
				),
				day: cn(
					"group/day relative aspect-square h-full w-full select-none rounded-(--cell-radius) p-0 text-center",
					"[&:last-child.rdp-range-middle_button]:rounded-e-lg",
					props.showWeekNumber
						? "[&:nth-child(2).rdp-range-middle_button]:rounded-s-lg"
						: "[&:first-child.rdp-range-middle_button]:rounded-s-lg",
					defaultClassNames.day,
				),
				range_start: cn(
					"relative isolate z-0 rounded-s-(--cell-radius) bg-primary-soft after:absolute after:inset-y-0 after:end-0 after:w-4 after:bg-primary-soft",
					defaultClassNames.range_start,
				),
				range_middle: cn(
					"rdp-range-middle rounded-none",
					defaultClassNames.range_middle,
				),
				range_end: cn(
					"relative isolate z-0 rounded-e-(--cell-radius) bg-primary-soft after:absolute after:inset-y-0 after:start-0 after:w-4 after:bg-primary-soft",
					defaultClassNames.range_end,
				),
				today: cn(
					"rounded-(--cell-radius) bg-primary-soft text-primary-soft-foreground",
					defaultClassNames.today,
				),
				outside: cn(
					"text-muted-foreground aria-selected:text-muted-foreground",
					defaultClassNames.outside,
				),
				disabled: cn(
					"text-muted-foreground opacity-50",
					defaultClassNames.disabled,
				),
				hidden: cn("invisible", defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return (
						<div
							data-slot="calendar"
							ref={rootRef}
							className={cn(className)}
							{...props}
						/>
					);
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return (
							<ChevronLeftIcon
								className={cn("size-4 rtl:rotate-180", className)}
								{...props}
							/>
						);
					}

					if (orientation === "right") {
						return (
							<ChevronRightIcon
								className={cn("size-4 rtl:rotate-180", className)}
								{...props}
							/>
						);
					}

					return (
						<ChevronDownIcon className={cn("size-4", className)} {...props} />
					);
				},
				DayButton: ({ ...props }) => (
					<CalendarDayButton locale={locale} {...props} />
				),
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="flex size-(--cell-size) items-center justify-center text-center">
								{children}
							</div>
						</td>
					);
				},
				...components,
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	locale,
	...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
	const defaultClassNames = getDefaultClassNames();

	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return (
		<Button
			variant="ghost"
			size="icon-sm"
			data-day={`${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(2, "0")}`}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-today={modifiers.today}
			data-selected={modifiers.selected}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				"relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 font-medium leading-none data-[today=true]:data-[range-middle=true]:rounded-(--cell-size) data-[today=true]:data-[range-middle=true]:bg-primary-soft data-[today=true]:data-[range-middle=true]:text-primary-soft-foreground data-[range-end=true]:rounded-(--cell-radius) data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-s-(--cell-radius) data-[range-end=true]:rounded-e-(--cell-radius) data-[range-end=true]:bg-primary data-[range-middle=true]:bg-primary-soft data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:hover:bg-primary-soft! hover:data-[selected=true]:bg-primary hover:data-[selected=true]:text-primary-foreground hover:data-[today=true]:not-data-selected:text-primary group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 [&>span]:text-xs [&>span]:opacity-70",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Calendar | `flex size-(--cell-size) items-center justify-center text-center`<br>`p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent`<br>`w-fit`<br>`relative flex flex-col gap-4 md:flex-row`<br>`flex w-full flex-col gap-4`<br>`absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1`<br>`size-(--cell-size) p-0 select-none aria-disabled:opacity-50`<br>`size-(--cell-size) p-0 select-none aria-disabled:opacity-50`<br>`flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)`<br>`flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium`<br>`has-focus:border-ring border-input has-focus:ring-ring/50 border has-focus:ring-3 relative rounded-(--cell-radius)`<br>`absolute inset-0 bg-popover opacity-0`<br>`font-medium select-none`<br>`text-sm`<br>`[key:text-sm] h-6 pr-1 pl-1.5 flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground`<br>`w-full border-collapse`<br>`flex`<br>`flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none`<br>`mt-2 flex w-full`<br>`w-(--cell-size) select-none`<br>`text-[0.8rem] text-muted-foreground select-none`<br>`group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)`<br>`[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)`<br>`[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)`<br>`relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted`<br>`rounded-none`<br>`relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted`<br>`rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none`<br>`text-muted-foreground aria-selected:text-muted-foreground`<br>`text-muted-foreground opacity-50`<br>`size-4`<br>`size-4`<br>`size-4` | `flex size-(--cell-size) items-center justify-center text-center`<br>`group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent p-3 [--cell-radius:var(--radius-4xl)] [--cell-size:--spacing(9)]`<br>`w-fit border-0!`<br>`relative flex flex-col gap-4 md:flex-row`<br>`flex w-full flex-col gap-4`<br>`absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1`<br>`size-(--cell-size) select-none p-0 text-primary-soft-foreground hover:text-primary-soft-foreground active:text-primary-soft-foreground aria-disabled:opacity-50`<br>`size-(--cell-size) select-none p-0 text-primary-soft-foreground hover:text-primary-soft-foreground active:text-primary-soft-foreground aria-disabled:opacity-50`<br>`flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)`<br>`flex h-(--cell-size) w-full items-center justify-center gap-1.5 font-medium text-sm`<br>`relative rounded-(--cell-radius)`<br>`absolute inset-0 bg-popover opacity-0`<br>`select-none font-medium`<br>`text-sm`<br>`[key:text-sm] flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground`<br>`flex`<br>`flex-1 select-none rounded-(--cell-radius) font-medium text-[0.8rem] text-muted-foreground`<br>`mt-2 flex w-full`<br>`w-(--cell-size) select-none`<br>`select-none text-[0.8rem] text-muted-foreground`<br>`group/day relative aspect-square h-full w-full select-none rounded-(--cell-radius) p-0 text-center`<br>`[&:last-child.rdp-range-middle_button]:rounded-e-lg`<br>`[&:nth-child(2).rdp-range-middle_button]:rounded-s-lg`<br>`[&:first-child.rdp-range-middle_button]:rounded-s-lg`<br>`relative isolate z-0 rounded-s-(--cell-radius) bg-primary-soft after:absolute after:inset-y-0 after:end-0 after:w-4 after:bg-primary-soft`<br>`rdp-range-middle rounded-none`<br>`relative isolate z-0 rounded-e-(--cell-radius) bg-primary-soft after:absolute after:inset-y-0 after:start-0 after:w-4 after:bg-primary-soft`<br>`rounded-(--cell-radius) bg-primary-soft text-primary-soft-foreground`<br>`text-muted-foreground aria-selected:text-muted-foreground`<br>`text-muted-foreground opacity-50`<br>`size-4 rtl:rotate-180`<br>`size-4 rtl:rotate-180`<br>`size-4` |
| CalendarDayButton | `relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70` | `relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 font-medium leading-none data-[today=true]:data-[range-middle=true]:rounded-(--cell-size) data-[today=true]:data-[range-middle=true]:bg-primary-soft data-[today=true]:data-[range-middle=true]:text-primary-soft-foreground data-[range-end=true]:rounded-(--cell-radius) data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-s-(--cell-radius) data-[range-end=true]:rounded-e-(--cell-radius) data-[range-end=true]:bg-primary data-[range-middle=true]:bg-primary-soft data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:hover:bg-primary-soft! hover:data-[selected=true]:bg-primary hover:data-[selected=true]:text-primary-foreground hover:data-[today=true]:not-data-selected:text-primary group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 [&>span]:text-xs [&>span]:opacity-70` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).
- *Safe additive (hydration fix):* stock shadcn and herocn set `data-day={day.date.toLocaleDateString(locale?.code)}` on `CalendarDayButton`. The server and the browser can format that date differently, which causes a React hydration mismatch when the calendar is server-rendered. The target file above uses a fixed local `YYYY-MM-DD` string instead. It changes no styles. Only `data-day` changes, so check that nothing in the user's project reads `data-day` expecting the locale format.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `calendar`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
