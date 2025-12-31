import { notFound } from 'next/navigation';

import { BlogList } from '@/features/blog/components/blog-list';
import { INTERNAL_BLOG_TAGS } from '@/features/blog/lib/config';

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

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-bold">{tag.name}</h1>
            <BlogList tagSlug={tag.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
