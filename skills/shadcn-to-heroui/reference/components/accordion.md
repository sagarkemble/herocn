# Accordion

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/accordion.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/accordion.tsx` and `bases/radix/ui/accordion.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/accordion · HeroUI equivalent: accordion

## Primitive (Base UI import used by herocn)

```ts
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";
```

Stock base imports (differ):
```ts
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { Accordion as AccordionPrimitive } from "radix-ui"
```

## Exports

herocn: `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

type AccordionVariant = "default" | "surface";

function Accordion({
	className,
	variant = "default",
	hiddenUntilFound = true,
	...props
}: AccordionPrimitive.Root.Props & { variant?: AccordionVariant }) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			data-variant={variant}
			hiddenUntilFound={hiddenUntilFound}
			className={cn(
				"group/accordion w-full",
				"[contain:layout_style]",
				variant === "surface" && "rounded-3xl bg-surface",
				className,
			)}
			{...props}
		/>
	);
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(
				"relative border-none",
				"after:absolute after:start-0 after:bottom-0 after:h-px after:w-full after:rounded-xs after:bg-border",
				"last:after:content-none",
				"data-[hide-separator=true]:after:hidden",
				"group-data-[variant=surface]/accordion:after:start-[3%] group-data-[variant=surface]/accordion:after:w-[94%]",
				"group-data-[variant=surface]/accordion:first-of-type:[&_[data-slot=accordion-trigger]]:rounded-t-3xl",
				"group-data-[variant=surface]/accordion:last-of-type:not-has-[[data-slot=accordion-trigger][aria-expanded=true]]:[&_[data-slot=accordion-trigger]]:rounded-b-3xl",
				className,
			)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"group/accordion-trigger",
					"flex flex-1 items-center justify-between px-4 py-4 text-start font-medium text-sm",
					"cursor-pointer select-none",
					"transition-shadow",
					"group-data-[variant=secondary]:first:rounded-t-3xl",
					"hover:bg-foreground/3 aria-expanded:hover:bg-transparent",
					"focus-visible:focus-ring",
					"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
					"aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70",
					"group-data-[variant=surface]/accordion:hover:bg-default group-data-[variant=surface]/accordion:aria-expanded:hover:bg-transparent",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon
					data-slot="accordion-trigger-icon"
					className={cn(
						"ms-auto size-4 shrink-0 text-muted-foreground",
						"transition-transform duration-250 motion-reduce:transition-none",
						"group-aria-expanded/accordion-trigger:-rotate-180",
					)}
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className="h-(--accordion-panel-height) overflow-clip opacity-0 transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 data-open:opacity-100 motion-reduce:transition-none"
			{...props}
		>
			<div
				data-slot="accordion-content-inner"
				className={cn(
					"px-4 pt-0 pb-4 text-muted-foreground text-sm",
					"[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Accordion | `flex w-full flex-col` | `group/accordion w-full`<br>`[contain:layout_style]`<br>`[variant === "surface"] rounded-3xl bg-surface` |
| AccordionItem | `not-last:border-b` | `relative border-none`<br>`after:absolute after:start-0 after:bottom-0 after:h-px after:w-full after:rounded-xs after:bg-border`<br>`last:after:content-none`<br>`data-[hide-separator=true]:after:hidden`<br>`group-data-[variant=surface]/accordion:after:start-[3%] group-data-[variant=surface]/accordion:after:w-[94%]`<br>`group-data-[variant=surface]/accordion:first-of-type:[&_[data-slot=accordion-trigger]]:rounded-t-3xl`<br>`group-data-[variant=surface]/accordion:last-of-type:not-has-[[data-slot=accordion-trigger][aria-expanded=true]]:[&_[data-slot=accordion-trigger]]:rounded-b-3xl` |
| AccordionTrigger | `flex`<br>`pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden`<br>`pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline`<br>`focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground rounded-lg py-2.5 text-left text-sm font-medium hover:underline focus-visible:ring-3 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50` | `flex`<br>`group/accordion-trigger`<br>`flex flex-1 items-center justify-between px-4 py-4 text-start font-medium text-sm`<br>`cursor-pointer select-none`<br>`transition-shadow`<br>`group-data-[variant=secondary]:first:rounded-t-3xl`<br>`hover:bg-foreground/3 aria-expanded:hover:bg-transparent`<br>`focus-visible:focus-ring`<br>`disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`<br>`aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70`<br>`group-data-[variant=surface]/accordion:hover:bg-default group-data-[variant=surface]/accordion:aria-expanded:hover:bg-transparent`<br>`ms-auto size-4 shrink-0 text-muted-foreground`<br>`transition-transform duration-250 motion-reduce:transition-none`<br>`group-aria-expanded/accordion-trigger:-rotate-180` |
| AccordionContent | `data-open:animate-accordion-down data-closed:animate-accordion-up text-sm overflow-hidden`<br>`pt-0 pb-2.5 h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4` | `h-(--accordion-panel-height) overflow-clip opacity-0 transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 data-open:opacity-100 motion-reduce:transition-none`<br>`px-4 pt-0 pb-4 text-muted-foreground text-sm`<br>`[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `--accordion-panel-height`, `aria-disabled`, `data-ending-style`, `data-starting-style`
- Only in stock radix: `--radix-accordion-content-height`

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `--accordion-panel-height` | `--radix-accordion-content-height`. Radix needs keyframes: use `data-open:animate-accordion-down data-closed:animate-accordion-up` (shadcn/tailwind.css keyframes read both vars). |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `Accordion`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.
- `Accordion`: new prop `hiddenUntilFound = true`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `accordion`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
