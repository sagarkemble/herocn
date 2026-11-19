import type * as React from "react";
import { TabsDemo as Ex_tabs_demo } from "@/components/docs/examples/tabs-demo";
import { TabsVertical as Ex_tabs_vertical } from "@/components/docs/examples/tabs-vertical";
import { TabsLine as Ex_tabs_line } from "@/components/docs/examples/tabs-line";
import { TabsVerticalLine as Ex_tabs_vertical_line } from "@/components/docs/examples/tabs-vertical-line";
import { TabsDisabled as Ex_tabs_disabled } from "@/components/docs/examples/tabs-disabled";
import { TabsIcons as Ex_tabs_icons } from "@/components/docs/examples/tabs-icons";

export const previews: Record<string, React.ComponentType> = {
  "tabs-demo": Ex_tabs_demo,
  "tabs-vertical": Ex_tabs_vertical,
  "tabs-line": Ex_tabs_line,
  "tabs-vertical-line": Ex_tabs_vertical_line,
  "tabs-disabled": Ex_tabs_disabled,
  "tabs-icons": Ex_tabs_icons,
};
