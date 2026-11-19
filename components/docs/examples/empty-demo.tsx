"use client";

import { ArrowUpRightIcon, FolderCode } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyDemo() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<FolderCode />
				</EmptyMedia>
				<EmptyTitle>No Projects Yet</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any projects yet. Get started by creating
					your first project.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="flex-row justify-center gap-2">
				<Button>Create Project</Button>
				<Button variant="outline">Import Project</Button>
			</EmptyContent>
			<a className={buttonVariants({ variant: "link", size: "sm" })} href="#">
				Learn More <ArrowUpRightIcon data-icon="inline-end" />
			</a>
		</Empty>
	);
}
