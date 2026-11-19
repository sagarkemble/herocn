#!/usr/bin/env node
/**
 * heroui-customize: merge a theme CSS block into a project's globals.css. No dependencies.
 *
 *   node merge-tokens.mjs --into app/globals.css --css theme.css [--dry-run]
 *   node theme-to-css.mjs --preset spotify | node merge-tokens.mjs --into app/globals.css
 *
 * Input: the /themes "View code" output, or any block with `:root { … }` and `.dark { … }` (shadcn-to-heroui
 * names like --primary, or raw HeroUI names like --accent / --field-background, which are mapped with the
 * same table the theme page uses). Only token VALUES are taken from the input; nothing is invented.
 *
 * Merge rules: in the target's top-level `:root` and `.dark` blocks, replace the value of every token the
 * input defines and append missing skill tokens; every other variable (app-specific) is kept untouched.
 * Font: if the target wires `--font-sans` to a next/font variable (`var(--font-…)`), it is left alone and the
 * required family is reported; otherwise `@theme inline --font-sans` and the font `@import url(…)` are set.
 * A non-default form radius is written as a marked block at the end of the file (replaced on re-run).
 */
import {readFileSync, writeFileSync} from "node:fs";

import {ORDER, SKILL_TOKEN_SOURCES, UNMAPPED_HERO_VARS, renameRefs} from "./theme-to-css.mjs";

const SKILL_TOKENS = new Set([
  "--radius",
  "--snow",
  "--eclipse",
  "--ease-smooth",
  "--ease-out",
  ...ORDER.filter((x) => typeof x === "string" && x.startsWith("--")),
  ...ORDER.filter(Array.isArray).map((x) => x[0]),
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
  "--sidebar-ring",
]);
const HERO_ONLY = new Set(["--field-background", "--overlay", "--danger", "--focus", "--accent-soft", "--surface-foreground"]);
const REQUIRED = ["--background", "--foreground", "--primary", "--primary-foreground", "--border", "--ring"];
const MARK_START = "/* heroui-customize:field-radius:start */";
const MARK_END = "/* heroui-customize:field-radius:end */";

/* ------------------------------------------------------------------ tiny CSS scanner */

/** Top-level blocks: {selector, start, open, close, end}. Skips comments and strings. */
function topBlocks(css) {
  const blocks = [];
  let depth = 0;
  let selStart = 0;
  let cur = null;

  for (let i = 0; i < css.length; i++) {
    const ch = css[i];

    if (ch === "/" && css[i + 1] === "*") {
      const e = css.indexOf("*/", i + 2);

      i = e === -1 ? css.length : e + 1;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const e = css.indexOf(ch, i + 1);

      i = e === -1 ? css.length : e;
      continue;
    }
    if (ch === ";" && depth === 0) selStart = i + 1;
    else if (ch === "{") {
      if (depth === 0) cur = {open: i, selector: stripComments(css.slice(selStart, i)).trim(), start: selStart};
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && cur) {
        blocks.push({...cur, close: i, end: i + 1});
        cur = null;
        selStart = i + 1;
      }
    }
  }

  return blocks;
}

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");

