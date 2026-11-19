import raw from "./data.json";

export type DocSection = {
	h2: string;
	h3: string | null;
	id: string;
	examples: string[];
	pc: string | null;
};
export type DocPage = {
	slug: string;
	title: string;
	group: string;
	description: string;
	usage: { name: string; pc: string | null } | null;
	sections: DocSection[];
};

export const groups = raw.groups as [string, string[]][];
export const pages = raw.pages as DocPage[];
export const pageBySlug = Object.fromEntries(pages.map((p) => [p.slug, p])) as Record<string, DocPage>;
/** Sidebar order (group by group). */
export const ordered: DocPage[] = groups.flatMap(([, slugs]) => slugs.map((s) => pageBySlug[s]));
export const docsHref = (slug: string) => `/docs/react/components/${slug}`;

export type DocsNavItem = { href: string; title: string };
export const docsNavGroups: [string, DocsNavItem[]][] = [
	["Guides", [{ href: "/docs/skills", title: "Agent skills" }]],
	...groups.map(
		([group, slugs]) => [group, slugs.map((slug) => ({ href: docsHref(slug), title: pageBySlug[slug].title }))] as [string, DocsNavItem[]],
	),
];

export type TocItem = { id: string; title: string; depth: 2 | 3 };

export function tocFor(page: DocPage): TocItem[] {
	const toc: TocItem[] = [{ id: "installation", title: "Installation", depth: 2 }];
	if (page.usage) toc.push({ id: "usage", title: "Usage", depth: 2 });
	let lastH2 = "";
	for (const s of page.sections) {
		if (s.h2 !== lastH2) {
			toc.push({ id: slugify(s.h2), title: s.h2, depth: 2 });
			lastH2 = s.h2;
		}
		if (s.h3) toc.push({ id: s.id, title: s.h3, depth: 3 });
	}
	return toc;
}

export function slugify(t: string) {
	return t
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}
