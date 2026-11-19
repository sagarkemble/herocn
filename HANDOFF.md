# HANDOFF: continue in Cursor on the Mac

The remote assistant ("heroui" on Grok Bot) stopped mid-work because usage ran out. This commit is **WORK IN PROGRESS**. Read this first, then the two detailed files:

- `handoff/docs.md`: the docs pages (Pass 5). Almost done.
- `handoff/themes.md`: the theme editor (Pass 6). About 60% done.
- `handoff/landing-audit.md`: the audit of what counts as "overriding the skill" (rules for every page).

## Project context
- **Demo app (this repo):** Next.js 16 App Router, Turbopack, TypeScript, Tailwind v4, and shadcn/ui on Base UI (`@base-ui/react`) with the nova preset. Run it with `bun install && bun run dev`, or `bun run build && bunx next start -p 3103`.
- **Skill:** `~/Documents/projects/on-going/shadcn-to-heroui` (NOT under git). It restyles shadcn into HeroUI v3 using herocn (github.com/Maqed/herocn, MIT) as the primary source, with HeroUI v3.2.7 for spot-checks.
  - Tokens are in `reference/tokens.md`, motion in `reference/motion.md`.
  - Each component has a "Target file" in `reference/components/<name>.md`.
- **This page is the design-system PREVIEW** for wherever the skill is used:
  - Never override skill styles on `components/ui/*`: no radius, border, shadow, colour, padding, focus or motion changes via className. Layout classes (position, width, margin, gap, hidden) are fine.
  - If a component looks wrong, fix the skill's reference instead, and tell Sagar.
- **Rules from Sagar:**
  - Never invent values. Write NOT FOUND instead.
  - Don't copy heroui.com assets. Files from the HeroUI repo (Apache-2.0) are OK with attribution.
  - Make one git commit per pass, in this demo repo only, and never in the skill folder.

## History
| Pass | Commit | What |
|---|---|---|
| 1 to 3.1 | ...18226f4 | Landing page clone of heroui.com, plus hydration fixes |
| 4 | d888a84, ccbee89 | Sagar's own commits: calendar date fix, header pill, agent demos |
| 4.1 | 96d6a09 | Promo card back to the skill card style |
| 4.2 | 4260fdd | Removed 11 skill-style overrides (audit A items) |
| 5 (WIP) | this commit | Docs pages |
| 6 (WIP) | this commit | Theme editor |

## Current task (Sagar's request, summarised)
1. **Docs** at `/docs/react/components/<slug>`: a same-to-same copy of heroui.com/docs/react/components/* for ALL our components, web only.
   - **Show only what's needed for previewing:** title, description, Usage preview, then every example section HeroUI shows (variants, sizes, icons, loading, full width, disabled, and so on) as live previews, each with a Preview/Code toggle.
   - **Skip:** Copy prompt, the Web/Native switch, the language switcher, install blocks and API tables.
   - **Keep** the ⌘K search.
2. **Theme editor** at `/themes`: an exact clone of heroui.com/themes, matching both the visuals AND the behaviour.
   - The colour maths for base, accent, radius and fonts must produce the same values.
   - "View code" outputs our `globals.css` token block (`:root` and `.dark`), ready to paste.

## Status
- **Docs:** all 64 pages and 425 examples are built.
  - The last 2 small edits are not yet re-verified.
  - Skipped: the AI-library examples, 3 Select `variant` examples (our Select has no such prop) and the date-picker page.
- **Theme editor:** the engine in `lib/theme-editor/` is done and matches 1968/1976 live values. The 8 mismatches are a heroui.com vibrant-palette bug.
  - Most UI in `components/themes/` is done.
  - **Missing:** CSS injection, the code panel, the onboarding dialog, the mobile footer, the page shell, `app/themes/page.tsx` and the header link.
  - The build/typecheck may FAIL until those are written. That's expected.

## Next steps (in order)
1. Finish the theme editor following `handoff/themes.md` steps 1 to 11. Then typecheck, build, and run the Playwright value table against heroui.com.
2. Re-verify the docs following `handoff/docs.md`: typecheck, build, and a console-error sweep of all 64 pages (light, dark, 390px).
3. Make sure there are zero hydration errors, and no `<button>` inside `<button>` or `<a>` inside `<a>` (use `inert` previews plus a stretched trigger, as on the landing page).
4. Take side-by-side screenshots against heroui.com.
5. Amend or replace this WIP commit with clean commits: `Pass 5: docs pages` and `Pass 6: theme editor`. Delete `HANDOFF.md` and `handoff/` when done, or keep them as notes.

---
## UPDATE (Nov 19, 6:55 PM IST): skills work (latest, read this first)
The library is now the @herocn registry. Commits must use Conventional Commits (see `.cursor/rules`).
The current task is in **`handoff/skills.md`**: two agent skills, `skills/shadcn-to-heroui` (migrate) and `skills/heroui-customize` (theme link, pasted CSS or preset), plus publishing them on a `/docs/skills` page.
- **Done:** both skills are built. The customize script matches the theme page's View code in 41/41 cases. `scripts/build-skills.mjs` produces the zips in `public/skills/`.
- **Todo:** the `/docs/skills` page and its links, the `package.json` scripts, verification, and the e2e test on a fresh shadcn app. Then squash or replace the WIP commit with clean conventional commits.
