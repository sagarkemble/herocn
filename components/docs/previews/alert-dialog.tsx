import type * as React from "react";
import Ex_alert_dialog_demo from "@/components/docs/examples/alert-dialog-demo";
import Ex_alert_dialog_basic from "@/components/docs/examples/alert-dialog-basic";
import Ex_alert_dialog_variants from "@/components/docs/examples/alert-dialog-variants";
import Ex_alert_dialog_small from "@/components/docs/examples/alert-dialog-small";
import Ex_alert_dialog_with_media from "@/components/docs/examples/alert-dialog-with-media";
import Ex_alert_dialog_small_with_media from "@/components/docs/examples/alert-dialog-small-with-media";
import Ex_alert_dialog_destructive from "@/components/docs/examples/alert-dialog-destructive";

export const previews: Record<string, React.ComponentType> = {
  "alert-dialog-demo": Ex_alert_dialog_demo,
  "alert-dialog-basic": Ex_alert_dialog_basic,
  "alert-dialog-variants": Ex_alert_dialog_variants,
  "alert-dialog-small": Ex_alert_dialog_small,
  "alert-dialog-with-media": Ex_alert_dialog_with_media,
  "alert-dialog-small-with-media": Ex_alert_dialog_small_with_media,
  "alert-dialog-destructive": Ex_alert_dialog_destructive,
};
