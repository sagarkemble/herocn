/**
 * Builds registry.json from components/ui, hooks, tokens, and theme templates.
 * Run: node scripts/generate-registry.mjs
 */
import {readdirSync, readFileSync, writeFileSync} from "node:fs";
import {basename, dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NS = "@herocn";
const AUTHOR = "Sagar Kemble";
const HOMEPAGE = "https://herocn.sagarkemble.dev";
const REGISTRY_URL = `${HOMEPAGE}/r/{name}.json`;

const BUILTIN = new Set(["react", "react-dom", "next", "next/font", "next/image"]);

const TITLES = {
  "alert-dialog": "Alert Dialog",
  "aspect-ratio": "Aspect Ratio",
  "button-group": "Button Group",
  "code-block": "Code Block",
  "context-menu": "Context Menu",
  "dropdown-menu": "Dropdown Menu",
  "hover-card": "Hover Card",
  "input-group": "Input Group",
  "input-otp": "Input OTP",
  "message-scroller": "Message Scroller",
  "native-select": "Native Select",
  "navigation-menu": "Navigation Menu",
  "radio-group": "Radio Group",
  "scroll-area": "Scroll Area",
  "toggle-group": "Toggle Group",
  "use-mobile": "useIsMobile",
};

function titleCase(name) {
  return TITLES[name] ?? name.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join(" ");
}

function pkgName(specifier) {
  if (specifier.startsWith("@")) {
    const [scope, name] = specifier.split("/");
    return `${scope}/${name}`;
  }
  return specifier.split("/")[0];
}

function parseFile(absPath) {
  const src = readFileSync(absPath, "utf8");
  const deps = new Set();
  const registryDeps = new Set();
  const importRe = /from\s+["']([^"']+)["']/g;
  let m;
  while ((m = importRe.exec(src))) {
    const spec = m[1];
    if (spec.startsWith("@/components/ui/")) {
      registryDeps.add(`${NS}/${spec.replace("@/components/ui/", "")}`);
      continue;
    }
    if (spec === "@/hooks/use-mobile") {
      registryDeps.add(`${NS}/use-mobile`);
      continue;
    }
    if (spec === "@/lib/utils" || spec.startsWith("@/") || spec.startsWith(".") || spec.startsWith("next")) {
      continue;
    }
    const pkg = pkgName(spec);
    if (!BUILTIN.has(pkg) && pkg !== "react" && !spec.startsWith("node:")) {
      deps.add(pkg);
    }
  }
  return {deps: [...deps].sort(), registryDeps: [...registryDeps].sort()};
}

function uiItem(file) {
  const name = basename(file, ".tsx");
  const {deps, registryDeps} = parseFile(join(ROOT, "components/ui", file));
  const allRegistry = [`${NS}/style`, ...registryDeps.filter((d) => d !== `${NS}/style`)];
  return {
    name,
    type: "registry:ui",
    title: titleCase(name),
    description: `HeroUI-styled shadcn ${titleCase(name)} primitive. Tokens come from ${NS}/style.`,
    author: AUTHOR,
    categories: ["ui"],
    dependencies: deps,
    registryDependencies: allRegistry,
    files: [{path: `components/ui/${file}`, type: "registry:ui", target: `@ui/${file}`}],
  };
}

function templateItem(file, extraDeps = []) {
  const name = basename(file, ".tsx");
  const {deps, registryDeps} = parseFile(join(ROOT, "components/themes/templates", file));
  const needsShell = file !== "shell.tsx";
  return {
    name: `template-${name}`,
    type: "registry:block",
    title: `${titleCase(name)} template`,
    description: `Theme-builder preview of a ${titleCase(name)} app, built from ${NS} UI components.`,
    author: AUTHOR,
    categories: ["block", "template", name],
    dependencies: [...new Set([...deps, ...extraDeps])].sort(),
    registryDependencies: [`${NS}/style`, ...(needsShell ? [`${NS}/template-shell`] : []), ...registryDeps],
    files: [
      {
        path: `components/themes/templates/${file}`,
        type: "registry:component",
        target: `@components/herocn/${file}`,
      },
    ],
  };
}

const style = {
  name: "style",
  type: "registry:style",
  title: "HeroCN style",
  description:
    "HeroUI v3 tokens, radius scale, focus/invalid rings, and pressible motion for shadcn/ui (herocn). Install this first, or add any @herocn/ui item which depends on it.",
  author: AUTHOR,
  categories: ["style"],
  dependencies: ["cn", "class-variance-authority", "lucide-react", "@base-ui/react"],
  devDependencies: ["tw-animate-css"],
  docs: "herocn is MIT-licensed, © 2026 Maqed (github.com/Maqed/herocn). Keep that notice when redistributing. After install, ensure app/globals.css has @import \"tailwindcss\"; @import \"tw-animate-css\"; @import \"shadcn/tailwind.css\";",
  cssVars: {
    theme: {
      "font-heading": "var(--font-sans)",
      "color-default": "var(--default)",
      "color-default-foreground": "var(--default-foreground)",
      "color-success": "var(--success)",
      "color-success-foreground": "var(--success-foreground)",
      "color-warning": "var(--warning)",
      "color-warning-foreground": "var(--warning-foreground)",
      "color-surface": "var(--surface)",
      "color-surface-secondary": "var(--surface-secondary)",
      "color-surface-tertiary": "var(--surface-tertiary)",
      "color-segment": "var(--segment)",
      "color-segment-foreground": "var(--segment-foreground)",
      "color-default-soft": "var(--default-soft)",
      "color-default-soft-foreground": "var(--default-soft-foreground)",
      "color-primary-soft": "var(--primary-soft)",
      "color-primary-soft-foreground": "var(--primary-soft-foreground)",
      "color-destructive-soft": "var(--destructive-soft)",
      "color-destructive-soft-foreground": "var(--destructive-soft-foreground)",
      "color-warning-soft": "var(--warning-soft)",
      "color-warning-soft-foreground": "var(--warning-soft-foreground)",
      "color-success-soft": "var(--success-soft)",
      "color-success-soft-foreground": "var(--success-soft-foreground)",
      "radius-xs": "calc(var(--radius) * 0.25)",
      "radius-sm": "calc(var(--radius) * 0.5)",
      "radius-md": "calc(var(--radius) * 0.75)",
      "radius-lg": "calc(var(--radius) * 1)",
      "radius-xl": "calc(var(--radius) * 1.5)",
      "radius-2xl": "calc(var(--radius) * 2)",
      "radius-3xl": "calc(var(--radius) * 3)",
      "radius-4xl": "calc(var(--radius) * 4)",
      "animate-skeleton": "skeleton 2s linear infinite",
    },
    light: {
      snow: "oklch(0.9911 0 0)",
      eclipse: "oklch(0.2103 0.0059 285.89)",
      "ease-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      radius: "0.5rem",
      background: "oklch(0.9702 0 0)",
      foreground: "oklch(0.141 0.005 285.823)",
      card: "var(--surface)",
      "card-foreground": "oklch(0.141 0.005 285.823)",
      popover: "var(--surface)",
      "popover-foreground": "oklch(0.141 0.005 285.823)",
      primary: "oklch(0.6204 0.195 253.83)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      secondary: "oklch(0.967 0.001 286.375)",
      "secondary-foreground": "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.94 0.001 286.375)",
      "muted-foreground": "oklch(0.552 0.016 285.938)",
      accent: "oklch(0.94 0.001 286.375)",
      "accent-foreground": "oklch(0.21 0.006 285.885)",
      destructive: "oklch(0.6532 0.2328 25.74)",
      "destructive-foreground": "var(--snow)",
      border: "oklch(90% 0.004 286.32)",
      input: "white",
      ring: "var(--primary)",
      "chart-1": "oklch(0.809 0.105 251.813)",
      "chart-2": "oklch(0.623 0.214 259.815)",
      "chart-3": "oklch(0.546 0.245 262.881)",
      "chart-4": "oklch(0.488 0.243 264.376)",
      "chart-5": "oklch(0.424 0.199 265.638)",
      sidebar: "oklch(0.9702 0 0)",
      "sidebar-foreground": "oklch(0.141 0.005 285.823)",
      "sidebar-primary": "oklch(0.6204 0.195 253.83)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-accent": "oklch(0.93 0.001 286.375)",
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "sidebar-border": "oklch(90% 0.004 286.32)",
      "sidebar-ring": "var(--foreground)",
      default: "oklch(94% 0.001 286.375)",
      "default-foreground": "var(--eclipse)",
      success: "oklch(0.7329 0.1935 150.81)",
      "success-foreground": "var(--eclipse)",
      warning: "oklch(0.7819 0.1585 72.33)",
      "warning-foreground": "var(--eclipse)",
      surface: "white",
      "surface-secondary": "oklch(0.9524 0.0013 286.37)",
      "surface-tertiary": "oklch(0.9373 0.0013 286.37)",
      segment: "var(--snow)",
      "segment-foreground": "var(--eclipse)",
      "default-soft": "color-mix(in oklab, var(--default) 50%, transparent)",
      "default-soft-foreground": "var(--default-foreground)",
      "primary-soft": "color-mix(in oklab, var(--primary) 15%, transparent)",
      "primary-soft-foreground": "color-mix(in oklab, var(--primary) 70%, var(--foreground) 30%)",
      "destructive-soft": "color-mix(in oklab, var(--destructive) 15%, transparent)",
      "destructive-soft-foreground": "color-mix(in oklab, var(--destructive) 70%, var(--foreground) 40%)",
      "warning-soft": "color-mix(in oklab, var(--warning) 15%, transparent)",
      "warning-soft-foreground": "color-mix(in oklab, var(--warning) 80%, var(--foreground) 70%)",
      "success-soft": "color-mix(in oklab, var(--success) 15%, transparent)",
      "success-soft-foreground": "color-mix(in oklab, var(--success) 80%, var(--foreground) 60%)",
    },
    dark: {
      background: "oklch(0.1228 0.0029 285.97)",
      foreground: "oklch(0.985 0 0)",
      card: "var(--surface)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "var(--surface)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.6204 0.195 253.83)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      secondary: "oklch(0.274 0.006 286.033)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.274 0.006 286.033)",
      "muted-foreground": "oklch(0.705 0.015 286.067)",
      accent: "oklch(0.274 0.006 286.033)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.594 0.1967 24.63)",
      "destructive-foreground": "var(--snow)",
      border: "oklch(28% 0.006 286.033)",
      input: "oklch(0.2103 0.0059 285.89)",
      ring: "var(--primary)",
      sidebar: "oklch(0.1228 0.0029 285.97)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.6204 0.195 253.83)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-accent": "oklch(0.274 0.006 286.033)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(28% 0.006 286.033)",
      "sidebar-ring": "var(--foreground)",
      default: "oklch(27.4% 0.006 286.033)",
      "default-foreground": "var(--snow)",
      warning: "oklch(0.8203 0.1388 76.34)",
      "warning-foreground": "var(--eclipse)",
      surface: "oklch(0.2103 0.0059 285.89)",
      "surface-secondary": "oklch(0.257 0.0037 286.14)",
      "surface-tertiary": "oklch(0.2721 0.0024 247.91)",
      segment: "oklch(0.3964 0.01 285.93)",
      "segment-foreground": "var(--foreground)",
      "default-soft": "color-mix(in oklab, var(--default) 50%, transparent)",
      "default-soft-foreground": "var(--default-foreground)",
      "primary-soft": "color-mix(in oklab, var(--primary) 12%, transparent)",
      "primary-soft-foreground": "color-mix(in oklab, var(--primary) 80%, var(--foreground) 30%)",
      "destructive-soft": "color-mix(in oklab, var(--destructive) 15%, transparent)",
      "destructive-soft-foreground": "color-mix(in oklab, var(--destructive) 80%, var(--foreground) 30%)",
      "warning-soft": "color-mix(in oklab, var(--warning) 12%, transparent)",
      "warning-soft-foreground": "color-mix(in oklab, var(--warning) 80%, var(--foreground) 30%)",
      "success-soft": "color-mix(in oklab, var(--success) 12%, transparent)",
      "success-soft-foreground": "color-mix(in oklab, var(--success) 80%, var(--foreground) 30%)",
    },
  },
  css: {
    "@custom-variant dark": "&:is(.dark *)",
    "@utility focus-ring": {
      "@apply": "ring-2 ring-ring ring-offset-2 ring-offset-background outline-none",
    },
    "@utility focus-field-ring": {
      "@apply": "ring-2 ring-ring ring-offset-0 outline-none",
    },
    "@utility invalid-field-ring": {
      "@apply": "outline-1 outline-destructive outline-solid",
    },
    "@utility invalid-field-ring-focus": {
      "@apply": "ring-2 outline-none ring-destructive ring-offset-0",
    },
    "@utility pressible": {
      transition: "transform 250ms var(--ease-smooth), background-color 100ms var(--ease-out), box-shadow 100ms var(--ease-out)",
      "@apply": "transform-gpu motion-reduce:transition-none active:scale-[0.97] aria-expanded:scale-[0.97]",
    },
    "@keyframes skeleton": {
      "100%": {transform: "translateX(200%)"},
    },
    ".skeleton--shimmer": {
      "@apply": "relative overflow-hidden rtl:[--skeleton-animation-dir:reverse]",
    },
  },
};

