"use client";

import { Badge } from "@/components/ui/badge";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function InputBadge() {
	return (
		<div className="w-full max-w-sm">
			<Field>
				<FieldLabel
					htmlFor="input-badge"
					className="flex w-full items-center gap-2"
				>
					Webhook URL
					<Badge variant="default" className="ml-auto">
						Beta
					</Badge>
				</FieldLabel>
				<Input
					id="input-badge"
					type="url"
					placeholder="https://api.example.com/webhook"
				/>
			</Field>
		</div>
	);
}
