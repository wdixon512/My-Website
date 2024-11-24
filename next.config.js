const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
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
