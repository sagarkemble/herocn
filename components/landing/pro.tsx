"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  ChartColumnIcon,
  ColumnsIcon,
  CopyIcon,
  FilterIcon,
  GlobeIcon,
  HomeIcon,
  LayoutTemplateIcon,
  MoreHorizontalIcon,
  PackageIcon,
  PaletteIcon,
  PanelLeftIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  SettingsIcon,
  SmartphoneIcon,
  ArchiveIcon,
  SquarePenIcon,
  Trash2Icon,
  ArrowUpDownIcon,
  Columns3Icon,
  ListChecksIcon,
  type LucideIcon,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AgentChatPanel, ProChatMock } from "./mocks"
import { DesktopMail } from "./open-source"
import { FeatureRow, SectionHeader, Sparkline, ctaSecondary } from "./ui-bits"

const ctaDark = "bg-foreground text-background hover:bg-foreground/85"

/* ---------------- six component previews ---------------- */
function CommandPreview() {
  return (
    <Command className="w-[300px] rounded-2xl shadow-lg">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandGroup heading="Actions">
          {[
            { i: SquarePenIcon, l: "Create New Project", k: ["⌘", "N"] },
            { i: CopyIcon, l: "Duplicate", k: ["⌘", "D"] },
            { i: ArchiveIcon, l: "Archive", k: ["⌘", "⇧", "A"] },
            { i: Trash2Icon, l: "Delete", k: ["⌘", "⌫"] },
          ].map((c) => (
            <CommandItem key={c.l}>
              <c.i /> {c.l}
              <CommandShortcut className="flex gap-0.5">
                {c.k.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function KanbanPreview() {
  return (
    <div className="flex w-[360px] gap-3">
      {[
        {
          col: "To Do",
          n: 3,
          cards: [
            { t: "Redesign onboarding flow", d: "Revamp the 3-step onboarding to reduce drop-off rate", c: 6, s: 3 },
            { t: "Set up error monitoring", d: "Integrate alerts for production errors", c: 2, s: 1 },
          ],
        },
        { col: "In progress", n: 2, cards: [{ t: "Migrate auth", d: "Replace session auth with OAuth 2.0", c: 1, s: 0 }] },
      ].map((col) => (
        <div key={col.col} className="flex w-[200px] shrink-0 flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="flex items-center gap-1.5 font-semibold text-sm">
              {col.col} <Badge size="sm">{col.n}</Badge>
            </span>
            <span className="flex gap-0.5">
              <Button size="icon-xs" variant="ghost" aria-label="More"><MoreHorizontalIcon /></Button>
              <Button size="icon-xs" variant="secondary" aria-label="Add"><PlusIcon /></Button>
            </span>
          </div>
          {col.cards.map((c) => (
            <Card key={c.t} size="sm" className="gap-2 px-3">
              <p className="font-medium text-xs">{c.t}</p>
              <p className="text-[11px] text-muted-foreground leading-snug">{c.d}</p>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex gap-2"><span>☐ {c.c}</span><span>◌ {c.s}</span></span>
                <Avatar size="sm" className="size-4"><AvatarFallback className="bg-primary text-[7px] text-primary-foreground">A</AvatarFallback></Avatar>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  )
}

function StatsPreview() {
  return (
    <Card className="w-[230px] flex-row items-end justify-between gap-2 shadow-lg">
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-muted-foreground text-xs"><ChartColumnIcon className="size-3.5" /> Total Clicks</span>
        <span className="font-semibold text-2xl tabular-nums">2,441</span>
        <span className="flex items-center gap-1 text-[11px]"><span className="text-success">↑ 3.8%</span><span className="text-muted-foreground">vs 30d</span></span>
      </div>
      <Sparkline values={[4, 6, 5, 9, 7, 10, 8, 12, 9, 13]} className="h-12 w-20 text-primary" strokeWidth={1.75} />
    </Card>
  )
}

function FiltersPreview() {
  const [range, setRange] = React.useState<number[]>([20, 75])
  const hist = [3, 5, 4, 7, 9, 6, 11, 8, 12, 10, 7, 9, 13, 8, 6, 9, 5, 4]
  return (
    <Card className="w-[260px] gap-3 shadow-lg">
      <p className="font-semibold text-sm">What are you looking for?</p>
      <div className="flex flex-col gap-1.5">
        <span className="font-medium text-xs">Type of place</span>
        <ToggleGroup defaultValue={["any"]} spacing={1} className="w-full rounded-xl bg-default p-0.5">
          {[
            ["any", "Any type"],
            ["room", "Room"],
            ["home", "Entire home"],
          ].map(([v, l]) => (
            <ToggleGroupItem key={v} value={v} size="xs" variant="ghost" className="flex-1 rounded-lg text-[11px] aria-pressed:bg-surface aria-pressed:text-foreground aria-pressed:shadow-sm">
              {l}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-medium text-xs">Price Range</span>
        <div className="flex h-10 items-end gap-[3px] px-1">
          {hist.map((h, i) => {
            const pct = (i / (hist.length - 1)) * 100
            return <span key={i} className={cn("flex-1 rounded-t-sm", pct >= range[0] && pct <= range[1] ? "bg-primary" : "bg-default")} style={{ height: `${h * 7.5}%` }} />
          })}
        </div>
        <Slider aria-label="Price range" value={range} onValueChange={(v) => setRange(Array.isArray(v) ? [...v] : [v])} min={0} max={100} />
        <div className="flex gap-2">
          <Input variant="secondary" aria-label="Minimum" defaultValue="$ 100" className="h-7 text-xs" />
          <Input variant="secondary" aria-label="Maximum" defaultValue="$ 1,000" className="h-7 text-xs" />
        </div>
      </div>
    </Card>
  )
}

function AgendaPreview() {
  return (
    <div className="flex w-[300px] gap-4">
      <div className="flex flex-col items-center pt-1">
        <span className="text-muted-foreground text-xs">Wed</span>
        <span className="font-semibold text-3xl">18</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {[
          { t: "Daily standup", h: "9:30 – 10:00 AM", c: "bg-primary" },
          { t: "Design sync 1:1", h: "2:00 – 3:00 PM", c: "bg-success", join: true },
          { t: "Product call", h: "4:00 – 5:00 PM", c: "bg-destructive" },
        ].map((e) => (
          <Card key={e.t} size="sm" className={cn("flex-row items-center gap-2.5 px-3", !e.join && "bg-default shadow-none")}>
            <span className={cn("h-8 w-1 rounded-full", e.c)} />
            <div className="flex-1">
              <p className="font-medium text-xs">{e.t}</p>
              <p className="text-[10px] text-muted-foreground">{e.h}</p>
            </div>
            {e.join && <Button size="xs" variant="ghost">Join</Button>}
          </Card>
        ))}
      </div>
    </div>
  )
}

const gridRows = [
  { id: "US-West-1", s: "Active", lat: "22ms", cost: "$24,845", trend: [3, 4, 3, 5, 6, 5, 7] },
  { id: "US-East-2", s: "Active", lat: "18ms", cost: "$32,120", trend: [5, 4, 6, 5, 7, 6, 8] },
  { id: "EU-Central-1", s: "Degraded", lat: "64ms", cost: "$14,210", trend: [6, 5, 7, 4, 5, 3, 4] },
  { id: "AP-South-1", s: "Active", lat: "41ms", cost: "$9,860", trend: [2, 3, 3, 4, 3, 5, 6] },
  { id: "US-West-2", s: "Paused", lat: "—", cost: "$0", trend: [4, 4, 3, 2, 2, 1, 1] },
]

function DataGridPreview({ wide = false }: { wide?: boolean }) {
  return (
    <Card className={cn("gap-2 p-2 shadow-lg", wide ? "w-full" : "w-[420px]")}>
      <div className="flex items-center gap-1.5">
        <Button size="xs" variant="tertiary"><FilterIcon data-icon="inline-start" />Filter</Button>
        <Button size="xs" variant="tertiary"><ArrowUpDownIcon data-icon="inline-start" />Sort</Button>
        <Button size="xs" variant="tertiary"><Columns3Icon data-icon="inline-start" />Columns</Button>
        <InputGroup variant="secondary" className="ms-auto h-7 w-28">
          <InputGroupAddon><SearchIcon className="size-3" /></InputGroupAddon>
          <InputGroupInput placeholder="Search" aria-label="Search rows" className="text-xs" />
        </InputGroup>
      </div>
      <Table className="whitespace-nowrap text-[11px]">
        <TableHeader>
          <TableRow>
            <TableHead>Region</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Latency</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gridRows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.id}</TableCell>
              <TableCell>
                <Badge size="sm" variant={r.s === "Active" ? "success" : r.s === "Degraded" ? "warning" : "default"}>{r.s}</Badge>
              </TableCell>
              <TableCell>{r.lat}</TableCell>
              <TableCell className="tabular-nums">{r.cost}</TableCell>
              <TableCell>
                <Sparkline values={r.trend} className="h-4 w-12 text-primary" strokeWidth={1.25} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

const previews: { name: string; node: React.ReactNode }[] = [
  { name: "Command", node: <CommandPreview /> },
  { name: "Kanban", node: <KanbanPreview /> },
  { name: "Stats", node: <StatsPreview /> },
  { name: "Filters", node: <FiltersPreview /> },
  { name: "Agenda", node: <AgendaPreview /> },
  { name: "DataGrid", node: <DataGridPreview /> },
]

/* ---------------- template dashboard ---------------- */
const salesData = [32, 52, 28, 20, 45, 30, 32, 26, 12, 48, 42, 34].map((v, i) => ({ d: String(i + 1).padStart(2, "0"), v }))
const trafficData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => ({
  m,
  organic: [6, 12, 14, 11, 17, 13, 18, 20, 20, 21, 24, 17][i],
  paid: [4, 9, 11, 13, 9, 15, 10, 14, 18, 16, 20, 15][i],
}))
const salesConfig = { v: { label: "Sales", color: "var(--foreground)" } } satisfies ChartConfig
const trafficConfig = {
  organic: { label: "Organic", color: "var(--muted-foreground)" },
  paid: { label: "Paid Ads", color: "var(--foreground)" },
} satisfies ChartConfig

function Kpi({ label, value, delta, up = true }: { label: string; value: string; delta: string; up?: boolean }) {
  return (
    <Card size="sm" className="gap-1 px-3">
      <CardDescription className="text-xs">{label}</CardDescription>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-xl tabular-nums">{value}</span>
        <Badge size="sm" variant={up ? "success" : "destructive"}>
          {up ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {delta}
        </Badge>
      </div>
    </Card>
  )
}

const dashNav: { i: LucideIcon; l: string; badge?: string }[] = [
  { i: HomeIcon, l: "Dashboard" },
  { i: PackageIcon, l: "Orders" },
  { i: ListChecksIcon, l: "Tracker", badge: "New" },
  { i: ChartColumnIcon, l: "Analytics" },
  { i: SettingsIcon, l: "Settings" },
]

function DashboardTemplate() {
  return (
    <div className="flex size-full gap-3 bg-background/55 p-3 text-sm backdrop-blur-xl [&_[data-slot=card]]:bg-surface/70">
      <aside className="flex w-[200px] shrink-0 flex-col gap-1 max-md:hidden">
        <div className="mb-3 flex items-center gap-2 px-1">
          <Avatar><AvatarFallback className="bg-primary-soft text-primary-soft-foreground">KM</AvatarFallback></Avatar>
          <div className="leading-tight">
            <p className="font-medium text-sm">Kate Moore</p>
            <p className="text-muted-foreground text-xs">Admin</p>
          </div>
        </div>
        {dashNav.map((n, i) => (
          <Button key={n.l} variant="ghost" size="sm" className={cn("justify-start gap-2 rounded-xl font-normal", i === 0 && "bg-default font-medium")}>
            <n.i />
            <span className="flex-1 text-start">{n.l}</span>
            {n.badge && <Badge size="sm" variant="success">{n.badge}</Badge>}
          </Button>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-3xl bg-surface/70 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PanelLeftIcon className="size-4 text-muted-foreground" />
            <p className="font-semibold text-lg">Good morning, Kate</p>
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon-sm" variant="ghost" aria-label="Search"><SearchIcon /></Button>
            <Button size="icon-sm" variant="ghost" aria-label="Notifications"><BellIcon /></Button>
            <Button size="sm" className={ctaDark}><PlusIcon data-icon="inline-start" />Invite</Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Tabs defaultValue="overview">
            <TabsList className="w-auto!">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-1.5">
            <Button size="icon-sm" variant="ghost" aria-label="Refresh"><RefreshCwIcon /></Button>
            <Select items={[{ label: "Monthly", value: "monthly" }, { label: "Weekly", value: "weekly" }]} defaultValue="monthly">
              <SelectTrigger size="sm" aria-label="Period" className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className={ctaDark}>Download</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <Kpi label="Revenue" value="$228,441" delta="3.3%" />
          <Kpi label="Expenses" value="$25,108" delta="3.3%" up={false} />
          <Kpi label="Sales" value="458" delta="3.3%" />
          <Kpi label="Profit" value="$203,133" delta="4.1%" />
        </div>
        <div className="grid min-h-0 flex-1 gap-2 md:grid-cols-2">
          <Card size="sm" className="gap-2 px-3">
            <CardHeader className="flex flex-row items-center justify-between px-0">
              <CardTitle>Sales Performance</CardTitle>
              <Badge size="sm">Last 2 weeks</Badge>
            </CardHeader>
            <div className="flex gap-4 text-xs">
              {[
                ["$28,441", "Weekly Sales"],
                ["$4,063", "Daily Sales"],
                ["278", "Total Sales"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-semibold text-sm">{v} <span className="font-normal text-[10px] text-success">↑ 3.2%</span></p>
                  <p className="text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
            <ChartContainer config={salesConfig} className="aspect-auto h-[200px] w-full">
              <BarChart data={salesData} margin={{ left: -24, right: 0, top: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <defs>
                  <linearGradient id="bar-fade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--color-v)" stopOpacity={0.75} />
                    <stop offset="1" stopColor="var(--color-v)" stopOpacity={0.18} />
                  </linearGradient>
                </defs>
                <Bar isAnimationActive={false} dataKey="v" fill="url(#bar-fade)" barSize={12} radius={6} />
              </BarChart>
            </ChartContainer>
          </Card>
          <Card size="sm" className="gap-2 px-3">
            <CardHeader className="flex flex-row items-center justify-between px-0">
              <CardTitle>Traffic Source</CardTitle>
              <span className="flex items-center gap-3 text-muted-foreground text-xs">
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-muted-foreground" />Organic</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-foreground" />Paid Ads</span>
              </span>
            </CardHeader>
            <div>
              <p className="font-semibold text-sm">231,856</p>
              <p className="text-muted-foreground text-xs">Sessions</p>
            </div>
            <ChartContainer config={trafficConfig} className="aspect-auto h-[200px] w-full">
              <LineChart data={trafficData} margin={{ left: -24, right: 4, top: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line isAnimationActive={false} dataKey="organic" stroke="var(--color-organic)" strokeWidth={1.5} dot={false} />
                <Line isAnimationActive={false} dataKey="paid" stroke="var(--color-paid)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ChartContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}

const templates = ["Dashboard", "Mail", "Chat", "CRM", "Finances"] as const

function TemplateBody({ name }: { name: (typeof templates)[number] }) {
  if (name === "Dashboard") return <DashboardTemplate />
  if (name === "Mail")
    return (
      <div className="flex size-full justify-center bg-background/60 p-4 backdrop-blur-xl">
        <div className="h-full w-full max-w-[900px]"><DesktopMailWrapper /></div>
      </div>
    )
  if (name === "Chat")
    return (
      <div className="flex size-full items-center justify-center gap-6 bg-background/60 p-6 backdrop-blur-xl">
        <ProChatMock className="w-[360px]" />
        <AgentChatPanel product="Support" count={3} className="max-md:hidden" />
      </div>
    )
  return (
    <div className="flex size-full flex-col gap-3 bg-background/60 p-4 backdrop-blur-xl">
      {name === "Finances" && (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <Kpi label="Revenue" value="$228,441" delta="3.3%" />
          <Kpi label="Expenses" value="$25,108" delta="3.3%" up={false} />
          <Kpi label="Sales" value="458" delta="3.3%" />
          <Kpi label="Profit" value="$203,133" delta="4.1%" />
        </div>
      )}
      <DataGridPreview wide />
    </div>
  )
}

function DesktopMailWrapper() {
  const [sel, setSel] = React.useState(0)
  return <DesktopMail selected={sel} onSelect={setSel} />
}

export function Pro() {
  const [theme, setTheme] = React.useState("Glass")
  return (
    <>
      <section id="pro" className="site-container section-gap scroll-mt-24">
        <SectionHeader
          eyebrowTone="foreground"
          eyebrow={
            <>
              <LayoutTemplateIcon className="size-4" />
              HeroUI Pro
            </>
          }
          title="Move faster"
          muted="with HeroUI Pro."
          description="Components, templates, and AI tooling for React and React Native. Made for teams that care about the details."
        />
        <ul className="relative mt-5 flex gap-3 max-sm:-mx-5 max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-5 max-sm:pt-3 max-sm:pb-4 max-sm:[scrollbar-width:none] sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {previews.map((p) => (
            <li key={p.name} className="max-sm:w-[280px] max-sm:shrink-0 max-sm:snap-start">
              <a href="#" className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm">
                <div className="relative m-1 flex items-center justify-center overflow-hidden rounded-[20px] bg-background max-sm:aspect-[360/256] sm:h-64">
                  <div className="pointer-events-none scale-[0.85] max-sm:scale-[0.64] transition-transform duration-[400ms] ease-out group-hover:scale-[0.87]">{p.node}</div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-surface to-transparent" />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <h3 className="font-medium text-sm">{p.name}</h3>
                  <span className="flex gap-1.5 text-muted-foreground">
                    <GlobeIcon className="size-3.5" aria-label="Web" />
                    <SmartphoneIcon className="size-3.5" aria-label="Mobile" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        {/* mobile scroll indicator (decorative) */}
        <div aria-hidden className="mt-1 flex justify-center gap-1.5 sm:hidden">
          {previews.map((p, k) => (
            <span key={p.name} className={cn("h-1 rounded-full bg-foreground/15", k === 0 ? "w-5 bg-foreground/70" : "w-1")} />
          ))}
        </div>
      </section>

      {/* full-bleed templates frame */}
      <div className="relative mt-14 w-full sm:mt-20 sm:px-4">
        <div className="relative flex flex-col items-center overflow-hidden rounded-[48px] border border-foreground/10 px-4 pt-12 [mask-image:linear-gradient(black_88%,transparent)] max-lg:rounded-[36px] max-md:rounded-[28px] max-md:pt-8 max-sm:h-[620px] max-sm:[mask-image:none] max-sm:pt-11">
          <div aria-hidden className="absolute inset-0 wall-template" />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background),transparent_39.5%)]" />
          <div className="relative flex flex-col items-center text-center max-sm:[&_h2]:text-[30px] max-sm:[&_h2]:leading-[34px]">
            <SectionHeader
              align="center"
              eyebrow="Pro templates"
              title="Start closer to finished."
              description="Full-page, responsive templates for dashboards, CRM, mail, chat, and finance. Strong structure from the first commit."
            />
          </div>
          <Tabs defaultValue="Dashboard" className="relative mt-6 w-full items-center sm:mt-8">
            <TabsList className="w-auto! max-w-full overflow-x-auto bg-surface/50 backdrop-blur-xl max-sm:justify-start">
              {templates.map((t) => (
                <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
              ))}
            </TabsList>
            {templates.map((t) => (
              <TabsContent key={t} value={t} className="w-full p-0">
                <div className="relative mx-auto mt-1 aspect-[1192/700] w-full max-w-[1192px] overflow-hidden rounded-[28px] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_40px_80px_rgb(29_15_53/0.14)] max-lg:rounded-[20px] max-sm:mt-7 max-sm:aspect-auto max-sm:h-[628px] max-sm:w-[290px] max-sm:rounded-[32px]">
                  <div className="size-full max-sm:h-[133.33%] max-sm:w-[133.33%] max-sm:origin-top-left max-sm:scale-75">
                    <TemplateBody name={t} />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] bg-[linear-gradient(to_top,var(--background)_25%,color-mix(in_oklab,var(--background)_70%,transparent)_60%,transparent)] max-sm:h-[120px]" />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="relative flex justify-center max-sm:mt-6 sm:-mt-[52px]">
          <Tabs value={theme} onValueChange={(v) => setTheme(v as string)}>
            <TabsList variant="line" className="border-0">
              {["Glass", "Mouve", "Brutalism", "Default"].map((t) => (
                <TabsTrigger key={t} value={t} className="text-xs">{t}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="site-container sm:pt-3">
        <FeatureRow
          grid
          items={[
            { icon: PaletteIcon, title: "Premium components", description: "Kanban, data grid, charts, command menu, and more." },
            { icon: LayoutTemplateIcon, title: "Full templates", description: "Complete apps for web and mobile, ready to make your own." },
            { icon: ColumnsIcon, title: "Design systems", description: "Figma files and themes that stay in sync with code." },
            { icon: SmartphoneIcon, title: "Web and mobile", description: "The same design language across web, iOS, and Android." },
          ]}
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 max-sm:flex-nowrap max-sm:gap-2.5 sm:mt-12">
          <Button className="max-sm:h-10 max-sm:flex-1">Explore HeroUI Pro</Button>
          <Button variant="tertiary" className={cn(ctaSecondary, "max-sm:flex-1")}>View pricing</Button>
        </div>
      </div>
    </>
  )
}
