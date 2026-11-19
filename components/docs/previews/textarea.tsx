import type * as React from "react";
import Ex_textarea_demo from "@/components/docs/examples/textarea-demo";
import Ex_textarea_variants from "@/components/docs/examples/textarea-variants";
import Ex_textarea_states from "@/components/docs/examples/textarea-states";
import Ex_textarea_field from "@/components/docs/examples/textarea-field";
import Ex_textarea_button from "@/components/docs/examples/textarea-button";
import Ex_textarea_in_surface from "@/components/docs/examples/textarea-in-surface";

export const previews: Record<string, React.ComponentType> = {
  "textarea-demo": Ex_textarea_demo,
  "textarea-variants": Ex_textarea_variants,
  "textarea-states": Ex_textarea_states,
  "textarea-field": Ex_textarea_field,
  "textarea-button": Ex_textarea_button,
  "textarea-in-surface": Ex_textarea_in_surface,
};
