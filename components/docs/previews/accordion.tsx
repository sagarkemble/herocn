import type * as React from "react";
import Ex_accordion_demo from "@/components/docs/examples/accordion-demo";
import Ex_accordion_basic from "@/components/docs/examples/accordion-basic";
import Ex_accordion_surface from "@/components/docs/examples/accordion-surface";
import Ex_accordion_multiple from "@/components/docs/examples/accordion-multiple";
import Ex_accordion_disabled from "@/components/docs/examples/accordion-disabled";
import Ex_accordion_borders from "@/components/docs/examples/accordion-borders";
import Ex_accordion_card from "@/components/docs/examples/accordion-card";

export const previews: Record<string, React.ComponentType> = {
  "accordion-demo": Ex_accordion_demo,
  "accordion-basic": Ex_accordion_basic,
  "accordion-surface": Ex_accordion_surface,
  "accordion-multiple": Ex_accordion_multiple,
  "accordion-disabled": Ex_accordion_disabled,
  "accordion-borders": Ex_accordion_borders,
  "accordion-card": Ex_accordion_card,
};
