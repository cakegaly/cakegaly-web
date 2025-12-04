const nextConfig = {
  devIndicators: false,
  redirects() {
    return [
      {
        source: '/tools/char-counter',
        destination: '/char-counter',
        permanent: true,
      },
      {
        source: '/tools/color-converter',
        destination: '/color-converter',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
