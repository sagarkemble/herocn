"use client"

import * as React from "react"
import { cn } from "cn"

import { Progress } from "@/components/ui/progress"
import { AgentChatPanel, CalendarMock, ColorPickerMock, MusicPlayerMock, ProChatMock, SpaceWindowMock } from "./mocks"
import { SectionHeader, TextLink } from "./ui-bits"

/* heroui.com Products: 4-card accordion row. Active card grows to 55.5% basis; cycles every 7s
   with a progress track under each card. Wallpaper images are replaced by explicit-colour CSS gradients. */
const products = [
  {
    title: "HeroUI Open Source",
    description: "Free, accessible components for React and React Native. Set your theme once and it works on web and mobile.",
    short: "Free components for React and React Native.",
    link: "Browse components",
    wall: "wall-blue",
    mock: (
      <div className="flex items-start gap-0">
        <CalendarMock className="relative z-0 mt-12" />
        <ColorPickerMock className="relative z-10 -ml-3" />
      </div>
    ),
  },
  {
    title: "HeroUI Pro",
    description: "Premium components, templates, themes, and more.",
    short: "Premium components, templates, themes, and more.",
    link: "Explore HeroUI Pro",
    wall: "wall-pro",
    mock: (
      <div className="flex items-start gap-6">
        <ProChatMock className="mt-6" />
        <MusicPlayerMock />
      </div>
    ),
  },
  {
    title: "HeroUI Agents",
    description: "An embeddable agent that takes action inside your product.",
    short: "An embeddable agent that takes action inside your product.",
    link: "Request access",
    wall: "wall-agents",
    mock: <AgentChatPanel count={3} showHeaderActions={false} className="w-[300px]" />,
  },
  {
    title: "HeroSpace",
    description: "Mail, calendar, and tasks in one Mac app.",
    short: "Mail, calendar, and tasks in one Mac app.",
    link: "Explore HeroSpace",
    wall: "wall-space",
    mock: <SpaceWindowMock />,
  },
]

const CYCLE_MS = 7000

export function Products() {
  const [active, setActive] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const step = 100
    const t = setInterval(() => {
      setProgress((p) => {
        if (p + (step / CYCLE_MS) * 100 >= 100) {
          setActive((a) => (a + 1) % products.length)
          return 0
        }
        return p + (step / CYCLE_MS) * 100
      })
    }, step)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section id="products" className="site-container section-gap scroll-mt-24">
      <SectionHeader
        eyebrow="Products"
        title="All you need to ship"
        muted="beautiful interfaces."
        description="Each product stands on its own. Start with free components, add Pro to ship faster, embed Agents to make your product AI-native, and run your day from HeroSpace."
        descriptionClassName="md:max-w-[560px]"
      />
      <ul
        className="mt-8 flex gap-3 max-sm:-mx-5 max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-5 max-sm:pb-1 max-sm:[scrollbar-width:none] sm:mt-12 sm:flex-col sm:gap-10 lg:flex-row lg:items-start lg:gap-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {products.map((p, i) => {
          const isActive = i === active
          return (
            <li
              key={p.title}
              className={cn(
                "min-w-0 transition-[flex-grow,flex-basis] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] max-sm:w-[300px] max-sm:shrink-0 max-sm:snap-start",
                isActive ? "lg:shrink-0 lg:grow-0 lg:basis-[55.5%]" : "lg:grow lg:basis-0"
              )}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i)
                    setProgress(0)
                  }}
                  aria-expanded={isActive}
                  className="block w-full cursor-pointer rounded-[20px] text-left outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <span className="relative block h-[380px] overflow-hidden rounded-[20px] bg-surface-secondary sm:h-[460px]">
                    <span aria-hidden className={cn("absolute inset-0", p.wall)} />
                    <span
                      className={cn(
                        "absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-sm:scale-[0.7]",
                        isActive
                          ? "sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                          : "sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 lg:top-[50px] lg:left-6 lg:translate-x-0 lg:translate-y-0 lg:scale-[0.82] lg:origin-top-left"
                      )}
                    >
                      {p.mock}
                    </span>
                  </span>
                </button>
              </h3>
              <Progress
                value={isActive ? progress : 0}
                variant="default"
                size="sm"
                aria-label={`${p.title} cycle progress`}
                className="mt-3.5 **:data-[slot=progress-track]:h-[3px] **:data-[slot=progress-track]:bg-border"
              />
              <span className="mt-4 block font-medium text-base">{p.title}</span>
              <p className={cn("mt-1.5 max-w-[460px] text-[15px] leading-[22px] transition-colors", isActive ? "text-muted-foreground" : "text-muted-foreground/60")}>
                <span className={cn(isActive ? "inline" : "max-lg:inline lg:hidden")}>{p.description}</span>
                <span className={cn(isActive ? "hidden" : "max-lg:hidden lg:inline")}>{p.short}</span>
              </p>
              <div className={cn("transition-opacity duration-500", isActive ? "opacity-100" : "max-lg:opacity-100 lg:invisible lg:opacity-0")}>
                <TextLink className="mt-3">{p.link}</TextLink>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
