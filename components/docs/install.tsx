"use client";

import * as React from "react";
import {cn} from "cn";

import {Button} from "@/components/ui/button";
import {CommandBox, CopyControl} from "@/components/docs/command-box";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {addComponentCommand, packageManagers} from "@/lib/registry-public";

function SourceFile({
  slug,
  source,
  sourceHtml,
}: {
  slug: string;
  source: string;
  sourceHtml: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-secondary">
      <div className="flex items-center gap-2 border-border/60 border-b px-3 py-2">
        <span className="rounded-sm bg-muted px-1 py-px font-medium font-sans text-[10px] text-muted-foreground leading-4">
          TS
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-muted-foreground text-xs">
          components/ui/{slug}.tsx
        </span>
        <Button variant="ghost" size="xs" className="text-muted-foreground" onClick={() => setOpen((v) => !v)}>
          {open ? "Collapse" : "Expand"}
        </Button>
        <CopyControl value={source} />
      </div>
      <div className="relative">
        <div
          className={cn(
            "docs-code overflow-auto py-3.5 font-mono text-[13px] leading-[22px]",
            open ? "max-h-[480px]" : "max-h-[220px] overflow-hidden",
          )}
          dangerouslySetInnerHTML={{__html: sourceHtml}}
        />
        {!open ? (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-surface-secondary"
            />
            <div className="absolute inset-x-0 bottom-3 flex justify-center">
              <Button size="xs" variant="ghost" className="text-muted-foreground" onClick={() => setOpen(true)}>
                Expand
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ManualStep({
  n,
  last,
  children,
}: {
  n: number;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="relative flex gap-4">
      {!last ? <span aria-hidden="true" className="absolute start-[11px] top-6 bottom-0 w-px bg-border" /> : null}
      <span className="relative z-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background font-medium text-muted-foreground text-xs">
        {n}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3 pb-8">{children}</div>
    </li>
  );
}

export function ComponentInstall({
  slug,
  dependencies,
  source,
  sourceHtml,
}: {
  slug: string;
  dependencies: string[];
  source: string;
  sourceHtml: string;
}) {
  const addCommand = (pm: (typeof packageManagers)[number]) => addComponentCommand(pm.dlx, slug);
  const depCommand = (pm: (typeof packageManagers)[number]) =>
    `${pm.install} ${dependencies.join(" ")}`;

  return (
    <Tabs defaultValue="command">
      <TabsList
        variant="line"
        className="w-max justify-start gap-4 border-0 [&_[data-slot=tabs-indicator]]:bg-foreground"
      >
        <TabsTrigger className="w-auto px-0 data-active:text-foreground" value="command">
          Command
        </TabsTrigger>
        <TabsTrigger className="w-auto px-0 data-active:text-foreground" value="manual">
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-5 p-0" value="command">
        <CommandBox command={addCommand} />
      </TabsContent>
      <TabsContent className="mt-5 p-0" value="manual">
        <ol className="m-0 flex list-none flex-col p-0">
          {dependencies.length ? (
            <ManualStep n={1}>
              <p className="text-sm leading-6">Install the required shadcn/ui dependencies:</p>
              <CommandBox command={depCommand} />
            </ManualStep>
          ) : null}
          <ManualStep n={dependencies.length ? 2 : 1} last={!source}>
            <p className="text-sm leading-6">Copy and paste the following code into your project.</p>
            {source ? <SourceFile slug={slug} source={source} sourceHtml={sourceHtml} /> : null}
          </ManualStep>
          <ManualStep n={dependencies.length ? 3 : 2} last>
            <p className="text-sm leading-6">Update the import paths to match your project setup.</p>
          </ManualStep>
        </ol>
      </TabsContent>
    </Tabs>
  );
}
