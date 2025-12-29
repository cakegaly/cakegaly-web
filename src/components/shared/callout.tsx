import * as React from 'react';
import { InfoIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Callout({
  children,
  title,
  className,
  showIcon = false,
  ...props
}: {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <div
      role="alert"
      className={cn(
        'bg-muted text-on-muted @container relative flex w-full gap-4 rounded-2xl p-4 [&>svg]:size-5 [&>svg]:shrink-0',
        className
      )}
      {...props}
    >
      {showIcon && <InfoIcon />}
      <div className="flex flex-1 flex-col gap-2">
        {title && <div className="text-sm leading-5 font-bold">{title}</div>}
        <div className="text-sm leading-5">{children}</div>
      </div>
    </div>
  );
}
