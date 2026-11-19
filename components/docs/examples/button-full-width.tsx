"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonFullWidth() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<Button className="w-full">
				<PlusIcon data-icon="inline-start" />
				Create Project
			</Button>
			<Button className="w-full" variant="secondary">
				Learn More
			</Button>
			<Button className="w-full" variant="outline">
				Cancel
			</Button>
		</div>
	);
}
