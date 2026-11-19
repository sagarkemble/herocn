"use client";

import { SearchIcon } from "lucide-react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupInSurface() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Find a member</CardTitle>
			</CardHeader>
			<CardContent>
				<InputGroup variant="secondary">
					<InputGroupInput placeholder="Search by name or email..." />
					<InputGroupAddon align="inline-end">
						<InputGroupButton size="icon-sm">
							<SearchIcon />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</CardContent>
		</Card>
	);
}
