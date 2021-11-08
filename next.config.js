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
  async redirects() {
    return [
      {
        source: "/preview",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
