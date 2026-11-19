import type * as React from "react";
import Ex_kbd_demo from "@/components/docs/examples/kbd-demo";
import Ex_kbd_variants from "@/components/docs/examples/kbd-variants";
import { KbdGroupExample as Ex_kbd_group } from "@/components/docs/examples/kbd-group";
import Ex_kbd_button from "@/components/docs/examples/kbd-button";
import Ex_kbd_tooltip from "@/components/docs/examples/kbd-tooltip";
import Ex_kbd_input_group from "@/components/docs/examples/kbd-input-group";

export const previews: Record<string, React.ComponentType> = {
  "kbd-demo": Ex_kbd_demo,
  "kbd-variants": Ex_kbd_variants,
  "kbd-group": Ex_kbd_group,
  "kbd-button": Ex_kbd_button,
  "kbd-tooltip": Ex_kbd_tooltip,
  "kbd-input-group": Ex_kbd_input_group,
};
