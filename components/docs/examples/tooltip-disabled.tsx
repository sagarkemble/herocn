"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipDisabled() {
	return (
		<Tooltip>
			<TooltipTrigger render={<span className="inline-block w-fit" />}>
				<Button variant="tertiary" disabled>
					Disabled
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>This feature is currently unavailable</p>
			</TooltipContent>
		</Tooltip>
	);
}
