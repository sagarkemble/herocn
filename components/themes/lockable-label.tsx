"use client";

import type {LockableThemeVariableKey} from "@/lib/theme-editor/constants";

import {InfoIcon, LockIcon, LockOpenIcon} from "lucide-react";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useThemeState} from "@/lib/theme-editor/state";
import {cn} from "cn";

import {t} from "./strings";

export function LockableLabel({
  label,
  tooltip,
  variable,
}: {
  label: string;
  variable: LockableThemeVariableKey;
  tooltip?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [state, setState] = useThemeState();
  const isLocked = state.lockedVariables.includes(variable);
  const toggle = () =>
    setState({
      lockedVariables: isLocked
        ? state.lockedVariables.filter((v) => v !== variable)
        : [...state.lockedVariables, variable],
    });

  return (
    <div
      className="flex h-6 items-center gap-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Label>{label}</Label>
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger delay={100} className="hidden xl:block" render={<span tabIndex={0} />}>
            <InfoIcon className="size-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ) : null}
      <Tooltip>
        <TooltipTrigger
          delay={100}
          render={
            <Button
              aria-label={isLocked ? t.lockableLabel.unlockValue : t.lockableLabel.lockValue}
              aria-pressed={isLocked}
              className={cn("hidden size-6 hover:flex", (hovered || isLocked) && "flex")}
              size="icon-xs"
              variant="ghost"
              onClick={toggle}
            />
          }
        >
          {isLocked ? <LockIcon /> : <LockOpenIcon />}
        </TooltipTrigger>
        <TooltipContent>{isLocked ? t.lockableLabel.unlockValue : t.lockableLabel.lockValue}</TooltipContent>
      </Tooltip>
    </div>
  );
}
