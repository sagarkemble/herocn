import type * as React from "react";
import Ex_sheet_demo from "@/components/docs/examples/sheet-demo";
import Ex_sheet_side from "@/components/docs/examples/sheet-side";
import Ex_sheet_overlay_variant from "@/components/docs/examples/sheet-overlay-variant";
import Ex_sheet_no_close_button from "@/components/docs/examples/sheet-no-close-button";

export const previews: Record<string, React.ComponentType> = {
  "sheet-demo": Ex_sheet_demo,
  "sheet-side": Ex_sheet_side,
  "sheet-overlay-variant": Ex_sheet_overlay_variant,
  "sheet-no-close-button": Ex_sheet_no_close_button,
};
