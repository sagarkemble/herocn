"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardWithForm() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Create project</CardTitle>
				<CardDescription>Deploy your new project in one click.</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="flex flex-col gap-4">
					<div className="grid gap-2">
						<Label htmlFor="project-name">Name</Label>
						<Input id="project-name" placeholder="Name of your project" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="project-framework">Framework</Label>
						<Input id="project-framework" placeholder="Next.js" />
					</div>
				</form>
			</CardContent>
			<CardFooter className="justify-between">
				<Button variant="outline">Cancel</Button>
				<Button>Deploy</Button>
			</CardFooter>
		</Card>
	);
}
