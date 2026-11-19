"use client";

import * as React from "react";
import {CheckIcon, CopyIcon, SquareTerminalIcon} from "lucide-react";
import {cn} from "cn";

import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  addComponentCommand,
  packageManagers,
  type PackageManagerId,
} from "@/lib/registry-public";

function CopyControl({value, className}: {value: string; className?: string}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? "Copied" : "Copy"}
      className={cn("text-muted-foreground", className)}
      onClick={() => {
        navigator.clipboard
          .writeText(value)
          .then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => {});
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

function CommandBox({
  command,
}: {
  command: (pm: (typeof packageManagers)[number]) => string;
}) {
  const [pmId, setPmId] = React.useState<PackageManagerId>("pnpm");
  const pm = packageManagers.find((item) => item.id === pmId) ?? packageManagers[0];
  const value = command(pm);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-secondary">
      <div className="flex items-center gap-2 border-border/60 border-b px-3 py-2">
        <SquareTerminalIcon className="size-4 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {packageManagers.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPmId(item.id)}
              className={cn(
                "rounded-md px-2 py-0.5 font-medium text-xs outline-none transition-colors",
                item.id === pmId
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <CopyControl value={value} />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-6 text-foreground">
        <code>{value}</code>
      </pre>
    </div>
  );
}

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
