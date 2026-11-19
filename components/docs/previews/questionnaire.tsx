import type * as React from "react";
import Ex_questionnaire_demo from "@/components/docs/examples/questionnaire-demo";
import Ex_questionnaire_multiple from "@/components/docs/examples/questionnaire-multiple";
import Ex_questionnaire_freeform from "@/components/docs/examples/questionnaire-freeform";
import Ex_questionnaire_skip from "@/components/docs/examples/questionnaire-skip";
import Ex_questionnaire_shortcuts from "@/components/docs/examples/questionnaire-shortcuts";
import Ex_questionnaire_validation from "@/components/docs/examples/questionnaire-validation";
import Ex_questionnaire_controlled from "@/components/docs/examples/questionnaire-controlled";
import Ex_questionnaire_resume from "@/components/docs/examples/questionnaire-resume";
import Ex_questionnaire_conditional from "@/components/docs/examples/questionnaire-conditional";
import Ex_questionnaire_navigation_state from "@/components/docs/examples/questionnaire-navigation-state";
import Ex_questionnaire_progress from "@/components/docs/examples/questionnaire-progress";
import Ex_questionnaire_animated from "@/components/docs/examples/questionnaire-animated";
import Ex_questionnaire_card from "@/components/docs/examples/questionnaire-card";
import Ex_questionnaire_dialog from "@/components/docs/examples/questionnaire-dialog";

export const previews: Record<string, React.ComponentType> = {
  "questionnaire-demo": Ex_questionnaire_demo,
  "questionnaire-multiple": Ex_questionnaire_multiple,
  "questionnaire-freeform": Ex_questionnaire_freeform,
  "questionnaire-skip": Ex_questionnaire_skip,
  "questionnaire-shortcuts": Ex_questionnaire_shortcuts,
  "questionnaire-validation": Ex_questionnaire_validation,
  "questionnaire-controlled": Ex_questionnaire_controlled,
  "questionnaire-resume": Ex_questionnaire_resume,
  "questionnaire-conditional": Ex_questionnaire_conditional,
  "questionnaire-navigation-state": Ex_questionnaire_navigation_state,
  "questionnaire-progress": Ex_questionnaire_progress,
  "questionnaire-animated": Ex_questionnaire_animated,
  "questionnaire-card": Ex_questionnaire_card,
  "questionnaire-dialog": Ex_questionnaire_dialog,
};
