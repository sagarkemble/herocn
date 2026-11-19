"use client"

import * as React from "react"
import {
  ArrowDownLeftIcon,
  ArrowLeftRightIcon,
  BadgeCheckIcon,
  BarChart3Icon,
  ChevronDownIcon,
  CodeXmlIcon,
  CreditCardIcon,
  DownloadIcon,
  FileTextIcon,
  HomeIcon,
  LandmarkIcon,
  ListIcon,
  ListTodoIcon,
  MessageSquareIcon,
  PanelLeftIcon,
  ReceiptIcon,
  SearchIcon,
  SendIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  UploadIcon,
  WalletIcon,
} from "lucide-react"
import { Area, AreaChart, XAxis } from "recharts"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AgentChatPanel } from "./mocks"
import { FeatureRow, SectionHeader, ctaSecondary } from "./ui-bits"

const nav = [
  { i: HomeIcon, l: "Home" },
  { i: ListTodoIcon, l: "Tasks", n: 3 },
  { i: ArrowLeftRightIcon, l: "Transactions" },
  { i: SendIcon, l: "Payments" },
  { i: CreditCardIcon, l: "Cards" },
  { i: BarChart3Icon, l: "Capital" },
]
// Account rows as shown in heroui.com's banking demo (amounts read from the screenshot; low-res, may be approximate).
const accounts = [
  ["Operating", "4821", "$181,850.60"],
  ["Reserve", "1039", "$128,400.00"],
  ["Payroll", "7730", "$95,750.00"],
  ["Tax", "2945", "$28,400.00"],
  ["Expenses", "6158", "$17,600.00"],
  ["Revenue", "6602", "$3,200.00"],
]
// Balance curve: illustrative shape (heroui.com's chart is an image).
const balance = [40, 42, 39, 44, 41, 46, 43, 36, 30, 34, 42, 50, 64].map((v, i) => ({ i: String(i), v }))
const balanceConfig = { v: { label: "Balance", color: "var(--primary)" } } satisfies ChartConfig

function BankingApp() {
  return (
    <div className="flex size-full gap-2 overflow-hidden rounded-[22px] bg-background p-2 text-xs ring-4 ring-foreground/5">
      <aside className="flex w-[190px] shrink-0 flex-col gap-0.5 p-2 max-md:hidden">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold text-sm">
            <Avatar size="sm"><AvatarFallback className="bg-primary-soft text-primary-soft-foreground"><LandmarkIcon className="size-3.5" /></AvatarFallback></Avatar>
            Northstar
          </span>
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        </div>
        {nav.map((n, i) => (
          <Button key={n.l} variant="ghost" size="xs" className={cn("h-8 justify-start gap-2 rounded-xl px-2 font-normal text-xs", i === 0 && "bg-default font-medium")}>
            <n.i className="size-3.5" />
            <span className="flex-1 text-start">{n.l}</span>
            {n.n ? <span>{n.n}</span> : null}
          </Button>
        ))}
        <p className="mt-4 mb-1 px-2 text-[10px] text-muted-foreground">Accounts</p>
        {accounts.map(([name, num, amt]) => (
          <div key={num} className="flex items-center gap-2 px-2 py-1">
            <WalletIcon className="size-3.5 text-muted-foreground" />
            <div className="leading-tight">
              <p className="font-medium">{name} •• {num}</p>
              <p className="text-[10px] text-muted-foreground">{amt}</p>
            </div>
          </div>
        ))}
        <p className="mt-4 mb-1 px-2 text-[10px] text-muted-foreground">Workflows</p>
        {[
          [ReceiptIcon, "Bill Pay"],
          [FileTextIcon, "Invoicing"],
        ].map(([I, l]) => {
          const Icon = I as typeof ReceiptIcon
          return (
            <span key={l as string} className="flex items-center gap-2 px-2 py-1 text-muted-foreground">
              <Icon className="size-3.5" />
              {l as string}
            </span>
          )
        })}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-2xl p-3 md:border-s md:border-border">
        <div className="flex items-center gap-2">
          <PanelLeftIcon className="size-4 text-muted-foreground" />
          <InputGroup variant="secondary" className="h-8 w-64 max-sm:w-full">
            <InputGroupAddon><SearchIcon className="size-3.5" /></InputGroupAddon>
            <InputGroupInput placeholder="Search for anything" aria-label="Search for anything" className="text-xs" />
            <InputGroupAddon align="inline-end"><Kbd>⌘ K</Kbd></InputGroupAddon>
          </InputGroup>
        </div>
        <p className="font-semibold text-2xl">Welcome, Alex</p>
        <div className="flex flex-wrap gap-1.5">
          <Button size="xs"><SendIcon data-icon="inline-start" />Send</Button>
          <Button size="xs" variant="tertiary"><ArrowLeftRightIcon data-icon="inline-start" />Transfer</Button>
          <Button size="xs" variant="tertiary"><DownloadIcon data-icon="inline-start" />Deposit</Button>
          <Button size="xs" variant="tertiary"><ArrowDownLeftIcon data-icon="inline-start" />Request</Button>
          <Button size="xs" variant="tertiary"><UploadIcon data-icon="inline-start" />Upload bill</Button>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_0.45fr]">
          <Card className="gap-2">
            <CardHeader className="px-0">
              <CardTitle className="flex items-center gap-1.5 text-xs">Current balance <BadgeCheckIcon className="size-3.5 text-primary" /></CardTitle>
              <CardAction>
                <ToggleGroup defaultValue={["chart"]} spacing={1} className="rounded-lg bg-default p-0.5">
                  <ToggleGroupItem value="chart" size="xs" variant="ghost" aria-label="Chart" className="h-6 rounded-md px-1.5 aria-pressed:bg-surface aria-pressed:text-primary"><BarChart3Icon /></ToggleGroupItem>
                  <ToggleGroupItem value="list" size="xs" variant="ghost" aria-label="List" className="h-6 rounded-md px-1.5 aria-pressed:bg-surface aria-pressed:text-primary"><ListIcon /></ToggleGroupItem>
                </ToggleGroup>
              </CardAction>
            </CardHeader>
            <p className="font-semibold text-3xl tabular-nums">$459,200.60</p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-muted-foreground">Last 30 days <ChevronDownIcon className="size-3" /></span>
              <span className="flex gap-3">
                <span className="text-success">↗ $128,420.00</span>
                <span className="text-destructive">↘ -$109,366.00</span>
              </span>
            </div>
            <ChartContainer config={balanceConfig} className="aspect-auto h-[130px] w-full">
              <AreaChart data={balance} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="bal" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="i" hide />
                <Area isAnimationActive={false} dataKey="v" type="natural" stroke="var(--color-v)" strokeWidth={2} fill="url(#bal)" />
              </AreaChart>
            </ChartContainer>
          </Card>
          <Card className="gap-2 max-lg:hidden">
            <CardDescription className="text-xs">Activity</CardDescription>
            {["Payroll run", "AWS invoice", "Client payment"].map((t, i) => (
              <div key={t} className="flex items-center justify-between text-[11px]">
                <span>{t}</span>
                <Badge size="sm" variant={i === 2 ? "success" : "default"}>{i === 2 ? "In" : "Out"}</Badge>
              </div>
            ))}
          </Card>
        </div>
        <Card className="gap-2 opacity-60">
          <CardHeader className="px-0">
            <CardDescription className="text-xs">Credit Card</CardDescription>
            <CardTitle className="font-semibold text-xl">$18,630.40</CardTitle>
          </CardHeader>
          <Progress value={36} size="sm" aria-label="Credit used" />
        </Card>
      </div>
    </div>
  )
}

