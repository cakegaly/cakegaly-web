import '@/styles/mdx.css';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { tags } from '@/config/blog';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';

import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { CustomMDX } from '@/components/content/custom-mdx';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';

export const revalidate = false;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  // TODO: set fallback image
  // const ogImageExists = fs.existsSync(path.join('./public/ogp/', `${slug}.png`));
  // const ogImagePath = absoluteUrl(
  //   ogImageExists ? `/ogp/${slug}.png` : siteConfig.ogImage
  // );
  const ogImagePath = absoluteUrl(`/ogp/${slug}.png`);

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
          url: ogImagePath,
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
      images: [ogImagePath],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-screen-md py-6 md:py-12">
      <article>
        {/* Title */}
        <PageHeader title={post.metadata.title} />

        {/* Metadata (Date & Tags) */}
        <div className="text-muted-foreground mt-4 mb-6 flex flex-wrap items-center justify-between text-sm">
          {post.metadata.date && (
            <div className="inline-flex items-center gap-1">
              <time dateTime={post.metadata.date}>
                {formatDate(post.metadata.date)}
              </time>
            </div>
          )}

          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="inline-flex flex-wrap gap-2">
              {post.metadata.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  <Badge className="px-2 py-0.5 text-xs font-medium">
                    {tags[tag]?.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <CustomMDX source={post.rawContent} />

        {/* Footer */}
        {/* TODO: prev/next button */}
        <footer className="mt-10 border-t pt-8">
          <Button variant="ghost" asChild className="h-9 px-2">
            <Link href="/" className="group inline-flex items-center">
              <Icons.arrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
          </Button>
        </footer>
      </article>
    </div>
  );
}
