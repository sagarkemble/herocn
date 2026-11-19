import Link from "next/link";

import {DocsH1, DocsH2, DocsLead, DocsList, DocsP} from "@/components/docs/article";
import type {TocItem} from "@/components/docs/data";
import {DocsShell} from "@/components/docs/shell";
import {DocsToc} from "@/components/docs/toc";
import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const metadata = {
  title: "Introduction - herocn docs",
  description: "herocn restyles shadcn/ui (Base UI, nova) to a HeroUI v3 look. Registry and agent skills, not an npm component library.",
};

const toc: TocItem[] = [
  {id: "what-it-is", title: "What herocn is", depth: 2},
  {id: "what-it-is-not", title: "What it is not", depth: 2},
  {id: "paths", title: "Three paths", depth: 2},
  {id: "faq", title: "FAQ", depth: 2},
];

const paths = [
  {
    href: "/docs/installation",
    badge: "Registry",
    title: "Install @herocn",
    description: "Point components.json at the registry and add restyled primitives. Best when the app is already Base UI + Tailwind v4.",
  },
  {
    href: "/docs/skills/shadcn-to-heroui",
    badge: "Skill",
    title: "Restyle in place",
    description: "Run shadcn-to-heroui. Default path for Radix apps, or when you must not overwrite components/ui.",
  },
  {
    href: "/docs/react/components/button",
    badge: "Preview",
    title: "Browse components",
    description: "Every restyled primitive with live examples. Same files the registry ships.",
  },
] as const;

export default function DocsIntroductionPage() {
  return (
    <DocsShell toc={<DocsToc items={toc} />}>
      <section className="mb-6 flex flex-col gap-3">
        <DocsH1>Introduction</DocsH1>
        <DocsLead>
          herocn is how you keep shadcn and still look like HeroUI v3. The CLI copies source into your app. Nothing is published as an npm component package.
        </DocsLead>
      </section>

      <DocsH2 id="what-it-is">What herocn is</DocsH2>
      <DocsP>
        A Next.js demo, a shadcn registry at <code className="font-mono text-foreground">@herocn</code>, and four agent skills. Primitives stay{" "}
        <code className="font-mono text-foreground">@base-ui/react</code>. Tokens, radii, rings, and press motion change so the kit reads as HeroUI v3.
      </DocsP>
      <DocsList>
        <li>Open code — you own the TSX after install.</li>
        <li>Same exports and props as stock shadcn nova.</li>
        <li>Canonical files live in this repo at <code className="font-mono text-foreground">components/ui</code>.</li>
      </DocsList>

      <DocsH2 id="what-it-is-not">What it is not</DocsH2>
      <DocsList>
        <li>Not HeroUI itself. We do not depend on <code className="font-mono text-foreground">@heroui/react</code>.</li>
        <li>Not a living npm library. Updates arrive when you run the CLI or the restyle skill again.</li>
        <li>Not a primitive swap. Radix stays Radix; Base UI stays Base UI.</li>
        <li>Not a copy of heroui.com assets. Glyphs and wallpapers here are original.</li>
      </DocsList>

      <DocsH2 id="paths">Three paths</DocsH2>
      <DocsP>Pick one onboarding path. You can mix them later (registry for nova, skill for Radix, docs for preview).</DocsP>
      <div className="mb-8 grid gap-3 sm:grid-cols-1">
        {paths.map((path) => (
          <Link
            key={path.href}
            href={path.href}
            className="rounded-3xl outline-none focus-visible:focus-ring"
          >
            <Card size="sm" className="transition-colors hover:bg-surface-secondary">
              <CardHeader>
                <Badge className="w-fit">{path.badge}</Badge>
                <CardTitle>{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <p className="mb-4">
        <Link href="/docs/installation" className={buttonVariants()}>
          Install the registry
        </Link>
      </p>

      <DocsH2 id="faq">FAQ</DocsH2>
      <h3 className="mt-6 mb-2 font-semibold text-foreground text-base">Is this an npm install?</h3>
      <DocsP>
        No. Use <code className="font-mono text-foreground">npx shadcn@latest add @herocn/button</code> after registering the URL, or run the restyle skill.
      </DocsP>
      <h3 className="mt-6 mb-2 font-semibold text-foreground text-base">Does it work with Radix shadcn?</h3>
      <DocsP>
        Yes via <Link href="/docs/skills/shadcn-to-heroui" className="text-foreground underline-offset-4 hover:underline">shadcn-to-heroui</Link>. The registry overwrite shortcut is Base UI + Tailwind v4 only.
      </DocsP>
      <h3 className="mt-6 mb-2 font-semibold text-foreground text-base">Where do colours come from?</h3>
      <DocsP>
        Static tokens in <code className="font-mono text-foreground">globals.css</code>. See{" "}
        <Link href="/docs/colors" className="text-foreground underline-offset-4 hover:underline">
          Colors
        </Link>{" "}
        and{" "}
        <Link href="/docs/theming" className="text-foreground underline-offset-4 hover:underline">
          Theming
        </Link>
        . Never invent values.
      </DocsP>
    </DocsShell>
  );
}
