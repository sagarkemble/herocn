"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function KbdTooltip() {
	return (
		<div className="flex flex-wrap gap-4">
			<ButtonGroup>
				<Tooltip>
					<TooltipTrigger
						render={<Button variant="tertiary" className="w-fit" />}
					>
						Save
					</TooltipTrigger>
					<TooltipContent>
						Save Changes <Kbd>S</Kbd>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger
						render={<Button variant="tertiary" className="w-fit" />}
					>
						Print
					</TooltipTrigger>
					<TooltipContent className="flex flex-wrap items-center gap-1">
						Print Document{" "}
						<KbdGroup>
							<Kbd>Ctrl</Kbd>
							<Kbd>P</Kbd>
						</KbdGroup>
					</TooltipContent>
				</Tooltip>
			</ButtonGroup>
		</div>
	);
}
