import type * as React from "react";
import Ex_tooltip_demo from "@/components/docs/examples/tooltip-demo";
import Ex_tooltip_sides from "@/components/docs/examples/tooltip-sides";
import Ex_tooltip_arrow from "@/components/docs/examples/tooltip-arrow";
import Ex_tooltip_keyboard from "@/components/docs/examples/tooltip-keyboard";
import Ex_tooltip_disabled from "@/components/docs/examples/tooltip-disabled";

export const previews: Record<string, React.ComponentType> = {
  "tooltip-demo": Ex_tooltip_demo,
  "tooltip-sides": Ex_tooltip_sides,
  "tooltip-arrow": Ex_tooltip_arrow,
  "tooltip-keyboard": Ex_tooltip_keyboard,
  "tooltip-disabled": Ex_tooltip_disabled,
};
