import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import { TechIcons } from '@/components/icons';
import { components } from '@/components/mdx-components';
import { ellyTheme } from '@/config/blog';
import { Frontmatter, MDXData } from '@/types/mdx';

const rehypePrettyCodeOptions = {
  theme: ellyTheme,
  keepBackground: true,
  defaultLang: 'plaintext',
};

export type BlogPost = MDXData<{
  thumbnail?: string;
  tags?: string[];
  categories?: string[];
  eyecatch?: keyof typeof TechIcons;
}>;

export type Tag = {
  name: string;
  slug: string;
};

export type Category = {
  name: string;
  slug: string;
};

const getMDXFiles = async (dir: string): Promise<string[]> => {
  const files = await fs.promises.readdir(dir);
  return files
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory())
    .map((subDir) => path.join(dir, subDir, 'index.mdx'));
};

const readMDXFile = async (filePath: string): Promise<MDXData> => {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');
  const { frontmatter, content } = await compileMdxContent(rawContent);

  return {
    metadata: frontmatter as Frontmatter,
    slug: path.basename(path.dirname(filePath)),
    content,
  };
};

const compileMdxContent = async (source: string) => {
  return await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
  });
};

const getMDXData = async (dir: string): Promise<MDXData[]> => {
  const mdxFiles = await getMDXFiles(dir);
  return Promise.all(mdxFiles.map((file) => readMDXFile(file)));
};

export const getBlogPosts = async (): Promise<BlogPost[]> =>
  getMDXData(path.join(process.cwd(), 'src/content/blog'));
