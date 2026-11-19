"use client";

import {useLayoutEffect} from "react";

import {generatePreviewCss} from "@/lib/theme-editor/generate-css";
import {injectFontLink} from "@/lib/theme-editor/font-utils";
import {resolveFont} from "@/lib/theme-editor/compute";
import {useThemeState} from "@/lib/theme-editor/state";

const STYLE_ID = "theme-builder-colors";

/** Injects live preview CSS and the selected font stylesheet, like HeroUI ThemeBuilderCssSync. */
export function CssSync() {
  const [state] = useThemeState();

  useLayoutEffect(() => {
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = generatePreviewCss(state);
  }, [state]);

  useLayoutEffect(() => {
    const fontMeta = resolveFont(state.fontFamily);
    const id = fontMeta.variable.replace(/^--font-/, "") || "theme-font";

    injectFontLink(id, fontMeta.cdnUrl, fontMeta.family);
  }, [state.fontFamily]);

  return null;
}
