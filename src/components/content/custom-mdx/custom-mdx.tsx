import * as React from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate, type EvaluateOptions } from '@mdx-js/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import { ellyTheme } from '@/config/blog';

import { components } from '@/components/content/mdx-components';

interface CustomMDXProps {
  source: string;
  additionalComponents?: Record<string, React.ComponentType<any>>;
}

const rehypePrettyCodeOptions = {
  theme: ellyTheme,
  keepBackground: true,
  defaultLang: 'plaintext',
};

/**
 * Renders MDX content with provided components
 *
 * This component evaluates MDX source content and renders it with the provided components.
 * It passes the React runtime directly to the MDX evaluator to avoid React version conflicts,
 * which is a common issue in Next.js 15.2.0+ with MDX libraries.
 */
export async function CustomMDX({
  source,
  additionalComponents,
}: CustomMDXProps) {
  try {
    const options: EvaluateOptions = {
      ...runtime,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
    };

    const { default: MDXContent } = await evaluate(source, options);

    const mergedComponents = {
      ...components,
      ...(additionalComponents || {}),
    };

    return <MDXContent components={mergedComponents} />;
  } catch (error) {
    console.error('Error rendering MDX:', error);
    return (
      <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-md border p-4">
        An error occurred while rendering the content.
      </div>
    );
  }
}
