"use client";

/**
 * Accent control: port of HeroUI accent-color-selector.tsx + components/color-picker/* .
 * Colour maths (culori formatHsl / oklch, react-aria Color) live in lib/theme-editor/color.ts.
 */
import type {ColorFormat} from "@/lib/theme-editor/color";

import {ChevronLeftIcon, ChevronRightIcon, ShuffleIcon} from "lucide-react";
import {useMemo, useState} from "react";

import {Button} from "@/components/ui/button";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  HSLColor,
  accentFromHslColor,
  detectColorFormat,
  formatPickerColor,
  hslColorFromAccent,
  hueFromHslColor,
  parsePickerInput,
} from "@/lib/theme-editor/color";
import {useThemeState} from "@/lib/theme-editor/state";
import {cn} from "cn";

import {LockableLabel} from "./lockable-label";
import {ChannelSlider, ColorArea} from "./sliders";
import {t} from "./strings";

const SWATCHES_PER_PAGE = 8;
const defaultSwatches = [
  "hsla(338, 77%, 78%, 1)",
  "hsla(309, 23%, 55%, 1)",
  "hsla(355, 85%, 66%, 1)",
  "hsla(16, 100%, 67%, 1)",
  "hsla(47, 92%, 66%, 1)",
  "hsla(152, 80%, 56%, 1)",
  "hsla(197, 59%, 64%, 1)",
  "hsla(220, 13%, 18%, 1)",
  "hsla(220, 70%, 50%, 1)",
  "hsla(210, 100%, 56%, 1)",
  "hsla(180, 100%, 25%, 1)",
  "hsla(170, 50%, 65%, 1)",
  "hsla(150, 60%, 75%, 1)",
  "hsla(280, 60%, 60%, 1)",
  "hsla(270, 50%, 70%, 1)",
  "hsla(350, 100%, 88%, 1)",
];
const FORMATS: Array<{id: ColorFormat; label: string}> = [
  {id: "hex", label: "HEX"},
  {id: "hsl", label: "HSL"},
  {id: "rgb", label: "RGB"},
  {id: "hsb", label: "HSB"},
  {id: "oklch", label: "OKLCH"},
];
const HUE_TRACK =
  "linear-gradient(to right, hsl(0, 100%, 50%) 0%, hsl(60, 100%, 50%) 16.67%, hsl(120, 100%, 50%) 33.33%, hsl(180, 100%, 50%) 50%, hsl(240, 100%, 50%) 66.67%, hsl(300, 100%, 50%) 83.33%, hsl(360, 100%, 50%) 100%)";

export function AccentColorSelector() {
  const [state, setState] = useThemeState();
  const {chroma, hue, lightness} = state;
  const oklchColor = `oklch(${lightness} ${chroma} ${hue})`;
  const color = useMemo(() => hslColorFromAccent(lightness, chroma, hue), [lightness, chroma, hue]);
  const trackBackground = useMemo(() => {
    const stops = [24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336, 360, 24]
      .map((h) => `oklch(${lightness} ${chroma} ${h})`)
      .join(", ");

    return `linear-gradient(to right, ${stops})`;
  }, [lightness, chroma]);

  const onPickerChange = (c: HSLColor) => setState(accentFromHslColor(c));

  return (
    <div className="flex flex-col gap-1">
      <LockableLabel label={t.accentColor.label} tooltip={t.accentColor.tooltip} variable="hue" />
      <div className="flex flex-row items-center gap-2 overflow-visible">
        <ChannelSlider
          ariaLabel="Hue"
          className="w-[128px] xl:w-[160px]"
          thumbBackground={oklchColor}
          trackBackground={trackBackground}
          value={color.hue}
          onChange={(h) => setState({hue: hueFromHslColor(color.withChannel("hue", h))})}
        />
        <ColorPicker color={color} onChange={onPickerChange} />
      </div>
    </div>
  );
}

