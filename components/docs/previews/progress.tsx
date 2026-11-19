import type * as React from "react";
import Ex_progress_demo from "@/components/docs/examples/progress-demo";
import Ex_progress_label from "@/components/docs/examples/progress-label";
import Ex_progress_variants from "@/components/docs/examples/progress-variants";
import Ex_progress_sizes from "@/components/docs/examples/progress-sizes";
import { ProgressControlled as Ex_progress_controlled } from "@/components/docs/examples/progress-controlled";

export const previews: Record<string, React.ComponentType> = {
  "progress-demo": Ex_progress_demo,
  "progress-label": Ex_progress_label,
  "progress-variants": Ex_progress_variants,
  "progress-sizes": Ex_progress_sizes,
  "progress-controlled": Ex_progress_controlled,
};
