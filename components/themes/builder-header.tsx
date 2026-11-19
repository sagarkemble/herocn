"use client";

/** Port of HeroUI builder-header.tsx, reset-button.tsx, shuffle-button.tsx, switch-mode.tsx. */
import type {TabLabel} from "@/lib/theme-editor/constants";

import {CodeIcon, MoonIcon, RotateCcwIcon, Share2Icon, ShuffleIcon, SunIcon, Undo2Icon, Redo2Icon} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useRef, useState} from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Kbd} from "@/components/ui/kbd";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {
  LOCAL_STORAGE_KEYS,
  defaultThemeVariables,
  fontIds,
  radiusIds,
  radiusOptions,
  tabs,
} from "@/lib/theme-editor/constants";
import {useKeyPress, usePreviewTab, useThemeState, useUndoRedo} from "@/lib/theme-editor/state";
import {cn} from "cn";

import {t} from "./strings";
import {toastManager} from "./toast";

function Tip({label, children}: {label: React.ReactNode; children: React.ReactElement}) {
  return (
    <Tooltip>
      <TooltipTrigger delay={100} render={children} />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function BuilderHeader({codeOpen, onToggleCode}: {codeOpen: boolean; onToggleCode: () => void}) {
  const {canRedo, canUndo, redo, undo} = useUndoRedo();
  const [tab, setTab] = usePreviewTab();

  useKeyPress("ArrowLeft", () => undo(), {enabled: canUndo});
  useKeyPress("ArrowRight", () => redo(), {enabled: canRedo});

  const share = () => {
    void navigator.clipboard?.writeText(window.location.href).catch(() => {});
    toastManager.add({description: t.header.linkCopiedDescription, title: t.header.linkCopied, type: "success"});
  };

  return (
    <div className="sticky top-0 z-50 mb-3 flex h-14 w-full items-center justify-center bg-background px-2 min-[1200px]:mb-4 min-[1200px]:px-0">
      <h1 className="sr-only">{t.themes.heading}</h1>
      <div className="flex h-14 w-full max-w-[1400px] items-center justify-between">
        <div className="flex items-center gap-4">
          <a aria-label="hero home" className="flex items-center gap-2 font-display font-semibold text-[22px] leading-none tracking-[-0.04em]" href="/">
            <span aria-hidden className="flex h-[0.85em] w-[0.7em] items-end gap-[0.12em]">
              <span className="h-full w-[0.24em] rounded-[0.08em] bg-foreground" />
              <span className="h-3/4 w-[0.24em] rounded-[0.08em] bg-foreground" />
            </span>
            hero
          </a>
          <div className="flex items-center gap-3">
            <Tip label={<>{t.header.undo} <Kbd>←</Kbd></>}>
              <Button aria-label={t.header.undo} className="hidden min-[1200px]:inline-flex" disabled={!canUndo} size="icon" variant="tertiary" onClick={undo}>
                <Undo2Icon />
              </Button>
            </Tip>
            <Tip label={<>{t.header.redo} <Kbd>→</Kbd></>}>
              <Button aria-label={t.header.redo} className="hidden min-[1200px]:inline-flex" disabled={!canRedo} size="icon" variant="tertiary" onClick={redo}>
                <Redo2Icon />
              </Button>
            </Tip>
            <Separator className="hidden h-6 self-center min-[1200px]:block" orientation="vertical" />
            <ResetButton />
            <div className="hidden sm:block">
              <ShuffleButton />
            </div>
          </div>
        </div>
        <div className="relative hidden min-[1200px]:block">
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabLabel)}>
            <TabsList>
              {tabs.map((x) => (
                <TabsTrigger key={x.label} className="whitespace-nowrap" value={x.label}>
                  {t.tabs[x.label]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex w-auto justify-end gap-3 min-[1200px]:w-[244px]">
          <SwitchMode />
          <Tip label={t.header.share}>
            <Button aria-label={t.header.share} size="icon" variant="tertiary" onClick={share}>
              <Share2Icon />
            </Button>
          </Tip>
          <Tip label={t.header.viewCode}>
            <Button
              aria-label={t.header.viewCode}
              aria-pressed={codeOpen}
              className="hidden min-[1200px]:inline-flex"
              size="icon"
              variant={codeOpen ? "default" : "tertiary"}
              onClick={onToggleCode}
            >
              <CodeIcon />
            </Button>
          </Tip>
        </div>
      </div>
    </div>
  );
}

/** Light/dark switch (HeroUI ThemeToggle mode="light-dark"), as the skill's Tabs segmented control. */
export function SwitchMode({label}: {label?: string}) {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useKeyPress("s", () => setTheme(resolvedTheme === "light" ? "dark" : "light"));

  return (
    <div className={cn("flex flex-col gap-1", !label && "h-9")}>
      {label ? <Label>{label}</Label> : null}
      <Tooltip>
        <TooltipTrigger delay={100} render={<div />}>
          <Tabs value={mounted ? (resolvedTheme ?? "light") : "light"} onValueChange={(v) => setTheme(v as string)}>
            <TabsList aria-label={t.header.switchMode} className="h-9">
              <TabsTrigger aria-label="Light" value="light">
                <SunIcon />
              </TabsTrigger>
              <TabsTrigger aria-label="Dark" value="dark">
                <MoonIcon />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </TooltipTrigger>
        <TooltipContent>
          {t.header.switchMode} <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function isDefault(v: {chroma: number; hue: number; lightness: number; fontFamily: string; formRadius: string; radius: string; base: number}) {
  const d = defaultThemeVariables;

  return (
    v.chroma === d.chroma &&
    v.hue === d.hue &&
    v.lightness === d.lightness &&
    v.fontFamily === d.fontFamily &&
    v.formRadius === d.formRadius &&
    v.radius === d.radius &&
    v.base === d.base
  );
}

export function ResetButton() {
  const [state, setState] = useThemeState();
  const [open, setOpen] = useState(false);
  const disabled = isDefault(state);

  // "d" opens the dialog (heroui.com); always captured here so the app-wide "d" dark-mode key stays off.
  useKeyPress("d", () => !disabled && setOpen(true), {capture: true});

  return (
    <>
      <Tip label={<>{t.resetButton.tooltip} <Kbd>D</Kbd></>}>
        <Button aria-label={t.resetButton.tooltip} disabled={disabled} size="icon" variant="tertiary" onClick={() => setOpen(true)}>
          <RotateCcwIcon />
        </Button>
      </Tip>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <RotateCcwIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>{t.resetButton.dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{t.resetButton.dialogBody}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row">
            <AlertDialogCancel className="order-2 w-full sm:order-1 sm:w-auto">{t.resetButton.cancel}</AlertDialogCancel>
            <Button
              className="order-1 w-full sm:order-2 sm:w-auto"
              onClick={() => {
                setState({...defaultThemeVariables, lockedVariables: []});
                setOpen(false);
              }}
            >
              {t.resetButton.confirm}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/** Port of HeroUI useRandomizeVariables. */
function useRandomize() {
  const [state, setState] = useThemeState();

  return () => {
    const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;
    const truncate2 = (v: number) => Math.round(v * 100) / 100;
    const inRange = (min: number, max: number) => truncate2(min + Math.random() * (max - min));
    const locked = state.lockedVariables;

    setState({
      base: locked.includes("base") ? state.base : Math.random() * 0.02,
      chroma: locked.includes("chroma") ? state.chroma : inRange(0.1, 0.26),
      fontFamily: locked.includes("fontFamily") ? state.fontFamily : pick(fontIds),
      formRadius: locked.includes("formRadius") ? state.formRadius : pick(radiusIds),
      hue: locked.includes("hue") ? state.hue : Math.floor(Math.random() * 360),
      lightness: locked.includes("lightness") ? state.lightness : inRange(0.5, 0.85),
      radius: locked.includes("radius") ? state.radius : pick(radiusOptions.map((r) => r.id)),
    });
  };
}

export function ShuffleButton({enableKeyboardShortcut = true}: {enableKeyboardShortcut?: boolean}) {
  const [dontShow, setDontShow] = useState(false);
  const [open, setOpen] = useState(false);
  const randomize = useRandomize();
  const [state] = useThemeState();
  const snapshot = useRef(state);
  const randomizing = useRef(false);

  const run = () => {
    randomizing.current = true;
    randomize();
  };
  const trigger = () => {
    const s = snapshot.current;
    const same =
      state.chroma === s.chroma &&
      state.hue === s.hue &&
      state.lightness === s.lightness &&
      state.fontFamily === s.fontFamily &&
      state.formRadius === s.formRadius &&
      state.radius === s.radius &&
      state.base === s.base;

    if (same || localStorage.getItem(LOCAL_STORAGE_KEYS.SHUFFLE_WARNING_SHOWN) === "true") return run();
    setOpen(true);
  };

  useKeyPress("r", trigger, {enabled: enableKeyboardShortcut});
  useEffect(() => {
    if (randomizing.current) {
      snapshot.current = state;
      randomizing.current = false;
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-1">
      <Tip label={<>{t.shuffleButton.tooltip} <Kbd>R</Kbd></>}>
        <Button aria-label={t.shuffleButton.tooltip} size="icon" variant="tertiary" onClick={trigger}>
          <ShuffleIcon />
        </Button>
      </Tip>
      <AlertDialog
        open={open}
        onOpenChange={(o) => {
          setDontShow(false);
          setOpen(o);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <ShuffleIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>{t.shuffleButton.dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{t.shuffleButton.dialogBody}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row sm:items-center">
            <AlertDialogCancel className="order-2 w-full sm:order-2 sm:w-auto">{t.shuffleButton.cancel}</AlertDialogCancel>
            <Button
              className="order-1 w-full sm:order-3 sm:w-auto"
              onClick={() => {
                run();
                if (dontShow) localStorage.setItem(LOCAL_STORAGE_KEYS.SHUFFLE_WARNING_SHOWN, JSON.stringify(true));
                setOpen(false);
              }}
            >
              {t.shuffleButton.confirm}
            </Button>
            <div className="order-3 flex flex-1 items-center gap-2 self-start sm:order-1 sm:self-center">
              <Checkbox checked={dontShow} id="dont-show-again" variant="secondary" onCheckedChange={(c) => setDontShow(c === true)} />
              <Label htmlFor="dont-show-again">{t.shuffleButton.dontShowAgain}</Label>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
