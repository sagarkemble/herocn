"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaButton() {
	return (
		<div className="grid w-full max-w-sm gap-2">
			<Textarea placeholder="Type your message here." rows={4} />
			<Button className="w-full">Send message</Button>
		</div>
	);
}
