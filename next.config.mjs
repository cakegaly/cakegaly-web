import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX({
  typescript: {
    tsconfigPath: 'tsconfig.build.json',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
