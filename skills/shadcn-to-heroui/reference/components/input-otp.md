# InputOtp

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/input-otp.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/input-otp.tsx` and `bases/radix/ui/input-otp.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/input-otp · HeroUI equivalent: input-otp

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
import { OTPInput, OTPInputContext } from "input-otp";
```

Stock base imports (differ):
```ts
import { cn } from "cn"
import { OTPInput, OTPInputContext } from "input-otp"
```

Stock radix imports:
```ts
import { cn } from "cn"
import { OTPInput, OTPInputContext } from "input-otp"
```

## Exports

herocn: `InputOTP`, `InputOTPGroup`, `InputOTPSeparator`, `InputOTPSlot`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { cn } from "cn";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

function InputOTP({
	className,
	containerClassName,
	variant = "default",
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
	variant?: "default" | "secondary";
}) {
	return (
		<div data-variant={variant} className="group">
			<OTPInput
				data-slot="input-otp"
				containerClassName={cn(
					"relative flex items-center gap-2 has-disabled:cursor-not-allowed has-disabled:opacity-50",
					containerClassName,
				)}
				spellCheck={false}
				className={cn("disabled:cursor-not-allowed", className)}
				{...props}
			/>
		</div>
	);
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn("flex items-center gap-2", className)}
			{...props}
		/>
	);
}

function InputOTPSlot({
	index,
	className,
	...props
}: React.ComponentProps<"div"> & {
	index: number;
}) {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			data-filled={char !== null}
			className={cn(
				"relative flex h-10 w-9.5 flex-none items-center justify-center",
				"rounded-xl bg-input text-foreground shadow-xs",
				"font-semibold text-sm outline-none",
				"transition motion-reduce:transition-none",
				"data-[active=true]:focus-field-ring data-[active=true]:z-10",
				"aria-invalid:invalid-field-ring",
				"group-data-[variant=secondary]:bg-default group-data-[variant=secondary]:shadow-none",
				className,
			)}
			{...props}
		>
			{char && (
				<span className="fade-in-0 zoom-in-80 slide-in-from-bottom-1 animate-in text-lg leading-6 tracking-[-0.27px] duration-200 motion-reduce:animate-none">
					{char}
				</span>
			)}
			{!char && hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-[2px] animate-caret-blink rounded-sm bg-foreground" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-separator"
			className="h-[2px] w-[6px] shrink-0 rounded-sm bg-border"
			role="separator"
			{...props}
		/>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| InputOTP | `gap-2 flex items-center has-disabled:opacity-50`<br>`disabled:cursor-not-allowed` | `group`<br>`relative flex items-center gap-2 has-disabled:cursor-not-allowed has-disabled:opacity-50`<br>`disabled:cursor-not-allowed` |
| InputOTPGroup | `has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive rounded-lg has-aria-invalid:ring-3 flex items-center` | `flex items-center gap-2` |
| InputOTPSlot | `pointer-events-none absolute inset-0 flex items-center justify-center`<br>`animate-caret-blink bg-foreground h-4 w-px duration-1000`<br>`dark:bg-input/30 border-input data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive size-8 border-y border-r text-sm transition-all outline-none first:rounded-l-lg first:border-l last:rounded-r-lg data-[active=true]:ring-3 relative flex items-center justify-center data-[active=true]:z-10` | `fade-in-0 zoom-in-80 slide-in-from-bottom-1 animate-in text-lg leading-6 tracking-[-0.27px] duration-200 motion-reduce:animate-none`<br>`pointer-events-none absolute inset-0 flex items-center justify-center`<br>`h-4 w-[2px] animate-caret-blink rounded-sm bg-foreground`<br>`relative flex h-10 w-9.5 flex-none items-center justify-center`<br>`rounded-xl bg-input text-foreground shadow-xs`<br>`font-semibold text-sm outline-none`<br>`transition motion-reduce:transition-none`<br>`data-[active=true]:focus-field-ring data-[active=true]:z-10`<br>`aria-invalid:invalid-field-ring`<br>`group-data-[variant=secondary]:bg-default group-data-[variant=secondary]:shadow-none` |
| InputOTPSeparator | `[&_svg:not([class*='size-'])]:size-4 flex items-center` | `h-[2px] w-[6px] shrink-0 rounded-sm bg-border` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `InputOTP`: new prop `variant = "default"`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `input-otp`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
