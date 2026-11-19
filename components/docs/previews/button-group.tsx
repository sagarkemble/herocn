import type * as React from "react";
import Ex_button_group_demo from "@/components/docs/examples/button-group-demo";
import Ex_button_group_orientation from "@/components/docs/examples/button-group-orientation";
import Ex_button_group_size from "@/components/docs/examples/button-group-size";
import Ex_button_group_separator from "@/components/docs/examples/button-group-separator";
import Ex_button_group_split from "@/components/docs/examples/button-group-split";
import Ex_button_group_input from "@/components/docs/examples/button-group-input";
import Ex_button_group_input_group from "@/components/docs/examples/button-group-input-group";
import Ex_button_group_dropdown from "@/components/docs/examples/button-group-dropdown";
import Ex_button_group_popover from "@/components/docs/examples/button-group-popover";

export const previews: Record<string, React.ComponentType> = {
  "button-group-demo": Ex_button_group_demo,
  "button-group-orientation": Ex_button_group_orientation,
  "button-group-size": Ex_button_group_size,
  "button-group-separator": Ex_button_group_separator,
  "button-group-split": Ex_button_group_split,
  "button-group-input": Ex_button_group_input,
  "button-group-input-group": Ex_button_group_input_group,
  "button-group-dropdown": Ex_button_group_dropdown,
  "button-group-popover": Ex_button_group_popover,
};
