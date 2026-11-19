"use client";

import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {t} from "./strings";

const STORAGE_KEY = "onboarding";

export function Onboarding() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) == null) setOpen(true);
  }, []);

  const continueOnboarding = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) continueOnboarding();
        else setOpen(true);
      }}
    >
      <DialogContent className="max-w-[480px]" showCloseButton={false}>
        <style>{`
          @keyframes theme-onboard-outer {
            0%, 100% { border-radius: 24px; background-color: #3b82f6; }
            25% { border-radius: 8px; background-color: #6366f1; }
            50% { border-radius: 0px; background-color: #10b981; }
            75% { border-radius: 12px; background-color: #f97316; }
          }
          @keyframes theme-onboard-inner {
            0%, 100% { background-color: #93c5fd; }
            25% { background-color: #a5b4fc; }
            50% { background-color: #6ee7b7; }
            75% { background-color: #fdba74; }
          }
        `}</style>
        <div
          aria-hidden
          className="mx-auto flex size-16 items-center justify-center overflow-hidden"
          style={{animation: "theme-onboard-outer 4s ease-in-out infinite"}}
        >
          <div
            className="size-8"
            style={{animation: "theme-onboard-inner 4s ease-in-out infinite"}}
          />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle>{t.onboarding.title}</DialogTitle>
          <DialogDescription>{t.onboarding.description}</DialogDescription>
        </DialogHeader>
        <p className="text-center text-muted-foreground text-sm">{t.onboarding.moreComing}</p>
        <DialogFooter>
          <Button className="w-full" onClick={continueOnboarding}>
            {t.onboarding.continue}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
