"use client";

import { Button } from "@/components/ui/button";

export default function ButtonDisabled() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button disabled>Default</Button>
			<Button disabled variant="secondary">
				Secondary
			</Button>
			<Button disabled variant="tertiary">
				Tertiary
			</Button>
			<Button disabled variant="outline">
				Outline
			</Button>
			<Button disabled variant="ghost">
				Ghost
			</Button>
			<Button disabled variant="destructive">
				Destructive
			</Button>
		</div>
	);
}
