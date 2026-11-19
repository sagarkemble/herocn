"use client";

import type {TabLabel} from "@/lib/theme-editor/constants";

import {ChatTemplate} from "./chat";
import {CrmTemplate} from "./crm";
import {DashboardTemplate} from "./dashboard";
import {FinancesTemplate} from "./finances";
import {MailTemplate} from "./mail";

export function DemoTemplates({tab}: {tab: Exclude<TabLabel, "components">}) {
  const preview =
    tab === "dashboard" ? (
      <DashboardTemplate />
    ) : tab === "mail" ? (
      <MailTemplate />
    ) : tab === "chat" ? (
      <ChatTemplate />
    ) : tab === "finances" ? (
      <FinancesTemplate />
    ) : (
      <CrmTemplate />
    );

  return <div className="flex h-full min-h-0 w-full">{preview}</div>;
}
