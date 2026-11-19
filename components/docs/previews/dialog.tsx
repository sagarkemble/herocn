import type * as React from "react";
import Ex_dialog_demo from "@/components/docs/examples/dialog-demo";
import Ex_dialog_overlay_variant from "@/components/docs/examples/dialog-overlay-variant";
import Ex_dialog_close_button from "@/components/docs/examples/dialog-close-button";
import Ex_dialog_no_close_button from "@/components/docs/examples/dialog-no-close-button";
import Ex_dialog_sticky_footer from "@/components/docs/examples/dialog-sticky-footer";
import Ex_dialog_scrollable_content from "@/components/docs/examples/dialog-scrollable-content";
import Ex_dialog_nested from "@/components/docs/examples/dialog-nested";

export const previews: Record<string, React.ComponentType> = {
  "dialog-demo": Ex_dialog_demo,
  "dialog-overlay-variant": Ex_dialog_overlay_variant,
  "dialog-close-button": Ex_dialog_close_button,
  "dialog-no-close-button": Ex_dialog_no_close_button,
  "dialog-sticky-footer": Ex_dialog_sticky_footer,
  "dialog-scrollable-content": Ex_dialog_scrollable_content,
  "dialog-nested": Ex_dialog_nested,
};
