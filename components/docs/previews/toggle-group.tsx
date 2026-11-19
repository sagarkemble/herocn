import type * as React from "react";
import Ex_toggle_group_demo from "@/components/docs/examples/toggle-group-demo";
import Ex_toggle_group_ghost from "@/components/docs/examples/toggle-group-ghost";
import Ex_toggle_group_sizes from "@/components/docs/examples/toggle-group-sizes";
import Ex_toggle_group_spacing from "@/components/docs/examples/toggle-group-spacing";
import Ex_toggle_group_vertical from "@/components/docs/examples/toggle-group-vertical";
import Ex_toggle_group_disabled from "@/components/docs/examples/toggle-group-disabled";
import Ex_toggle_group_custom from "@/components/docs/examples/toggle-group-custom";

export const previews: Record<string, React.ComponentType> = {
  "toggle-group-demo": Ex_toggle_group_demo,
  "toggle-group-ghost": Ex_toggle_group_ghost,
  "toggle-group-sizes": Ex_toggle_group_sizes,
  "toggle-group-spacing": Ex_toggle_group_spacing,
  "toggle-group-vertical": Ex_toggle_group_vertical,
  "toggle-group-disabled": Ex_toggle_group_disabled,
  "toggle-group-custom": Ex_toggle_group_custom,
};
