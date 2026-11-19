# HeroUI taste

Observed from https://heroui.com (home, docs, component catalog, theme builder, pricing/footer) in November 2026. This is **composition and personality**, not a token sheet.

Tokens, radii, rings, press: `skills/shadcn-to-heroui/reference/tokens.md` and `motion.md`. Official default-theme contract (semantic colour, 4px rhythm, radius scale): https://heroui.com/react/DESIGN.md — use as *principles*, never paste their raw oklch tables into herocn (we already have mapped tokens; never invent).

## One sentence

Calm near-black canvas, one loud display line, a live product in the middle, quiet supporting copy, and almost no chrome.

## Personality

HeroUI tastes like a **product studio**, not a component gallery.

- **Confident and sparse.** Headlines do the selling. Body is one or two sentences, muted.
- **Show the UI, don't describe it.** Every product claim sits under a real (or realistic) interface: calendar, chat, dashboard, mail, theme playground.
- **Soft geometry.** 8px base radius, 12px fields, pills for marketing CTAs and the scrolled header. Nested surfaces get a slightly smaller radius than the parent.
- **One accent.** Default accent is a clear blue. Status colours (success/warning/danger) only mean those things. Marketing primary on dark is often **inverse** (white fill) so the blue stays special.
- **Display vs UI.** Marketing display is a tight grotesque (live site: heroSans; herocn: Inter Tight). Everything else is Inter. Weight 500 for display, not 700.
- **Sentence case.** No all-caps section labels. Eyebrows are small, often accent-coloured or with a tiny glyph, never shouting.
- **Playful only in the hero.** Inline glyphs replace single words in the H1. After that, the page is serious.

If a layout could be a shadcn blocks template (equal cards, equal headings, equal icons, no product in frame), it is **not** HeroUI taste.

## Hierarchy (what is loud)

1. **Display statement** — two short lines, second line often muted. Desktop marketing H1 ~80px / 80px, weight 500, tight negative tracking. Section H2s ~48px / weight 500. Closing CTA display ~64px. (herocn: `--font-display`. Do not invent a new size; use existing display utilities.)
2. **Live product** — overlapping device frames, a dashboard in a rounded viewport, a chat panel. This is the section body, not a thumbnail.
3. **Muted support** — 16/24 Inter, `text-muted`, max width around a short measure (~42rem on the hero subcopy).
4. **Chrome** — last. Header is 64px, transparent, then a **floating pill** when it sits on colour. Icons in the docs top-right are quiet and same-weight.

Eyebrows (“Products”, “Testimonials”, “AI tooling”) are 14px, medium, either muted or accent — never competing with the display line.

## Placement

**Marketing**

- Sticky wordmark left. Desktop: centred nav (Products / Docs / Resources). Right: social proof (GitHub count) + one Get started pill.
- Hero is **centred**, not a split screenshot. CTAs sit under the subcopy, not in the header.
- After the hero: a logo marquee (“Trusted by…”) as quiet proof, then a **split band**: display left, two-line explanation right.
- Product wall: 3–4 overlapping previews that **bleed under the header**. Captions are a row of titles; only the active product gets a long description + text link.
- Feature rows: **one giant mock, then a 4-column grid** of icon-in-circle + title + two lines, then **two pills** (strong + quiet).
- Footer: six sparse link columns, tiny social row, giant outlined wordmark as décor. Theme/chat as a small FAB — not a fat footer bar.

**Docs**

- Three columns: ~264px sidebar | readable article | ~228px TOC (xl). PROJECT.md already matches this; keep it.
- Title row: H1 + muted one-liner **plus** Copy prompt / prev / next on the right. The page is a tool, not a blog.
- **Preview first.** A large rounded canvas, component centred on empty surface, then a code block **attached** (same radius family, not a separate card island). “View code” is a small control on the canvas, not a tab that hides the preview.
- Sidebar: grouped, 14px, Web/Native segment under the wordmark, PREVIEW chips on agent files. Active item is a soft pill, not a bright fill.
- Catalog: 3-up live mini-canvases, label underneath, small PRO badge. Filter chips (All / Free / Pro) + search on the same row as the first group heading.

**Themes**

- The playground **is** the page. Controls live in a bottom bar (Accent, Base, Font, Radius, Form radius, Theme). App-shell tabs (Components / Dashboard / Mail / Chat / Finances / CRM) are a centred segment, not a sidebar.

## Surfaces and depth

- Page = `background`. Cards = `surface`. Nested = `surface-secondary` / `tertiary`. Floating = overlay + overlay shadow.
- Dark marketing: almost no drop shadow. Separation is **value step** (canvas vs surface) and **hairline** (`border` / `separator`), used sparingly.
- Colourful product walls sit on gradients; the header becomes a frosted pill so it stays readable. Do not invent gradient stops — use existing landing wallpapers / CSS in this repo.
- Docs preview canvases are a single large surface, generous empty centre. Do not tile the canvas with a checkerboard or a toolbar forest.

## Motion

- Press scale on controls (`pressible`). Overlays ease out. Docs/landing chrome does not bounce.
- Motion **explains state** (press, open, theme switch), it is not a section entrance parade. Respect reduced motion.
- Logo marquee and sparkline stats can move slowly; headlines do not.

## Copy voice (structure, not slogans)

- Headlines are fragments you can snap: “One look, on web and mobile.” Second line often muted.
- Body never repeats the headline. It adds the mechanism.
- CTA pairs: verb + destination (`Browse components` / `Explore HeroUI Pro →`). Arrow on the quieter of the two, or on the outbound one.
- Docs H1 is the component name. The subtitle is one clause. Example headings are the variant (`Sizes`, `With Icons`), not “This is how you…”.

Do not copy heroui.com marketing sentences into herocn. Match **shape** (short display, muted support, dual CTA).

## Do

- Lead with a working (or inert) product frame, then name it.
- Split a display heading away from a short body at large breakpoints.
- Use one inverse/primary pill and one default/tertiary pill.
- Keep type jumps big: display vs muted 14–16px. Mid-size “card titles everywhere” is the bored look.
- Group with space first, separator second, border last.
- Let the scrolled marketing header collapse into a pill.
- Centre the specimen in docs/catalog tiles. Label below, not over.

## Don't

- Don't restyle `components/ui` from the page.
- Don't hardcode `gray-*` / hex when a semantic token exists.
- Don't put equal-weight icon+title+paragraph cards in a 3×N grid and call it a landing.
- Don't use more than one accent moment per viewport.
- Don't all-caps, don't heavy 700 display, don't drop-shadow soup on dark.
- Don't hide the live preview behind a Code tab as the default.
- Don't clone heroui.com photography, the four-bar logo, or heroSans.
- Don't invent spacing that isn't 4px-rhythm Tailwind already in the project.
