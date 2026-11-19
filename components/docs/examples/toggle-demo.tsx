"use client";

import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
	return (
		<Toggle aria-label="Toggle bookmark">
			<BookmarkIcon className="group-aria-pressed/toggle:fill-primary-soft-foreground" />
			Bookmark
		</Toggle>
	);
}
