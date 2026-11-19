import type * as React from "react";
import Ex_spinner_demo from "@/components/docs/examples/spinner-demo";
import Ex_spinner_variants from "@/components/docs/examples/spinner-variants";
import Ex_spinner_sizes from "@/components/docs/examples/spinner-sizes";
import Ex_spinner_button from "@/components/docs/examples/spinner-button";
import Ex_spinner_badge from "@/components/docs/examples/spinner-badge";
import Ex_spinner_input_group from "@/components/docs/examples/spinner-input-group";
import Ex_spinner_empty from "@/components/docs/examples/spinner-empty";

export const previews: Record<string, React.ComponentType> = {
  "spinner-demo": Ex_spinner_demo,
  "spinner-variants": Ex_spinner_variants,
  "spinner-sizes": Ex_spinner_sizes,
  "spinner-button": Ex_spinner_button,
  "spinner-badge": Ex_spinner_badge,
  "spinner-input-group": Ex_spinner_input_group,
  "spinner-empty": Ex_spinner_empty,
};
