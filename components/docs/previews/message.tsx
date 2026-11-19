import type * as React from "react";
import Ex_message_demo from "@/components/docs/examples/message-demo";
import Ex_message_avatar from "@/components/docs/examples/message-avatar";
import Ex_message_group from "@/components/docs/examples/message-group";
import Ex_message_header_footer from "@/components/docs/examples/message-header-footer";
import Ex_message_actions from "@/components/docs/examples/message-actions";
import Ex_message_attachment from "@/components/docs/examples/message-attachment";

export const previews: Record<string, React.ComponentType> = {
  "message-demo": Ex_message_demo,
  "message-avatar": Ex_message_avatar,
  "message-group": Ex_message_group,
  "message-header-footer": Ex_message_header_footer,
  "message-actions": Ex_message_actions,
  "message-attachment": Ex_message_attachment,
};
