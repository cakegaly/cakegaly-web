import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';

import { components } from '@/components/mdx-components';

export type Frontmatter<T = {}> = {
  title: string;
  date: string;
} & T;

export type MDXData<T = {}> = {
  metadata: Frontmatter<T>;
  slug: string;
  content: React.ReactNode;
};

export type BlogPost = MDXData;

const getMDXFiles = (dir: string): string[] =>
  fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');

const readMDXFile = async (filePath: string): Promise<MDXData> => {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');

  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source: rawContent,
    components,
    options: { parseFrontmatter: true },
  });

  return {
    metadata: frontmatter,
    slug: path.basename(filePath, path.extname(filePath)),
    content,
  };
};

const getMDXData = async (dir: string): Promise<MDXData[]> => {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(mdxFiles.map((file) => readMDXFile(path.join(dir, file))));
};

export const getBlogPosts = async (): Promise<BlogPost[]> =>
  getMDXData(path.join(process.cwd(), 'src/content/blog'));
