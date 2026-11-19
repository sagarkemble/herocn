import type * as React from "react";
import Ex_separator_demo from "@/components/docs/examples/separator-demo";
import Ex_separator_vertical from "@/components/docs/examples/separator-vertical";
import Ex_separator_menu from "@/components/docs/examples/separator-menu";
import Ex_separator_list from "@/components/docs/examples/separator-list";
import Ex_separator_surface from "@/components/docs/examples/separator-surface";

export const previews: Record<string, React.ComponentType> = {
  "separator-demo": Ex_separator_demo,
  "separator-vertical": Ex_separator_vertical,
  "separator-menu": Ex_separator_menu,
  "separator-list": Ex_separator_list,
  "separator-surface": Ex_separator_surface,
};
