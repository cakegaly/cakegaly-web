import { ArticleCard } from '@/components/article-card';
import { getPosts } from '@/lib/microcms';
import Link from 'next/link';

export const revalidate = 3600;

export default async function TopPage() {
  const { contents } = await getPosts();

  return (
    <section className="container max-w-screen-lg py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contents.map((post, index) => {
          return (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <ArticleCard article={post} priority={index <= 1} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
