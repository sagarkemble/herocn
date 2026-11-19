import type * as React from "react";
import Ex_attachment_demo from "@/components/docs/examples/attachment-demo";
import Ex_attachment_image from "@/components/docs/examples/attachment-image";
import Ex_attachment_states from "@/components/docs/examples/attachment-states";
import Ex_attachment_sizes from "@/components/docs/examples/attachment-sizes";
import Ex_attachment_group from "@/components/docs/examples/attachment-group";
import Ex_attachment_trigger from "@/components/docs/examples/attachment-trigger";

export const previews: Record<string, React.ComponentType> = {
  "attachment-demo": Ex_attachment_demo,
  "attachment-image": Ex_attachment_image,
  "attachment-states": Ex_attachment_states,
  "attachment-sizes": Ex_attachment_sizes,
  "attachment-group": Ex_attachment_group,
  "attachment-trigger": Ex_attachment_trigger,
};
