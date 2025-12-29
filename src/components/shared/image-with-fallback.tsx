'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  className,
  ...props
}: ImageWithFallbackProps &
  Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        'relative aspect-[4/3] h-full w-full overflow-hidden',
        className
      )}
    >
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 148px"
        className={cn('object-cover', className)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
