import { Button } from "@/components/ui/button";
import { DirectionProvider } from "@/components/ui/direction";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function DirectionLtr() {
	return (
		<DirectionProvider direction="ltr">
			<div dir="ltr" className="flex w-full max-w-sm flex-col gap-4">
				<Input placeholder="Email address" />
				<div className="flex items-center gap-2">
					<Switch id="ltr-switch" defaultChecked />
					<label htmlFor="ltr-switch" className="text-sm">
						Enable notifications
					</label>
				</div>
				<div className="flex gap-2">
					<Button>Save</Button>
					<Button variant="outline">Cancel</Button>
				</div>
			</div>
		</DirectionProvider>
	);
}
