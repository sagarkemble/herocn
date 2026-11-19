"use client";

import {useState} from "react";

import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {THEME_BUILDER_BOTTOM_SHEET_ID, formRadiusOptions, radiusOptions} from "@/lib/theme-editor/constants";

import {AccentColorSelector} from "./accent-selector";
import {BaseColorSlider} from "./base-slider";
import {ShuffleButton} from "./builder-header";
import {FontFamilyPopover, RadiusPopover, ThemeInput, ThemesList} from "./option-popovers";
import {t} from "./strings";

export function MobileFooter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t sm:hidden">
      <Drawer open={open} showSwipeHandle onOpenChange={setOpen}>
        <div className="flex items-center gap-2 bg-background px-4 py-3">
          <DrawerTrigger nativeButton={false} render={<div className="min-w-0 flex-1" />}>
            <ThemeInput />
          </DrawerTrigger>
          <ShuffleButton enableKeyboardShortcut={false} />
        </div>
        <DrawerContent id={THEME_BUILDER_BOTTOM_SHEET_ID}>
          <DrawerHeader>
            <DrawerTitle>{t.themes.theme}</DrawerTitle>
          </DrawerHeader>
          <div className="flex min-h-0 flex-col gap-6 overflow-y-auto pb-6">
            <ThemesList />
            <div className="flex items-end justify-between gap-4 px-4">
              <AccentColorSelector />
              <BaseColorSlider />
            </div>
            <div className="flex flex-nowrap gap-4 overflow-x-auto px-4 [scrollbar-width:none]">
              <FontFamilyPopover />
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
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
