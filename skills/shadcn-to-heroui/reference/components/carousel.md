# Carousel

herocn source: `Maqed/herocn:apps/docs/src/registry/new-york-v4/ui/carousel.tsx` (commit `be08ffc`). Stock: shadcn `apps/v4/registry/bases/base/ui/carousel.tsx` and `bases/radix/ui/carousel.tsx` (commit `968d8cb`), `cn-*` tokens resolved with **style-nova** (shadcn CLI default).
Docs: herocn https://herocn.dev/docs/components/carousel · HeroUI equivalent: NOT FOUND (no HeroUI v3.2.7 component)

## Primitive (Base UI import used by herocn)

```ts
import { cn } from "cn";
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
```

Stock base imports (differ):
```ts
import { cn } from "cn"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
```

Stock radix imports:
```ts
import { cn } from "cn"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
```

## Exports

herocn: `Carousel`, `CarouselApi`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious`, `useCarousel`

- Extra vs stock base: none
- Missing vs stock base: none
- Extra vs stock radix: none
- Missing vs stock radix: none

## Target file

herocn source, verbatim (the look to reproduce; in a user project keep the user's props/exports and copy only classes unless a change is marked safe additive).

```tsx
"use client";

import { cn } from "cn";
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/new-york-v4/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

function Carousel({
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: React.ComponentProps<"div"> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},
		plugins,
	);
	const [canScrollPrev, setCanScrollPrev] = React.useState(false);
	const [canScrollNext, setCanScrollNext] = React.useState(false);

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const isRTL = opts?.direction === "rtl";
			if (orientation === "horizontal") {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					isRTL ? scrollNext() : scrollPrev();
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					isRTL ? scrollPrev() : scrollNext();
				}
			} else {
				if (event.key === "ArrowUp") {
					event.preventDefault();
					isRTL ? scrollNext() : scrollPrev();
				} else if (event.key === "ArrowDown") {
					event.preventDefault();
					isRTL ? scrollPrev() : scrollNext();
				}
			}
		},
		[scrollPrev, scrollNext, opts, orientation],
	);

	React.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	React.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);

		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn("relative", className)}
				role="region"
				aria-roledescription="carousel"
				data-slot="carousel"
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div
			ref={carouselRef}
			className="overflow-hidden rounded-xl"
			data-slot="carousel-content"
		>
			<div
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
	const { orientation } = useCarousel();

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "ps-4" : "pt-4",
				className,
			)}
			{...props}
		/>
	);
}

function CarouselPrevious({
	className,
	variant = "tertiary",
	size = "icon-sm",
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			data-slot="carousel-previous"
			variant={variant}
			size={size}
			className={cn(
				"absolute touch-manipulation rounded-3xl",
				orientation === "horizontal"
					? "start-4 top-1/2 -translate-y-1/2"
					: "start-1/2 top-4 -translate-x-1/2 rotate-90 rtl:translate-x-1/2",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ChevronLeftIcon className="size-5 rtl:rotate-180" />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
}

function CarouselNext({
	className,
	variant = "tertiary",
	size = "icon-sm",
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			data-slot="carousel-next"
			variant={variant}
			size={size}
			className={cn(
				"absolute touch-manipulation rounded-3xl",
				orientation === "horizontal"
					? "end-4 top-1/2 -translate-y-1/2"
					: "start-1/2 bottom-4 -translate-x-1/2 rotate-90 rtl:translate-x-1/2",
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ChevronRightIcon className="size-5 rtl:rotate-180" />
			<span className="sr-only">Next slide</span>
		</Button>
	);
}

export {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	useCarousel,
};
```

## Shadcn → HeroUI class table

Rows are parts (function name / cva `group=key`). Match by part, not by literal string: a project initialised with another shadcn style (vega, maia, …) has different stock classes, but the herocn column is always the target. `[cond]` = the string applies only under that condition in the source.

| Part/variant | Stock shadcn classes | herocn classes |
|---|---|---|
| Carousel | `relative` | `relative` |
| CarouselContent | `overflow-hidden`<br>`flex`<br>`-ml-4`<br>`[key:-ml-4] -mt-4 flex-col` | `overflow-hidden rounded-xl`<br>`flex`<br>`-ms-4`<br>`[key:-ms-4] -mt-4 flex-col` |
| CarouselItem | `min-w-0 shrink-0 grow-0 basis-full`<br>`pl-4`<br>`[key:pl-4] pt-4` | `min-w-0 shrink-0 grow-0 basis-full`<br>`ps-4`<br>`[key:ps-4] pt-4` |
| CarouselPrevious | *(empty)*<br>`sr-only`<br>`rounded-full absolute touch-manipulation`<br>`inset-y-0 -left-12 my-auto`<br>`[key:my-auto] -top-12 left-1/2 -translate-x-1/2 rotate-90` | `size-5 rtl:rotate-180`<br>`sr-only`<br>`absolute touch-manipulation rounded-3xl`<br>`start-4 top-1/2 -translate-y-1/2`<br>`start-1/2 top-4 -translate-x-1/2 rotate-90 rtl:translate-x-1/2` |
| CarouselNext | *(empty)*<br>`sr-only`<br>`rounded-full absolute touch-manipulation`<br>`inset-y-0 -right-12 my-auto`<br>`[key:my-auto] -bottom-12 left-1/2 -translate-x-1/2 rotate-90` | `size-5 rtl:rotate-180`<br>`sr-only`<br>`absolute touch-manipulation rounded-3xl`<br>`end-4 top-1/2 -translate-y-1/2`<br>`start-1/2 bottom-4 -translate-x-1/2 rotate-90 rtl:translate-x-1/2` |

## Radix notes

Stock radix vs stock base (resolved, nova) attribute/variable differences:

- Only in stock base: none
- Only in stock radix: none

No Base UI-only selectors in the herocn file. The class table applies to Radix files unchanged (shadcn's `data-open` / `data-closed` / `data-checked` / `data-active` / `data-disabled` variants match both libraries).

## Behavior/prop changes

Don't copy any of these into user projects unless marked *safe additive*. Class-only changes are always fine.

- `CarouselPrevious`: prop changed `variant = "outline"` → `variant = "tertiary"`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.
- `CarouselNext`: prop changed `variant = "outline"` → `variant = "tertiary"`. **NOT safe**: changed default/behaviour. Don't copy unless the user opts in.

## Herocn-only / not in HeroUI

- No HeroUI v3.2.7 component matches `carousel`. Every visual here is herocn's own extrapolation of HeroUI tokens (`rounded-3xl`/`rounded-xl`, `bg-surface`, `focus-ring`, …).
