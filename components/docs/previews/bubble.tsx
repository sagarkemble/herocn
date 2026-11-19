import type * as React from "react";
import Ex_bubble_demo from "@/components/docs/examples/bubble-demo";
import Ex_bubble_variants from "@/components/docs/examples/bubble-variants";
import Ex_bubble_alignment from "@/components/docs/examples/bubble-alignment";
import Ex_bubble_group from "@/components/docs/examples/bubble-group";
import Ex_bubble_link_button from "@/components/docs/examples/bubble-link-button";
import Ex_bubble_reactions from "@/components/docs/examples/bubble-reactions";
import Ex_bubble_collapsible from "@/components/docs/examples/bubble-collapsible";
import Ex_bubble_tooltip from "@/components/docs/examples/bubble-tooltip";
import Ex_bubble_popover from "@/components/docs/examples/bubble-popover";

export const previews: Record<string, React.ComponentType> = {
  "bubble-demo": Ex_bubble_demo,
  "bubble-variants": Ex_bubble_variants,
  "bubble-alignment": Ex_bubble_alignment,
  "bubble-group": Ex_bubble_group,
  "bubble-link-button": Ex_bubble_link_button,
  "bubble-reactions": Ex_bubble_reactions,
  "bubble-collapsible": Ex_bubble_collapsible,
  "bubble-tooltip": Ex_bubble_tooltip,
  "bubble-popover": Ex_bubble_popover,
};
