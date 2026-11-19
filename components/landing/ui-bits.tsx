import * as React from "react"
import { cn } from "cn"

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
    <section
      id={id}
      className={cn("mx-auto mt-[72px] w-full max-w-[75rem] scroll-mt-24 px-5 sm:mt-40 sm:px-6", className)}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  children,
}: {
  eyebrow: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "start"
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start"
      )}
    >
      <h2 className="font-medium text-muted-foreground text-sm">{eyebrow}</h2>
      <p className="text-balance font-medium text-[2.125rem] leading-[38px] tracking-[-0.02em] sm:text-4xl sm:leading-tight md:text-5xl">
        {title}
      </p>
      {description && (
        <p className="max-w-xl text-balance text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

export function FeatureList({
  items,
}: {
  items: { title: string; description: string }[]
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((f) => (
        <div key={f.title} className="flex flex-col gap-1.5">
          <h3 className="font-medium text-foreground text-sm">{f.title}</h3>
          <p className="text-muted-foreground text-sm leading-5">{f.description}</p>
        </div>
      ))}
    </div>
  )
}

/** Simple bar chart drawn with divs (theme tokens only). */
export function Bars({
  values,
  className,
  barClassName = "bg-primary",
  highlight,
}: {
  values: number[]
  className?: string
  barClassName?: string
  highlight?: number
}) {
  const max = Math.max(...values)
  return (
    <div className={cn("flex h-32 items-end gap-1.5", className)}>
      {values.map((v, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-t-md transition-colors", i === highlight ? "bg-primary" : barClassName)}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  )
}
