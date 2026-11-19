import type {Metadata} from "next";

import {Suspense} from "react";

import {ThemeBuilder} from "@/components/themes/theme-builder";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Preview components and app templates while editing color, radius, and font tokens.",
};

export default function ThemesPage() {
  return (
    <Suspense>
      <ThemeBuilder />
    </Suspense>
  );
}
