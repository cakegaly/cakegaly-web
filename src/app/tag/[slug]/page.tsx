import { BlogCard } from '@/components/content/blog-card';
import { tags } from '@/config/blog';
import { siteConfig } from '@/config/site';
import { getBlogPostsByTagSlug } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/utils';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

// TODO: set tag description & customize metadata of this page
export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = tags.slug;
  if (!tag) {
    return {};
  }

  return {
    title: `「${tag.name}」タグの記事一覧`,
    description: `「${tag.name}」タグの記事一覧を表示しています。`,
    openGraph: {
      title: `「${tag.name}」タグの記事一覧`,
      description: `「${tag.name}」タグの記事一覧を表示しています。`,
      type: 'article',
      url: absoluteUrl(`/tag/${slug}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `「${tag.name}」タグの記事一覧`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `「${tag.name}」タグの記事一覧`,
      description: `「${tag.name}」タグの記事一覧を表示しています。`,
      images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(tags).map((slug) => ({
    slug: slug,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  const posts = await getBlogPostsByTagSlug(slug);

  return (
    <section className="container max-w-screen-lg py-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((blog, index) => (
          <BlogCard key={index} data={blog} />
        ))}
      </div>
    </section>
  );
}
