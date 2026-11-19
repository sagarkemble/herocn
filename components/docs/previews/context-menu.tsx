import type * as React from "react";
import Ex_context_menu_demo from "@/components/docs/examples/context-menu-demo";
import Ex_context_menu_basic from "@/components/docs/examples/context-menu-basic";
import Ex_context_menu_submenu from "@/components/docs/examples/context-menu-submenu";
import Ex_context_menu_shortcuts from "@/components/docs/examples/context-menu-shortcuts";
import Ex_context_menu_groups from "@/components/docs/examples/context-menu-groups";
import Ex_context_menu_icons from "@/components/docs/examples/context-menu-icons";
import Ex_context_menu_checkboxes from "@/components/docs/examples/context-menu-checkboxes";
import Ex_context_menu_radio from "@/components/docs/examples/context-menu-radio";
import Ex_context_menu_destructive from "@/components/docs/examples/context-menu-destructive";
import Ex_context_menu_sides from "@/components/docs/examples/context-menu-sides";

export const previews: Record<string, React.ComponentType> = {
  "context-menu-demo": Ex_context_menu_demo,
  "context-menu-basic": Ex_context_menu_basic,
  "context-menu-submenu": Ex_context_menu_submenu,
  "context-menu-shortcuts": Ex_context_menu_shortcuts,
  "context-menu-groups": Ex_context_menu_groups,
  "context-menu-icons": Ex_context_menu_icons,
  "context-menu-checkboxes": Ex_context_menu_checkboxes,
  "context-menu-radio": Ex_context_menu_radio,
  "context-menu-destructive": Ex_context_menu_destructive,
  "context-menu-sides": Ex_context_menu_sides,
};
