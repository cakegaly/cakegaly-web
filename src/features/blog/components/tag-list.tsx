import Link from 'next/link';

import { badgeVariants } from '@/components/base-ui/badge';
import { INTERNAL_BLOG_TAGS } from '@/features/blog/lib/config';

export function TagList({ activeSlug }: { activeSlug?: string }) {
  const tags = [
    { slug: 'all', name: 'All', href: '/blog' },
    ...INTERNAL_BLOG_TAGS.map((tag) => ({
      slug: tag.slug,
      name: tag.name,
      href: `/tag/${tag.slug}`,
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={tag.href}
          className={badgeVariants({
            variant: activeSlug === tag.slug ? 'neutral' : 'outline',
          })}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
