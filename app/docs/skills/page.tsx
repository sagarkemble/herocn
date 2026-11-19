import type * as React from "react";
import fs from "node:fs";
import path from "node:path";

import {SkillInstall} from "@/components/docs/skill-install";
import {DocsShell} from "@/components/docs/shell";
import {DocsToc} from "@/components/docs/toc";
import type {TocItem} from "@/components/docs/data";
import {Badge} from "@/components/ui/badge";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CodeBlock, CodeBlockContent} from "@/components/ui/code-block";
import {skills} from "@/lib/skills";

export const metadata = {
  title: "Agent skills - shadcn + shadcn-to-heroui docs",
  description: "Install shadcn-to-heroui, heroui-customize, visualize-design-system, and heroui-taste.",
};

function H2({id, children}: {id: string; children: React.ReactNode}) {
  return (
    <h2 id={id} className="mt-10 mb-4 scroll-m-28 font-semibold text-foreground text-xl leading-7 tracking-[-0.015em] first:mt-0">
      <a href={`#${id}`}>{children}</a>
    </h2>
  );
}

function H3({id, children}: {id: string; children: React.ReactNode}) {
  return (
    <h3 id={id} className="mt-8 mb-2 scroll-m-28 font-semibold text-base text-foreground leading-6 tracking-[-0.01em]">
      <a href={`#${id}`}>{children}</a>
    </h3>
  );
}

function fileTree(name: string): string {
  const root = path.join(process.cwd(), "skills", name);
  const lines = [`${path.basename(root)}/`];

  function walk(dir: string, indent: string) {
    const entries = fs
      .readdirSync(dir, {withFileTypes: true})
      .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name));
    entries.forEach((entry, i) => {
      const last = i === entries.length - 1;
      const branch = last ? "└── " : "├── ";
      const nextIndent = indent + (last ? "    " : "│   ");
      if (entry.isDirectory()) {
        const nested = fs.readdirSync(path.join(dir, entry.name));
        if (entry.name === "components") {
          lines.push(`${indent}${branch}${entry.name}/ (${nested.length} files)`);
          return;
        }
        lines.push(`${indent}${branch}${entry.name}/`);
        walk(path.join(dir, entry.name), nextIndent);
        return;
      }
      lines.push(`${indent}${branch}${entry.name}`);
    });
  }

  walk(root, "");
  return lines.join("\n");
}

const toc: TocItem[] = [
  {id: "overview", title: "Overview", depth: 2},
  ...skills.flatMap((s) => [
    {id: s.name, title: s.title, depth: 2} as const,
    {id: `${s.name}-install`, title: "Install", depth: 3} as const,
    {id: `${s.name}-prompts`, title: "Example prompts", depth: 3} as const,
    {id: `${s.name}-files`, title: "Files", depth: 3} as const,
  ]),
];

export default function SkillsPage() {
  return (
    <DocsShell toc={<DocsToc items={[...toc]} />}>
      <section className="mb-6 flex flex-col gap-3">
        <h1 className="font-semibold text-[28px] text-foreground leading-9 tracking-[-0.022em] md:text-4xl md:leading-10">
          Agent skills
        </h1>
        <p className="max-w-[560px] text-(--docs-fg-muted) text-base leading-6">
          Two Cursor / Claude / Codex skills. One restyles shadcn to the HeroUI look. The other applies a theme from this
          site. Install with the skills CLI, or download a zip.
        </p>
      </section>
      <H2 id="overview">Overview</H2>
      <div className="grid gap-3 sm:grid-cols-2">
        {skills.map((skill) => (
          <Card key={skill.name} size="sm">
            <CardHeader>
              <Badge className="w-fit">{skill.name}</Badge>
              <CardTitle>{skill.title}</CardTitle>
              <CardDescription>{skill.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      {skills.map((skill) => {
        const tree = fileTree(skill.name);
        return (
          <section key={skill.name}>
            <H2 id={skill.name}>{skill.title}</H2>
            <p className="mb-4 text-muted-foreground text-sm leading-6">{skill.description}</p>
            <ul className="mb-6 flex list-disc flex-col gap-1 ps-5 text-sm leading-6">
              {skill.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <H3 id={`${skill.name}-install`}>Install</H3>
            <SkillInstall command={skill.install} zipHref={skill.zipHref} />
            <H3 id={`${skill.name}-prompts`}>Example prompts</H3>
            <div className="flex flex-col gap-3">
              {skill.prompts.map((prompt) => (
                <CodeBlock key={prompt}>
                  <CodeBlockContent wrap>{prompt}</CodeBlockContent>
                </CodeBlock>
              ))}
            </div>
            <H3 id={`${skill.name}-files`}>Files</H3>
            <CodeBlock>
              <CodeBlockContent>{tree}</CodeBlockContent>
            </CodeBlock>
          </section>
        );
      })}
    </DocsShell>
  );
}
