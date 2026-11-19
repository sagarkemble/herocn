import Link from "next/link";

/** Same text wordmark the landing header uses (no heroui.com logo artwork copied). */
export function DocsLogo() {
	return (
		<div className="flex h-8 items-center gap-3 ps-1">
			<Link href="/" aria-label="Home" className="flex items-center gap-1.5 font-display font-semibold text-[22px] text-foreground leading-none tracking-[-0.04em]">
				<span aria-hidden className="flex h-[0.85em] w-[0.7em] items-end gap-[0.12em]">
					<span className="h-full w-[0.24em] rounded-[0.08em] bg-foreground" />
					<span className="h-3/4 w-[0.24em] rounded-[0.08em] bg-foreground" />
				</span>
				hero
			</Link>
			<span className="translate-y-[2.5px] text-(--docs-fg-subtle) text-[13px] leading-none">shadcn · skill</span>
		</div>
	);
}
