# Base UI (herocn) → Radix: state selector mapping

herocn is written for **Base UI**. Use this when applying a herocn class table to a **Radix** component file (`import … from "radix-ui"` or `"@radix-ui/react-*"`). **Never swap the primitive library**. Translate only the classes.

## 1. Already compatible (shadcn custom variants)

`shadcn/tailwind.css` (imported by every shadcn v4 project) defines variants that match **both** libraries, so these herocn classes work unchanged on Radix:

| Variant | Matches |
|---|---|
| `data-open:` | `[data-state="open"]` (Radix) or `[data-open]` (Base UI) |
| `data-closed:` | `[data-state="closed"]` or `[data-closed]` |
| `data-checked:` / `data-unchecked:` | `[data-state="checked" / "unchecked"]` or `[data-checked]` / `[data-unchecked]` |
| `data-active:` | `[data-state="active"]` (Radix Tabs trigger) or `[data-active]` |
| `data-disabled:` | `[data-disabled]` (both; Radix sets an empty attribute) |
| `data-selected:` | `[data-selected="true"]` only |
| `data-horizontal:` / `data-vertical:` | `[data-orientation=…]` (both) |

Same names in both libraries: `data-highlighted`, `data-side`, `data-align`, `data-orientation`, `data-placeholder`, `data-disabled`, `aria-*`. Accordion keyframes `animate-accordion-down/up` read `--radix-accordion-content-height` with a fallback to `--accordion-panel-height`.

**Programmatic focus:** Radix focuses Select items by script, so a herocn `focus-visible:` style on those items can appear on pointer hover (it inherits focus-visible from the previously focused element). For Radix Select items, use `data-highlighted:` for the highlight and drop `focus-visible:focus-ring`. herocn's menu items (`dropdown-menu`, `context-menu`, `menubar`) already use `data-highlighted:focus-ring`, which behaves the same in both libraries, so they need no change.

**Parts without a className in stock Radix:** if herocn styles a part that stock Radix renders without `className` (e.g. `SelectValue`), add herocn's classes to it. That's class-only. Exception: Radix `Select.Value` drops `className`, so target it from the trigger with `*:data-[slot=select-value]:…`.

**Caveat:** only the bare variant form is compatible. Raw arbitrary forms like `data-[checked]:` or `group-data-[checked]/x:` don't match Radix's `data-state="checked"`. Rewrite them as `data-checked:` / `group-data-checked/x:`.

## 2. Base UI-only selectors and variables in herocn files

