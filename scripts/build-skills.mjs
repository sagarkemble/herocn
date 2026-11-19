#!/usr/bin/env node
/**
 * Builds the agent skills published at /docs/skills.
 *
 * 1. skills/heroui-customize/scripts/theme-to-css.mjs — a dependency-free port of lib/theme-editor
 *    (the /themes "View code" engine). The TS sources are transpiled and concatenated verbatim, so the
 *    maths is the site's maths, not a re-derivation.
 * 2. skills/heroui-customize/reference/presets.md — the preset table, generated from theme-values.ts.
 * 3. skills/visualize-design-system/reference/{demo-landing,design-system} — snapshot of the
 *    marketing landing and /themes builder for the visualize-design-system skill.
 * 4. public/skills/<name>.zip — one deterministic zip per skill folder (fixed timestamps).
 *
 * Usage: node scripts/build-skills.mjs          (write everything)
 *        node scripts/build-skills.mjs --check  (exit 1 if any generated file is stale)
 */
import {createRequire} from "node:module";
import {existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from "node:fs";
import {dirname, join, relative} from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";
import {crc32, deflateRawSync} from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const ts = require("typescript");
const check = process.argv.includes("--check");
const stale = [];

function emit(path, content) {
  const abs = join(root, path);
  const buf = Buffer.isBuffer(content) ? content : Buffer.from(content);

  if (existsSync(abs) && readFileSync(abs).equals(buf)) return;
  if (check) {
    stale.push(path);

    return;
  }
  mkdirSync(dirname(abs), {recursive: true});
  writeFileSync(abs, buf);
  console.log(`wrote ${path}`);
}

function listFiles(dir) {
  return readdirSync(dir)
    .sort()
    .flatMap((n) => {
      const p = join(dir, n);

      return statSync(p).isDirectory() ? listFiles(p) : [p];
    });
}

function copyTree(fromRel, toRel, rewrite) {
  const from = join(root, fromRel);
  for (const p of listFiles(from)) {
    const rel = relative(from, p).replaceAll("\\", "/");
    let data = readFileSync(p);
    if (rewrite) data = rewrite(rel, data);
    emit(`${toRel}/${rel}`, data);
  }
}

function rewriteUtf8(rel, data, fn) {
  if (!/\.(tsx|ts|css)$/.test(rel)) return data;
  const next = fn(data.toString("utf8"));
  return next === null ? data : Buffer.from(next);
}

/* ------------------------------------------------------------------ 1. theme-to-css.mjs */

const ENGINE_FILES = [
  "theme-values.ts",
  "constants.ts",
  "font-utils.ts",
  "generate-theme-colors.ts",
  "compute.ts",
  "generate-css.ts",
];
/** Only these declarations are taken from state.ts (the rest is React hooks). */
const STATE_DECLS = ["DEFAULTS", "parseFloatParam", "parseRadius", "parseState"];

function transpile(file) {
  const src = readFileSync(join(root, "lib/theme-editor", file), "utf8");

  return ts.transpileModule(src, {
    compilerOptions: {module: ts.ModuleKind.ESNext, removeComments: false, target: ts.ScriptTarget.ES2022},
  }).outputText;
}

function declName(stmt) {
  if (ts.isVariableStatement(stmt)) return stmt.declarationList.declarations.map((d) => d.name.getText());
  if (stmt.name) return [stmt.name.getText()];

  return [];
}

function strip(js, onlyNames) {
  const sf = ts.createSourceFile("x.js", js, ts.ScriptTarget.ES2022, true);
  const out = [];

  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt)) continue;
    if (ts.isExportDeclaration(stmt)) continue;
    if (ts.isExpressionStatement(stmt) && ts.isStringLiteral(stmt.expression)) continue; // "use client"
    if (onlyNames && !declName(stmt).some((n) => onlyNames.includes(n))) continue;
    const text = js.slice(stmt.getFullStart(), stmt.getEnd()).replace(/^(\s*(?:\/\*[\s\S]*?\*\/\s*)*)export\s+/, "$1");

    out.push(text.replace(/^\n+/, ""));
  }

  return out.join("\n");
}

