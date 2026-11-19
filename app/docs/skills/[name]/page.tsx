import Link from "next/link";
import {notFound} from "next/navigation";

import {DocsH1, DocsH2, DocsH3, DocsLead, DocsList, DocsP} from "@/components/docs/article";
import type {TocItem} from "@/components/docs/data";
import {DocsShell} from "@/components/docs/shell";
import {skillFileTree} from "@/components/docs/skill-tree";
import {SkillInstall} from "@/components/docs/skill-install";
import {DocsToc} from "@/components/docs/toc";
import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {CodeBlock, CodeBlockContent} from "@/components/ui/code-block";
import {skills, type PublishedSkill} from "@/lib/skills";

export const dynamicParams = false;

export function generateStaticParams() {
  return skills.map((skill) => ({name: skill.name}));
}

export async function generateMetadata({params}: {params: Promise<{name: string}>}) {
  const {name} = await params;
  const skill = skills.find((item) => item.name === name);
  return skill
    ? {title: `${skill.title} - herocn docs`, description: skill.description}
    : {};
}

const toc: TocItem[] = [
  {id: "install", title: "Install", depth: 2},
  {id: "prompts", title: "Example prompts", depth: 2},
  {id: "files", title: "Files", depth: 2},
];

function skillByName(name: string): PublishedSkill | undefined {
  return skills.find((item) => item.name === name);
}

export default async function SkillDocPage({params}: {params: Promise<{name: string}>}) {
  const {name} = await params;
  const skill = skillByName(name);
  if (!skill) notFound();
  const tree = skillFileTree(skill.name);

  return (
    <DocsShell toc={<DocsToc items={toc} />}>
      <section className="mb-6 flex flex-col gap-3">
        <Badge className="w-fit">{skill.name}</Badge>
        <DocsH1>{skill.title}</DocsH1>
        <DocsLead>{skill.description}</DocsLead>
      </section>

      <DocsList>
        {skill.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </DocsList>

      <DocsH2 id="install">Install</DocsH2>
      <SkillInstall command={skill.install} zipHref={skill.zipHref} />

      <DocsH2 id="prompts">Example prompts</DocsH2>
      <DocsP>Paste into an agent after the skill is installed.</DocsP>
      <div className="mb-6 flex flex-col gap-3">
        {skill.prompts.map((prompt) => (
          <CodeBlock key={prompt}>
            <CodeBlockContent wrap>{prompt}</CodeBlockContent>
          </CodeBlock>
        ))}
      </div>

      <DocsH2 id="files">Files</DocsH2>
      <DocsH3 id="tree">Skill folder</DocsH3>
      <CodeBlock className="mb-6">
        <CodeBlockContent>{tree}</CodeBlockContent>
      </CodeBlock>

      <p>
        <Link href="/docs/skills" className={buttonVariants({variant: "tertiary"})}>
          All skills
        </Link>
      </p>
    </DocsShell>
  );
}
