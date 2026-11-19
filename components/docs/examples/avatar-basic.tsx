"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

export default function AvatarBasic() {
	return (
		<Avatar>
			<AvatarImage src="https://github.com/Maqed.png" alt="@0xMaqed" />
			<AvatarFallback>Mqd</AvatarFallback>
		</Avatar>
	);
}
