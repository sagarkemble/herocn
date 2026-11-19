"use client";

import {
	NativeSelect,
	NativeSelectOption,
} from "@/components/ui/native-select";

export default function NativeSelectVariants() {
	return (
		<div className="flex w-full max-w-sm flex-col items-center justify-center gap-4">
			<NativeSelect variant="default">
				<NativeSelectOption value="">Default</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
				<NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
			</NativeSelect>
			<NativeSelect variant="secondary">
				<NativeSelectOption value="">Secondary</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
				<NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
			</NativeSelect>
		</div>
	);
}
