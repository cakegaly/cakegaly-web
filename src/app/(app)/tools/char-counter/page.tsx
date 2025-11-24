import type { Metadata } from 'next';

import { CharCounter } from '@/components/tools/char-counter';

const title = '文字数カウント';
const description = '入力されたテキストの文字数を数えます。';

export const metadata: Metadata = {
  title,
  description,
};

export default function CharCounterPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-on-background text-2xl font-bold">{title}</h1>
            <p className="text-on-muted text-sm">{description}</p>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-inner py-6">
          <CharCounter />
        </div>
      </div>
    </div>
  );
}
