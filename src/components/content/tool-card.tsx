import Link from 'next/link';
import { WrenchIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  href: string;
  description: string;
}

export function ToolCard({ title, href, description }: ToolCardProps) {
  const Icon = WrenchIcon;

  return (
    <Link
      href={href}
      className={cn(
        'bg-background hover:bg-background-hovered active:bg-background-active',
        'flex items-center justify-between gap-4 rounded-lg p-4'
      )}
    >
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-on-muted mt-1 text-sm">{description}</p>
      </div>
      <div className="flex size-10 shrink-0 items-center justify-center">
        <Icon className="size-5" />
      </div>
    </Link>
  );
}
