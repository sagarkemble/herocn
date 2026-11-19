"use client";

import { HeartIcon, PlusIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonIconOnly() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button size="icon" aria-label="Add">
				<PlusIcon />
			</Button>
			<Button size="icon" variant="secondary" aria-label="Like">
				<HeartIcon />
			</Button>
			<Button size="icon" variant="tertiary" aria-label="Settings">
				<SettingsIcon />
			</Button>
			<Button size="icon" variant="outline" aria-label="Settings">
				<SettingsIcon />
			</Button>
			<Button size="icon" variant="ghost" aria-label="Settings">
				<SettingsIcon />
			</Button>
			<Button size="icon" variant="destructive" aria-label="Delete">
				<Trash2Icon />
			</Button>
		</div>
	);
}
