import { notFound } from 'next/navigation';

import { Icons } from '@/components/icons';
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
      description: post.metadata.description,
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
      <header className="mb-10 space-y-4 border-b pb-8">
        {post.metadata.date && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icons.calendar className="h-4 w-4" />
            <time dateTime={post.metadata.date}>
              {formatDate(post.metadata.date)}
            </time>
          </div>
        )}

        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          {post.metadata.title}
        </h1>

        {/* TODO: Tags */}

        {post.metadata.description && (
          <p className="text-muted-foreground">{post.metadata.description}</p>
        )}
      </header>

      {/* blog content */}
      <div className="prose-elly prose max-w-none dark:prose-invert">
        {post.content}
      </div>
    </article>
  );
}
