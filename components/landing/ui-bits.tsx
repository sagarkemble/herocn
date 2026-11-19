import * as React from "react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "cn"

/** heroui.com marketing CTA classes (page-level, keeps the skill's --primary blue untouched). */
export const ctaPrimary =
  "bg-foreground text-background hover:bg-foreground/85 active:bg-foreground/80 aria-expanded:bg-foreground/80 max-sm:w-full"
export const ctaSecondary = "max-sm:w-full"

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("site-container section-gap scroll-mt-24", className)}>
      {children}
    </section>
  )
}

/** heroui.com section header: eyebrow + two-tone display-statement, description on the right. */
export function SectionHeader({
  eyebrow,
  eyebrowTone = "accent",
  title,
  muted,
  description,
  align = "split",
  descriptionClassName,
  aside,
}: {
  eyebrow: React.ReactNode
  eyebrowTone?: "accent" | "foreground"
  title: React.ReactNode
  muted?: React.ReactNode
  description?: React.ReactNode
  align?: "split" | "center"
  descriptionClassName?: string
  aside?: React.ReactNode
}) {
  const heading = (
    <div className={cn("flex flex-col gap-4 sm:gap-5", align === "center" && "items-center gap-3 sm:gap-3")}>
      <p
        className={cn(
          "flex items-center gap-2 font-medium text-base leading-normal max-md:text-[15px] max-md:leading-[22px]",
          eyebrowTone === "accent" ? "text-primary" : "text-foreground"
        )}
      >
        {eyebrow}
      </p>
      <h2 className="display-statement">
        <span className="block">{title}</span>
        {muted && <span className="block text-muted-foreground/60">{muted}</span>}
      </h2>
    </div>
  )
  if (align === "center") {
    return (
      <div className="flex flex-col items-center text-center">
        {heading}
        {description && <p className="mt-3 max-w-3xl text-pretty text-base text-muted-foreground leading-[1.5]">{description}</p>}
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
      {heading}
      {description && (
        <p
          className={cn(
            "text-pretty text-base text-muted-foreground leading-[1.5] md:max-w-[400px] md:shrink-0 md:pb-1.5",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
      {aside}
    </div>
  )
}

export function TextLink({ children, className, href = "#" }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <a href={href} className={cn("group inline-flex items-center gap-1.5 font-medium text-sm", className)}>
      {children}
      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

/** Four-up feature row used under Pro / Agents / HeroSpace on heroui.com. */
export function FeatureRow({
  items,
}: {
  items: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[]
}) {
  return (
    <ul className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {items.map((it) => (
        <li key={it.title} className="max-sm:flex max-sm:gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-default sm:size-10 sm:rounded-2xl">
            <it.icon className="size-4" />
          </span>
          <div className="max-sm:min-w-0 max-sm:flex-1">
            <h3 className="mt-5 font-medium text-base text-foreground leading-[22px] max-sm:mt-0 sm:mt-6 sm:leading-normal">{it.title}</h3>
            <p className="mt-2 text-pretty text-muted-foreground text-sm leading-[21px] max-sm:mt-1 sm:leading-6">{it.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Mac traffic-light dots, token-coloured. */
export function WindowDots({ className, color = false }: { className?: string; color?: boolean }) {
  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      {color ? (
        <>
          <span className="size-[11px] rounded-full bg-destructive" />
          <span className="size-[11px] rounded-full bg-warning" />
          <span className="size-[11px] rounded-full bg-success" />
        </>
      ) : (
        [0, 1, 2].map((i) => <span key={i} className="size-[11px] rounded-full bg-foreground/15" />)
      )}
    </span>
  )
}

/** simple-icons SVG path renderer (monochrome, currentColor). */
export function BrandIcon({ path, title, className }: { path: string; title: string; className?: string }) {
  return (
    <svg role="img" aria-label={title} viewBox="0 0 24 24" fill="currentColor" className={cn("size-5", className)}>
      <path d={path} />
    </svg>
  )
}

/** Simple smooth SVG line/area chart drawn with currentColor (theme token via text-* class). */
export function Sparkline({
  values,
  className,
  area = false,
  strokeWidth = 2,
}: {
  values: number[]
  className?: string
  area?: boolean
  strokeWidth?: number
}) {
  const w = 300
  const h = 100
  const max = Math.max(...values)
  const min = Math.min(...values)
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - 6 - ((v - min) / (max - min || 1)) * (h - 12)] as const)
  const d = pts
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`
      const [px, py] = pts[i - 1]
      const cx = (px + x) / 2
      return `C${cx},${py} ${cx},${y} ${x},${y}`
    })
    .join(" ")
  const id = React.useId()
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("w-full", className)} aria-hidden>
      {area && (
        <>
          <defs>
            <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
        </>
      )}
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
