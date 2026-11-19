"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaInSurface() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Leave a comment</CardTitle>
			</CardHeader>
			<CardContent>
				<Field>
					<FieldLabel htmlFor="textarea-in-surface-message">Message</FieldLabel>
					<Textarea
						id="textarea-in-surface-message"
						variant="secondary"
						placeholder="Share your thoughts..."
						rows={4}
					/>
					<FieldDescription>
						Your feedback helps us improve the product.
					</FieldDescription>
				</Field>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button variant="ghost" size="sm">
					Cancel
				</Button>
				<Button size="sm">Submit</Button>
			</CardFooter>
		</Card>
	);
}
