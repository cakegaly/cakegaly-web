'use client';

import { useState } from 'react';
import type { Color, Hsl, Oklch, Rgb } from 'culori';
import { converter, formatHex, formatHsl, formatRgb } from 'culori';
import { Check, Copy } from 'lucide-react';

import {
  formatOklch,
  getContrastRatios,
  getFormattedColors,
  parseColor,
} from '@/lib/culori';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ColorConverter() {
  const [input, setInput] = useState('#ffffff');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const parsed = parseColor(input);
  const converted = parsed ? getFormattedColors(parsed) : null;
  const contrast = parsed ? getContrastRatios(parsed) : null;

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: #ff0000, rgb(255,0,0), oklch(0.6 0.2 40)"
          className="flex-1"
        />
        <input
          type="color"
          value={converted?.hex || '#000000'}
          onChange={handleColorPickerChange}
          className="border-border h-10 w-20 cursor-pointer rounded border"
          title="カラーピッカー"
        />
      </div>

      {/* Error Message */}
      {input && !converted && (
        <p className="text-destructive text-sm">不正なカラーコードです。</p>
      )}

      {/* Color Preview and Details */}
      {converted && parsed && (
        <div className="space-y-6">
          {/* Large Color Preview */}
          <div
            className="border-border h-32 w-full rounded-lg border-2 shadow-sm"
            style={{ backgroundColor: converted.hex }}
          />

          {/* Color Codes */}
          <div className="space-y-3">
            <HexEditableRow
              color={parsed}
              onColorChange={setInput}
              onCopy={handleCopy}
              isCopied={copiedValue === converted.hex}
            />
            <RgbEditableRow
              color={parsed}
              onColorChange={setInput}
              onCopy={handleCopy}
              isCopied={copiedValue === converted.rgb}
            />
            <HslEditableRow
              color={parsed}
              onColorChange={setInput}
              onCopy={handleCopy}
              isCopied={copiedValue === converted.hsl}
            />
            <OklchEditableRow
              color={parsed}
              onColorChange={setInput}
              onCopy={handleCopy}
              isCopied={copiedValue === converted.oklch}
            />
          </div>

          {/* Contrast Ratios */}
          {contrast && (
            <div className="border-border bg-muted rounded-lg border p-4">
              <h3 className="text-on-background mb-3 text-sm font-semibold">
                アクセシビリティ (WCAG コントラスト比)
              </h3>
              <div className="space-y-2">
                <ContrastRow
                  label="白とのコントラスト"
                  ratio={contrast.white}
                  color={converted.hex}
                  backgroundColor="white"
                />
                <ContrastRow
                  label="黒とのコントラスト"
                  ratio={contrast.black}
                  color={converted.hex}
                  backgroundColor="black"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HexEditableRow({
  color,
  onColorChange,
  onCopy,
  isCopied,
}: {
  color: Color;
  onColorChange: (value: string) => void;
  onCopy: (value: string) => void;
  isCopied: boolean;
}) {
  const toRgb = converter('rgb');
  const rgb = toRgb(color);
  const hexValue = (rgb ? formatHex(rgb) : null) ?? '#000000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith('#')) {
      onColorChange(value);
    } else {
      onColorChange(`#${value}`);
    }
  };

  return (
    <div className="bg-canvas border-border flex items-center gap-3 rounded-lg border p-3">
      <span className="text-on-muted min-w-[4rem] text-sm font-medium">
        HEX
      </span>
      <Input
        value={hexValue}
        onChange={handleChange}
        className="font-mono text-sm"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onCopy(hexValue)}
        className="hover:bg-muted-hovered h-8 w-8 flex-shrink-0 p-0"
        title={isCopied ? 'コピーしました！' : 'コピー'}
      >
        {isCopied ? (
          <Check className="text-accent h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

function RgbEditableRow({
  color,
  onColorChange,
  onCopy,
  isCopied,
}: {
  color: Color;
  onColorChange: (value: string) => void;
  onCopy: (value: string) => void;
  isCopied: boolean;
}) {
  const toRgb = converter('rgb');
  const rgb = toRgb(color) as Rgb | undefined;
  const rgbValue = rgb ? formatRgb(rgb) : 'rgb(0, 0, 0)';

  const r = Math.round((rgb?.r ?? 0) * 255);
  const g = Math.round((rgb?.g ?? 0) * 255);
  const b = Math.round((rgb?.b ?? 0) * 255);
  const alpha = rgb?.alpha ?? 1;

  const handleChange = (channel: 'r' | 'g' | 'b' | 'alpha', value: number) => {
    if (!rgb) return;

    const newRgb: Rgb = {
      mode: 'rgb',
      r: channel === 'r' ? value / 255 : rgb.r,
      g: channel === 'g' ? value / 255 : rgb.g,
      b: channel === 'b' ? value / 255 : rgb.b,
      alpha: channel === 'alpha' ? value : rgb.alpha,
    };

    onColorChange(formatRgb(newRgb));
  };

  return (
    <div className="bg-canvas border-border rounded-lg border p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-on-muted text-sm font-medium">RGB</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(rgbValue)}
          className="hover:bg-muted-hovered h-8 w-8 p-0"
          title={isCopied ? 'コピーしました！' : 'コピー'}
        >
          {isCopied ? (
            <Check className="text-accent h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-on-muted mb-1 block text-xs">R</label>
          <Input
            type="number"
            min="0"
            max="255"
            value={r}
            onChange={(e) => handleChange('r', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="text-on-muted mb-1 block text-xs">G</label>
          <Input
            type="number"
            min="0"
            max="255"
            value={g}
            onChange={(e) => handleChange('g', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="text-on-muted mb-1 block text-xs">B</label>
          <Input
            type="number"
            min="0"
            max="255"
            value={b}
            onChange={(e) => handleChange('b', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
      </div>
      {alpha < 1 && (
        <div className="mt-2">
          <label className="text-on-muted mb-1 block text-xs">Alpha</label>
          <Input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={alpha.toFixed(2)}
            onChange={(e) => handleChange('alpha', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}

function HslEditableRow({
  color,
  onColorChange,
  onCopy,
  isCopied,
}: {
  color: Color;
  onColorChange: (value: string) => void;
  onCopy: (value: string) => void;
  isCopied: boolean;
}) {
  const toHsl = converter('hsl');
  const hsl = toHsl(color) as Hsl | undefined;
  const hslValue = hsl ? formatHsl(hsl) : 'hsl(0, 0%, 0%)';

  const h = Math.round(hsl?.h ?? 0);
  const s = Math.round((hsl?.s ?? 0) * 100);
  const l = Math.round((hsl?.l ?? 0) * 100);
  const alpha = hsl?.alpha ?? 1;

  const handleChange = (channel: 'h' | 's' | 'l' | 'alpha', value: number) => {
    if (!hsl) return;

    const newHsl: Hsl = {
      mode: 'hsl',
      h: channel === 'h' ? value : hsl.h,
      s: channel === 's' ? value / 100 : hsl.s,
      l: channel === 'l' ? value / 100 : hsl.l,
      alpha: channel === 'alpha' ? value : hsl.alpha,
    };

    onColorChange(formatHsl(newHsl));
  };

  return (
    <div className="bg-canvas border-border rounded-lg border p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-on-muted text-sm font-medium">HSL</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(hslValue)}
          className="hover:bg-muted-hovered h-8 w-8 p-0"
          title={isCopied ? 'コピーしました！' : 'コピー'}
        >
          {isCopied ? (
            <Check className="text-accent h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-on-muted mb-1 block text-xs">H</label>
          <Input
            type="number"
            min="0"
            max="360"
            value={h}
            onChange={(e) => handleChange('h', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="text-on-muted mb-1 block text-xs">S (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            value={s}
            onChange={(e) => handleChange('s', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="text-on-muted mb-1 block text-xs">L (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            value={l}
            onChange={(e) => handleChange('l', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
      </div>
      {alpha < 1 && (
        <div className="mt-2">
          <label className="text-on-muted mb-1 block text-xs">Alpha</label>
          <Input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={alpha.toFixed(2)}
            onChange={(e) => handleChange('alpha', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}

function OklchEditableRow({
  color,
  onColorChange,
  onCopy,
  isCopied,
}: {
  color: Color;
  onColorChange: (value: string) => void;
  onCopy: (value: string) => void;
  isCopied: boolean;
}) {
  const toOklch = converter('oklch');
  const oklch = toOklch(color) as Oklch | undefined;
  const oklchValue = oklch ? formatOklch(oklch) : 'oklch(0 0 0)';

  const l = oklch?.l?.toFixed(3) ?? '0.000';
  const c = oklch?.c?.toFixed(3) ?? '0.000';
  const h = oklch?.h?.toFixed(1) ?? '0.0';
  const alpha = oklch?.alpha ?? 1;

  const handleChange = (channel: 'l' | 'c' | 'h' | 'alpha', value: number) => {
    if (!oklch) return;

    const newOklch: Oklch = {
      mode: 'oklch',
      l: channel === 'l' ? value : oklch.l,
      c: channel === 'c' ? value : oklch.c,
      h: channel === 'h' ? value : oklch.h,
      alpha: channel === 'alpha' ? value : oklch.alpha,
    };

    onColorChange(formatOklch(newOklch));
  };

  return (
    <div className="bg-canvas border-border rounded-lg border p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-on-muted text-sm font-medium">OKLCH</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(oklchValue)}
          className="hover:bg-muted-hovered h-8 w-8 p-0"
          title={isCopied ? 'コピーしました！' : 'コピー'}
        >
          {isCopied ? (
            <Check className="text-accent h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-on-muted mb-1 block text-xs">L</label>
          <Input
            type="number"
            min="0"
            max="1"
            step="0.001"
            value={l}
            onChange={(e) => handleChange('l', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="text-on-muted mb-1 block text-xs">C</label>
          <Input
            type="number"
            min="0"
            max="0.4"
            step="0.001"
            value={c}
            onChange={(e) => handleChange('c', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="text-on-muted mb-1 block text-xs">H</label>
          <Input
            type="number"
            min="0"
            max="360"
            step="0.1"
            value={h}
            onChange={(e) => handleChange('h', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
      </div>
      {alpha < 1 && (
        <div className="mt-2">
          <label className="text-on-muted mb-1 block text-xs">Alpha</label>
          <Input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={alpha.toFixed(2)}
            onChange={(e) => handleChange('alpha', Number(e.target.value))}
            className="font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}

function ContrastRow({
  label,
  ratio,
  color,
  backgroundColor,
}: {
  label: string;
  ratio: string;
  color: string;
  backgroundColor: string;
}) {
  const ratioNum = parseFloat(ratio);
  const passAA = ratioNum >= 4.5;
  const passAAA = ratioNum >= 7;

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded border text-xs font-bold"
          style={{ backgroundColor, color }}
        >
          A
        </div>
        <span className="text-on-canvas">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-on-background font-mono font-semibold">
          {ratio}:1
        </span>
        {passAAA && (
          <span className="bg-accent/20 text-accent rounded px-2 py-0.5 text-xs font-medium">
            AAA
          </span>
        )}
        {passAA && !passAAA && (
          <span className="bg-accent/20 text-accent rounded px-2 py-0.5 text-xs font-medium">
            AA
          </span>
        )}
      </div>
    </div>
  );
}