const demos = ["Banking", "Maps", "Shopping", "Finance", "Travel", "Email"]

export function Agents() {
  const [demo, setDemo] = React.useState("Banking")
  return (
    <section id="agents" className="agents-scope site-container section-gap scroll-mt-24">
      <SectionHeader
        eyebrowTone="foreground"
        eyebrow={
          <>
            <span className="flex size-4 items-center justify-center rounded-[5px] bg-primary text-primary-foreground"><MessageSquareIcon className="size-2.5" /></span>
            HeroUI Agents (beta)
          </>
        }
        title="Turn every product into"
        muted="an AI-native experience."
        description="An agent that understands your product, takes action, and generates the right interface. It works for your users, inside your app."
      />
      <div className="mt-8 flex flex-col items-center gap-5 sm:mt-12">
        <div className="relative isolate w-full">
          <div className="relative h-[600px] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] max-sm:h-[668px] lg:h-[620px]">
            <div className="absolute inset-0 pe-0 lg:pe-[120px]">
              <BankingApp />
            </div>
            <div className="absolute top-4 right-0 bottom-auto max-md:inset-x-3 max-md:top-24 md:right-4">
              <AgentChatPanel key={demo} product={demo} className="w-[360px] max-md:w-full" />
            </div>
          </div>
        </div>
        <Tabs value={demo} onValueChange={(v) => setDemo(v as string)}>
          <TabsList variant="line" className="max-w-[calc(100vw-2.5rem)] gap-1 border-0 max-sm:justify-start">
            {demos.map((d) => (
              <TabsTrigger key={d} value={d} className="min-w-[72px] border-border border-b-2 text-xs data-[active]:text-primary">
                {d}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <FeatureRow
        items={[
          { icon: CodeXmlIcon, title: "Connect your stack", description: "Give the agent product data and actions while the signed-in user's permissions stay in place." },
          { icon: ShieldCheckIcon, title: "Gate sensitive actions", description: "Require explicit approval before the agent changes records, filters, or workflows." },
          { icon: SlidersHorizontalIcon, title: "Customize to your needs", description: "Match your agent to your product with full control over its design system, layout, and visual style." },
          { icon: BarChart3Icon, title: "See how your agent performs", description: "Track agent usage, users, conversations, performance, and activity from one place." },
        ]}
      />
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 max-sm:flex-nowrap max-sm:gap-2.5 sm:mt-12">
        <Button className="max-sm:flex-1">Request access</Button>
        <Button variant="tertiary" className={cn(ctaSecondary, "max-sm:flex-1")}>View all examples</Button>
      </div>
    </section>
  )
}
