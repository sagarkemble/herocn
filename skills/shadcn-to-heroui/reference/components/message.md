# Message

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/message.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/message.tsx` and `bases/radix/ui/message.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/message · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

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

herocn: `Message`, `MessageAvatar`, `MessageContent`, `MessageFooter`, `MessageGroup`, `MessageHeader`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
import { cn } from "cn";
import type * as React from "react";

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-group"
			className={cn("flex min-w-0 flex-col gap-2", className)}
			{...props}
		/>
	);
}

function Message({
	className,
	align = "start",
	...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
	return (
		<div
			data-slot="message"
			data-align={align}
			className={cn(
				"group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
				className,
			)}
			{...props}
		/>
	);
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-avatar"
			className={cn(
				"flex w-fit min-w-10 shrink-0 items-center justify-center self-end overflow-hidden rounded-3xl bg-muted group-has-data-[slot=message-footer]/message:-translate-y-7",
				className,
			)}
			{...props}
		/>
	);
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-content"
			className={cn(
				"wrap-break-word flex w-full min-w-0 flex-col gap-2.5 group-data-[align=end]/message:*:data-slot:self-end",
				className,
			)}
			{...props}
		/>
	);
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-header"
			className={cn(
				"flex min-w-0 max-w-full items-center px-3.5 font-medium text-muted-foreground text-xs group-has-data-[variant=ghost]/message:px-0",
				className,
			)}
			{...props}
		/>
	);
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="message-footer"
			className={cn(
				"flex min-w-0 max-w-full items-center px-3.5 font-medium text-muted-foreground text-xs group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| MessageGroup | `gap-2 flex min-w-0 flex-col` | `flex min-w-0 flex-col gap-2` |
| Message | `text-sm gap-2 group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse` | `group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse` |
| MessageAvatar | `min-w-8 group-has-data-[slot=message-footer]/message:-translate-y-8 flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted` | `flex w-fit min-w-10 shrink-0 items-center justify-center self-end overflow-hidden rounded-3xl bg-muted group-has-data-[slot=message-footer]/message:-translate-y-7` |
| MessageContent | `gap-2.5 group-data-[align=end]/message:*:data-slot:self-end flex w-full min-w-0 flex-col wrap-break-word` | `wrap-break-word flex w-full min-w-0 flex-col gap-2.5 group-data-[align=end]/message:*:data-slot:self-end` |
| MessageHeader | `text-xs font-medium text-muted-foreground px-3 group-has-data-[variant=ghost]/message:px-0 flex max-w-full min-w-0 items-center` | `flex min-w-0 max-w-full items-center px-3.5 font-medium text-muted-foreground text-xs group-has-data-[variant=ghost]/message:px-0` |
| MessageFooter | `text-xs font-medium text-muted-foreground px-3 group-has-data-[variant=ghost]/message:px-0 flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end` | `flex min-w-0 max-w-full items-center px-3.5 font-medium text-muted-foreground text-xs group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

Base UI-specific selectors/variables in the herocn file and their Radix translation (see `reference/radix-mapping.md`):

| herocn (Base UI) | Radix project |
|---|---|
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `message`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
