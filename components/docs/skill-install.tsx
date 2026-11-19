"use client";

import {buttonVariants} from "@/components/ui/button";
import {CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton} from "@/components/ui/code-block";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export function SkillInstall({command, zipHref}: {command: string; zipHref: string}) {
  return (
    <Tabs defaultValue="command">
      <TabsList variant="line" className="w-max justify-start gap-4 border-0 [&_[data-slot=tabs-indicator]]:bg-foreground">
        <TabsTrigger className="w-auto px-0 data-active:text-foreground" value="command">
          Command
        </TabsTrigger>
        <TabsTrigger className="w-auto px-0 data-active:text-foreground" value="manual">
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-5 p-0" value="command">
        <CodeBlock>
          <CodeBlockActions>
            <CodeBlockCopyButton value={command} />
          </CodeBlockActions>
          <CodeBlockContent wrap>{command}</CodeBlockContent>
        </CodeBlock>
      </TabsContent>
      <TabsContent className="mt-5 flex flex-col gap-3 p-0" value="manual">
        <a className={buttonVariants({variant: "tertiary"})} download href={zipHref}>
          Download .zip
        </a>
        <p className="text-muted-foreground text-sm leading-6">
          Unzip into <code className="font-mono text-foreground">.cursor/skills/</code>,{" "}
          <code className="font-mono text-foreground">.claude/skills/</code> or{" "}
          <code className="font-mono text-foreground">.agents/skills/</code>.
        </p>
      </TabsContent>
    </Tabs>
  );
}
