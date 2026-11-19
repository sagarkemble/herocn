"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Surface } from "@/components/ui/surface";

const tags = Array.from({ length: 50 }).map(
	(_, i, array) => `v1.2.0-beta.${array.length - i}`,
);

export function ScrollAreaDemo() {
	return (
		<ScrollArea className="h-72 w-50 rounded-xl">
			<Surface className="px-6 py-4">
				<h4 className="mb-4 font-medium text-sm leading-none">Tags</h4>
				{tags.map((tag, index) => (
					<React.Fragment key={tag}>
						<div className="text-sm">{tag}</div>
						{index !== tags.length - 1 && <Separator className="my-2" />}
					</React.Fragment>
				))}
			</Surface>
		</ScrollArea>
	);
}
