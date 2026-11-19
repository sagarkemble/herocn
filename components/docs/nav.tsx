"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "cn";

import { docsNavGroups } from "./data";

/** Sidebar list. Text links are plain anchors (heroui.com's docs nav is not a HeroUI component either). */
export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = usePathname();
	const ref = React.useRef<HTMLElement>(null);
	// heroui.com keeps the active item in view inside the sidebar scroller.
	React.useEffect(() => {
		const nav = ref.current;
		const el = nav?.querySelector<HTMLElement>("[data-active=true]");
		const viewport = nav?.closest<HTMLElement>("[data-slot=scroll-area-viewport]");
		if (!el || !viewport) return;
		const r = el.getBoundingClientRect();
		const vr = viewport.getBoundingClientRect();
		const top = r.top - vr.top + viewport.scrollTop - viewport.clientHeight / 2 + r.height / 2;
		if (r.top < vr.top || r.bottom > vr.bottom) viewport.scrollTop = Math.max(0, top);
	}, [pathname]);
	return (
		<nav ref={ref} aria-label="Components" className="flex w-full flex-col gap-0.5 pt-1 pb-14">
			{docsNavGroups.map(([group, items], gi) => (
				<div key={group} className="flex flex-col gap-0.5">
					<p
						className={cn(
							"flex h-7 items-center px-2 font-medium text-(--docs-fg-subtle) text-[13px] leading-[18px]",
							gi > 0 && "mt-2",
						)}
					>
						{group}
					</p>
					{items.map((item) => {
						const active = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={onNavigate}
								data-active={active}
								aria-current={active ? "page" : undefined}
								className="relative flex min-h-7 w-full items-center gap-2 rounded-lg px-2 py-[5px] text-start font-medium text-(--docs-fg) text-[13px] leading-[18px] outline-none transition-colors hover:bg-(--docs-item-hover) focus-visible:focus-ring data-[active=true]:bg-(--docs-item-active) data-[active=true]:text-foreground"
							>
								{item.title}
							</Link>
						);
					})}
				</div>
			))}
		</nav>
	);
}
