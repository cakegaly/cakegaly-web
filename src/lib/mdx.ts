import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';

import { components } from '@/components/mdx-components';

const galyTheme = {
  name: 'galy',
  type: 'dark',
  colors: {
    'editor.background': '#111A1F',
    'editor.foreground': '#9A9A9A',
  },
  tokenColors: [
    {
      scope: ['comment'],
      settings: {
        foreground: '#5A5A5A',
      },
    },
    {
      scope: ['string'],
      settings: {
        foreground: '#798362',
      },
    },
    {
      scope: ['keyword'],
      settings: {
        foreground: '#6998B3',
      },
    },
    {
      scope: ['variable', 'constant'],
      settings: {
        foreground: '#8D7856',
      },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: {
        foreground: '#738C9C',
      },
    },
    {
      scope: ['entity.name.type', 'support.type'],
      settings: {
        foreground: '#9B9257',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#868B8D',
      },
    },
  ],
};

const rehypePrettyCodeOptions = {
  theme: galyTheme,
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
