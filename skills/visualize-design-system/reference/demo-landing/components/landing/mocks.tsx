"use client"

/* Mock UIs built ONLY from the restyled shadcn components (+ Tailwind layout, theme tokens). */
import * as React from "react"
import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
  CalendarIcon,
  ChevronDownIcon,
  CircleCheckIcon,
  ClockIcon,
  ExpandIcon,
  HeadphonesIcon,
  InboxIcon,
  ListTodoIcon,
  MailIcon,
  MicIcon,
  MusicIcon,
  PauseIcon,
  PlusIcon,
  ShuffleIcon,
  SparklesIcon,
  StickyNoteIcon,
  XIcon,
} from "lucide-react"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { WindowDots } from "./ui-bits"

/* ------------ Open Source: calendar + color picker ------------ */
// Color-picker swatches are explicit colors by nature (it's a color picker); #0485F7 is the value shown on heroui.com.
const swatches = ["#f31260", "#c026d3", "#7828c8", "#3b82f6", "#06b6d4", "#14b8a6", "#22c55e", "#84cc16", "#eab308", "#f97316"]

export function CalendarMock({ className }: { className?: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 11, 16))
  return (
    <Card className={cn("w-fit p-2", className)}>
      <Calendar mode="single" month={new Date(2025, 11, 1)} selected={date} onSelect={setDate} className="bg-transparent" />
    </Card>
  )
}

