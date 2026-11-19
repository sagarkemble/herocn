/**
 * Theme computation for the /themes editor.
 *
 * `computeHeroVars` is a port of HeroUI's `computeThemeVars`
 * (apps/docs/src/app/[lang]/themes/hooks/use-computed-theme-vars.ts @ 08d4f13, Apache-2.0):
 * it produces the exact HeroUI variable set heroui.com/themes injects.
 *
 * `toSkillTokens` maps those HeroUI variables onto the shadcn-to-heroui skill tokens
 * (reference/tokens.md mapping table), so our components/ui read them live.
 */
import type {ThemeVariables} from "./constants";
import type {SemanticOverrides} from "./generate-theme-colors";

import {adaptiveColors, findMatchingTheme, fontMap, radiusCssMap, themeValuesById} from "./constants";
import {getCustomFontInfoFromUrl, isCustomFontUrl} from "./font-utils";
import {
  calculateAccentForeground,
  generateThemeColors,
  getColorVariablesForElement,
  getDerivedColorFormulas,
  parseOklch,
  radiusDerivedVariables,
} from "./generate-theme-colors";

export type Mode = "light" | "dark";

export interface FontMeta {
  cdnUrl: string;
  variable: string;
  family: string;
}

export interface HeroVars {
  /** HeroUI colour variables (authored + derived formulas), per mode. */
  colors: Record<Mode, Record<string, string>>;
  /** Radius + font variables (content level). */
  common: Record<string, string>;
  fontMeta: FontMeta;
  isAdaptive: boolean;
}

export function resolveFont(fontFamily: string): FontMeta {
  if (isCustomFontUrl(fontFamily)) {
    const info = getCustomFontInfoFromUrl(fontFamily);

    if (info) return {cdnUrl: info.url, family: info.fontFamily, variable: info.variable};
  }
  const f = fontMap[fontFamily as keyof typeof fontMap] ?? fontMap.inter;

  return {cdnUrl: f.cdnUrl, family: f.label, variable: f.variable};
}

/**
 * HeroUI bug (present in the live heroui.com bundle too): the vibrant soft-foreground template does
 * `"var(--VAR)".replace("--VAR", "accent")`, producing the invalid `var(accent)`. Browsers drop that
 * declaration, so heroui.com falls back to its stylesheet rule
 * `[data-vibrant-palette=true] { --accent-soft-foreground: color-mix(in oklab, var(--accent) 92%, var(--foreground) 8%) }`
 * evaluated on <html> (i.e. with the *default* accent). We emit the intended formula instead.
 */
function fixVibrantRefs(vars: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};

  for (const [k, v] of Object.entries(vars)) out[k] = v.replace(/var\((accent|danger|success|warning)\)/g, "var(--$1)");

  return out;
}

