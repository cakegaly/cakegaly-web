import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { TechIcons } from '@/components/icons';
import { Frontmatter, MDXData } from '@/types/mdx';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

export type BlogPost = MDXData<{
  thumbnail?: string;
  tags?: string[];
  icon?: keyof typeof TechIcons;
}>;

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await getMDXData(blogDir);
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
};

export const getBlogPostsByTagSlug = async (
  tagSlug: string
): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.metadata.tags?.includes(tagSlug));
};

export async function getBlogPostBySlug(slug: string) {
  return getBlogPost((post) => post.slug === slug);
}

export async function getBlogPost(
  predicate: (post: BlogPost) => boolean
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find(predicate);
}

async function getMDXData<T>(dir: string): Promise<MDXData<T>[]> {
  const files = await getMDXFiles(dir);
  return Promise.all(files.map((file) => readMDXFile<T>(path.join(dir, file))));
}

async function getMDXFiles(dir: string): Promise<string[]> {
  return (await fs.promises.readdir(dir)).filter(
    (file) => path.extname(file) === '.mdx'
  );
}

async function readMDXFile<T>(filePath: string): Promise<MDXData<T>> {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');

  const { data, content } = matter(rawContent);

  return {
    metadata: data as Frontmatter<T>,
    slug: path.basename(filePath, path.extname(filePath)),
    rawContent: content,
  };
}
