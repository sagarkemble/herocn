"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Command,
} from "@/components/ui/command";
import { docsHref, groups, pageBySlug } from "./data";

export function DocsSearch() {
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((o) => !o);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<>
			<Button variant="tertiary" size="icon-sm" aria-label="Open Search" onClick={() => setOpen(true)}>
				<SearchIcon />
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen} title="Search components" description="Jump to a component page">
				<Command>
					<CommandInput placeholder="Search components..." />
					<CommandList>
						<CommandEmpty>No components found.</CommandEmpty>
						{groups.map(([group, slugs]) => (
							<CommandGroup key={group} heading={group}>
								{slugs.map((slug) => (
									<CommandItem
										key={slug}
										value={`${pageBySlug[slug].title} ${slug} ${group}`}
										onSelect={() => {
											setOpen(false);
											router.push(docsHref(slug));
										}}
									>
										{pageBySlug[slug].title}
									</CommandItem>
								))}
							</CommandGroup>
						))}
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
