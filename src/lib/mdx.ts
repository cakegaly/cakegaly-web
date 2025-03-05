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

const getMDXData = async <T>(dir: string): Promise<MDXData<T>[]> => {
  const mdxFiles = await getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map((file) => readMDXFile<T>(path.join(dir, file)))
  );
};

export const getBlogPosts = async (): Promise<BlogPost[]> =>
  getMDXData(blogDir);

export const getBlogPost = async (
  predicate: (post: BlogPost) => boolean
): Promise<BlogPost | undefined> => {
  return (await getBlogPosts()).find(predicate);
};

export const getBlogPostBySlug = async (slug: string) =>
  getBlogPost((post) => post.slug === slug);

// export const getBlogPostsByTagSlug = async (tagSlug: string) =>
//   (await getBlogPosts()).filter((post) =>
//     post.metadata.tags?.includes(tagSlug)
//   );
