import type * as React from "react";

import { DocsSidebar } from "./sidebar";
import { DocsMobileHeader, DocsTopbar } from "./topbar";

/**
 * heroui.com docs grid at 1440px: 264 | 28 | 892 | 14 | 228 | 14 (sidebar · gap · article · gap · toc · gap).
 * md: sidebar + article. <md: one column with a 56px header.
 */
export function DocsShell({ toc, children }: { toc: React.ReactNode; children: React.ReactNode }) {
	return (
		<div className="docs-root relative grid min-h-dvh grid-cols-[minmax(0,1fr)] overflow-x-clip md:grid-cols-[264px_minmax(0,1fr)] xl:grid-cols-[264px_minmax(14px,2fr)_minmax(0,892px)_minmax(7px,1fr)_228px_14px]">
			<DocsMobileHeader />
			<DocsSidebar />
			<DocsTopbar />
			<article className="flex min-w-0 flex-col px-5 pt-8 pb-16 md:col-start-2 md:row-start-2 md:px-8 md:pt-4 xl:col-start-3">
				{children}
			</article>
			<div className="col-start-5 row-span-2 row-start-1 max-xl:hidden">{toc}</div>
		</div>
	);
}
