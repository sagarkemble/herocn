"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LabelDemo() {
	return (
		<div className="grid w-full max-w-sm items-center gap-2">
			<Label htmlFor="label-demo-email">Email</Label>
			<Input id="label-demo-email" type="email" placeholder="m@example.com" />
		</div>
	);
}
