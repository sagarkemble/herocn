"use client";

import { BellIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
	return (
		<div className="flex items-center gap-3">
			<Badge>Badge</Badge>
			<Badge size="lg" variant="primary">
				<BellIcon data-icon="inline-start" />
				Notifications
			</Badge>
		</div>
	);
}
