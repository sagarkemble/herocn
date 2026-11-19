# Handoff: Pass 5 "docs pages" (heroui.com/docs/react/components clone) in s2h-landing

Status: built and verified on the box, **NOT committed**. Last tsc run: 0 errors. The last `next build` + restart of `next start -p 3103` was interrupted, so rebuild and restart it.
Box repo: /workspace/s2h-landing (Next 16.4.5 Turbopack, Tailwind v4, Base UI shadcn restyled by the shadcn-to-heroui skill). Another worker is building /themes in the same repo (app/themes/, lib/theme-editor/). Don't touch or commit those.

## Original requirements (user t27u + parent brief)
- 1:1 clone of HeroUI React component docs (reference page: https://heroui.com/docs/react/components/button). Use ONLY our components/ui/* for the chrome and the previews. No skill-style overrides on components (see /workspace/landing-audit.md); layout classes are fine. Don't copy heroui.com assets.
- One page per component (64 = the skill's reference/components/*.md). For HeroUI equivalents, mirror HeroUI's example sections, adapted to our props. Never invent variants.
- Include only: title, description, live interactive previews, and code for each example. Skip: Copy prompt, Web/Native, language switcher, install/CLI, API/props tables, anatomy, a11y prose.
- ⌘K search (our Command). Routes: /docs/react/components/<slug>; /docs redirects to the first component. Docs link in the landing header. Dark mode.
- Verify: typecheck, build, zero console errors (no hydration errors or nested buttons) on light, dark and 390 mobile. Side-by-side shots vs heroui.com into /workspace/docs-shots/.
- Git: one commit, only your paths: `git add <paths>`, then `git -c user.name=box -c user.email=box@local commit -m "Pass 5: docs pages"`. Never touch the skill folder.

## What's done
- **components/ui:** 37 new files (all 64 now exist): alert-dialog alert aspect-ratio attachment breadcrumb bubble button-group carousel code-block collapsible combobox context-menu direction drawer dropdown-menu empty field hover-card input-otp item marker menubar message-scroller message native-select pagination popover questionnaire radio-group resizable scroll-area sidebar skeleton spinner surface toast trace.
  - Each one is the skill's "Target file" (herocn source) from /workspace/shadcn-to-heroui/reference/components/<name>.md, with imports rewritten `@/registry/new-york-v4/ui/` → `@/components/ui/`.
  - The extractor is /workspace/docs-work/extract.py; its output went to /workspace/docs-work/ui/.
  - The existing 27 ui files are untouched.
- **New support files:** hooks/use-mobile.ts, hooks/use-highlighted-code.ts and lib/highlighter.tsx (herocn, for the code-block examples).
- **Dependencies added** (package.json + package-lock.json): @shadcn/react@0.3.1, embla-carousel-react ^8.6, input-otp ^1.5, react-resizable-panels ^4.14.5, shiki ^4.5.
- **components/docs/:**
  - **examples/*.tsx:** 425 live examples, generated. They are herocn MIT docs examples (research/herocn/apps/docs/src/registry/new-york-v4/examples), with imports rewritten, "use client" prepended, /avatars → github avatar URLs, and /docs/components/* → /docs/react/components/*.
  - **examples-extra/:** handwritten examples plus manifest.json:
    - Button gets HeroUI's sections: Icon Only, Loading, Loading State, Full Width, Disabled State, Social Buttons, and the usage "Click me".
    - Card gets With Avatar and With Form.
    - Direction gets RTL and LTR demos.
  - **Generated registry:** data.json, previews/<slug>.tsx (map name → component) and loaders.ts (slug → dynamic import).
  - **Hand-written:**
    - data.ts: types, groups, ordered, tocFor, slugify, docsHref.
    - highlight.ts: shiki on the server, with custom light/dark themes using token colours measured from heroui.com. Also readExample() reads the example source as the code shown.
    - component-preview.tsx: client demo frame with a 120px code peek, View code / Hide code (Button outline xs), and copy (Button ghost icon-sm).
    - shell.tsx: the grid. sidebar.tsx and nav.tsx: plain-anchor nav that keeps the active item scrolled into view, inside our ScrollArea. topbar.tsx: desktop 72px icon bar, plus a mobile 56px header with a Sheet nav. search.tsx: CommandDialog with ⌘K/Ctrl+K and router.push. toc.tsx: scroll-spy. logo.tsx: text wordmark.
- **Generator:** /workspace/docs-work/sections.py parses herocn mdx (research/herocn/apps/docs/content/docs/components/*.mdx) into sections.json. Then /workspace/docs-work/gen.py writes examples/, previews/, data.json and loaders.ts, and merges examples-extra/manifest.json.
  - Rerun: `cd /workspace/docs-work && python3 sections.py >/dev/null && python3 gen.py`
  - Sections are normalised: everything goes under h2 "Examples" with h3 per example. Herocn h2 groups that have their own h3s (Align, Your First Chart, Syntax Highlighting) are kept. RTL sections are dropped.
- **app/docs/:**
  - layout.tsx imports docs.css: the --docs-* vars as color-mix of our tokens, plus shiki dual-theme and line-number CSS.
  - page.tsx and react/components/page.tsx redirect to /docs/react/components/button.
  - react/components/[slug]/page.tsx: SSG via generateStaticParams with dynamicParams=false. It renders h1, description, prev/next (buttonVariants tertiary icon-sm), Usage, then sections.
- **components/landing/header.tsx:** Docs menu → "HeroUI React" has href /docs; the mobile sheet "Docs" is an `<a href="/docs">` with buttonVariants ghost.
- **Pages:** all 64 render. The ones with few examples are label, navigation-menu, scroll-area, surface (1 each) and message-scroller (2). No page is a stub. In total 64 pages, 425 previews.

## Measured heroui.com values (1440px, light)
- **Grid columns:** 264 | 28 | 892 | 14 | 228 | 14. Ours: `xl:grid-cols-[264px_minmax(14px,2fr)_minmax(0,892px)_minmax(7px,1fr)_228px_14px]`.
- **Sidebar:** px-3 pt-5. Header: logo h-8 + version (13px, subtle).
- **Sidebar items:** 13px/18px medium, min-h-7, px-2, py-[5px], rounded-lg. Hover bg: fg 3% into bg. Active bg: 5% (dark: 6% / 11%).
- **Group label:** 13px/18px medium, subtle, h-7, px-2, mt-2.
- **Top bar:** sticky h-72, cols 2..end, icons right with pe-10. Icons are 32px tertiary pills with gap 8.
- **Article:** px-8, pt-22 (88; ours is a 72 bar plus pt-4), pb-16. Header section: mb-6, gap-3.
  - h1: 36/40 semibold, tracking -0.022em (28/36 on mobile).
  - Description: 16/24, muted, max-w-560.
- **Headings:** h2 20/28 semibold, -0.3px. h3 16/24 semibold, -0.16px.
- **Spacing:** header → first h2 40. h2 → preview 16. h3 → preview 8. Preview → h3 32. Preview → h2 40. Ours uses block flow with collapsing margins: h2 mt-10 mb-4, h3 mt-8 mb-2, preview mb-6.
- **Demo frame:** rounded-[20px], p-2, bg --docs-demo (fg 3% into bg; dark 10%). Inner preview: rounded-[14px], bg-background, min-h 220, p-4 sm:p-8, centred. Button's usage is 340 only because HeroUI shows a playground panel; we use 220 everywhere.
- **Code peek:** max-h 120, gradient h-24, "View code" pill h-7 rounded-full at bottom-5. Expanded: max-h 600 and "Hide code".
- **Code text:** Geist Mono 13/22, py-3.5. Line numbers in a ~24px column, code at x≈56 from the frame edge.
- **Shiki colours:** default #52525B/#A1A1AA, keyword #D6336C/#F38BA8, string #0369A1/#7CC4FF, function and attribute #7C3AED/#C4B5FD.
- **TOC:** column 228, ps-4, pe-5, pt-24. Title 13/18 medium subtle. Links 13/20, min-h-6, py-0.5, nested ps-3. Active: font-medium, text-foreground.
- **Below 1280:** no TOC. **Below 768:** 56px header, sidebar hidden.

## Verification already done (on the build before the last 2 tweaks)
- tsc 0 errors. next build OK (70 static pages).
- Console sweep of all 64 pages × light, dark and 390 mobile: **0 errors or warnings** (scripts: /workspace/docs-work/check.py, interact.py).
- Nested interactive check (button>button, a>a, etc.) is 0 on button, dialog, select, calendar, sidebar, tabs and accordion.
- View code / Hide code works, Ctrl+K → "dialog" → Enter navigates, dialogs open, and the mobile Sheet nav navigates.
- Side-by-side shots: /workspace/docs-shots/{button,select,tabs}-side-by-side-{light,dark}.png (plus the -ours and -heroui singles). These were taken before the min-h 220 change.

## Remaining steps (in order)
1. Rebuild and restart:
   ```
   cd /workspace/s2h-landing && npx tsc --noEmit && npx next build
   ```
   Then kill whatever listens on 3103 (`ss -ltnp | grep 3103`) and run `nohup npx next start -p 3103 &`.
   - The last 2 edits are not built yet: nav.tsx scroll-active-into-view, and component-preview min-h 220 for all previews (plus a data-usage attr).
2. Re-run `python3 /workspace/docs-work/check.py <slugs> light,dark,mobile sweep`, `interact.py` and `sbs.py` (which rewrites /workspace/docs-shots).
3. Optional polish:
   - Button usage playground (variant Select + size ToggleGroup + Reset), as on heroui.com.
   - More HeroUI-named sections for other HeroUI equivalents. Each one must use only existing props.
   - Centre wrapped example rows.
4. Commit only these paths:
   ```
   git add app/docs components/docs components/ui/<the 37 new files> hooks/use-mobile.ts hooks/use-highlighted-code.ts lib/highlighter.tsx components/landing/header.tsx package.json package-lock.json
   git -c user.name=box -c user.email=box@local commit -m "Pass 5: docs pages"
   ```
   - Don't add app/themes or lib/theme-editor.
   - Retry if you hit index.lock.
   - Check package.json/package-lock.json for themes-worker changes before adding them.
5. Sync to the Mac the same way as before: git bundle → CopyFromBox into ~/Documents/projects/on-going/heroui-landing-demo/.git/ → `git pull --ff-only`.

## Known issues, skipped items and NOT FOUND
- **Skipped** because they need the `ai` / @ai-sdk / motion / chrono / embla-autoplay deps: code-block-demo/header/floating/show-more/size/tabs/message, all message-scroller examples except group-chat and opening-position, trace-demo/thinking/tool-calls, carousel-plugin, date-picker-natural-language.
- **Skipped** select-variants, select-surface and button-group-select: our select.tsx has no `variant` prop (the skill kept the stock root). This is not a skill bug.
- **Direction** has no herocn docs page, so its demos are handwritten.
- **Date-picker** (a herocn composite page) is not included, since it's not one of the 64 component files.
- **Docs header:** heroui.com docs have no landing-style header (logo sits in the sidebar, icon bar on the right), so the docs copy that and don't reuse the landing header. The logo is our text wordmark plus a "shadcn · skill" label instead of a version.
- **Non-component chrome:** sidebar and TOC text links are plain anchors with docs classes (heroui.com's nav isn't a component either). Every control is our Button, Command, Sheet or ScrollArea, with no style overrides.
- **"View code" pill:** uses our Button outline xs. HeroUI's is a white ghost pill, and we have no matching variant.
- **Images:** examples load external avatar and unsplash images.
