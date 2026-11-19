import Link from "next/link";

import {DocsH1, DocsH2, DocsH3, DocsLead, DocsList, DocsP} from "@/components/docs/article";
import {CommandBox} from "@/components/docs/command-box";
import type {TocItem} from "@/components/docs/data";
import {DocsShell} from "@/components/docs/shell";
import {DocsToc} from "@/components/docs/toc";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {buttonVariants} from "@/components/ui/button";
import {CodeBlock, CodeBlockContent, CodeBlockCopyButton, CodeBlockActions} from "@/components/ui/code-block";
import {HEROCN_NS, HEROCN_REGISTRY_TEMPLATE} from "@/lib/registry-public";
import {SKILLS_REPO} from "@/lib/skills";

export const metadata = {
  title: "Installation - herocn docs",
  description: "Register @herocn on a Tailwind v4 base-nova app and add restyled shadcn primitives.",
};

const toc: TocItem[] = [
  {id: "requirements", title: "Requirements", depth: 2},
  {id: "register", title: "Register the namespace", depth: 2},
  {id: "add", title: "Add components", depth: 2},
  {id: "radix", title: "Radix or no overwrite", depth: 2},
  {id: "discover", title: "Discover", depth: 2},
];

const componentsJson = `{
  "registries": {
    "${HEROCN_NS}": "${HEROCN_REGISTRY_TEMPLATE}"
  }
}`;

const cssImports = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";`;

export default function DocsInstallationPage() {
  return (
    <DocsShell toc={<DocsToc items={toc} />}>
      <section className="mb-6 flex flex-col gap-3">
        <DocsH1>Installation</DocsH1>
        <DocsLead>
          Point a shadcn (Base UI, nova) app at the herocn registry, then add files. The human catalog of items stays on{" "}
          <Link href="/registry" className="text-foreground underline-offset-4 hover:underline">
            /registry
          </Link>
          .
        </DocsLead>
      </section>

      <DocsH2 id="requirements">Requirements</DocsH2>
      <DocsList>
        <li>Tailwind CSS v4</li>
        <li>
          shadcn style <code className="font-mono text-foreground">base-nova</code> (Base UI), TypeScript, CSS variables
        </li>
        <li>These imports already in your global CSS, in this order:</li>
      </DocsList>
      <CodeBlock className="mb-6">
        <CodeBlockActions>
          <CodeBlockCopyButton value={cssImports} />
        </CodeBlockActions>
        <CodeBlockContent>{cssImports}</CodeBlockContent>
      </CodeBlock>
      <Alert className="mb-6">
        <AlertTitle>Always prefix @herocn/</AlertTitle>
        <AlertDescription>
          Bare names like <code className="font-mono">button</code> still mean official shadcn.{" "}
          <code className="font-mono">{HEROCN_NS}/button</code> is this registry.
        </AlertDescription>
      </Alert>

      <DocsH2 id="register">Register the namespace</DocsH2>
      <DocsP>Run this once in the target app, or paste the same URL into components.json.</DocsP>
      <CommandBox kind="registry" />
      <DocsH3 id="components-json">components.json</DocsH3>
      <CodeBlock className="mb-6">
        <CodeBlockActions>
          <CodeBlockCopyButton value={componentsJson} />
        </CodeBlockActions>
        <CodeBlockContent>{componentsJson}</CodeBlockContent>
      </CodeBlock>
      <DocsP>
        <code className="font-mono text-foreground">{"{name}"}</code> is required in the template.{" "}
        <code className="font-mono text-foreground">{HEROCN_NS}/button</code> resolves to{" "}
        <code className="font-mono text-foreground">/r/button.json</code>.
      </DocsP>

      <DocsH2 id="add">Add components</DocsH2>
      <DocsP>
        The first UI item pulls <code className="font-mono text-foreground">{HEROCN_NS}/style</code> (tokens,{" "}
        <code className="font-mono text-foreground">pressible</code>, focus rings).
      </DocsP>
      <DocsH3 id="add-button">One primitive</DocsH3>
      <CommandBox kind="add" slug="button" />
      <DocsH3 id="add-index">Full kit</DocsH3>
      <CommandBox kind="add" slug="index" />
      <DocsP>
        After install, import from your ui alias as usual. The registry{" "}
        <strong className="font-medium text-foreground">overwrites</strong> matching files in{" "}
        <code className="font-mono text-foreground">components/ui</code>.
      </DocsP>
      <CodeBlock className="mb-6">
        <CodeBlockActions>
          <CodeBlockCopyButton value={`import { Button } from "@/components/ui/button"`} />
        </CodeBlockActions>
        <CodeBlockContent>{`import { Button } from "@/components/ui/button"`}</CodeBlockContent>
      </CodeBlock>

      <DocsH2 id="radix">Radix or no overwrite</DocsH2>
      <DocsP>
        If the app is Radix, or you must keep local edits in ui files, skip the registry shortcut. Install the restyle skill and follow class tables:
      </DocsP>
      <CodeBlock className="mb-4">
        <CodeBlockActions>
          <CodeBlockCopyButton value={`npx skills add ${SKILLS_REPO} --skill shadcn-to-heroui`} />
        </CodeBlockActions>
        <CodeBlockContent wrap>{`npx skills add ${SKILLS_REPO} --skill shadcn-to-heroui`}</CodeBlockContent>
      </CodeBlock>
      <p className="mb-6">
        <Link href="/docs/skills/shadcn-to-heroui" className={buttonVariants({variant: "tertiary"})}>
          shadcn → HeroUI look
        </Link>
      </p>

      <DocsH2 id="discover">Discover</DocsH2>
      <DocsP>
        List and search items with the shadcn CLI. After the namespace is in{" "}
        <code className="font-mono text-foreground">components.json</code>, the official shadcn MCP can add{" "}
        <code className="font-mono text-foreground">{HEROCN_NS}/…</code> the same way — herocn does not ship its own MCP.
      </DocsP>
      <DocsList>
        <li>
          Human catalog:{" "}
          <Link href="/registry" className="text-foreground underline-offset-4 hover:underline">
            /registry
          </Link>
        </li>
        <li>
          Machine catalog:{" "}
          <code className="font-mono text-foreground">https://herocn.sagarkemble.dev/r/registry.json</code>
        </li>
      </DocsList>
    </DocsShell>
  );
}
