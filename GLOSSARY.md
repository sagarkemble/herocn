# herocn

Language for the demo, `@herocn` registry, and agent skills that restyle shadcn (Base UI, nova) to a HeroUI v3 look.

## Language

**herocn**:
The product in this repo: demo site, shadcn registry namespace `@herocn`, and published skills. Not an npm component library.
_Avoid_: s2h-landing, HeroUI (as the package)

**HeroUI**:
The official design system (heroui-inc). We mimic look; we do not depend on `@heroui/react`.

**Guide**:
A DocsShell article that teaches the product (Introduction, Installation, Colors, Theming, Dark mode).
_Avoid_: docs page (when you mean a component preview)

**Skill page**:
Documentation for one installable agent skill under `/docs/skills/[name]`.
_Avoid_: UI for Agents (HeroUI’s group name)

**Component page**:
A primitive preview at `/docs/react/components/[slug]` (Install, Usage, examples).
_Avoid_: API reference

**Colors**:
The static herocn token set, shown as live CSS-variable swatches.
_Avoid_: theme (when you mean the palette itself)

**Theming**:
Changing those tokens via `/themes`, View code CSS, or `heroui-customize`.
_Avoid_: Colors

**Registry catalog**:
The human list of `@herocn` items at `/registry`, distinct from Installation.

**View code**:
The `:root` + `.dark` CSS dump from `/themes` in herocn token names.

**pressible**:
The herocn press-scale utility.

**NOT FOUND**:
The required answer when a measured or official value does not exist.
