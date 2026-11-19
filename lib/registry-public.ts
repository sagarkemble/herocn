export const HEROCN_ORIGIN = "https://herocn.sagarkemble.dev";
export const HEROCN_NS = "@herocn";
export const HEROCN_REGISTRY_TEMPLATE = `${HEROCN_ORIGIN}/r/{name}.json`;

export const packageManagers = [
  {id: "pnpm", label: "pnpm", dlx: "pnpm dlx", install: "pnpm add"},
  {id: "npm", label: "npm", dlx: "npx", install: "npm install"},
  {id: "yarn", label: "yarn", dlx: "yarn dlx", install: "yarn add"},
  {id: "bun", label: "bun", dlx: "bunx --bun", install: "bun add"},
] as const;

export type PackageManagerId = (typeof packageManagers)[number]["id"];

export function addRegistryCommand(dlx: string) {
  return `${dlx} shadcn@latest registry add "${HEROCN_NS}=${HEROCN_REGISTRY_TEMPLATE}"`;
}

export function addComponentCommand(dlx: string, slug: string) {
  return `${dlx} shadcn@latest add ${HEROCN_NS}/${slug}`;
}
