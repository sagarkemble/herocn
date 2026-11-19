import type * as React from "react";
import Ex_command_demo from "@/components/docs/examples/command-demo";
import Ex_command_basic from "@/components/docs/examples/command-basic";
import Ex_command_shortcuts from "@/components/docs/examples/command-shortcuts";
import Ex_command_groups from "@/components/docs/examples/command-groups";
import Ex_command_scrollable from "@/components/docs/examples/command-scrollable";
import Ex_command_overlay_variant from "@/components/docs/examples/command-overlay-variant";

export const previews: Record<string, React.ComponentType> = {
  "command-demo": Ex_command_demo,
  "command-basic": Ex_command_basic,
  "command-shortcuts": Ex_command_shortcuts,
  "command-groups": Ex_command_groups,
  "command-scrollable": Ex_command_scrollable,
  "command-overlay-variant": Ex_command_overlay_variant,
};
