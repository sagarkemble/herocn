import type * as React from "react";
import Ex_checkbox_demo from "@/components/docs/examples/checkbox-demo";
import Ex_checkbox_basic from "@/components/docs/examples/checkbox-basic";
import Ex_checkbox_variants from "@/components/docs/examples/checkbox-variants";
import Ex_checkbox_description from "@/components/docs/examples/checkbox-description";
import Ex_checkbox_disabled from "@/components/docs/examples/checkbox-disabled";
import Ex_checkbox_invalid from "@/components/docs/examples/checkbox-invalid";
import Ex_field_checkbox from "@/components/docs/examples/field-checkbox";
import Ex_checkbox_in_surface from "@/components/docs/examples/checkbox-in-surface";

export const previews: Record<string, React.ComponentType> = {
  "checkbox-demo": Ex_checkbox_demo,
  "checkbox-basic": Ex_checkbox_basic,
  "checkbox-variants": Ex_checkbox_variants,
  "checkbox-description": Ex_checkbox_description,
  "checkbox-disabled": Ex_checkbox_disabled,
  "checkbox-invalid": Ex_checkbox_invalid,
  "field-checkbox": Ex_field_checkbox,
  "checkbox-in-surface": Ex_checkbox_in_surface,
};
