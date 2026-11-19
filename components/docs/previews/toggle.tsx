import type * as React from "react";
import Ex_toggle_demo from "@/components/docs/examples/toggle-demo";
import Ex_toggle_ghost from "@/components/docs/examples/toggle-ghost";
import Ex_toggle_sizes from "@/components/docs/examples/toggle-sizes";
import Ex_toggle_disabled from "@/components/docs/examples/toggle-disabled";

export const previews: Record<string, React.ComponentType> = {
  "toggle-demo": Ex_toggle_demo,
  "toggle-ghost": Ex_toggle_ghost,
  "toggle-sizes": Ex_toggle_sizes,
  "toggle-disabled": Ex_toggle_disabled,
};
