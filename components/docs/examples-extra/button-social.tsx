import { siApple, siGithub, siGoogle } from "simple-icons";
import { Button } from "@/components/ui/button";

function BrandIcon({ path }: { path: string }) {
	return (
		<svg aria-hidden="true" data-icon="inline-start" role="img" viewBox="0 0 24 24" fill="currentColor">
			<path d={path} />
		</svg>
	);
}

export default function ButtonSocial() {
	return (
		<div className="flex w-full max-w-xs flex-col gap-3">
			<Button className="w-full" variant="tertiary">
				<BrandIcon path={siGoogle.path} />
				Sign in with Google
			</Button>
			<Button className="w-full" variant="tertiary">
				<BrandIcon path={siGithub.path} />
				Sign in with GitHub
			</Button>
			<Button className="w-full" variant="tertiary">
				<BrandIcon path={siApple.path} />
				Sign in with Apple
			</Button>
		</div>
	);
}
