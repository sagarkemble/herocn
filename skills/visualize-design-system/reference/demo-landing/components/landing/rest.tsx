"use client"

import * as React from "react"
import { ArrowUpRightIcon, CodeXmlIcon, SquareTerminalIcon } from "lucide-react"
import { Area, AreaChart, XAxis } from "recharts"
import { siClaude, siCursor, siDiscord, siGithub, siModelcontextprotocol, siNpm, siX, siYcombinator } from "simple-icons"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThemeSegment, Wordmark } from "./header"
import { testimonials } from "./testimonials-data"
import { BrandIcon, SectionHeader, TextLink, ctaPrimary, ctaSecondary } from "./ui-bits"

/* ---------------- AI tooling: node diagram (positions from heroui.com's 1152×500 canvas) ---------------- */
const tools = [
  { x: 728.3, y: 41.3, label: "Claude", node: <BrandIcon path={siClaude.path} title="Claude" className="size-9" /> },
  { x: 771.5, y: 149.3, label: "Cursor", node: <BrandIcon path={siCursor.path} title="Cursor" className="size-9" /> },
  // VS Code mark is not in simple-icons; lucide code glyph stands in.
  { x: 771.5, y: 257.3, label: "VS Code", node: <CodeXmlIcon className="size-9" strokeWidth={2.2} aria-label="VS Code" /> },
  // 4th tool on heroui.com is an image we could not identify: NOT FOUND, generic terminal glyph.
  { x: 728.3, y: 365.3, label: "Coding agent", node: <SquareTerminalIcon className="size-9" strokeWidth={2.2} aria-label="Coding agent" /> },
]
const T = 84.6
const MCP = { x: 512.3, y: 203.3 }
const APP = { x: 295.4, y: 188, s: 115.2 }

export function AiTooling() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / 900)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const mcpOut = { x: MCP.x + T, y: MCP.y + T / 2 }
  return (
    <section id="ai" className="site-container section-gap scroll-mt-24">
      <SectionHeader
        align="center"
        eyebrow="AI tooling"
        title="Supercharge your"
        muted="AI workflow."
        description="Build faster with our Skills and MCPs. Give your agents taste and build beautiful interfaces by default."
      />
      <div ref={ref} className="relative mt-6 h-[404px] overflow-hidden bg-background sm:mt-12 sm:h-[500px] sm:rounded-[32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--foreground)_16%,transparent)_1.1px,transparent_1.4px)] bg-[length:15px_15px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_0%,color-mix(in_oklab,var(--background)_55%,transparent)_55%,var(--background)_100%)] sm:bg-[radial-gradient(ellipse_46%_52%_at_50%_50%,transparent_0%,color-mix(in_oklab,var(--background)_55%,transparent)_55%,var(--background)_100%)]" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[1152px]" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <svg className="absolute inset-0 size-full text-border" viewBox="0 0 1152 500" aria-hidden>
            <path d={`M${APP.x + APP.s},${APP.y + APP.s / 2} L${MCP.x},${MCP.y + T / 2}`} stroke="currentColor" strokeWidth="2" fill="none" />
            {tools.map((t) => {
              const end = { x: t.x, y: t.y + T / 2 }
              const d = `M${mcpOut.x},${mcpOut.y} C${mcpOut.x + 80},${mcpOut.y} ${end.x - 90},${end.y} ${end.x},${end.y}`
              return (
                <g key={t.label}>
                  <path d={d} stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d={d} className="text-primary" stroke="currentColor" strokeWidth="2.5" fill="none" strokeDasharray="18 400" strokeLinecap="round">
                    <animate attributeName="stroke-dashoffset" from="0" to="-418" dur="2.4s" repeatCount="indefinite" />
                  </path>
                </g>
              )
            })}
          </svg>
          {tools.map((t) => (
            <span
              key={t.label}
              title={t.label}
              className="absolute flex items-center justify-center rounded-[21px] border border-border bg-default"
              style={{ left: t.x, top: t.y, width: T, height: T }}
            >
              {t.node}
            </span>
          ))}
          <span className="absolute flex items-center justify-center rounded-[21px] border border-border bg-default" style={{ left: MCP.x, top: MCP.y, width: T, height: T }}>
            <BrandIcon path={siModelcontextprotocol.path} title="Model Context Protocol" className="size-[54px]" />
          </span>
          {/* app tile: token gradient + text-mark (no logo artwork copied) */}
          <span
            className="absolute overflow-hidden rounded-[34px] bg-surface p-2 shadow-[0_10px_30px_rgb(24_24_27/6%),0_1px_2px_rgb(24_24_27/4%)]"
            style={{ left: APP.x, top: APP.y, width: APP.s, height: APP.s }}
          >
            <span className="flex size-full items-center justify-center rounded-[28px] bg-linear-to-b from-primary/80 to-primary">
              <span aria-hidden className="flex h-11 w-9 items-end gap-[6px]">
                <span className="h-full w-[12px] rounded-[4px] bg-primary-foreground" />
                <span className="h-3/4 w-[12px] rounded-[4px] bg-primary-foreground" />
              </span>
            </span>
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 max-sm:flex-nowrap max-sm:gap-2.5 sm:mt-16">
        <Button className={cn(ctaPrimary, "max-sm:flex-1")}>Connect MCP</Button>
        <Button variant="tertiary" className={cn(ctaSecondary, "max-sm:flex-1")}>Install skills</Button>
      </div>
    </section>
  )
}

