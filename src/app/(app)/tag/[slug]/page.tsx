import { notFound } from 'next/navigation';
import { TagIcon } from 'lucide-react';

import { TextLink } from '@/components/base-ui/text-link';
import { getBlogPostsByTagSlug } from '@/features/blog/lib/blog';
import { INTERNAL_BLOG_TAGS } from '@/features/blog/lib/config';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return INTERNAL_BLOG_TAGS.map((tag) => ({ slug: tag.slug }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = INTERNAL_BLOG_TAGS.find((tag) => tag.slug === slug);

  if (!tag) {
    return notFound();
  }

  const posts = await getBlogPostsByTagSlug(tag.slug);

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex size-12 items-center justify-center rounded-lg">
              <TagIcon className="text-on-muted size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-on-background text-2xl font-bold">
                {tag.name}
              </h1>
              <p className="text-on-muted text-sm">{posts.length}件の記事</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-4">
            {posts.map((blog, i) => (
              <div key={i} className="flex justify-between gap-2">
                <TextLink
                  href={`/blog/${blog.slug}`}
                  size="sm"
                  className="min-w-0"
                >
                  {blog.metadata.title}
                </TextLink>
                <span className="text-on-muted shrink-0 text-xs">
                  {formatDate(blog.metadata.date)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
