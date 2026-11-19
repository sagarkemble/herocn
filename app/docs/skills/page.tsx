import Link from "next/link";

import {DocsH1, DocsH2, DocsH3, DocsLead, DocsP} from "@/components/docs/article";
import {skillHref, type TocItem} from "@/components/docs/data";
import {DocsShell} from "@/components/docs/shell";
import {DocsToc} from "@/components/docs/toc";
import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton} from "@/components/ui/code-block";
import {skills, SKILLS_REPO} from "@/lib/skills";

export const metadata = {
  title: "Agent skills - herocn docs",
  description: "Install shadcn-to-heroui, heroui-customize, visualize-design-system, and heroui-taste.",
};

const toc: TocItem[] = [
  {id: "install", title: "Install", depth: 2},
  {id: "pipeline", title: "When to run which", depth: 2},
  {id: "skills", title: "Skills", depth: 2},
  {id: "mcp", title: "MCP", depth: 2},
];

const pipeline = [
  {
    name: "shadcn-to-heroui",
    step: "1. Restyle",
    body: "Tokens, radii, rings, press motion. Default for any shadcn app. Optional @herocn add only when Base UI + Tailwind v4 and overwrite is OK.",
  },
  {
    name: "heroui-customize",
    step: "2. Customize",
    body: "Re-theme an already restyled app from a /themes link, View code CSS, or a named preset.",
  },
  {
    name: "visualize-design-system",
    step: "3. Visualize",
    body: "Optional. Copy /demo-landing and/or /design-system into another app. Does not restyle components/ui. Asks first.",
  },
  {
    name: "heroui-taste",
    step: "4. Taste",
    body: "Page composition for landing, docs, and the theme playground when the kit already looks like HeroUI.",
  },
] as const;

const installAll = `npx skills add ${SKILLS_REPO}`;

export default function SkillsCatalogPage() {
  return (
    <DocsShell toc={<DocsToc items={toc} />}>
      <section className="mb-6 flex flex-col gap-3">
        <DocsH1>Agent skills</DocsH1>
        <DocsLead>
          Four Cursor / Claude / Codex skills. Restyle shadcn to the HeroUI look, apply a theme, copy preview routes, or compose pages. Install with the skills CLI, or download a zip on each skill page.
        </DocsLead>
      </section>

      <DocsH2 id="install">Install</DocsH2>
      <DocsP>Add the whole set, or pass --skill for one name.</DocsP>
      <CodeBlock className="mb-4">
        <CodeBlockActions>
          <CodeBlockCopyButton value={installAll} />
        </CodeBlockActions>
        <CodeBlockContent wrap>{installAll}</CodeBlockContent>
      </CodeBlock>
      <CodeBlock className="mb-6">
        <CodeBlockActions>
          <CodeBlockCopyButton value={`npx skills add ${SKILLS_REPO} --skill shadcn-to-heroui`} />
        </CodeBlockActions>
        <CodeBlockContent wrap>{`npx skills add ${SKILLS_REPO} --skill shadcn-to-heroui`}</CodeBlockContent>
      </CodeBlock>
      <DocsP>
        Update with <code className="font-mono text-foreground">npx skills update</code>. Source:{" "}
        <code className="font-mono text-foreground">{SKILLS_REPO}</code>.
      </DocsP>

      <DocsH2 id="pipeline">When to run which</DocsH2>
      <ol className="mb-8 flex list-none flex-col gap-3 p-0">
        {pipeline.map((item, index) => (
          <li key={item.name}>
            <Link href={skillHref(item.name)} className="block rounded-3xl outline-none focus-visible:focus-ring">
              <Card size="sm" className="transition-colors hover:bg-surface-secondary">
                <CardHeader>
                  <Badge className="w-fit">
                    {index + 1} · {item.step.replace(/^\d+\.\s/, "")}
                  </Badge>
                  <CardTitle>{skills.find((s) => s.name === item.name)?.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ol>

      <DocsH2 id="skills">Skills</DocsH2>
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {skills.map((skill) => (
          <Link
            key={skill.name}
            href={skillHref(skill.name)}
            className="rounded-3xl outline-none focus-visible:focus-ring"
          >
            <Card size="sm" className="h-full transition-colors hover:bg-surface-secondary">
              <CardHeader>
                <Badge className="w-fit">{skill.name}</Badge>
                <CardTitle>{skill.title}</CardTitle>
                <CardDescription>{skill.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <DocsH2 id="mcp">MCP</DocsH2>
      <DocsH3 id="shadcn-mcp">shadcn MCP, not a herocn server</DocsH3>
      <DocsP>
        After <code className="font-mono text-foreground">@herocn</code> is in{" "}
        <code className="font-mono text-foreground">components.json</code>, the official shadcn MCP can list and add registry items. herocn does not ship MCP, llms.txt, or a DESIGN.md clone.
      </DocsP>
      <p>
        <Link href="/docs/installation" className={buttonVariants({variant: "tertiary"})}>
          Registry install
        </Link>
      </p>
    </DocsShell>
  );
}
