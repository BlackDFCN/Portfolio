const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  compiler: {
    styledComponents: false,
  },
  experimental: {},
  turbopack: {},
  webpack(config) {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
