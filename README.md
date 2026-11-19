# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

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
