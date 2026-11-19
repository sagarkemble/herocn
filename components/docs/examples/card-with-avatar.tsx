"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function CardWithAvatar() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<div className="flex items-center gap-3">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<CardTitle>shadcn</CardTitle>
						<CardDescription>@shadcn</CardDescription>
					</div>
				</div>
				<CardAction>
					<Button size="sm">Follow</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground">
					Building beautifully designed components that you can copy and paste into your apps.
				</p>
			</CardContent>
		</Card>
	);
}
