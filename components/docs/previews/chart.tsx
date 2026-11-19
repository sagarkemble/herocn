import type * as React from "react";
import Ex_chart_demo from "@/components/docs/examples/chart-demo";
import Ex_chart_bar_demo from "@/components/docs/examples/chart-bar-demo";
import Ex_chart_bar_demo_grid from "@/components/docs/examples/chart-bar-demo-grid";
import Ex_chart_bar_demo_axis from "@/components/docs/examples/chart-bar-demo-axis";
import Ex_chart_bar_demo_tooltip from "@/components/docs/examples/chart-bar-demo-tooltip";
import Ex_chart_bar_demo_legend from "@/components/docs/examples/chart-bar-demo-legend";
import Ex_chart_tooltip_demo from "@/components/docs/examples/chart-tooltip-demo";

export const previews: Record<string, React.ComponentType> = {
  "chart-demo": Ex_chart_demo,
  "chart-bar-demo": Ex_chart_bar_demo,
  "chart-bar-demo-grid": Ex_chart_bar_demo_grid,
  "chart-bar-demo-axis": Ex_chart_bar_demo_axis,
  "chart-bar-demo-tooltip": Ex_chart_bar_demo_tooltip,
  "chart-bar-demo-legend": Ex_chart_bar_demo_legend,
  "chart-tooltip-demo": Ex_chart_tooltip_demo,
};
