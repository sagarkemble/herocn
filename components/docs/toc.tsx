"use client";

import * as React from "react";
import { cn } from "cn";

import type { TocItem } from "./data";

/** "On this page" with scroll-spy (heroui.com: 13px/20px links, nested items ps-3, active = medium + foreground). */
export function DocsToc({ items }: { items: TocItem[] }) {
	const [active, setActive] = React.useState(items[0]?.id);

	React.useEffect(() => {
		const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
		function onScroll() {
			let current = items[0]?.id;
			for (const el of els) {
				if (el.getBoundingClientRect().top < 120) current = el.id;
			}
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = els.at(-1)?.id ?? current;
			setActive(current);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [items]);

	return (
		<div className="sticky top-0 flex h-dvh w-full flex-col gap-1 ps-4 pe-5 pt-24 pb-2">
			<h3 className="font-medium text-(--docs-fg-subtle) text-[13px] leading-[18px]">On this page</h3>
			<div className="relative ms-px min-h-0 overflow-auto overscroll-contain py-3 [scrollbar-width:none] mask-[linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)]">
				<div className="flex flex-col">
					{items.map((i) => (
						<a
							key={i.id}
							href={`#${i.id}`}
							data-active={active === i.id}
							className={cn(
								"flex min-h-6 scroll-m-4 items-center py-0.5 text-(--docs-fg-subtle) text-[13px] leading-5 transition-colors duration-150 wrap-anywhere hover:text-(--docs-fg) data-[active=true]:font-medium data-[active=true]:text-foreground",
								i.depth === 3 && "ps-3",
							)}
						>
							{i.title}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
