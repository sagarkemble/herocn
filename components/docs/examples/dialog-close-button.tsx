"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogCloseButton() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="secondary" />}>
				Share
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view this.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input
							variant="secondary"
							id="link"
							defaultValue="https://herocn.dev/docs/installation"
							readOnly
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose render={<Button variant="secondary" type="button" />}>
						Close
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
