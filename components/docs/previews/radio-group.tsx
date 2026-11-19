import type * as React from "react";
import Ex_radio_group_demo from "@/components/docs/examples/radio-group-demo";
import Ex_radio_group_variants from "@/components/docs/examples/radio-group-variants";
import Ex_radio_group_description from "@/components/docs/examples/radio-group-description";
import Ex_field_choice_card from "@/components/docs/examples/field-choice-card";
import Ex_field_radio from "@/components/docs/examples/field-radio";
import Ex_radio_group_disabled from "@/components/docs/examples/radio-group-disabled";
import Ex_radio_group_invalid from "@/components/docs/examples/radio-group-invalid";
import Ex_radio_group_in_surface from "@/components/docs/examples/radio-group-in-surface";

export const previews: Record<string, React.ComponentType> = {
  "radio-group-demo": Ex_radio_group_demo,
  "radio-group-variants": Ex_radio_group_variants,
  "radio-group-description": Ex_radio_group_description,
  "field-choice-card": Ex_field_choice_card,
  "field-radio": Ex_field_radio,
  "radio-group-disabled": Ex_radio_group_disabled,
  "radio-group-invalid": Ex_radio_group_invalid,
  "radio-group-in-surface": Ex_radio_group_in_surface,
};
