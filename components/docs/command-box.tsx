"use client";

import * as React from "react";
import {CheckIcon, CopyIcon, SquareTerminalIcon} from "lucide-react";
import {cn} from "cn";

import {Button} from "@/components/ui/button";
import {
  addComponentCommand,
  addRegistryCommand,
  packageManagers,
  type PackageManagerId,
} from "@/lib/registry-public";

export type DocsCommandKind = "registry" | "add";

export function CopyControl({value, className}: {value: string; className?: string}) {
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

export function CommandBox({
  command,
  kind,
  slug,
}: {
  command?: (pm: (typeof packageManagers)[number]) => string;
  kind?: DocsCommandKind;
  slug?: string;
}) {
  const [pmId, setPmId] = React.useState<PackageManagerId>("pnpm");
  const pm = packageManagers.find((item) => item.id === pmId) ?? packageManagers[0];
  const value = command
    ? command(pm)
    : kind === "registry"
      ? addRegistryCommand(pm.dlx)
      : addComponentCommand(pm.dlx, slug ?? "button");

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
