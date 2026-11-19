import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonLoading() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button disabled>
				<Spinner data-icon="inline-start" size="sm" className="text-current" />
				Uploading...
			</Button>
			<Button disabled variant="secondary">
				<Spinner data-icon="inline-start" size="sm" className="text-current" />
				Loading
			</Button>
			<Button disabled size="icon" variant="tertiary" aria-label="Loading">
				<Spinner size="sm" className="text-current" />
			</Button>
		</div>
	);
}
