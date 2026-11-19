"use client"

import * as React from "react"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
  ListChecksIcon,
  MailIcon,
  MessageCircleIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  SquarePenIcon,
  SparklesIcon,
  TicketIcon,
} from "lucide-react"
import { siGmail, siGooglecalendar } from "simple-icons"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpaceSidebar } from "./mocks"
import { BrandIcon, FeatureRow, SectionHeader, WindowDots, ctaSecondary } from "./ui-bits"

/* Content transcribed from heroui.com's HeroSpace screenshot (the site renders it as an image). */
const needs = [
  { who: "Priya Shah", src: "gmail", msg: "Can we catch up next week?", tag: "Find time next week", when: "3 days" },
  { who: "Leo Martin", src: "ticket", msg: "Can one license cover client projects?", tag: "New ticket", when: "1 day" },
  { who: "Dana Ortiz", src: "gmail", msg: "Re: Thursday demo", tag: "Reply before Thursday", when: "37m" },
  { who: "Dana Kim", src: "ticket", msg: "Can we move our seats to the new HeroUI…", tag: "Claude's draft", when: "4m" },
]
const suggested = [
  { t: "Send Marco the SOC 2 report", r: "Today" },
  { t: "Fill in Northwind's billing form", r: "add" },
  { t: "Reply to Priya about the SSO add-on", r: "Tomorrow" },
]
const meetings = [
  { at: "11:00", len: "30m", t: "Tesselate call", s: "Summary ready" },
  { at: "14:00", len: "45m", t: "Kestrel Health follow-up", s: "Writing summary" },
  { at: "16:30", len: "30m", t: "HeroUI Native weekly" },
]

