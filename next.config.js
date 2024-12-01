const withLess = require('next-with-less');
const { i18n } = require('./next-i18next.config');

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
  i18n,
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