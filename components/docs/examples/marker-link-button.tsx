"use client";

import { GitBranchIcon, RotateCcwIcon } from "lucide-react";
import {
	Marker,
	MarkerContent,
	MarkerIcon,
} from "@/components/ui/marker";
import { toast } from "@/components/ui/toast";

export default function MarkerLinkButton() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-8 py-12">
			<Marker render={<a href="#" />}>
				<MarkerIcon>
					<GitBranchIcon />
				</MarkerIcon>
				<MarkerContent>View the pull request</MarkerContent>
			</Marker>
			<Marker
				render={
					<button
						type="button"
						className="transition-colors hover:text-foreground"
						onClick={() =>
							toast.add({ title: "You clicked the revert button" })
						}
					/>
				}
			>
				<MarkerIcon>
					<RotateCcwIcon />
				</MarkerIcon>
				<MarkerContent>Revert this change</MarkerContent>
			</Marker>
		</div>
	);
}
