import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

type Frontmatter = {
  title: string;
  date: string;
  [key: string]: unknown; // optional
};

type MDXData = {
  metadata: Frontmatter;
  slug: string;
  content: string;
};

// dir name
// path.join(process.cwd(), 'src/content/mdx-post');

const getMDXFiles = (dir: string): string[] =>
  fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');

const readMDXFile = async (filePath: string): Promise<MDXData> => {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8');
  const { metadata, content } = parseFrontmatter(rawContent);
  const slug = path.basename(filePath, path.extname(filePath));

  return { metadata, slug, content };
};

const getMDXData = async (dir: string): Promise<MDXData[]> => {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(mdxFiles.map((file) => readMDXFile(path.join(dir, file))));
};

// TODO: gray-matter -> `compileMDX({ parseFrontmatter: true })` of next-mdx-remote
const parseFrontmatter = (
  rawContent: string
): { metadata: Frontmatter; content: string } => {
  const { data, content } = matter(rawContent);

  return {
    metadata: {
      title: typeof data.title === 'string' ? data.title : 'Untitled',
      date:
        typeof data.date === 'string' ? data.date : new Date().toISOString(),
      ...data,
    },
    content,
  };
};

export const getMDXPosts = async (): Promise<MDXData[]> =>
  getMDXData(path.join(process.cwd(), 'src/content/blog'));
