"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function ButtonGroupOrientation() {
	return (
		<ButtonGroup
			orientation="vertical"
			aria-label="Media controls"
			className="h-fit"
		>
			<Button variant="tertiary" size="icon">
				<PlusIcon />
			</Button>
			<Button variant="tertiary" size="icon">
				<MinusIcon />
			</Button>
		</ButtonGroup>
	);
}
