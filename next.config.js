const Path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    config.resolve.alias['~'] = Path.join(process.cwd(), '.');

    return config;
  },
  images: {
    domains: ['/'],
  },
  async rewrites() {
    return [
      {
        source: '/course',
        destination: '/course/list',
      },
    ];
  },
};
