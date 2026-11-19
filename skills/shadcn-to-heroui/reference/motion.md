# herocn motion → shadcn/ui (PRIMARY)

**Source of truth:** herocn `apps/docs/src/app/theme.css` (utilities and skeleton) and the herocn component files `apps/docs/src/registry/new-york-v4/ui/*.tsx` (per-component transitions). herocn commit `be08ffc`.
HeroUI v3.2.7 motion (keyframes and timings from `@heroui/styles`) is kept in `heroui-motion.md` as the secondary reference. Differences are listed in `reference/herocn-diff.md`.

## 1. Utilities (verbatim from herocn theme.css, also in `shared.ts` → `css`)

```css
@utility focus-ring {
	@apply ring-2 ring-ring ring-offset-2 ring-offset-background outline-none;
}

@utility focus-field-ring {
	@apply ring-2 ring-ring ring-offset-0 outline-none;
}

@utility invalid-field-ring {
	@apply outline-1 outline-destructive outline-solid;
}

@utility invalid-field-ring-focus {
	@apply ring-2 outline-none ring-destructive ring-offset-0;
}

@utility pressible {
	transition:
		transform 250ms var(--ease-smooth),
		background-color 100ms var(--ease-out),
		box-shadow 100ms var(--ease-out);
	@apply transform-gpu motion-reduce:transition-none active:scale-[0.97] aria-expanded:scale-[0.97];
}
```

| Utility | Used for (herocn DESIGN.md) | Verified values | HeroUI v3.2.7 equivalent |
|---|---|---|---|
| `focus-ring` | buttons, triggers, menu items (`focus-visible:focus-ring`, `data-highlighted:focus-ring`) | 2px ring in `--ring` (= `--primary`), 2px offset in `--background` | `status-focused` / `focus-ring`: 2px `ring-focus`, offset `var(--ring-offset-width)` = 2px ✓ |
| `focus-field-ring` | inputs, textarea, field-like controls (`not-aria-invalid:focus-visible:focus-field-ring`) | 2px ring, offset 0 | `focus-field-ring` ✓ |
| `invalid-field-ring` | invalid field, unfocused (`aria-invalid:not-focus-visible:invalid-field-ring`) | 1px solid outline in `--destructive` | `invalid-field-ring` (unfocused part) ✓ |
| `invalid-field-ring-focus` | invalid field, focused (`aria-invalid:focus-visible:invalid-field-ring-focus`) | 2px ring in `--destructive`, offset 0, outline none | nested focus rule inside HeroUI `invalid-field-ring` ✓ |
| `pressible` | button, toggle, menubar trigger | transition `transform 250ms var(--ease-smooth)`, `background-color 100ms var(--ease-out)`, `box-shadow 100ms var(--ease-out)`; `transform-gpu`; pressed **and `aria-expanded`** → `scale: 0.97` | HeroUI `.button`: same transition list; pressed `transform: scale(0.97)` (sm `0.98`, lg `0.96`); no `aria-expanded` scale |

**Gotchas (verified by compiling with Tailwind v4.3.5):**
- `active:scale-[0.97]` compiles to the **`scale`** property (`scale: 0.97`), but the `pressible` transition lists **`transform`**. On its own, the press scale wouldn't animate.
- herocn's Button also has `transition-all`, which Tailwind emits *after* `pressible`. It overrides `transition-property/duration/timing-function` to `all` / `150ms` / `cubic-bezier(0.4, 0, 0.2, 1)`. So the **effective** herocn button press is a 150ms default-eased scale, not HeroUI's 250ms. The skill keeps herocn's classes as-is (herocn is primary) and records this in herocn-diff.md.
- `var(--ease-smooth)` isn't defined by the herocn registry CSS, only by herocn's docs site (`global.css`: `--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-out: cubic-bezier(0, 0, 0.2, 1)`). `tokens.md` adds both to `:root` so the declaration is valid. HeroUI's own `--ease-smooth` is `ease`.

## 2. Skeleton shimmer (verbatim from herocn theme.css)

