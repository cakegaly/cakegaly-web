import path from 'path';

import { getZennArticles } from '@/features/blog/lib/zenn';
import type { Blog, BlogPost, BlogQuery } from '@/features/blog/types';
import { getMDXData } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

const CONTENT_BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export async function getBlogs({ limit, withZenn }: BlogQuery) {
  const blogPosts = await getBlogPosts();
  const internalPosts: Blog[] = blogPosts.map((post) => ({
    title: post.metadata.title,
    pubDate: formatDate(post.metadata.date),
    link: `/blog/${post.slug}`,
  }));

  const zennPosts = await getZennArticles();
  const externalPosts: Blog[] = zennPosts.map((post) => ({
    title: post.title,
    pubDate: formatDate(post.pubDate),
    link: post.link,
  }));

  const allPosts = withZenn
    ? [...internalPosts, ...externalPosts]
    : internalPosts;

  return allPosts
    .sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    })
    .slice(0, limit ?? undefined);
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