export function computeHeroVars(variables: ThemeVariables): HeroVars {
  const {base, chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;
  const adaptiveConfig = adaptiveColors[accentColor];
  const matchingThemeId = findMatchingTheme(variables);
  const semanticOverrides: SemanticOverrides | undefined = matchingThemeId
    ? themeValuesById[matchingThemeId].semanticOverrides
    : undefined;
  const fontMeta = resolveFont(variables.fontFamily);
  const common: Record<string, string> = {
    "--field-radius": radiusCssMap[variables.formRadius],
    "--font-sans": `var(${fontMeta.variable})`,
    "--radius": radiusCssMap[variables.radius],
    ...radiusDerivedVariables,
  };
  const derivedOpts = {vibrant: variables.vibrantPalette ?? false};

  if (adaptiveConfig) {
    const la = parseOklch(adaptiveConfig.light);
    const da = parseOklch(adaptiveConfig.dark);
    const lightFg = la ? calculateAccentForeground(la.l, la.c, la.h) : calculateAccentForeground(0, 0, 0);
    const darkFg = da ? calculateAccentForeground(da.l, da.c, da.h) : calculateAccentForeground(1, 0, 0);
    // NOTE: HeroUI's adaptive path does not pass `grayChroma: base` (base is ignored for black/white accents).
    const colors = generateThemeColors({chroma, hue, lightness, semanticOverrides});

    return {
      colors: {
        dark: {
          ...getColorVariablesForElement(colors, "dark"),
          ...fixVibrantRefs(getDerivedColorFormulas("dark", derivedOpts)),
          "--accent": adaptiveConfig.dark,
          "--accent-foreground": darkFg,
          "--accent-soft-foreground": adaptiveConfig.dark,
          "--focus": adaptiveConfig.dark,
        },
        light: {
          ...getColorVariablesForElement(colors, "light"),
          ...fixVibrantRefs(getDerivedColorFormulas("light", derivedOpts)),
          "--accent": adaptiveConfig.light,
          "--accent-foreground": lightFg,
          "--accent-soft-foreground": adaptiveConfig.light,
          "--focus": adaptiveConfig.light,
        },
      },
      common,
      fontMeta,
      isAdaptive: true,
    };
  }

  const colors = generateThemeColors({chroma, grayChroma: base, hue, lightness, semanticOverrides});

  return {
    colors: {
      dark: {...getColorVariablesForElement(colors, "dark"), ...fixVibrantRefs(getDerivedColorFormulas("dark", derivedOpts))},
      light: {
        ...getColorVariablesForElement(colors, "light"),
        ...fixVibrantRefs(getDerivedColorFormulas("light", derivedOpts)),
      },
    },
    common,
    fontMeta,
    isAdaptive: false,
  };
}

/* -------------------------------------------------------------------------------------------------
 * HeroUI -> skill token mapping (reference/tokens.md, "Mapping table")
 * -----------------------------------------------------------------------------------------------*/

/** Each skill token and the HeroUI variable it takes its value from. */
export const SKILL_TOKEN_SOURCES: Array<[skill: string, hero: string]> = [
  ["--background", "--background"],
  ["--foreground", "--foreground"],
  ["--card-foreground", "--surface-foreground"],
  ["--popover", "--overlay"],
  ["--popover-foreground", "--overlay-foreground"],
  ["--primary", "--accent"],
  ["--primary-foreground", "--accent-foreground"],
  ["--secondary", "--default"],
  ["--secondary-foreground", "--default-foreground"],
  ["--muted", "--default"],
  ["--muted-foreground", "--muted"],
  ["--accent", "--default"],
  ["--accent-foreground", "--default-foreground"],
  ["--destructive", "--danger"],
  ["--destructive-foreground", "--danger-foreground"],
  ["--border", "--border"],
  ["--input", "--field-background"],
  ["--ring", "--focus"],
  ["--sidebar", "--background"],
  ["--sidebar-foreground", "--foreground"],
  ["--sidebar-primary", "--accent"],
  ["--sidebar-primary-foreground", "--accent-foreground"],
  ["--sidebar-accent", "--default"],
  ["--sidebar-accent-foreground", "--default-foreground"],
  ["--sidebar-border", "--border"],
  ["--default", "--default"],
  ["--default-foreground", "--default-foreground"],
  ["--success", "--success"],
  ["--success-foreground", "--success-foreground"],
  ["--warning", "--warning"],
  ["--warning-foreground", "--warning-foreground"],
  ["--surface", "--surface"],
  ["--surface-secondary", "--surface-secondary"],
  ["--surface-tertiary", "--surface-tertiary"],
  ["--segment", "--segment"],
  ["--segment-foreground", "--segment-foreground"],
  ["--default-soft", "--default-soft"],
  ["--default-soft-foreground", "--default-soft-foreground"],
  ["--primary-soft", "--accent-soft"],
  ["--primary-soft-foreground", "--accent-soft-foreground"],
  ["--destructive-soft", "--danger-soft"],
  ["--destructive-soft-foreground", "--danger-soft-foreground"],
  ["--warning-soft", "--warning-soft"],
  ["--warning-soft-foreground", "--warning-soft-foreground"],
  ["--success-soft", "--success-soft"],
  ["--success-soft-foreground", "--success-soft-foreground"],
];

/** HeroUI variables the skill has no token for (they are not emitted). */
export const UNMAPPED_HERO_VARS = [
  "--scrollbar",
  "--separator",
  "--field-foreground",
  "--field-placeholder",
  "--field-border",
  "--surface-secondary-foreground",
  "--surface-tertiary-foreground",
  "--accent-hover",
  "--default-hover",
  "--danger-hover",
  "--success-hover",
  "--warning-hover",
  "--surface-hover",
  "--field-hover",
  "--field-focus",
  "--field-border-hover",
  "--field-border-focus",
  "--accent-soft-hover",
  "--danger-soft-hover",
  "--success-soft-hover",
  "--warning-soft-hover",
  "--default-soft-hover",
  "--background-secondary",
  "--background-tertiary",
  "--background-inverse",
  "--border-secondary",
  "--border-tertiary",
  "--separator-secondary",
  "--separator-tertiary",
];

/** Rewrite HeroUI var() references inside derived formulas to the skill's names. */
function renameRefs(value: string): string {
  return value.replace(/var\(--accent\)/g, "var(--primary)").replace(/var\(--danger\)/g, "var(--destructive)");
}

export function toSkillTokens(hero: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};

  for (const [skill, src] of SKILL_TOKEN_SOURCES) {
    const v = hero[src];

    if (v !== undefined) out[skill] = renameRefs(v);
  }

  return out;
}

export interface SkillTheme {
  light: Record<string, string>;
  dark: Record<string, string>;
  radius: string;
  fieldRadius: string;
  fontMeta: FontMeta;
  vibrant: boolean;
}

export function computeSkillTheme(variables: ThemeVariables): SkillTheme {
  const hero = computeHeroVars(variables);

  return {
    dark: toSkillTokens(hero.colors.dark),
    fieldRadius: radiusCssMap[variables.formRadius],
    fontMeta: hero.fontMeta,
    light: toSkillTokens(hero.colors.light),
    radius: radiusCssMap[variables.radius],
    vibrant: variables.vibrantPalette ?? false,
  };
}