const CLI = String.raw`
/* ------------------------------------------------------------------ CLI (not part of the site) */

const PRESETS = themes.map((t) => ({id: t.id, label: t.label, values: themeValuesById[t.id]}));

function findPreset(name) {
  const key = String(name).trim().toLowerCase().replace(/[\s_]+/g, "-");

  return PRESETS.find((p) => p.id === key || p.label.toLowerCase() === key);
}

/** Exactly what the /themes page does when a preset swatch is clicked on a fresh page (useApplyTheme). */
function stateForPreset(preset) {
  const v = preset.values;

  return {...DEFAULTS, base: v.base, chroma: v.chroma, fontFamily: v.fontFamily, formRadius: v.formRadius, hue: v.hue, lightness: v.lightness, radius: v.radius};
}

/** A full /themes link, a bare "?a=b" query, or "a=b&c=d". */
function stateForUrl(link) {
  const s = String(link).trim();
  let search = s;

  if (/^https?:\/\//i.test(s)) search = new URL(s).search;
  else if (s.includes("?")) search = s.slice(s.indexOf("?"));

  return parseState(search);
}

function usage(code) {
  const out = code ? console.error : console.log;

  out(
    [
      "Usage:",
      '  node theme-to-css.mjs --url "https://herocn.sagarkemble.dev/themes?hue=150&chroma=0.2"',
      "  node theme-to-css.mjs --preset spotify",
      "  node theme-to-css.mjs --list-presets",
      "  add --json to print {state, font, css} instead of the CSS block",
      "",
      "Presets: " + PRESETS.map((p) => p.label).join(", "),
    ].join("\n"),
  );
  process.exit(code);
}

function main(argv) {
  const get = (flag) => {
    const i = argv.indexOf(flag);

    return i === -1 ? undefined : argv[i + 1];
  };

  if (argv.includes("--help") || argv.includes("-h")) usage(0);
  if (argv.includes("--list-presets")) {
    for (const p of PRESETS) console.log(p.id + "\t" + p.label);

    return;
  }
  let state;
  const url = get("--url");
  const presetName = get("--preset");

  if (url !== undefined) state = stateForUrl(url);
  else if (presetName !== undefined) {
    const preset = findPreset(presetName);

    if (!preset) {
      console.error('Unknown preset "' + presetName + '". Known: ' + PRESETS.map((p) => p.label).join(", "));
      process.exit(2);
    }
    state = stateForPreset(preset);
  } else usage(1);

  const css = generateGlobalsCss(state);

  if (argv.includes("--json")) {
    const font = resolveFont(state.fontFamily);

    console.log(JSON.stringify({css, font, preset: findMatchingTheme(state) ?? null, state}, null, 2));
  } else process.stdout.write(css);
}

export {DEFAULTS, ORDER, PRESETS, SKILL_TOKEN_SOURCES, UNMAPPED_HERO_VARS, findMatchingTheme, findPreset, fontMap, generateGlobalsCss, parseState, radiusCssMap, renameRefs, resolveFont, stateForPreset, stateForUrl};

if (process.argv[1] && import.meta.url === new URL("file://" + process.argv[1]).href) main(process.argv.slice(2));
`;

function buildThemeScript() {
  const header = [
    "#!/usr/bin/env node",
    "// GENERATED by scripts/build-skills.mjs from lib/theme-editor/*.ts of https://herocn.sagarkemble.dev — do not edit.",
    "// Theme maths ported from HeroUI (Apache-2.0) apps/docs/src/app/[lang]/themes @ 08d4f13 (v3.2.7).",
    "// Prints the exact /themes \"View code\" globals.css block for a theme link or a preset. No dependencies.",
    "",
  ].join("\n");
  const parts = ENGINE_FILES.map((f) => `/* ================================================= lib/theme-editor/${f} */\n${strip(transpile(f))}`);

  parts.push(`/* ================================================= lib/theme-editor/state.ts (parser only) */\n${strip(transpile("state.ts"), STATE_DECLS)}`);

  return `${header}\n${parts.join("\n\n")}\n${CLI}`;
}

const themeScriptPath = "skills/heroui-customize/scripts/theme-to-css.mjs";
const themeScript = buildThemeScript();

emit(themeScriptPath, themeScript);

/* ------------------------------------------------------------------ 2. presets.md */

