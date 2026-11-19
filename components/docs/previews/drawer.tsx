import type * as React from "react";
import Ex_drawer_demo from "@/components/docs/examples/drawer-demo";
import Ex_drawer_direction from "@/components/docs/examples/drawer-direction";
import Ex_drawer_overlay_variant from "@/components/docs/examples/drawer-overlay-variant";
import Ex_drawer_scrollable_content from "@/components/docs/examples/drawer-scrollable-content";
import Ex_drawer_swipe_handle from "@/components/docs/examples/drawer-swipe-handle";
import { DrawerNested as Ex_drawer_nested } from "@/components/docs/examples/drawer-nested";
import Ex_drawer_non_modal from "@/components/docs/examples/drawer-non-modal";
import Ex_drawer_snap_points from "@/components/docs/examples/drawer-snap-points";
import Ex_drawer_responsive_dialog from "@/components/docs/examples/drawer-responsive-dialog";

export const previews: Record<string, React.ComponentType> = {
  "drawer-demo": Ex_drawer_demo,
  "drawer-direction": Ex_drawer_direction,
  "drawer-overlay-variant": Ex_drawer_overlay_variant,
  "drawer-scrollable-content": Ex_drawer_scrollable_content,
  "drawer-swipe-handle": Ex_drawer_swipe_handle,
  "drawer-nested": Ex_drawer_nested,
  "drawer-non-modal": Ex_drawer_non_modal,
  "drawer-snap-points": Ex_drawer_snap_points,
  "drawer-responsive-dialog": Ex_drawer_responsive_dialog,
};
