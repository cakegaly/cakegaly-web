'use client';

import { FC, memo, useDeferredValue, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Textarea } from '@/components/shadcn-ui/textarea';

const TextLength: FC<{ text: string }> = memo(({ text }) => {
  const length = countGraphemeLength(text);
  return <>{length}</>;
});

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
    <Card>
      <CardHeader>
        <CardTitle>文字数カウント</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="ここにテキストを入力してください"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
        <div className="mt-4 flex gap-2 text-sm text-muted-foreground">
          <span>{'文字数: '}</span>
          <TextLength text={deferredText} />
        </div>
      </CardContent>
    </Card>
  );
}
