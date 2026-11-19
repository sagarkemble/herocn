import type * as React from "react";
import Ex_empty_demo from "@/components/docs/examples/empty-demo";
import Ex_empty_outline from "@/components/docs/examples/empty-outline";
import Ex_empty_background from "@/components/docs/examples/empty-background";
import Ex_empty_avatar from "@/components/docs/examples/empty-avatar";
import Ex_empty_avatar_group from "@/components/docs/examples/empty-avatar-group";
import Ex_empty_input_group from "@/components/docs/examples/empty-input-group";

export const previews: Record<string, React.ComponentType> = {
  "empty-demo": Ex_empty_demo,
  "empty-outline": Ex_empty_outline,
  "empty-background": Ex_empty_background,
  "empty-avatar": Ex_empty_avatar,
  "empty-avatar-group": Ex_empty_avatar_group,
  "empty-input-group": Ex_empty_input_group,
};
