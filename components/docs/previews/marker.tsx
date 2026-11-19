import type * as React from "react";
import Ex_marker_demo from "@/components/docs/examples/marker-demo";
import Ex_marker_variants from "@/components/docs/examples/marker-variants";
import Ex_marker_status from "@/components/docs/examples/marker-status";
import Ex_marker_shimmer from "@/components/docs/examples/marker-shimmer";
import Ex_marker_separator from "@/components/docs/examples/marker-separator";
import Ex_marker_border from "@/components/docs/examples/marker-border";
import Ex_marker_icon from "@/components/docs/examples/marker-icon";
import Ex_marker_link_button from "@/components/docs/examples/marker-link-button";

export const previews: Record<string, React.ComponentType> = {
  "marker-demo": Ex_marker_demo,
  "marker-variants": Ex_marker_variants,
  "marker-status": Ex_marker_status,
  "marker-shimmer": Ex_marker_shimmer,
  "marker-separator": Ex_marker_separator,
  "marker-border": Ex_marker_border,
  "marker-icon": Ex_marker_icon,
  "marker-link-button": Ex_marker_link_button,
};
