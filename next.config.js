/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.tstudio$/,
      loader: "json-loader",
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/icon/:icon*",
        destination: "http://104.248.169.204:8080/icon/:icon*",
      }
    ]
  }
};
