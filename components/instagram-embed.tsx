'use client';

import { domToReact } from 'html-react-parser';
import { useEffect } from 'react';

export const InstagramEmbed = ({ attribs, childNodes }: any) => {
  const children = domToReact(childNodes);

  useEffect(() => {
    const addInstagramScript = () => {
      if (!window.instgrm) {
        const s = document.createElement('script');
        s.async = true;
        s.src = '//www.instagram.com/embed.js';
        s.onload = () => {
          window.instgrm.Embeds.process();
        };
        document.body.appendChild(s);
      } else {
        window.instgrm.Embeds.process();
      }
    };

    addInstagramScript();
  }, [children]);

  const instagramBlockquoteHTML = `
    <blockquote ${Object.entries(attribs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')}>
      ${children}
    </blockquote>
  `;

  return <div dangerouslySetInnerHTML={{ __html: instagramBlockquoteHTML }} />;
};
