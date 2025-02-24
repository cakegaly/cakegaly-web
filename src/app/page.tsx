import Link from 'next/link';

import { ArticleCard } from '@/components/article-card';
import { getBlogPosts } from '@/lib/microcms';

export default async function TopPage() {
  const { contents } = await getBlogPosts();

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
