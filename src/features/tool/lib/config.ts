import { PaletteIcon, TypeIcon } from 'lucide-react';

export const tools = [
  {
    title: '文字数カウント',
    description: '入力されたテキストの文字数を数えます。',
    href: '/char-counter',
    icon: TypeIcon,
  },
  {
    title: 'カラーコード変換',
    description: 'hex, hsl, rgb, oklch でカラーコードを変換します。',
    href: '/color-converter',
    icon: PaletteIcon,
  },
];
