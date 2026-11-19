import type * as React from "react";
import Ex_hover_card_demo from "@/components/docs/examples/hover-card-demo";
import Ex_hover_card_sides from "@/components/docs/examples/hover-card-sides";
import Ex_hover_card_with_arrow from "@/components/docs/examples/hover-card-with-arrow";

export const previews: Record<string, React.ComponentType> = {
  "hover-card-demo": Ex_hover_card_demo,
  "hover-card-sides": Ex_hover_card_sides,
  "hover-card-with-arrow": Ex_hover_card_with_arrow,
};
