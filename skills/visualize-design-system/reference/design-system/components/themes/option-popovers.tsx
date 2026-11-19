"use client";

/**
 * Footer popovers: Font Family, Radius, Radius Form, Theme (+ ThemesList / ThemeInput for mobile).
 * Ports of HeroUI font-family-popover, suggested-fonts, custom-fonts, radius-popover, theme-popover,
 * themes-list, theme-input. HeroUI's ListBox grids are rendered as role="listbox" button grids
 * (the skill has no ListBox component).
 */
import type {RadiusId, ThemeId, ThemeVariables} from "@/lib/theme-editor/constants";

import {
  ArrowLeftIcon,
  ChevronsUpDownIcon,
  GlobeIcon,
  PaintBucketIcon,
  PlusIcon,
  Trash2Icon,
  TypeIcon,
} from "lucide-react";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Kbd} from "@/components/ui/kbd";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Separator} from "@/components/ui/separator";
import {Switch} from "@/components/ui/switch";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {
  defaultThemeVariables,
  findMatchingTheme,
  fonts,
  themeValuesById,
  themes,
} from "@/lib/theme-editor/constants";
import {extractFontFamilyFromUrl, injectFontLink, isCustomFontUrl, isValidFontCdnUrl} from "@/lib/theme-editor/font-utils";
import {useKeyPress, useThemeState} from "@/lib/theme-editor/state";
import {useCustomFonts} from "@/lib/theme-editor/use-custom-fonts";
import {cn} from "cn";

import {LockableLabel} from "./lockable-label";
import {t} from "./strings";
import {themeImages} from "./theme-images";

/* ------------------------------------------------------------------ trigger */

function PopoverField({
  id,
  prefix,
  value,
  capitalize,
}: {
  id: string;
  prefix: React.ReactNode;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <PopoverTrigger
      nativeButton={false}
      render={<InputGroup className="w-40 cursor-pointer" />}
    >
      <InputGroupAddon className="w-10 justify-center ps-0">{prefix}</InputGroupAddon>
      <InputGroupInput
        readOnly
        className={cn("max-w-20 cursor-pointer px-0", capitalize && "capitalize")}
        id={id}
        name={id}
        tabIndex={-1}
        value={value}
      />
      <InputGroupAddon align="inline-end" className="ms-auto w-10 justify-center pe-0">
        <ChevronsUpDownIcon className="size-3" />
      </InputGroupAddon>
    </PopoverTrigger>
  );
}