function ColorPicker({color, onChange}: {color: HSLColor; onChange: (c: HSLColor) => void}) {
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const [inputError, setInputError] = useState(false);
  const displayed = editingValue ?? formatPickerColor(color, format);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    setEditingValue(next);
    const f = detectColorFormat(next) ?? format;

    setFormat(f);
    const parsed = parsePickerInput(next, f);

    if (parsed) {
      onChange(parsed);
      setInputError(false);
    } else setInputError(true);
  };
  const shuffle = () => {
    const h = Math.floor(Math.random() * 360);
    const s = 50 + Math.floor(Math.random() * 50);
    const l = 40 + Math.floor(Math.random() * 30);

    onChange(HSLColor.parse(`hsl(${h}, ${s}%, ${l}%)`) as HSLColor);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            aria-label="Open color picker"
            className="relative size-6 overflow-visible p-0"
            size="icon-xs"
            variant="ghost"
          />
        }
      >
        <span
          className="size-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #F8AECF, #FBC7A3, #F7E8A4, #D7F5B0, #B5F3D2, #A3EAF7, #A8C9FF, #C9B8FF, #F8AECF)",
          }}
        />
        <span className="absolute inset-0 rounded-full border-2 border-white/50" />
      </PopoverTrigger>
      <PopoverContent className="w-[248px] gap-2 px-2 pt-4 pb-2" side="top">
        <SwatchesCarousel color={color} onChange={onChange} />
        <ColorArea
          hue={color.hue}
          lightness={color.lightness}
          saturation={color.saturation}
          onChange={(s, l) => onChange(color.withChannel("saturation", s).withChannel("lightness", l))}
        />
        <div className="flex w-full items-center justify-between gap-2">
          <ChannelSlider
            ariaLabel="Hue"
            className="h-5 max-w-[184px] flex-1"
            thumbBackground={color.toString("css")}
            trackBackground={HUE_TRACK}
            value={color.hue}
            onChange={(h) => onChange(color.withChannel("hue", h))}
          />
          <Button aria-label="Random color" className="rounded-full" size="icon-sm" variant="tertiary" onClick={shuffle}>
            <ShuffleIcon />
          </Button>
        </div>
        <InputGroup aria-invalid={inputError || undefined} variant="secondary">
          <InputGroupInput
            aria-invalid={inputError || undefined}
            aria-label="Accent color"
            className="px-4"
            value={displayed}
            onBlur={() => {
              setEditingValue(null);
              setInputError(false);
            }}
            onChange={onInput}
            onFocus={() => setEditingValue(formatPickerColor(color, format))}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setEditingValue(null);
                setInputError(false);
                e.currentTarget.blur();
              }
            }}
          />
          <InputGroupAddon align="inline-end" className="h-full border-s border-border py-0 pe-0">
            <Select
              items={FORMATS.map((f) => ({label: f.label, value: f.id}))}
              value={format}
              onValueChange={(v) => v && setFormat(v as ColorFormat)}
            >
              <SelectTrigger aria-label="Color format" className="h-full min-w-22 bg-transparent shadow-none" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InputGroupAddon>
        </InputGroup>
      </PopoverContent>
    </Popover>
  );
}

function SwatchesCarousel({color, onChange}: {color: HSLColor; onChange: (c: HSLColor) => void}) {
  const pages = useMemo(() => {
    const out: string[][] = [];

    for (let i = 0; i < defaultSwatches.length; i += SWATCHES_PER_PAGE) out.push(defaultSwatches.slice(i, i + SWATCHES_PER_PAGE));

    return out;
  }, []);
  const [page, setPage] = useState(0);
  const currentHex = color.toString("hex");

  return (
    <div className="flex items-center gap-2">
      <Button
        aria-label="Previous swatches"
        className="size-5 rounded-full"
        disabled={page === 0}
        size="icon-xs"
        variant="ghost"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex transition-transform duration-300 ease-out" style={{transform: `translateX(-${page * 100}%)`}}>
          {pages.map((sw, i) => (
            <div key={i} className="flex h-[22px] w-full shrink-0 justify-center" role="listbox" aria-label="Color swatches">
              <div className="flex items-center justify-start gap-1.5">
                {sw.map((s) => {
                  const c = HSLColor.parse(s) as HSLColor;
                  const selected = c.toString("hex") === currentHex;

                  return (
                    <button
                      key={s}
                      aria-label={c.toString("hex")}
                      aria-selected={selected}
                      className={cn(
                        "size-4 cursor-pointer rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected && "ring-1 ring-foreground ring-offset-1",
                      )}
                      role="option"
                      style={{background: s}}
                      tabIndex={page === i ? 0 : -1}
                      type="button"
                      onClick={() => onChange(c)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        aria-label="Next swatches"
        className="size-5 rounded-full"
        disabled={page === pages.length - 1}
        size="icon-xs"
        variant="ghost"
        onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
