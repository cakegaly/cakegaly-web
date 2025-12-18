import { getAllBlogPosts } from '@/lib/mdx';
import { getZennArticles } from '@/lib/zenn';

export interface Article {
  title: string;
  date: string;
  href: string;
  description?: string;
}

function parseRFC2822Date(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch {
    return dateString;
  }
}

export async function getAllPosts(): Promise<Article[]> {
  const blogPosts = await getAllBlogPosts();
  const internalPosts: Article[] = blogPosts.map((post) => ({
    title: post.metadata.title,
    date: post.metadata.date,
    href: `/blog/${post.slug}`,
    description: post.metadata.description,
  }));

  const zennPosts = await getZennArticles();
  const externalPosts: Article[] = zennPosts.map((post) => ({
    title: post.title,
    date: parseRFC2822Date(post.pubDate),
    href: post.link,
    description: post.description,
  }));

  const allPosts = [...internalPosts, ...externalPosts];

  return allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
