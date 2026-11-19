"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";

export default function CheckboxDescription() {
	return (
		<FieldGroup className="mx-auto w-full max-w-xs">
			<Field orientation="horizontal">
				<Checkbox
					id="checkbox-desc-terms"
					name="checkbox-desc-terms"
					defaultChecked
				/>
				<FieldContent>
					<FieldLabel htmlFor="checkbox-desc-terms">
						Accept terms and conditions
					</FieldLabel>
					<FieldDescription>
						By clicking this checkbox, you agree to the terms and conditions.
					</FieldDescription>
				</FieldContent>
			</Field>
		</FieldGroup>
	);
}
