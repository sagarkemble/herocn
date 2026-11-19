import type * as React from "react";
import Ex_field_demo from "@/components/docs/examples/field-demo";
import Ex_field_input from "@/components/docs/examples/field-input";
import Ex_field_textarea from "@/components/docs/examples/field-textarea";
import Ex_field_select from "@/components/docs/examples/field-select";
import Ex_field_slider from "@/components/docs/examples/field-slider";
import Ex_field_fieldset from "@/components/docs/examples/field-fieldset";
import Ex_field_checkbox from "@/components/docs/examples/field-checkbox";
import Ex_field_radio from "@/components/docs/examples/field-radio";
import Ex_field_switch from "@/components/docs/examples/field-switch";
import Ex_field_choice_card from "@/components/docs/examples/field-choice-card";
import Ex_field_group from "@/components/docs/examples/field-group";

export const previews: Record<string, React.ComponentType> = {
  "field-demo": Ex_field_demo,
  "field-input": Ex_field_input,
  "field-textarea": Ex_field_textarea,
  "field-select": Ex_field_select,
  "field-slider": Ex_field_slider,
  "field-fieldset": Ex_field_fieldset,
  "field-checkbox": Ex_field_checkbox,
  "field-radio": Ex_field_radio,
  "field-switch": Ex_field_switch,
  "field-choice-card": Ex_field_choice_card,
  "field-group": Ex_field_group,
};
