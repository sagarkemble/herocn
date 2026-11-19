"use client";

import { BellIcon, CheckCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function BadgeIcon() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Badge>
				<BellIcon data-icon="inline-start" />
				Notifications
			</Badge>
			<Badge variant="success">
				<CheckCheckIcon data-icon="inline-end" />
				New
			</Badge>
		</div>
	);
}
