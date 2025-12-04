import {
  converter,
  formatHex,
  formatHsl,
  formatRgb,
  parse,
  wcagContrast,
  type Color,
  type Oklch,
} from 'culori';

export function parseColor(input: string): Color | null {
  const parsed = parse(input);
  return parsed ?? null;
}

export function getFormattedColors(color: Color) {
  const toRgb = converter('rgb');
  const toHsl = converter('hsl');
  const toOklch = converter('oklch');

  const rgb = toRgb(color);
  const hsl = toHsl(color);
  const oklch = toOklch(color);

  return {
    rgb: rgb ? formatRgb(rgb) : '-',
    hsl: hsl ? formatHsl(hsl) : '-',
    oklch: oklch ? formatOklch(oklch) : '-',
    hex: rgb ? formatHex(rgb) : '-',
  };
}

export function formatOklch(color: Oklch): string {
  const { l, c, h, alpha } = color;

  const lStr = l.toFixed(3);
  const cStr = c.toFixed(3);
  const hStr = h?.toFixed(1) ?? '0';

  if (alpha !== undefined && alpha < 1) {
    const aStr = alpha.toFixed(2);
    return `oklch(${lStr} ${cStr} ${hStr} / ${aStr})`;
  }

  return `oklch(${lStr} ${cStr} ${hStr})`;
}

export function getContrastRatios(color: Color) {
  const contrastWithWhite = wcagContrast(color, 'white');
  const contrastWithBlack = wcagContrast(color, 'black');

  return {
    white: contrastWithWhite?.toFixed(2) ?? '-',
    black: contrastWithBlack?.toFixed(2) ?? '-',
  };
}
