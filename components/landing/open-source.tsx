"use client"

import * as React from "react"
import { ArchiveIcon, CopyIcon, FileIcon, InboxIcon, PencilIcon, SearchIcon, SendIcon, StarIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Section, SectionHeading } from "./ui-bits"

const mail = [
  { from: "Carlos Iglesias", time: "10:21 AM", subject: "Launch recap + next steps", preview: "We agreed on the final launch date (Tuesday the 24th)", unread: true },
  { from: "Stripe", time: "Yesterday", subject: "Invoice INV-0241 is due tomorrow", preview: "Invoice INV-0241 for $2,450.00 is due on April 30", unread: true },
  { from: "Flights", time: "Apr 22", subject: "Flight itinerary: SFO → NRT", preview: "You're booked on flight FL-482 to Tokyo" },
  { from: "GitHub", time: "9:02 AM", subject: "Review requested on PR #242", preview: "Review requested on #242 - fix(theme): token fallbacks" },
  { from: "Maya Okafor", time: "Mon", subject: "Design review: dashboard v3", preview: "Pinging ahead of Friday's review with the latest frames" },
  { from: "Amelia from Linear", time: "Mon", subject: "Your weekly summary", preview: "8 issues closed, 3 blocked issues need attention" },
]
const fonts = ["Inter", "Geist", "DM Sans", "Fraunces", "JetBrains Mono"].map((f) => ({ label: f, value: f }))
const initials = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("")

function MailPreview() {
  const [active, setActive] = React.useState(0)
  const folders = [
    { icon: InboxIcon, label: "Inbox", count: 4 },
    { icon: StarIcon, label: "Starred", count: 2 },
    { icon: SendIcon, label: "Sent" },
    { icon: FileIcon, label: "Drafts" },
    { icon: ArchiveIcon, label: "Archive" },
  ]
  return (
    <Card className="p-0">
      <div className="grid min-h-[26rem] md:grid-cols-[13rem_1fr]">
        <aside className="flex flex-col gap-1 border-border p-3 max-md:hidden md:border-e">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Avatar size="sm"><AvatarFallback>Y</AvatarFallback></Avatar>
            <div className="min-w-0">
              <p className="font-medium text-sm">You</p>
              <p className="truncate text-muted-foreground text-xs">you@heroui.dev</p>
            </div>
          </div>
          <Button size="sm" className="my-2">
            <PencilIcon data-icon="inline-start" /> New email
          </Button>
          {folders.map((f, i) => (
            <Button key={f.label} variant={i === 0 ? "tertiary" : "ghost"} size="sm" className="justify-start">
              <f.icon data-icon="inline-start" />
              <span className="flex-1 text-start">{f.label}</span>
              {f.count && <Badge size="sm">{f.count}</Badge>}
            </Button>
          ))}
          <Separator className="my-2" />
          <p className="px-2 text-muted-foreground text-xs">Labels</p>
          {["Work", "Billing", "Travel"].map((l) => (
            <span key={l} className="px-2 py-1 text-sm">{l}</span>
          ))}
        </aside>
        <div className="flex min-w-0 flex-col gap-2 p-3">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." variant="secondary" className="ps-9 md:ps-9" />
          </div>
          <ul className="flex flex-col gap-1">
            {mail.map((m, i) => (
              <li key={m.subject}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  data-active={active === i || undefined}
                  className="flex w-full items-start gap-3 rounded-2xl p-2.5 text-start transition-colors hover:bg-default/60 focus-visible:focus-ring data-active:bg-default"
                >
                  <Avatar size="sm"><AvatarFallback>{initials(m.from)}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-sm">{m.from}</span>
                      <span className="shrink-0 text-muted-foreground text-xs">{m.time}</span>
                    </div>
                    <p className="truncate text-sm">{m.subject}</p>
                    <p className="truncate text-muted-foreground text-xs">{m.preview}</p>
                  </div>
                  {m.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export function OpenSource() {
  return (
    <Section id="open-source">
      <SectionHeading
        eyebrow="HeroUI Open Source"
        title={<>One look,<br />on web and mobile.</>}
        description="Free components for React and React Native. Change the theme once, and both platforms follow."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-[18rem_1fr]">
        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label>Accent</Label>
              <ToggleGroup defaultValue={["Default"]} className="flex-wrap">
                {["Default", "Sky", "Lavender", "Mint"].map((a) => (
                  <ToggleGroupItem key={a} value={a} size="sm">{a}</ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Font</Label>
              <Select items={fonts} defaultValue="Inter">
                <SelectTrigger className="w-full justify-between">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((f) => (
                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Radius</Label>
              <ToggleGroup defaultValue={["M"]}>
                {["–", "XS", "S", "M", "L"].map((r) => (
                  <ToggleGroupItem key={r} value={r} size="sm">{r}</ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <Button variant="tertiary">
                <CopyIcon data-icon="inline-start" /> Copy prompt
              </Button>
              <p className="text-muted-foreground text-xs leading-5">
                Paste into Cursor, Claude Code, or Codex to set up HeroUI in your project.
              </p>
            </div>
          </CardContent>
        </Card>
        <MailPreview />
      </div>
    </Section>
  )
}
