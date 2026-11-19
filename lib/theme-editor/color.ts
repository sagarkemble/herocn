/**
 * Colour maths for the theme editor's accent controls.
 *
 * heroui.com/themes drives the accent with react-aria's HSL `Color` objects and converts them
 * to OKLCH with culori (apps/docs/src/components/color-picker/utils/color-format.ts @ 08d4f13).
 * We do not depend on either library, so the exact pieces used are re-implemented here:
 *  - culori 4.0.2 (MIT): oklab<->lrgb matrices, sRGB transfer, rgb<->hsl, lab<->lch, serializeHsl, round(4)
 *  - @react-stately/color (Apache-2.0): HSLColor parse/toString/toRGB/toHSB, RGBColor hex/rgb/toHSL,
 *    HSBColor toHSL/toRGB, toFixedNumber.
 * Verified against both libraries in /workspace/themes-work/color-test.mjs.
 */

/* ------------------------------------------------------------------ culori ------------------- */

type RGB = {r: number; g: number; b: number};
export type Oklch = {l: number; c: number; h: number | undefined};

const toLinear = (c = 0) => {
  const abs = Math.abs(c);

  if (abs <= 0.04045) return c / 12.92;

  return (Math.sign(c) || 1) * Math.pow((abs + 0.055) / 1.055, 2.4);
};
const toGamma = (c = 0) => {
  const abs = Math.abs(c);

  if (abs > 0.0031308) return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);

  return c * 12.92;
};
const normalizeHue = (hue: number) => ((hue = hue % 360) < 0 ? hue + 360 : hue);

function rgbToOklab({b, g, r}: RGB) {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const L = Math.cbrt(0.412221469470763 * lr + 0.5363325372617348 * lg + 0.0514459932675022 * lb);
  const M = Math.cbrt(0.2119034958178252 * lr + 0.6806995506452344 * lg + 0.1073969535369406 * lb);
  const S = Math.cbrt(0.0883024591900564 * lr + 0.2817188391361215 * lg + 0.6299787016738222 * lb);
  const res = {
    a: 1.9779985324311684 * L - 2.4285922420485799 * M + 0.450593709617411 * S,
    b: 0.0259040424655478 * L + 0.7827717124575296 * M - 0.8086757549230774 * S,
    l: 0.210454268309314 * L + 0.7936177747023054 * M - 0.0040720430116193 * S,
  };

  if (r === b && b === g) res.a = res.b = 0;

  return res;
}

function oklabToRgb({a, b, l}: {l: number; a: number; b: number}): RGB {
  const L = Math.pow(l + 0.3963377773761749 * a + 0.2158037573099136 * b, 3);
  const M = Math.pow(l - 0.1055613458156586 * a - 0.0638541728258133 * b, 3);
  const S = Math.pow(l - 0.0894841775298119 * a - 1.2914855480194092 * b, 3);

  return {
    b: toGamma(-0.0041960761386756 * L - 0.7034186179359362 * M + 1.7076146940746117 * S),
    g: toGamma(-1.2684379732850317 * L + 2.6097573492876887 * M - 0.3413193760026573 * S),
    r: toGamma(4.0767416360759574 * L - 3.3077115392580616 * M + 0.2309699031821044 * S),
  };
}

export function rgbToOklch(rgb: RGB): Oklch {
  const {a, b, l} = rgbToOklab(rgb);
  const c = Math.sqrt(a * a + b * b);

  return {c, h: c ? normalizeHue((Math.atan2(b, a) * 180) / Math.PI) : undefined, l};
}

export function oklchToRgb({c, h, l}: Oklch): RGB {
  const hh = h === undefined ? 0 : h;

  return oklabToRgb({
    a: c ? c * Math.cos((hh / 180) * Math.PI) : 0,
    b: c ? c * Math.sin((hh / 180) * Math.PI) : 0,
    l,
  });
}

