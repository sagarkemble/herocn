import type * as React from "react";
import Ex_switch_demo from "@/components/docs/examples/switch-demo";
import Ex_switch_description from "@/components/docs/examples/switch-description";
import Ex_switch_choice_card from "@/components/docs/examples/switch-choice-card";
import Ex_switch_disabled from "@/components/docs/examples/switch-disabled";
import Ex_switch_invalid from "@/components/docs/examples/switch-invalid";
import Ex_switch_sizes from "@/components/docs/examples/switch-sizes";

export const previews: Record<string, React.ComponentType> = {
  "switch-demo": Ex_switch_demo,
  "switch-description": Ex_switch_description,
  "switch-choice-card": Ex_switch_choice_card,
  "switch-disabled": Ex_switch_disabled,
  "switch-invalid": Ex_switch_invalid,
  "switch-sizes": Ex_switch_sizes,
};
