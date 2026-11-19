export const SKILLS_REPO = "sagarkemble/herocn";

export const skills = [
  {
    name: "shadcn-to-heroui",
    title: "shadcn → HeroUI look",
    description:
      "Restyle an existing shadcn/ui project so it looks and feels like HeroUI v3, without leaving shadcn. Tokens, radii, rings, and press motion. Keeps every export and primitive.",
    bullets: [
      "Edits globals.css and components/ui class tables from the bundled reference.",
      "Radix stays Radix; Base UI stays Base UI. Never invents values.",
      "Optional shortcut: install @herocn from the registry when the project is Base UI + Tailwind v4 and overwrite is OK.",
    ],
    prompts: [
      "Restyle this shadcn project to look like HeroUI.",
      "Run the shadcn-to-heroui skill on this repo.",
    ],
    install: `npx skills add ${SKILLS_REPO} --skill shadcn-to-heroui`,
    zipHref: "/skills/shadcn-to-heroui.zip",
  },
  {
    name: "heroui-customize",
    title: "HeroUI theme → your tokens",
    description:
      "Re-theme a project that already has the HeroUI look. Ask for one source: a /themes link, pasted View code CSS, or a preset such as Uber, Spotify, or Discord. Values match the theme editor.",
    bullets: [
      "Requires --surface, --primary-soft and pressible in globals.css (run shadcn-to-heroui first if they are missing).",
      "theme-to-css.mjs prints the same CSS as the View code panel; merge-tokens.mjs writes it in place.",
      "Maps raw HeroUI names (--accent → --primary) and never fills in missing values.",
    ],
    prompts: [
      "Apply the Spotify preset with heroui-customize.",
      "Use this theme link from https://herocn.sagarkemble.dev/themes on my project.",
      "Paste this View code CSS into globals.css with heroui-customize.",
    ],
    install: `npx skills add ${SKILLS_REPO} --skill heroui-customize`,
    zipHref: "/skills/heroui-customize.zip",
  },
  {
    name: "visualize-design-system",
    title: "Landing + design system previews",
    description:
      "Ask whether to add a demo landing at /demo-landing and/or the theme builder at /design-system (dashboard, mail, chat, finances, CRM). Works with any shadcn registry. Does not restyle components/ui.",
    bullets: [
      "Asks first; never overwrites the homepage.",
      "Copies the herocn landing and /themes builder, then rewrites cn imports and nav links.",
      "Adds missing shadcn primitives from the project's own registry.",
    ],
    prompts: [
      "Add the design system theme builder at /design-system.",
      "Add both /demo-landing and /design-system with visualize-design-system.",
    ],
    install: `npx skills add ${SKILLS_REPO} --skill visualize-design-system`,
    zipHref: "/skills/visualize-design-system.zip",
  },
] as const;

export type PublishedSkill = (typeof skills)[number];
