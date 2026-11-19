"use client";

import {
  ArrowDownToLineIcon,
  ArrowLeftRightIcon,
  ArrowUpRightIcon,
  ChartColumnIcon,
  HomeIcon,
  PercentIcon,
  ReceiptIcon,
  SendIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle} from "@/components/ui/item";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {KpiCard, TemplateShell} from "./shell";

const history = [
  {day: "Mon", value: 4820},
  {day: "Tue", value: 4950},
  {day: "Wed", value: 5102},
  {day: "Thu", value: 5018},
  {day: "Fri", value: 5288},
  {day: "Sat", value: 5340},
  {day: "Sun", value: 5427},
];
const chartConfig = {
  value: {color: "var(--primary)", label: "Balance"},
} satisfies ChartConfig;

const holdings = [
  {asset: "Bitcoin", change: "+2.34%", initials: "B", symbol: "BTC", up: true, value: "$1,283.84"},
  {asset: "USDC", change: "+0.01%", initials: "U", symbol: "USDC", up: true, value: "$2,087.25"},
  {asset: "Ethereum", change: "-1.12%", initials: "E", symbol: "ETH", up: false, value: "$1,087.25"},
  {asset: "BNB Chain", change: "+0.92%", initials: "B", symbol: "BNB", up: true, value: "$165.20"},
  {asset: "Solana", change: "+4.72%", initials: "S", symbol: "SOL", up: true, value: "$195.54"},
];

const activity = [
  {asset: "ETH", date: "Dec 8, 2025 · 12:32 PM", hash: "0xaa2bf905d3…", type: "Contract Interaction", usd: "$320.65", value: "0.12312453 ETH"},
  {asset: "USDC", date: "Dec 7, 2025 · 11:43 AM", hash: "0xbb4e0d712f…", type: "Received", usd: "$500.00", value: "500.00 USDC"},
  {asset: "ETH", date: "Nov 28, 2025 · 08:14 AM", hash: "0xcc1a2f4e39…", type: "Sent", usd: "$3,384.10", value: "1.42 ETH"},
  {asset: "BTC", date: "Oct 5, 2025 · 06:21 PM", hash: "0xdd6b5a1635…", type: "Swapped", usd: "$9,385.22", value: "0.1543 BTC"},
  {asset: "SOL", date: "Oct 2, 2025 · 02:12 PM", hash: "0xee7c6f5410…", type: "Received", usd: "$2,692.16", value: "12.4 SOL"},
  {asset: "USDC", date: "Sep 29, 2025 · 09:54 AM", hash: "0xff9d0a7102…", type: "Sent", usd: "$850.00", value: "850.00 USDC"},
];

export function FinancesTemplate() {
  return (
    <TemplateShell
      heading="Good afternoon, Fred"
      nav={[
        {active: true, icon: HomeIcon, title: "Dashboard"},
        {icon: WalletIcon, title: "Portfolio"},
        {icon: ChartColumnIcon, title: "Spending"},
        {icon: ReceiptIcon, title: "Transactions"},
        {badge: "New", icon: PercentIcon, title: "Earn"},
        {icon: SettingsIcon, title: "Settings"},
      ]}
      user={{caption: "fred@heroui.dev", initials: "FP", name: "Fred Palmer"}}
      actions={
        <>
          <Button size="sm" variant="tertiary">
            <ArrowLeftRightIcon data-icon="inline-start" />
            Swap
          </Button>
          <Button size="sm" variant="tertiary">
            <ArrowDownToLineIcon data-icon="inline-start" />
            Receive
          </Button>
          <Button size="sm">
            <SendIcon data-icon="inline-start" />
            Send
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <KpiCard delta="5.32%" label="Total balance" value="$5,427.48" />
          <KpiCard delta="2.24%" label="24h change" value="$120.18" />
          <KpiCard delta="4.72%" label="Top performer · SOL" value="4.72%" />
          <KpiCard label="Holdings" suffix="Assets" value="8" />
        </div>
        <div className="grid gap-2 xl:grid-cols-[1.4fr_1fr]">
          <Card size="sm">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>Sample holdings and historical performance</CardDescription>
              </div>
              <Tabs defaultValue="1m">
                <TabsList className="w-auto">
                  {["1D", "1W", "1M", "3M", "1Y", "All"].map((range) => (
                    <TabsTrigger key={range} value={range.toLowerCase()}>
                      {range}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            <div>
              <p className="text-muted-foreground text-xs">Total balance</p>
              <p className="font-semibold text-xl tabular-nums">$5,427.48</p>
              <p className="text-success text-xs">↑ +8.16% 1M</p>
            </div>
            <ChartContainer className="aspect-auto h-48 w-full" config={chartConfig}>
              <AreaChart accessibilityLayer data={history}>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="day" tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="value" fill="var(--color-value)" fillOpacity={0.15} stroke="var(--color-value)" type="monotone" />
              </AreaChart>
            </ChartContainer>
          </Card>
          <Card size="sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Holdings</CardTitle>
              <Badge>8</Badge>
            </CardHeader>
            <ItemGroup>
              {holdings.map((item) => (
                <Item key={item.symbol} size="sm" variant="transparent">
                  <ItemMedia variant="icon">
                    <Avatar size="sm">
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{item.symbol}</ItemTitle>
                    <ItemDescription>{item.asset}</ItemDescription>
                  </ItemContent>
                  <div className="text-end">
                    <div className="text-sm">{item.value}</div>
                    <div className={item.up ? "text-success text-xs" : "text-destructive text-xs"}>
                      {item.up ? <ArrowUpRightIcon className="inline size-3" /> : null}
                      {item.change}
                    </div>
                  </div>
                </Item>
              ))}
            </ItemGroup>
            <Button variant="tertiary">See all holdings</Button>
          </Card>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Recent activity</h3>
            <span className="text-muted-foreground text-sm">8</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Txn #</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.map((row) => (
                <TableRow key={row.hash}>
                  <TableCell className="font-medium">{row.hash}</TableCell>
                  <TableCell>
                    <Badge>{row.type}</Badge>
                  </TableCell>
                  <TableCell>{row.asset}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{row.value}</span>
                      <span className="text-muted-foreground text-xs">{row.usd}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TemplateShell>
  );
}
