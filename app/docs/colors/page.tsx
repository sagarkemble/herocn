import Link from "next/link";

import {DocsH1, DocsH2, DocsLead, DocsP} from "@/components/docs/article";
import {colorTokenGroups} from "@/components/docs/color-token-data";
import {ColorTokenGroups, RadiusTokenRow} from "@/components/docs/color-tokens";
import type {TocItem} from "@/components/docs/data";
import {DocsShell} from "@/components/docs/shell";
import {DocsToc} from "@/components/docs/toc";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";

export const metadata = {
  title: "Colors - herocn docs",
  description: "herocn token groups: primitives, surfaces, brand, status, soft mixes, and radius. Values are CSS variables, never invented.",
};

const toc: TocItem[] = [
  {id: "palette", title: "Palette", depth: 2},
  ...colorTokenGroups.map((group) => ({id: group.id, title: group.title, depth: 3 as const})),
  {id: "radius", title: "Radius", depth: 2},
  {id: "buttons", title: "Button mapping", depth: 2},
  {id: "source", title: "Source of truth", depth: 2},
];

export default function DocsColorsPage() {
  return (
    <DocsShell toc={<DocsToc items={toc} />}>
      <section className="mb-6 flex flex-col gap-3">
        <DocsH1>Colors</DocsH1>
        <DocsLead>
          herocn keeps shadcn variable names and adds HeroUI tokens beside them. Swatches read live CSS variables, so they track light and dark.
        </DocsLead>
      </section>

      <DocsH2 id="palette">Palette</DocsH2>
      <DocsP>
        Missing values are <strong className="font-medium text-foreground">NOT FOUND</strong> — do not guess. Hover and press colours are not tokens; components use brightness and opacity.
      </DocsP>
      <ColorTokenGroups />

      <DocsH2 id="radius">Radius</DocsH2>
      <DocsP>
        Base <code className="font-mono text-foreground">--radius</code> is <code className="font-mono text-foreground">0.5rem</code>. The scale is multipliers. Fields tend to{" "}
        <code className="font-mono text-foreground">rounded-xl</code>; buttons, cards, and dialogs tend to{" "}
        <code className="font-mono text-foreground">rounded-3xl</code>.
      </DocsP>
      <div className="mb-8">
        <RadiusTokenRow />
      </div>

      <DocsH2 id="buttons">Button mapping</DocsH2>
      <DocsP>
        Stock shadcn <code className="font-mono text-foreground">secondary</code> (grey) is herocn{" "}
        <code className="font-mono text-foreground">tertiary</code>. herocn <code className="font-mono text-foreground">secondary</code> is primary-tinted.{" "}
        <code className="font-mono text-foreground">destructive-soft</code> is the soft red.
      </DocsP>
      <div className="mb-8 flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="destructive-soft">Destructive soft</Button>
      </div>
      <Alert className="mb-6">
        <AlertTitle>--input is fill</AlertTitle>
        <AlertDescription>
          Fields use <code className="font-mono">bg-input</code>. Do not use <code className="font-mono">border-input</code> as a stroke colour.
        </AlertDescription>
      </Alert>

      <DocsH2 id="source">Source of truth</DocsH2>
      <DocsP>
        Paste and class tables live in the restyle skill reference (<code className="font-mono text-foreground">tokens.md</code>). To change the palette, use{" "}
        <Link href="/docs/theming" className="text-foreground underline-offset-4 hover:underline">
          Theming
        </Link>{" "}
        — do not hand-type hex or oklch.
      </DocsP>
    </DocsShell>
  );
}
