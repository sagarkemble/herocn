"use client";

import {useThemeState} from "@/lib/theme-editor/state";

import {LockableLabel} from "./lockable-label";
import {ChromaSlider} from "./sliders";
import {t} from "./strings";

/** Port of HeroUI base-color-slider.tsx */
export function BaseColorSlider() {
  const [state, setState] = useThemeState();

  return (
    <div className="flex flex-col gap-1">
      <LockableLabel label={t.baseColor.label} tooltip={t.baseColor.tooltip} variable="base" />
      <ChromaSlider className="h-6 w-[160px]" hue={state.hue} value={state.base} onChange={(base) => setState({base})} />
    </div>
  );
}
