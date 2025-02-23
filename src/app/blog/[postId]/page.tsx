import { notFound } from 'next/navigation';

import { siteConfig } from '@/config/site';

import { Metadata } from 'next';
import Image from 'next/image';

import { RichEditor } from '@/components/rich-editor';
import { getBlogPost, getBlogPosts } from '@/lib/microcms';
import { absoluteUrl, formatDate, truncateText } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const post = await getBlogPost(postId);
  if (!post) {
    return {};
  }

  const description = truncateText(
    post.description.replace(/<[^>]+>/g, ''),
    110
  );

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      url: absoluteUrl(`/blog/${post.id}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams() {
  const { contents } = await getBlogPosts();
  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });
  return paths;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = await params;
  const post = await getBlogPost(postId, {});
  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-screen-lg">
      {post.createdAt && (
        <time
          dateTime={post.createdAt}
          className="block text-sm text-muted-foreground"
        >
          Published on {formatDate(post.createdAt)}
        </time>
      )}
      <h1 className="mt-2 inline-block text-3xl leading-tight">{post.title}</h1>
      {post.thumbnail && (
        <Image
          src={post.thumbnail.url}
          className="mx-auto aspect-video overflow-hidden object-cover md:w-full md:rounded-md"
          width={post.thumbnail.width}
          height={post.thumbnail.height}
          alt={post.title}
          priority={true}
        />
      )}
      <div className="my-6 max-w-none gap-6">
        {post.description && (
          <RichEditor className="mb-8" html={post.description as string} />
        )}
      </div>
    </article>
  );
}