| herocn (Base UI) | Radix project |
|---|---|
| `data-starting-style:` (transition start) | No Radix equivalent. Remove and express the enter state as tw-animate `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-* data-open:slide-in-from-*` with herocn's duration/easing (motion.md §4). |
| `data-ending-style:` (transition end) | No Radix equivalent. Use `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-*` + herocn's exit duration (`data-closed:duration-100`). Radix Presence waits for animations, not transitions. |
| `data-popup-open` (trigger while popup open) | `data-open:` (Radix triggers get `data-state="open"`; shadcn's `data-open` variant matches it). `group-data-popup-open/x:` → `group-data-open/x:`. |
| `data-panel-open` (trigger of open panel) | `data-open:` (`data-state="open"`). |
| `data-expanded` | Radix uses `data-state="open"` → `data-open:`. |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`, `--radix-hover-card-content-transform-origin`, `--radix-context-menu-content-transform-origin`, `--radix-menubar-content-transform-origin`. |
| `--available-height` | `--radix-<primitive>-content-available-height`. |
| `--available-width` | `--radix-<primitive>-content-available-width`. |
| `--anchor-width` | `--radix-<primitive>-trigger-width` (e.g. `--radix-select-trigger-width`, `--radix-popover-trigger-width`). |
| `--accordion-panel-height` | `--radix-accordion-content-height`. Radix needs keyframes: use `data-open:animate-accordion-down data-closed:animate-accordion-up` (shadcn/tailwind.css keyframes read both vars). |
| `--collapsible-panel-height` | `--radix-collapsible-content-height` (+ `animate-collapsible-down/up` if defined, otherwise keep no height animation). |
| nested dialog stacking (`data-nested-dialog-open`, `--nested-dialogs`) | NOT AVAILABLE in Radix. Drop these classes (the centred position without the nested offset remains). |
| Base UI Drawer vars (`--drawer-*`, nested drawers, swipe) | NOT AVAILABLE. Stock Radix drawer uses `vaul`. Keep vaul and apply only the static look classes (radius, bg, padding, handle). |
| `data-[instant=…]` | Radix Tooltip: `data-[state=instant-open]:transition-none` / `animate-none`. |
| Tabs Indicator (`--active-tab-left/top/width/height`) | NOT AVAILABLE (Radix Tabs has no Indicator part). Don't add `TabsIndicator`. Put the indicator look on the active trigger instead: `group-data-[variant=default]/tabs-list:data-active:bg-segment group-data-[variant=default]/tabs-list:data-active:shadow-sm`, and for the line variant an `after:` underline using `bg-ring` (`after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ring after:opacity-0 group-data-[variant=line]/tabs-list:data-active:after:opacity-100`). |
| `data-activation-direction` | NOT AVAILABLE in Radix. Drop. |
| `data-pressed` (Toggle) | Radix Toggle: `data-[state=on]:`. |
| `data-[align-trigger=true]` | Stock radix `select.tsx` sets this attribute itself (`data-align-trigger={position === "item-aligned"}`), so keep it as-is. |
| Base UI Toast stacking/swipe vars | NOT AVAILABLE. Stock Radix uses `sonner` (no `toast.tsx`). Restyle sonner via its `toastOptions.classNames` with herocn surface/radius classes. |
| `data-highlighted`, `data-side`, `data-align` | Same attribute names in Radix. Keep as-is. |

## 3. Motion: transitions → keyframes

Base UI keeps the element mounted while `data-ending-style` transitions run. Radix `Presence` only waits for CSS **animations**. So every herocn `transition-* data-starting-style:* data-ending-style:*` popup becomes tw-animate classes with the **same values**. The full translation table is in `motion.md` §4. Rules of thumb:
- `duration-N` (enter) → `data-open:duration-N`; `data-ending-style:duration-M` → `data-closed:duration-M`
- `data-starting-style:opacity-0` → `data-open:animate-in data-open:fade-in-0`; `data-ending-style:opacity-0` → `data-closed:animate-out data-closed:fade-out-0`
- `data-starting-style:scale-[0.95]` → `data-open:zoom-in-95`; `scale-[0.9]` → `zoom-in-90`; `scale-[1.05]` → `zoom-in-105`; ending `scale-[0.95]` → `data-closed:zoom-out-95`
- side offsets `data-[side=bottom]:data-starting-style:-translate-y-1` → `data-[side=bottom]:slide-in-from-top-1` (top → `slide-in-from-bottom-1`, left → `slide-in-from-right-1`, right → `slide-in-from-left-1`)
- keep `ease-[cubic-bezier(0.22,1,0.36,1)]` (tw-animate reads `--tw-ease`)
- drop `transition-[opacity,scale,translate]` (only needed for the Base UI transition)

## 4. Component-level gaps on Radix

| Component | Gap |
|---|---|
| tabs | No `Tabs.Indicator`, so the sliding pill is replaced by an active-trigger background (`tabs.md` hand notes) |
| dialog / alert-dialog | No nested-dialog vars (drop) |
| toast | Stock Radix has no `toast.tsx` (uses `sonner`). Restyle sonner via `toastOptions.classNames` with herocn surface/radius classes, or skip and report |
| drawer | Stock Radix drawer uses `vaul`. Apply only static classes |
| combobox | Stock Radix `combobox.tsx` imports `@base-ui/react` too, so treat it as a Base UI file (per-file detection, not per-project) |
| select | Stock Radix sets `data-align-trigger` itself; Radix `SelectIcon` has no open state (use `group-data-open/button:` from the trigger). Item: drop `focus-visible:focus-ring` and use `data-highlighted:` instead of `hover:` (see below). `SelectValue`: Radix ignores its `className`, so add herocn's classes on the trigger as `*:data-[slot=select-value]:…`. Placement below the trigger needs a default change (`position="popper"`), which is opt-in only (select.md) |
