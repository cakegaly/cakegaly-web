'use client';

import { useState } from 'react';

import { getFormattedColors, parseColor } from '@/lib/culori';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';

export function ColorConverter() {
  const [input, setInput] = useState('');
  const parsed = parseColor(input);
  const converted = parsed ? getFormattedColors(parsed) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>カラーコード変換ツール</CardTitle>
      </CardHeader>
      <CardContent>
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
            <p className="text-sm text-destructive">不正なカラーコードです。</p>
          )
        )}
      </CardContent>
    </Card>
  );
}

function ColorPreview({ color }: { color: string }) {
  return (
    <div className="h-10 w-full rounded" style={{ backgroundColor: color }} />
  );
}
