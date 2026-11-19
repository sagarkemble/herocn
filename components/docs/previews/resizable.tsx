import type * as React from "react";
import { ResizableDemo as Ex_resizable_demo } from "@/components/docs/examples/resizable-demo";
import { ResizableVertical as Ex_resizable_vertical } from "@/components/docs/examples/resizable-vertical";
import { ResizableHandleDemo as Ex_resizable_handle } from "@/components/docs/examples/resizable-handle";

export const previews: Record<string, React.ComponentType> = {
  "resizable-demo": Ex_resizable_demo,
  "resizable-vertical": Ex_resizable_vertical,
  "resizable-handle": Ex_resizable_handle,
};
