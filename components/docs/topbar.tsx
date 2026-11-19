"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { siGithub } from "simple-icons";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DocsLogo } from "./logo";
import { DocsNav } from "./nav";
import { DocsSearch } from "./search";

function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	const dark = mounted && resolvedTheme === "dark";
	return (
		<Button
			variant="tertiary"
			size="icon-sm"
			aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
			onClick={() => setTheme(dark ? "light" : "dark")}
		>
			{dark ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
}

function Actions() {
	return (
		<div className="flex items-center gap-2">
			<DocsSearch />
			<a
				href="https://github.com/Maqed/herocn"
				target="_blank"
				rel="noreferrer"
				aria-label="GitHub"
				className={buttonVariants({ variant: "tertiary", size: "icon-sm" })}
			>
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" role="img">
					<path d={siGithub.path} />
				</svg>
			</a>
			<ThemeToggle />
		</div>
	);
}

/** Desktop: sticky 72px bar over content + TOC columns, icons aligned right (heroui.com: pe-10). */
export function DocsTopbar() {
	return (
		<div className="sticky top-0 z-30 col-start-2 col-end-[-1] row-start-1 flex h-[72px] items-center justify-end self-start bg-background pe-10 max-md:hidden">
			<Actions />
		</div>
	);
}

/** Mobile (<768px): 56px header with menu sheet, as on heroui.com. */
export function DocsMobileHeader() {
	const [open, setOpen] = React.useState(false);
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center gap-2 bg-background px-4 md:hidden">
			<DocsLogo />
			<div className="ms-auto flex items-center gap-2">
				<Actions />
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Open navigation" />}>
						<MenuIcon />
					</SheetTrigger>
					<SheetContent side="left" className="w-[280px]">
						<SheetHeader>
							<SheetTitle>Components</SheetTitle>
						</SheetHeader>
						<ScrollArea className="min-h-0 flex-1 px-3">
							<DocsNav onNavigate={() => setOpen(false)} />
						</ScrollArea>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
