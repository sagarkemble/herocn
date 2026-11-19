import type * as React from "react";
import Ex_popover_demo from "@/components/docs/examples/popover-demo";
import Ex_popover_basic from "@/components/docs/examples/popover-basic";
import Ex_popover_align from "@/components/docs/examples/popover-align";
import Ex_popover_form from "@/components/docs/examples/popover-form";
import Ex_popover_with_arrow from "@/components/docs/examples/popover-with-arrow";

export const previews: Record<string, React.ComponentType> = {
  "popover-demo": Ex_popover_demo,
  "popover-basic": Ex_popover_basic,
  "popover-align": Ex_popover_align,
  "popover-form": Ex_popover_form,
  "popover-with-arrow": Ex_popover_with_arrow,
};
