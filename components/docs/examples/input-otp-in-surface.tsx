"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Surface } from "@/components/ui/surface";

export default function InputOTPInSurface() {
	return (
		<Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
			<Field>
				<FieldLabel htmlFor="input-otp-surface">Verification Code</FieldLabel>
				<InputOTP
					id="input-otp-surface"
					maxLength={6}
					defaultValue="123456"
					variant="secondary"
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</Field>
		</Surface>
	);
}
