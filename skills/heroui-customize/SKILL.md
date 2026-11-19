---
name: heroui-customize
description: Re-theme a HeroUI-styled shadcn/ui project (one restyled with the shadcn-to-heroui skill or the @herocn registry) to a chosen theme - a theme link from herocn.sagarkemble.dev/themes, pasted CSS variables, or a preset such as Uber, Spotify, Airbnb, Netflix, Discord. Use when the user wants to change the accent/brand colour, base greys, radius or font of their HeroUI-look project, apply a theme preset, or paste theme CSS.
---

# HeroUI theme → your project's tokens

Changes **only token values** in the project's global CSS (`:root`, `.dark`, the `@theme inline` font line) plus, if needed, the font loader. Components, classes and app code are not touched.
Values come from the same engine as the **View code** panel of https://herocn.sagarkemble.dev/themes (HeroUI's theme-builder algorithm), bundled here as `scripts/theme-to-css.mjs`. Never type colour values yourself.

## Files

| File | Use |
|---|---|
| `scripts/theme-to-css.mjs` | `--url <theme link>` or `--preset <name>` → prints the exact View code CSS. `--list-presets`, `--json`. Node 18+, no dependencies. |
| `scripts/merge-tokens.mjs` | merges a theme CSS block into globals.css, validates it, maps raw HeroUI names, prints a change summary. `--dry-run`. |
| `reference/presets.md` | all presets with their values and theme links |
| `reference/token-names.md` | HeroUI → shadcn-to-heroui name mapping, radius ids, editor fonts |
| `LICENSE-heroui`, `LICENSE-herocn` | licences of the ported theme maths and the herocn token names |

Run the scripts with the path of this skill folder, e.g. `node .cursor/skills/heroui-customize/scripts/theme-to-css.mjs`. Below, `$S` = that `scripts/` folder.

## Hard rules

1. **Never invent values.** Every token value comes from the script output or from the CSS the user pasted. If something is missing, say so (NOT FOUND); don't fill it in.
2. **Tokens only.** Edit only the global CSS file (`components.json` → `tailwind.css`, usually `app/globals.css`) and, for a font change, the font loader (`app/layout.tsx` or similar). Keep every app-specific variable.
3. **Ask, don't guess** which theme. Never pick a preset on the user's behalf.

## Procedure

### 1. Check the project is HeroUI-styled
Find the global CSS file. It must have the herocn tokens: `--surface`, `--default`, `--primary-soft` and `@utility pressible`. If they're missing, **stop**. Tell the user to run the `shadcn-to-heroui` skill first (or, on a Base UI project, `npx shadcn@latest add @herocn/style`), then come back.

### 2. Ask the user for ONE theme source
Ask in chat (one message), for example:
> Which theme should I apply? Send one of:
> 1. a theme link from https://herocn.sagarkemble.dev/themes (tune it there, then copy the URL),
> 2. the CSS from that page's **View code** panel (or any `:root { … }` / `.dark { … }` token block), or
> 3. a preset name: Default, Sky, Lavender, Mint, Netflix, Uber, Spotify, Coinbase, Airbnb, Discord, Rabbit.

Wait for the answer. If the user already gave one in their request, use it without asking.

### 3. Get the theme CSS
- **Link** → `node $S/theme-to-css.mjs --url "<link>" > /tmp/heroui-theme.css`. Quote the URL. The query (`hue`, `chroma`, `lightness`, `base`, `radius`, `formRadius`, `fontFamily`, `vibrantPalette`) is the whole theme; a link with no query is the Default theme. Invalid params fall back to their defaults exactly like the page; tell the user if the link had none of these params.
- **Preset** → `node $S/theme-to-css.mjs --preset "<name>" > /tmp/heroui-theme.css` (case-insensitive). Unknown name → the script lists the valid ones; show them and ask again.
- **Pasted CSS** → write it **verbatim** to `/tmp/heroui-theme.css`. Don't edit values. The merge script accepts our names (`--primary`, …) and raw HeroUI names (`--accent` = brand, `--field-background`, `--overlay`, `--danger`, …; see `reference/token-names.md`). In HeroUI `--accent` is the brand colour, so never copy `--accent` across by name yourself.

### 4. Merge
1. `node $S/merge-tokens.mjs --into <globals.css> --css /tmp/heroui-theme.css --dry-run`
2. If it reports errors (no `:root`, missing `--primary`/`--background`/…, invalid values, project not HeroUI-styled), fix the cause or ask the user for a complete block. Don't hand-patch values.
3. Run it again without `--dry-run`. What it does:
   - replaces the value of each theme token in the top-level `:root` and `.dark` blocks, in place; appends theme tokens the file lacks; leaves every other variable alone;
   - font: if `@theme inline` has `--font-sans: var(--font-…)` (next/font), leaves it and reports the family the theme wants (step 5); otherwise sets `--font-sans` and adds the theme's `@import url(…)` at the top;
   - a form radius that isn't the default (radius × 1.5) becomes a marked `--field-radius` block at the end of the file (replaced or removed on re-runs);
   - lists skipped names (HeroUI-only variables like `--field-border`, unknown names). Show those to the user.

### 5. Font
Do this only when the theme's family (the `@theme inline --font-sans` line of the theme CSS, or the script's `--json` → `font.family`) differs from the font the project loads now.
- **next/font** (e.g. `const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })`): swap the loader for the new family, keeping the same `variable` and where it's applied. The import name is the family with spaces as underscores (`Hanken Grotesk` → `Hanken_Grotesk`). Check it exists in `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`; if that family has no variable axis, pass the `weight` list from that file. A custom font URL that isn't Google: use the `@import url(…)` line from the theme CSS instead and set `--font-sans` to the family name.
- **No next/font**: the merge already wrote the `@import` and `--font-sans`. Nothing else to do.
- If you can't wire the font, keep the current one and tell the user which family the theme expects.

### 6. Verify
- Run the build and typecheck (`npm run build`, `npx tsc --noEmit`). Fix only errors you caused.
- Light and dark: buttons use the new primary, soft badges/alerts follow it, focus rings use `--ring`, greys follow `base`.
- Optional exact check: open the same link (or preset) on https://herocn.sagarkemble.dev/themes → View code; the `:root`/`.dark` values must equal the merged ones.

### 7. Report
Theme source (link / preset / pasted), the merge summary (changed / added / unchanged / skipped tokens, light and dark), font result, form-radius block yes/no, build/typecheck results, anything NOT FOUND.

## Notes
- The Default theme from the editor is computed by HeroUI's algorithm, so its values differ slightly from the static herocn tokens the `shadcn-to-heroui` skill pastes. That's expected; to go back to the static herocn look, re-run step 2 of `shadcn-to-heroui`.
- `--chart-1..5` are the same fixed values in every theme's View code block, so merging sets them to those values.
- Theme maths: HeroUI theme builder (Apache-2.0, heroui-inc/heroui @ `08d4f13`, see `LICENSE-heroui`). herocn look: MIT, © 2026 Maqed (`LICENSE-herocn`). Keep both files when redistributing.
