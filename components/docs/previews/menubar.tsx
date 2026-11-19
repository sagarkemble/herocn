import type * as React from "react";
import Ex_menubar_demo from "@/components/docs/examples/menubar-demo";
import Ex_menubar_checkbox from "@/components/docs/examples/menubar-checkbox";
import Ex_menubar_radio from "@/components/docs/examples/menubar-radio";
import Ex_menubar_submenu from "@/components/docs/examples/menubar-submenu";
import Ex_menubar_icons from "@/components/docs/examples/menubar-icons";
import Ex_menubar_variants from "@/components/docs/examples/menubar-variants";
import Ex_menubar_in_surface from "@/components/docs/examples/menubar-in-surface";

export const previews: Record<string, React.ComponentType> = {
  "menubar-demo": Ex_menubar_demo,
  "menubar-checkbox": Ex_menubar_checkbox,
  "menubar-radio": Ex_menubar_radio,
  "menubar-submenu": Ex_menubar_submenu,
  "menubar-icons": Ex_menubar_icons,
  "menubar-variants": Ex_menubar_variants,
  "menubar-in-surface": Ex_menubar_in_surface,
};
