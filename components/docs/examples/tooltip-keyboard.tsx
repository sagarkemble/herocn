"use client";

import { SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipKeyboard() {
	return (
		<Tooltip>
			<TooltipTrigger render={<Button variant="tertiary" size="icon-sm" />}>
				<SaveIcon />
			</TooltipTrigger>
			<TooltipContent>
				Save Changes <Kbd>S</Kbd>
			</TooltipContent>
		</Tooltip>
	);
}
