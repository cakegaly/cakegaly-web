'use client';

import { FC, memo, useDeferredValue, useState } from 'react';

import { Textarea } from '@/components/base-ui/textarea';

const TextLength: FC<{ text: string }> = memo(({ text }) => {
  const length = countGraphemeLength(text);
  return <>{length}</>;
});
TextLength.displayName = 'TextLength';

const isSegmenter =
  typeof window === 'undefined' || window.Intl?.Segmenter === undefined;

function countGraphemeLength(text: string): number {
  if (isSegmenter) {
    return text.split('').length;
  }

  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
  return [...segmenter.segment(text)].length;
}

export function CharCounter() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <>
      <Textarea
        placeholder="ここにテキストを入力してください"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px]"
      />
      <div className="text-on-muted mt-4 flex gap-2 text-sm">
        <span>{'文字数: '}</span>
        <TextLength text={deferredText} />
      </div>
    </>
  );
}
