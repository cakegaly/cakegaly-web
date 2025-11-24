'use client';

import { useState } from 'react';

import { getFormattedColors, parseColor } from '@/lib/culori';
import { Input } from '@/components/ui/input';

export function ColorConverter() {
  const [input, setInput] = useState('');
  const parsed = parseColor(input);
  const converted = parsed ? getFormattedColors(parsed) : null;

  return (
    <>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="例: #ff0000, rgb(255,0,0), oklch(0.6 0.2 40)"
        className="mb-4"
      />
      {converted ? (
        <div className="space-y-2">
          <ColorPreview color={converted.rgb} />
          <p>
            <strong>RGB:</strong> {converted.rgb}
          </p>
          <p>
            <strong>HSL:</strong> {converted.hsl}
          </p>
          <p>
            <strong>OKLCH:</strong> {converted.oklch}
          </p>
        </div>
      ) : (
        input && (
          <p className="text-destructive text-sm">不正なカラーコードです。</p>
        )
      )}
    </>
  );
}

function ColorPreview({ color }: { color: string }) {
  return (
    <div className="h-10 w-full rounded" style={{ backgroundColor: color }} />
  );
}
