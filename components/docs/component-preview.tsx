"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, CopyIcon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";

/**
 * heroui.com docs demo frame: rounded-[20px] tinted frame (p-2), an inner preview on the page background
 * (rounded-[14px], min-h 220px), then a code peek (120px, fade) with a "View code" / "Hide code" pill.
 */
export function ComponentPreview({
	name,
	code,
	html,
	usage = false,
	previewClassName,
	children,
}: {
	name: string;
	code: string;
	html: string;
	usage?: boolean;
	previewClassName?: string | null;
	children: React.ReactNode;
}) {
	const [open, setOpen] = React.useState(false);
	const [copied, setCopied] = React.useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// clipboard not available
		}
	}

	return (
		<div className="docs-preview group relative mb-6 w-full" data-name={name} data-usage={usage || undefined}>
			<div className="flex flex-col rounded-[20px] bg-(--docs-demo) p-2">
				<div
					className={cn(
						"relative flex w-full overflow-hidden rounded-[14px] bg-background",
						"min-h-[220px]",
					)}
				>
					<div
						className={cn(
							"flex w-full min-w-0 items-center justify-center p-4 sm:p-8",
							previewClassName,
						)}
					>
						{children}
					</div>
				</div>
				<div className="relative overflow-hidden rounded-b-[14px]">
					<div className={cn("relative", !open && "max-h-[120px] overflow-hidden")}>
						<div className="absolute end-2 top-2.5 z-10">
							<Button
								variant="ghost"
								size="icon-sm"
								aria-label={copied ? "Copied" : "Copy code"}
								onClick={copy}
							>
								{copied ? <CheckIcon /> : <CopyIcon />}
							</Button>
						</div>
						<div
							className={cn(
								"docs-code overflow-auto py-3.5 font-mono text-[13px] leading-[22px]",
								open ? "max-h-[600px] pb-16" : "",
							)}
							// biome-ignore lint: highlighted on the server with shiki
							dangerouslySetInnerHTML={{ __html: html }}
						/>
					</div>
					{!open && (
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent via-(--docs-demo)/85 via-55% to-(--docs-demo)"
						/>
					)}
					<div className="absolute inset-x-0 bottom-5 flex justify-center">
						<Button variant="outline" size="xs" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
							{open ? "Hide code" : "View code"}
							<ChevronDownIcon data-icon="inline-end" className={cn("transition-transform", open && "rotate-180")} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