/** Selectable grid tile (HeroUI ListBox.Item look). */
function Tile({
  selected,
  onSelect,
  className,
  children,
  style,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  label: string;
}) {
  return (
    <div
      aria-label={label}
      aria-selected={selected}
      className={cn(
        "group focus-visible:focus-ring relative flex cursor-pointer flex-col items-center justify-center gap-[5px] rounded-2xl border border-border outline-none transition-colors hover:bg-default",
        selected && "border-foreground",
        className,
      )}
      data-selected={selected}
      role="option"
      style={style}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ font */

export function FontFamilyPopover() {
  const [state] = useThemeState();
  const [mode, setMode] = useState<"suggested" | "custom">("suggested");
  const current = fonts.find((f) => f.id === state.fontFamily);
  const label =
    current?.label ?? (isCustomFontUrl(state.fontFamily) ? extractFontFamilyFromUrl(state.fontFamily) : null) ?? "Inter";

  return (
    <Popover onOpenChange={(o) => !o && setMode("suggested")}>
      <div className="flex flex-col gap-1">
        <LockableLabel label={t.fontFamily.label} variable="fontFamily" />
        <PopoverField id="font-family" prefix={<TypeIcon />} value={label} />
      </div>
      <PopoverContent className="w-[325px] gap-0 p-3" side="top">
        {mode === "suggested" ? (
          <SuggestedFonts goToCustom={() => setMode("custom")} />
        ) : (
          <CustomFonts goToSuggested={() => setMode("suggested")} />
        )}
      </PopoverContent>
    </Popover>
  );
}

function SuggestedFonts({goToCustom}: {goToCustom: () => void}) {
  const [state, setState] = useThemeState();
  const {customFonts, removeCustomFont} = useCustomFonts();

  useEffect(() => {
    fonts.forEach((f) => injectFontLink(f.id, f.cdnUrl));
  }, []);
  useEffect(() => {
    customFonts.forEach((f) => injectFontLink(f.id, f.url));
  }, [customFonts]);
  useEffect(() => {
    if (isCustomFontUrl(state.fontFamily)) injectFontLink("current-url-font", state.fontFamily);
  }, [state.fontFamily]);

  const all = [
    ...fonts.map((f) => ({id: f.id as string, isCustom: false, label: f.label, url: f.cdnUrl})),
    ...customFonts.map((f) => ({id: f.url, isCustom: true, label: f.label, url: f.url})),
  ];

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-medium text-sm capitalize">
          {customFonts.length > 0 ? t.fontFamily.allFonts : t.fontFamily.suggested}
        </p>
        <Button size="sm" variant="ghost" onClick={goToCustom}>
          {t.fontFamily.addFromCdn}
          <PlusIcon data-icon="inline-end" />
        </Button>
      </div>
      <div aria-label={t.fontFamily.label} className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pb-3 [scrollbar-width:none]" role="listbox">
        {all.map((item) => (
          <Tile
            key={item.id}
            className="h-[83px] w-[95px]"
            label={item.label}
            selected={state.fontFamily === item.id}
            style={{fontFamily: `"${item.label}", sans-serif`}}
            onSelect={() => setState({fontFamily: item.id})}
          >
            <span className="font-medium text-xl">Ag</span>
            <p className="max-w-[80px] truncate text-[10px] text-muted-foreground group-data-[selected=true]:text-foreground">
              {item.label}
            </p>
            {item.isCustom ? (
              <Tooltip>
                <TooltipTrigger
                  delay={100}
                  render={
                    <Button
                      aria-label={t.fontFamily.removeFont}
                      className="absolute end-1 top-1 size-5 opacity-0 group-hover:opacity-100"
                      size="icon-xs"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        const font = customFonts.find((f) => f.url === item.url);

                        if (font) removeCustomFont(font.id);
                        if (state.fontFamily === item.url) setState({fontFamily: defaultThemeVariables.fontFamily});
                      }}
                    />
                  }
                >
                  <Trash2Icon className="size-3 text-destructive" />
                </TooltipTrigger>
                <TooltipContent>{t.fontFamily.removeFont}</TooltipContent>
              </Tooltip>
            ) : null}
          </Tile>
        ))}
      </div>
    </>
  );
}

