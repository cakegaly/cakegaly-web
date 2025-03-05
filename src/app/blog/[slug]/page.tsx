import '@/styles/mdx.css';

import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

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
  const allPosts = await getBlogPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

// function getReadingTime(content: React.ReactNode): number {
//   // Convert ReactNode to string and count words
//   const text = JSON.stringify(content);
//   const words = text.split(/\s+/).length;
//   // Average reading speed (words per minute)
//   const wpm = 238;
//   return Math.ceil(words / wpm);
// }

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // const readingTime = getReadingTime(post.content);

  return (
    <div className="container max-w-screen-lg py-6 md:py-10">
      <article className="relative">
        <header className="mb-10 space-y-6 border-b pb-8">
          {/* Date & Time */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {post.metadata.date && (
              <div className="inline-flex items-center gap-1">
                <Calendar className="size-4" />
                <time dateTime={post.metadata.date}>
                  {formatDate(post.metadata.date)}
                </time>
              </div>
            )}
            {/* <div className="inline-flex items-center gap-1">
              <Clock className="size-4" />
              <span>{readingTime} min read</span>
            </div> */}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {post.metadata.title}
          </h1>

          {/* Description */}
          {post.metadata.description && (
            <p className="text-lg text-muted-foreground md:text-xl">
              {post.metadata.description}
            </p>
          )}

          {/* Tags */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-0.5 text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Article content */}
        <div className="max-w-none pb-12">{post.content}</div>

        {/* Footer */}
        <footer className="mt-8 border-t pt-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
            <Button variant="ghost" asChild className="h-9 px-2">
              <Link href="/" className="group inline-flex items-center">
                <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                Back to home
              </Link>
            </Button>

            {/* Optional: Add share buttons or next/prev posts here */}
          </div>
        </footer>
      </article>
    </div>
  );
}

// export default async function BlogPostPage({ params }: BlogPostPageProps) {
//   const { postId } = await params;
//   const post = await getPostFromSlug(postId);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <article className="container max-w-screen-lg py-4">
//       <header className="mb-10 space-y-4 border-b pb-8">
//         {post.metadata.date && (
//           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//             <Icons.calendar className="h-4 w-4" />
//             <time dateTime={post.metadata.date}>
//               {formatDate(post.metadata.date)}
//             </time>
//           </div>
//         )}

//         <h1 className="text-3xl font-bold leading-tight tracking-tight">
//           {post.metadata.title}
//         </h1>

//         {/* TODO: Tags */}

//         {post.metadata.description && (
//           <p className="text-muted-foreground">{post.metadata.description}</p>
//         )}
//       </header>

//       {/* blog content */}
//       <div className="prose prose-elly max-w-none dark:prose-invert">
//         {post.content}
//       </div>
//     </article>
//   );
// }
