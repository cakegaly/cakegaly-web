import Link from 'next/link';
import { notFound } from 'next/navigation';

import { badgeVariants } from '@/components/base-ui/badge';
import { CustomMDX } from '@/components/content/custom-mdx';
import { getBlogPostBySlug, getBlogPosts } from '@/features/blog/lib/blog';
import { INTERNAL_BLOG_TAGS } from '@/features/blog/lib/config';
import { absoluteUrl, formatDate } from '@/lib/utils';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const allPosts = await getBlogPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            post.metadata.title
          )}&description=${encodeURIComponent(post.metadata.description)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            post.metadata.title
          )}&description=${encodeURIComponent(post.metadata.description)}`,
        },
      ],
      creator: '@cakegaly',
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <h1 className="text-xl font-medium">{post.metadata.title}</h1>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags &&
                    post.metadata.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${tag}`}
                        className={badgeVariants({ variant: 'outline' })}
                      >
                        {INTERNAL_BLOG_TAGS.find((t) => t.slug === tag)?.name}
                      </Link>
                    ))}
                </div>
                <p className="text-on-muted text-xs tracking-wide">
                  <time dateTime={post.metadata.date}>
                    {formatDate(post.metadata.date)}
                  </time>
                </p>
              </div>
            </div>
            <article>
              <CustomMDX source={post.rawContent} />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
