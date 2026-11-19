import type * as React from "react";
import Ex_pagination_demo from "@/components/docs/examples/pagination-demo";
import Ex_pagination_simple from "@/components/docs/examples/pagination-simple";
import Ex_pagination_icons_only from "@/components/docs/examples/pagination-icons-only";
import Ex_pagination_sizes from "@/components/docs/examples/pagination-sizes";
import Ex_pagination_ellipsis from "@/components/docs/examples/pagination-ellipsis";

export const previews: Record<string, React.ComponentType> = {
  "pagination-demo": Ex_pagination_demo,
  "pagination-simple": Ex_pagination_simple,
  "pagination-icons-only": Ex_pagination_icons_only,
  "pagination-sizes": Ex_pagination_sizes,
  "pagination-ellipsis": Ex_pagination_ellipsis,
};
