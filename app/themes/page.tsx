import type {Metadata} from "next";

import {Suspense} from "react";

import {ThemeBuilder} from "@/components/themes/theme-builder";

export const metadata: Metadata = {
  title: "HeroUI Theme Builder – Customize React UI (shadcn + shadcn-to-heroui)",
  description:
    "Customize colors, radius, and typography using a token system that keeps every component consistent and production-ready.",
};

export default function ThemesPage() {
  return (
    <Suspense>
      <ThemeBuilder />
    </Suspense>
  );
}
