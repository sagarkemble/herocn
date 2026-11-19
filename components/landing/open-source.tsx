"use client"

import * as React from "react"
import {
  ArchiveIcon,
  CheckIcon,
  CopyIcon,
  FileIcon,
  InboxIcon,
  MoonIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  RadiusIcon,
  SearchIcon,
  SendIcon,
  SignalIcon,
  SquareTerminalIcon,
  StarIcon,
  SunIcon,
  Trash2Icon,
  TypeIcon,
  WifiIcon,
  XIcon,
} from "lucide-react"
import { siClaude, siCursor, siGithub, siReact } from "simple-icons"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { BrandIcon, SectionHeader, WindowDots } from "./ui-bits"

/* Mail data: copied from heroui.com's One-look demo. */
const mails = [
  { from: "Carlos Iglesias", time: "10:21 AM", subject: "Launch recap + next steps", preview: "We agreed on the final launch date (Tuesday the 24th)" },
  { from: "Stripe", time: "Yesterday", subject: "Invoice INV-0241 is due tomorrow", preview: "Invoice INV-0241 for $2,450.00 is due on April 30" },
  { from: "Flights", time: "Apr 22", subject: "Flight itinerary: SFO → NRT", preview: "You're booked on flight FL-482 to Tokyo" },
  { from: "GitHub", time: "9:02 AM", subject: "Review requested on PR #242", preview: "Review requested on #242 - fix(theme): token fallbacks", github: true },
  { from: "Maya Okafor", time: "Mon", subject: "Design review: dashboard v3", preview: "Pinging ahead of Friday's review with the latest frames" },
  { from: "Amelia from Linear", time: "Mon", subject: "Your weekly summary", preview: "8 issues closed, 3 blocked issues need attention" },
  { from: "Ravi Anand", time: "Sun", subject: "Dinner plans for Saturday?", preview: "Are we still on for dinner on Saturday night?" },
  { from: "Parker Wren", time: "Fri", subject: "1:1 notes - Q2 growth plan", preview: "Growth plan notes: define H1 goals and owners" },
  { from: "Stripe", time: "Apr 18", subject: "$2,450 was deposited to your account", preview: "A transfer of $2,450.00 landed in your account" },
  { from: "Emma Park", time: "Apr 15", subject: "Conference CFP deadline reminder", preview: "Friendly reminder: the CFP for Summit closes Friday" },
]
// Avatar fills: explicit-colour gradient blobs (the site uses gradient avatar images; no letters).
const tone = [
  "bg-linear-to-br from-[#a7f3d0] via-[#34d399] to-[#0ea5e9]",
  "bg-linear-to-br from-[#fde68a] via-[#fb923c] to-[#f43f5e]",
  "bg-linear-to-br from-[#c4b5fd] via-[#8b5cf6] to-[#6366f1]",
]

function MailAvatar({ m, i, className }: { m: (typeof mails)[number]; i: number; className?: string }) {
  return (
    <Avatar size="sm" className={className}>
      <AvatarFallback className={cn("font-semibold text-[10px]", m.github ? "bg-foreground text-background" : tone[i % 3])}>
        {m.github ? <BrandIcon path={siGithub.path} title="GitHub" className="size-3" /> : null}
      </AvatarFallback>
    </Avatar>
  )
}

const folders = [
  { icon: InboxIcon, label: "Inbox", count: 4 },
  { icon: StarIcon, label: "Starred", count: 2 },
  { icon: SendIcon, label: "Sent" },
  { icon: FileIcon, label: "Drafts" },
  { icon: ArchiveIcon, label: "Archive" },
]

