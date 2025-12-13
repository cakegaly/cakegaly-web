import type { Metadata } from 'next';

import { ColorConverter } from '@/components/tools/color-converter';

const title = 'カラーコード変換';
const description = 'hex, hsl, rgb, oklch でカラーコードを変換します。';

export const metadata: Metadata = {
  title,
  description,
};

export default function ColorConverterPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-on-background text-2xl font-bold">{title}</h1>
            <p className="text-on-muted text-sm">{description}</p>
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <ColorConverter />
        </div>
      </div>
    </div>
  );
}
