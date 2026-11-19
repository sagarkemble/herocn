"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  ChartColumnIcon,
  Columns3Icon,
  CopyIcon,
  EyeIcon,
  FilterIcon,
  HomeIcon,
  ListChecksIcon,
  MoreHorizontalIcon,
  PackageIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import {Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {KpiCard, TemplateShell} from "./shell";

const salesData = [32, 52, 28, 20, 45, 30, 32, 26, 12, 48, 42, 34].map((v, i) => ({
  d: String(i + 1).padStart(2, "0"),
  v,
}));
const trafficData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => ({
  m,
  organic: [6, 12, 14, 11, 17, 13, 18, 20, 20, 21, 24, 17][i],
  paid: [4, 9, 11, 13, 9, 15, 10, 14, 18, 16, 20, 15][i],
}));
const salesConfig = {v: {color: "var(--primary)", label: "Sales"}} satisfies ChartConfig;
const trafficConfig = {
  organic: {color: "var(--primary)", label: "Organic"},
  paid: {color: "color-mix(in oklab, var(--primary) 55%, var(--background))", label: "Paid Ads"},
} satisfies ChartConfig;

const periodItems = [
  {label: "Monthly", value: "monthly"},
  {label: "Weekly", value: "weekly"},
];
const rangeItems = [
  {label: "Last week", value: "last-week"},
  {label: "Last 2 weeks", value: "last-2-weeks"},
  {label: "Last month", value: "last-month"},
  {label: "Last 3 months", value: "last-3-months"},
];

const team = [
  {id: "#4586936", initials: "AT", name: "Alex Turner", email: "alex@acme.com", role: "Product Manager"},
  {id: "#4586937", initials: "ED", name: "Emma Davis", email: "emma@acme.com", role: "Senior Designer"},
  {id: "#4586933", initials: "JS", name: "John Smith", email: "john@acme.com", role: "Chief Technology Officer"},
  {id: "#4586932", initials: "KM", name: "Kate Moore", email: "kate@acme.com", role: "Chief Executive Officer"},
  {id: "#4586935", initials: "MW", name: "Mike Wilson", email: "mike@acme.com", role: "VP of Engineering"},
  {id: "#4586934", initials: "SJ", name: "Sara Johnson", email: "sara@acme.com", role: "Chief Marketing Officer"},
];

export function DashboardTemplate() {
  return (
    <TemplateShell
      heading="Good morning, Kate"
      nav={[
        {active: true, icon: HomeIcon, title: "Dashboard"},
        {icon: PackageIcon, title: "Orders"},
        {badge: "New", icon: ListChecksIcon, title: "Tracker"},
        {icon: ChartColumnIcon, title: "Analytics"},
        {icon: SettingsIcon, title: "Settings"},
      ]}
      user={{caption: "Admin", initials: "KM", name: "Kate Moore"}}
      actions={
        <>
          <Button aria-label="Search" size="icon-sm" variant="ghost">
            <SearchIcon />
          </Button>
          <Button aria-label="Notifications" size="icon-sm" variant="ghost">
            <BellIcon />
          </Button>
          <Button size="sm">
            <PlusIcon data-icon="inline-start" />
            Invite
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Tabs defaultValue="overview">
            <TabsList className="w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-1.5">
            <Button aria-label="Refresh" size="icon-sm" variant="ghost">
              <RefreshCwIcon />
            </Button>
            <Select defaultValue="monthly" items={periodItems}>
              <SelectTrigger aria-label="Period" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {periodItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size="sm">Download</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <KpiCard delta="3.3%" label="Revenue" value="$228,441" />
          <KpiCard delta="3.3%" label="Expenses" up={false} value="$25,108" />
          <KpiCard delta="3.3%" label="Sales" value="458" />
          <KpiCard delta="4.1%" label="Profit" value="$203,133" />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <Card size="sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sales Performance</CardTitle>
              <Select defaultValue="last-2-weeks" items={rangeItems}>
                <SelectTrigger aria-label="Sales range" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {rangeItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>
            <div className="flex gap-4 text-xs">
              {[
                ["$28,441", "Weekly Sales"],
                ["$4,063", "Daily Sales"],
                ["278", "Total Sales"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-semibold text-sm">
                    {v}{" "}
                    <span className="font-normal text-success text-xs">
                      <ArrowUpIcon className="inline size-3" /> 3.3%
                    </span>
                  </p>
                  <p className="text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
            <ChartContainer className="aspect-auto h-[200px] w-full" config={salesConfig}>
              <BarChart data={salesData} margin={{bottom: 0, left: -24, right: 0, top: 4}}>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="d" fontSize={10} tickLine={false} />
                <YAxis axisLine={false} fontSize={10} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar barSize={12} dataKey="v" fill="var(--color-v)" isAnimationActive={false} radius={6} />
              </BarChart>
            </ChartContainer>
          </Card>
          <Card size="sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Traffic Source</CardTitle>
              <span className="flex items-center gap-3 text-muted-foreground text-xs">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-primary" />
                  Organic
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-primary/50" />
                  Paid Ads
                </span>
                <Button aria-label="More options" size="icon-xs" variant="ghost">
                  <MoreHorizontalIcon />
                </Button>
              </span>
            </CardHeader>
            <div>
              <p className="font-semibold text-sm">231,856</p>
              <p className="text-muted-foreground text-xs">Sessions</p>
            </div>
            <ChartContainer className="aspect-auto h-[200px] w-full" config={trafficConfig}>
              <LineChart data={trafficData} margin={{bottom: 0, left: -24, right: 4, top: 4}}>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="m" fontSize={10} tickLine={false} />
                <YAxis axisLine={false} fontSize={10} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="organic" dot={false} isAnimationActive={false} stroke="var(--color-organic)" strokeWidth={1.5} />
                <Line dataKey="paid" dot={false} isAnimationActive={false} stroke="var(--color-paid)" strokeWidth={1.5} />
              </LineChart>
            </ChartContainer>
          </Card>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">All Employees</h3>
            <span className="text-muted-foreground text-sm">32</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Button size="xs" variant="tertiary">
              <FilterIcon data-icon="inline-start" />
              Filter
            </Button>
            <Button size="xs" variant="tertiary">
              <ArrowDownIcon data-icon="inline-start" />
              Sort
            </Button>
            <Button size="xs" variant="tertiary">
              <Columns3Icon data-icon="inline-start" />
              Columns
            </Button>
            <InputGroup className="ms-auto w-40" variant="secondary">
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput aria-label="Search employees" placeholder="Search..." />
            </InputGroup>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Worker Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">
                    <span className="inline-flex items-center gap-1">
                      {row.id}
                      <Button aria-label="Copy ID" size="icon-xs" variant="ghost">
                        <CopyIcon />
                      </Button>
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback>{row.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{row.name}</span>
                        <span className="text-muted-foreground text-xs">{row.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Badge>Employee</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button aria-label="View" size="icon-xs" variant="ghost">
                        <EyeIcon />
                      </Button>
                      <Button aria-label="Edit" size="icon-xs" variant="ghost">
                        <PencilIcon />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button aria-label="Delete" size="icon-xs" variant="ghost" />}>
                          <Trash2Icon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TemplateShell>
  );
}
