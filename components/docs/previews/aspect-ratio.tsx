import type * as React from "react";
import Ex_aspect_ratio_demo from "@/components/docs/examples/aspect-ratio-demo";
import Ex_aspect_ratio_square from "@/components/docs/examples/aspect-ratio-square";
import Ex_aspect_ratio_portrait from "@/components/docs/examples/aspect-ratio-portrait";

export const previews: Record<string, React.ComponentType> = {
  "aspect-ratio-demo": Ex_aspect_ratio_demo,
  "aspect-ratio-square": Ex_aspect_ratio_square,
  "aspect-ratio-portrait": Ex_aspect_ratio_portrait,
};