const utils = {
  name: "utils",
  type: "registry:lib",
  title: "cn utils",
  description: "Re-exports cn from the cn package for @/lib/utils imports.",
  author: AUTHOR,
  dependencies: ["cn"],
  files: [{path: "lib/utils.ts", type: "registry:lib", target: "@lib/utils.ts"}],
};

const useMobile = {
  name: "use-mobile",
  type: "registry:hook",
  title: "useIsMobile",
  description: "Breakpoint hook used by Sidebar.",
  author: AUTHOR,
  files: [{path: "hooks/use-mobile.ts", type: "registry:hook", target: "@hooks/use-mobile.ts"}],
};

const themeProvider = {
  name: "theme-provider",
  type: "registry:component",
  title: "Theme provider",
  description: "next-themes provider with a D hotkey to toggle light/dark.",
  author: AUTHOR,
  dependencies: ["next-themes", "cn"],
  files: [
    {
      path: "components/theme-provider.tsx",
      type: "registry:component",
      target: "@components/theme-provider.tsx",
    },
  ],
};

const uiFiles = readdirSync(join(ROOT, "components/ui"))
  .filter((f) => f.endsWith(".tsx"))
  .sort();
const uiItems = uiFiles.map(uiItem);

const templates = [
  templateItem("shell.tsx"),
  templateItem("dashboard.tsx", ["recharts"]),
  templateItem("mail.tsx"),
  templateItem("chat.tsx"),
  templateItem("finances.tsx", ["recharts"]),
  templateItem("crm.tsx"),
];

const index = {
  name: "index",
  type: "registry:base",
  title: "HeroCN kit",
  description: "Installs the HeroCN style, utils, hook, and every UI primitive.",
  author: AUTHOR,
  categories: ["kit"],
  docs: `Add the registry first:\n\nnpx shadcn@latest registry add "${NS}=${REGISTRY_URL}"\n\nThen: npx shadcn@latest add ${NS}/index`,
  registryDependencies: [`${NS}/style`, `${NS}/utils`, `${NS}/use-mobile`, `${NS}/theme-provider`, ...uiItems.map((i) => `${NS}/${i.name}`)],
};

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "herocn",
  homepage: HOMEPAGE,
  items: [style, utils, useMobile, themeProvider, ...uiItems, ...templates, index],
};

writeFileSync(join(ROOT, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
console.log(`Wrote registry.json with ${registry.items.length} items`);
