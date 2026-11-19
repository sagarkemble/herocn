import type * as React from "react";
import Ex_native_select_demo from "@/components/docs/examples/native-select-demo";
import Ex_native_select_variants from "@/components/docs/examples/native-select-variants";
import Ex_native_select_groups from "@/components/docs/examples/native-select-groups";
import Ex_native_select_disabled from "@/components/docs/examples/native-select-disabled";
import Ex_native_select_invalid from "@/components/docs/examples/native-select-invalid";
import Ex_native_select_in_surface from "@/components/docs/examples/native-select-in-surface";

export const previews: Record<string, React.ComponentType> = {
  "native-select-demo": Ex_native_select_demo,
  "native-select-variants": Ex_native_select_variants,
  "native-select-groups": Ex_native_select_groups,
  "native-select-disabled": Ex_native_select_disabled,
  "native-select-invalid": Ex_native_select_invalid,
  "native-select-in-surface": Ex_native_select_in_surface,
};
