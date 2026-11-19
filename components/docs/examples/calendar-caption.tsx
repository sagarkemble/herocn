"use client";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarCaption() {
	return (
		<Calendar
			mode="single"
			captionLayout="dropdown"
			className="rounded-lg border"
		/>
	);
}
