"use client"

import * as React from "react"
import { ArrowRightIcon, Grid2x2Icon, PaletteIcon, SlidersVerticalIcon, SparklesIcon, type LucideIcon } from "lucide-react"
import { siApple, siBytedance, siHitachi, siIeee, siReact, siToptal } from "simple-icons"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { BrandIcon, ctaPrimary, ctaSecondary } from "./ui-bits"

/* Inline glyph tile inside the headline (heroui.com .hero-slot: 0.72em tile, ±8deg, click cycles). */
type Glyph = { label: string; className: string; node: React.ReactNode }
const glyphsA: Glyph[] = [
  { label: "React", className: "text-primary", node: <BrandIcon path={siReact.path} title="React" className="size-full" /> },
  { label: "Palette", className: "text-warning", node: <PaletteIcon className="size-full" strokeWidth={2.4} /> },
  { label: "Sparkles", className: "text-primary", node: <SparklesIcon className="size-full" strokeWidth={2.4} /> },
]
const glyphsB: Glyph[] = [
  { label: "Sliders", className: "text-success", node: <SlidersVerticalIcon className="size-full" strokeWidth={2.6} /> },
  { label: "Grid", className: "text-primary", node: <Grid2x2Icon className="size-full" strokeWidth={2.4} /> },
]

function Slot({ glyphs, rotate }: { glyphs: Glyph[]; rotate: number }) {
  const [i, setI] = React.useState(0)
  const g = glyphs[i % glyphs.length]
  return (
    <span className="relative inline-block h-[0.72em] px-[0.36em] align-middle">
      <button
        type="button"
        aria-label={`Change glyph (${g.label})`}
        onClick={() => setI((n) => n + 1)}
        style={{ rotate: `${rotate}deg` }}
        className={cn(
          "absolute top-0 left-1/2 -ml-[0.36em] size-[0.72em] cursor-pointer rounded-[28%] transition-transform duration-300 hover:scale-110",
          g.className
        )}
      >
        {g.node}
      </button>
    </span>
  )
}

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center">
      <div className="site-container flex flex-col items-center pt-14 text-center sm:pt-28">
        <h1 className="display-hero">
          <span className="sr-only">Never start from scratch again.</span>
          <span aria-hidden className="block whitespace-nowrap">
            Never start{" "}
            <Slot glyphs={glyphsA} rotate={-8} />
            {" "}from
          </span>
          <span aria-hidden className="block whitespace-nowrap text-muted-foreground/70">
            scratch{" "}
            <Slot glyphs={glyphsB} rotate={8} />
            {" "}again.
          </span>
        </h1>
        <p className="lead mt-4 max-w-2xl max-sm:text-[17px] max-sm:leading-[26px]">
          Free components, premium templates, and AI agents that work inside your product.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-sm:mt-7 max-sm:w-full max-sm:flex-col max-sm:gap-2.5">
          <Button className={ctaPrimary}>Browse components</Button>
          <Button variant="tertiary" className={ctaSecondary}>
            Explore HeroUI Pro
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}

/* Trusted-by: 6 slots that cycle through the customer list (heroui.com swaps logos in a 6-col grid).
   Brands available in simple-icons render as SVG marks; the rest render as styled text wordmarks. */
type Logo = { name: string; path?: string; style?: string }
const logos: Logo[] = [
  { name: "Apple", path: siApple.path },
  { name: "Unisys", style: "font-bold tracking-tight lowercase text-[22px]" },
  { name: "Hitachi", path: siHitachi.path },
  { name: "BC Ferries", style: "font-black italic tracking-tighter text-[19px]" },
  { name: "Mater Private", style: "font-medium text-[11px] leading-[11px] w-16 text-left" },
  { name: "NMI", style: "font-black tracking-tight lowercase text-[22px]" },
  { name: "Aisera", style: "font-semibold tracking-tight text-[20px]" },
  { name: "Winningtemp", style: "font-semibold tracking-tight text-[18px]" },
  { name: "MrBeast", style: "font-black uppercase italic tracking-tight text-[19px]" },
  { name: "Mysten Labs", style: "font-semibold text-[17px]" },
  { name: "Yazen", style: "font-bold lowercase text-[22px]" },
  { name: "Expatrio", style: "font-semibold tracking-tight text-[19px]" },
  { name: "Higgsfield AI", style: "font-bold uppercase tracking-wider text-[14px]" },
  { name: "Bland AI", style: "font-semibold lowercase text-[20px]" },
  { name: "Nixtla", style: "font-bold tracking-tight text-[20px]" },
  { name: "National Australia Bank", style: "font-black uppercase tracking-tight text-[20px]", },
  { name: "Recare", style: "font-semibold lowercase text-[21px]" },
  { name: "Toptal", path: siToptal.path },
  { name: "ByteDance", path: siBytedance.path },
  { name: "FlutterFlow", style: "font-semibold tracking-tight text-[18px]" },
  { name: "Euronet", style: "font-bold italic tracking-tight text-[19px]" },
  { name: "GetResponse", style: "font-semibold tracking-tight text-[17px]" },
  { name: "Tidio", style: "font-bold lowercase text-[22px]" },
  { name: "Happy Scribe", style: "font-semibold text-[17px]" },
  { name: "InBody", style: "font-black italic text-[20px]" },
  { name: "Breezy HR", style: "font-bold lowercase text-[19px]" },
  { name: "UC Berkeley", style: "font-serif font-semibold text-[18px]" },
  { name: "University of Waterloo", style: "font-serif font-semibold text-[13px] leading-[14px] w-24" },
  { name: "Chalmers University of Technology", style: "font-serif font-semibold text-[12px] leading-[13px] w-28" },
  { name: "IEEE", path: siIeee.path },
]

function LogoMark({ logo }: { logo: Logo }) {
  if (logo.path && (logo.name === "Hitachi" || logo.name === "IEEE")) {
    // simple-icons marks for these two are wordmarks: render wide, no extra text
    return <BrandIcon path={logo.path} title={logo.name} className="h-16 w-24" />
  }
  if (logo.path) {
    return logo.name === "Apple" ? (
      <BrandIcon path={logo.path} title={logo.name} className="size-7" />
    ) : (
      <span className="flex items-center gap-2">
        <BrandIcon path={logo.path} title={logo.name} className="size-7" />
        <span className="font-semibold text-[17px] tracking-tight">{logo.name}</span>
      </span>
    )
  }
  return (
    <span aria-label={logo.name} className={cn("whitespace-normal text-center", logo.name === "NMI" && "", logo.style)}>
      {logo.name === "NMI" ? "nmi" : logo.name}
    </span>
  )
}

export function TrustedBy() {
  const [tick, setTick] = React.useState(0)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setTick((n) => n + 1), 3200)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="site-container mt-[72px] sm:mt-[120px]">
      <h2 className="text-center font-medium text-muted-foreground text-sm">Trusted by teams and builders at</h2>
      <ul className="sr-only">
        {logos.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <div aria-hidden className="mt-5 grid grid-cols-3 items-center gap-y-2 sm:mt-7 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, slot) => {
          // stagger: each slot advances one step later than the previous one
          const idx = (slot + 6 * Math.floor((tick + slot) / 6)) % logos.length
          return (
            <div key={slot} className="relative flex h-12 w-full items-center justify-center text-muted-foreground/80">
              <span key={idx} className="flex scale-[0.8] items-center justify-center animate-in fade-in slide-in-from-bottom-2 duration-500 sm:scale-95">
                <LogoMark logo={logos[idx]} />
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