async function buildPresetsMd() {
  const tmp = join(root, "node_modules/.cache/build-skills-theme.mjs");

  mkdirSync(dirname(tmp), {recursive: true});
  writeFileSync(tmp, themeScript);
  const mod = await import(`${pathToFileURL(tmp).href}?t=${Date.now()}`);
  const rows = mod.PRESETS.map((p) => {
    const v = p.values;
    const st = mod.stateForPreset(p);
    const font = mod.resolveFont(v.fontFamily).family;
    const over = v.semanticOverrides ? "yes" : "no";

    const query = new URLSearchParams(
      Object.entries(st)
        .filter(([k, val]) => k !== "lockedVariables" && val !== mod.DEFAULTS[k])
        .map(([k, val]) => [k, String(val)]),
    ).toString();

    return `| ${p.label} | \`${p.id}\` | ${v.lightness} | ${v.chroma} | ${v.hue} | ${v.base} | ${v.radius} | ${v.formRadius} | ${font} | ${over} | ${query ? `\`?${query}\`` : "(none)"} |`;
  });

  return [
    "# Theme presets",
    "",
    "GENERATED by `scripts/build-skills.mjs` from `lib/theme-editor/theme-values.ts` (HeroUI theme-builder presets). Do not edit by hand.",
    "",
    "The user can name any preset (case-insensitive, by name or id). Always produce the CSS with",
    "`node scripts/theme-to-css.mjs --preset <id>`; never type these values into CSS yourself.",
    "",
    "Accent = `oklch(lightness chroma hue)`. `base` is the grey chroma of the neutral palette. Radius ids map to",
    "none 0, extra-small 0.125rem, small 0.25rem, medium 0.5rem, large 0.75rem, extra-large 1rem.",
    "\"Semantic overrides\" = the preset ships its own success / warning / danger colours.",
    "",
    "| Preset | id | lightness | chroma | hue | base | radius | form radius | font | semantic overrides | /themes query |",
    "|---|---|---|---|---|---|---|---|---|---|---|",
    ...rows,
    "",
    "Theme link = `https://herocn.sagarkemble.dev/themes` + the query (empty query = Default).",
    "",
  ].join("\n");
}

emit("skills/heroui-customize/reference/presets.md", await buildPresetsMd());

async function buildTokenNamesMd() {
  const mod = await import(`${pathToFileURL(join(root, "node_modules/.cache/build-skills-theme.mjs")).href}?n=${Date.now()}`);
  const fonts = Object.values(mod.fontMap);

  return [
    "# Token names",
    "",
    "GENERATED by `scripts/build-skills.mjs` from `lib/theme-editor/compute.ts` and `constants.ts`. Do not edit by hand.",
    "",
    "## HeroUI name -> shadcn-to-heroui name",
    "",
    "Used by `scripts/merge-tokens.mjs` when pasted CSS uses raw HeroUI names (it has `--accent`/`--field-background`/`--overlay`/`--danger` and no `--primary`).",
    "Careful: in HeroUI `--accent` is the **brand** colour; in shadcn it is the grey hover fill. Never copy `--accent` across by name.",
    "Inside values, `var(--accent)` becomes `var(--primary)` and `var(--danger)` becomes `var(--destructive)`.",
    "",
    "| shadcn-to-heroui token | takes the value of HeroUI |",
    "|---|---|",
    ...mod.SKILL_TOKEN_SOURCES.map(([skill, hero]) => `| \`${skill}\` | \`${hero}\` |`),
    "",
    "Constant in every theme: `--card: var(--surface)`, `--sidebar-ring: var(--foreground)`, `--chart-1..5`, `--snow`, `--eclipse`, `--ease-smooth`, `--ease-out`.",
    "",
    "## HeroUI variables with no skill token (dropped, listed in the report)",
    "",
    mod.UNMAPPED_HERO_VARS.map((v) => `\`${v}\``).join(", "),
    "",
    "## Radius ids",
    "",
    "| id | value |",
    "|---|---|",
    ...Object.entries(mod.radiusCssMap).map(([id, v]) => `| \`${id}\` | \`${v}\` |`),
    "",
    "`--radius` drives every rounded-* class (`rounded-xl` = radius x 1.5 is the default field radius). A form radius different from radius x 1.5 is emitted as `--field-radius` plus a rule on the field `data-slot`s.",
    "",
    "## Fonts the theme editor offers (`fontFamily` param)",
    "",
    "| id | family | Google Fonts CSS |",
    "|---|---|---|",
    ...fonts.map((f) => `| \`${f.id}\` | ${f.label} | ${f.cdnUrl} |`),
    "",
    "A `fontFamily` that is a font CSS URL (fonts.googleapis.com, fonts.gstatic.com, api.fontshare.com, cdnfonts.com, jsDelivr Fontsource) is used as a custom font.",
    "",
  ].join("\n");
}

