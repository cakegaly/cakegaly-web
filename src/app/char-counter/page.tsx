'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Textarea } from '@/components/shadcn-ui/textarea';

export default function CharCounterPage() {
  const [text, setText] = useState('');

  const charCount = text.length;
  const byteCount = new TextEncoder().encode(text).length;
  const lineCount = text.split(/\r\n|\r|\n/).length;

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>文字数カウントツール</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[200px]"
            placeholder="ここにテキストを入力..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <p>文字数: {charCount}</p>
            <p>バイト数: {byteCount}</p>
            <p>行数: {lineCount}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
