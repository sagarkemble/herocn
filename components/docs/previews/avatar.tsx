import type * as React from "react";
import Ex_avatar_demo from "@/components/docs/examples/avatar-demo";
import Ex_avatar_basic from "@/components/docs/examples/avatar-basic";
import Ex_avatar_badge from "@/components/docs/examples/avatar-badge";
import Ex_avatar_badge_icon from "@/components/docs/examples/avatar-badge-icon";
import Ex_avatar_group from "@/components/docs/examples/avatar-group";
import Ex_avatar_group_count from "@/components/docs/examples/avatar-group-count";
import Ex_avatar_group_count_icon from "@/components/docs/examples/avatar-group-count-icon";
import Ex_avatar_size from "@/components/docs/examples/avatar-size";
import Ex_avatar_dropdown from "@/components/docs/examples/avatar-dropdown";

export const previews: Record<string, React.ComponentType> = {
  "avatar-demo": Ex_avatar_demo,
  "avatar-basic": Ex_avatar_basic,
  "avatar-badge": Ex_avatar_badge,
  "avatar-badge-icon": Ex_avatar_badge_icon,
  "avatar-group": Ex_avatar_group,
  "avatar-group-count": Ex_avatar_group_count,
  "avatar-group-count-icon": Ex_avatar_group_count_icon,
  "avatar-size": Ex_avatar_size,
  "avatar-dropdown": Ex_avatar_dropdown,
};
