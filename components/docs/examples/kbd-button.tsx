"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

export default function KbdButton() {
	return (
		<Button variant="outline">
			Accept <Kbd data-icon="inline-end">⏎</Kbd>
		</Button>
	);
}
