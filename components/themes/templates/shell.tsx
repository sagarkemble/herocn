"use client";

import type {LucideIcon} from "lucide-react";
import {CircleHelpIcon, LogOutIcon, PanelLeftIcon} from "lucide-react";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardDescription} from "@/components/ui/card";

export type TemplateNavItem = {
  title: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
};

export function TemplateShell({
  user,
  nav,
  heading,
  actions,
  children,
}: {
  user: {name: string; caption: string; initials: string};
  nav: TemplateNavItem[];
  heading: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 w-full bg-background text-sm">
      <aside className="flex w-52 shrink-0 flex-col gap-1 p-3 max-md:hidden">
        <div className="mb-3 flex items-center gap-2 px-1">
          <Avatar>
            <AvatarFallback className="bg-primary-soft text-primary-soft-foreground">{user.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-medium">{user.name}</p>
            <p className="truncate text-muted-foreground text-xs">{user.caption}</p>
          </div>
        </div>
        {nav.map((item) => (
          <Button
            key={item.title}
            className="w-full justify-start"
            size="sm"
            variant={item.active ? "secondary" : "ghost"}
          >
            <item.icon data-icon="inline-start" />
            <span className="flex-1 text-start">{item.title}</span>
            {item.badge ? (
              <Badge size="sm" variant="success">
                {item.badge}
              </Badge>
            ) : null}
          </Button>
        ))}
        <div className="mt-auto flex flex-col gap-1">
          <Button className="w-full justify-start" size="sm" variant="ghost">
            <CircleHelpIcon data-icon="inline-start" />
            Help & Information
          </Button>
          <Button className="w-full justify-start" size="sm" variant="ghost">
            <LogOutIcon data-icon="inline-start" />
            Log out
          </Button>
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <PanelLeftIcon className="size-4 shrink-0 text-muted-foreground" />
            <h2 className="truncate font-semibold text-lg">{heading}</h2>
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-1">{actions}</div> : null}
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

export function KpiCard({
  label,
  value,
  delta,
  up = true,
  suffix,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  suffix?: string;
}) {
  return (
    <Card size="sm">
      <CardDescription>{label}</CardDescription>
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-xl tabular-nums">{value}</span>
        {suffix ? <span className="text-muted-foreground text-sm">{suffix}</span> : null}
        {delta ? (
          <Badge size="sm" variant={up ? "success" : "destructive"}>
            {up ? "↑" : "↓"} {delta}
          </Badge>
        ) : null}
      </div>
    </Card>
  );
}
