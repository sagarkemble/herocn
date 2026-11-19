"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MenuIcon, MoonIcon, StarIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const products = [
  { title: "HeroUI Open Source", description: "Free components for React and React Native." },
  { title: "HeroUI Pro", description: "Premium components, templates, themes, and more." },
  { title: "HeroUI Agents", description: "An embeddable agent that takes action inside your product." },
  { title: "HeroSpace", description: "Mail, calendar, and tasks in one Mac app." },
]

export function Wordmark() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold text-base tracking-tight">
      <span className="flex size-7 items-center justify-center rounded-xl bg-foreground font-bold text-background text-sm">
        H
      </span>
      HeroUI
    </a>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === "dark"
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(dark ? "light" : "dark")}
          />
        }
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </TooltipTrigger>
      <TooltipContent>{dark ? "Light mode" : "Dark mode"}</TooltipContent>
    </Tooltip>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full justify-center px-4 py-1 max-md:bg-background md:px-6 md:py-4">
      <div className="flex w-full max-w-[75rem] items-center justify-between gap-4 rounded-3xl md:bg-surface/80 md:px-3 md:py-2 md:shadow-sm md:backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Wordmark />
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[30rem] grid-cols-2 gap-1 p-1">
                    {products.map((p) => (
                      <li key={p.title}>
                        <NavigationMenuLink href="#products" className="flex flex-col items-start gap-1">
                          <span className="font-medium text-sm">{p.title}</span>
                          <span className="text-muted-foreground text-xs leading-snug">{p.description}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {["Docs", "Resources", "Enterprise"].map((l) => (
                <NavigationMenuItem key={l}>
                  <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                    {l}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="max-md:hidden">
            <StarIcon data-icon="inline-start" />
            31.2k
          </Button>
          <ThemeToggle />
          <Button size="sm" className="max-md:hidden">Get started</Button>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {["Products", "Docs", "Resources", "Enterprise"].map((l) => (
                  <Button key={l} variant="ghost" className="justify-start">
                    {l}
                  </Button>
                ))}
                <Separator className="my-2" />
                <Button>Get started</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
