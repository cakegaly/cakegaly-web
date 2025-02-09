import { CustomImage } from '@/components/custom-image';
import { RichEditor } from '@/components/rich-editor';
import { siteConfig } from '@/config/site';
import { getPost, getPosts } from '@/lib/microcms';
import { absoluteUrl, formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

interface BlogPostPageProps {
  params: {
    postId: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const postId = params.postId;
  const article = await getPost(postId);
  if (!article) {
    return {};
  }

  const description =
    article.description.replace(/<[^>]+>/g, '').substring(0, 110) + '…';

  return {
    title: article.title,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      type: 'article',
      url: absoluteUrl(`/article/${article.id}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: description,
      images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams() {
  const { contents } = await getPosts();
  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });
  return paths;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postId = params.postId;
  const article = await getPost(postId, {});
  if (!article) {
    notFound();
  }

  return (
    <>
      {' '}
      <article className="container max-w-screen-lg">
        {' '}
        {article.createdAt && (
          <time
            dateTime={article.createdAt}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(article.createdAt)}
          </time>
        )}
        <h1 className="mt-2 inline-block text-3xl leading-tight lg:text-4xl">
          {article.title}
        </h1>
        {article.thumbnail && (
          <CustomImage
            src={article.thumbnail.url}
            className="mx-auto aspect-video overflow-hidden object-cover md:w-full md:rounded-md"
            width={article.thumbnail.width}
            height={article.thumbnail.height}
            alt={article.title}
          />
        )}
        <div className="my-6 max-w-none gap-6">
          {article.description && (
            <RichEditor className="mb-8" html={article.description as string} />
          )}
        </div>
      </article>
    </>
  );
}
