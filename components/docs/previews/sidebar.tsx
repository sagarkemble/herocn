import type * as React from "react";
import Ex_sidebar_demo from "@/components/docs/examples/sidebar-demo";
import Ex_sidebar_floating from "@/components/docs/examples/sidebar-floating";
import Ex_sidebar_inset from "@/components/docs/examples/sidebar-inset";
import Ex_sidebar_collapsible from "@/components/docs/examples/sidebar-collapsible";

export const previews: Record<string, React.ComponentType> = {
  "sidebar-demo": Ex_sidebar_demo,
  "sidebar-floating": Ex_sidebar_floating,
  "sidebar-inset": Ex_sidebar_inset,
  "sidebar-collapsible": Ex_sidebar_collapsible,
};
