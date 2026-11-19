"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function CheckboxInvalid() {
	return (
		<FieldGroup className="mx-auto w-full max-w-xs">
			<Field orientation="horizontal" data-invalid>
				<Checkbox
					id="checkbox-invalid-terms"
					name="checkbox-invalid-terms"
					aria-invalid
				/>
				<FieldLabel htmlFor="checkbox-invalid-terms">
					Accept terms and conditions
				</FieldLabel>
			</Field>
		</FieldGroup>
	);
}
