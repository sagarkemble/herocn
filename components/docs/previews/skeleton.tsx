import type * as React from "react";
import Ex_skeleton_demo from "@/components/docs/examples/skeleton-demo";
import Ex_skeleton_animation_types from "@/components/docs/examples/skeleton-animation-types";
import Ex_skeleton_avatar from "@/components/docs/examples/skeleton-avatar";
import Ex_skeleton_card from "@/components/docs/examples/skeleton-card";
import Ex_skeleton_text from "@/components/docs/examples/skeleton-text";
import Ex_skeleton_form from "@/components/docs/examples/skeleton-form";
import Ex_skeleton_table from "@/components/docs/examples/skeleton-table";
import { SingleShimmer as Ex_skeleton_single_shimmer } from "@/components/docs/examples/skeleton-single-shimmer";

export const previews: Record<string, React.ComponentType> = {
  "skeleton-demo": Ex_skeleton_demo,
  "skeleton-animation-types": Ex_skeleton_animation_types,
  "skeleton-avatar": Ex_skeleton_avatar,
  "skeleton-card": Ex_skeleton_card,
  "skeleton-text": Ex_skeleton_text,
  "skeleton-form": Ex_skeleton_form,
  "skeleton-table": Ex_skeleton_table,
  "skeleton-single-shimmer": Ex_skeleton_single_shimmer,
};
