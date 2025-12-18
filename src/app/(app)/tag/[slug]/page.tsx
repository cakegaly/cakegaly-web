import { notFound } from 'next/navigation';
import { TagIcon } from 'lucide-react';

import { BlogCard } from '@/components/content/blog-card';
import { INTERNAL_BLOG_TAGS } from '@/lib/config';
import { getBlogPostsByTagSlug } from '@/lib/mdx';

export const revalidate = false;
export const dynamic = 'force-static';

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
          <div className="flex flex-col gap-1">
            {posts.map((blog, index) => (
              <BlogCard key={index} data={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
