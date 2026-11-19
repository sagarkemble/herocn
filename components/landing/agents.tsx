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
  HeartIcon,
  HomeIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  ListIcon,
  ListTodoIcon,
  MapPinIcon,
  MessageSquareIcon,
  MinusIcon,
  PanelLeftIcon,
  PieChartIcon,
  PlusIcon,
  ReceiptIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SlidersHorizontalIcon,
  StarIcon,
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
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AgentChatPanel } from "./mocks"
import { DesktopMail } from "./open-source"
import { FeatureRow, SectionHeader, Sparkline, ctaSecondary } from "./ui-bits"

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

const demos = ["Banking", "Maps", "Shopping", "Finance", "Travel", "Email"] as const
type Demo = (typeof demos)[number]

function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full overflow-hidden rounded-[22px] bg-background text-xs ring-4 ring-foreground/5">
      {children}
    </div>
  )
}

function MapsApp() {
  const places = [
    { n: "Obelisco", d: "San Nicolás", t: "Landmark · 45 min", a: "50 m away", c: "from-[#1e3a5f] to-[#64748b]" },
    { n: "Teatro Colón", d: "San Nicolás", t: "Culture · 90 min", a: "300 m away", c: "from-[#334155] to-[#94a3b8]" },
    { n: "Casa Rosada", d: "Monserrat", t: "Landmark · 60 min", a: "1.1 km away", c: "from-[#7c2d12] to-[#d6d3d1]" },
    { n: "Caminito", d: "La Boca", t: "Culture · 90 min", a: "3.8 km away", c: "from-[#1e3a8a] to-[#38bdf8]" },
  ]
  return (
    <AppFrame>
      <div className="relative size-full overflow-hidden bg-[#12151c]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div aria-hidden className="absolute inset-[8%_18%_28%_12%] rounded-[40%] bg-[#1c2430]" />
        <p className="absolute top-[38%] left-[42%] font-semibold text-[11px] tracking-[0.28em] text-foreground/80">BUENOS AIRES</p>
        {[
          ["32%", "34%"],
          ["44%", "42%"],
          ["52%", "48%"],
          ["58%", "40%"],
        ].map(([t, l], i) => (
          <span key={i} className="absolute grid size-6 place-items-center rounded-full bg-foreground/90 text-background shadow" style={{ top: t, left: l }}>
            <MapPinIcon className="size-3" />
          </span>
        ))}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <Button size="icon-xs" variant="secondary" aria-label="Zoom in"><PlusIcon /></Button>
          <Button size="icon-xs" variant="secondary" aria-label="Zoom out"><MinusIcon /></Button>
        </div>
        <div className="absolute inset-x-3 bottom-3 flex gap-2 overflow-hidden">
          {places.map((p) => (
            <Card key={p.n} size="sm" className="w-[200px] shrink-0 gap-2 p-2">
              <div className={cn("h-16 rounded-xl bg-linear-to-br", p.c)} />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{p.n}</p>
                  <p className="text-[10px] text-muted-foreground">{p.d}</p>
                </div>
                <Badge size="sm">{p.a}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{p.t}</span>
                <Button size="xs" variant="tertiary">View</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppFrame>
  )
}

function ShoppingApp() {
  const [price, setPrice] = React.useState<number[]>([15, 80])
  const items = [
    { n: "Drift Runner", p: "$128.00", s: "Bone", c: "from-[#e7e0d4] to-[#cbbfae]" },
    { n: "Harbor Court", p: "$116.00", s: "Oat", c: "from-[#f3efe6] to-[#d6d3d1]" },
    { n: "Field Day Trainer", p: "$138.00", s: "Graphite", c: "from-[#52525b] to-[#a1a1aa]" },
    { n: "Trail Peak", p: "$142.00", s: "Olive", c: "from-[#3f4f3a] to-[#a3b18a]" },
    { n: "Court Slip", p: "$98.00", s: "Sand", c: "from-[#f5f0e6] to-[#d6c7b0]" },
    { n: "Harbor Knit", p: "$124.00", s: "Navy", c: "from-[#1e3a5f] to-[#64748b]" },
  ]
  return (
    <AppFrame>
      <div className="flex size-full flex-col gap-3 p-4">
        <div>
          <p className="text-[10px] text-primary">Common Form</p>
          <p className="font-semibold text-base">Shop the Collection</p>
          <p className="text-muted-foreground">Search considered essentials, or ask the shopping agent for a shortlist.</p>
        </div>
        <div className="flex items-center gap-2">
          <InputGroup variant="secondary" className="h-8 flex-1">
            <InputGroupAddon><SearchIcon className="size-3.5" /></InputGroupAddon>
            <InputGroupInput placeholder="Search sneakers, tees, materials…" aria-label="Search products" className="text-xs" />
          </InputGroup>
          <span className="text-muted-foreground">20 results</span>
          <Button size="xs" variant="tertiary"><ShoppingBagIcon data-icon="inline-start" />Bag</Button>
        </div>
        <div className="flex min-h-0 flex-1 gap-3">
          <aside className="hidden w-[180px] shrink-0 flex-col gap-3 rounded-2xl bg-default/60 p-3 md:flex">
            <p className="font-medium">Filters</p>
            <div className="flex flex-col gap-1">
              {["All products", "Shoes", "T-shirts", "Outerwear"].map((l, i) => (
                <Button key={l} variant="ghost" size="xs" className={cn("h-7 justify-start font-normal", i === 0 && "bg-surface")}>{l}</Button>
              ))}
            </div>
            <p className="font-medium">Price Range</p>
            <Slider aria-label="Price range" value={price} onValueChange={(v) => setPrice(Array.isArray(v) ? [...v] : [v])} min={0} max={100} />
            <div className="flex gap-1">
              <Input variant="secondary" aria-label="Min price" defaultValue="$30" className="h-7 text-[10px]" />
              <Input variant="secondary" aria-label="Max price" defaultValue="$200" className="h-7 text-[10px]" />
            </div>
            <div className="flex items-center justify-between">
              <span>In-stock only</span>
              <Switch size="sm" defaultChecked aria-label="In-stock only" />
            </div>
            <Button size="xs" variant="tertiary">Clear all filters</Button>
          </aside>
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 overflow-hidden lg:grid-cols-3">
            {items.map((it) => (
              <Card key={it.n} size="sm" className="gap-2 p-2">
                <div className="relative">
                  <div className={cn("aspect-square rounded-xl bg-linear-to-br", it.c)} />
                  <Button size="icon-xs" variant="secondary" aria-label="Save" className="absolute top-1.5 right-1.5"><HeartIcon /></Button>
                </div>
                <p className="text-[10px] text-muted-foreground">Shoes · {it.s}</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{it.n}</p>
                  <p className="tabular-nums">{it.p}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><StarIcon className="size-3 fill-warning text-warning" /> 4.7</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  )
}

const finCurve = [22, 28, 24, 32, 30, 38, 26, 34, 48, 44, 52, 58].map((v, i) => ({ i: String(i), v }))
const finConfig = { v: { label: "Portfolio", color: "var(--primary)" } } satisfies ChartConfig

function FinanceApp() {
  const holdings = [
    { s: "BTC", n: "Bitcoin", v: "$1,283.84", d: "+2.34%", up: true, c: "bg-warning" },
    { s: "USDC", n: "USDC", v: "$2,087.25", d: "+0.01%", up: true, c: "bg-primary" },
    { s: "ETH", n: "Ethereum", v: "$1,087.25", d: "-1.12%", up: false, c: "bg-muted-foreground" },
    { s: "SOL", n: "Solana", v: "$195.54", d: "+4.72%", up: true, c: "bg-success" },
  ]
  return (
    <AppFrame>
      <aside className="hidden w-[170px] shrink-0 flex-col gap-0.5 p-3 md:flex">
        <div className="mb-3 flex items-center gap-2">
          <Avatar size="sm"><AvatarFallback className="bg-primary-soft text-primary-soft-foreground">FP</AvatarFallback></Avatar>
          <div className="leading-tight">
            <p className="font-medium">Fred Palmer</p>
            <p className="text-[10px] text-muted-foreground">fred@heroui.dev</p>
          </div>
        </div>
        {[
          [LayoutDashboardIcon, "Dashboard"],
          [PieChartIcon, "Portfolio"],
          [WalletIcon, "Spending"],
          [ArrowLeftRightIcon, "Transactions"],
          [SettingsIcon, "Settings"],
        ].map(([I, l], i) => {
          const Icon = I as typeof HomeIcon
          return (
            <Button key={l as string} variant="ghost" size="xs" className={cn("h-8 justify-start gap-2 rounded-xl px-2 font-normal", i === 0 && "bg-default font-medium")}>
              <Icon className="size-3.5" />
              {l as string}
            </Button>
          )
        })}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 md:border-s md:border-border">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-sm">Good afternoon, Fred</p>
          <div className="flex gap-1">
            <Button size="xs" variant="tertiary">Swap</Button>
            <Button size="xs" variant="tertiary">Receive</Button>
            <Button size="xs">Send</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[
            ["Total balance", "$5,427.48", "+5.32%"],
            ["24h change", "$120.18", "+2.24%"],
            ["Top performer", "SOL 4.72", "+4.72%"],
            ["Holdings", "8", "Assets"],
          ].map(([l, v, d]) => (
            <Card key={l} size="sm" className="gap-1 px-3">
              <CardDescription className="text-[10px]">{l}</CardDescription>
              <p className="font-semibold tabular-nums">{v}</p>
              <p className="text-[10px] text-success">{d}</p>
            </Card>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 gap-2 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="gap-2">
            <CardHeader className="px-0">
              <CardTitle className="text-xs">Portfolio</CardTitle>
              <CardAction><Badge size="sm">1M</Badge></CardAction>
            </CardHeader>
            <p className="font-semibold text-lg tabular-nums">$5,427.48</p>
            <ChartContainer config={finConfig} className="aspect-auto h-[110px] w-full">
              <AreaChart data={finCurve} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="fin" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="i" hide />
                <Area isAnimationActive={false} dataKey="v" type="natural" stroke="var(--color-v)" strokeWidth={2} fill="url(#fin)" />
              </AreaChart>
            </ChartContainer>
          </Card>
          <Card className="gap-1.5 max-lg:hidden">
            <CardDescription className="text-xs">Holdings</CardDescription>
            {holdings.map((h) => (
              <div key={h.s} className="flex items-center gap-2">
                <span className={cn("grid size-6 place-items-center rounded-full text-[9px] text-primary-foreground", h.c)}>{h.s[0]}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{h.s}</p>
                  <p className="text-[10px] text-muted-foreground">{h.n}</p>
                </div>
                <Sparkline values={h.up ? [2, 3, 3, 4, 5] : [5, 4, 4, 3, 2]} className={cn("h-4 w-10", h.up ? "text-success" : "text-destructive")} strokeWidth={1.25} />
                <div className="text-end">
                  <p className="tabular-nums">{h.v}</p>
                  <p className={cn("text-[10px]", h.up ? "text-success" : "text-destructive")}>{h.d}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
        <Card className="gap-1 p-2 max-sm:hidden">
          <Table className="text-[10px]">
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Contract interaction</TableCell>
                <TableCell>ETH</TableCell>
                <TableCell>0.123 ETH</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Received</TableCell>
                <TableCell>USDC</TableCell>
                <TableCell>500.00 USDC</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppFrame>
  )
}

function TravelApp() {
  return (
    <AppFrame>
      <div className="flex size-full flex-col gap-3 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] text-primary">Travel workspace</p>
            <p className="font-semibold text-base">Trip Planner</p>
            <p className="text-muted-foreground">Explore destinations, compare costs, and turn a shortlist into an itinerary.</p>
          </div>
          <Badge size="sm" variant="success">Rome guide ready</Badge>
        </div>
        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1e3a5f] via-[#334155] to-[#0f172a]">
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-2 flex gap-1">
                <Badge size="sm">Europe</Badge>
                <Badge size="sm">Best Apr · May</Badge>
              </div>
              <p className="text-[10px] text-background/80">Italy</p>
              <p className="font-semibold text-2xl text-background">Rome</p>
              <p className="text-background/80">Ancient ruins, baroque piazzas, and carbonara done right.</p>
              <p className="mt-2 text-[10px] text-background/80">$700 avg flight · $120/day</p>
            </div>
          </div>
          <Card className="gap-2">
            <CardHeader className="px-0">
              <CardTitle className="text-xs">Trip canvas</CardTitle>
              <CardAction><Badge size="sm" variant="success">$120/day</Badge></CardAction>
            </CardHeader>
            <Tabs defaultValue="guide">
              <TabsList className="w-auto!">
                <TabsTrigger value="guide" className="text-[11px]">Guide</TabsTrigger>
                <TabsTrigger value="budget" className="text-[11px]">Budget</TabsTrigger>
              </TabsList>
            </Tabs>
            {[
              ["1", "Ancient Rome", "Colosseo and Forum at opening."],
              ["2", "Vatican day", "Museums early, St. Peter’s at dusk."],
              ["3", "Centro storico", "Pantheon, Piazza Navona, espresso."],
              ["4", "Art and appetite", "Villa Borghese and Testaccio market."],
            ].map(([n, t, d]) => (
              <div key={n} className="flex gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-default font-medium">{n}</span>
                <div>
                  <p className="font-medium">{t}</p>
                  <p className="text-[10px] text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select items={[{ label: "Any", value: "any" }]} defaultValue="any">
            <SelectTrigger size="sm" aria-label="Travel month" className="h-8 w-32"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="any">Any month</SelectItem></SelectContent>
          </Select>
          <Select items={[{ label: "All regions", value: "all" }]} defaultValue="all">
            <SelectTrigger size="sm" aria-label="Region" className="h-8 w-32"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">All regions</SelectItem></SelectContent>
          </Select>
        </div>
      </div>
    </AppFrame>
  )
}

function EmailApp() {
  const [sel, setSel] = React.useState(4)
  return (
    <AppFrame>
      <DesktopMail selected={sel} onSelect={setSel} />
    </AppFrame>
  )
}

function DemoApp({ demo }: { demo: Demo }) {
  if (demo === "Maps") return <MapsApp />
  if (demo === "Shopping") return <ShoppingApp />
  if (demo === "Finance") return <FinanceApp />
  if (demo === "Travel") return <TravelApp />
  if (demo === "Email") return <EmailApp />
  return <BankingApp />
}

export function Agents() {
  const [demo, setDemo] = React.useState<Demo>("Banking")
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
          <div className="relative h-[600px] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] max-sm:h-[668px] lg:h-[740px]">
            <div className="absolute inset-0 pe-0 lg:pe-[120px]">
              <DemoApp key={demo} demo={demo} />
            </div>
            <div className="absolute top-4 right-0 bottom-auto max-md:inset-x-3 max-md:top-24 md:right-4">
              <AgentChatPanel key={demo} product={demo} className="w-[360px] max-md:w-full md:min-h-[656px]" />
            </div>
          </div>
        </div>
        <Tabs value={demo} onValueChange={(v) => setDemo(v as Demo)}>
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
        <Button className="max-sm:h-10 max-sm:flex-1">Request access</Button>
        <Button variant="tertiary" className={cn(ctaSecondary, "max-sm:flex-1")}>View all examples</Button>
      </div>
    </section>
  )
}
