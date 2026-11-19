"use client";

import {useEffect, useState} from "react";

import {Toaster} from "@/components/ui/toast";
import {TooltipProvider} from "@/components/ui/tooltip";
import {cn} from "cn";
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
import {DemoTemplates} from "./templates";
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
            <div
              className={cn(
                "rounded-2xl border border-border/50 [scrollbar-width:none]",
                tab === "components" ? "overflow-scroll" : "min-h-0 flex-1 overflow-hidden",
              )}
            >
              <div
                className={cn(
                  "flex w-full bg-background font-sans",
                  tab === "components" ? "min-h-full flex-1 px-4 py-8" : "h-full min-h-0 overflow-hidden",
                )}
                id={THEME_BUILDER_CONTENT_ID}
              >
                {tab === "components" ? mounted ? <DemoComponents /> : null : mounted ? <DemoTemplates tab={tab} /> : null}
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
