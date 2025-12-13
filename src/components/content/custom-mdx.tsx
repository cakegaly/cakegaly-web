import * as runtime from 'react/jsx-runtime';
import { evaluate, type EvaluateOptions } from '@mdx-js/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import type { ShikiTransformer } from 'shiki';

import { mdxComponents } from '@/components/content/mdx-components';

const transformers = [
  {
    code(node) {
      if (node.tagName === 'code') {
        const raw = this.source;
        node.properties['__raw__'] = raw;
      }
    },
  },
] as ShikiTransformer[];

const rehypePrettyCodeOptions = {
  theme: {
    dark: 'one-dark-pro',
    light: 'min-light',
  },
  transformers,
  defaultLang: 'plaintext',
  bypassInlineCode: true,
};

/**
 * Renders MDX content with predefined components
 *
 * This component evaluates MDX source content and renders it with mdxComponents.
 * It passes the React runtime directly to the MDX evaluator to avoid React version conflicts,
 * which is a common issue in Next.js 15.2.0+ with MDX libraries.
 */
export async function CustomMDX({ source }: { source: string }) {
  const options: EvaluateOptions = {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  };

  const { default: MDXContent } = await evaluate(source, options);
  return <MDXContent components={mdxComponents} />;
}