emit("skills/heroui-customize/reference/token-names.md", await buildTokenNamesMd());

/* ------------------------------------------------------------------ 3. visualize-design-system snapshot */

const vis = "skills/visualize-design-system";
const visRef = `${vis}/reference`;
copyTree("components/landing", `${visRef}/demo-landing/components/landing`);
emit(`${visRef}/demo-landing/page.tsx`, readFileSync(join(root, "app/page.tsx")));
{
  const globals = readFileSync(join(root, "app/globals.css"), "utf8");
  const mark = "/* =====================================================================\n   Landing page-level styles";
  const i = globals.indexOf(mark);
  if (i < 0) throw new Error("landing CSS marker missing from app/globals.css");
  emit(`${visRef}/demo-landing/landing.css`, globals.slice(i));
}
copyTree("lib/theme-editor", `${visRef}/design-system/lib/theme-editor`);
copyTree("components/themes", `${visRef}/design-system/components/themes`, (rel, data) =>
  rewriteUtf8(rel, data, (s) => s.replaceAll("@/app/themes/assets", "@/app/design-system/assets")),
);
copyTree("app/themes", `${visRef}/design-system/app/themes`, (rel, data) =>
  rewriteUtf8(rel, data, (s) => {
    if (rel !== "page.tsx") return s;
    return s
      .replace(
        'title: "HeroUI Theme Builder – Customize React UI (shadcn + shadcn-to-heroui)"',
        'title: "Design system"',
      )
      .replace(
        "Customize colors, radius, and typography using a token system that keeps every component consistent and production-ready.",
        "Preview components and app templates while editing color, radius, and font tokens.",
      );
  }),
);
emit(`${vis}/LICENSE-herocn`, readFileSync(join(root, "skills/shadcn-to-heroui/LICENSE-herocn")));
emit(`${vis}/LICENSE-heroui`, readFileSync(join(root, "skills/heroui-customize/LICENSE-heroui")));

/* ------------------------------------------------------------------ 4. zips */

const DOS_TIME = 0; // 00:00:00
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1; // 2026-01-01, fixed so zips are reproducible

function zip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const {name, data, mode} of entries) {
    const nameBuf = Buffer.from(name);
    const deflated = deflateRawSync(data, {level: 9});
    const crc = crc32(data);
    const local = Buffer.alloc(30);

    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(deflated.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    const central = Buffer.alloc(46);

    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4); // made by: unix
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(deflated.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(((0o100000 | mode) << 16) >>> 0, 38);
    central.writeUInt32LE(offset, 42);
    locals.push(local, nameBuf, deflated);
    centrals.push(central, nameBuf);
    offset += local.length + nameBuf.length + deflated.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);

  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cd.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, cd, end]);
}

for (const name of readdirSync(join(root, "skills")).sort()) {
  const dir = join(root, "skills", name);

  if (!statSync(dir).isDirectory() || !existsSync(join(dir, "SKILL.md"))) continue;
  // The theme script is regenerated above; read it from memory so --check sees the fresh version.
  const entries = listFiles(dir).map((p) => {
    const rel = relative(join(root, "skills"), p);
    const data = rel === relative("skills", themeScriptPath) ? Buffer.from(themeScript) : readFileSync(p);

    return {data, mode: p.endsWith(".mjs") ? 0o755 : 0o644, name: rel};
  });

  emit(`public/skills/${name}.zip`, zip(entries));
}

if (check && stale.length) {
  console.error(`Stale generated files (run npm run skills:build):\n  ${stale.join("\n  ")}`);
  process.exit(1);
}
