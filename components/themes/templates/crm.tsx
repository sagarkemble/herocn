"use client";

import {
  Building2Icon,
  FilterIcon,
  HomeIcon,
  KanbanIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Progress} from "@/components/ui/progress";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {KpiCard, TemplateShell} from "./shell";

const columns = [
  {
    n: 3,
    title: "New",
    deals: [
      {c: 6, company: "Northwind", d: "Renewal close for Q2 seats", name: "Northwind renewal", owner: "AT", s: 3, value: "$18,400"},
      {c: 2, company: "Acme", d: "Website rebuild scoping", name: "Acme website", owner: "ED", s: 1, value: "$9,200"},
    ],
  },
  {
    n: 2,
    title: "Qualified",
    deals: [
      {c: 4, company: "Globex", d: "Expansion to 120 seats", name: "Globex seats", owner: "JS", s: 2, value: "$42,000"},
      {c: 1, company: "Initech", d: "API access for billing", name: "Initech API", owner: "KM", s: 0, value: "$12,800"},
    ],
  },
  {
    n: 1,
    title: "Negotiation",
    deals: [{c: 3, company: "Umbrella", d: "Support retainer + SLA", name: "Umbrella support", owner: "MW", s: 2, value: "$27,500"}],
  },
  {
    n: 1,
    title: "Won",
    deals: [{c: 8, company: "Hooli", d: "Onboarding completed", name: "Hooli onboarding", owner: "SJ", s: 0, value: "$61,000"}],
  },
];

const accounts = [
  {amount: "$18,400", company: "Northwind", health: 40, owner: "Alex Turner", stage: "New"},
  {amount: "$42,000", company: "Globex", health: 72, owner: "John Smith", stage: "Qualified"},
  {amount: "$27,500", company: "Umbrella", health: 81, owner: "Mike Wilson", stage: "Negotiation"},
  {amount: "$61,000", company: "Hooli", health: 96, owner: "Sara Johnson", stage: "Won"},
];

export function CrmTemplate() {
  return (
    <TemplateShell
      heading="Pipeline"
      nav={[
        {icon: HomeIcon, title: "Dashboard"},
        {active: true, icon: KanbanIcon, title: "Deals"},
        {icon: Building2Icon, title: "Accounts"},
        {icon: UsersIcon, title: "Contacts"},
        {icon: SettingsIcon, title: "Settings"},
      ]}
      user={{caption: "Sales", initials: "MO", name: "Maya Okafor"}}
      actions={
        <>
          <Button aria-label="Search" size="icon-sm" variant="ghost">
            <SearchIcon />
          </Button>
          <Button size="sm">
            <PlusIcon data-icon="inline-start" />
            New deal
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <KpiCard label="Pipeline" value="$170,900" />
          <KpiCard label="Open deals" value="6" />
          <KpiCard label="Won" value="$61,000" />
          <KpiCard label="Accounts" value="4" />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Button size="xs" variant="tertiary">
            <FilterIcon data-icon="inline-start" />
            Filter
          </Button>
          <InputGroup className="ms-auto w-48" variant="secondary">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search deals" />
          </InputGroup>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="flex items-center gap-1.5 font-semibold">
                  {column.title} <Badge size="sm">{column.n}</Badge>
                </span>
                <span className="flex gap-0.5">
                  <Button aria-label="More" size="icon-xs" variant="ghost">
                    <MoreHorizontalIcon />
                  </Button>
                  <Button aria-label="Add" size="icon-xs" variant="secondary">
                    <PlusIcon />
                  </Button>
                </span>
              </div>
              {column.deals.map((deal) => (
                <Card key={deal.name} size="sm">
                  <p className="font-medium">{deal.name}</p>
                  <p className="text-muted-foreground text-xs">{deal.d}</p>
                  <div className="flex items-center justify-between text-muted-foreground text-xs">
                    <span>{deal.value}</span>
                    <Avatar size="sm">
                      <AvatarFallback>{deal.owner}</AvatarFallback>
                    </Avatar>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Accounts</h3>
            <span className="text-muted-foreground text-sm">4</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((row) => (
                <TableRow key={row.company}>
                  <TableCell className="font-medium">{row.company}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>
                    <Badge>{row.stage}</Badge>
                  </TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell className="min-w-40">
                    <Progress value={row.health} />
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
