import type * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { docsHref, ordered, pageBySlug, pages, slugify, tocFor } from "@/components/docs/data";
import { highlight, readExample } from "@/components/docs/highlight";
import { loaders } from "@/components/docs/loaders";
import { DocsShell } from "@/components/docs/shell";
import { DocsToc } from "@/components/docs/toc";

export const dynamicParams = false;

export function generateStaticParams() {
	return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const page = pageBySlug[slug];
	return page ? { title: `${page.title} - shadcn + shadcn-to-heroui docs`, description: page.description } : {};
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<h2 id={id} className="mt-10 mb-4 scroll-m-28 font-semibold text-foreground text-xl leading-7 tracking-[-0.015em] first:mt-0">
			<a href={`#${id}`}>{children}</a>
		</h2>
	);
}
function H3({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<h3 id={id} className="mt-8 mb-2 scroll-m-28 font-semibold text-base text-foreground leading-6 tracking-[-0.01em]">
			<a href={`#${id}`}>{children}</a>
		</h3>
	);
}

export default async function ComponentDocPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const page = pageBySlug[slug];
	if (!page) notFound();
	const { previews } = await loaders[slug]();

	async function preview(name: string, pc: string | null, usage = false) {
		const Comp = previews[name];
		const code = readExample(name);
		const html = await highlight(code);
		return (
			<ComponentPreview key={name} name={name} code={code} html={html} usage={usage} previewClassName={pc}>
				<Comp />
			</ComponentPreview>
		);
	}

	const idx = ordered.findIndex((p) => p.slug === slug);
	const prev = ordered[idx - 1];
	const next = ordered[idx + 1];

	const body: React.ReactNode[] = [];
	if (page.usage) {
		body.push(<H2 key="h-usage" id="usage">Usage</H2>);
		body.push(await preview(page.usage.name, page.usage.pc, true));
	}
	let lastH2 = "";
	for (const s of page.sections) {
		if (s.h2 !== lastH2) {
			body.push(
				<H2 key={`h2-${s.h2}`} id={slugify(s.h2)}>
					{s.h2}
				</H2>,
			);
			lastH2 = s.h2;
		}
		if (s.h3)
			body.push(
				<H3 key={`h3-${s.id}`} id={s.id}>
					{s.h3}
				</H3>,
			);
		for (const n of s.examples) body.push(await preview(n, s.pc));
	}

	return (
		<DocsShell toc={<DocsToc items={tocFor(page)} />}>
			<section className="mb-6 flex flex-col gap-3">
				<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
					<h1 className="font-semibold text-[28px] text-foreground leading-9 tracking-[-0.022em] md:text-4xl md:leading-10">
						{page.title}
					</h1>
					<div className="flex items-center gap-2">
						{prev ? (
							<Link href={docsHref(prev.slug)} aria-label={`Previous: ${prev.title}`} className={buttonVariants({ variant: "tertiary", size: "icon-sm" })}>
								<ArrowLeftIcon />
							</Link>
						) : null}
						{next ? (
							<Link href={docsHref(next.slug)} aria-label={`Next: ${next.title}`} className={buttonVariants({ variant: "tertiary", size: "icon-sm" })}>
								<ArrowRightIcon />
							</Link>
						) : null}
					</div>
				</div>
				<p className="max-w-[560px] text-(--docs-fg-muted) text-base leading-6">{page.description}</p>
			</section>
			<div className="mt-4 flex-1">{body}</div>
		</DocsShell>
	);
}
