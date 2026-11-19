# Direction

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/direction.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/direction.tsx` and `bases/radix/ui/direction.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn NOT FOUND (https://herocn.dev/docs/components/direction returns 404) · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

None. Plain HTML elements (no Base UI or third-party primitive).

Same primitive imports as stock base.

Stock radix imports:
```ts
import { Direction } from "radix-ui"
```

## Exports

herocn: `DirectionProvider`, `useDirection`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

export {
	DirectionProvider,
	useDirection,
} from "@base-ui/react/direction-provider";
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

- None detected (same destructured props and functions as stock base).

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `direction`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
