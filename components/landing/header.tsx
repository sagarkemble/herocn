"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { EqualIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { siGithub } from "simple-icons"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BrandIcon, ctaPrimary } from "./ui-bits"

const menus: Record<string, { title: string; description: string; href?: string }[]> = {
  Products: [
    { title: "HeroUI Open Source", description: "Free components for React and React Native." },
    { title: "HeroUI Pro", description: "Premium components, templates, themes, and more." },
    { title: "HeroUI Agents", description: "An embeddable agent that takes action inside your product." },
    { title: "HeroSpace", description: "Mail, calendar, and tasks in one Mac app." },
  ],
  Docs: [
    { title: "HeroUI React", description: "Quick start, components, theming, styling.", href: "/docs" },
    { title: "HeroUI Native", description: "Components for React Native." },
    { title: "HeroUI Pro", description: "Components, templates, Figma, licensing." },
    { title: "HeroUI Agents", description: "Installation, generative UI, API reference." },
  ],
  Resources: [
    { title: "Blog", description: "Guides and updates." },
    { title: "For coding agents", description: "MCPs, agent skills, llms.txt, AGENTS.md." },
    { title: "Discord", description: "Get help and share what you ship." },
    { title: "Releases", description: "What's new across HeroUI." },
  ],
}

/** Text wordmark (no logo artwork copied). */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#" aria-label="hero home" className={cn("flex items-center gap-2 font-display font-semibold text-[24px] leading-none sm:text-[30px] tracking-[-0.04em]", className)}>
      <span aria-hidden className="flex h-[0.85em] w-[0.7em] items-end gap-[0.12em]">
        <span className="h-full w-[0.24em] rounded-[0.08em] bg-foreground" />
        <span className="h-3/4 w-[0.24em] rounded-[0.08em] bg-foreground" />
      </span>
      hero
    </a>
  )
}

export function ThemeSegment({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <ToggleGroup
      aria-label="Theme"
      spacing={1}
      value={mounted && theme ? [theme] : []}
      onValueChange={(v) => v[0] && setTheme(v[0] as string)}
      className={cn("rounded-full bg-default p-0.5", className)}
    >
      {[
        { v: "light", i: SunIcon, l: "Light" },
        { v: "dark", i: MoonIcon, l: "Dark" },
        { v: "system", i: MonitorIcon, l: "System" },
      ].map(({ v, i: Icon, l }) => (
        <ToggleGroupItem key={v} value={v} aria-label={l} variant="ghost" size="icon-xs" className="rounded-full aria-pressed:bg-surface aria-pressed:text-foreground aria-pressed:shadow-sm">
          <Icon className="size-3.5" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  return (
    <header className="sticky top-0 z-50 flex w-full justify-center px-6 py-4 max-md:bg-background max-md:px-4 max-md:py-1">
      {/* heroui.com: background gradient fades in once you scroll */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+1.5rem)] bg-linear-to-b from-background via-background/80 to-transparent transition-opacity duration-300 max-md:hidden",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "flex w-full max-w-5xl items-center justify-between transition-all duration-300 motion-reduce:transition-none max-md:h-12 md:grid md:grid-cols-[1fr_auto_1fr]",
          scrolled &&
            "md:max-w-3xl md:rounded-full md:bg-surface-secondary/80 md:px-6 md:py-3 md:pr-4 md:shadow-[inset_0_0_0_1px_var(--border)] md:backdrop-blur-lg"
        )}
      >
        <Wordmark className="justify-self-start" />
        <NavigationMenu className={cn("transition-transform duration-300 motion-reduce:transition-none max-md:hidden", scrolled && "md:-translate-x-1")}>
          <NavigationMenuList className="gap-1">
            {Object.entries(menus).map(([label, items]) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuTrigger className="h-8 bg-transparent px-2 font-medium text-muted-foreground text-sm hover:bg-transparent hover:text-foreground data-[popup-open]:bg-transparent data-[popup-open]:text-foreground">
                  {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[30rem] grid-cols-2 gap-1 p-1">
                    {items.map((p) => (
                      <li key={p.title}>
                        <NavigationMenuLink href={p.href ?? "#"} className="flex flex-col items-start gap-1">
                          <span className="font-medium text-sm">{p.title}</span>
                          <span className="text-muted-foreground text-xs leading-snug">{p.description}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink href="/themes" className="h-8 px-2 font-medium text-muted-foreground text-sm hover:bg-transparent hover:text-foreground">
                Themes
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="h-8 px-2 font-medium text-muted-foreground text-sm hover:bg-transparent hover:text-foreground">
                Enterprise
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex h-8 items-center gap-5 justify-self-end max-md:gap-1.5">
          <a
            href="#"
            className={cn(
              "flex items-center gap-1.5 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground max-lg:hidden",
              scrolled && "hidden"
            )}
          >
            <BrandIcon path={siGithub.path} title="GitHub" className="size-4" />
            <span className="tabular-nums">31.2k</span>
          </a>
          <div className="flex transition-[opacity,visibility] duration-200 motion-reduce:transition-none">
            <Button className={cn(ctaPrimary, "max-md:h-9 max-md:px-3 max-sm:w-auto")}>Get started</Button>
          </div>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
              <EqualIcon />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {["Products", "Docs", "Themes", "Resources", "Enterprise"].map((l) =>
                  l === "Docs" || l === "Themes" ? (
                    <a key={l} href={l === "Docs" ? "/docs" : "/themes"} className={buttonVariants({ variant: "ghost", className: "justify-start" })}>
                      {l}
                    </a>
                  ) : (
                    <Button key={l} variant="ghost" className="justify-start">
                      {l}
                    </Button>
                  )
                )}
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Theme</span>
                  <ThemeSegment />
                </div>
                <Button className={cn(ctaPrimary, "mt-3")}>Get started</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
