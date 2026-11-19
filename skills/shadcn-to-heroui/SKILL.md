---
name: shadcn-to-heroui
description: Restyle an existing shadcn/ui project so it looks and feels like HeroUI v3 (tokens, radii, shadows, focus/invalid rings, press and overlay motion) without migrating off shadcn. Use whenever the user mentions a HeroUI look, "premium shadcn", or wants to restyle or reskin shadcn components.
---

# shadcn → HeroUI look (herocn-based)

Reskin, **not** a migration. Keep every component file, export, prop and primitive library. Change only CSS tokens, Tailwind classes and motion.
The target look is **herocn** (MIT, github.com/Maqed/herocn): shadcn components rebuilt with HeroUI v3's design system. herocn was spot-checked against HeroUI v3.2.7 (6/6 core match; known deviations are in `reference/herocn-diff.md`).
Live preview of the result (every component, docs, theme editor): https://herocn.sagarkemble.dev. To change the colours/radius/font afterwards, use the companion skill `heroui-customize`. To copy the marketing landing and/or theme builder into the app as `/demo-landing` and `/design-system`, use `visualize-design-system` (asks first; does not restyle `components/ui`).

## Files

| File | Use |
|---|---|
| `reference/tokens.md` | herocn color/radius tokens, shadcn mapping table, **ready-to-paste globals.css block** |
| `reference/motion.md` | `focus-ring`, `focus-field-ring`, `invalid-field-ring(-focus)`, `pressible`, skeleton shimmer; per-component motion; Radix motion translation |
| `reference/components/<name>.md` | one per herocn component (64): primitive, exports diff, full herocn source, **class table**, Radix notes, behavior changes |
| `reference/radix-mapping.md` | Base UI → Radix selector/variable mapping |
| `reference/heroui-tokens.md`, `heroui-motion.md` | raw HeroUI v3.2.7 values (reference only, don't paste) |
| `reference/herocn-diff.md` | herocn-vs-HeroUI v3.2.7 mismatches (why a value is herocn's, not HeroUI's) |

Everything the procedure needs is in `reference/`. (The source repo also has a `research/` folder with provenance notes and clones; it is not shipped and not needed.)

## Hard rules

1. **Never swap the primitive library.** Radix stays Radix, Base UI stays Base UI. Never paste the herocn file over a Radix file.
2. **Never break props or exports.** Don't remove/rename exports, props, cva keys or `data-slot`s. Don't change defaults. Copy items from a component's `## Behavior/prop changes` only when marked *safe additive*, and still keep everything stock.
3. **Never invent values.** Use only values from the reference files. If something has no herocn value, leave it as-is and list it in the report as NOT FOUND.
4. Edit only: `globals.css` (or the CSS file named in `components.json` → `tailwind.css`), `components/ui/*`, and the app code in step 4.

## Optional shortcut: the @herocn registry
https://herocn.sagarkemble.dev hosts the finished files as a shadcn registry (`@herocn=https://herocn.sagarkemble.dev/r/{name}.json`). `npx shadcn@latest add @herocn/style` installs the tokens + utilities; `npx shadcn@latest add @herocn/<component>` (or `@herocn/index` for all 64) installs restyled `components/ui/*` files.
Offer it only when **all** hold: the project is Base UI (`components.json` style `base-*`, e.g. base-nova), Tailwind v4, and the user agrees to have their `components/ui` files **overwritten** (the CLI replaces each file with the library's version, which follows this skill's rules; anything the user added to those files is lost). Always prefix `@herocn/` (bare `button` = stock shadcn). Otherwise, and always for Radix projects, use the procedure below; it is the default because it keeps the user's props. After a registry install, still run steps 4–6.

## Procedure

### 1. Detect the project
- Read `package.json`. **Tailwind must be v4** (`tailwindcss` ^4, `@tailwindcss/postcss` or `@tailwindcss/vite`). If it's v3, stop and tell the user to upgrade first (`npx @tailwindcss/upgrade`). Don't continue.
- Read `components.json` (`style`, `tailwind.css`, `aliases.ui`) and find the global CSS file and the ui folder (default `components/ui`).
- For **each** file in the ui folder, record its primitive: `"radix-ui"` / `"@radix-ui/*"` → **Radix**; `"@base-ui/react*"` → **Base UI**; neither → **plain** (treat as Base UI). Detect per file, not per project: stock Radix `combobox.tsx` imports Base UI.
- Note the files with no `reference/components/<name>.md` (custom components). Skip them and report them.

### 2. Add tokens and utilities (globals.css)
Follow `reference/tokens.md` → "Ready-to-paste globals.css" and its 4 merge rules:
- Ensure `@import "tailwindcss"`, `@import "tw-animate-css"` and `@import "shadcn/tailwind.css"` are present, plus `@custom-variant dark (&:is(.dark *));`. Install `tw-animate-css` if it's missing.
- In `:root` and `.dark`, **replace** the values of shadcn variables that herocn defines, and **add** herocn-only variables (`--snow`, `--eclipse`, `--default*`, `--success*`, `--warning*`, `--surface*`, `--segment*`, all `*-soft*`, `--ease-smooth`, `--ease-out`). Keep app-specific variables the project already has.
- Merge `@theme inline`: herocn radius scale + all new `--color-*` entries. Keep the project's `--font-sans` if it's wired to `next/font`.
- Replace `@layer base` with herocn's (`* { @apply border-border outline-ring/50; }`, body/html `font-sans bg-background text-foreground`).
- Append the four ring utilities, `pressible`, and the `.skeleton--shimmer` rules from `reference/motion.md` §1–2.

### 3. Apply class tables per ui file
For each ui file with a matching `reference/components/<name>.md`:
- Use the **class table**. For every row (function/part or cva `group=key`), replace that part's class string with the **herocn classes** column. Match by part (function name, `data-slot`, cva key), not by the literal stock string. Keep any user-added classes that aren't part of the stock string.
- cva variants/sizes that herocn adds (e.g. Button `tertiary`, `destructive-soft`) may be added: *safe additive*. Stock keys herocn lacks (e.g. Badge `secondary`/`outline`/`ghost`/`link`, Toggle `outline`) stay with their **stock classes unchanged**, unless a hand-review note maps them. If such a key relied on a class herocn removed from the base string (e.g. `border`), move that class into the key. In kept stock classes, replace `border-input` with `border-border`, since herocn's `--input` is a fill and would make the border invisible.
- Elements a component renders internally (e.g. the Dialog X button) follow the herocn source in `## Target file` when the change is class/variant-only.
- **Base UI file:** apply the table as-is. Keep props/exports. Add extras only if marked *safe additive*. When the user file has the same structure as herocn's, it's fine to start from the herocn source and then restore the user's imports (`cn` path, `@/components/ui/*` instead of herocn's `@/registry/new-york-v4/ui/*`), stock-only props (e.g. Select `size`) and stock defaults (e.g. `sideOffset`, `alignItemWithTrigger`, `activateOnFocus`).
- **Radix file:** apply the table, then fix state selectors and motion using `## Radix notes` in the component file + `reference/radix-mapping.md` (e.g. `data-starting-style`/`data-ending-style` → tw-animate `data-open:`/`data-closed:` classes with herocn's durations/easing; `--transform-origin` → `--radix-*-content-transform-origin`; `data-popup-open` → `data-open`; drop nested-dialog and Tabs Indicator classes).
- If herocn styles a part the user file renders without `className`, add herocn's classes. If the primitive ignores `className` (Radix `SelectValue`), target it from the parent (`*:data-[slot=select-value]:…`).
- Read the `## Hand-review notes` section where present (button, input, card, dialog, select, tabs).

### 4. Fix app code (outside the ui folder)
- `rg` the app (`app/`, `src/`, `components/` excluding ui) for conflicting hardcoded styles: raw colors (`bg-white`, `bg-black`, `text-gray-*`, `bg-zinc-*`, `#hex`, `rgb(`), radii (`rounded-md`/`rounded-lg` on buttons/cards/inputs), shadows (`shadow-md|lg` on cards), and `border-input` used as a border color (herocn's `--input` is a fill). Replace them with tokens (`bg-background`, `bg-surface`, `text-muted-foreground`, `border-border`, `rounded-3xl` for cards/buttons, `rounded-xl` for fields). Leave intentional brand colors alone and list them.
- **Button decision:** replace `variant="secondary"` with `variant="tertiary"` (herocn's neutral grey). herocn `secondary` is primary-tinted text. Report each change.
- Stock `variant="destructive"` becomes solid red. Report call sites, and suggest `destructive-soft` if the soft look was intended (don't change them automatically).

### 5. Verify
- Run the project's build and typecheck (`npm run build`, `npx tsc --noEmit`). Fix only the errors you introduced. All existing call sites must still compile (no broken props).
- Check in the browser or by grepping the compiled CSS: dark mode (`.dark` on `<html>`), `focus-ring`/`focus-field-ring` on keyboard focus, `aria-invalid` fields (red outline; red ring when focused), `disabled` at 50% opacity, dialog/select/popover open+close animations (Radix: exit animation plays).

### 6. Report
List: converted components (Radix/Base UI), skipped components (custom / no reference file), flagged items (NOT FOUND values, kept stock keys, behavior changes not applied, app-code colors left as brand, `secondary`→`tertiary` and `destructive` call sites), plus build/typecheck results.

## Recorded decisions
- shadcn Button `secondary` → herocn `tertiary` (step 4).
- Dialog stays **centred** on all breakpoints (no HeroUI mobile bottom placement).
- Dialog footer Close button follows herocn's `dialog.tsx`: `showCloseButton` renders `<Button variant="outline">Close</Button>` after `children`. herocn's docs `[Cancel][Save]` footer is demo app code, so don't reorder or restyle app footers to match it. The X button is `Button variant="tertiary" size="icon-xs"` at `absolute end-4 top-4`.
- Default changes in herocn (`SelectContent` `sideOffset` 8 / `alignItemWithTrigger` false, so the popup opens below the trigger; `TabsList` `activateOnFocus` true) are **not** applied. Always list Select placement in the report as an opt-in (Base: `alignItemWithTrigger = false, sideOffset = 8`; Radix: `position = "popper"`, `sideOffset = 8`; details in `select.md`).

## License
herocn is MIT-licensed, © 2026 Maqed (github.com/Maqed/herocn). Its LICENSE is copied to `LICENSE-herocn`. Keep this notice wherever herocn-derived classes or source are redistributed.
