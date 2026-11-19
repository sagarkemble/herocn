import {readFileSync} from "node:fs";
import {join} from "node:path";

import {SiteHeader} from "@/components/landing/header";
import {Badge} from "@/components/ui/badge";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton} from "@/components/ui/code-block";

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
};

type Registry = {
  name: string;
  homepage: string;
  items: RegistryItem[];
};

const addNs = `npx shadcn@latest registry add "@herocn=https://herocn.sagarkemble.dev/r/{name}.json"`;
const addKit = `npx shadcn@latest add @herocn/index`;
const addButton = `npx shadcn@latest add @herocn/button`;

export default function RegistryPage() {
  const registry = JSON.parse(readFileSync(join(process.cwd(), "registry.json"), "utf8")) as Registry;
  const groups = new Map<string, RegistryItem[]>();
  for (const item of registry.items) {
    const key = item.type.replace("registry:", "");
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-3">
          <Badge className="w-fit">@{registry.name}</Badge>
          <h1 className="font-semibold text-4xl tracking-tight">shadcn registry</h1>
          <p className="max-w-2xl text-muted-foreground">
            Install HeroUI-styled shadcn primitives, tokens, and app templates with the CLI. {registry.items.length}{" "}
            items. Source catalog also lives at <code className="text-foreground">/r/registry.json</code>. Agent skills
            (migrate + re-theme) are on <a className="text-foreground underline-offset-4 hover:underline" href="/docs/skills">/docs/skills</a>.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1. Add the namespace", addNs],
            ["2. Install the kit", addKit],
            ["3. Or one component", addButton],
          ].map(([label, cmd]) => (
            <Card key={label} size="sm">
              <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription>Run in any shadcn Base UI app on Tailwind v4.</CardDescription>
              </CardHeader>
              <CodeBlock size="sm">
                <CodeBlockActions>
                  <CodeBlockCopyButton value={cmd} />
                </CodeBlockActions>
                <CodeBlockContent wrap>{cmd}</CodeBlockContent>
              </CodeBlock>
            </Card>
          ))}
        </div>
        {[...groups.entries()].map(([type, items]) => (
          <section key={type} className="flex flex-col gap-3">
            <h2 className="font-medium text-lg capitalize">{type}</h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.name}>
                  <Card size="sm">
                    <CardTitle className="font-mono text-sm">@{registry.name}/{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
