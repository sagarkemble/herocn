"use client"

import * as React from "react"
import { ArrowRightIcon, XIcon } from "lucide-react"
import { siAirbnb, siApple, siBytedance, siFlutter, siHitachi, siIeee, siNubank, siStripe, siToptal, siUber } from "simple-icons"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BrandIcon, ctaPrimary, ctaSecondary } from "./ui-bits"

/* Inline glyph slot inside the headline. Technique matches heroui.com's .hero-slot (0.72em tile, white-outlined
   gradient "sticker" glyphs, blur/scale cross-fade between layers, -8/+8deg rotation); the glyph drawings are our own. */
type Glyph = { label: string; fill: string; draw: (paint: string) => React.ReactNode }
const strokeOnly = (paint: string, d: React.ReactNode) => (
  <>
    <g stroke="#fff" strokeWidth={4.6} fill="none">{d}</g>
    <g stroke={paint} strokeWidth={1.8} fill="none">{d}</g>
  </>
)
const filled = (paint: string, d: React.ReactNode) => (
  <g fill={paint} stroke="#fff" strokeWidth={1.6} paintOrder="stroke">{d}</g>
)
const glyphsA: Glyph[] = [
  {
    label: "Atom",
    fill: "#0485f7",
    draw: (p) => (
      <>
        {strokeOnly(p, [0, 60, 120].map((r) => <ellipse key={r} cx="12" cy="12" rx="9" ry="3.6" transform={`rotate(${r} 12 12)`} />))}
        <circle cx="12" cy="12" r="2.4" fill={p} stroke="#fff" strokeWidth={1.2} />
      </>
    ),
  },
  {
    label: "Robot",
    fill: "#0485f7",
    draw: (p) =>
      filled(
        p,
        <>
          <rect x="2.5" y="6" width="19" height="15" rx="5" />
          <circle cx="12" cy="3.2" r="1.8" />
          <circle cx="8.8" cy="13.5" r="1.7" fill="#fff" stroke="none" />
          <circle cx="15.2" cy="13.5" r="1.7" fill="#fff" stroke="none" />
        </>
      ),
  },
  {
    label: "Code",
    fill: "#0485f7",
    draw: (p) => strokeOnly(p, <path d="M8.5 6.5 3 12l5.5 5.5M15.5 6.5 21 12l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />),
  },
  {
    label: "Terminal",
    fill: "#18181b",
    draw: (p) =>
      filled(
        p,
        <>
          <rect x="2.5" y="4" width="19" height="16" rx="4.5" />
          <path d="m7 9.5 3 2.5-3 2.5M12.5 15h4.5" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
  },
]
const glyphsB: Glyph[] = [
  {
    label: "Sparkle",
    fill: "#7828c8",
    draw: (p) =>
      filled(
        p,
        <>
          <path d="M10 3.5Q11.4 10.6 18.5 12 11.4 13.4 10 20.5 8.6 13.4 1.5 12 8.6 10.6 10 3.5Z" strokeLinejoin="round" />
          <path d="M18.5 2.5Q19 5 21.5 5.5 19 6 18.5 8.5 18 6 15.5 5.5 18 5 18.5 2.5Z" strokeLinejoin="round" />
        </>
      ),
  },
  {
    label: "Chat",
    fill: "#7828c8",
    draw: (p) => filled(p, <path d="M5.5 4h13A3.5 3.5 0 0 1 22 7.5v7a3.5 3.5 0 0 1-3.5 3.5H11l-4.5 3.2V18h-1A3.5 3.5 0 0 1 2 14.5v-7A3.5 3.5 0 0 1 5.5 4Z" strokeLinejoin="round" />),
  },
  {
    label: "Layers",
    fill: "#7828c8",
    draw: (p) =>
      filled(
        p,
        <>
          <path d="m12 12.5 9 4.5-9 4.5-9-4.5Z" strokeLinejoin="round" opacity={0.7} />
          <path d="m12 2.5 9 4.5-9 4.5L3 7Z" strokeLinejoin="round" />
        </>
      ),
  },
  {
    label: "Wand",
    fill: "#17c964",
    draw: (p) =>
      filled(
        p,
        <>
          <rect x="9.6" y="1.8" width="4.8" height="20.4" rx="2.4" transform="rotate(45 12 12)" />
          <circle cx="5" cy="5" r="1.6" />
          <circle cx="19.5" cy="17" r="1.3" />
        </>
      ),
  },
]

function GlyphSvg({ g, id }: { g: Glyph; id: string }) {
  const grad = `url(#${id})`
  return (
    <svg viewBox="0 0 24 24" className="hero-slot__icon size-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`color-mix(in oklab, ${g.fill} 80%, white)`} />
          <stop offset="1" stopColor={g.fill} />
        </linearGradient>
      </defs>
      {g.draw(grad)}
    </svg>
  )
}

function Slot({ glyphs, rotate, delay, slotId }: { glyphs: Glyph[]; rotate: number; delay: number; slotId: string }) {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let t: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      t = setInterval(() => setI((n) => n + 1), 2600)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(t)
    }
  }, [delay])
  const active = i % glyphs.length
  return (
    <span className="hero-slot">
      <button
        type="button"
        aria-label={`Change glyph (${glyphs[active].label})`}
        onClick={() => setI((n) => n + 1)}
        style={{ ["--glyph-rotation" as string]: `${rotate}deg`, animationDelay: `${delay}ms` }}
        className="hero-slot__tile cursor-pointer"
      >
        {glyphs.map((g, k) => (
          <span key={g.label} className="hero-slot__layer" data-active={k === active}>
            <GlyphSvg g={g} id={`${slotId}-${k}`} />
          </span>
        ))}
      </button>
    </span>
  )
}

