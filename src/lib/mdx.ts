import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import { TechIcons } from '@/components/icons';
import { components } from '@/components/mdx-components';
import { ellyTheme } from '@/config/blog';

const rehypePrettyCodeOptions = {
  theme: ellyTheme,
  keepBackground: true,
  defaultLang: 'plaintext',
};

export type Frontmatter<T = {}> = {
  title: string;
  date: string;
  description: string;
} & T;

export type MDXData<T = {}> = {
  metadata: Frontmatter<T>;
  slug: string;
  content: React.ReactNode;
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

const getMDXFiles = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory())
    .map((subDir) => path.join(dir, subDir, 'index.mdx'));

const readMDXFile = async (filePath: string): Promise<MDXData> => {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');

  const { frontmatter, content } = await compileMDX<Frontmatter>({
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
    slug: path.basename(path.dirname(filePath)),
    content,
  };
};

const getMDXData = async (dir: string): Promise<MDXData[]> => {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(mdxFiles.map((file) => readMDXFile(file)));
};

export const getBlogPosts = async (): Promise<BlogPost[]> =>
  getMDXData(path.join(process.cwd(), 'src/content/blog'));