/** Declarations of a block body: [{name, value, start, end}] (positions relative to the whole css). */
function decls(css, block) {
  const out = [];
  const body = css.slice(block.open + 1, block.close);
  const re = /(^|[;{\s])(--[\w-]+)\s*:\s*([^;{}]*?)\s*;/g;
  let m;
  const clean = body.replace(/\/\*[\s\S]*?\*\//g, (c) => " ".repeat(c.length));

  while ((m = re.exec(clean))) {
    const nameStart = block.open + 1 + m.index + m[1].length;

    out.push({end: block.open + 1 + m.index + m[0].length, name: m[2], start: nameStart, value: body.slice(m.index + m[0].indexOf(m[3], m[1].length + m[2].length), m.index + m[0].length - 1).trim()});
  }

  return out;
}

const isRoot = (sel) => sel === ":root";
const isDark = (sel) => /^\.dark$|^\.dark\s*,|^:root\.dark$|^\[data-theme=["']?dark["']?\]$/.test(sel);

/* ------------------------------------------------------------------ parse + validate input */

function validValue(v) {
  if (!v || /[{};]/.test(v)) return false;
  let d = 0;

  for (const ch of v) {
    if (ch === "(") d++;
    else if (ch === ")" && --d < 0) return false;
  }

  return d === 0;
}

function parseInput(css) {
  const blocks = topBlocks(css);
  const light = {};
  const dark = {};
  let fontSans;
  let fieldRadius;
  const fieldRule = blocks.find((b) => /\[data-slot=/.test(b.selector) && /var\(--field-radius\)/.test(css.slice(b.open, b.close)));

  for (const b of blocks) {
    const ds = decls(css, b);

    if (isRoot(b.selector)) {
      for (const d of ds) {
        if (d.name === "--field-radius") fieldRadius = d.value;
        else light[d.name] = d.value;
      }
    } else if (isDark(b.selector)) for (const d of ds) dark[d.name] = d.value;
    else if (/^@theme/.test(b.selector)) for (const d of ds) if (d.name === "--font-sans") fontSans = d.value;
  }
  const imports = [...stripComments(css).matchAll(/@import\s+url\(\s*["']?([^"')]+)["']?\s*\)\s*;/g)].map((m) => m[1]);
  const all = {...light, ...dark};
  const heroRaw = !("--primary" in all) && Object.keys(all).some((k) => HERO_ONLY.has(k));

  return {dark, fieldRadius: fieldRule ? fieldRadius : undefined, fieldSelectors: fieldRule?.selector, fontSans, heroRaw, imports, light};
}

function toSkill(vars, report, mode) {
  const out = {};

  for (const [k, v] of Object.entries(vars)) if (["--radius", "--snow", "--eclipse", "--ease-smooth", "--ease-out", "--card", "--sidebar-ring"].includes(k) || /^--chart-\d$/.test(k)) out[k] = v;
  for (const [skill, hero] of SKILL_TOKEN_SOURCES) if (vars[hero] !== undefined) out[skill] = renameRefs(vars[hero]);
  for (const k of Object.keys(vars)) {
    if (UNMAPPED_HERO_VARS.includes(k)) report.dropped.push(`${mode} ${k} (HeroUI-only, no skill token)`);
    else if (!SKILL_TOKEN_SOURCES.some(([, h]) => h === k) && !(k in out)) report.dropped.push(`${mode} ${k} (unknown name)`);
  }

  return out;
}

/* ------------------------------------------------------------------ merge */

function mergeBlock(css, block, tokens, mode, report) {
  const existing = decls(css, block);
  const edits = [];
  const seen = new Set();

  for (const d of existing) {
    if (!(d.name in tokens) || seen.has(d.name)) continue;
    seen.add(d.name);
    if (d.value !== tokens[d.name]) {
      edits.push({end: d.end, start: d.start, text: `${d.name}: ${tokens[d.name]};`});
      report.changed.push([mode, d.name, d.value, tokens[d.name]]);
    } else report.same++;
  }
  const missing = Object.keys(tokens).filter((k) => !seen.has(k));

  if (missing.length) {
    const indentMatch = /\n([ \t]+)--/.exec(css.slice(block.open, block.close));
    const indent = indentMatch ? indentMatch[1] : "\t";
    const before = css.slice(block.open + 1, block.close).replace(/\s+$/, "");
    const tail = missing.map((k) => `${indent}${k}: ${tokens[k]};`).join("\n");

    for (const k of missing) report.added.push([mode, k, tokens[k]]);
    edits.push({end: block.close, start: block.open + 1, text: `${before}\n\n${indent}/* added by heroui-customize */\n${tail}\n`, whole: true});
  }

  return edits;
}

function applyEdits(css, edits) {
  // a "whole" edit rewrites the block body, so apply value edits to the body first.
  const whole = edits.filter((e) => e.whole);
  const plain = edits.filter((e) => !e.whole).sort((a, b) => b.start - a.start);
  let out = css;

  for (const w of whole) {
    let body = out.slice(w.start, w.end);
    const inner = plain.filter((e) => e.start >= w.start && e.end <= w.end);

    for (const e of inner) body = body.slice(0, e.start - w.start) + e.text + body.slice(e.end - w.start);
    // rebuild: take edited body, then append the tail from w.text
    const tail = w.text.slice(w.text.indexOf("\n\n"));

    w.final = body.replace(/\s+$/, "") + tail;
    w.inner = inner;
  }
  const used = new Set(whole.flatMap((w) => w.inner));
  const all = [...plain.filter((e) => !used.has(e)), ...whole.map((w) => ({end: w.end, start: w.start, text: w.final}))].sort((a, b) => b.start - a.start);

  for (const e of all) out = out.slice(0, e.start) + e.text + out.slice(e.end);

  return out;
}

function main(argv) {
  const get = (f) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : undefined);
  const into = get("--into");
  const src = get("--css");
  const dry = argv.includes("--dry-run");

  if (!into) {
    console.error("Usage: node merge-tokens.mjs --into app/globals.css [--css theme.css | < theme.css] [--dry-run]");
    process.exit(1);
  }
  const input = src ? readFileSync(src, "utf8") : readFileSync(0, "utf8");
  const target = readFileSync(into, "utf8");
  const parsed = parseInput(input);
  const report = {added: [], changed: [], dropped: [], errors: [], notes: [], same: 0};

  if (parsed.heroRaw) report.notes.push("Input uses raw HeroUI names (--accent = brand). Mapped to skill names (--accent -> --primary, --field-background -> --input, …).");
  const light = parsed.heroRaw ? toSkill(parsed.light, report, ":root") : parsed.light;
  const dark = parsed.heroRaw ? toSkill(parsed.dark, report, ".dark") : parsed.dark;

  for (const [mode, vars] of [[":root", light], [".dark", dark]]) {
    for (const [k, v] of Object.entries(vars)) {
      if (!validValue(v)) {
        report.errors.push(`${mode} ${k}: invalid value "${v}"`);
        delete vars[k];
      } else if (!parsed.heroRaw && !SKILL_TOKENS.has(k)) {
        report.dropped.push(`${mode} ${k} (not a shadcn-to-heroui token; add it by hand if the app needs it)`);
        delete vars[k];
      }
    }
  }
  if (!Object.keys(light).length) report.errors.push("No :root tokens found in the input.");
  for (const k of REQUIRED) {
    if (Object.keys(light).length && !(k in light)) report.errors.push(`:root is missing ${k}`);
    if (Object.keys(dark).length && !(k in dark)) report.errors.push(`.dark is missing ${k}`);
  }
  if (!Object.keys(dark).length) report.notes.push("Input has no .dark block: dark-mode values are left as they are.");

  const blocks = topBlocks(target);
  const rootB = blocks.find((b) => isRoot(b.selector) && decls(target, b).some((d) => d.name === "--background" || d.name === "--primary"));
  const darkB = blocks.find((b) => isDark(b.selector));

  if (!rootB) report.errors.push(`${into}: no top-level :root block with shadcn tokens`);
  if (Object.keys(dark).length && !darkB) report.errors.push(`${into}: no top-level .dark block`);
  const heroStyled = /--surface\s*:/.test(target) && /--primary-soft\s*:/.test(target) && /@utility\s+pressible/.test(target);

  if (!heroStyled) report.errors.push(`${into} is not HeroUI-styled yet (no --surface / --primary-soft / pressible). Run the shadcn-to-heroui skill (or npx shadcn@latest add @herocn/style) first.`);

  if (report.errors.length) {
    console.error(`heroui-customize: not merged.\n  - ${report.errors.join("\n  - ")}`);
    process.exit(2);
  }

  let edits = [...mergeBlock(target, rootB, light, ":root", report)];

  if (darkB && Object.keys(dark).length) edits.push(...mergeBlock(target, darkB, dark, ".dark", report));
  // font
  const themeB = blocks.find((b) => /^@theme\s+inline/.test(b.selector));
  const fontDecl = themeB && decls(target, themeB).find((d) => d.name === "--font-sans");
  let fontImport;

  if (parsed.fontSans) {
    const family = /"([^"]+)"/.exec(parsed.fontSans)?.[1] ?? parsed.fontSans;

    if (fontDecl && /^var\(--font-/.test(fontDecl.value)) {
      report.notes.push(`Font: theme wants "${family}". ${into} wires --font-sans to ${fontDecl.value} (next/font), so it was not touched. Make the next/font loader for that variable load "${family}" (see SKILL.md step 5).`);
      report.font = {family, wiredTo: fontDecl.value};
    } else if (fontDecl) {
      if (fontDecl.value !== parsed.fontSans) {
        edits.push({end: fontDecl.end, start: fontDecl.start, text: `--font-sans: ${parsed.fontSans};`});
        report.changed.push(["@theme inline", "--font-sans", fontDecl.value, parsed.fontSans]);
      }
      fontImport = parsed.imports[0];
      report.font = {family};
    } else report.notes.push(`Font: theme wants "${family}" but ${into} has no @theme inline --font-sans; left alone.`);
  }
  let out = applyEdits(target, edits);

  if (fontImport && !out.includes(fontImport)) {
    out = `@import url("${fontImport}");\n${out}`;
    report.notes.push(`Added @import url("${fontImport}") at the top of the file.`);
  }
  // form radius block
  const s = out.indexOf(MARK_START);
  const e = out.indexOf(MARK_END);

  if (s !== -1 && e !== -1) out = out.slice(0, s).replace(/\n+$/, "\n") + out.slice(e + MARK_END.length).replace(/^\n+/, "");
  if (parsed.fieldRadius) {
    out = `${out.replace(/\n*$/, "\n")}\n${MARK_START}\n:root {\n\t--field-radius: ${parsed.fieldRadius};\n}\n${parsed.fieldSelectors} {\n\tborder-radius: var(--field-radius);\n}\n${MARK_END}\n`;
    report.notes.push(`Form radius ${parsed.fieldRadius} written as a marked block at the end of ${into}.`);
  } else if (s !== -1) report.notes.push("Removed the previous form-radius block (theme uses the default field radius).");

  if (!dry) writeFileSync(into, out);
  console.log(`heroui-customize: ${dry ? "dry run, nothing written" : `merged into ${into}`}`);
  console.log(`  changed ${report.changed.length}, added ${report.added.length}, unchanged ${report.same}, dropped ${report.dropped.length}`);
  for (const [m, k, a, b] of report.changed) console.log(`  ~ ${m} ${k}: ${a} -> ${b}`);
  for (const [m, k, v] of report.added) console.log(`  + ${m} ${k}: ${v}`);
  for (const d of report.dropped) console.log(`  - skipped ${d}`);
  for (const n of report.notes) console.log(`  note: ${n}`);
  if (argv.includes("--json")) console.log(JSON.stringify(report));
}

main(process.argv.slice(2));
