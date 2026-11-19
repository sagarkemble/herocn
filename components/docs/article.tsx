import type * as React from "react";

export function DocsH1({children}: {children: React.ReactNode}) {
  return (
    <h1 className="font-semibold text-[28px] text-foreground leading-9 tracking-[-0.022em] md:text-4xl md:leading-10">
      {children}
    </h1>
  );
}

export function DocsLead({children}: {children: React.ReactNode}) {
  return <p className="max-w-[560px] text-(--docs-fg-muted) text-base leading-6">{children}</p>;
}

export function DocsH2({id, children}: {id: string; children: React.ReactNode}) {
  return (
    <h2
      id={id}
      className="mt-10 mb-4 scroll-m-28 font-semibold text-foreground text-xl leading-7 tracking-[-0.015em] first:mt-0"
    >
      <a href={`#${id}`}>{children}</a>
    </h2>
  );
}

export function DocsH3({id, children}: {id: string; children: React.ReactNode}) {
  return (
    <h3
      id={id}
      className="mt-8 mb-2 scroll-m-28 font-semibold text-base text-foreground leading-6 tracking-[-0.01em]"
    >
      <a href={`#${id}`}>{children}</a>
    </h3>
  );
}

export function DocsP({children}: {children: React.ReactNode}) {
  return <p className="mb-4 text-muted-foreground text-sm leading-6 last:mb-0">{children}</p>;
}

export function DocsList({children}: {children: React.ReactNode}) {
  return (
    <ul className="mb-6 flex list-disc flex-col gap-1 ps-5 text-muted-foreground text-sm leading-6">
      {children}
    </ul>
  );
}
