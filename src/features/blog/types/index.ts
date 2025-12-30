/**
 * MDX
 */
export type Frontmatter<T = {}> = {
  title: string;
  date: string;
  description: string;
} & T;

export type MDXData<T = {}> = {
  metadata: Frontmatter<T>;
  slug: string;
  content?: React.ReactNode;
  rawContent: string;
};

export type BlogPost = MDXData<{
  thumbnail?: string;
  tags?: string[];
}>;

/**
 * Zenn Articles
 */
export interface Article {
  title: string;
  link: string;
  pubDate: string;
}
