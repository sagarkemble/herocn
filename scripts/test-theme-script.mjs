#!/usr/bin/env node
/**
 * Oracle test for skills/heroui-customize/scripts/theme-to-css.mjs.
 * Runs the site's own TypeScript (lib/theme-editor via jiti) and checks the skill script prints
 * byte-for-byte the same "View code" CSS for the default theme, every preset and custom links.
 */
import {createJiti} from "jiti";
import {execFileSync} from "node:child_process";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, {jsx: true});
const {generateGlobalsCss} = await jiti.import(join(root, "lib/theme-editor/generate-css.ts"));
const {parseState} = await jiti.import(join(root, "lib/theme-editor/state.ts"));
const {themes, themeValuesById} = await jiti.import(join(root, "lib/theme-editor/constants.ts"));
const script = join(root, "skills/heroui-customize/scripts/theme-to-css.mjs");
const run = (...args) => execFileSync(process.execPath, [script, ...args], {encoding: "utf8"});

/** What the page renders in View code: generateGlobalsCss(state) where state comes from the URL. */
const oracleUrl = (search) => generateGlobalsCss(parseState(search));
/** What the page renders after clicking a preset swatch on a fresh /themes page (useApplyTheme). */
const oraclePreset = (id) => {
  const v = themeValuesById[id];

  return generateGlobalsCss({
    ...parseState(""),
    base: v.base,
    chroma: v.chroma,
    fontFamily: v.fontFamily,
    formRadius: v.formRadius,
    hue: v.hue,
    lightness: v.lightness,
    radius: v.radius,
  });
};

const SITE = "https://herocn.sagarkemble.dev/themes";
const urls = [
  SITE,
  `${SITE}?hue=150&chroma=0.2&lightness=0.7`,
  `${SITE}?base=0.008&chroma=0.12&fontFamily=figtree&formRadius=extra-large&hue=20&lightness=0.66&radius=none`,
  `${SITE}?hue=305.5&chroma=0.13&lightness=0.77&vibrantPalette=true&radius=large`,
  `${SITE}?chroma=0&hue=0&lightness=0&base=0&radius=small&formRadius=small`,
  `${SITE}?fontFamily=${encodeURIComponent("https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap")}&hue=200`,
  `${SITE}?hue=abc&radius=huge&lockedVariables=hue,chroma`,
  "?chroma=0.2349&hue=27.99&lightness=0.5814&base=0&radius=extra-small&formRadius=extra-small",
];

let pass = 0;
let fail = 0;
const check = (label, got, want) => {
  if (got === want) pass++;
  else {
    fail++;
    console.error(`FAIL ${label}`);
  }
};

for (const u of urls) {
  const search = u.includes("?") ? u.slice(u.indexOf("?")) : "";

  check(`--url ${u}`, run("--url", u), oracleUrl(search));
}
for (const t of themes) {
  check(`--preset ${t.id}`, run("--preset", t.id), oraclePreset(t.id));
  check(`--preset "${t.label}"`, run("--preset", t.label.toUpperCase()), oraclePreset(t.id));
}
// A preset's own theme link must give the same CSS as --preset.
const mod = await import(script);

for (const t of themes) {
  const st = mod.stateForPreset(mod.findPreset(t.id));
  const q = new URLSearchParams(
    Object.entries(st)
      .filter(([k, v]) => k !== "lockedVariables" && v !== mod.DEFAULTS[k])
      .map(([k, v]) => [k, String(v)]),
  ).toString();

  check(`link for ${t.id}`, run("--url", `${SITE}?${q}`), oraclePreset(t.id));
}

console.log(`theme-to-css: ${pass} passed, ${fail} failed (${urls.length} links, ${themes.length} presets x3)`);
process.exit(fail ? 1 : 0);
