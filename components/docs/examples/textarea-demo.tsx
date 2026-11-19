"use client";

import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
	return (
		<div className="w-full max-w-sm">
			<Textarea placeholder="Type your message here." rows={4} />
		</div>
	);
}