export function DesktopMail({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const m = mails[selected]
  return (
    <div className="flex size-full flex-col overflow-hidden rounded-3xl bg-background text-xs shadow-sm">
      <div className="flex h-[38px] shrink-0 items-center px-5">
        <WindowDots />
      </div>
      <div className="flex min-h-0 flex-1 gap-2.5 px-2.5 pb-2.5">
        {/* sidebar */}
        <div className="flex w-[150px] shrink-0 flex-col gap-0.5 px-1 pt-1.5">
          <div className="mb-3 flex items-center gap-2">
            <Avatar size="sm"><AvatarFallback className={tone[1]} /></Avatar>
            <div className="leading-tight">
              <p className="font-semibold">You</p>
              <p className="text-[10px] text-muted-foreground">you@heroui.dev</p>
            </div>
          </div>
          {folders.map((f, i) => (
            <Button key={f.label} variant="ghost" size="xs" className={cn("h-7 justify-start gap-2 rounded-lg px-2 font-normal text-xs", i === 0 && "bg-default font-medium")}>
              <f.icon className="size-3.5" />
              <span className="flex-1 text-start">{f.label}</span>
              {f.count ? <span className="text-muted-foreground">{f.count}</span> : null}
            </Button>
          ))}
          <p className="mt-4 mb-1 px-2 text-[10px] text-muted-foreground">Labels</p>
          {[
            { l: "Work", c: "bg-primary" },
            { l: "Billing", c: "bg-warning" },
            { l: "Travel", c: "bg-success" },
          ].map((x) => (
            <span key={x.l} className="flex h-7 items-center gap-2 px-2">
              <span className={cn("size-1.5 rounded-full", x.c)} />
              {x.l}
            </span>
          ))}
          <Button size="sm" className="mt-4 h-7 text-xs">
            <PencilIcon data-icon="inline-start" /> New email
          </Button>
        </div>
        {/* list */}
        <div className="flex w-[240px] shrink-0 flex-col gap-1.5 pt-1">
          <InputGroup className="h-8">
            <InputGroupAddon><SearchIcon className="size-3.5" /></InputGroupAddon>
            <InputGroupInput placeholder="Search..." aria-label="Search mail" className="text-xs" />
          </InputGroup>
          <ul className="flex min-h-0 flex-col gap-0.5 overflow-hidden">
            {mails.map((x, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  className={cn(
                    "flex w-full cursor-pointer gap-2 rounded-xl p-2 text-left transition-colors hover:bg-surface",
                    i === selected && "bg-surface shadow-sm"
                  )}
                >
                  <MailAvatar m={x} i={i} className="size-6" />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="flex justify-between gap-2"><span className="truncate font-semibold">{x.from}</span><span className="shrink-0 text-[10px] text-muted-foreground">{x.time}</span></span>
                    <span className="block truncate font-medium">{x.subject}</span>
                    <span className="block truncate text-[10px] text-muted-foreground">{x.preview}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* reading pane */}
        <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl bg-surface p-3 shadow-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Button size="icon-xs" variant="ghost" aria-label="Close"><XIcon /></Button>
            <Button size="icon-xs" variant="ghost" aria-label="Delete"><Trash2Icon /></Button>
            <Button size="icon-xs" variant="ghost" aria-label="Archive"><ArchiveIcon /></Button>
            <Button size="icon-xs" variant="ghost" aria-label="Star"><StarIcon className="fill-warning text-warning" /></Button>
          </div>
          <p className="font-semibold text-base">{m.subject}</p>
          <div className="flex items-center gap-2">
            <MailAvatar m={m} i={selected} />
            <div className="leading-tight">
              <p className="font-semibold">{m.from}</p>
              <p className="text-[10px] text-muted-foreground">{selected === 0 ? "carlos@heroui.dev" : m.time}</p>
            </div>
          </div>
          {selected === 0 ? (
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>Quick recap from this morning&apos;s launch review so we have it in writing.</p>
              <p>We agreed on the final launch date (Tuesday the 24th) and the three must-ship items: onboarding tour, billing update flow, and the new analytics dashboard.</p>
              <p>Parker and I will co-own the go/no-go checklist. Can you sync with me and Maya tomorrow at 10:30?</p>
            </div>
          ) : (
            <p className="leading-relaxed">{m.preview}</p>
          )}
          <Button size="xs" className="w-fit">Reply</Button>
        </div>
      </div>
    </div>
  )
}

function PhoneMail({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  return (
    <div className="relative flex size-full flex-col overflow-hidden rounded-[44px] border-[6px] border-surface bg-background text-xs shadow-xl">
      <div className="flex h-12 shrink-0 items-center justify-between px-6 font-semibold text-[14px] text-muted-foreground">
        <span>1:36</span>
        <span className="absolute top-2.5 left-1/2 h-6 w-[88px] -translate-x-1/2 rounded-full bg-muted-foreground/25" />
        <span className="flex items-center gap-1"><SignalIcon className="size-3.5" /><WifiIcon className="size-3.5" /></span>
      </div>
      <div className="flex items-center justify-between px-4 pt-2">
        <p className="font-bold text-2xl">Inbox</p>
        <span className="flex gap-1.5">
          <Button size="icon-sm" variant="tertiary" aria-label="More"><MoreHorizontalIcon /></Button>
          <Button size="icon-sm" variant="tertiary" aria-label="New"><PlusIcon /></Button>
        </span>
      </div>
      <div className="px-3 pt-3">
        <InputGroup className="h-9">
          <InputGroupAddon><SearchIcon className="size-3.5" /></InputGroupAddon>
          <InputGroupInput placeholder="Search..." aria-label="Search mail on phone" />
        </InputGroup>
      </div>
      <ul className="mt-2 flex flex-col gap-0.5 px-2">
        {mails.slice(0, 8).map((x, i) => (
          <li key={i}>
            <button type="button" onClick={() => onSelect(i)} className={cn("flex w-full cursor-pointer gap-2.5 rounded-2xl p-2.5 text-left", i === selected && "bg-surface shadow-sm")}>
              <MailAvatar m={x} i={i} />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="flex justify-between gap-2"><span className="truncate font-semibold text-[13px]">{x.from}</span><span className="text-[10px] text-muted-foreground">{x.time}</span></span>
                <span className="block truncate font-medium">{x.subject}</span>
                <span className="block truncate text-muted-foreground">{x.preview}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Button size="icon-lg" className="absolute right-4 bottom-5 rounded-full shadow-lg" aria-label="Compose">
        <PencilIcon />
      </Button>
    </div>
  )
}

/* Floating theme toolbar: switches accent / radius / font / mode via CSS variables on the frame. */
// Accent options are explicit colours (it's a colour picker). The first is the skill's --primary (HeroUI blue).
const accents = [
  { name: "Blue", value: "oklch(0.6204 0.195 253.83)" },
  { name: "Purple", value: "#7828c8" },
  { name: "Pink", value: "#f31260" },
  { name: "Orange", value: "#f97316" },
  { name: "Green", value: "#17c964" },
]
const radii = [
  { k: "S", v: "0.25rem" },
  { k: "M", v: "0.5rem" },
  { k: "L", v: "0.75rem" },
]
const fonts = [
  { k: "Inter", v: "var(--font-sans)" },
  { k: "Inter Tight", v: "var(--font-display)" },
  { k: "Geist Mono", v: "var(--font-mono)" },
]

export function OpenSource() {
  const [selected, setSelected] = React.useState(0)
  const [accent, setAccent] = React.useState(accents[0].value)
  const [radius, setRadius] = React.useState("M")
  const [font, setFont] = React.useState("Inter")
  const [base, setBase] = React.useState<number[]>([0])
  const [dark, setDark] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const frameRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)

  React.useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1152))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scopeStyle = {
    "--primary": accent,
    "--radius": radii.find((r) => r.k === radius)?.v,
    "--font-sans": fonts.find((f) => f.k === font)?.v,
    // "Base" slider tints the neutral background toward the accent (0–30%).
    ...(base[0] > 0 ? { "--background": `color-mix(in oklab, var(--surface-secondary) ${100 - base[0]}%, ${accent})` } : {}),
  } as React.CSSProperties

  return (
    <section id="open-source" className="site-container section-gap scroll-mt-24">
      <SectionHeader
        eyebrowTone="foreground"
        eyebrow={
          <>
            <span className="flex items-center gap-1">
              <BrandIcon path={siReact.path} title="React" className="size-4 text-primary" />
              <span className="h-4 w-2.5 rounded-[3px] bg-primary" aria-hidden />
            </span>
            HeroUI Open Source
          </>
        }
        title="One look,"
        muted="on web and mobile."
        description="Free components for React and React Native. Change the theme once, and both platforms follow."
      />
      <div className="relative mt-8 sm:mt-12">
        <div
          ref={frameRef}
          className="@container relative aspect-[1152/700] overflow-hidden rounded-[28px] border border-foreground/10 max-sm:aspect-auto max-sm:h-[500px] sm:rounded-[40px]"
        >
          <div aria-hidden className="absolute inset-0 wall-pastel" />
          <div
            className={cn("theme-scope font-sans text-foreground absolute top-0 left-0 h-[700px] w-[1152px] origin-top-left max-sm:size-full max-sm:transform-none!", dark && "dark")}
            style={{ ...scopeStyle, transform: `scale(${scale})` }}
          >
            <div className="absolute top-8 left-8 h-[700px] w-[703px] max-sm:hidden">
              <DesktopMail selected={selected} onSelect={setSelected} />
            </div>
            <div className="absolute top-8 left-[780px] h-[700px] w-[340px] max-sm:top-6 max-sm:left-1/2 max-sm:w-[300px] max-sm:-translate-x-1/2">
              <PhoneMail selected={selected} onSelect={setSelected} />
            </div>
            {/* toolbar */}
            <div className="absolute bottom-[46px] left-[134px] flex items-center gap-2 dark rounded-2xl bg-background/80 p-1.5 pl-3 text-foreground text-xs shadow-xl backdrop-blur-md max-sm:hidden">
              <span className="opacity-70">Accent</span>
              <ToggleGroup
                aria-label="Accent"
                spacing={1}
                value={[accent]}
                onValueChange={(v) => v[0] && setAccent(v[0] as string)}
                className="gap-0.5 rounded-full bg-foreground/10 p-0.5"
              >
                {accents.map((a) => (
                  <ToggleGroupItem key={a.name} value={a.value} aria-label={a.name} variant="ghost" size="icon-xs" className="size-5 rounded-full p-0 hover:bg-transparent aria-pressed:bg-transparent">
                    <span className={cn("size-3.5 rounded-full ring-2 ring-transparent transition", accent === a.value && "ring-foreground")} style={{ background: a.value }} />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <span className="ms-1 opacity-70">Base</span>
              <Slider aria-label="Base tint" value={base} onValueChange={(v) => setBase(Array.isArray(v) ? [...v] : [v])} min={0} max={30} className="w-16 data-[orientation=horizontal]:w-16" />
              <Select items={fonts.map((f) => ({ label: f.k, value: f.k }))} value={font} onValueChange={(v) => v && setFont(v as string)}>
                <SelectTrigger size="sm" aria-label="Font" className="h-7 gap-1 border-0 bg-foreground/10 text-foreground text-xs">
                  <TypeIcon className="size-3.5 opacity-70" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((f) => (
                    <SelectItem key={f.k} value={f.k}>{f.k}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select items={radii.map((r) => ({ label: r.k, value: r.k }))} value={radius} onValueChange={(v) => v && setRadius(v as string)}>
                <SelectTrigger size="sm" aria-label="Radius" className="h-7 gap-1 border-0 bg-foreground/10 text-foreground text-xs">
                  <RadiusIcon className="size-3.5 opacity-70" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {radii.map((r) => (
                    <SelectItem key={r.k} value={r.k}>{r.k}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tooltip>
                <TooltipTrigger
                  render={<Button size="icon-xs" variant="ghost" aria-label="Toggle preview mode" onClick={() => setDark((d) => !d)} className="text-foreground hover:bg-foreground/10 hover:text-foreground" />}
                >
                  {dark ? <MoonIcon /> : <SunIcon />}
                </TooltipTrigger>
                <TooltipContent>{dark ? "Dark preview" : "Light preview"}</TooltipContent>
              </Tooltip>
              <Badge size="sm" className="bg-foreground/10 text-foreground">Default</Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center sm:mt-12">
        <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
          <Button
            variant="tertiary"
            onClick={() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1600)
            }}
            className="h-12 gap-1 rounded-full pr-4 pl-2 text-base max-sm:h-10 max-sm:pl-1 max-sm:text-sm"
          >
            <span className="flex h-9 w-[92px] items-center justify-center">
              <span className="flex -space-x-2">
                {[siCursor, siClaude].map((ic) => (
                  <span key={ic.slug} style={{ color: ic.slug === "claude" ? `#${ic.hex}` : undefined }} className="flex size-9 items-center justify-center rounded-full border-2 border-default bg-surface">
                    <BrandIcon path={ic.path} title={ic.title} className="size-4" />
                  </span>
                ))}
                {/* Codex: no open icon available (simple-icons has no OpenAI mark) */}
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-default bg-surface" aria-label="Codex">
                  <SquareTerminalIcon className="size-4 text-[#4f6bf6]" />
                </span>
              </span>
            </span>
            <span className="inline-flex min-w-28 items-center justify-center gap-1.5">
              {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4 opacity-60" />}
              {copied ? "Copied" : "Copy prompt"}
            </span>
          </Button>
          <p className="text-muted-foreground text-sm">Paste into Cursor, Claude Code, or Codex to set up HeroUI in your project.</p>
        </div>
      </div>
    </section>
  )
}
