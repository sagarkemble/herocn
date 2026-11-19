"use client";

/**
 * Custom sliders, as on heroui.com/themes:
 * - `ChannelSlider`: react-aria `ColorSlider` behaviour (step snapping, arrows = step, PageUp/Down = page
 *   step, Home/End) with a gradient track and round thumb. Used for hue channels.
 * - `ChromaSlider`: port of HeroUI's ChromaSlider (apps/docs/.../themes/components/chroma-slider.tsx).
 */
import {useCallback, useRef} from "react";

import {cn} from "cn";

const thumbClass =
  "pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white shadow-lg";

function usePointerDrag(trackRef: React.RefObject<HTMLDivElement | null>, onFraction: (f: number) => void) {
  return useCallback(
    (e: React.PointerEvent) => {
      const el = trackRef.current;

      if (!el) return;
      e.preventDefault();
      el.focus();
      const at = (clientX: number) => {
        const rect = el.getBoundingClientRect();

        onFraction(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
      };

      at(e.clientX);
      const move = (ev: PointerEvent) => at(ev.clientX);
      const up = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        el.removeAttribute("data-dragging");
      };

      el.setAttribute("data-dragging", "true");
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    },
    [trackRef, onFraction],
  );
}

export function ChannelSlider({
  ariaLabel,
  className,
  max = 360,
  min = 0,
  onChange,
  pageStep = 15,
  step = 1,
  thumbBackground,
  trackBackground,
  value,
}: {
  value: number;
  onChange: (value: number) => void;
  ariaLabel: string;
  trackBackground: string;
  thumbBackground: string;
  min?: number;
  max?: number;
  step?: number;
  pageStep?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);

  valueRef.current = value;
  const commit = useCallback(
    (raw: number) => {
      const snapped = Math.min(max, Math.max(min, Math.round((raw - min) / step) * step + min));

      if (snapped !== valueRef.current) {
        valueRef.current = snapped;
        onChange(snapped);
      }
    },
    [max, min, onChange, step],
  );
  const onPointerDown = usePointerDrag(trackRef, (f) => commit(min + f * (max - min)));
  const onKeyDown = (e: React.KeyboardEvent) => {
    const v = valueRef.current;
    const map: Record<string, number> = {
      ArrowDown: v - step,
      ArrowLeft: v - step,
      ArrowRight: v + step,
      ArrowUp: v + step,
      End: max,
      Home: min,
      PageDown: v - pageStep,
      PageUp: v + pageStep,
    };

    if (!(e.key in map)) return;
    e.preventDefault();
    e.stopPropagation();
    commit(map[e.key] as number);
  };
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      aria-label={ariaLabel}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={Math.round(value)}
      className={cn(
        "focus-visible:focus-ring relative h-6 w-full shrink-0 cursor-pointer touch-none rounded-full outline-none",
        className,
      )}
      role="slider"
      style={{background: trackBackground}}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
    >
      <div className={thumbClass} style={{background: thumbBackground, left: `${pct}%`}} />
    </div>
  );
}

// Max chroma for subtle gray tinting - 0.02 keeps colors professional without high contrast
const MAX_CHROMA = 0.02;

export function ChromaSlider({
  className,
  hue,
  onChange,
  value,
}: {
  value: number;
  hue: number;
  onChange: (value: number) => void;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const onPointerDown = usePointerDrag(trackRef, (f) =>
    // Round to 4 decimal places for finer control with smaller max
    onChange(Math.round(f * MAX_CHROMA * 10000) / 10000),
  );
  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = value;
    const step = e.shiftKey ? 0.002 : 0.0002;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.max(0, value - step);
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = Math.min(MAX_CHROMA, value + step);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = MAX_CHROMA;
        break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    onChange(Math.round(next * 10000) / 10000);
  };

  return (
    <div
      ref={trackRef}
      aria-label="Amount of color in gray"
      aria-valuemax={MAX_CHROMA}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn(
        "focus-visible:focus-ring relative h-8 w-full shrink-0 cursor-pointer touch-none rounded-full outline-none",
        className,
      )}
      role="slider"
      style={{background: `linear-gradient(to right, oklch(0.7 0 ${hue}), oklch(0.7 ${MAX_CHROMA} ${hue}))`}}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
    >
      <div
        className={thumbClass}
        style={{backgroundColor: `oklch(0.7 ${value} ${hue})`, left: `${(value / MAX_CHROMA) * 100}%`}}
      />
    </div>
  );
}

/** react-aria `ColorArea` (HSL, x = saturation, y = lightness, step 1). */
export function ColorArea({
  hue,
  lightness,
  onChange,
  saturation,
}: {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (s: number, l: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cur = useRef({l: lightness, s: saturation});

  cur.current = {l: lightness, s: saturation};
  const commit = (s: number, l: number) => {
    const ns = Math.max(0, Math.min(100, Math.round(s)));
    const nl = Math.max(0, Math.min(100, Math.round(l)));

    if (ns !== cur.current.s || nl !== cur.current.l) {
      cur.current = {l: nl, s: ns};
      onChange(ns, nl);
    }
  };
  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;

    if (!el) return;
    e.preventDefault();
    el.focus();
    const at = (x: number, y: number) => {
      const r = el.getBoundingClientRect();

      commit(((x - r.left) / r.width) * 100, (1 - (y - r.top) / r.height) * 100);
    };

    at(e.clientX, e.clientY);
    const move = (ev: PointerEvent) => at(ev.clientX, ev.clientY);
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const {l, s} = cur.current;
    const big = e.shiftKey ? 10 : 1;
    const map: Record<string, [number, number]> = {
      ArrowDown: [s, l - big],
      ArrowLeft: [s - big, l],
      ArrowRight: [s + big, l],
      ArrowUp: [s, l + big],
      PageDown: [s, l - 10],
      PageUp: [s, l + 10],
    };
    const next = map[e.key];

    if (!next) return;
    e.preventDefault();
    e.stopPropagation();
    commit(next[0], next[1]);
  };

  return (
    <div
      ref={ref}
      aria-label="Color saturation and lightness"
      aria-valuetext={`saturation ${saturation}%, lightness ${lightness}%`}
      className="focus-visible:focus-ring relative size-[232px] shrink-0 touch-none rounded-2xl border border-border outline-none"
      role="slider"
      tabIndex={0}
      style={{
        background: `linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, transparent 50%, transparent 50%, hsl(0, 0%, 0%) 100%), linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))`,
      }}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
    >
      <div
        className="pointer-events-none absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg"
        style={{
          background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          left: `${saturation}%`,
          top: `${100 - lightness}%`,
        }}
      />
    </div>
  );
}
