# ButtonGroup

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/button-group.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/button-group.tsx` and `bases/radix/ui/button-group.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/button-group · HeroUI equivalent: button-group

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

herocn: `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`, `buttonGroupVariants`

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
import { Separator } from "@/registry/new-york-v4/ui/separator";

const buttonGroupVariants = cva(
	"flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 *:active:scale-100 has-[>[data-slot=button-group]]:gap-2 *:aria-expanded:scale-100 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-3xl [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"*:data-slot:rounded-e-none [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):first-child]:rounded-s-3xl [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):last-child]:rounded-e-3xl [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-3xl [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0",
				vertical:
					"flex-col *:data-slot:rounded-b-none [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):first-child]:rounded-t-3xl [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):last-child]:rounded-b-3xl [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-3xl [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

function ButtonGroup({
	className,
	orientation,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function ButtonGroupText({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"flex items-center gap-2 rounded-3xl border bg-muted px-2.5 font-medium text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "button-group-text",
		},
	});
}

function ButtonGroupSeparator({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="button-group-separator"
			orientation={orientation}
			className={cn(
				"relative self-stretch bg-input data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto data-[orientation=horizontal]:w-auto",
				className,
			)}
			{...props}
		/>
	);
}

export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| buttonGroupVariants · base | `has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1` | `flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 *:active:scale-100 has-[>[data-slot=button-group]]:gap-2 *:aria-expanded:scale-100 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-3xl [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1` |
| buttonGroupVariants · orientation=horizontal | `[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! *:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0` | `*:data-slot:rounded-e-none [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):first-child]:rounded-s-3xl [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):last-child]:rounded-e-3xl [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-3xl [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0` |
| buttonGroupVariants · orientation=vertical | `[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0` | `flex-col *:data-slot:rounded-b-none [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):first-child]:rounded-t-3xl [&>:is([data-slot='input'],[data-slot='input-group'],[data-slot='select-trigger']):last-child]:rounded-b-3xl [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-3xl [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0` |
| ButtonGroupText | `bg-muted gap-2 rounded-lg border px-2.5 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none` | `flex items-center gap-2 rounded-3xl border bg-muted px-2.5 font-medium text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none` |
| ButtonGroupSeparator | `bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto` | `relative self-stretch bg-input data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto data-[orientation=horizontal]:w-auto` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: `data-slot`
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- HeroUI equivalent: `button-group`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
