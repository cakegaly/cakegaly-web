import { notFound } from 'next/navigation';

import { Mdx } from '@/components/mdx-components';
import { getMDXPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

interface MdxBlogPageProps {
  params: Promise<{ postId: string }>;
}

async function getPostFromParams(postId: string) {
  const contents = await getMDXPosts();
  const post = contents.find((post) => post.slug === postId);
  if (!post) {
    null;
  }
  return post;
}

// TODO: generateMetadata

export async function generateStaticParams() {
  const contents = await getMDXPosts();
  const paths = contents.map((post) => {
    return {
      postId: post.slug,
    };
  });
  return paths;
}

export default async function MdxBlogPage({ params }: MdxBlogPageProps) {
  const { postId } = await params;
  const post = await getPostFromParams(postId);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-screen-lg">
      {post.metadata.date && (
        <time
          dateTime={post.metadata.date}
          className="block text-sm text-muted-foreground"
        >
          Published on {formatDate(post.metadata.date)}
        </time>
      )}
      <h1 className="mt-2 inline-block text-3xl leading-tight">
        {post.metadata.title}
      </h1>

      <Mdx code={post.content} />
    </article>
  );
}
