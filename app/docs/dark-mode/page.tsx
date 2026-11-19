import Link from "next/link";

import {DocsH1, DocsH2, DocsLead, DocsList, DocsP} from "@/components/docs/article";
import type {TocItem} from "@/components/docs/data";
import {DocsShell} from "@/components/docs/shell";
import {DocsToc} from "@/components/docs/toc";
import {CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton} from "@/components/ui/code-block";
import {Kbd} from "@/components/ui/kbd";

export const metadata = {
  title: "Dark mode - herocn docs",
  description: "herocn dark mode uses the class strategy on html, next-themes, and the D hotkey.",
};

const toc: TocItem[] = [
  {id: "strategy", title: "Class strategy", depth: 2},
  {id: "provider", title: "Theme provider", depth: 2},
  {id: "hotkey", title: "Hotkey D", depth: 2},
  {id: "tokens", title: "Dark tokens", depth: 2},
];

const providerSnippet = `import { ThemeProvider } from "@/components/theme-provider"

<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>`;

export default function DocsDarkModePage() {
  return (
    <DocsShell toc={<DocsToc items={toc} />}>
      <section className="mb-6 flex flex-col gap-3">
        <DocsH1>Dark mode</DocsH1>
        <DocsLead>
          Dark is the same token names under <code className="font-mono">.dark</code> on <code className="font-mono">&lt;html&gt;</code>. Toggle with the docs toolbar or the keyboard.
        </DocsLead>
      </section>

      <DocsH2 id="strategy">Class strategy</DocsH2>
      <DocsP>
        <code className="font-mono text-foreground">next-themes</code> sets <code className="font-mono text-foreground">attribute=&quot;class&quot;</code>. Light values live on{" "}
        <code className="font-mono text-foreground">:root</code>. Dark values live on{" "}
        <code className="font-mono text-foreground">.dark</code>. Primitives{" "}
        <code className="font-mono text-foreground">--snow</code> and <code className="font-mono text-foreground">--eclipse</code> stay on{" "}
        <code className="font-mono text-foreground">:root</code> only.
      </DocsP>
      <DocsP>
        Root layout sets <code className="font-mono text-foreground">suppressHydrationWarning</code> on{" "}
        <code className="font-mono text-foreground">&lt;html&gt;</code> so the theme class can differ between server HTML and the client. Do not spread that flag onto other nodes.
      </DocsP>

      <DocsH2 id="provider">Theme provider</DocsH2>
      <DocsP>
        This demo wraps the app in <code className="font-mono text-foreground">components/theme-provider.tsx</code>. The registry item{" "}
        <code className="font-mono text-foreground">@herocn/theme-provider</code> is the same wrapper.{" "}
        <code className="font-mono text-foreground">defaultTheme=&quot;system&quot;</code> and{" "}
        <code className="font-mono text-foreground">enableSystem</code> are on.
      </DocsP>
      <CodeBlock className="mb-6">
        <CodeBlockActions>
          <CodeBlockCopyButton value={providerSnippet} />
        </CodeBlockActions>
        <CodeBlockContent wrap>{providerSnippet}</CodeBlockContent>
      </CodeBlock>

      <DocsH2 id="hotkey">Hotkey D</DocsH2>
      <DocsP>
        Press <Kbd>D</Kbd> to flip light and dark. The listener ignores the key when you are typing in an input, textarea, select, or contenteditable, and ignores it with meta, ctrl, or alt.
      </DocsP>
      <DocsList>
        <li>Toolbar sun/moon in the docs topbar uses the same provider.</li>
        <li>Landing and /themes share the provider, so the mode is global.</li>
      </DocsList>

      <DocsH2 id="tokens">Dark tokens</DocsH2>
      <DocsP>
        See{" "}
        <Link href="/docs/colors" className="text-foreground underline-offset-4 hover:underline">
          Colors
        </Link>{" "}
        and toggle this page with <Kbd>D</Kbd> — swatches re-read computed styles. To generate a new pair of light/dark sheets, use{" "}
        <Link href="/docs/theming" className="text-foreground underline-offset-4 hover:underline">
          Theming
        </Link>
        .
      </DocsP>
    </DocsShell>
  );
}
