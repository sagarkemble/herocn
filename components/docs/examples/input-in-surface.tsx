"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";

export default function InputInSurface() {
	return (
		<Surface className="flex w-full max-w-sm flex-col gap-3 rounded-3xl p-6">
			<Field>
				<FieldLabel htmlFor="input-in-surface-message">
					What's your name?
				</FieldLabel>
				<Input id="input-in-surface-message" variant="secondary" />
			</Field>
			<Button>Submit</Button>
		</Surface>
	);
}
