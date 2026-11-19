import type * as React from "react";
import Ex_slider_demo from "@/components/docs/examples/slider-demo";
import Ex_slider_range from "@/components/docs/examples/slider-range";
import Ex_slider_multiple from "@/components/docs/examples/slider-multiple";
import Ex_slider_vertical from "@/components/docs/examples/slider-vertical";
import Ex_slider_controlled from "@/components/docs/examples/slider-controlled";
import Ex_slider_disabled from "@/components/docs/examples/slider-disabled";

export const previews: Record<string, React.ComponentType> = {
  "slider-demo": Ex_slider_demo,
  "slider-range": Ex_slider_range,
  "slider-multiple": Ex_slider_multiple,
  "slider-vertical": Ex_slider_vertical,
  "slider-controlled": Ex_slider_controlled,
  "slider-disabled": Ex_slider_disabled,
};
