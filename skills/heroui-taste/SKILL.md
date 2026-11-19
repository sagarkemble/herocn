---
name: heroui-taste
description: Apply HeroUI's product taste — page composition, placement, density, type hierarchy, docs chrome, and marketing rhythm — when rebuilding a landing page, documentation, or theme playground. Use when the components already look like HeroUI but the page still feels like generic shadcn. Not a restyle of components/ui.
---

# HeroUI taste (page composition)

The kit is already done. `shadcn-to-heroui` (and `components/ui/*` in this repo) is **how a Button looks**. This skill is **how a HeroUI *site* feels** — landing, docs, theme builder — so tweaks to those pages keep HeroUI's taste instead of a bored catalog.

HeroUI themselves split this the same way: `AGENTS.md` is how to build; [DESIGN.md](https://heroui.com/react/DESIGN.md) is default-theme visual language. This skill is the missing layer: **marketing + docs composition**, observed from https://heroui.com (Nov 2026). Do not paste their DESIGN.md. Do not copy their images, logos, wallpapers, or Britti/heroSans files.

In **herocn**, display type is **Inter Tight** (`--font-display`). Body/UI is **Inter** (`--font-sans`).

## Files

| File | Use |
|---|---|
| `reference/taste.md` | Personality, hierarchy, placement, do/don't. Read this first. |
| `reference/pages.md` | Page-by-page notes: home sections, docs chrome, catalog, themes, pricing/footer |

`$S` = this skill folder.

Companion skills (do not replace this one):

- `shadcn-to-heroui` — tokens and `components/ui` class tables
- `heroui-customize` — re-theme an already restyled app
- `visualize-design-system` — copy preview routes, not taste

## Hard rules

1. **Do not edit `components/ui/*`** for taste. If a primitive looks wrong, that is `shadcn-to-heroui`, not this skill.
2. **Do not override ui look from call sites** (radius, border, shadow, colour, padding, focus, motion). Layout-only classes are fine.
3. **Never invent token or colour values.** Use `app/globals.css` / `shadcn-to-heroui` `reference/tokens.md`. Missing value → **NOT FOUND**.
4. **Do not copy heroui.com assets** (photos, logos, wallpapers, commercial fonts). Original glyphs/gradients only.
5. **Do not nest** `<button>`/`<a>` in `<button>`/`<a>`. Docs/landing previews that look clickable stay `inert` plus a stretched trigger.
6. **One primary action per context.** Semantic variants: primary / secondary / tertiary. Accent is rare.
7. This skill **composes pages**. It does not add HeroUI as a dependency and does not swap Base UI.

## When to run

Use when the user is rebuilding or tweaking:

- marketing landing (`components/landing/*`, `/`)
- docs chrome or component pages (`components/docs/*`, `/docs`)
- theme builder chrome (`components/themes/*`, `/themes`)
- any marketing/docs surface that already has the HeroUI kit but feels generic

Skip if they asked to restyle primitives, change colours, or copy preview routes into another app.

## Procedure

### 1. Confirm the kit
If the project has no `--surface`, `--primary-soft`, or `@utility pressible`, stop and tell them to run `shadcn-to-heroui` first. Taste on stock shadcn tokens will not read as HeroUI.

### 2. Read the taste, then the page notes
Read `$S/reference/taste.md`. Then read only the matching section in `$S/reference/pages.md` (landing, docs, themes).

### 3. Name the gap
In one short paragraph, say what is already HeroUI (kit) and what is still generic (composition). Name the 1–3 taste moves you will apply (example: “split display + muted body”, “preview-first docs canvas”, “pill header over a product wall”). Do not start coding before this.

### 4. Compose with existing pieces
Prefer existing herocn landing/docs utilities and primitives (`display-statement`, `site-container`, `DocsShell`, Button variants, Surface/Card). Add layout structure, not new colours. If a spacing/type size is not in globals, landing CSS, or `pages.md`, write **NOT FOUND** and keep the current value.

### 5. Verify
Light and dark. Desktop and ~390px. Click through the changed flow. Check shared chrome (header, docs sidebar). Hunt nested buttons and hydration issues.

## Done when

The page uses the same primitives as before, but placement, type jump, product-as-hero, and docs preview-first rhythm match `reference/taste.md`. No new hardcoded greys. No copied HeroUI assets.
