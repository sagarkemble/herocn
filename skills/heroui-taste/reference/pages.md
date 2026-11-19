# Page notes (heroui.com, Nov 2026)

Use with `taste.md`. Numbers are **desktop observations** (~1400px wide). If herocn already has a utility for the same job, use that utility. If a number is not here and not in CSS, **NOT FOUND**.

## Home — https://heroui.com/

Header 64px sticky, transparent. On colourful walls it becomes a **centred floating pill** (wordmark + nav + Get started; GitHub count drops). Wordmark left on the hero. Nav: Products, Docs, Resources, Enterprise. Right: star count + Get started (inverse pill).

**Hero.** Centred. Display H1 with inline glyphs replacing words; second phrase muted. Subcopy one line, muted, ~16/24, ~max-w-2xl. Two CTAs: inverse “Browse components”, default “Explore HeroUI Pro →”. Then logo marquee under “Trusted by teams and builders at” (14px muted heading).

**Products (`#products`).** Eyebrow “Products”. Split: 48px display left (“All you need to ship / beautiful interfaces.”), short paragraph right. Then a **product wall**: overlapping app frames (calendar, color picker, music, copilot, menu). Below, four captions in a row; the expanded product (Open Source) gets 2–3 lines + “Browse components →”. Others stay title + one muted clause.

**Open source (`#open-source`).** Glyph + “HeroUI Open Source” eyebrow. Display “One look, / on web and mobile.” (second line muted). Body on the right. Then dual web/native device mocks and copy-prompt / theme toys. The mock is the section.

**Pro (`#pro`).** Display “Move faster / with HeroUI Pro.” Then a **bento of named blocks** (Command, Kanban, Stats…) — product names as labels, not generic “Feature 1”. Then “Start closer to finished.” with a full dashboard mock, theme chips under it (Glass / Mouve / Brutalism / Default), then **four icon wells** (Premium components, Full templates, Design systems, Web and mobile) and dual CTAs (accent “Explore HeroUI Pro” + default “View pricing”).

**Agents.** Display “Turn every product into / an AI-native experience.” Banking-copilot mock + tab row (Banking, Maps, Shopping…). Four icon wells + dual CTAs (accent “Request access” + default “View all examples”).

**HeroSpace.** Display “Everything that matters, / in one workspace.” Floating rounded screenshot of mail/tasks. Four wells + dual CTAs.

**AI workflow.** Accent eyebrow “AI tooling”. Display “Supercharge your / AI workflow.” (skills/MCP pitch). Keep this **short**; it is a bridge, not another dashboard.

**Community.** Display “Built in the open. / Shaped by the community.” Huge metric (e.g. downloads) with a sparkline wallpaper, then smaller proof tiles (stars, YC, Discord).

**Testimonials.** Accent eyebrow. Display “In their words.” One muted subline. **Masonry quote cards** on `surface`; **bold a phrase** inside the quote. Avatar + name + network icon. Not a 3-equal slider.

**Blog.** Display “From the blog. / Guides and updates.” Cards with image/title — quieter than testimonials.

**Closing.** Larger display (~64px) “Ready for you / and your agents.” plus CTAs. Footer: 6 columns (React, Native, Pro, Agents, For coding agents, Company), compliance badges, social, copyright, dashed giant “hero” outline at the bottom.

### Landing boredom (what to fix on herocn)

Bored = same-height cards, no product wall, display type the same size as section titles, header that never becomes a pill, CTAs that are all primary blue, copy that explains components instead of showing a running UI.

## Docs — https://heroui.com/docs/react/…

**Chrome.** Wordmark + version menu. Web / Native segment. Icon cluster: search, ask AI, GitHub, language, chat, theme, design-theme. Sidebar groups: Getting Started, Handbook, UI for Agents, then component categories.

**Article.** H1 = page name. One muted subtitle. Title-row tools. H2s are short (`Usage`, `Examples`, `Customization`, `API Reference`).

**Component page (Button).** Usage: live specimen centred in a tall rounded canvas; copy + View code on the canvas; code block flush under. Then Examples as stacked canvases (Variants, Sizes, icons…). Customization and API are **after** the toys. Related links at the end, including Pro siblings — herocn can omit Pro.

**Catalog** (`/docs/react/components`). H1 “All Components (React)” + one sentence. Segment All / Free / Pro + filter field. Category H2s. 3-column **specimen tiles**: empty canvas, one control in the middle, name below, PRO badge on the name row.

**Design principles** (content, not chrome): semantic intent over visual style; accessibility as foundation; composition over configuration; progressive disclosure; predictable sizes/variants; type safety; styles separated from logic. When writing herocn docs copy, keep this **tone** (short, imperative, table of variants) without copying their examples verbatim.

**DESIGN.md / AGENTS.md** in the sidebar are agent files with a PREVIEW chip. herocn analog: this skill + `/docs/skills`. Do not iframe their DESIGN.md.

## Themes — https://heroui.com/themes

Full-bleed playground. Top: back/undo cluster, centred app tabs, theme/AI/share/code. Main: dense but airy **component collage** on `background` (forms, OTP, buttons, listbox, cards) — this is how they prove the theme, not a settings form. Bottom bar: Accent, Base, Font family, Radius, Radius form, Theme. herocn `/themes` should keep this **editor-as-product** taste; do not turn it into a docs article.

## Pricing / blog / showcase

Pricing: big plan names, one price, checklist, quiet renewal note. FAQ accordion. Not needed for herocn unless you add a pricing surface.

Blog: editorial, not the design-system preview. Showcase: proof, same quiet cards as testimonials.

Skip cloning Pro marketing density on the open-source herocn home; keep the **rhythm** (show UI, then 4 wells, then two CTAs).
