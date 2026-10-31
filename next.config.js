const nextConfig = {
  // Ensure markdown posts are available at runtime for ISR revalidation on Vercel.
  outputFileTracingIncludes: {
    "/blog": ["./content/blog/**/*"],
    "/blog/[slug]": ["./content/blog/**/*"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/uses',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/dm-helper',
        destination: 'https://www.dmsquire.com',
        permanent: true,
      },
      {
        source: '/dm-squire',
        destination: 'https://www.dmsquire.com',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
