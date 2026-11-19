# herocn demo + registry

Next.js app that restyles shadcn/ui (Base UI, nova) to HeroUI v3 and **publishes those files as a shadcn registry** (`@herocn`).

Live site: [https://herocn.sagarkemble.dev](https://herocn.sagarkemble.dev). Docs: [REGISTRY.md](./REGISTRY.md). Catalog: [/registry](https://herocn.sagarkemble.dev/registry). JSON: [/r/registry.json](https://herocn.sagarkemble.dev/r/registry.json).

```bash
npx shadcn@latest registry add "@herocn=https://herocn.sagarkemble.dev/r/{name}.json"
npx shadcn@latest add @herocn/button
```

## Agent skills

Docs: [/docs/skills](https://herocn.sagarkemble.dev/docs/skills). After this repo is on GitHub:

```bash
npx skills add sagarkemble/herocn --skill shadcn-to-heroui
npx skills add sagarkemble/herocn --skill heroui-customize
npx skills add sagarkemble/herocn --skill visualize-design-system
```

Zips: [`/skills/shadcn-to-heroui.zip`](https://herocn.sagarkemble.dev/skills/shadcn-to-heroui.zip), [`/skills/heroui-customize.zip`](https://herocn.sagarkemble.dev/skills/heroui-customize.zip), [`/skills/visualize-design-system.zip`](https://herocn.sagarkemble.dev/skills/visualize-design-system.zip).

## Adding components (this repo)

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Landing pass 3 notes
- heroui.com's marketing-page source is not public (heroui-inc/heroui only ships `apps/docs`), so layout values were taken from the live site's CSS/DOM and measured section by section.
- Headline font: heroui.com uses Britti Sans (commercial). We use Inter Tight via next/font; `display-statement` pins `line-height: 1` to match Britti's `normal` metrics.
- Hero glyphs are our own SVG drawings using the same technique (white outline, gradient fill, blur/scale cross-fade). No heroui.com images, logos or wallpapers are copied; wallpapers are explicit-colour CSS gradients (light + dark variants in `app/globals.css`).
