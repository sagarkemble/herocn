import type * as React from "react";
import Ex_table_demo from "@/components/docs/examples/table-demo";
import Ex_table_secondary from "@/components/docs/examples/table-secondary";
import Ex_table_secondary_footer from "@/components/docs/examples/table-secondary-footer";
import Ex_table_footer from "@/components/docs/examples/table-footer";
import Ex_table_actions from "@/components/docs/examples/table-actions";

export const previews: Record<string, React.ComponentType> = {
  "table-demo": Ex_table_demo,
  "table-secondary": Ex_table_secondary,
  "table-secondary-footer": Ex_table_secondary_footer,
  "table-footer": Ex_table_footer,
  "table-actions": Ex_table_actions,
};
