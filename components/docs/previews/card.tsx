import type * as React from "react";
import Ex_card_demo from "@/components/docs/examples/card-demo";
import Ex_card_variants from "@/components/docs/examples/card-variants";
import { CardSmall as Ex_card_small } from "@/components/docs/examples/card-small";
import Ex_card_with_avatar from "@/components/docs/examples/card-with-avatar";
import Ex_card_with_form from "@/components/docs/examples/card-with-form";
import Ex_card_image from "@/components/docs/examples/card-image";

export const previews: Record<string, React.ComponentType> = {
  "card-demo": Ex_card_demo,
  "card-variants": Ex_card_variants,
  "card-small": Ex_card_small,
  "card-with-avatar": Ex_card_with_avatar,
  "card-with-form": Ex_card_with_form,
  "card-image": Ex_card_image,
};
