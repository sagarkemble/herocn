"use client";

import {
	Field,
	FieldDescription,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LabelInField() {
	return (
		<div className="w-full max-w-sm">
			<Field>
				<FieldLabel htmlFor="label-in-field-username">Username</FieldLabel>
				<Input
					id="label-in-field-username"
					type="text"
					placeholder="Enter your username"
				/>
				<FieldDescription>
					Use `FieldLabel` for forms that also need descriptions and errors.
				</FieldDescription>
			</Field>
		</div>
	);
}
