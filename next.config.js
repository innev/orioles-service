const withLess = require('next-with-less');

module.exports = withLess({
  // experimental: {
  //   appDir: true,
  //   serverComponentsExternalPackages: ["react-hot-toast"]
  // },
  lessLoaderOptions: {
    lessOptions: {
      // Customize your Less options here (e.g., modify variables, import other files)
      // For example:
      // modifyVars: {
      //   '@primary-color': '#1890ff',
      // },
      // includePaths: [path.join(__dirname, 'styles')],
    },
  },
  async rewrites() {
    return [
      {
        source: '/wechat/:path*',
        destination: '/api/wechat/:path*',
      },
      {
        source: '/categories/:path*',
        destination: '/api/categories/:path*',
      },
      {
        source: '/subscriptions/:path*',
        destination: '/api/subscriptions/:path*',
      },
      {
        source: '/api/ali-token',
        destination: '/api/nls/ali-token',
      }
    ];
  }
});