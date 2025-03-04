import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LinkCardProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
}

export function LinkCard({
  url,
  title,
  description,
  image,
  className,
}: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group my-4 flex overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent/5',
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1">
          <div className="flex-1 text-sm text-muted-foreground">
            {new URL(url).hostname}
          </div>
          <ExternalLink className="size-4 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold leading-tight text-foreground group-hover:text-accent">
            {title}
          </h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      {image && (
        <div className="hidden w-[148px] shrink-0 sm:block">
          <div className="relative h-full w-full">
            <Image
              src={image || '/placeholder.svg'}
              alt={title || ''}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 148px"
            />
          </div>
        </div>
      )}
    </a>
  );
}
