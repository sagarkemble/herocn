"use client";

import {useEffect, useState} from "react";

import {Toaster} from "@/components/ui/toast";
import {TooltipProvider} from "@/components/ui/tooltip";
import {
  THEME_BUILDER_CONTENT_ID,
  THEME_BUILDER_PAGE_ID,
  formRadiusOptions,
  radiusOptions,
} from "@/lib/theme-editor/constants";
import {usePreviewTab, useThemeState} from "@/lib/theme-editor/state";

import {AccentColorSelector} from "./accent-selector";
import {BaseColorSlider} from "./base-slider";
import {BuilderHeader} from "./builder-header";
import {CodePanel} from "./code-panel";
import {CssSync} from "./css-sync";
import {DemoComponents} from "./demo";
import {MobileFooter} from "./mobile-footer";
import {Onboarding} from "./onboarding";
import {FontFamilyPopover, RadiusPopover, ThemePopover} from "./option-popovers";
import {t} from "./strings";
import {toastManager} from "./toast";

export function ThemeBuilder() {
  const [codeOpen, setCodeOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tab] = usePreviewTab();
  const [state] = useThemeState();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const root = document.documentElement;

    if (state.vibrantPalette) root.setAttribute("data-vibrant-palette", "true");
    else root.removeAttribute("data-vibrant-palette");

    return () => root.removeAttribute("data-vibrant-palette");
  }, [state.vibrantPalette]);

  return (
    <Toaster toastManager={toastManager}>
      <TooltipProvider>
        <div
          className="grid h-dvh grid-rows-[auto_1fr_auto] bg-background px-4 sm:overflow-hidden sm:px-6"
          id={THEME_BUILDER_PAGE_ID}
        >
          <BuilderHeader codeOpen={codeOpen} onToggleCode={() => setCodeOpen((o) => !o)} />
          <div className="mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-col">
            <div className="overflow-scroll rounded-2xl border border-border/50 [scrollbar-width:none]">
              <div
                className="flex min-h-full w-full flex-1 bg-background px-4 py-8 font-sans"
                id={THEME_BUILDER_CONTENT_ID}
              >
                {tab === "components" ? (
                  mounted ? (
                    <DemoComponents />
                  ) : null
                ) : (
                  <div className="flex flex-1 items-center justify-center p-8 text-center text-muted-foreground">
                    HeroUI Pro templates are not part of this clone
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <footer className="mx-auto hidden items-center justify-between gap-4 py-6 max-[1200px]:flex-col sm:flex">
              <div className="flex flex-wrap items-end gap-4">
                <AccentColorSelector />
                <BaseColorSlider />
                <FontFamilyPopover />
              </div>
              <div className="flex flex-wrap items-end gap-4">
                <RadiusPopover
                  description={t.radius.description}
                  label={t.radius.label}
                  options={radiusOptions}
                  variableKey="radius"
                />
                <RadiusPopover
                  description={t.radius.formDescription}
                  label={t.radius.formLabel}
                  options={formRadiusOptions}
                  variableKey="formRadius"
                />
                <ThemePopover />
              </div>
            </footer>
            <div className="h-20 sm:hidden" />
            <MobileFooter />
            <Onboarding />
            <CssSync />
            <CodePanel open={codeOpen} onOpenChange={setCodeOpen} />
          </div>
        </div>
      </TooltipProvider>
    </Toaster>
  );
}
