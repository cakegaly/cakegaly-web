import { InstagramEmbed } from '@/components/instagram-embed';
import clsx from 'clsx';
import parse, {
  Element,
  HTMLReactParserOptions,
  domToReact,
} from 'html-react-parser';
import { FunctionComponent } from 'react';

type RichEditorProps = {
  html: string;
  className?: string;
};

type Replace = NonNullable<HTMLReactParserOptions['replace']>;

const replace: Replace = (domNode) => {
  if (!(domNode instanceof Element)) return;

  if (
    domNode.name === 'blockquote' &&
    domNode.attribs.class === 'instagram-media'
  ) {
    return (
      <InstagramEmbed
        attribs={domNode.attribs}
        childNodes={domToReact(domNode.children)}
      />
    );
  }

  if (domNode.name === 'script') {
    return <></>;
  }
};

export const RichEditor: FunctionComponent<RichEditorProps> = ({
  html,
  className,
}) => {
  const parsedHtml = parse(html, { replace });

  return (
    <>
      <div
        className={clsx(
          'prose mx-auto text-base leading-7 text-primary prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-primary prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 md:max-w-6xl',
          className,
        )}
      >
        {parsedHtml}
      </div>
    </>
  );
};