function CustomFonts({goToSuggested}: {goToSuggested: () => void}) {
  const [cdnUrl, setCdnUrl] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const {addCustomFont} = useCustomFonts();
  const [, setState] = useThemeState();
  const d = t.customFonts;
  const validationError = useMemo<string | null>(() => {
    if (!cdnUrl.trim()) return null;
    try {
      const u = new URL(cdnUrl);

      if (u.protocol !== "https:") return d.errorHttps;
      if (!isValidFontCdnUrl(cdnUrl)) return d.errorSupportedCdn;

      return null;
    } catch {
      return d.errorInvalidUrl;
    }
  }, [cdnUrl, d]);
  const showError = (hasBlurred && validationError !== null) || importError !== null;
  const errorMessage = importError ?? validationError;

  const handleImport = () => {
    if (validationError) return;
    setIsImporting(true);
    setImportError(null);
    if (!extractFontFamilyFromUrl(cdnUrl)) {
      setImportError(d.errorCannotDetect);
      setIsImporting(false);

      return;
    }
    const result = addCustomFont(cdnUrl);

    if ("error" in result) {
      setImportError(
        result.error === "already-imported" ? d.errorAlreadyImported.replace("{name}", result.label) : d.errorCannotDetectFull,
      );
      setIsImporting(false);
    } else {
      setState({fontFamily: cdnUrl});
      setCdnUrl("");
      setHasBlurred(false);
      setIsImporting(false);
      goToSuggested();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <button
          className="flex cursor-pointer items-center gap-1 font-medium text-sm hover:opacity-80"
          type="button"
          onClick={goToSuggested}
        >
          <ArrowLeftIcon className="size-4" />
          {d.back}
        </button>
      </div>
      <Field data-invalid={showError || undefined}>
        <FieldLabel htmlFor="custom-font-url">{d.fontUrl}</FieldLabel>
        <InputGroup variant="secondary">
          <InputGroupAddon>
            <GlobeIcon className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            aria-invalid={showError || undefined}
            id="custom-font-url"
            placeholder={d.placeholder}
            value={cdnUrl}
            onBlur={() => setHasBlurred(true)}
            onChange={(e) => {
              setCdnUrl(e.target.value);
              setImportError(null);
            }}
          />
        </InputGroup>
        <FieldDescription>{d.description}</FieldDescription>
        {showError ? <FieldError>{errorMessage}</FieldError> : null}
      </Field>
      <Button
        className="w-full"
        disabled={!cdnUrl.trim() || validationError !== null || isImporting}
        size="sm"
        variant="secondary"
        onClick={handleImport}
      >
        {isImporting ? d.importing : d.importFont}
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ radius */

export function RadiusPopover({
  description,
  label,
  options,
  variableKey,
}: {
  label: string;
  description: string;
  variableKey: keyof Pick<ThemeVariables, "radius" | "formRadius">;
  options: Array<{cssValue: string; description: string; id: RadiusId; label: string}>;
}) {
  const [state, setState] = useThemeState();
  const current = state[variableKey];
  const option = options.find((r) => r.id === current);

  return (
    <Popover>
      <div className="flex flex-col gap-1">
        <LockableLabel label={label} variable={variableKey} />
        <PopoverField
          capitalize
          id={variableKey}
          prefix={<span className="font-semibold text-base text-muted-foreground">{option?.label}</span>}
          value={option?.description ?? ""}
        />
      </div>
      <PopoverContent className="w-[304px] gap-0 p-3" side="top">
        <div className="mb-2 flex flex-col gap-0.5 ps-2">
          <p className="font-medium text-xs capitalize">{label}</p>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
        <div aria-label={label} className="grid grid-cols-3 gap-2" role="listbox">
          {options.map((item) => (
            <Tile
              key={item.id}
              className="h-[83px] w-[88px]"
              label={item.description}
              selected={current === item.id}
              onSelect={() => setState(variableKey === "radius" ? {radius: item.id} : {formRadius: item.id})}
            >
              <span className="font-semibold text-xl">{item.label}</span>
              <p className="text-muted-foreground text-xs capitalize group-data-[selected=true]:text-foreground">
                {item.description}
              </p>
            </Tile>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ themes */

function useApplyTheme() {
  const [, setState] = useThemeState();

  return (id: ThemeId) => {
    const v = themeValuesById[id];

    setState({
      base: v.base,
      chroma: v.chroma,
      fontFamily: v.fontFamily,
      formRadius: v.formRadius,
      hue: v.hue,
      lightness: v.lightness,
      radius: v.radius,
    });
  };
}

function ThemeSwatch({id, label, size, selected}: {id: string; label: string; size: 36 | 48; selected: boolean}) {
  const img = themeImages[themes.find((x) => x.id === id)?.image ?? "default"];

  return (
    <Image
      alt={label}
      className={cn(
        "rounded-full bg-surface",
        size === 36 ? "size-9" : "size-12",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-popover",
      )}
      height={size}
      src={img as NonNullable<typeof img>}
      width={size}
    />
  );
}

export function ThemePopover() {
  const [state, setState] = useThemeState();
  const currentId = findMatchingTheme(state);
  const current = currentId ? themes.find((x) => x.id === currentId) : undefined;
  const apply = useApplyTheme();
  const [pre, post] = t.themes.pickRandomHint.split("{kbd}");

  useKeyPress("t", () => {
    const random = themes[Math.floor(Math.random() * themes.length)];

    if (random) apply(random.id);
  });

  return (
    <Popover>
      <div className="flex flex-col gap-1">
        <div className="flex h-6 items-center">
          <Label>{t.themes.theme}</Label>
        </div>
        <PopoverField capitalize id="theme" prefix={<PaintBucketIcon />} value={current?.label ?? t.themes.custom} />
      </div>
      <PopoverContent className="w-[228px] gap-0 p-4" side="top">
        <div aria-label={t.themes.theme} className="grid grid-cols-4 gap-3" role="listbox">
          {themes.map((item) => {
            const selected = item.id === currentId;

            return (
              <div
                key={item.id}
                aria-selected={selected}
                className="group focus-visible:focus-ring relative flex w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl outline-none"
                data-selected={selected}
                role="option"
                tabIndex={0}
                onClick={() => apply(item.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), apply(item.id))}
              >
                <ThemeSwatch id={item.id} label={item.label} selected={selected} size={36} />
                <span className="font-medium text-[10px] text-muted-foreground capitalize group-data-[selected=true]:text-foreground">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        <Separator className="mt-4" />
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-col gap-0.5">
            <Label className="text-xs" htmlFor="vibrant-palette">
              {t.themes.vibrantPalette}
            </Label>
            <p className="text-[10px] text-muted-foreground">{t.themes.vibrantPaletteDescription}</p>
          </div>
          <Switch
            checked={state.vibrantPalette}
            id="vibrant-palette"
            onCheckedChange={(checked) => setState({vibrantPalette: checked})}
          />
        </div>
        <p className="mt-4 text-muted-foreground text-xs">
          {pre}
          <Kbd>T</Kbd>
          {post}
        </p>
      </PopoverContent>
    </Popover>
  );
}

export function ThemesList() {
  const [state] = useThemeState();
  const currentId = findMatchingTheme(state);
  const apply = useApplyTheme();

  return (
    <div className="w-full overflow-x-auto px-4 [scrollbar-width:none] md:w-auto">
      <div aria-label={t.themes.theme} className="flex w-max flex-row flex-nowrap gap-5 py-1" role="listbox">
        {themes.map((item) => {
          const selected = item.id === currentId;

          return (
            <div
              key={item.id}
              aria-selected={selected}
              className="group relative flex w-12 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 outline-none"
              data-selected={selected}
              role="option"
              tabIndex={0}
              onClick={() => apply(item.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), apply(item.id))}
            >
              <ThemeSwatch id={item.id} label={item.label} selected={selected} size={48} />
              <span className="font-medium text-[10px] text-muted-foreground capitalize group-data-[selected=true]:text-foreground">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ThemeInput() {
  const [state] = useThemeState();
  const currentId = findMatchingTheme(state);
  const current = currentId ? themes.find((x) => x.id === currentId) : undefined;
  const accent = `oklch(${state.lightness} ${state.chroma} ${state.hue})`;
  const img = current ? themeImages[current.image] : undefined;

  return (
    <InputGroup className="w-full cursor-pointer">
      <InputGroupAddon className="w-10 justify-center ps-0">
        {current ? (
          <Avatar className="size-4 after:hidden">
            <AvatarImage alt={current.label} src={img?.src} />
            <AvatarFallback>{current.label[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div
            className="size-4 rounded-full"
            style={{
              background: `radial-gradient(85.29% 80.57% at 40.28% 34.72%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.02) 43.66%, rgba(0, 0, 0, 0.27) 72.4%, rgba(0, 0, 0, 0.30) 100%), ${accent}`,
            }}
          />
        )}
      </InputGroupAddon>
      <InputGroupInput readOnly aria-label={t.themes.theme} className="max-w-20 cursor-pointer px-0 sm:max-w-none" tabIndex={-1} value={current?.label ?? t.themes.custom} />
      <InputGroupAddon align="inline-end" className="ms-auto w-10 justify-end">
        <ChevronsUpDownIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
