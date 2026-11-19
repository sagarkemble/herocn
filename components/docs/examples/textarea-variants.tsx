"use client";

import { Textarea } from "@/components/ui/textarea";

export default function TextareaVariants() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<Textarea placeholder="Default" rows={3} />
			<Textarea variant="secondary" placeholder="Secondary" rows={3} />
		</div>
	);
}
