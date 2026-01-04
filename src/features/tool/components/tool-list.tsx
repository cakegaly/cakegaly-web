import Link from 'next/link';

import { buttonVariants } from '@/components/base-ui/button';
import { tools } from '@/features/tool/lib/config';

export function ToolList() {
  return (
    <div className="flex flex-wrap gap-2">
      {tools.map((tool, i) => {
        const Icon = tool.icon;
        return (
          <Link
            key={i}
            href={tool.href}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}
          >
            <Icon />
            {tool.title}
          </Link>
        );
      })}
    </div>
  );
}
