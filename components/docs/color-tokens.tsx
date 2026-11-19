"use client";

import * as React from "react";
import {useTheme} from "next-themes";

import {colorTokenGroups, radiusTokens, type ColorToken} from "./color-token-data";

function readVar(name: string) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function useDocumentThemeKey() {
  const {resolvedTheme} = useTheme();
  const [className, setClassName] = React.useState("");

  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setClassName(root.className);
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, {attributes: true, attributeFilter: ["class"]});
    return () => observer.disconnect();
  }, []);

  return `${resolvedTheme}:${className}`;
}

function TokenSwatch({token}: {token: ColorToken}) {
  const themeKey = useDocumentThemeKey();
  const [bg, setBg] = React.useState("");
  const [fg, setFg] = React.useState("");

  React.useEffect(() => {
    setBg(readVar(token.name));
    setFg(token.fg ? readVar(token.fg) : "");
  }, [token.name, token.fg, themeKey]);

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div
        className="flex h-16 items-end overflow-hidden rounded-xl border border-border p-2 shadow-xs"
        style={{background: `var(${token.name})`, color: token.fg ? `var(${token.fg})` : undefined}}
      >
        {token.fg ? <span className="font-medium text-xs">Aa</span> : null}
      </div>
      <div className="min-w-0">
        <p className="truncate font-mono text-foreground text-xs">{token.name}</p>
        {token.fg ? <p className="truncate font-mono text-muted-foreground text-xs">{token.fg}</p> : null}
        {bg ? <p className="truncate font-mono text-muted-foreground text-[11px] leading-4">{bg}</p> : null}
        {fg ? <p className="truncate font-mono text-muted-foreground text-[11px] leading-4">{fg}</p> : null}
      </div>
    </div>
  );
}

function RadiusSwatch({name}: {name: string}) {
  const themeKey = useDocumentThemeKey();
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(readVar(name));
  }, [name, themeKey]);

  return (
    <div className="flex min-w-0 flex-col items-center gap-2">
      <div
        className="flex size-16 items-center justify-center border border-border bg-surface shadow-xs"
        style={{borderRadius: `var(${name})`}}
      >
        <span className="size-2 rounded-full bg-primary" />
      </div>
      <p className="truncate font-mono text-foreground text-xs">{name}</p>
      {value ? <p className="truncate font-mono text-muted-foreground text-[11px]">{value}</p> : null}
    </div>
  );
}

export function ColorTokenGroups() {
  return (
    <div className="flex flex-col gap-10">
      {colorTokenGroups.map((group) => (
        <section key={group.id} className="flex flex-col gap-3">
          <h3
            id={group.id}
            className="scroll-m-28 font-semibold text-base text-foreground leading-6 tracking-[-0.01em]"
          >
            <a href={`#${group.id}`}>{group.title}</a>
          </h3>
          {group.note ? <p className="text-muted-foreground text-sm leading-6">{group.note}</p> : null}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {group.tokens.map((token) => (
              <TokenSwatch key={token.name} token={token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function RadiusTokenRow() {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {radiusTokens.map((name) => (
        <RadiusSwatch key={name} name={name} />
      ))}
    </div>
  );
}