export function ColorPickerMock({ className }: { className?: string }) {
  const [hue, setHue] = React.useState<number[]>([210])
  const [color, setColor] = React.useState("#0485F7")
  return (
    <Card className={cn("w-[240px] gap-3 p-2", className)}>
      <div className="flex justify-between px-1 pt-1">
        {swatches.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={`Pick ${s}`}
            onClick={() => setColor(s.toUpperCase())}
            className="size-4 cursor-pointer rounded-full ring-2 ring-transparent ring-offset-1 ring-offset-surface transition hover:ring-border"
            style={{ background: s }}
          />
        ))}
      </div>
      <div
        className="relative h-[150px] rounded-2xl"
        style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue[0]} 100% 50%))` }}
      >
        <span className="absolute top-[30%] left-[70%] size-4 rounded-full border-2 border-white shadow" style={{ background: color }} />
      </div>
      <div className="flex items-center gap-2">
        <Slider
          aria-label="Hue"
          value={hue}
          onValueChange={(v) => setHue(Array.isArray(v) ? [...v] : [v])}
          min={0}
          max={360}
          className="**:data-[slot=slider-range]:bg-transparent **:data-[slot=slider-track]:bg-[linear-gradient(90deg,red,#ff0,lime,cyan,blue,#f0f,red)] **:data-[slot=slider-thumb]:bg-surface"
        />
        <Button size="icon-sm" variant="tertiary" aria-label="Random color">
          <ShuffleIcon />
        </Button>
      </div>
      <InputGroup variant="secondary">
        <InputGroupAddon>
          <span className="size-3.5 rounded-full" style={{ background: color }} />
        </InputGroupAddon>
        <InputGroupInput aria-label="Hex color" value={color} onChange={(e) => setColor(e.target.value)} />
      </InputGroup>
    </Card>
  )
}

/* ------------ Pro: AI chat + music player (heroui.com "pro-overview") ------------ */
export function ProChatMock({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[300px] flex-col items-center gap-2 rounded-[28px] bg-default p-1", className)}>
      <span className="flex items-center gap-2 pt-2 font-medium text-muted-foreground text-xs">
        <SparklesIcon className="size-3.5" /> Pro AI chat
      </span>
      <Card className="w-full gap-3 p-3">
        <div className="ms-auto max-w-[85%] rounded-[14px] bg-default/60 p-3 text-sm">What’s the real benefit?</div>
        <p className="p-1 text-sm leading-[1.34]">
          You stop rebuilding the same UI decisions over and over. HeroUI gives you a solid baseline so you can spend time on product, not polishing pixels.
        </p>
        <InputGroup variant="secondary" className="h-[46px]">
          <InputGroupAddon>
            <PlusIcon className="size-4 opacity-50" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Ask anything" aria-label="Ask anything" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="tertiary" size="sm">
              <MicIcon /> Voice
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Card>
    </div>
  )
}

const tracks = ["Eyes closed", "Hymn for the weekend", "Something Just Like This"]

export function MusicPlayerMock({ className }: { className?: string }) {
  const [playing, setPlaying] = React.useState(true)
  return (
    <div className={cn("flex w-[300px] flex-col items-center gap-2 rounded-[28px] bg-default p-1", className)}>
      <span className="flex items-center gap-2 pt-2 font-medium text-muted-foreground text-xs">
        <MusicIcon className="size-3.5" /> Music player
      </span>
      <Card className="w-full gap-4 p-4">
        <div className="flex items-start gap-4">
          {/* album art stand-in: token gradient, no image asset */}
          <div className="size-24 shrink-0 rounded-[14px] bg-linear-to-br from-foreground/70 to-foreground/20 shadow-md" />
          <div className="flex min-w-0 flex-col gap-3 pt-1">
            <div>
              <p className="font-medium text-xl leading-[1.34]">Demons</p>
              <p className="whitespace-nowrap font-medium text-muted-foreground text-xs opacity-60">Single By John Smith</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Button size="sm" variant="tertiary" onClick={() => setPlaying((p) => !p)} className="w-[74px]">
                {playing ? <PauseIcon data-icon="inline-start" /> : null}
                {playing ? "Pause" : "Play"}
              </Button>
              <Button size="sm" variant="ghost">
                <BookmarkIcon data-icon="inline-start" /> Save
              </Button>
            </div>
          </div>
        </div>
        <Progress value={playing ? 42 : 42} size="sm" aria-label="Playback position" />
        <ul className="flex flex-col gap-2.5">
          {tracks.map((t, i) => (
            <li key={t} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-4">
                <Avatar size="sm" className="rounded-xl after:rounded-xl">
                  <AvatarFallback className="rounded-xl bg-linear-to-br from-primary/60 to-primary/20 text-[10px]">{i + 1}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-muted-foreground text-sm">{t}</span>
              </div>
              {i < tracks.length - 1 && <Separator className="opacity-50" />}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

/* ------------ Agents: chat panel ------------ */
export const agentSuggestions = [
  "Chart MRR growth over the last 12 months",
  "Compare MRR, gross burn, net burn, and runway",
  "Rank our top vendors over the last 7 days",
  "Show the top software vendors for the trailing month",
  "Pick our highest-paid software vendor and chart its last 6 months",
]

export const agentPrompts: Record<string, string[]> = {
  Banking: agentSuggestions,
  Maps: [
    "Fly to Buenos Aires and pin the Obelisco",
    "Show walking time from Teatro Colón",
    "Draw a waterfront walking route",
    "List landmarks within 2 km",
    "What’s 50 m from my pin?",
  ],
  Shopping: [
    "Filter to sneakers under $140",
    "Shortlist trail shoes in olive",
    "Compare Drift Runner vs Harbor Court",
    "Show only in-stock trainers",
    "Add Field Day Trainer to my bag",
  ],
  Finance: [
    "Chart my portfolio over 30 days",
    "What’s my top performer today?",
    "Show recent ETH activity",
    "Break down holdings by asset",
    "How much did I receive this week?",
  ],
  Travel: [
    "Plan 4 days in Rome",
    "Compare daily budget for Rome vs Lisbon",
    "Add Vatican day to the itinerary",
    "Find flights under $700",
    "When is the best month for Rome?",
  ],
  Email: [
    "Summarize unread mail from Maya",
    "Draft a reply to the dashboard review",
    "Star anything due this week",
    "What’s waiting on me?",
    "Find the Stripe invoice thread",
  ],
}

export function AgentChatPanel({
  className,
  count = 5,
  product = "Banking",
  showHeaderActions = true,
  suggestions,
}: {
  className?: string
  count?: number
  product?: string
  showHeaderActions?: boolean
  suggestions?: string[]
}) {
  const [approve, setApprove] = React.useState(true)
  const [value, setValue] = React.useState("")
  const prompts = (suggestions ?? agentPrompts[product] ?? agentSuggestions).slice(0, count)
  return (
    <Card className={cn("w-[340px] gap-0 p-0", className)}>
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="flex items-center gap-1 font-medium text-xs">
          New chat <ChevronDownIcon className="size-3.5" />
        </span>
        {showHeaderActions && (
          <span className="flex items-center gap-0.5 text-muted-foreground">
            <Button size="icon-xs" variant="ghost" aria-label="New chat"><PlusIcon /></Button>
            <Button size="icon-xs" variant="ghost" aria-label="Expand"><ExpandIcon /></Button>
            <Button size="icon-xs" variant="ghost" aria-label="Close"><XIcon /></Button>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-end gap-3 px-3 pt-16 pb-3">
        <div className="px-1">
          <p className="font-semibold text-sm">How can {product} Copilot help?</p>
          <p className="text-muted-foreground text-xs">Live answers with charts, metrics, and tables.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          {prompts.map((s) => (
            <Button
              key={s}
              size="sm"
              variant="outline"
              onClick={() => setValue(s)}
              className="h-8 justify-between font-normal text-xs"
            >
              <span className="truncate">{s}</span>
              <ArrowUpRightIcon className="text-muted-foreground" />
            </Button>
          ))}
        </div>
        <InputGroup variant="secondary" className="h-10">
          <InputGroupAddon>
            <PlusIcon className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={`Ask ${product} Copilot…`}
            aria-label={`Ask ${product} Copilot`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" variant="default" aria-label="Send">
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Switch id={`approve-${product}`} size="sm" checked={approve} onCheckedChange={setApprove} />
            <Label htmlFor={`approve-${product}`} className="font-normal text-muted-foreground text-xs">Approve for me</Label>
          </div>
          <span className="text-[10px] text-muted-foreground">Agent may make mistakes. Verify all outputs.</span>
        </div>
        <p className="text-center text-[10px] text-muted-foreground">
          Powered by <span className="font-semibold text-foreground">hero</span>
        </p>
      </div>
    </Card>
  )
}

/* ------------ HeroSpace: Mac sidebar ------------ */
export const spaceNav = [
  { icon: ClockIcon, label: "Up next" },
  { icon: InboxIcon, label: "Inbox", count: 12 },
  { icon: MailIcon, label: "Mail", count: 8 },
  { icon: CalendarIcon, label: "Calendar" },
  { icon: HeadphonesIcon, label: "Support", count: 3 },
  { icon: ListTodoIcon, label: "Tasks" },
  { icon: StickyNoteIcon, label: "Notes" },
]

export function SpaceSidebar({ className, counts = false }: { className?: string; counts?: boolean }) {
  return (
    <div className={cn("flex w-[180px] shrink-0 flex-col gap-0.5 text-xs", className)}>
      <div className="mb-2 flex items-center justify-between rounded-lg border border-border bg-surface px-2 py-1.5">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="flex size-4 items-center justify-center rounded bg-foreground font-bold text-[8px] text-background">H</span>
          HeroUI Inc
        </span>
        <ChevronDownIcon className="size-3 text-muted-foreground" />
      </div>
      {spaceNav.map((n, i) => (
        <Button
          key={n.label}
          variant="ghost"
          size="xs"
          className={cn("h-7 justify-start gap-2 px-2 font-normal", i === 0 && "bg-default font-medium")}
        >
          <n.icon className="size-3.5" />
          <span className="flex-1 text-start">{n.label}</span>
          {counts && n.count ? <span className="text-[10px] text-muted-foreground">{n.count}</span> : null}
        </Button>
      ))}
    </div>
  )
}

export function SpaceWindowMock({ className }: { className?: string }) {
  return (
    <Card className={cn("w-[280px] gap-3 p-3", className)}>
      <WindowDots color />
      <SpaceSidebar />
    </Card>
  )
}

export { CircleCheckIcon }
