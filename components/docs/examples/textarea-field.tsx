"use client";

import {
	Field,
	FieldDescription,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaField() {
	return (
		<div className="w-full max-w-sm">
			<Field>
				<FieldLabel htmlFor="textarea-field-message">Message</FieldLabel>
				<Textarea
					id="textarea-field-message"
					placeholder="Type your message here."
					rows={4}
				/>
				<FieldDescription>
					We read every submission and aim to reply within two business days.
				</FieldDescription>
			</Field>
		</div>
	);
}
