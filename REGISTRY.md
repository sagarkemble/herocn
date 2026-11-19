# @herocn registry

Hosted at **[https://herocn.sagarkemble.dev](https://herocn.sagarkemble.dev)**. Anyone with a shadcn/ui (Base UI / nova) app can pull HeroUI-styled primitives, tokens, and app templates with the CLI. The CLI copies source into the consumer project — nothing is published as an npm component package.

herocn look is MIT, © 2026 Maqed ([herocn](https://github.com/Maqed/herocn)). Keep that notice when you redistribute.

## What ships

| Kind | Item names | What you get |
|---|---|---|
| Style | `style` | HeroUI v3 tokens (`--surface`, `--default`, soft colors, radius scale), `focus-ring`, `pressible` |
| Lib | `utils` | `lib/utils.ts` (`cn`) |
| Hook | `use-mobile` | Sidebar breakpoint hook |
| Component | `theme-provider` | `next-themes` wrapper |
| UI | `button`, `input`, `card`, … (64) | Restyled `components/ui/*` |
| Blocks | `template-dashboard`, `template-mail`, `template-chat`, `template-finances`, `template-crm`, `template-shell` | Theme-page app previews |
| Kit | `index` | Style + utils + hook + every UI file |

Bare names like `button` still mean **official shadcn**. Always prefix **`@herocn/`**.

## Consumers

### 1. Point `components.json` at the registry

```bash
npx shadcn@latest registry add "@herocn=https://herocn.sagarkemble.dev/r/{name}.json"
```

Or paste into `components.json`:

```json
{
  "registries": {
    "@herocn": "https://herocn.sagarkemble.dev/r/{name}.json"
  }
}
```

`{name}` is required. `@herocn/button` → `https://herocn.sagarkemble.dev/r/button.json`. Catalog: `https://herocn.sagarkemble.dev/r/registry.json`. Human index: [https://herocn.sagarkemble.dev/registry](https://herocn.sagarkemble.dev/registry).

Local app:

```bash
npx shadcn@latest registry add "@herocn=http://localhost:3103/r/{name}.json"
```

### 2. Requirements in the target app

- Tailwind **v4**
- shadcn style **base-nova** (Base UI), `tsx`, CSS variables
- CSS already has:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

### 3. Install

```bash
npx shadcn@latest add @herocn/button
npx shadcn@latest add @herocn/index
npx shadcn@latest add @herocn/template-dashboard
```

`button` (and every UI item) depends on `@herocn/style`, so tokens install with the first component.

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Click me</Button>
}
```

### 4. Discover

```bash
npx shadcn@latest list @herocn
npx shadcn@latest search @herocn --query sidebar
npx shadcn@latest view @herocn/button
npx shadcn@latest add https://herocn.sagarkemble.dev/r/button.json
```

Prefer the `@herocn/` namespace so `registryDependencies` resolve to this registry, not stock shadcn.

## Maintainers

```bash
bun run registry:generate   # rewrite registry.json from source files
bun run registry:build      # generate + write public/r/*.json
```

Commit **both** `registry.json` and `public/r/`, then deploy so `https://herocn.sagarkemble.dev/r/*.json` stays in sync.

Local check:

```bash
npx shadcn@latest list http://localhost:3103/r/registry.json
npx shadcn@latest view http://localhost:3103/r/button.json
```

Optional: submit `@herocn` to the [shadcn registry index](https://ui.shadcn.com/docs/registry/registry-index) with URL `https://herocn.sagarkemble.dev/r/{name}.json`.

## Agent skills

Same GitHub repo can also be installed as skills (`npx skills add sagarkemble/herocn --skill shadcn-to-heroui` or `heroui-customize`). Page: [https://herocn.sagarkemble.dev/docs/skills](https://herocn.sagarkemble.dev/docs/skills).
