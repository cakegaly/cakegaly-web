import type { Meta, StoryObj } from '@storybook/react';

import { components } from './mdx-components';

const meta = {
  title: 'MDX Components',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Heading2: Story = {
  render: () => components.h2({ children: '見出し (h2)' }),
};

export const Heading3: Story = {
  render: () => components.h3({ children: '見出し (h3)' }),
};

export const Heading4: Story = {
  render: () => components.h4({ children: '見出し (h4)' }),
};

export const Paragraph: Story = {
  render: () =>
    components.p({
      children:
        'これは段落のサンプルです。これは段落のサンプルです。これは段落のサンプルです。これは段落のサンプルです。これは段落のサンプルです。これは段落のサンプルです。これは段落のサンプルです。',
    }),
};

export const AnchorLink: Story = {
  render: () =>
    components.a({
      href: 'https://example.com',
      children: '外部リンク (example.com)',
    }),
};

export const UnorderedList: Story = {
  render: () =>
    components.ul({
      children: (
        <>
          {components.li({ children: 'リスト1' })}
          {components.li({ children: 'リスト2' })}
        </>
      ),
    }),
};

export const OrderedList: Story = {
  render: () =>
    components.ol({
      children: (
        <>
          {components.li({ children: 'リスト1' })}
          {components.li({ children: 'リスト2' })}
        </>
      ),
    }),
};

export const Blockquote: Story = {
  render: () =>
    components.blockquote({
      children: 'これは引用文の例です。',
    }),
};

export const Table: Story = {
  render: () =>
    components.table({
      children: (
        <>
          {components.tr({
            children: (
              <>
                {components.th({ children: '見出し1' })}
                {components.th({ children: '見出し2' })}
              </>
            ),
          })}
          {components.tr({
            children: (
              <>
                {components.td({ children: 'データ1-1' })}
                {components.td({ children: 'データ2-1' })}
              </>
            ),
          })}
          {components.tr({
            children: (
              <>
                {components.td({ children: 'データ1-2' })}
                {components.td({ children: 'データ2-2' })}
              </>
            ),
          })}
        </>
      ),
    }),
};

// export const CodeInline: Story = {
//   render: () =>
//     components.code({
//       children: 'const foo = "bar";',
//     }),
// };

// export const CodeBlock: Story = {
//   render: () =>
//     components.pre({
//       children: `const foo = "bar";\nconsole.log(foo);`,
//     }),
// };

// export const CalloutInfo: Story = {
//   render: () => (
//     <Callout type="info" title="Info">
//       情報の例
//     </Callout>
//   ),
// };

// export const CalloutWarning: Story = {
//   render: () => (
//     <Callout type="warning" title="Warning">
//       警告の例
//     </Callout>
//   ),
// };

// export const LinkPreviewExample: Story = {
//   render: () => <LinkPreview url="https://example.com" />,
// };