/** culori convertRgbToHsl */
function culoriRgbToHsl({b, g, r}: RGB): {h?: number; s: number; l: number} {
  const M = Math.max(r, g, b);
  const m = Math.min(r, g, b);
  const res: {h?: number; s: number; l: number} = {
    l: 0.5 * (M + m),
    s: M === m ? 0 : (M - m) / (1 - Math.abs(M + m - 1)),
  };

  if (M - m !== 0) {
    res.h =
      (M === r
        ? (g - b) / (M - m) + Number(g < b) * 6
        : M === g
          ? (b - r) / (M - m) + 2
          : (r - g) / (M - m) + 4) * 60;
  }

  return res;
}

/** culori convertHslToRgb (s, l in 0..1) */
function culoriHslToRgb(hIn: number | undefined, s: number, l: number): RGB {
  const h = normalizeHue(hIn !== undefined ? hIn : 0);
  const m1 = l + s * (l < 0.5 ? l : 1 - l);
  const m2 = m1 - (m1 - l) * 2 * Math.abs(((h / 60) % 2) - 1);

  switch (Math.floor(h / 60)) {
    case 0:
      return {b: 2 * l - m1, g: m2, r: m1};
    case 1:
      return {b: 2 * l - m1, g: m1, r: m2};
    case 2:
      return {b: m2, g: m1, r: 2 * l - m1};
    case 3:
      return {b: m1, g: m2, r: 2 * l - m1};
    case 4:
      return {b: m1, g: 2 * l - m1, r: m2};
    case 5:
      return {b: m2, g: 2 * l - m1, r: m1};
    default:
      return {b: 2 * l - m1, g: 2 * l - m1, r: 2 * l - m1};
  }
}

const round = (v: number, p: number) => {
  const f = Math.pow(10, p);

  return Math.round(v * f) / f;
};
const clamp01 = (v: number) => Math.max(0, Math.min(1, v || 0));

/** culori `formatHsl(oklch)` -> "hsl(h, s%, l%)" */
export function formatHslFromOklch(o: Oklch): string {
  const hsl = culoriRgbToHsl(oklchToRgb(o));

  return `hsl(${round(hsl.h || 0, 2)}, ${round(clamp01(hsl.s) * 100, 2)}%, ${round(clamp01(hsl.l) * 100, 2)}%)`;
}

