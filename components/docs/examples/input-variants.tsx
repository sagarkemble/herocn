"use client";

import { Input } from "@/components/ui/input";

export default function InputVariants() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<Input placeholder="Default" />
			<Input variant="secondary" placeholder="Secondary" />
		</div>
	);
}
