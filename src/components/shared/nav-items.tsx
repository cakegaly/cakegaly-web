import Link from 'next/link';
import { HomeIcon, PaletteIcon, PenLineIcon, TypeIcon } from 'lucide-react';

import { buttonVariants } from '@/components/base-ui/button';

export const items = [
  {
    title: 'ホーム',
    href: '/',
    icon: HomeIcon,
  },
  {
    title: 'ブログ',
    href: '/blog',
    icon: PenLineIcon,
  },
  {
    title: '文字数カウント',
    href: '/char-counter',
    icon: TypeIcon,
  },
  {
    title: 'カラーコード変換',
    href: '/color-converter',
    icon: PaletteIcon,
  },
];

export function NavItems() {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Link
            key={i}
            href={item.href}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}
          >
            <Icon />
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
