import { notFound } from 'next/navigation';

import { Author } from '@/components/author';
import { siteConfig } from '@/config/site';
import { getBlogPosts } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';

export const revalidate = false;

interface BlogPostPageProps {
  params: Promise<{ postId: string }>;
}

async function getPostFromSlug(postId: string) {
  const contents = await getBlogPosts();
  const post = contents.find((post) => post.slug === postId);
  if (!post) {
    return null;
  }
  return post;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { postId } = await params;
  const post = await getPostFromSlug(postId);
  if (!post) {
    return {};
  }

  const description =
    '概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です概要です';

  return {
    title: post.metadata.title,
    description: description,
    openGraph: {
      title: post.metadata.title,
      description: description,
      type: 'article',
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: description,
      images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams() {
  const contents = await getBlogPosts();
  const paths = contents.map((post) => {
    return {
      postId: post.slug,
    };
  });
  return paths;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = await params;
  const post = await getPostFromSlug(postId);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-screen-lg py-4">
      <div className="mb-8 md:mb-12">
        {post.metadata.date && (
          <time
            dateTime={post.metadata.date}
            className="block text-sm font-medium text-muted-foreground"
          >
            {formatDate(post.metadata.date)}
          </time>
        )}
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight">
          {post.metadata.title}
        </h1>
        <Author />
        {post.metadata.description && (
          <p className="mt-4 text-lg text-muted-foreground">
            {post.metadata.description}
          </p>
        )}
      </div>
      <div className="prose-elly prose max-w-none dark:prose-invert">
        {post.content}
      </div>
    </article>
  );
}