/* Floating promo card (heroui.com shows a dismissible "Build faster with HeroUI Pro" card bottom-left). */
export function ProPromo() {
  const [open, setOpen] = React.useState(true)
  if (!open) return null
  return (
    <Card className="fixed start-6 bottom-6 z-50 w-[288px] gap-0 overflow-hidden p-0">
      <div className="relative flex h-[170px] flex-col items-center justify-center gap-2 bg-linear-to-br from-[#d9f3ff] via-[#cfe4ff] to-[#c9d0ff]">
        <div aria-hidden className="absolute -top-10 right-0 size-40 rounded-full bg-[#7dd3fc]/50 blur-3xl" />
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setOpen(false)}
          className="absolute top-2.5 right-2.5 grid size-6 place-items-center rounded-full text-white/90 hover:bg-white/20"
        >
          <XIcon className="size-4" />
        </button>
        <span className="relative flex items-center gap-2.5 font-display font-semibold text-[44px] text-primary leading-none tracking-[-0.04em]">
          <span aria-hidden className="flex h-[0.85em] w-[0.7em] items-end gap-[0.12em] opacity-80">
            <span className="h-full w-[0.24em] rounded-[0.08em] bg-current" />
            <span className="h-3/4 w-[0.24em] rounded-[0.08em] bg-current" />
          </span>
          Pro
        </span>
        <span className="relative font-medium text-[#3b5b8c] text-sm">Now available</span>
      </div>
      <CardContent className="flex flex-col gap-2 px-4 pt-4 pb-4">
        <p className="font-medium text-base">Build faster with HeroUI Pro</p>
        <p className="text-muted-foreground text-sm leading-6">
          Components, templates, and AI tooling for React and React Native. Made for teams that care about the details.
        </p>
        <div className="mt-2 flex gap-2">
          <Button variant="outline" className="flex-none" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button className={cn(ctaPrimary, "flex-1")}>Explore Pro</Button>
        </div>
      </CardContent>
    </Card>
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
            <Slot glyphs={glyphsA} rotate={-8} delay={1200} slotId="ga" />
            {" "}from
          </span>
          <span aria-hidden className="block whitespace-nowrap text-muted-foreground/70">
            scratch{" "}
            <Slot glyphs={glyphsB} rotate={8} delay={1250} slotId="gb" />
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
type Logo = { name: string; path?: string; label?: string; wide?: boolean; style?: string }
const logos: Logo[] = [
  { name: "Apple", path: siApple.path },
  { name: "Unisys", label: "unisys", style: "font-bold tracking-[0.18em] lowercase text-[15px]" },
  { name: "Hitachi", path: siHitachi.path, wide: true },
  { name: "BC Ferries", style: "font-black italic tracking-tight text-[17px]" },
  { name: "Mater Private", style: "font-medium tracking-tight text-[13px]" },
  { name: "NMI", label: "nmi", style: "font-black tracking-tight lowercase text-[22px]" },
  { name: "Airbnb", path: siAirbnb.path },
  { name: "Stripe", path: siStripe.path },
  { name: "Winningtemp", style: "font-semibold tracking-tight text-[16px]" },
  { name: "MrBeast", label: "MRBEAST", style: "font-black italic tracking-tight text-[16px]" },
  { name: "Uber", path: siUber.path },
  { name: "Yazen", style: "font-bold lowercase text-[20px]" },
  { name: "Nubank", path: siNubank.path },
  { name: "Higgsfield AI", style: "font-bold uppercase tracking-[0.14em] text-[12px]" },
  { name: "Nixtla", style: "font-bold tracking-[0.2em] uppercase text-[14px]" },
  { name: "National Australia Bank", label: "NAB", style: "font-black tracking-[0.22em] text-[18px]" },
  { name: "Toptal", path: siToptal.path },
  { name: "ByteDance", path: siBytedance.path },
  { name: "FlutterFlow", path: siFlutter.path },
  { name: "Euronet", style: "font-bold italic tracking-tight text-[17px]" },
  { name: "GetResponse", style: "font-semibold tracking-tight text-[15px]" },
  { name: "Tidio", style: "font-bold lowercase text-[20px]" },
  { name: "InBody", style: "font-black italic text-[18px]" },
  { name: "Breezy HR", style: "font-bold lowercase text-[17px]" },
  { name: "UC Berkeley", style: "font-serif font-semibold text-[16px]" },
  { name: "IEEE", path: siIeee.path, wide: true },
]

function LogoMark({ logo }: { logo: Logo }) {
  if (logo.path && logo.wide) {
    return <BrandIcon path={logo.path} title={logo.name} className="h-8 w-24" />
  }
  if (logo.path && (logo.name === "Apple" || logo.name === "Airbnb" || logo.name === "Uber" || logo.name === "Nubank")) {
    return <BrandIcon path={logo.path} title={logo.name} className="size-7" />
  }
  if (logo.path) {
    return (
      <span className="flex items-center gap-2 whitespace-nowrap">
        <BrandIcon path={logo.path} title={logo.name} className="size-6" />
        <span className="font-semibold text-[16px] tracking-tight">{logo.name}</span>
      </span>
    )
  }
  return (
    <span aria-label={logo.name} className={cn("whitespace-nowrap text-center", logo.style)}>
      {logo.label ?? logo.name}
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
