"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function InputButtonGroup() {
	return (
		<div className="w-full max-w-sm">
			<Field>
				<FieldLabel htmlFor="input-button-group">Search</FieldLabel>
				<ButtonGroup>
					<Input
						id="input-button-group"
						variant="secondary"
						placeholder="Type to search..."
					/>
					<Button variant="tertiary">Search</Button>
				</ButtonGroup>
			</Field>
		</div>
	);
}
