import { Button } from "@/components/ui/button";
import { DirectionProvider } from "@/components/ui/direction";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function DirectionDemo() {
	return (
		<DirectionProvider direction="rtl">
			<div dir="rtl" className="flex w-full max-w-sm flex-col gap-4">
				<Input placeholder="البريد الإلكتروني" />
				<div className="flex items-center gap-2">
					<Switch id="rtl-switch" defaultChecked />
					<label htmlFor="rtl-switch" className="text-sm">
						تفعيل الإشعارات
					</label>
				</div>
				<div className="flex gap-2">
					<Button>حفظ</Button>
					<Button variant="outline">إلغاء</Button>
				</div>
			</div>
		</DirectionProvider>
	);
}
