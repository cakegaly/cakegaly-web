import path from 'path';

import { getZennArticles } from '@/features/blog/lib/zenn';
import type { BlogPost } from '@/features/blog/types';
import { Article } from '@/features/blog/types';
import { getMDXData } from '@/lib/mdx';

const CONTENT_BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

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

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await getMDXData(CONTENT_BLOG_DIR);
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

export async function getBlogPostsByTagSlug(
  tagSlug: string
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.metadata.tags?.includes(tagSlug));
}

export async function getBlogPostBySlug(slug: string) {
  return getBlogPost((post) => post.slug === slug);
}

async function getBlogPost(
  predicate: (post: BlogPost) => boolean
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(predicate);
}
