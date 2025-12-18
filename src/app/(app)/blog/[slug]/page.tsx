import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CustomMDX } from '@/components/content/custom-mdx';
import { Callout } from '@/components/shared/callout';
import { Badge } from '@/components/ui/badge';
import { INTERNAL_BLOG_TAGS } from '@/lib/config';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';

export const revalidate = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();
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
        <div className="bg-canvas container max-w-4xl rounded-xl py-6 lg:p-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{post.metadata.title}</h1>
              {post.metadata.description && (
                <Callout>{post.metadata.description}</Callout>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags &&
                  post.metadata.tags.map((tag) => (
                    <Badge key={tag} asChild>
                      <Link href={`/tag/${tag}`}>
                        {INTERNAL_BLOG_TAGS.find((t) => t.slug === tag)?.name}
                      </Link>
                    </Badge>
                  ))}
              </div>
              <p className="text-on-muted text-sm tracking-wide">
                <time dateTime={post.metadata.date}>
                  {formatDate(post.metadata.date)}
                </time>
              </p>
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
