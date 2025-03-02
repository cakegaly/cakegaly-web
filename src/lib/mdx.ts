import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';

import { TechIcons } from '@/components/icons';
import { components } from '@/components/mdx-components';

const ellyTheme = {
  name: 'elly',
  type: 'dark',
  colors: {
    'editor.background': '#111A1F',
    'editor.foreground': '#C4C4C4',
  },
  tokenColors: [
    {
      scope: ['comment'],
      settings: {
        foreground: '#6A6A6A',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['string'],
      settings: {
        foreground: '#98A982',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['keyword'],
      settings: {
        foreground: '#89B8D3',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['variable', 'constant'],
      settings: {
        foreground: '#AD9876',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: {
        foreground: '#93ACBC',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['entity.name.type', 'support.type'],
      settings: {
        foreground: '#BBB277',
        fontStyle: 'italic',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#A6ABAD',
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
