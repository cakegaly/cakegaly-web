import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';

import { components } from '@/components/mdx-components';

const ellyTheme = {
  name: 'elly',
  type: 'dark',
  colors: {
    'editor.background': '#111A1F',
    'editor.foreground': '#C4C4C4', // Lighter foreground for better contrast
  },
  tokenColors: [
    {
      scope: ['comment'],
      settings: {
        foreground: '#6A6A6A', // Slightly lighter for better visibility
        fontStyle: 'italic',
      },
    },
    {
      scope: ['string'],
      settings: {
        foreground: '#98A982', // Brighter green
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword'],
      settings: {
        foreground: '#89B8D3', // Brighter blue
        fontStyle: 'italic',
      },
    },
    {
      scope: ['variable', 'constant'],
      settings: {
        foreground: '#AD9876', // Brighter brown
        fontStyle: 'italic',
      },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: {
        foreground: '#93ACBC', // Brighter slate
        fontStyle: 'italic',
      },
    },
    {
      scope: ['entity.name.type', 'support.type'],
      settings: {
        foreground: '#BBB277', // Brighter yellow
        fontStyle: 'italic',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#A6ABAD', // Brighter gray
      },
    },
  ],
};

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