/* ---------------- Community ---------------- */
// Brand-coloured icons as on heroui.com; colours come from simple-icons' official hex values (explicit colours).
const stats = [
  { icon: siGithub, color: undefined, v: "38.3k+", t: "GitHub stars, combined", d: "Across HeroUI, HeroUI Native, and Tailwind Variants." },
  { icon: siYcombinator, color: `#${siYcombinator.hex}`, v: "YC", t: "Backed by Y Combinator", d: "A focused team building the UI ecosystem for your next product." },
  { icon: siDiscord, color: `#${siDiscord.hex}`, v: "10k+", t: "Discord members", d: "Get help, share what you ship, and shape what comes next." },
]
// heroui.com: "Illustrative growth curve" — shape only, no recorded values are shown here.
const curve = [1, 1, 1.1, 1.2, 1.2, 1.4, 1.3, 1.6, 1.5, 2, 2.6, 2.3, 3.4, 4.4, 3.9, 5.6, 7.3, 6.6, 8.8, 9.6, 12.5, 14.2, 13, 17.5, 21, 19, 25.5, 30, 33].map((v, i) => ({ i: String(i), v }))
const curveConfig = { v: { label: "Downloads", color: "var(--muted-foreground)" } } satisfies ChartConfig
// end-point dot on the last sample (primary token)
function EndDot(props: { cx?: number; cy?: number; index?: number }) {
  if (props.index !== curve.length - 1 || props.cx == null || props.cy == null) return null
  return <circle cx={props.cx - 3} cy={props.cy} r={4} fill="var(--primary)" />
}

export function Community() {
  return (
    <section id="community" className="section-gap scroll-mt-24">
      <div className="site-container">
        <SectionHeader eyebrow="Community" title="Built in the open." muted="Shaped by the community." />
      </div>
      <ul className="site-container mt-8 grid grid-cols-1 sm:mt-16 md:grid-cols-3">
        {stats.map((s) => (
          <li key={s.t} className="border-border border-t first:border-t-0 max-sm:last:border-b md:border-t-0 md:border-l md:px-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
            <a href="#" className="flex h-full flex-col items-start py-6 sm:py-8 md:py-0 max-sm:[li:first-child>&]:pt-0">
              <span style={s.color ? { color: s.color } : undefined}>
                <BrandIcon path={s.icon.path} title={s.icon.title} className="size-7" />
              </span>
              <span className="mt-5 font-display font-medium text-[52px] tabular-nums leading-[54px] tracking-[-0.04em] sm:mt-6 sm:text-6xl sm:leading-none">{s.v}</span>
              <h3 className="mt-3 font-medium text-base">{s.t}</h3>
              <p className="mt-1.5 text-muted-foreground text-sm leading-[22px] sm:mt-3 sm:max-w-[300px] sm:leading-relaxed">{s.d}</p>
            </a>
          </li>
        ))}
      </ul>
      <figure className="relative isolate mt-8 h-[420px] sm:mt-20 sm:h-[400px]">
        <figcaption className="site-container pointer-events-none relative z-10 flex flex-col items-start gap-6 pt-2 sm:gap-8 sm:pt-6">
          <span style={{ color: `#${siNpm.hex}` }}>
            <BrandIcon path={siNpm.path} title="npm" className="size-6" />
          </span>
          <div>
            <h3 className="font-medium text-base">A growing developer community.</h3>
            <p className="mt-1.5 text-muted-foreground text-sm sm:mt-2 sm:max-w-md">Monthly npm downloads across our open source projects.</p>
          </div>
          <div>
            <p className="font-display font-medium text-[52px] tabular-nums leading-[54px] tracking-[-0.04em] sm:text-6xl sm:leading-none">33.3M+</p>
            <p className="mt-1.5 text-muted-foreground text-sm sm:mt-2">Monthly downloads, combined</p>
          </div>
          <p className="sr-only">Illustrative growth curve.</p>
        </figcaption>
        <ChartContainer config={curveConfig} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 aspect-auto h-[200px] w-full sm:h-[400px]">
          <AreaChart data={curve} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="npm" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="i" hide />
            <Area isAnimationActive={false} dataKey="v" type="natural" stroke="var(--color-v)" strokeOpacity={0.45} strokeWidth={1.5} fill="url(#npm)" dot={<EndDot />} activeDot={false} />
          </AreaChart>
        </ChartContainer>
      </figure>
    </section>
  )
}

