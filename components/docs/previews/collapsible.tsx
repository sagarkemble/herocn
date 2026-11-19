import type * as React from "react";
import Ex_collapsible_demo from "@/components/docs/examples/collapsible-demo";
import Ex_collapsible_basic from "@/components/docs/examples/collapsible-basic";
import Ex_collapsible_settings from "@/components/docs/examples/collapsible-settings";
import Ex_collapsible_file_tree from "@/components/docs/examples/collapsible-file-tree";

export const previews: Record<string, React.ComponentType> = {
  "collapsible-demo": Ex_collapsible_demo,
  "collapsible-basic": Ex_collapsible_basic,
  "collapsible-settings": Ex_collapsible_settings,
  "collapsible-file-tree": Ex_collapsible_file_tree,
};
