"use client";

import * as React from "react";
import { PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonLoadingState() {
	const [loading, setLoading] = React.useState(false);

	function handleClick() {
		setLoading(true);
		setTimeout(() => setLoading(false), 2000);
	}

	return (
		<Button disabled={loading} onClick={handleClick}>
			{loading ? (
				<Spinner data-icon="inline-start" size="sm" className="text-current" />
			) : (
				<PaperclipIcon data-icon="inline-start" />
			)}
			{loading ? "Uploading..." : "Upload File"}
		</Button>
	);
}