```css
@theme inline {
	--animate-skeleton: skeleton 2s linear infinite;
	@keyframes skeleton {
		100% {
			transform: translateX(200%);
		}
	}
}

.skeleton--shimmer {
	@apply relative overflow-hidden rtl:[--skeleton-animation-dir:reverse];
}

.skeleton--shimmer::after {
	@apply absolute inset-0 -translate-x-full animate-skeleton bg-linear-to-r from-transparent via-surface-tertiary to-transparent content-[''];
	animation-direction: var(--skeleton-animation-dir, normal);
}

.skeleton--shimmer:has(.skeleton)::after {
	content: none;
}

.skeleton--shimmer:has(.skeleton)::before {
	@apply absolute inset-0 z-10 pointer-events-none mix-blend-overlay -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-skeleton content-[''];
	animation-direction: var(--skeleton-animation-dir, normal);
}

.skeleton--shimmer:has(.skeleton) .skeleton::after {
	content: none;
}
```

Verified values: duration **2s**, timing **linear**, **infinite**. The keyframe goes from the element's `-translate-x-full` start to `translateX(200%)`. Gradient: transparent → `--surface-tertiary` → transparent; group mode is `white/50` + `mix-blend-overlay`. These match HeroUI `skeleton.css` / `theme.css` exactly. herocn-only addition: RTL reverses direction via `--skeleton-animation-dir`. The herocn `skeleton.tsx` also offers `animate-pulse` (Tailwind `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`). HeroUI's `--skeleton-animation` token is NOT FOUND in herocn.

## 3. Per-component motion in herocn (Base UI)

herocn animates overlays with **CSS transitions** on Base UI's `data-starting-style` / `data-ending-style` attributes (not keyframes). The common overlay easing is `ease-[cubic-bezier(0.22,1,0.36,1)]`.

| Component | Enter | Exit | Notes |
|---|---|---|---|
| Dialog / AlertDialog overlay | `transition-opacity duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]`, from `opacity-0` | `data-ending-style:duration-100`, to `opacity-0` | bg `bg-black/50`, dark `bg-black/60`; blur variant `backdrop-blur-md` |
| Dialog / AlertDialog popup | `transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]`, from `opacity-0 scale-[1.05] translate-y-[calc(-50%+0.25rem)]` | `duration-100`, to `opacity-0 scale-[0.95]` | Dialog adds nested-dialog scaling (`--nested-dialogs`, herocn-only) |
| Popover, Tooltip, Select | `transition-[opacity,scale,translate] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]`, from `opacity-0 scale-[0.95]` + 0.25rem offset toward the trigger (`data-[side=top]:translate-y-1`, `bottom:-translate-y-1`, `left:translate-x-1`, `right:-translate-x-1`) | `duration-100`, to `opacity-0 scale-[0.95]` | `data-[instant=group]:transition-none` (popover/tooltip); Select `data-[align-trigger=true]:transition-none` |
| DropdownMenu, ContextMenu | same as Popover but from `scale-[0.9]` | same | menu items: `transition-[box-shadow]`, highlight = `data-highlighted:focus-ring` + `hover:bg-accent` |
| HoverCard, Combobox | tw-animate: `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95` + `slide-in-from-*-2`, `duration-100` | `data-closed:animate-out fade-out-0 zoom-out-95` | herocn keeps stock tw-animate keyframes here |
| Accordion panel | `transition-[height,opacity] duration-200 ease-out` from `h-0` (`data-starting-style:h-0`) to `h-(--accordion-panel-height)`, `data-open:opacity-100` | `data-ending-style:h-0` | chevron `transition-transform duration-250` |
| Tabs | indicator `transition-[translate,width,height] duration-200 ease-out` using Base UI `--active-tab-left/top/width/height`; trigger `transition-[color,box-shadow] duration-150 ease-out` | | HeroUI: indicator 250ms `--ease-out-fluid` |
| Sheet | overlay `transition-opacity duration-150`; panel `transition duration-200 ease-in-out` from/to `translate-[±2.5rem]` per side + `opacity-0` | same | |
| Drawer | `duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]`, swipe-aware durations `calc(var(--drawer-swipe-strength)*400ms)` | | Base UI Drawer only |
| Toast | `[transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms,box-shadow_150ms]`, from `translateY(calc(var(--toast-dir)*-150%))` | swipe exits `translateY(calc(var(--toast-swipe-movement-y)±150%))` | Base UI Toast only; stacking via `--toast-index`, `--peek`, `--scale` |
| Checkbox / Radio / Slider | `transition-[color,background-color,box-shadow,opacity…] duration-200`; radio indicator `transition-transform` | | |
| Switch | `transition-[color,background-color,box-shadow]` on the track, `transition-[margin]` on the thumb (Tailwind default 150ms) | | |
| Select chevron | `transition-transform duration-200 data-popup-open:rotate-180` | | |
| Progress | `transition-[width] duration-300 ease-out` | | |
| Spinner | `animate-spin duration-750` (= HeroUI `spin 0.75s linear infinite`) | | |
| Button, Toggle, Menubar trigger | `pressible` (+ `transition-all` on button/toggle) | | see §1 gotchas |
| Field-like inputs | `transition-[background-color,box-shadow,opacity,filter]` (Tailwind default 150ms) | | hover uses `brightness-97` / `dark:brightness-110` |

