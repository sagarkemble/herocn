"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function CheckboxDisabled() {
	return (
		<FieldGroup className="mx-auto w-full max-w-xs">
			<Field orientation="horizontal" data-disabled>
				<Checkbox
					id="checkbox-disabled-notify"
					name="checkbox-disabled-notify"
					disabled
				/>
				<FieldLabel htmlFor="checkbox-disabled-notify">
					Enable notifications
				</FieldLabel>
			</Field>
		</FieldGroup>
	);
}
