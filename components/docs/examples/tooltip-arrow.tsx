"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ToolTipArrow() {
	return (
		<div className="flex flex-wrap gap-2">
			{(["left", "top", "bottom", "right"] as const).map((side) => (
				<Tooltip key={side}>
					<TooltipTrigger
						render={<Button variant="tertiary" className="w-fit capitalize" />}
					>
						{side}
					</TooltipTrigger>
					<TooltipContent withArrow side={side}>
						<p>This tooltip has an arrow</p>
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	);
}
