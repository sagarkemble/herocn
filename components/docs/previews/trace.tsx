import type * as React from "react";
import Ex_trace_static from "@/components/docs/examples/trace-static";
import Ex_trace_status from "@/components/docs/examples/trace-status";
import Ex_trace_description from "@/components/docs/examples/trace-description";
import Ex_trace_collapsible from "@/components/docs/examples/trace-collapsible";
import Ex_trace_open from "@/components/docs/examples/trace-open";
import Ex_trace_link from "@/components/docs/examples/trace-link";
import Ex_trace_dialog from "@/components/docs/examples/trace-dialog";
import Ex_trace_sheet from "@/components/docs/examples/trace-sheet";
import Ex_trace_group from "@/components/docs/examples/trace-group";
import Ex_trace_sources from "@/components/docs/examples/trace-sources";
import Ex_trace_steps from "@/components/docs/examples/trace-steps";
import Ex_trace_commit from "@/components/docs/examples/trace-commit";
import Ex_trace_turn from "@/components/docs/examples/trace-turn";

export const previews: Record<string, React.ComponentType> = {
  "trace-static": Ex_trace_static,
  "trace-status": Ex_trace_status,
  "trace-description": Ex_trace_description,
  "trace-collapsible": Ex_trace_collapsible,
  "trace-open": Ex_trace_open,
  "trace-link": Ex_trace_link,
  "trace-dialog": Ex_trace_dialog,
  "trace-sheet": Ex_trace_sheet,
  "trace-group": Ex_trace_group,
  "trace-sources": Ex_trace_sources,
  "trace-steps": Ex_trace_steps,
  "trace-commit": Ex_trace_commit,
  "trace-turn": Ex_trace_turn,
};
