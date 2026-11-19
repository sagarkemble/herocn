import type * as React from "react";
import Ex_select_demo from "@/components/docs/examples/select-demo";
import Ex_select_groups from "@/components/docs/examples/select-groups";
import Ex_select_multiple from "@/components/docs/examples/select-multiple";
import Ex_select_scrollable from "@/components/docs/examples/select-scrollable";
import Ex_select_disabled from "@/components/docs/examples/select-disabled";
import Ex_select_invalid from "@/components/docs/examples/select-invalid";

export const previews: Record<string, React.ComponentType> = {
  "select-demo": Ex_select_demo,
  "select-groups": Ex_select_groups,
  "select-multiple": Ex_select_multiple,
  "select-scrollable": Ex_select_scrollable,
  "select-disabled": Ex_select_disabled,
  "select-invalid": Ex_select_invalid,
};
