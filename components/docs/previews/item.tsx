import type * as React from "react";
import Ex_item_demo from "@/components/docs/examples/item-demo";
import Ex_item_variants from "@/components/docs/examples/item-variants";
import Ex_item_sizes from "@/components/docs/examples/item-sizes";
import Ex_item_icon from "@/components/docs/examples/item-icon";
import Ex_item_avatar from "@/components/docs/examples/item-avatar";
import Ex_item_image from "@/components/docs/examples/item-image";
import Ex_item_group from "@/components/docs/examples/item-group";
import Ex_item_header from "@/components/docs/examples/item-header";
import Ex_item_link from "@/components/docs/examples/item-link";
import Ex_item_dropdown from "@/components/docs/examples/item-dropdown";

export const previews: Record<string, React.ComponentType> = {
  "item-demo": Ex_item_demo,
  "item-variants": Ex_item_variants,
  "item-sizes": Ex_item_sizes,
  "item-icon": Ex_item_icon,
  "item-avatar": Ex_item_avatar,
  "item-image": Ex_item_image,
  "item-group": Ex_item_group,
  "item-header": Ex_item_header,
  "item-link": Ex_item_link,
  "item-dropdown": Ex_item_dropdown,
};
