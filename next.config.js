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
        source: '/api/mongo/:path*',
        destination: `${process.env.PROXY_API}/api/mongo/:path*`,
      },
      {
        source: '/wechat/:path*',
        destination: '/api/wechat/:path*',
      },

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
      },
      {
				source: '/api/etf',
				destination: `https://yunhq.sse.com.cn:32042/v1/sh1/list/exchange/ebs?select=code%2Cname%2Copen%2Chigh%2Clow%2Clast%2Cprev_close%2Cchg_rate%2Cvolume%2Camount%2Ccpxxextendname%2Ctradephase`,
			}
    ];
  }
});