"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

export default function ButtonGroupInput() {
	return (
		<ButtonGroup className="max-w-sm">
			<Input variant="secondary" placeholder="Search..." />
			<Button variant="tertiary" aria-label="Search">
				<SearchIcon />
			</Button>
		</ButtonGroup>
	);
}