/* ---------------- Testimonials: vertical marquee columns with fade mask ---------------- */
function Quote({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <blockquote className="text-pretty text-[15px] text-muted-foreground leading-6">
      {parts.map((p, i) => (i % 2 ? <strong key={i} className="font-medium text-foreground">{p}</strong> : p))}
    </blockquote>
  )
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  const initials = t.n.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || t.n[0]
  return (
    <a href="#" className="block rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-0.5">
      <Card className="gap-6 sm:gap-7">
        <Quote text={t.q} />
        <figcaption className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback className="text-muted-foreground text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 text-sm leading-5">
            <span className="block truncate font-medium">{t.n}</span>
            <span className="block truncate text-muted-foreground">{t.r}</span>
          </span>
          {t.x ? <BrandIcon path={siX.path} title="X" className="size-3.5 text-muted-foreground" /> : <ArrowUpRightIcon className="size-4 text-muted-foreground" />}
        </figcaption>
      </Card>
    </a>
  )
}

export function Testimonials() {
  const cols = [0, 1, 2].map((c) => testimonials.filter((_, i) => i % 3 === c))
  return (
    <section id="testimonials" className="mt-[72px] scroll-mt-24 sm:mt-24">
      <div className="site-container">
        <SectionHeader align="center" eyebrow="Testimonials" title="In their words." description="From the people building with HeroUI." />
      </div>
      <div className="mx-auto mt-7 w-full max-w-[1200px] px-5 sm:mt-12 sm:px-6">
        <div className="grid h-[620px] grid-cols-1 items-start gap-5 overflow-hidden [mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)] sm:h-[600px] md:grid-cols-2 lg:grid-cols-3">
          {cols.map((col, c) => (
            <div key={c} className={cn("marquee-y", c === 1 && "max-md:hidden [animation-duration:110s]", c === 2 && "max-lg:hidden [animation-duration:100s]")}>
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="grid gap-5 pb-5">
                  {col.map((t, i) => (
                    <li key={i}>
                      <TestimonialCard t={t} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Blog: illustrated covers built from components ---------------- */
function CoverNative() {
  return (
    <div className="flex h-full items-end justify-center gap-3 pt-5">
      {[false, true].map((dark) => (
        <div key={String(dark)} className={cn("flex h-[88%] w-[34%] flex-col gap-1.5 rounded-t-[22px] border-4 border-b-0 border-foreground/90 p-2", dark ? "dark bg-background text-foreground" : "bg-surface")}>
          <span className="mx-auto h-2 w-8 rounded-full bg-foreground/90" />
          <div className="flex gap-1">
            <span className="h-6 flex-1 rounded-lg bg-default" />
            <span className="h-6 flex-1 rounded-lg bg-primary-soft" />
          </div>
          {["Wi-Fi", "Bluetooth", "Notifications"].map((l, i) => (
            <div key={l} className="flex items-center justify-between rounded-md bg-default/60 px-1.5 py-1 text-[7px]">
              {l}
              <Switch size="sm" defaultChecked={i !== 1} className="scale-[0.6]" aria-label={l} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
function CoverWhy() {
  return (
    <div className="flex h-full items-center justify-between gap-3 p-5">
      <div className="flex flex-col gap-1">
        <Wordmark className="pointer-events-none text-2xl" />
        <p className="font-medium text-[11px]">Never start from scratch again.</p>
      </div>
      <div className="flex w-[45%] flex-col gap-1.5">
        <div className="flex gap-1">
          {["bg-primary", "bg-success", "bg-warning", "bg-destructive"].map((c) => (
            <span key={c} className={cn("size-4 rounded-md", c)} />
          ))}
        </div>
        <Card size="sm" className="gap-1 px-2 py-2 text-[8px]">
          <span className="font-medium">Your email</span>
          <span className="rounded-md bg-default px-1.5 py-1 text-muted-foreground">you@heroui.dev</span>
        </Card>
        <div className="flex gap-1">
          <Badge size="sm" variant="success">Active</Badge>
          <Badge size="sm" variant="primary">New</Badge>
        </div>
      </div>
    </div>
  )
}
function CoverLibraries() {
  return (
    <div className="grid h-full grid-cols-3 gap-1.5 p-4 opacity-90">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i} size="sm" className="gap-1 px-1.5 py-1.5">
          <span className={cn("h-1.5 w-2/3 rounded-full", i % 3 === 0 ? "bg-primary" : "bg-default")} />
          <span className="h-1.5 w-1/2 rounded-full bg-default" />
          {i % 2 === 0 && <span className="mt-0.5 h-3 rounded-md bg-primary-soft" />}
        </Card>
      ))}
    </div>
  )
}
const posts = [
  { t: "How Styling and Theming Work in HeroUI Native", d: "Jul 31, 2026", cover: <CoverNative /> },
  { t: "Why Choose HeroUI for Your Design System", d: "May 17, 2026", cover: <CoverWhy /> },
  { t: "12 Best React UI Component Libraries in 2026", d: "May 16, 2026", cover: <CoverLibraries /> },
]

export function Blog() {
  return (
    <section id="blog" className="site-container mt-[72px] scroll-mt-24 sm:mt-28">
      <SectionHeader
        eyebrow="Blog"
        title="From the blog."
        muted="Guides and updates."
        aside={<TextLink className="text-[15px] max-sm:mt-3 max-sm:self-start md:pb-1.5">All posts</TextLink>}
      />
      <ul className="mt-7 flex gap-3 max-sm:-mx-5 max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-5 max-sm:[scrollbar-width:none] sm:mt-12 sm:grid sm:grid-cols-1 sm:gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <li key={p.t} className="max-sm:w-[280px] max-sm:shrink-0 max-sm:snap-start">
            <div className="group relative block h-full rounded-3xl bg-surface p-1 shadow-sm">
              <div inert aria-hidden className="relative block aspect-[360/203] overflow-hidden rounded-[20px] bg-background">
                <div className="pointer-events-none block size-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">{p.cover}</div>
              </div>
              <div className="block px-3.5 pt-4 pb-[18px] sm:px-4">
                <h3 className="block text-pretty font-medium text-base leading-[22px] sm:text-sm sm:leading-5">
                  <a href="#" className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring">{p.t}</a>
                </h3>
                <p className="mt-2 block text-muted-foreground text-xs">{p.d}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- Final CTA ---------------- */
export function FinalCta() {
  return (
    <section className="site-container section-gap flex flex-col items-center text-center max-sm:pt-6">
      <h2 className="display-closing max-sm:leading-[44px]">
        <span className="block">Ready for you</span>
        <span className="block text-muted-foreground/70">and your agents.</span>
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-sm:w-full max-sm:flex-col max-sm:gap-2.5 sm:mt-10">
        <Button className={ctaPrimary}>Browse components</Button>
        <Button variant="tertiary" className={ctaSecondary}>Get HeroUI Pro</Button>
        <Button variant="tertiary" className={ctaSecondary}>Request Agents access</Button>
        <Button variant="tertiary" className={ctaSecondary}>Request HeroSpace access</Button>
      </div>
      <ul className="mt-10 flex items-start justify-center gap-8 sm:mt-16">
        {[
          { l: "GDPR", sub: "EU" },
          { l: "SOC 2", sub: "Type II" },
        ].map((c) => (
          <li key={c.l}>
            <a href="#" className="flex flex-col items-center gap-2 text-muted-foreground text-xs transition-colors hover:text-foreground">
              {/* certification seal drawn with tokens (no badge artwork copied) */}
              <svg viewBox="0 0 60 60" className="size-14" aria-hidden>
                <circle cx="30" cy="30" r="29" fill="var(--surface)" stroke="var(--border)" />
                {c.l === "GDPR" ? (
                  <>
                    {Array.from({ length: 12 }).map((_, k) => {
                      const a = (k / 12) * Math.PI * 2
                      return <circle key={k} cx={(30 + Math.sin(a) * 17).toFixed(2)} cy={(30 - Math.cos(a) * 17).toFixed(2)} r="1.3" fill="currentColor" />
                    })}
                    <text x="30" y="32.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="currentColor">GDPR</text>
                  </>
                ) : (
                  <>
                    <text x="30" y="22" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">AICPA</text>
                    <text x="30" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">SOC 2</text>
                    <text x="30" y="41" textAnchor="middle" fontSize="6" fill="currentColor">Type II</text>
                  </>
                )}
              </svg>
              <span className="sr-only">{c.l === "SOC 2" ? "SOC 2 Type II" : c.l}</span>
              In progress
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- Footer ---------------- */
const footer: Record<string, string[]> = {
  "HeroUI React": ["Quick start", "Components", "Theming", "Styling", "Design principles", "Migration guide", "Releases", "Showcase", "Roadmap", "GitHub"],
  "HeroUI Native": ["Quick start", "Components", "Theming", "Styling", "Animation", "Design principles", "Releases", "Roadmap", "Demo app for iOS", "GitHub"],
  "HeroUI Pro": ["Components", "Templates", "Native components", "Native templates", "Design Systems", "Theming", "Figma", "Pricing", "Licensing", "Documentation"],
  "HeroUI Agents": ["Documentation", "Installation", "Quickstart", "Generative UI", "Client tools", "Knowledge base", "API reference", "Examples", "Live demos", "Request access"],
  "For coding agents": ["React MCP", "Native MCP", "Pro React MCP", "Pro Native MCP", "Agents MCP", "Agent skills", "Design Taste", "llms.txt", "AGENTS.md", "CLI"],
  Company: ["About", "Blog", "Enterprise", "Contact", "Discord", "Privacy", "Terms", "License"],
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-5 max-sm:pb-10 sm:gap-6 sm:px-6">
      {/* mobile: one accordion per group, first open (heroui.com: nav.mt-14 border-t sm:hidden) */}
      <nav aria-label="Ecosystem directory" className="mt-14 w-full border-border border-y sm:hidden">
        <Accordion defaultValue={["HeroUI React"]}>
          {Object.entries(footer).map(([h, links]) => (
            <AccordionItem key={h} value={h}>
              <AccordionTrigger className="px-0 py-[18px] text-[15px] hover:bg-transparent">{h}</AccordionTrigger>
              <AccordionContent className="px-0">
                <ul className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-y-3 pb-1 text-sm leading-5">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-muted-foreground no-underline! transition-colors hover:text-foreground">{l}</a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
      <nav aria-label="Ecosystem directory" className="mt-24 w-full border-border border-t pt-12 max-sm:hidden">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(footer).map(([h, links]) => (
            <li key={h}>
              <a href="#" className="font-medium text-foreground text-xs transition-colors hover:text-primary">{h}</a>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="font-normal text-muted-foreground text-xs transition-colors hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Social" className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-10">
        {[siGithub, siDiscord, siX].map((s) => (
          <a key={s.slug} href="#" aria-label={s.title} className="text-muted-foreground transition-colors hover:text-foreground">
            <BrandIcon path={s.path} title={s.title} className="size-4" />
          </a>
        ))}
      </nav>
      <p className="text-center font-normal text-[13px] text-muted-foreground leading-[18px] sm:text-xs sm:leading-[1.34]">© 2026 NextUI Inc. All rights reserved.</p>
      <ThemeSegment />
    </footer>
  )
}

/** Oversized dashed wordmark sits after the footer on heroui.com (sibling, not inside <footer>). */
export function FooterMark() {
  return (
    <div aria-hidden className="mx-auto mt-4 h-[200px] w-full max-w-5xl overflow-hidden max-md:h-[120px] max-sm:hidden">
      <svg viewBox="0 0 1000 400" className="w-full select-none text-foreground/15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="6 5">
        <rect x="4" y="4" width="92" height="396" rx="28" />
        <rect x="112" y="84" width="92" height="316" rx="28" />
        <text x="232" y="350" fontSize="420" fontWeight="600" letterSpacing="-22" style={{ fontFamily: "var(--font-display)" }}>hero</text>
      </svg>
    </div>
  )
}