Full class strings for each component are in `reference/components/<name>.md`.

## 4. Radix projects: translating herocn's Base UI motion

Radix doesn't emit `data-starting-style` / `data-ending-style`, and Radix `Presence` only waits for **animations** (not transitions) before unmounting. In a Radix project, convert each herocn transition to the equivalent **tw-animate** classes on `data-open:` / `data-closed:` (shadcn's custom variants match Radix `data-state`). Values come from the herocn class string:

| herocn (Base UI) | Radix replacement |
|---|---|
| `transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-starting-style:opacity-0 data-starting-style:scale-[1.05] data-starting-style:translate-y-[calc(-50%+0.25rem)] data-ending-style:opacity-0 data-ending-style:scale-[0.95] data-ending-style:duration-100` (dialog) | `ease-[cubic-bezier(0.22,1,0.36,1)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-105 data-open:slide-in-from-bottom-1 data-open:duration-250 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:duration-100` |
| overlay `transition-opacity duration-150 … data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-100` | `data-open:animate-in data-open:fade-in-0 data-open:duration-150 data-closed:animate-out data-closed:fade-out-0 data-closed:duration-100` |
| popover/tooltip/select `… duration-150 … data-starting-style:scale-[0.95]` + side offsets `translate-?-1` | `ease-[cubic-bezier(0.22,1,0.36,1)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:duration-150 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:duration-100` |
| dropdown/context menu (same, `scale-[0.9]`) | as above with `data-open:zoom-in-90` |
| accordion `transition-[height,opacity] … data-starting-style:h-0 data-ending-style:h-0 h-(--accordion-panel-height)` | `data-open:animate-accordion-down data-closed:animate-accordion-up` (shadcn keyframes read `--radix-accordion-content-height`) plus `duration-200 ease-out` |
| `origin-(--transform-origin)` | `origin-(--radix-<primitive>-content-transform-origin)` (e.g. `--radix-popover-content-transform-origin`, `--radix-select-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin`, `--radix-tooltip-content-transform-origin`) |
| `max-h-(--available-height)`, `w-(--anchor-width)` | `max-h-(--radix-<primitive>-content-available-height)`, `w-(--radix-select-trigger-width)` / `--radix-popover-trigger-width` |
| `data-popup-open:` (trigger) | `data-open:` (Radix triggers carry `data-state="open"`) |
| `data-starting-style:` / `data-ending-style:` anything else | no Radix equivalent: drop it and use the tw-animate pattern above |

`zoom-in-105`, `zoom-in-90`, `slide-in-from-*-1` and `duration-*` / `ease-[…]` are standard tw-animate-css 1.4 / Tailwind v4 utilities (tw-animate reads `--tw-duration` and `--tw-ease`). Values are herocn's. Only the mechanism changes (transition → keyframe animation), so the exit animation plays under Radix Presence.
