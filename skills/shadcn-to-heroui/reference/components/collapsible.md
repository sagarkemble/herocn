# Collapsible

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/collapsible.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/collapsible.tsx` and `bases/radix/ui/collapsible.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/collapsible · HeroUI equivalent: disclosure

## Primitive (Base UI import used by herocn)

```ts
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
```

Stock base imports (differ):
```ts
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
```

Stock radix imports:
```ts
import { Collapsible as CollapsiblePrimitive } from "radix-ui"
```

## Exports

herocn: `Collapsible`, `CollapsibleContent`, `CollapsibleTrigger`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
	return (
		<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
	);
}

function CollapsibleContent({
	hiddenUntilFound = true,
	...props
}: CollapsiblePrimitive.Panel.Props) {
	return (
		<CollapsiblePrimitive.Panel
			hiddenUntilFound={hiddenUntilFound}
			data-slot="collapsible-content"
			{...props}
		/>
	);
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| — | (no className strings in either file: unstyled wrapper, nothing to restyle) | (none) |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `CollapsibleContent`: new prop `hiddenUntilFound = true`, *safe additive (review)*: new optional prop with default.

## Herocn-only / not in HeroUI

- HeroUI equivalent: `disclosure`. Not spot-checked except Button, Input, Card, Dialog, Select, Tabs (see `reference/herocn-diff.md`). Phase B passed 6/6, so herocn is trusted for this one.
