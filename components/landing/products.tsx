"use client"

import {
  ArrowRightIcon,
  PenToolIcon,
  MessageCircleIcon,
  MicIcon,
  PaletteIcon,
  PauseIcon,
  SparklesIcon,
  WandSparklesIcon,
  BookmarkIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Section, SectionHeading, Bars } from "./ui-bits"

function ProductLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="group mt-3 inline-flex items-center gap-1.5 font-medium text-sm">
      {children}
      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

function MusicPlayer() {
  return (
    <Card variant="secondary" size="sm">
      <CardHeader>
        <CardDescription>Music player</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="size-12 shrink-0 rounded-2xl bg-primary-soft" />
          <div className="min-w-0">
            <p className="font-medium text-sm">Demons</p>
            <p className="text-muted-foreground text-xs">Single By John Smith</p>
          </div>
        </div>
        <Progress value={42} size="sm">
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <PauseIcon data-icon="inline-start" /> Pause
          </Button>
          <Button size="sm" variant="tertiary" className="flex-1">
            <BookmarkIcon data-icon="inline-start" /> Save
          </Button>
        </div>
        <ul className="flex flex-col gap-1 text-sm">
          {["Eyes closed", "Hymn for the weekend", "Something Just Like This"].map((t) => (
            <li key={t} className="flex justify-between rounded-xl px-2 py-1.5 hover:bg-default">
              <span>{t}</span>
              <span className="text-muted-foreground">John Smith</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function AiChat() {
  return (
    <Card variant="secondary" size="sm">
      <CardHeader>
        <CardDescription>Pro AI chat</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="self-end rounded-2xl bg-primary px-3 py-2 text-primary-foreground text-sm">
          What’s the real benefit?
        </div>
        <p className="rounded-2xl bg-surface px-3 py-2 text-sm leading-5">
          You stop rebuilding the same UI decisions over and over. HeroUI gives you a solid baseline
          so you can spend time on product, not polishing pixels.
        </p>
        <div className="flex gap-2">
          <Input placeholder="Ask anything" />
          <Button size="icon" variant="tertiary" aria-label="Voice">
            <MicIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const stats = [
  { value: "120+", title: "Web & Native components", description: "Pre-built components crafted with care for React and React Native." },
  { value: "5", title: "App templates", description: "Full-page templates for dashboards, CRM, mail, chat, and finance." },
  { value: "3", title: "Premium themes", description: "Switch aesthetics in a click. Includes Glass, Brutalist, and Mouve." },
]
const proFeatures = [
  { icon: PaletteIcon, tag: "Your brand", title: "Design systems", description: "Map your colors, fonts, voice, and assets into a HeroUI theme." },
  { icon: PenToolIcon, tag: "Figma", title: "Design to code", description: "Exclusive files and a plugin to keep your Figma designs in perfect sync with code." },
  { icon: WandSparklesIcon, tag: "AI Builder", title: "Prompt. Refine. Export.", description: "Describe it, iterate, then copy production-ready UI to your code." },
  { icon: SparklesIcon, tag: "Pro AI", title: "Skills & MCPs", description: "Build faster with Pro Skills and MCPs that give your agents taste." },
  { icon: MessageCircleIcon, tag: "VIP", title: "Private Discord", description: "Get high-priority support and an exclusive badge in our community." },
]

export function Products() {
  return (
    <Section id="products">
      <SectionHeading
        eyebrow="Products"
        title={<>All you need to ship<br />beautiful interfaces.</>}
        description="Each product stands on its own. Start with free components, add Pro to ship faster, embed Agents to make your product AI-native, and run your day from HeroSpace."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle className="text-base">HeroUI Open Source</CardTitle>
            <CardDescription>
              Free, accessible components for React and React Native. Set your theme once and it works on web and mobile.
            </CardDescription>
            <ProductLink>Browse components</ProductLink>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <AiChat />
            <MusicPlayer />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">HeroUI Pro</CardTitle>
            <CardDescription>
              Premium components, templates, and themes, with the AI tools and community to ship faster.
            </CardDescription>
            <ProductLink>Explore HeroUI Pro</ProductLink>
          </CardHeader>
          <CardContent>
            <Card variant="secondary" size="sm">
              <CardHeader>
                <CardTitle>Operating balance</CardTitle>
                <CardDescription>Up 44.4% since March across all six accounts.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-2xl tracking-tight">$398K</span>
                  <Badge variant="success">+44.4%</Badge>
                </div>
                <Bars values={[240, 260, 250, 300, 360, 398]} className="h-24" />
                <div className="flex justify-between text-muted-foreground text-xs">
                  {["Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">HeroUI Agents</CardTitle>
              <CardDescription>
                An embeddable agent that understands your product, takes action, and replies with generative UI.
              </CardDescription>
              <ProductLink>Request access</ProductLink>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">HeroSpace</CardTitle>
              <CardDescription>
                Mail, calendar, support, tasks, and notes in one Mac app, with your agents working for you.
              </CardDescription>
              <ProductLink>Explore HeroSpace</ProductLink>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardContent className="flex flex-col gap-1">
              <span className="font-medium text-4xl tracking-tight">{s.value}</span>
              <span className="font-medium text-sm">{s.title}</span>
              <span className="text-muted-foreground text-sm">{s.description}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {proFeatures.map((f) => (
          <Card key={f.title} size="sm">
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>
                    <f.icon className="size-3.5" />
                  </AvatarFallback>
                </Avatar>
                <Badge variant="primary">{f.tag}</Badge>
              </div>
              <span className="font-medium text-sm">{f.title}</span>
              <span className="text-muted-foreground text-sm leading-5">{f.description}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

