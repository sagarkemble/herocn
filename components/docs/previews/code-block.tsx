import type * as React from "react";
import Ex_code_block_basic from "@/components/docs/examples/code-block-basic";
import Ex_code_block_actions from "@/components/docs/examples/code-block-actions";
import Ex_code_block_line_numbers from "@/components/docs/examples/code-block-line-numbers";
import Ex_code_block_start_line from "@/components/docs/examples/code-block-start-line";
import Ex_code_block_wrap from "@/components/docs/examples/code-block-wrap";
import Ex_code_block_highlighted from "@/components/docs/examples/code-block-highlighted";
import Ex_code_block_diff from "@/components/docs/examples/code-block-diff";
import Ex_code_block_height from "@/components/docs/examples/code-block-height";
import Ex_code_block_destructive from "@/components/docs/examples/code-block-destructive";
import Ex_code_block_trace from "@/components/docs/examples/code-block-trace";
import Ex_code_block_highlighting from "@/components/docs/examples/code-block-highlighting";
import Ex_code_block_languages from "@/components/docs/examples/code-block-languages";
import Ex_code_block_ansi from "@/components/docs/examples/code-block-ansi";

export const previews: Record<string, React.ComponentType> = {
  "code-block-basic": Ex_code_block_basic,
  "code-block-actions": Ex_code_block_actions,
  "code-block-line-numbers": Ex_code_block_line_numbers,
  "code-block-start-line": Ex_code_block_start_line,
  "code-block-wrap": Ex_code_block_wrap,
  "code-block-highlighted": Ex_code_block_highlighted,
  "code-block-diff": Ex_code_block_diff,
  "code-block-height": Ex_code_block_height,
  "code-block-destructive": Ex_code_block_destructive,
  "code-block-trace": Ex_code_block_trace,
  "code-block-highlighting": Ex_code_block_highlighting,
  "code-block-languages": Ex_code_block_languages,
  "code-block-ansi": Ex_code_block_ansi,
};
