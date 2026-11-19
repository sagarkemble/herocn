import { redirect } from "next/navigation";

import { docsHref, ordered } from "@/components/docs/data";

export default function ComponentsIndex() {
	redirect(docsHref(ordered[0].slug));
}
