import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight">
        {props.children}
      </h1>
    ),
    h2: (props) => (
      <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
        {props.children}
      </h2>
    ),
    h3: (props) => (
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {props.children}
      </h3>
    ),
    h4: (props) => (
      <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        {props.children}
      </h4>
    ),
    ul: (props) => <ul className="my-6 ml-6 list-disc">{props.children}</ul>,
    ol: (props) => <ol className="my-6 ml-6 list-decimal">{props.children}</ol>,
    li: (props) => <li className="mt-2">{props.children}</li>,
    a: (props) => (
      <a
        className="font-medium text-blue-600 underline underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {props.children}
      </a>
    ),
    p: (props) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
        {props.children}
      </p>
    ),
  };
}