function SpaceApp() {
  return (
    <div className="flex size-full flex-col bg-background text-[11px]">
      {/* title bar */}
      <div className="flex h-10 shrink-0 items-center gap-3 border-border border-b px-3">
        <WindowDots color />
        <span className="ms-10 flex items-center gap-1 text-muted-foreground max-md:hidden">
          <SearchIcon className="size-3.5" /> <SquarePenIcon className="size-3.5" />
          <ChevronLeftIcon className="ms-3 size-3.5" /> <ChevronRightIcon className="size-3.5" />
        </span>
        <span className="flex items-center gap-1.5 rounded-md bg-default px-2 py-0.5 max-md:hidden"><InboxIcon className="size-3" />Inbox</span>
        <span className="flex items-center gap-1.5 rounded-md px-2 py-0.5 text-muted-foreground max-md:hidden"><MailIcon className="size-3" />Re: Thursday demo</span>
        <PlusIcon className="size-3.5 text-muted-foreground max-md:hidden" />
        <Button size="xs" variant="outline" className="ms-auto h-6 text-[11px]"><MessageCircleIcon data-icon="inline-start" />Ask Agent</Button>
      </div>
      <div className="flex min-h-0 flex-1 gap-4 p-3">
        <SpaceSidebar counts className="max-md:hidden" />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="font-semibold text-lg">Good morning, Junior</p>
              <p className="text-muted-foreground">Monday, October 19. 6 waiting on you, 5 suggested tasks, 1 to do today and 3 meetings.</p>
            </div>
            <Tabs defaultValue="today" className="max-lg:hidden">
              <TabsList className="w-auto!">
                <TabsTrigger value="today" className="text-[11px]">Today</TabsTrigger>
                <TabsTrigger value="week" className="text-[11px]">This week</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid min-h-0 gap-3 lg:grid-cols-[1fr_260px]">
            <div className="flex min-w-0 flex-col gap-3">
              <Card size="sm" className="flex-row items-center gap-3 px-3">
                <div className="leading-tight">
                  <p className="font-semibold">11:00</p>
                  <p className="text-[10px] text-muted-foreground">in 43 min</p>
                </div>
                <span className="h-8 w-0.5 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">Tesselate call <Badge size="sm" variant="success" className="ms-1">Summary ready</Badge></p>
                  <p className="truncate text-[10px] text-muted-foreground">Marco wants an annual discount. You owe him the SOC 2 report.</p>
                </div>
                <Button size="xs" variant="outline">Open brief</Button>
                <Button size="xs">OK Join</Button>
              </Card>
              <Card size="sm" className="gap-1 px-3">
                <CardHeader className="px-0">
                  <CardTitle className="text-[11px]">Needs you <Badge size="sm" className="ms-1">4</Badge></CardTitle>
                  <CardAction className="text-[10px] text-muted-foreground">Open Inbox</CardAction>
                </CardHeader>
                {needs.map((n) => (
                  <div key={n.who} className="flex items-center gap-2 py-1">
                    {n.src === "gmail" ? (
                      <BrandIcon path={siGmail.path} title="Gmail" className="size-3.5 text-destructive" />
                    ) : (
                      <TicketIcon className="size-3.5 text-success" />
                    )}
                    <span className="w-20 shrink-0 font-medium">{n.who}</span>
                    <span className="min-w-0 flex-1 truncate text-muted-foreground">{n.msg}</span>
                    <Badge size="sm" variant="warning" className="max-sm:hidden">{n.tag}</Badge>
                    <span className="w-10 text-end text-[10px] text-muted-foreground">{n.when}</span>
                  </div>
                ))}
              </Card>
              <Card size="sm" className="gap-1 px-3">
                <CardHeader className="px-0">
                  <CardTitle className="text-[11px]">Suggested <Badge size="sm" className="ms-1">5</Badge></CardTitle>
                  <CardAction className="text-[10px] text-muted-foreground">From your mail, tickets and meetings</CardAction>
                </CardHeader>
                {suggested.map((s, i) => (
                  <div key={s.t} className={cn("flex items-center gap-2 rounded-lg px-1 py-1", s.r === "add" && "bg-default")}>
                    <Checkbox id={`sg-${i}`} />
                    <Label htmlFor={`sg-${i}`} className="flex-1 font-normal text-[11px]">{s.t}</Label>
                    {s.r === "add" ? (
                      <span className="flex items-center gap-1">
                        <Button size="xs" variant="ghost" className="h-5 text-[10px]">Dismiss</Button>
                        <Button size="xs" variant="tertiary" className="h-5 text-[10px]">Add</Button>
                      </span>
                    ) : (
                      <span className={cn("text-[10px]", s.r === "Today" ? "text-success" : "text-muted-foreground")}>{s.r}</span>
                    )}
                  </div>
                ))}
              </Card>
              <Card size="sm" className="gap-1 px-3">
                <CardHeader className="px-0">
                  <CardTitle className="text-[11px]">Your tasks</CardTitle>
                  <CardAction className="text-[10px] text-muted-foreground">Open Tasks</CardAction>
                </CardHeader>
                <p className="text-[10px] text-destructive">Overdue</p>
                <div className="flex items-center gap-2 py-1">
                  <Checkbox id="task-k" />
                  <Label htmlFor="task-k" className="flex-1 font-normal text-[11px]">Send Kestrel Health the SSO quote</Label>
                  <Badge size="sm">Kestrel Health</Badge>
                  <span className="text-[10px] text-destructive">2 days late</span>
                </div>
              </Card>
            </div>
            <Card size="sm" className="h-fit gap-2 px-3 max-lg:hidden">
              <CardHeader className="px-0">
                <CardTitle className="text-[11px]">Meetings</CardTitle>
                <CardAction className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <BrandIcon path={siGooglecalendar.path} title="Google Calendar" className="size-3 text-primary" /> Google Calendar
                </CardAction>
              </CardHeader>
              {meetings.map((m, i) => (
                <React.Fragment key={m.t}>
                  {i > 0 && <Separator />}
                  <div className="flex gap-2">
                    <div className="w-9 leading-tight">
                      <p className="font-medium">{m.at}</p>
                      <p className="text-[10px] text-muted-foreground">{m.len}</p>
                    </div>
                    <span className="w-0.5 rounded-full bg-primary" />
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{m.t}</p>
                      {m.s && <Badge size="sm" variant="success" className="w-fit">{m.s}</Badge>}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSpace() {
  return (
    <section id="herospace" className="herospace-scope site-container section-gap scroll-mt-24">
      <SectionHeader
        eyebrowTone="foreground"
        eyebrow={
          <>
            <span className="flex size-4 items-center justify-center rounded-[5px] bg-primary text-primary-foreground"><SparklesIcon className="size-2.5" /></span>
            HeroSpace (alpha)
          </>
        }
        title="Everything that matters,"
        muted="in one workspace."
        description="Mail, calendar, support, tasks, and notes in one Mac app, run by the agents you already pay for."
      />
      <div className="relative mt-8 aspect-[1152/700] overflow-hidden rounded-[28px] border border-foreground/10 max-sm:aspect-auto max-sm:h-[400px] sm:mt-12 sm:rounded-[40px]">
        <div aria-hidden className="absolute inset-0 wall-space" />
        <div className="absolute top-[11.4%] left-1/2 h-[100%] w-[91.7%] -translate-x-1/2 overflow-hidden rounded-xl shadow-[0_0_0_1px_rgb(24_24_27/0.31),0_24px_48px_-12px_rgb(59_61_184/0.48)] max-sm:top-10 max-sm:left-5 max-sm:w-[640px] max-sm:translate-x-0 sm:rounded-2xl">
          <SpaceApp />
        </div>
      </div>
      <FeatureRow
        items={[
          { icon: CalendarIcon, title: "Join every call prepared", description: "An agent reads the invite, your notes, and past mail, then writes down what you owe the guests." },
          { icon: MailIcon, title: "Replies already drafted", description: "Your agent drafts replies to the mail waiting on you, in your voice, and saves them in Gmail." },
          { icon: ListChecksIcon, title: "Everything you owe, in one list", description: "Promises from your mail, tickets, and calls become tasks that link back to where they came from." },
          { icon: ShieldCheckIcon, title: "You approve what goes out", description: "Drafts, calendar changes, and task edits wait for your OK, and run on your own Claude or ChatGPT plan." },
        ]}
      />
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 max-sm:flex-nowrap max-sm:gap-2.5 sm:mt-12">
        <Button className="max-sm:flex-1">Request early access</Button>
        <Button variant="tertiary" className={cn(ctaSecondary, "max-sm:flex-1")}>Explore HeroSpace</Button>
      </div>
    </section>
  )
}
