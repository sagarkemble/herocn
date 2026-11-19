import { ScrollArea } from "@/components/ui/scroll-area";
import { DocsLogo } from "./logo";
import { DocsNav } from "./nav";

/** heroui.com docs sidebar: 264px, sticky full height, px-3 pt-5, header (logo + version) then the list. */
export function DocsSidebar() {
	return (
		<div className="sticky top-0 z-20 col-start-1 row-span-2 row-start-1 h-dvh max-md:hidden">
			<aside className="absolute inset-0 flex w-[264px] flex-col gap-4 px-3 pt-5 text-sm">
				<div className="flex flex-col gap-4 px-1">
					<DocsLogo />
				</div>
				<ScrollArea className="min-h-0 flex-1">
					<DocsNav />
				</ScrollArea>
			</aside>
		</div>
	);
}
