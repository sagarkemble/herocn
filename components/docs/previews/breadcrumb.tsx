import type * as React from "react";
import Ex_breadcrumb_demo from "@/components/docs/examples/breadcrumb-demo";
import Ex_breadcrumb_basic from "@/components/docs/examples/breadcrumb-basic";
import Ex_breadcrumb_separator from "@/components/docs/examples/breadcrumb-separator";
import Ex_breadcrumb_dropdown from "@/components/docs/examples/breadcrumb-dropdown";
import Ex_breadcrumb_collapsed from "@/components/docs/examples/breadcrumb-collapsed";
import Ex_breadcrumb_link from "@/components/docs/examples/breadcrumb-link";

export const previews: Record<string, React.ComponentType> = {
  "breadcrumb-demo": Ex_breadcrumb_demo,
  "breadcrumb-basic": Ex_breadcrumb_basic,
  "breadcrumb-separator": Ex_breadcrumb_separator,
  "breadcrumb-dropdown": Ex_breadcrumb_dropdown,
  "breadcrumb-collapsed": Ex_breadcrumb_collapsed,
  "breadcrumb-link": Ex_breadcrumb_link,
};
