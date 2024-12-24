const withLess = require('next-with-less');
// const withLess = require('@zeit/next-less');
const path = require('path');

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        '@primary-color': '#1890ff', // 自定义 Ant Design 主题颜色
      },
      includePaths: [path.join(__dirname, 'styles')], // 引入全局 Less 文件
    },
  },
  webpack: (config, { isServer }) => {
    // 如果你需要在 Webpack 配置中添加其他规则或修改现有规则，可以在这里进行
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/mongo/:path*',
        destination: `${process.env.PROXY_API}/api/mongo/:path*`
      },
      {
        source: '/wechat/:path*',
        destination: '/api/wechat/:path*'
      },
      {
        source: '/categories/:path*',
        destination: '/api/categories/:path*'
      },
      {
        source: '/subscriptions/:path*',
        destination: '/api/subscriptions/:path*'
      },
      {
        source: '/api/ali-token',
        destination: '/api/nls/ali-token'
      },
      {
				source: '/api/etf',
				destination: `https://yunhq.sse.com.cn:32042/v1/sh1/list/exchange/ebs?select=code%2Cname%2Copen%2Chigh%2Clow%2Clast%2Cprev_close%2Cchg_rate%2Cvolume%2Camount%2Ccpxxextendname%2Ctradephase`
			}
    ];
  },
  // 如果你需要启用实验性功能，可以取消注释并配置
  // experimental: {
  //   appDir: true,
  //   serverComponentsExternalPackages: ["react-hot-toast"]
  // }
});