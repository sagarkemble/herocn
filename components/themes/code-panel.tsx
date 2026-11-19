"use client";

import {DownloadIcon} from "lucide-react";
import {useDeferredValue} from "react";

import {Button} from "@/components/ui/button";
import {CodeBlock, CodeBlockContent, CodeBlockCopyButton} from "@/components/ui/code-block";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {generateGlobalsCss} from "@/lib/theme-editor/generate-css";
import {useThemeState} from "@/lib/theme-editor/state";

function downloadCss(css: string) {
  const blob = new Blob([css], {type: "text/css"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "theme.css";
  a.click();
  URL.revokeObjectURL(url);
}

export function CodePanel({open, onOpenChange}: {open: boolean; onOpenChange: (open: boolean) => void}) {
  const [state] = useThemeState();
  const css = useDeferredValue(generateGlobalsCss(state));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="data-[side=right]:h-[88vh] data-[side=right]:w-[45%] data-[side=right]:sm:max-w-none" side="right">
        <SheetHeader className="flex-row items-center justify-between gap-2">
          <SheetTitle>globals.css</SheetTitle>
          <div className="flex items-center gap-1">
            <Button
              aria-label="Download theme.css"
              size="icon-sm"
              variant="tertiary"
              onClick={() => downloadCss(css)}
            >
              <DownloadIcon />
            </Button>
            <CodeBlockCopyButton value={css} />
          </div>
        </SheetHeader>
        <CodeBlock className="min-h-0 min-w-0 flex-1">
          <CodeBlockContent className="h-full" lineNumbers>
            {css}
          </CodeBlockContent>
        </CodeBlock>
      </SheetContent>
    </Sheet>
  );
}
