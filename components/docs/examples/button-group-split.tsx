"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";

export default function ButtonGroupSplit() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ButtonGroup orientation="horizontal">
				<Button variant="secondary">Button</Button>
				<ButtonGroupSeparator />
				<Button size="icon" variant="secondary">
					<PlusIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup orientation="vertical" className="h-fit">
				<Button variant="secondary">Button</Button>
				<ButtonGroupSeparator orientation="horizontal" />
				<Button className="w-full" size="icon" variant="secondary">
					<PlusIcon />
				</Button>
			</ButtonGroup>
		</div>
	);
}
