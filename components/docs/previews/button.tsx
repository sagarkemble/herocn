import type * as React from "react";
import Ex_button_usage from "@/components/docs/examples/button-usage";
import Ex_button_variants from "@/components/docs/examples/button-variants";
import Ex_button_sizes from "@/components/docs/examples/button-sizes";
import Ex_button_icons from "@/components/docs/examples/button-icons";
import Ex_button_icon_only from "@/components/docs/examples/button-icon-only";
import Ex_button_loading from "@/components/docs/examples/button-loading";
import Ex_button_loading_state from "@/components/docs/examples/button-loading-state";
import Ex_button_full_width from "@/components/docs/examples/button-full-width";
import Ex_button_disabled from "@/components/docs/examples/button-disabled";
import Ex_button_social from "@/components/docs/examples/button-social";
import { ButtonRender as Ex_button_render } from "@/components/docs/examples/button-render";

export const previews: Record<string, React.ComponentType> = {
  "button-usage": Ex_button_usage,
  "button-variants": Ex_button_variants,
  "button-sizes": Ex_button_sizes,
  "button-icons": Ex_button_icons,
  "button-icon-only": Ex_button_icon_only,
  "button-loading": Ex_button_loading,
  "button-loading-state": Ex_button_loading_state,
  "button-full-width": Ex_button_full_width,
  "button-disabled": Ex_button_disabled,
  "button-social": Ex_button_social,
  "button-render": Ex_button_render,
};
