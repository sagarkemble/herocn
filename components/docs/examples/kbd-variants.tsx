"use client";

import { Kbd } from "@/components/ui/kbd";

export default function KbdVariants() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<Kbd variant="default">Ctrl + B</Kbd>
			<Kbd variant="light">Ctrl + B</Kbd>
		</div>
	);
}
