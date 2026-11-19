import type * as React from "react";
import Ex_alert_demo from "@/components/docs/examples/alert-demo";
import Ex_alert_variants from "@/components/docs/examples/alert-variants";
import Ex_alert_action from "@/components/docs/examples/alert-action";
import Ex_alert_colors from "@/components/docs/examples/alert-colors";

export const previews: Record<string, React.ComponentType> = {
  "alert-demo": Ex_alert_demo,
  "alert-variants": Ex_alert_variants,
  "alert-action": Ex_alert_action,
  "alert-colors": Ex_alert_colors,
};
