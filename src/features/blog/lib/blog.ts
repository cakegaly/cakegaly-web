import { getBlogPosts } from '@/features/blog/lib/mdx';
import { getZennArticles } from '@/features/blog/lib/zenn';
import { Article } from '@/features/blog/types';

export async function getAllPosts() {
  const blogPosts = await getBlogPosts();
  const internalPosts: Article[] = blogPosts.map((post) => ({
    title: post.metadata.title,
    pubDate: post.metadata.date,
    link: `/blog/${post.slug}`,
  }));

  const zennPosts = await getZennArticles();
  const externalPosts: Article[] = zennPosts.map((post) => ({
    title: post.title,
    pubDate: parseRFC2822Date(post.pubDate),
    link: post.link,
  }));

  const allPosts = [...internalPosts, ...externalPosts];

  return allPosts.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
}

function parseRFC2822Date(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch {
    return dateString;
  }
}
