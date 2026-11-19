"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderMultiple() {
	return (
		<Slider
			defaultValue={[10, 40, 70]}
			max={100}
			step={10}
			className="mx-auto w-full max-w-xs"
		/>
	);
}