/** culori `converter("oklch")("hsl(h, s%, l%)")` for the legacy strings react-aria emits. */
export function oklchFromHslString(hsl: string): Oklch | undefined {
  const m = hsl.match(/^hsla?\(\s*([-+\d.e]+)(?:deg)?\s*[, ]\s*([-+\d.e]+)%\s*[, ]\s*([-+\d.e]+)%/i);

  if (!m) return undefined;

  return rgbToOklch(culoriHslToRgb(Number(m[1]), Number(m[2]) / 100, Number(m[3]) / 100));
}

/** culori `formatCss(mapper(round(4), "oklch")(oklch(css)))` */
export function formatOklchRounded(o: Oklch): string {
  return `oklch(${round(o.l, 4)} ${round(o.c, 4)} ${o.h === undefined ? "none" : round(o.h, 4)})`;
}

/* ------------------------------------------------------------ react-aria Color ---------------- */

const toFixedNumber = (v: number, d: number) => round(v, d);
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAriaHue = (hue: number) => (hue === 360 ? hue : ((hue % 360) + 360) % 360);

/** react-aria `HSLColor` (hue 0-360, saturation/lightness 0-100). */
export class HSLColor {
  hue: number;
  saturation: number;
  lightness: number;

  constructor(hue: number, saturation: number, lightness: number) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }

  static parse(value: string): HSLColor | undefined {
    const m = value.match(
      /hsl\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%)\)|hsla\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d(.\d+)?)\)/,
    );

    if (!m) return undefined;
    const [h = 0, s = 0, l = 0] = (m[1] ?? m[2] ?? "").split(",").map((n) => Number(n.trim().replace("%", "")));

    return new HSLColor(normalizeAriaHue(h), clamp(s, 0, 100), clamp(l, 0, 100));
  }

  withChannel(channel: "hue" | "saturation" | "lightness", value: number) {
    const c = new HSLColor(this.hue, this.saturation, this.lightness);

    c[channel] = value;

    return c;
  }

  toRGB(): [number, number, number] {
    const hue = this.hue;
    const s = this.saturation / 100;
    const l = this.lightness / 100;
    const a = s * Math.min(l, 1 - l);
    const fn = (n: number, k = (n + hue / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return [Math.round(fn(0) * 255), Math.round(fn(8) * 255), Math.round(fn(4) * 255)];
  }

  toHSB(): [number, number, number] {
    const s = this.saturation / 100;
    const l = this.lightness / 100;
    const b = l + s * Math.min(l, 1 - l);
    const sat = b === 0 ? 0 : 2 * (1 - l / b);

    return [toFixedNumber(this.hue, 2), toFixedNumber(sat * 100, 2), toFixedNumber(b * 100, 2)];
  }

  toString(format: "hsl" | "hex" | "rgb" | "hsb" | "css"): string {
    switch (format) {
      case "hsl":
        return `hsl(${this.hue}, ${toFixedNumber(this.saturation, 2)}%, ${toFixedNumber(this.lightness, 2)}%)`;
      case "css":
        return `hsla(${this.hue}, ${toFixedNumber(this.saturation, 2)}%, ${toFixedNumber(this.lightness, 2)}%, 1)`;
      case "hex": {
        const [r, g, b] = this.toRGB();

        return "#" + (r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0")).toUpperCase();
      }
      case "rgb": {
        const [r, g, b] = this.toRGB();

        return `rgb(${r}, ${g}, ${b})`;
      }
      case "hsb": {
        const [h, s, b] = this.toHSB();

        return `hsb(${h}, ${toFixedNumber(s, 2)}%, ${toFixedNumber(b, 2)}%)`;
      }
    }
  }
}

/** react-aria RGBColor.toHSL */
function rgbIntToHsl(r255: number, g255: number, b255: number): HSLColor {
  const red = r255 / 255;
  const green = g255 / 255;
  const blue = b255 / 255;
  const min = Math.min(red, green, blue);
  const max = Math.max(red, green, blue);
  const lightness = (max + min) / 2;
  const chroma = max - min;
  let hue = 0;
  let saturation = 0;

  if (chroma !== 0) {
    saturation = chroma / (lightness < 0.5 ? max + min : 2 - max - min);
    switch (max) {
      case red:
        hue = (green - blue) / chroma + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / chroma + 2;
        break;
      default:
        hue = (red - green) / chroma + 4;
        break;
    }
    hue /= 6;
  }

  return new HSLColor(toFixedNumber(hue * 360, 2), toFixedNumber(saturation * 100, 2), toFixedNumber(lightness * 100, 2));
}

/** react-aria HSBColor.toHSL */
function hsbToHsl(h: number, s100: number, b100: number): HSLColor {
  let saturation = s100 / 100;
  const brightness = b100 / 100;
  const lightness = brightness * (1 - saturation / 2);

  saturation = lightness === 0 || lightness === 1 ? 0 : (brightness - lightness) / Math.min(lightness, 1 - lightness);

  return new HSLColor(toFixedNumber(h, 2), toFixedNumber(saturation * 100, 2), toFixedNumber(lightness * 100, 2));
}

/* ---------------------------------------------------------- HeroUI picker helpers -------------- */

export type ColorFormat = "hex" | "hsl" | "rgb" | "hsb" | "oklch";

/** HeroUI `safeParseColor(formatHsl(oklch))`: the HSL colour the picker/slider shows for the accent. */
export function hslColorFromAccent(lightness: number, chroma: number, hue: number): HSLColor {
  const parsed = HSLColor.parse(formatHslFromOklch({c: chroma, h: hue, l: lightness}));

  return parsed ?? (HSLColor.parse("hsl(212.4, 100%, 46.67%)") as HSLColor); // #006FEE fallback
}

/** HeroUI `getValuesFromOklch(color.toString("hsl"))` -> new accent values. */
export function accentFromHslColor(color: HSLColor): {lightness: number; chroma: number; hue: number} {
  const o = oklchFromHslString(color.toString("hsl"));

  return {chroma: o?.c ?? 0, hue: o?.h ?? 0, lightness: o?.l ?? 0};
}

/** HeroUI `getHueFromColor(color)` */
export function hueFromHslColor(color: HSLColor): number {
  const o = oklchFromHslString(color.toString("hsl"));

  return o?.h === undefined ? 0 : o.h;
}

/** HeroUI `formatColor(color, format)` for the picker's text field. */
export function formatPickerColor(color: HSLColor, format: ColorFormat): string {
  if (format !== "oklch") return color.toString(format);
  const o = oklchFromHslString(color.toString("hsl"));

  return o ? formatOklchRounded(o) : color.toString("hex");
}

export function detectColorFormat(value: string): ColorFormat | null {
  const t = value.trim().toLowerCase();

  if (t.startsWith("oklch(")) return "oklch";
  if (t.startsWith("hsl(") || t.startsWith("hsla(")) return "hsl";
  if (t.startsWith("rgb(") || t.startsWith("rgba(")) return "rgb";
  if (t.startsWith("hsb(") || t.startsWith("hsba(")) return "hsb";
  if (/^#?[0-9a-f]{3,8}$/i.test(t)) return "hex";

  return null;
}

function normalizeSyntax(color: string): string {
  const t = color.trim();
  const m = t.match(/^(hsla?|rgba?|hsba?)\s*\(\s*([^\s,]+)\s+([^\s,]+)\s+([^\s,/]+)(?:\s*\/\s*([^\s)]+))?\s*\)$/i);

  if (!m) return t;
  const [, fn = "", a, b, c, alpha] = m;
  const base = fn.replace(/a$/i, "");

  return alpha !== undefined ? `${base}a(${a}, ${b}, ${c}, ${alpha})` : `${fn}(${a}, ${b}, ${c})`;
}

/**
 * HeroUI `validateColorInput` (react-aria parseColor after a culori sanity parse).
 * Returns the parsed colour as react-aria would hold it (converted to HSL for the picker).
 */
export function parsePickerInput(input: string, format: ColorFormat): HSLColor | null {
  const t = input.trim();

  if (!t) return null;
  switch (format) {
    case "hex": {
      if (!/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(t)) return null;
      let hex = t.startsWith("#") ? t.slice(1) : t;

      if (hex.length < 6) hex = hex.replace(/./g, "$&$&");
      const n = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];

      return rgbIntToHsl(...n);
    }
    case "hsl": {
      if (!/^hsla?\s*\(/i.test(t)) return null;

      return HSLColor.parse(normalizeSyntax(t)) ?? null;
    }
    case "rgb": {
      if (!/^rgba?\s*\(/i.test(t)) return null;
      const m = normalizeSyntax(t).match(/^rgba?\((.*)\)$/);

      if (!m?.[1]) return null;
      const parts = m[1].split(",").map((p) => p.trim());

      if (parts.length < 3 || parts.some((p) => p === "" || !Number.isFinite(Number(p)))) return null;
      const [r, g, b] = parts.map((p) => clamp(Number(p), 0, 255)) as [number, number, number];

      return rgbIntToHsl(r, g, b);
    }
    case "hsb": {
      if (!/^hsba?\s*\(/i.test(t)) return null;
      const m = normalizeSyntax(t).match(/hsba?\(([^)]*)\)/);

      if (!m?.[1]) return null;
      const [h = 0, s = 0, b = 0] = m[1].split(",").map((n) => Number(n.trim().replace("%", "")));

      if ([h, s, b].some((v) => !Number.isFinite(v))) return null;

      return hsbToHsl(normalizeAriaHue(h), clamp(s, 0, 100), clamp(b, 0, 100));
    }
    case "oklch": {
      const m = t.match(/^oklch\s*\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)\s*\)$/i);

      if (!m) return null;
      const l = m[2] ? Number(m[1]) / 100 : Number(m[1]);
      const c = Number(m[3]);
      const h = m[4] === "none" ? undefined : Number(m[4]);

      return HSLColor.parse(formatHslFromOklch({c, h, l: Math.min(Math.max(0, l), 1)})) ?? null;
    }
  }
}
