"use client";

/**
 * URL-backed theme state, matching heroui.com/themes (nuqs `useQueryStates`, history "push",
 * clearOnDefault): every change pushes a history entry; params equal to their default are removed.
 * Undo/redo mirrors HeroUI's `useUndoRedo` (own stack + history.back()/forward()).
 */
import type {LockableThemeVariableKey, RadiusId, TabLabel, ThemeVariables} from "./constants";

import {useCallback, useEffect, useRef, useState, useSyncExternalStore} from "react";

import {defaultThemeVariables, radiusIds, tabLabels, themeVariableKeys} from "./constants";

export type ThemeState = ThemeVariables & {
  lockedVariables: LockableThemeVariableKey[];
  vibrantPalette: boolean;
};

const DEFAULTS: ThemeState = {
  ...defaultThemeVariables,
  lockedVariables: [],
  vibrantPalette: false,
};

const KEYS = [
  "base",
  "chroma",
  "fontFamily",
  "formRadius",
  "hue",
  "lightness",
  "lockedVariables",
  "radius",
  "vibrantPalette",
] as const;

const listeners = new Set<() => void>();
const LOCATION_EVENT = "theme-builder:location";

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  window.addEventListener(LOCATION_EVENT, cb);

  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
    window.removeEventListener(LOCATION_EVENT, cb);
  };
}

const getSearch = () => window.location.search;
const getServerSearch = () => "";

/* nuqs parsers */
const parseFloatParam = (v: string | null, d: number) => {
  if (v === null) return d;
  const n = parseFloat(v);

  return Number.isNaN(n) ? d : n;
};
const parseRadius = (v: string | null, d: RadiusId): RadiusId =>
  v !== null && (radiusIds as readonly string[]).includes(v) ? (v as RadiusId) : d;

export function parseState(search: string): ThemeState {
  const p = new URLSearchParams(search);
  const locked = p.get("lockedVariables");

  return {
    base: parseFloatParam(p.get("base"), DEFAULTS.base),
    chroma: parseFloatParam(p.get("chroma"), DEFAULTS.chroma),
    fontFamily: p.get("fontFamily") ?? DEFAULTS.fontFamily,
    formRadius: parseRadius(p.get("formRadius"), DEFAULTS.formRadius),
    hue: parseFloatParam(p.get("hue"), DEFAULTS.hue),
    lightness: parseFloatParam(p.get("lightness"), DEFAULTS.lightness),
    lockedVariables: locked
      ? (locked
          .split(",")
          .filter((k) => (themeVariableKeys as readonly string[]).includes(k)) as LockableThemeVariableKey[])
      : [],
    radius: parseRadius(p.get("radius"), DEFAULTS.radius),
    vibrantPalette: p.get("vibrantPalette") === "true",
  };
}

function serialize(key: (typeof KEYS)[number], value: unknown): string | null {
  const d = DEFAULTS[key];

  if (key === "lockedVariables") {
    const arr = value as string[];

    return arr.length === 0 ? null : arr.join(",");
  }
  if (value === d) return null;

  return String(value);
}

const cache = {search: "\u0000", state: DEFAULTS};

function stateFor(search: string): ThemeState {
  if (cache.search !== search) {
    cache.search = search;
    cache.state = parseState(search);
  }

  return cache.state;
}

export function navigate(search: string) {
  const url = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;

  window.history.pushState(window.history.state, "", url);
  window.dispatchEvent(new Event(LOCATION_EVENT));
}

export function useThemeState(): [ThemeState, (next: Partial<ThemeState>) => void] {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const state = stateFor(search);

  const setState = useCallback((next: Partial<ThemeState>) => {
    const current = parseState(window.location.search);
    const merged = {...current, ...next};
    const params = new URLSearchParams(window.location.search);

    for (const key of KEYS) {
      if (!(key in next)) continue;
      const s = serialize(key, merged[key]);

      if (s === null) params.delete(key);
      else params.set(key, s);
    }
    const nextSearch = params.toString();

    if (nextSearch !== window.location.search.slice(1)) navigate(nextSearch);
  }, []);

  return [state, setState];
}

export function usePreviewTab(): [TabLabel, (tab: TabLabel) => void] {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const raw = new URLSearchParams(search).get("template");
  const tab = (tabLabels as readonly string[]).includes(raw ?? "") ? (raw as TabLabel) : "components";
  const setTab = useCallback((t: TabLabel) => {
    const params = new URLSearchParams(window.location.search);

    if (t === "components") params.delete("template");
    else params.set("template", t);
    navigate(params.toString());
  }, []);

  return [tab, setTab];
}

/** Port of HeroUI `useUndoRedo` (apps/docs/src/app/[lang]/themes/hooks/use-undo-redo.ts). */
export function useUndoRedo() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const historyStack = useRef<string[]>([]);
  const currentIndex = useRef(-1);
  const isNavigating = useRef(false);
  const lastSearchParams = useRef<string | null>(null);

  useEffect(() => {
    const currentParams = search.replace(/^\?/, "");

    if (currentParams === lastSearchParams.current) return;
    lastSearchParams.current = currentParams;
    if (isNavigating.current) {
      isNavigating.current = false;

      return;
    }
    historyStack.current = historyStack.current.slice(0, currentIndex.current + 1);
    historyStack.current.push(currentParams);
    currentIndex.current = historyStack.current.length - 1;
    setCanUndo(currentIndex.current > 0);
    setCanRedo(false);
  }, [search]);

  useEffect(() => {
    const onPop = () => {
      const currentParams = window.location.search.slice(1);
      const newIndex = historyStack.current.indexOf(currentParams);

      if (newIndex !== -1 && newIndex !== currentIndex.current) {
        currentIndex.current = newIndex;
        lastSearchParams.current = currentParams;
        setCanUndo(newIndex > 0);
        setCanRedo(newIndex < historyStack.current.length - 1);
      }
    };

    window.addEventListener("popstate", onPop);

    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const undo = useCallback(() => {
    if (currentIndex.current > 0) {
      isNavigating.current = true;
      currentIndex.current--;
      setCanUndo(currentIndex.current > 0);
      setCanRedo(true);
      window.history.back();
    }
  }, []);

  const redo = useCallback(() => {
    if (currentIndex.current < historyStack.current.length - 1) {
      isNavigating.current = true;
      currentIndex.current++;
      setCanUndo(true);
      setCanRedo(currentIndex.current < historyStack.current.length - 1);
      window.history.forward();
    }
  }, []);

  return {canRedo, canUndo, redo, undo};
}

/**
 * Port of HeroUI `useKeyPress` (apps/docs/src/hooks/use-key-press.ts): window keydown, ignored in
 * form fields, exact modifier match. `capture` + `preventDefault` is used only for "d", so the
 * app-wide "d" dark-mode hotkey (components/theme-provider.tsx skips defaultPrevented events) does
 * not fire on this page, where "d" opens the reset dialog like on heroui.com.
 */
export function useKeyPress(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: {enabled?: boolean; capture?: boolean} = {},
) {
  const {capture = false, enabled = true} = options;
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      )
        return;
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (capture) event.preventDefault();
      cbRef.current(event);
    };

    window.addEventListener("keydown", handler, capture);

    return () => window.removeEventListener("keydown", handler, capture);
  }, [key, enabled, capture]);
}
