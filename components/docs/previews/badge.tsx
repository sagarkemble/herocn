import type * as React from "react";
import Ex_badge_demo from "@/components/docs/examples/badge-demo";
import Ex_badge_variants from "@/components/docs/examples/badge-variants";
import Ex_badge_sizes from "@/components/docs/examples/badge-sizes";
import Ex_badge_icon from "@/components/docs/examples/badge-icon";
import Ex_badge_colors from "@/components/docs/examples/badge-colors";

export const previews: Record<string, React.ComponentType> = {
  "badge-demo": Ex_badge_demo,
  "badge-variants": Ex_badge_variants,
  "badge-sizes": Ex_badge_sizes,
  "badge-icon": Ex_badge_icon,
  "badge-colors": Ex_badge_colors,
};
