import type * as React from "react";
import Ex_combobox_demo from "@/components/docs/examples/combobox-demo";
import Ex_combobox_multiple from "@/components/docs/examples/combobox-multiple";
import Ex_combobox_groups from "@/components/docs/examples/combobox-groups";
import Ex_combobox_clear from "@/components/docs/examples/combobox-clear";
import Ex_combobox_disabled from "@/components/docs/examples/combobox-disabled";
import Ex_combobox_invalid from "@/components/docs/examples/combobox-invalid";
import Ex_combobox_auto_highlight from "@/components/docs/examples/combobox-auto-highlight";
import { ComboboxPopup as Ex_combobox_popup } from "@/components/docs/examples/combobox-popup";
import Ex_combobox_variants from "@/components/docs/examples/combobox-variants";
import Ex_combobox_surface from "@/components/docs/examples/combobox-surface";

export const previews: Record<string, React.ComponentType> = {
  "combobox-demo": Ex_combobox_demo,
  "combobox-multiple": Ex_combobox_multiple,
  "combobox-groups": Ex_combobox_groups,
  "combobox-clear": Ex_combobox_clear,
  "combobox-disabled": Ex_combobox_disabled,
  "combobox-invalid": Ex_combobox_invalid,
  "combobox-auto-highlight": Ex_combobox_auto_highlight,
  "combobox-popup": Ex_combobox_popup,
  "combobox-variants": Ex_combobox_variants,
  "combobox-surface": Ex_combobox_surface,
};
