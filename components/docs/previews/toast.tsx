import type * as React from "react";
import Ex_toast_demo from "@/components/docs/examples/toast-demo";
import Ex_toast_types from "@/components/docs/examples/toast-types";
import Ex_toast_action from "@/components/docs/examples/toast-action";
import Ex_toast_promise from "@/components/docs/examples/toast-promise";

export const previews: Record<string, React.ComponentType> = {
  "toast-demo": Ex_toast_demo,
  "toast-types": Ex_toast_types,
  "toast-action": Ex_toast_action,
  "toast-promise": Ex_toast_promise,
};
