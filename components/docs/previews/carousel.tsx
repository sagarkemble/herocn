import type * as React from "react";
import Ex_carousel_demo from "@/components/docs/examples/carousel-demo";
import Ex_carousel_size from "@/components/docs/examples/carousel-size";
import Ex_carousel_spacing from "@/components/docs/examples/carousel-spacing";
import Ex_carousel_orientation from "@/components/docs/examples/carousel-orientation";
import Ex_carousel_api from "@/components/docs/examples/carousel-api";

export const previews: Record<string, React.ComponentType> = {
  "carousel-demo": Ex_carousel_demo,
  "carousel-size": Ex_carousel_size,
  "carousel-spacing": Ex_carousel_spacing,
  "carousel-orientation": Ex_carousel_orientation,
  "carousel-api": Ex_carousel_api,
};
