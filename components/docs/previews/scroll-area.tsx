import type * as React from "react";
import { ScrollAreaDemo as Ex_scroll_area_demo } from "@/components/docs/examples/scroll-area-demo";
import { ScrollAreaHorizontalDemo as Ex_scroll_area_horizontal } from "@/components/docs/examples/scroll-area-horizontal";

export const previews: Record<string, React.ComponentType> = {
  "scroll-area-demo": Ex_scroll_area_demo,
  "scroll-area-horizontal": Ex_scroll_area_horizontal,
};
