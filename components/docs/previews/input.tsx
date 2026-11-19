import type * as React from "react";
import Ex_input_demo from "@/components/docs/examples/input-demo";
import Ex_input_variants from "@/components/docs/examples/input-variants";
import Ex_input_states from "@/components/docs/examples/input-states";
import Ex_input_field from "@/components/docs/examples/input-field";
import Ex_input_fieldgroup from "@/components/docs/examples/input-fieldgroup";
import Ex_input_badge from "@/components/docs/examples/input-badge";
import Ex_input_input_group from "@/components/docs/examples/input-input-group";
import Ex_input_button_group from "@/components/docs/examples/input-button-group";
import Ex_input_in_surface from "@/components/docs/examples/input-in-surface";

export const previews: Record<string, React.ComponentType> = {
  "input-demo": Ex_input_demo,
  "input-variants": Ex_input_variants,
  "input-states": Ex_input_states,
  "input-field": Ex_input_field,
  "input-fieldgroup": Ex_input_fieldgroup,
  "input-badge": Ex_input_badge,
  "input-input-group": Ex_input_input_group,
  "input-button-group": Ex_input_button_group,
  "input-in-surface": Ex_input_in_surface,
};
