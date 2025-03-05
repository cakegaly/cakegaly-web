import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import { TechIcons } from '@/components/icons';
import { components } from '@/components/mdx-components';
import { ellyTheme } from '@/config/blog';
import { Frontmatter, MDXData } from '@/types/mdx';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

const rehypePrettyCodeOptions = {
  theme: ellyTheme,
  keepBackground: true,
  defaultLang: 'plaintext',
};

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

export const getBlogPostBySlug = async (slug: string) =>
  getBlogPost((post) => post.slug === slug);

const getBlogPost = async (
  predicate: (post: BlogPost) => boolean
): Promise<BlogPost | undefined> => {
  const posts = await getBlogPosts();
  return posts.find(predicate);
};

const getMDXData = async <T>(dir: string): Promise<MDXData<T>[]> => {
  const files = await getMDXFiles(dir);
  return Promise.all(files.map((file) => readMDXFile<T>(path.join(dir, file))));
};

const getMDXFiles = async (dir: string): Promise<string[]> =>
  (await fs.promises.readdir(dir)).filter(
    (file) => path.extname(file) === '.mdx'
  );

const readMDXFile = async <T>(filePath: string): Promise<MDXData<T>> => {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');
  const { frontmatter, content } = await compileMDX<Frontmatter<T>>({
    source: rawContent,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
  });

  return {
    metadata: frontmatter,
    slug: path.basename(filePath, path.extname(filePath)),
    content,
  };
};
